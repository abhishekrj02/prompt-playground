import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PromptVersion, PromptConfig, ExecutionMetadata } from "@/types/prompt";

interface PromptState {
    config: PromptConfig;
    output: string;
    metadata: ExecutionMetadata | null;
    versions: PromptVersion[]; //array of promptversion
    isRunning: boolean;
    hasRun: boolean;

    setConfig: (config: Partial<PromptConfig>) => void;
    setOutput: (output: string, metadata: ExecutionMetadata) => void;
    saveVersion: (note?: string) => void;
    loadVersion: (id: string) => PromptVersion | undefined;
    setIsRunning: (isRunning: boolean) => void;
    reset: () => void;
}

const defaultConfig: PromptConfig = {
    systemPrompt: "",
    userPrompt: "",
    variables: '{\n  "tone": "formal",\n  "length": "short"\n}',
    model: "gpt-4o-mini",
    temperature: 0.7,
    maxTokens: 1024,
};

export const usePromptStore = create<PromptState>()(
    persist(
        (set, get) => ({
            config: defaultConfig,
            output: "",
            metadata: null,
            versions: [],
            isRunning: false,
            hasRun: false,

            setConfig: (config) =>
                set((state) => ({
                    config: { ...state.config, ...config },
                })),

            setOutput: (output, metadata) =>
                set({
                    output,
                    metadata,
                    hasRun: true,
                }),

            saveVersion: (note = '') => {
                const state = get();
                if (!state.hasRun) return;

                const newVersion: PromptVersion = {
                    id: crypto.randomUUID(),
                    version: state.versions.length + 1,
                    ...state.config,
                    output: state.output,
                    metadata: state.metadata!,
                    note,
                    timestamp: new Date(),
                };

                set((state) => ({
                    versions: [newVersion, ...state.versions],
                }));
            },

            loadVersion: (id) => {
                const state = get();
                return state.versions.find((v) => v.id === id);
            },

            setIsRunning: (isRunning) => set({ isRunning }),

            reset: () =>
                set({
                    config: defaultConfig,
                    output: '',
                    metadata: null,
                    hasRun: false,
                }),
        }),
        {
            name: "promptPlaygroundStorage", // name of the item in the storage (must be unique)
        }
    )
);
