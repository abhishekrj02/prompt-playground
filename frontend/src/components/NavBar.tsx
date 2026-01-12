import { Link, NavLink } from "react-router-dom";
import {
    LucideSquareTerminal,
    Github,
    ArrowDownUp,
    ArrowRight,
    ArrowUp01,
    ArrowUpRight,
    LucideArrowUpRight,
} from "lucide-react";
import { Button } from "./ui/button";

export function Navbar() {
    return (
        <nav className="h-12 border-b border-border bg-card flex items-center px-4 justify-between">
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-foreground font-medium">
                    <LucideSquareTerminal className="h-4 w-4" />
                    <span>Prompt Playground</span>
                </div>

                <div className="flex items-center gap-1 ">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `px-3 py-1.5 text-sm rounded-md transition-colors ${
                                isActive
                                    ? "bg-secondary text-foreground"
                                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                            }`
                        }
                    >
                        Playground
                    </NavLink>
                    <NavLink
                        to="/compare"
                        className={({ isActive }) =>
                            `px-3 py-1.5 text-sm rounded-md transition-colors ${
                                isActive
                                    ? "bg-secondary text-foreground"
                                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                            }`
                        }
                    >
                        Compare
                    </NavLink>
                </div>
            </div>

            <Button asChild>
                <a
                    href="https://github.com/abhishekrj02/prompt-playground"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                >
                    <Github className="h-4 w-4" />
                    Github
                    <LucideArrowUpRight className="h-4 w-4" />
                </a>
            </Button>
        </nav>
    );
}
