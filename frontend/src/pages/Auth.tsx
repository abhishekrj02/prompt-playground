import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Terminal, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthStore } from "@/store/authStore";

export default function Auth() {
    const navigate = useNavigate();
    const { signIn, signUp, isAuthenticated } = useAuthStore();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Sign In form state
    const [signInEmail, setSignInEmail] = useState("");
    const [signInPassword, setSignInPassword] = useState("");

    // Sign Up form state
    const [signUpName, setSignUpName] = useState("");
    const [signUpEmail, setSignUpEmail] = useState("");
    const [signUpPassword, setSignUpPassword] = useState("");
    const [signUpConfirmPassword, setSignUpConfirmPassword] = useState("");

    // Redirect if already authenticated
    if (isAuthenticated) {
        navigate("/");
        return null;
    }

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        const result = await signIn(signInEmail, signInPassword);

        setIsLoading(false);
        if (result.success) {
            navigate("/");
        } else {
            setError(result.error || "Sign in failed");
        }
    };

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (signUpPassword !== signUpConfirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (signUpPassword.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        setIsLoading(true);
        const result = await signUp(signUpEmail, signUpPassword, signUpName);

        setIsLoading(false);
        if (result.success) {
            navigate("/");
        } else {
            setError(result.error || "Sign up failed");
        }
    };

    return (
        <div className="min-h-screen min-w-screen bg-background flex flex-col">
            <div className="flex-1 flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    <div className="flex items-center justify-center gap-2 mb-8">
                        <Terminal className="h-6 w-6 text-primary" />
                        <span className="text-xl font-medium text-foreground">
                            Prompt Playground
                        </span>
                    </div>

                    <div className="bg-card border border-border rounded-lg p-6">
                        <Tabs defaultValue="signin" className="w-full">
                            <TabsList className="grid w-full grid-cols-2 mb-6">
                                <TabsTrigger value="signin">
                                    Sign In
                                </TabsTrigger>
                                <TabsTrigger value="signup">
                                    Sign Up
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="signin">
                                <form
                                    onSubmit={handleSignIn}
                                    className="space-y-4"
                                >
                                    <div className="space-y-2">
                                        <Label
                                            htmlFor="signin-email"
                                            className="text-sm text-muted-foreground"
                                        >
                                            Email
                                        </Label>
                                        <Input
                                            id="signin-email"
                                            type="email"
                                            placeholder="demo@example.com"
                                            value={signInEmail}
                                            onChange={(e) =>
                                                setSignInEmail(e.target.value)
                                            }
                                            required
                                            className="font-mono text-sm"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label
                                            htmlFor="signin-password"
                                            className="text-sm text-muted-foreground"
                                        >
                                            Password
                                        </Label>
                                        <Input
                                            id="signin-password"
                                            type="password"
                                            placeholder="demo123"
                                            value={signInPassword}
                                            onChange={(e) =>
                                                setSignInPassword(
                                                    e.target.value,
                                                )
                                            }
                                            required
                                            className="font-mono text-sm"
                                        />
                                    </div>

                                    {error && (
                                        <p className="text-sm text-destructive font-mono">
                                            {error}
                                        </p>
                                    )}

                                    <Button
                                        type="submit"
                                        className="w-full"
                                        disabled={isLoading}
                                    >
                                        {isLoading
                                            ? "Signing in..."
                                            : "Sign In"}
                                    </Button>

                                    <p className="text-xs text-muted-foreground text-center font-mono mt-4">
                                        Demo: demo@example.com / demo123
                                    </p>
                                </form>
                            </TabsContent>

                            <TabsContent value="signup">
                                <form
                                    onSubmit={handleSignUp}
                                    className="space-y-4"
                                >
                                    <div className="space-y-2">
                                        <Label
                                            htmlFor="signup-name"
                                            className="text-sm text-muted-foreground"
                                        >
                                            Name
                                        </Label>
                                        <Input
                                            id="signup-name"
                                            type="text"
                                            placeholder="Your name"
                                            value={signUpName}
                                            onChange={(e) =>
                                                setSignUpName(e.target.value)
                                            }
                                            required
                                            className="font-mono text-sm"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label
                                            htmlFor="signup-email"
                                            className="text-sm text-muted-foreground"
                                        >
                                            Email
                                        </Label>
                                        <Input
                                            id="signup-email"
                                            type="email"
                                            placeholder="you@example.com"
                                            value={signUpEmail}
                                            onChange={(e) =>
                                                setSignUpEmail(e.target.value)
                                            }
                                            required
                                            className="font-mono text-sm"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label
                                            htmlFor="signup-password"
                                            className="text-sm text-muted-foreground"
                                        >
                                            Password
                                        </Label>
                                        <Input
                                            id="signup-password"
                                            type="password"
                                            placeholder="Min 6 characters"
                                            value={signUpPassword}
                                            onChange={(e) =>
                                                setSignUpPassword(
                                                    e.target.value,
                                                )
                                            }
                                            required
                                            className="font-mono text-sm"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label
                                            htmlFor="signup-confirm"
                                            className="text-sm text-muted-foreground"
                                        >
                                            Confirm Password
                                        </Label>
                                        <Input
                                            id="signup-confirm"
                                            type="password"
                                            placeholder="Confirm password"
                                            value={signUpConfirmPassword}
                                            onChange={(e) =>
                                                setSignUpConfirmPassword(
                                                    e.target.value,
                                                )
                                            }
                                            required
                                            className="font-mono text-sm"
                                        />
                                    </div>

                                    {error && (
                                        <p className="text-sm text-destructive font-mono">
                                            {error}
                                        </p>
                                    )}

                                    <Button
                                        type="submit"
                                        className="w-full"
                                        disabled={isLoading}
                                    >
                                        {isLoading
                                            ? "Creating account..."
                                            : "Create Account"}
                                    </Button>
                                </form>
                            </TabsContent>
                        </Tabs>
                    </div>
                    <div className="flex justify-center mt-4 animate-caret-blink">
                        <span className="text-md italic text-red-600 font-medium">
                            This project is under development.
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
