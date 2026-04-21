import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Mail, Lock, X } from "lucide-react";

interface AuthState {
    isOpen: boolean;
    onClose: () => void;
}

export const AuthModal = ({ isOpen, onClose }: AuthState) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    
    if (!isOpen) return null;
    
    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const { error } = isSignUp 
        ? await supabase.auth.signUp({ email, password })
        : await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            window.alert(error.message);
        } else {
            if (isSignUp) window.alert("Check your email for confirmation link!");
            onClose();
        }
        setIsLoading(false);
    }

    return (
        <div className="modal modal-open">
            <div className="modal-box relative">
                <button onClick={onClose} className="btn btn-sm btn-circle absolute right-2 top-2"> <X size={16} /> </button>

                <h3 className="text-2xl font-bold mb-6 text-center">
                    {isSignUp ? 'Create Passly Account' : 'Welcome Back'}
                </h3>

                <form onSubmit={handleAuth} className="space-y-4">
                    {/*  */}
                    <div className="form-control">
                        <label className="label"><span className="label-text font-semibold">Email</span></label>
                        <div className="input input-bordered flex items-center gap-2">
                            <Mail size={18} className="opacity-50" />
                            <input type="email" placeholder="you@email.com" className="grow" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                    </div>

                    <div className="form-control">
                        <label className="label"><span className="label label-text font-semibold">Password</span></label>
                        <div className="input input-bordered flex items-center gap-2">
                            <Lock size={18} className="opacity-50" />
                            <input type="password" placeholder="••••••••" className="grow" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                    </div>

                    <button className={`btn btn-primary w-full ${isLoading ? 'loading' : ''}`} disabled={isLoading}>
                        {isSignUp ? 'Register' : 'Login'}
                    </button>
                </form>

                <div className="divider text-xs opacity-50">OR</div>

                <button className="btn btn-ghost btn-sm w-full" onClick={() => setIsSignUp(!isSignUp)}>
                    {isSignUp ? 'Already have an account? Login' : 'Need an accont? Sign Up'}
                </button>
            </div>
            <div className="modal-backdrop bg-black/50" onClick={onClose} />
        </div>
    )
}