import { useState } from 'react';
import { Ticket } from "lucide-react";
import { AuthModal } from './AuthModal';
import { useAuthStore } from '../store/useAuthStore';
import { supabase } from '../lib/supabaseClient';

export const Navbar = () => {
  const [modalState, setModalState] = useState(false);
  const user = useAuthStore((state) => state.user);

  return (
    <>
      <nav className="navbar bg-base-100 px-4 md:px-12 border-b border-base-200">
        <div className="flex-1">
          <a className="text-2xl font-black tracking-tighter text-primary flex items-center gap-2 cursor-pointer">
            <Ticket className="rotate-12" /> PASSLY
          </a>
        </div>
        <div className="flex-none gap-2">
          {user ? (
            <button className="btn btn-ghost btn-sm" onClick={() => supabase.auth.signOut()}>Logout</button>
          ) : (
            <>
              <button className="btn btn-ghost btn-sm" onClick={() => setModalState(true)}>Login</button>
              <button className="btn btn-primary btn-sm" onClick={() => setModalState(true)}>Get Started</button>
            </>
          )}
        </div>
      </nav>

      <AuthModal isOpen={modalState} onClose={() => setModalState(false)} />
    </>
  );
};
