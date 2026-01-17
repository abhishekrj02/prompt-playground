import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Clock,
  Trash2,
  Search,
  FileText,
  Play,
  MoreVertical,
  CheckSquare,
  Square,
  AlertCircle,
  Sparkles,
  Filter,
  ArrowUpDown,
  Eye,
  Edit3,
  Copy,
  X,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription
} from '@/components/ui/dialog';
import { usePromptStore } from '@/store/promptStore';
import { PromptVersion } from '@/types/prompt';

type SortField = 'version' | 'timestamp' | 'model' | 'tokens';
type SortOrder = 'asc' | 'desc';

export default function Versions() {
  const navigate = useNavigate();
  const { versions, deleteVersion, deleteMultipleVersions, updateVersionNote, setConfig, setOutput } = usePromptStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [sortField, setSortField] = useState<SortField>('version');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [filterModel, setFilterModel] = useState<string>('all');

  // Dialogs
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editNoteDialogOpen, setEditNoteDialogOpen] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState<PromptVersion | null>(null);
  const [editedNote, setEditedNote] = useState('');

  // Get unique models for filter
  const uniqueModels = useMemo(() => {
    const models = new Set(versions.map(v => v.model));
    return Array.from(models);
  }, [versions]);

  // Filter and sort versions
  const filteredVersions = useMemo(() => {
    let result = [...versions];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(v =>
        v.note?.toLowerCase().includes(query) ||
        v.systemPrompt.toLowerCase().includes(query) ||
        v.userPrompt.toLowerCase().includes(query) ||
        v.model.toLowerCase().includes(query) ||
        `v${v.version}`.includes(query)
      );
    }

    // Model filter
    if (filterModel !== 'all') {
      result = result.filter(v => v.model === filterModel);
    }

    // Sort
    result.sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case 'version':
          comparison = a.version - b.version;
          break;
        case 'timestamp':
          comparison = new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
          break;
        case 'model':
          comparison = a.model.localeCompare(b.model);
          break;
        case 'tokens':
          comparison = (a.metadata.inputTokens + a.metadata.outputTokens) -
            (b.metadata.inputTokens + b.metadata.outputTokens);
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [versions, searchQuery, filterModel, sortField, sortOrder]);

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === filteredVersions.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredVersions.map(v => v.id)));
    }
  };

  const handleDelete = (version: PromptVersion) => {
    setSelectedVersion(version);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedVersion) {
      deleteVersion(selectedVersion.id);
      setDeleteDialogOpen(false);
      setSelectedVersion(null);
    }
  };

  const handleBulkDelete = () => {
    setBulkDeleteDialogOpen(true);
  };

  const confirmBulkDelete = () => {
    deleteMultipleVersions(Array.from(selectedIds));
    setSelectedIds(new Set());
    setBulkDeleteDialogOpen(false);
  };

  const handleView = (version: PromptVersion) => {
    setSelectedVersion(version);
    setViewDialogOpen(true);
  };

  const handleEditNote = (version: PromptVersion) => {
    setSelectedVersion(version);
    setEditedNote(version.note || '');
    setEditNoteDialogOpen(true);
  };

  const confirmEditNote = () => {
    if (selectedVersion) {
      updateVersionNote(selectedVersion.id, editedNote);
      setEditNoteDialogOpen(false);
      setSelectedVersion(null);
      setEditedNote('');
    }
  };

  const handleLoadVersion = (version: PromptVersion) => {
    setConfig({
      systemPrompt: version.systemPrompt,
      userPrompt: version.userPrompt,
      variables: version.variables,
      model: version.model,
      temperature: version.temperature,
      maxTokens: version.maxTokens,
    });
    setOutput(version.output, version.metadata);
    navigate('/dashboard');
  };

  const handleDuplicate = (version: PromptVersion) => {
    setConfig({
      systemPrompt: version.systemPrompt,
      userPrompt: version.userPrompt,
      variables: version.variables,
      model: version.model,
      temperature: version.temperature,
      maxTokens: version.maxTokens,
    });
    navigate('/dashboard');
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Version History</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Manage and explore your saved prompt versions
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {versions.length} version{versions.length !== 1 ? 's' : ''} saved
              </span>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[200px] max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search versions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select
                value={filterModel}
                onChange={(e) => setFilterModel(e.target.value)}
                className="h-9 px-3 rounded-md border border-input bg-background text-sm"
              >
                <option value="all">All Models</option>
                {uniqueModels.map(model => (
                  <option key={model} value={model}>{model}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
              <select
                value={`${sortField}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-') as [SortField, SortOrder];
                  setSortField(field);
                  setSortOrder(order);
                }}
                className="h-9 px-3 rounded-md border border-input bg-background text-sm"
              >
                <option value="version-desc">Newest First</option>
                <option value="version-asc">Oldest First</option>
                <option value="tokens-desc">Most Tokens</option>
                <option value="tokens-asc">Least Tokens</option>
                <option value="model-asc">Model A-Z</option>
              </select>
            </div>

            {selectedIds.size > 0 && (
              <Button
                variant="destructive"
                size="sm"
                onClick={handleBulkDelete}
                className="ml-auto"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete ({selectedIds.size})
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-6">
        {versions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="p-4 rounded-full bg-secondary/50 mb-4">
              <Sparkles className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">No versions yet</h2>
            <p className="text-muted-foreground max-w-md mb-6">
              Start by creating and running prompts in the playground, then save versions to track your progress.
            </p>
            <Button onClick={() => navigate('/dashboard')}>
              Go to Playground
            </Button>
          </div>
        ) : filteredVersions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <AlertCircle className="h-8 w-8 text-muted-foreground mb-4" />
            <h2 className="text-lg font-medium text-foreground mb-2">No matches found</h2>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        ) : (
          <>
            {/* Select All */}
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border">
              <button
                onClick={toggleSelectAll}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {selectedIds.size === filteredVersions.length ? (
                  <CheckSquare className="h-4 w-4 text-primary" />
                ) : (
                  <Square className="h-4 w-4" />
                )}
                Select All
              </button>
              <span className="text-sm text-muted-foreground">
                {filteredVersions.length} result{filteredVersions.length !== 1 ? 's' : ''}
              </span>
            </div>

            {/* Version Cards */}
            <div className="space-y-3">
              {filteredVersions.map((version) => (
                <div
                  key={version.id}
                  className={`group relative bg-card border rounded-xl p-4 transition-all hover:shadow-md ${
                    selectedIds.has(version.id) ? 'border-primary ring-1 ring-primary/20' : 'border-border'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Checkbox */}
                    <button
                      onClick={() => toggleSelect(version.id)}
                      className="mt-1 flex-shrink-0"
                    >
                      {selectedIds.has(version.id) ? (
                        <CheckSquare className="h-5 w-5 text-primary" />
                      ) : (
                        <Square className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
                      )}
                    </button>

                    {/* Main Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <span className="text-lg font-semibold text-foreground">
                              v{version.version}
                            </span>
                            <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-secondary text-muted-foreground">
                              {version.model}
                            </span>
                          </div>
                          {version.note && (
                            <p className="text-sm text-muted-foreground mb-2 line-clamp-1">
                              {version.note}
                            </p>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleView(version)}
                            className="h-8 w-8 p-0"
                            title="View Details"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleLoadVersion(version)}
                            className="h-8 w-8 p-0"
                            title="Load in Playground"
                          >
                            <Play className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDuplicate(version)}
                            className="h-8 w-8 p-0"
                            title="Duplicate"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditNote(version)}
                            className="h-8 w-8 p-0"
                            title="Edit Note"
                          >
                            <Edit3 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(version)}
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Metadata */}
                      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mt-3">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {formatDate(version.timestamp)}
                        </div>
                        <div className="flex items-center gap-1">
                          <FileText className="h-3.5 w-3.5" />
                          {version.metadata.inputTokens + version.metadata.outputTokens} tokens
                        </div>
                        <div>
                          {version.metadata.latencyMs}ms latency
                        </div>
                        <div>
                          Temp: {version.temperature}
                        </div>
                      </div>

                      {/* Preview */}
                      <div className="mt-3 p-3 rounded-lg bg-secondary/30 border border-border">
                        <p className="text-xs text-muted-foreground font-mono line-clamp-2">
                          {version.systemPrompt || version.userPrompt || 'No prompt content'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Delete Version</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete v{selectedVersion?.version}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bulk Delete Confirmation Dialog */}
      <Dialog open={bulkDeleteDialogOpen} onOpenChange={setBulkDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Delete {selectedIds.size} Versions</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedIds.size} selected version{selectedIds.size !== 1 ? 's' : ''}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setBulkDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmBulkDelete}>
              Delete All
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Version Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              Version {selectedVersion?.version}
              <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-secondary text-muted-foreground">
                {selectedVersion?.model}
              </span>
            </DialogTitle>
          </DialogHeader>

          {selectedVersion && (
            <div className="space-y-4">
              {selectedVersion.note && (
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Note</h4>
                  <p className="text-sm text-foreground">{selectedVersion.note}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Created:</span>
                  <p className="font-mono">{formatDate(selectedVersion.timestamp)}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Temperature:</span>
                  <p className="font-mono">{selectedVersion.temperature}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Max Tokens:</span>
                  <p className="font-mono">{selectedVersion.maxTokens}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Latency:</span>
                  <p className="font-mono">{selectedVersion.metadata.latencyMs}ms</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">System Prompt</h4>
                <div className="p-3 rounded-lg bg-secondary/50 border border-border">
                  <pre className="text-xs font-mono whitespace-pre-wrap text-foreground">
                    {selectedVersion.systemPrompt || '(empty)'}
                  </pre>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">User Prompt</h4>
                <div className="p-3 rounded-lg bg-secondary/50 border border-border">
                  <pre className="text-xs font-mono whitespace-pre-wrap text-foreground">
                    {selectedVersion.userPrompt || '(empty)'}
                  </pre>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Variables</h4>
                <div className="p-3 rounded-lg bg-secondary/50 border border-border">
                  <pre className="text-xs font-mono whitespace-pre-wrap text-foreground">
                    {selectedVersion.variables}
                  </pre>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Output</h4>
                <div className="p-3 rounded-lg bg-secondary/50 border border-border max-h-40 overflow-y-auto">
                  <pre className="text-xs font-mono whitespace-pre-wrap text-foreground">
                    {selectedVersion.output}
                  </pre>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="secondary" onClick={() => setViewDialogOpen(false)}>
              Close
            </Button>
            <Button onClick={() => {
              if (selectedVersion) {
                handleLoadVersion(selectedVersion);
              }
            }}>
              <Play className="h-4 w-4 mr-2" />
              Load in Playground
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Note Dialog */}
      <Dialog open={editNoteDialogOpen} onOpenChange={setEditNoteDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Edit Note</DialogTitle>
            <DialogDescription>
              Update the note for v{selectedVersion?.version}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input
              value={editedNote}
              onChange={(e) => setEditedNote(e.target.value)}
              placeholder="Enter a note for this version..."
              className="font-mono text-sm"
            />
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setEditNoteDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmEditNote}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
