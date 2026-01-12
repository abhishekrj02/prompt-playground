import { OutputPanel } from "@/components/OutputPanel";
import { PromptEditor } from "@/components/PromptEditor";
import { usePromptStore } from "@/store/promptStore";
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Index() {
    const { config, setOutput, saveVersion, setIsRunning } = usePromptStore();
    const [saveDialogOpen, setSaveDialogOpen] = useState(false);
    const [versionNote, setVersionNote] = useState("");

    const handleRun = async () => {
        setIsRunning(true);
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1500));
        
        const output = `Based on your prompt, here is a generated response that demonstrates the model's capabilities.

This is a simulated output for demonstration purposes. In a production environment, this would be the actual response from the LLM API.

Key points:
• The response maintains context from the system prompt
• Variables are interpolated as specified
• Output respects the max tokens limit

Temperature: ${config.temperature.toFixed(2)} affects randomness.
Model: ${config.model}`;

        const Metadata = {
            model: config.model,
            inputTokens: Math.floor(50 + Math.random() * 150),
            outputTokens: Math.floor(80 + Math.random() * 200),
            latencyMs: Math.floor(400 + Math.random() * 600),
            timestamp: new Date(),
        };

        setOutput(output, Metadata);
        setIsRunning(false);
    };

    const handleSave = async () => {
        setSaveDialogOpen(true);
        setVersionNote("");
    };

    const handleSaveConfirm = async () => {
        saveVersion(versionNote);
        setSaveDialogOpen(false);
        setVersionNote("");
    };

    return (
        <div className="flex h-[calc(100vh-48px)] overflow-hidden">
            <div className="flex-1 flex min-w-0">
                {/* Prompt Editor */}
                <div className="flex-1 p-6 overflow-auto border-r border-border">
                    <PromptEditor onRun={handleRun} onSave={handleSave} />
                </div>

                {/* Output Panel */}
                <div className="flex-1 p-6 overflow-auto">
                    <OutputPanel />
                </div>
            </div>

            <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
                <DialogContent className="sm:max-w-[400px]">
                    <DialogHeader>
                        <DialogTitle>Save Version</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-4 py-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="version-note">
                                Note (optional)
                            </Label>
                            <Input
                                id="version-note"
                                value={versionNote}
                                onChange={(e) => setVersionNote(e.target.value)}
                                placeholder="Describe this version..."
                                className="font-mono text-sm"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="secondary"
                            onClick={() => setSaveDialogOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button onClick={handleSaveConfirm}>Save</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
