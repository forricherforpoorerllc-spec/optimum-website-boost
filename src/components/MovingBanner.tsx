import { Truck } from "lucide-react";

const MovingBanner = ({ onOrderClick }: { onOrderClick: (plan?: string) => void }) => (
  <section className="bg-navy py-4" aria-label="Moving service transfer">
    <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-4">
      <div className="flex items-center gap-3">
        <Truck className="w-6 h-6 text-navy-foreground" />
        <p className="text-navy-foreground font-semibold text-sm md:text-base">
          Moving soon? Transfer your Optimum Internet service at no cost.
        </p>
      </div>
      <button onClick={() => onOrderClick()} className="border border-accent text-accent font-semibold px-5 py-2 rounded-full text-sm hover:bg-accent hover:text-accent-foreground transition-colors">
        Get Started
      </button>
    </div>
  </section>
);

export default MovingBanner;
