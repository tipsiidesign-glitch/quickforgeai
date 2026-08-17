import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
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
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Turn your study material into smart practice.
        </p>
      </div>
    </main>
  );
}
