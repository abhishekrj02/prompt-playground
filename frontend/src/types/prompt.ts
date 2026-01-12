export interface PromptVersion {
    id: string;
    version: number;
    systemPrompt: string;
    userPrompt: string;
    variables: string;
    temperature: number;
    maxTokens: number;
    model: string;
    output: string;
    metadata: ExecutionMetadata;
    note: string;
    timestamp: Date;
}

export interface ExecutionMetadata {
    model: string;
    inputTokens: number;
    outputTokens: number;
    latencyMs: number;
    timestamp: Date;
}

export interface PromptConfig {
    systemPrompt: string;
    userPrompt: string;
    variables: string;
    model: string;
    temperature: number;
    maxTokens: number;
}
