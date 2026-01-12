import { usePromptStore } from "@/store/promptStore";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Play, Save } from "lucide-react";

interface PromptEditorProps {
    onRun: () => void;
    onSave: () => void;
}

export function PromptEditor({ onRun, onSave }: PromptEditorProps) {
    const { config, setConfig, isRunning, hasRun } = usePromptStore();

    return (
        <div className="flex flex-col gap-5 h-full">
            {/* System Prompt */}
            <div className="flex flex-col gap-2">
                <Label
                    htmlFor="system-prompt"
                    className="text-xs font-medium uppercase tracking-wide text-muted-foreground"
                >
                    System Prompt
                </Label>
                <textarea
                    id="system-prompt"
                    className="code-editor min-h-[140px]"
                    placeholder="You are a helpful assistant that provides concise and accurate responses..."
                    value={config.systemPrompt}
                    onChange={(e) => {
                        setConfig({ systemPrompt: e.target.value });
                    }}
                />
            </div>

            {/* User Prompt */}
            <div className="flex flex-col gap-2">
                <Label
                    htmlFor="user-prompt"
                    className="text-xs font-medium uppercase tracking-wide text-muted-foreground"
                >
                    User Prompt
                </Label>
                <textarea
                    id="user-prompt"
                    className="code-editor min-h-[140px]"
                    placeholder="Enter your prompt here..."
                    value={config.userPrompt}
                    onChange={(e) => setConfig({ userPrompt: e.target.value })}
                />
            </div>

            {/* Variables */}
            <div className="flex flex-col gap-2">
                <Label
                    htmlFor="variables"
                    className="text-xs font-medium uppercase tracking-wide text-muted-foreground"
                >
                    Variables (JSON)
                </Label>
                <textarea
                    id="variables"
                    className="code-editor min-h-[80px] text-xs"
                    placeholder={
                        '{\n  "tone": "formal",\n  "length": "short"\n}'
                    }
                    value={config.variables}
                    onChange={(e) => setConfig({ variables: e.target.value })}
                />
            </div>

            {/* Model Configuration */}
            <div className="flex flex-col gap-3 p-3 bg-secondary/50 rounded-md border border-border">
                <div className="grid grid-cols-3 gap-4">
                    {/* Model Select */}
                    <div className="flex flex-col gap-1.5">
                        <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                            Model
                        </Label>
                        <Select
                            value={config.model}
                            onValueChange={(value) =>
                                setConfig({ model: value })
                            }
                        >
                            <SelectTrigger className="h-8 text-sm font-mono">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="gpt-4o-mini">
                                    gpt-4o-mini
                                </SelectItem>
                                <SelectItem value="gpt-4o">gpt-4o</SelectItem>
                                <SelectItem value="gpt-3.5-turbo">
                                    gpt-3.5-turbo
                                </SelectItem>
                                <SelectItem value="claude-3-sonnet">
                                    claude-3-sonnet
                                </SelectItem>
                                <SelectItem value="claude-3-haiku">
                                    claude-3-haiku
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Temperature */}
                    <div className="flex flex-col gap-1.5">
                        <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                            Temperature: {config.temperature.toFixed(2)}
                        </Label>
                        <div className="flex items-center h-8">
                            <Slider
                                value={[config.temperature]}
                                onValueChange={([value]) =>
                                    setConfig({ temperature: value })
                                }
                                min={0}
                                max={1}
                                step={0.01}
                                className="w-full"
                            />
                        </div>
                    </div>

                    {/* Max Tokens */}
                    <div className="flex flex-col gap-1.5">
                        <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                            Max Tokens
                        </Label>
                        <Input
                            type="number"
                            value={config.maxTokens}
                            onChange={(e) =>
                                setConfig({
                                    maxTokens: parseInt(e.target.value) || 0,
                                })
                            }
                            className="h-8 text-sm font-mono"
                            min={1}
                            max={4096}
                        />
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2">
                <Button onClick={onRun} disabled={isRunning} className="gap-2">
                    <Play className="h-3.5 w-3.5" />
                    {isRunning ? "Running..." : "Run Prompt"}
                </Button>
                <Button
                    variant="secondary"
                    onClick={onSave}
                    disabled={!hasRun}
                    className="gap-2 border hover:bg-neutral-200 border-black"
                >
                    <Save className="h-3.5 w-3.5" />
                    Save Version
                </Button>
            </div>
        </div>
    );
}
