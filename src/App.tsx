import { useEffect } from "react";
import { supabase } from "./lib/supabaseClient";
import { useAuthStore } from "./store/useAuthStore";
import { Calendar, ShieldCheck, Zap } from "lucide-react";
import { FeatureCard } from "./components/FeatureCard";
import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import "./App.css";

function App() {
  const { user, setUser } = useAuthStore();

  const fetchProfile = async (userId: string) => {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();
    useAuthStore.getState().setProfile(data);
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user ?? null) fetchProfile(session.user.id);
      else useAuthStore.getState().setProfile(null);
    });

    return () => subscription.unsubscribe();
  }, [setUser]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {user ? (
          <div className="p-10 text-center">
            <h1 className="text-2xl">Welcome, {user.email}!</h1>
            <button
              className="btn btn-outline mt-4"
              onClick={() => supabase.auth.signOut()}
            >
              Logout
            </button>
          </div>
        ) : (
          <Hero />
        )}
        <section className="py-20 px-4 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Built for Modern Organizations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<ShieldCheck />}
              title="Secure Passes"
              description="Encrypted QR codes ensure every ticket is unique and tamper-proof."
              colorClass="bg-primary/10 text-primary"
            />
            <FeatureCard
              icon={<Calendar />}
              title="Easy Hosting"
              description="Set up your event in minutes and manage guest lists from a single dasboard."
              colorClass="bg-secondary/10 text-secondary"
            />
            <FeatureCard
              icon={<Zap />}
              title="Near-instant Deliver"
              description="Passes are generated and delivered to users near-instantly upon registration."
              colorClass="bg-accent/10 text-accent"
            />
          </div>
        </section>
      </main>

      <footer className="footer footer-center p-6 bg-base-300 text-base-content">
        <aside>
          <p className="font-bold">Passly Events Ltd.</p>
          <p>&copy; 2026 - All rights reserved</p>
        </aside>
      </footer>
    </div>
  );
}

export default App;
