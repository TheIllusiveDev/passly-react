import { Calendar, ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <section className="hero min-h-[60vh] bg-base-200">
      <div className="hero-content flex-col text-center">
        <h1 className="text-5xl md:text-7xl font-bold leading-tight">
          Events made <span className="text-primary italic">seamless.</span>
        </h1>
        <p className="py-6 text-lg opacity-80">
          The all-in-one platform for organisations to host events and attendees
          to get instant and secure digital passes.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button className="btn btn-primary btn-lg gap-2">
            Host an event <Calendar size={20} />
          </button>
          <button className="btn btn-outline btn-lg gap-2">
            Browse Events <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};
