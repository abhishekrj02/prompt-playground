import { usePromptStore } from '@/store/promptStore';
import { Label } from '@/components/ui/label';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { format } from 'date-fns';

export function OutputPanel() {
  const { output, metadata, isRunning } = usePromptStore();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-5 h-full">
      {/* Model Output */}
      <div className="flex flex-col gap-2 flex-1">
        <div className="flex items-center justify-between">
          <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Model Output
          </Label>
          {output && (
            <button
              onClick={handleCopy}
              className="p-1 hover:bg-secondary rounded transition-colors text-muted-foreground hover:text-foreground"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            </button>
          )}
        </div>
        <div className="code-editor text-left min-h-[300px] flex-1 overflow-auto whitespace-pre-wrap">
          {isRunning ? (
            <span className="text-muted-foreground animate-pulse">Generating response...</span>
          ) : output ? (
            output
          ) : (
            <span className="text-muted-foreground">Output will appear here after running the prompt.</span>
          )}
        </div>
      </div>

      {/* Execution Metadata */}
      {metadata && (
        <div className="flex flex-col gap-2">
          <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Execution Metadata
          </Label>
          <div className="p-3 mb-5 bg-secondary/50 rounded-md border border-border">
            <div className="metadata-grid">
              <span className="metadata-key">Model</span>
              <span className="metadata-value">{metadata.model}</span>
              
              <span className="metadata-key">Input Tokens</span>
              <span className="metadata-value">{metadata.inputTokens.toLocaleString()}</span>
              
              <span className="metadata-key">Output Tokens</span>
              <span className="metadata-value">{metadata.outputTokens.toLocaleString()}</span>
              
              <span className="metadata-key">Latency</span>
              <span className="metadata-value">{metadata.latencyMs.toLocaleString()}ms</span>
              
              <span className="metadata-key">Timestamp</span>
              <span className="metadata-value">{format(metadata.timestamp, 'yyyy-MM-dd HH:mm:ss')}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
