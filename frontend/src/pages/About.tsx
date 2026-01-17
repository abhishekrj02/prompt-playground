import { Terminal, GitBranch, Layers, Zap } from 'lucide-react';

export default function About() {
  return (
    <div className="flex-1 p-8 m-4 max-w-4xl bg-amber-500 mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-medium text-foreground mb-2">About Prompt Playground</h1>
        <p className="text-muted-foreground">
          A developer tool for creating, testing, and versioning LLM prompts.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-card border border-border rounded-lg p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-secondary rounded">
              <Terminal className="h-4 w-4 text-primary" />
            </div>
            <h2 className="font-medium text-foreground">Prompt Editor</h2>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Write and test system prompts, user prompts, and variables with a clean, 
            developer-focused interface. Supports JSON variables for dynamic prompt templates.
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-secondary rounded">
              <GitBranch className="h-4 w-4 text-primary" />
            </div>
            <h2 className="font-medium text-foreground">Version History</h2>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Save immutable versions of your prompts with notes. Track changes over time 
            and never lose a working configuration.
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-secondary rounded">
              <Layers className="h-4 w-4 text-primary" />
            </div>
            <h2 className="font-medium text-foreground">Side-by-Side Comparison</h2>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Compare any two versions with line-by-line diffs. See exactly what changed 
            in prompts and outputs between iterations.
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-secondary rounded">
              <Zap className="h-4 w-4 text-primary" />
            </div>
            <h2 className="font-medium text-foreground">Execution Metrics</h2>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Track token usage, latency, and model performance for each prompt execution. 
            Optimize your prompts for cost and speed.
          </p>
        </div>
      </div>

      <div className="mt-8 bg-secondary/50 border border-border rounded-lg p-5">
        <h3 className="font-medium text-foreground mb-2">Demo Mode</h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-3">
          This is a demo version with simulated API responses. In production, connect 
          to your preferred LLM provider (OpenAI, Anthropic, etc.) via API keys.
        </p>
        <div className="font-mono text-xs text-muted-foreground">
          <p>Demo credentials: demo@example.com / demo123</p>
        </div>
      </div>

      <div className="mt-8 border-t border-border pt-6">
        <p className="text-xs text-muted-foreground font-mono">
          Built for developers • No marketing fluff • Just tools that work
        </p>
      </div>
    </div>
  );
}
