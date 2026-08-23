import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BrandLogo } from "@/components/common/BrandLogo";
import { Loader2 } from "lucide-react";

const emailSchema = z.string().trim().email("Enter a valid email address").max(255);
const passwordSchema = z.string().min(8, "Password must be at least 8 characters").max(72);

export default function AuthPage() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogle = async () => {
    setError(null);
    setGoogleLoading(true);
    const { error: oauthError } = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (oauthError) {
      setGoogleLoading(false);
      setError("Google sign-in failed. Please try again.");
    }
  };

  if (!loading && user) return <Navigate to="/dashboard" replace />;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    const emailResult = emailSchema.safeParse(email);
    if (!emailResult.success) return setError(emailResult.error.issues[0].message);
    const passwordResult = passwordSchema.safeParse(password);
    if (!passwordResult.success) return setError(passwordResult.error.issues[0].message);
    if (mode === "signup" && password !== confirmPassword) return setError("Passwords do not match");

    setSubmitting(true);
    if (mode === "signup") {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: emailResult.data,
        password,
        options: { emailRedirectTo: window.location.origin },
      });
      setSubmitting(false);
      if (signUpError) {
        setError(signUpError.message.includes("already registered") ? "This email is already registered. Try logging in." : signUpError.message);
        return;
      }
      if (!data.session) {
        setEmailSent(true);
        return;
      }
      navigate("/onboarding", { replace: true });
    } else {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: emailResult.data,
        password,
      });
      setSubmitting(false);
      if (signInError) {
        setError("Incorrect email or password.");
        return;
      }
      navigate("/dashboard", { replace: true });
    }
  };

  const handleForgotPassword = async () => {
    const emailResult = emailSchema.safeParse(email);
    if (!emailResult.success) return setError("Enter your email above first, then tap Forgot password.");
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(emailResult.data, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (resetError) return toast.error("Something went wrong. Please try again.");
    toast.success("Password reset link sent. Check your inbox.");
  };

  if (emailSent) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="surface-card w-full max-w-md p-8 text-center">
          <BrandLogo className="justify-center text-lg" />
          <h1 className="mt-6 text-xl font-bold">Check your email</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            We sent a confirmation link to <span className="font-medium text-foreground">{email}</span>. Confirm your
            address to start building tests.
          </p>
          <Button variant="outline" className="mt-6 w-full" onClick={() => { setEmailSent(false); setMode("login"); }}>
            Back to login
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-10">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <BrandLogo className="justify-center text-xl" />
          <p className="mt-3 text-sm text-muted-foreground">Your AI-powered exam preparation companion.</p>
        </div>

        <div className="surface-card p-6 sm:p-8">
          <Tabs value={mode} onValueChange={(v) => { setMode(v as "login" | "signup"); setError(null); }}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete={mode === "signup" ? "new-password" : "current-password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  required
                />
              </div>

              <TabsContent value="signup" className="m-0 space-y-2">
                <Label htmlFor="confirm">Confirm Password</Label>
                <Input
                  id="confirm"
                  type="password"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required={mode === "signup"}
                />
              </TabsContent>

              {error ? (
                <p role="alert" className="rounded-lg bg-error-soft px-3 py-2 text-sm text-destructive">{error}</p>
              ) : null}

              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" /> : null}
                {mode === "signup" ? "Create account" : "Log in"}
              </Button>

              {mode === "login" ? (
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="w-full text-center text-sm font-medium text-primary hover:underline"
                >
                  Forgot password?
                </button>
              ) : null}
            </form>
          </Tabs>

          <div className="my-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-border" />
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">or</span>
            <span className="h-px flex-1 bg-border" />
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full gap-3"
            disabled={googleLoading}
            onClick={handleGoogle}
          >
            {googleLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            ) : (
              <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.76h3.57c2.08-1.92 3.27-4.74 3.27-8.09Z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.76c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
                <path fill="#FBBC05" d="M5.84 14.11a6.6 6.6 0 0 1 0-4.22V7.05H2.18a11 11 0 0 0 0 9.9l3.66-2.84Z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.96 1 12 1 7.7 1 3.99 3.47 2.18 7.05l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38Z" />
              </svg>
            )}
            Sign in with Google
          </Button>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Turn your study material into smart practice.
        </p>
      </div>
    </main>
  );
}
