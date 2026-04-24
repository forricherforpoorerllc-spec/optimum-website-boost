import { Check, Lock, Zap } from "lucide-react";
import heroImage from "@/assets/hero-family.jpg";

const HeroSection = ({ onOrderClick }: { onOrderClick: (plan?: string) => void }) => {
  return (
    <section className="relative overflow-hidden hero-gradient" aria-labelledby="hero-heading">
      <div className="absolute inset-0 opacity-20">
        <img src={heroImage} alt="Family enjoying fast Optimum fiber internet at home" width={1920} height={1080} className="w-full h-full object-cover" />
      </div>
      <div className="relative container mx-auto px-4 py-10 md:py-14 lg:py-16">
        <div className="max-w-3xl">
          {/* Promo banner */}
          <div className="inline-flex items-center gap-2 bg-teal text-teal-foreground px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold mb-4">
            <Lock className="w-3.5 h-3.5" />
            <span>Lock in 5 years of our lowest Optimum prices</span>
          </div>

          <h1 id="hero-heading" className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary-foreground leading-tight mb-3">
            Our <span className="text-gradient">LOWEST</span>{" "}
            <span className="text-primary-foreground">Optimum Internet Price of the Year</span>
          </h1>

          <p className="text-primary-foreground/80 text-base md:text-lg mb-5 max-w-2xl">
            Blazing-fast fiber, unlimited data, whole-home WiFi. Stream, game, and work from home on the most reliable network in your area.
          </p>

          {/* Price + CTA row */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-3">
            <div className="bg-primary-foreground/10 backdrop-blur-md rounded-xl px-5 py-3 border border-primary-foreground/20">
              <p className="text-primary-foreground/70 text-[11px] font-semibold uppercase tracking-wider">Starting at</p>
              <div className="flex items-end gap-1">
                <span className="text-primary-foreground text-lg font-bold">$</span>
                <span className="text-primary-foreground text-5xl md:text-6xl font-extrabold leading-none">25</span>
                <span className="text-primary-foreground text-lg font-bold mb-1">/mo</span>
                <Lock className="text-teal w-4 h-4 mb-2 ml-2" />
                <span className="text-primary-foreground/70 text-xs mb-1 ml-1">5-Yr Price Lock</span>
              </div>
            </div>
            <button onClick={() => onOrderClick()} className="cta-gradient text-accent-foreground font-bold px-7 py-3.5 rounded-full text-base hover:opacity-90 transition-opacity shadow-lg">
              Order Online Now
            </button>
          </div>
          <p className="text-primary-foreground/60 text-xs mb-4">w/ eligible $10/mo Auto Pay &amp; Paperless Bill discount. Plus taxes &amp; fees.</p>

          {/* Awards */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5">
            {["Fastest Speeds", "Most Reliable", "Most Consistent"].map((award) => (
              <div key={award} className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-teal" />
                <span className="text-primary-foreground/80 text-xs">{award}</span>
              </div>
            ))}
            <span className="text-primary-foreground/40 text-[10px] uppercase tracking-wider">Ookla Speedtest Awards</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
