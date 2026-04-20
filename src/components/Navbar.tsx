import { Ticket } from "lucide-react";

export const Navbar = () => {
  return (
    <nav className="navbar bg-base-100 px-4 md:px-12 border-b border-base-200">
      <div className="flex-1">
        <a className="text-2xl font-black tracking-tighter text-primary flex items-center gap-2 cursor-pointer">
          <Ticket className="rotate-12" /> PASSLY
        </a>
      </div>
      <div className="flex-none gap-2">
        <button className="btn btn-ghost btn-sm md:btn-md">Login</button>
        <button className="btn btn-primary btn-sm md:btn-md">
          Get Started
        </button>
      </div>
    </nav>
  );
};
