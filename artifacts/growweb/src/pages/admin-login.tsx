import React from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Shield, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAdminLogin } from "@/lib/api-client";
import { useToast } from "@/hooks/use-toast";

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const adminLogin = useAdminLogin();

  React.useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (token) setLocation("/admin/dashboard");
  }, [setLocation]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;
    try {
      const result = await adminLogin.mutateAsync({ data: { username, password } });
      localStorage.setItem("admin_token", result.token);
      localStorage.setItem("admin_username", result.username);
      setLocation("/admin/dashboard");
    } catch (err: unknown) {
      const status = (err as { status?: number })?.status;
      toast({
        title: "Login failed",
        description:
          status === 401
            ? "Invalid username or password."
            : status != null
              ? `Server error (${status}). Please try again.`
              : "Could not connect to the server. Check your connection.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-background via-background to-primary/5" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-100 h-100 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md px-6"
      >
        <div className="bg-card border border-border rounded-3xl p-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/3 rounded-3xl" />
          <div className="relative z-10">
            <div className="flex flex-col items-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(0,255,136,0.2)]">
                <Shield size={32} className="text-primary" />
              </div>
              <div className="flex items-center gap-2 mb-1">
                <img src="/growweb-logo.jpg" alt="GROWWEB" className="w-6 h-6 rounded object-cover" />
                <span className="font-bold text-lg tracking-wider">GROW<span className="text-primary">WEB</span></span>
              </div>
              <h1 className="text-2xl font-bold mt-2">Admin Access</h1>
              <p className="text-muted-foreground text-sm mt-1">Authorized personnel only</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  autoComplete="username"
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/60 transition-colors placeholder:text-muted-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    autoComplete="current-password"
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 pr-12 text-sm focus:outline-none focus:border-primary/60 transition-colors placeholder:text-muted-foreground"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={adminLogin.isPending || !username || !password}
                className="w-full rounded-xl py-6 font-semibold shadow-[0_0_20px_rgba(0,255,136,0.3)]"
              >
                {adminLogin.isPending ? (
                  <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" /> Authenticating...</span>
                ) : "Sign In to Dashboard"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-xs text-muted-foreground/50">This page is not publicly accessible.<br />Authorized admin access only.</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
