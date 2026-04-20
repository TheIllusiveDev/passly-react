import { type ReactNode } from "react";

interface FeatureProps {
  icon: ReactNode;
  title: string;
  description: string;
  colorClass: string;
}

export const FeatureCard = ({
  icon,
  title,
  description,
  colorClass,
}: FeatureProps) => {
  return (
    <div className="card bg-base-100 shadow-xl border border-base-300 hover:border-primary transition-colors">
      <div className="card-body">
        <div
          className={`${colorClass} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}
        >
          {icon}
        </div>
        <h3 className="card-title">{title}</h3>
        <p className="opacity-70">{description}</p>
      </div>
    </div>
  );
};
