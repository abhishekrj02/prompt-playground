import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePromptStore } from "@/store/promptStore";
import { format } from "date-fns";

import { AlertCircle, GitCompare } from "lucide-react";
import { useState } from "react";

export default function Compare() {
    const { versions } = usePromptStore();
    const [versionAId, setVersionAId] = useState<string>("");
    const [versionBId, setVersionBId] = useState<string>("");
    const [isComparing, setIsComparing] = useState(false);

    const versionA = versions.find((v) => v.id === versionAId);
    const versionB = versions.find((v) => v.id === versionBId);

    const handleCompare = () => {
        if (versionA && versionB) {
            setIsComparing(true);
        }
    };

    const handleReset = () => {
        setIsComparing(false);
    };

    if (versions.length < 2) {
        return (
            <div className="flex flex-col items-center justify-center h-[calc(100vh-48px)] text-center p-6">
                <AlertCircle className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <h2 className="text-lg font-medium mb-2">
                    Not Enough Versions
                </h2>
                <p className="text-sm text-muted-foreground max-w-md">
                    You need at least 2 saved versions to compare. Go to the
                    Playground, run some prompts, and save them as versions.
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-[calc(100vh-48px)] overflow-hidden">
            {/* Version Selector Bar */}
            <div className="p-4 border-b border-border bg-card flex items-end gap-4">
                <div className="flex flex-col gap-1.5">
                    <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        Version A
                    </Label>
                    <Select
                        value={versionAId}
                        onValueChange={(v) => {
                            setVersionAId(v);
                            setIsComparing(false);
                        }}
                    >
                        <SelectTrigger className="w-[200px] font-mono text-sm">
                            <SelectValue placeholder="Select version..." />
                        </SelectTrigger>
                        <SelectContent>
                            {versions.map((v) => (
                                <SelectItem
                                    key={v.id}
                                    value={v.id}
                                    disabled={v.id === versionBId}
                                >
                                    v{v.version} —{" "}
                                    {format(
                                        new Date(v.timestamp),
                                        "MMM d, HH:mm"
                                    )}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex flex-col gap-1.5">
                    <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        Version B
                    </Label>
                    <Select
                        value={versionBId}
                        onValueChange={(v) => {
                            setVersionBId(v);
                            setIsComparing(false);
                        }}
                    >
                        <SelectTrigger className="w-[200px] font-mono text-sm">
                            <SelectValue placeholder="Select version..." />
                        </SelectTrigger>
                        <SelectContent>
                            {versions.map((v) => (
                                <SelectItem
                                    key={v.id}
                                    value={v.id}
                                    disabled={v.id === versionAId}
                                >
                                    v{v.version} —{" "}
                                    {format(
                                        new Date(v.timestamp),
                                        "MMM d, HH:mm"
                                    )}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <Button
                    onClick={isComparing ? handleReset : handleCompare}
                    disabled={!versionAId || !versionBId}
                    className="gap-2"
                >
                    <GitCompare className="h-3.5 w-3.5" />
                    {isComparing ? "Reset" : "Compare"}
                </Button>
            </div>

            {/* Comparison Content */}
            {isComparing && versionA && versionB ? (
                <div className="flex-1 overflow-auto p-6">
                    <Tabs defaultValue="system" className="w-full">
                        <TabsList className="mb-4">
                            <TabsTrigger value="system">
                                System Prompt Diff
                            </TabsTrigger>
                            <TabsTrigger value="user">
                                User Prompt Diff
                            </TabsTrigger>
                            <TabsTrigger value="output">
                                Output Comparison
                            </TabsTrigger>
                        </TabsList>


                    </Tabs>

                    {/* Metadata Comparison Table */}
                    <div className="mt-8">
                        <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-3 block">
                            Metadata Comparison
                        </Label>
                        <div className="border border-border rounded-md overflow-hidden">
                            <table className="w-full text-sm font-mono">
                                <thead className="bg-secondary">
                                    <tr>
                                        <th className="text-left p-3 font-medium text-muted-foreground">
                                            Field
                                        </th>
                                        <th className="text-left p-3 font-medium text-muted-foreground">
                                            v{versionA.version}
                                        </th>
                                        <th className="text-left p-3 font-medium text-muted-foreground">
                                            v{versionB.version}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    <tr>
                                        <td className="p-3 text-muted-foreground">
                                            Model
                                        </td>
                                        <td className="p-3">
                                            {versionA.metadata.model}
                                        </td>
                                        <td className="p-3">
                                            {versionB.metadata.model}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="p-3 text-muted-foreground">
                                            Input Tokens
                                        </td>
                                        <td className="p-3">
                                            {versionA.metadata.inputTokens.toLocaleString()}
                                        </td>
                                        <td className="p-3">
                                            {versionB.metadata.inputTokens.toLocaleString()}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="p-3 text-muted-foreground">
                                            Output Tokens
                                        </td>
                                        <td className="p-3">
                                            {versionA.metadata.outputTokens.toLocaleString()}
                                        </td>
                                        <td className="p-3">
                                            {versionB.metadata.outputTokens.toLocaleString()}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="p-3 text-muted-foreground">
                                            Latency
                                        </td>
                                        <td className="p-3">
                                            {versionA.metadata.latencyMs.toLocaleString()}
                                            ms
                                        </td>
                                        <td className="p-3">
                                            {versionB.metadata.latencyMs.toLocaleString()}
                                            ms
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="p-3 text-muted-foreground">
                                            Temperature
                                        </td>
                                        <td className="p-3">
                                            {versionA.temperature.toFixed(2)}
                                        </td>
                                        <td className="p-3">
                                            {versionB.temperature.toFixed(2)}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="p-3 text-muted-foreground">
                                            Max Tokens
                                        </td>
                                        <td className="p-3">
                                            {versionA.maxTokens.toLocaleString()}
                                        </td>
                                        <td className="p-3">
                                            {versionB.maxTokens.toLocaleString()}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
                    <GitCompare className="h-12 w-12 text-muted-foreground/50 mb-4" />
                    <h2 className="text-lg font-medium mb-2">
                        Select Versions to Compare
                    </h2>
                    <p className="text-sm text-muted-foreground max-w-md">
                        Choose two versions from the dropdowns above and click
                        Compare to see a side-by-side diff of prompts and
                        outputs.
                    </p>
                </div>
            )}
        </div>
    );
}
