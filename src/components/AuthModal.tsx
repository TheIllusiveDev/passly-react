import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Mail, Lock, X } from "lucide-react";
import "../index.css";

interface AuthState {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal = ({ isOpen, onClose }: AuthState) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isOrganization, setIsOrganization] = useState(false);

  if (!isOpen) return null;

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (isSignUp) {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) {
        window.alert(error.message);
      } else if (data.user) {
        const { error: profileError } = await supabase.from("profiles").insert([
          {
            id: data.user.id,
            email: email,
            is_organization: isOrganization,
            full_name: email.split("@")[0],
          },
        ]);

        if (profileError) {
          console.error("Profile creation error: ", profileError);
        }
        window.alert("Registration successful! Check your email.");
        onClose();
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) window.alert(error.message);
      else onClose();
    }
    setIsLoading(false);
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box relative">
        <button
          onClick={onClose}
          className="btn btn-sm btn-circle absolute right-2 top-2"
        >
          {" "}
          <X size={16} />{" "}
        </button>

        <h3 className="text-2xl font-bold mb-6 text-center">
          {isSignUp ? "Create Passly Account" : "Welcome Back"}
        </h3>

        <form onSubmit={handleAuth} className="space-y-4">
          <div className="form-control">
            <label className="label special-nosel" htmlFor="emailInput">
              <span className="label-text font-semibold">Email</span>
            </label>
            <div className="input input-bordered w-full flex items-center gap-2">
              <Mail size={18} className="opacity-50" />
              <input
                type="email"
                placeholder="you@email.com"
                id="emailInput"
                className="grow"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label special-nosel" htmlFor="passwordInput">
              <span className="label label-text font-semibold">Password</span>
            </label>
            <div className="input input-bordered w-full flex items-center gap-2">
              <Lock size={18} className="opacity-50" />
              <input
                type="password"
                placeholder="••••••••"
                id="passwordInput"
                className="grow"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {isSignUp && (
            <div className="form-control">
              <label className="label cursor-pointer justify-start gap-3">
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary"
                  checked={isOrganization}
                  onChange={(e) => setIsOrganization(e.target.checked)}
                />
              </label>
            </div>
          )}

          <button
            className={`btn btn-primary w-full ${isLoading ? "loading" : ""}`}
            disabled={isLoading}
          >
            {isSignUp ? "Register" : "Login"}
          </button>
        </form>

        <div className="divider text-xs opacity-50">OR</div>

        <button
          className="btn btn-ghost btn-sm w-full shadow-xl hover:border-primary"
          onClick={() => setIsSignUp(!isSignUp)}
        >
          {isSignUp
            ? "Already have an account? Login"
            : "Need an account? Sign Up"}
        </button>
      </div>
      <div className="modal-backdrop bg-black/50" onClick={onClose} />
    </div>
  );
};
