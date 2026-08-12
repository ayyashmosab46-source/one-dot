import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";
import { formatApiErrorDetail } from "../lib/api";
import { ArrowLeft } from "@phosphor-icons/react";

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => { if (user) navigate("/admin"); }, [user, navigate]);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email.trim(), password);
      toast.success("Welcome back");
      navigate("/admin");
    } catch (err) {
      toast.error(formatApiErrorDetail(err.response?.data?.detail) || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dot-bg flex items-center justify-center px-5">
      <div className="w-full max-w-sm">
        <button onClick={() => navigate("/")} className="flex items-center gap-2 text-dot-gray hover:text-dot-cream text-sm mb-10">
          <ArrowLeft size={16} /> One Dot
        </button>
        <div className="flex items-center gap-2 mb-2">
          <span className="h-2 w-2 rounded-full bg-dot-gold" />
          <span className="font-display text-2xl tracking-[0.3em] text-dot-cream">ONE DOT</span>
        </div>
        <p className="text-dot-muted text-sm mb-8">Admin Dashboard</p>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="text-xs tracking-[0.2em] uppercase text-dot-gray">Email</label>
            <input
              data-testid="login-email"
              type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
              className="mt-2 w-full bg-dot-card border border-white/10 rounded-lg px-4 py-3 text-dot-cream focus:border-dot-gold outline-none"
            />
          </div>
          <div>
            <label className="text-xs tracking-[0.2em] uppercase text-dot-gray">Password</label>
            <input
              data-testid="login-password"
              type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
              className="mt-2 w-full bg-dot-card border border-white/10 rounded-lg px-4 py-3 text-dot-cream focus:border-dot-gold outline-none"
            />
          </div>
          <button
            data-testid="login-submit"
            disabled={loading}
            className="w-full py-3 rounded-full bg-dot-gold text-black tracking-[0.2em] uppercase text-sm font-medium hover:bg-dot-goldMuted transition-colors disabled:opacity-60"
          >
            {loading ? "…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
