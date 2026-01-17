import {
  Terminal,
  GitBranch,
  Layers,
  Zap,
  Sparkles,
  Shield,
  Clock,
  BarChart3,
  Code2,
  Workflow,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function About() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Terminal,
      title: "Intelligent Prompt Editor",
      description: "Write and test system prompts, user prompts, and variables with syntax highlighting and real-time validation. Supports JSON variables for dynamic prompt templates with auto-completion.",
      gradient: "from-zinc-400 to-zinc-600"
    },
    {
      icon: GitBranch,
      title: "Version Control",
      description: "Save immutable versions of your prompts with detailed notes and metadata. Track changes over time, branch experiments, and never lose a working configuration.",
      gradient: "from-zinc-500 to-zinc-700"
    },
    {
      icon: Layers,
      title: "Side-by-Side Diff",
      description: "Compare any two versions with line-by-line diffs and semantic highlighting. Visualize exactly what changed in prompts, variables, and outputs between iterations.",
      gradient: "from-zinc-400 to-zinc-600"
    },
    {
      icon: Zap,
      title: "Execution Metrics",
      description: "Track token usage, latency, cost estimation, and model performance for each execution. Optimize your prompts for efficiency and budget with detailed analytics.",
      gradient: "from-zinc-500 to-zinc-700"
    }
  ];

  const capabilities = [
    { icon: Code2, label: "Multi-Model Support", desc: "OpenAI, Anthropic, Google, and more" },
    { icon: Shield, label: "Secure by Design", desc: "API keys never leave your browser" },
    { icon: Clock, label: "Real-time Testing", desc: "Instant feedback on prompt changes" },
    { icon: BarChart3, label: "Analytics Dashboard", desc: "Track performance over time" },
    { icon: Workflow, label: "Workflow Integration", desc: "Export prompts to your codebase" },
    { icon: Sparkles, label: "AI-Assisted", desc: "Smart suggestions and improvements" }
  ];

  const workflow = [
    { step: "01", title: "Create", description: "Write your system and user prompts with our intelligent editor" },
    { step: "02", title: "Test", description: "Execute against multiple models and analyze responses" },
    { step: "03", title: "Iterate", description: "Refine based on metrics and save successful versions" },
    { step: "04", title: "Deploy", description: "Export optimized prompts to your production environment" }
  ];

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Hero Section */}
      <section className="relative py-20 px-8 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-linear-to-br from-zinc-500/10 via-transparent to-zinc-400/10" />
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-zinc-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-zinc-400/15 rounded-full blur-3xl" />

        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/80 backdrop-blur-sm border border-border mb-6">
            <Sparkles className="h-4 w-4 text-zinc-400" />
            <span className="text-sm font-medium text-muted-foreground">Next-Gen Prompt Engineering</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Craft Perfect Prompts with{' '}
            <span className="bg-linear-to-r from-zinc-300 via-zinc-400 to-zinc-500 bg-clip-text text-transparent">
              Precision
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            A professional-grade workspace for creating, testing, versioning, and optimizing
            LLM prompts. Built for developers who demand excellence.
          </p>

          <div className="flex items-center justify-center gap-4">
            <Button
              size="lg"
              onClick={() => navigate('/auth')}
              className="bg-linear-to-r from-zinc-700 to-zinc-900 hover:from-zinc-600 hover:to-zinc-800 text-white px-8 border border-zinc-600"
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/dashboard')}
              className="px-8 border-zinc-600 hover:bg-zinc-800 hover:text-white"
            >
              Try Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Everything You Need
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Professional tools designed for the complete prompt engineering lifecycle
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 hover:border-zinc-600 transition-all duration-300 hover:shadow-lg hover:shadow-zinc-500/10"
              >
                <div className={`inline-flex p-3 rounded-lg bg-linear-to-br ${feature.gradient} mb-4`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>

                {/* Hover gradient effect */}
                <div className={`absolute inset-0 rounded-xl bg-linear-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-16 px-8 bg-secondary/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Streamlined Workflow
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              From idea to production in four simple steps
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            {workflow.map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-card border border-border rounded-xl p-5 h-full">
                  <span className="text-4xl font-bold bg-linear-to-br from-zinc-300 to-zinc-500 bg-clip-text text-transparent">
                    {item.step}
                  </span>
                  <h3 className="text-lg font-semibold text-foreground mt-3 mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                    <ArrowRight className="h-4 w-4 text-muted-foreground/50" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Grid */}
      <section className="py-16 px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Powerful Capabilities
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Built with modern engineering practices in mind
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((cap, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 rounded-lg bg-card/50 border border-border hover:bg-card transition-colors"
              >
                <div className="p-2 rounded-lg bg-zinc-800">
                  <cap.icon className="h-5 w-5 text-zinc-300" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">{cap.label}</h4>
                  <p className="text-sm text-muted-foreground">{cap.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-16 px-8">
        <div className="max-w-3xl mx-auto">
          <div className="relative bg-linear-to-br from-zinc-500/10 via-zinc-600/5 to-zinc-400/10 border border-border rounded-2xl p-8 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-zinc-500/10 rounded-full blur-3xl" />

            <div className="relative">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-lg bg-zinc-700/50">
                  <Sparkles className="h-5 w-5 text-zinc-300" />
                </div>
                <span className="text-sm font-medium text-zinc-400">Demo Mode Available</span>
              </div>

              <h3 className="text-xl font-semibold text-foreground mb-3">
                Try it without signing up
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Experience the full power of Prompt Playground with our demo mode.
                Simulated API responses let you explore every feature before connecting
                your own LLM providers.
              </p>

              <div className="flex flex-wrap gap-3 mb-6">
                {['OpenAI', 'Anthropic', 'Google AI', 'Cohere'].map((provider) => (
                  <span
                    key={provider}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-secondary text-muted-foreground"
                  >
                    {provider}
                  </span>
                ))}
              </div>

              <div className="p-4 rounded-lg bg-card/80 border border-zinc-700 font-mono text-sm">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <CheckCircle2 className="h-4 w-4 text-zinc-400" />
                  <span>Demo credentials</span>
                </div>
                <p className="text-foreground">demo@example.com / demo123</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-8 border-t border-border">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Terminal className="h-4 w-4" />
            <span className="font-mono text-sm">Prompt Playground</span>
          </div>
          <p className="text-xs text-muted-foreground font-mono text-center md:text-right">
            Built for developers • No marketing fluff • Just tools that work
          </p>
        </div>
      </footer>
    </div>
  );
}
