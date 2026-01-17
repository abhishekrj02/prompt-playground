import { NavLink, useNavigate } from "react-router-dom";
import { Terminal, LogOut, User, Github, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";

export function Navbar() {
    const navigate = useNavigate();
    const { user, isAuthenticated, signOut } = useAuthStore();

    const handleSignOut = () => {
        signOut();
        navigate("/");
    };

    return (
        <nav className="h-12 border-b border-border flex items-center px-4 justify-between">
            <div className="flex items-center gap-6">
                <NavLink to={"/"}>
                    <div className="flex items-center gap-2 text-foreground font-medium">
                        <Terminal className="h-4 w-4" />
                        <span>Prompt Playground</span>
                    </div>
                </NavLink>

                <div className="flex items-center gap-1">
                    <NavLink
                        to="/dashboard"
                        end
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
                        to="/dashboard/compare"
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
                    <NavLink
                        to="/dashboard/versions"
                        className={({ isActive }) =>
                            `px-3 py-1.5 text-sm rounded-md transition-colors flex items-center gap-1.5 ${
                                isActive
                                    ? "bg-secondary text-foreground"
                                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                            }`
                        }
                    >
                        Versions
                    </NavLink>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <Button asChild>
                    <a
                        href="https://github.com/abhishekrj02/prompt-playground"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                    >
                        <Github className="h-4 w-4" />
                    </a>
                </Button>

                {isAuthenticated ? (
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-muted-foreground flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {user?.name}
                        </span>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleSignOut}
                            className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
                        >
                            <LogOut className="h-3 w-3 mr-1" />
                            Sign Out
                        </Button>
                    </div>
                ) : (
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate("/auth")}
                        className="h-7 px-3 text-xs"
                    >
                        Sign In
                    </Button>
                )}
            </div>
        </nav>
    );
}
