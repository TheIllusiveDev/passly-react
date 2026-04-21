import { create } from "zustand";
import { type User } from "@supabase/supabase-js";

interface Profile {
  id: string;
  is_organization: boolean;
  full_name: string | null;
}

interface AuthState {
  user: User | null;
  profile: Profile | null;
  setUser: (user: User | null) => void;
  setProfile: (profile: Profile | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  profile: null,
  setUser: (user: User | null) => set({ user }),
  setProfile: (profile) => set({ profile }),
}));
