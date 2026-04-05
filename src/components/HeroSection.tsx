import { Check, Lock, Zap } from "lucide-react";
import heroImage from "@/assets/hero-family.jpg";

const HeroSection = ({ onOrderClick }: { onOrderClick: () => void }) => {
  return (
    <section className="relative overflow-hidden hero-gradient" aria-labelledby="hero-heading">
      <div className="absolute inset-0 opacity-20">
        <img src={heroImage} alt="Family enjoying fast Optimum fiber internet at home" width={1920} height={1080} className="w-full h-full object-cover" />
      </div>
      <div className="relative container mx-auto px-4 py-16 md:py-24 lg:py-32">
        <div className="max-w-3xl">
          {/* Promo banner */}
          <div className="inline-flex items-center gap-2 bg-teal text-teal-foreground px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Lock className="w-4 h-4" />
            <span>Sign up today — lock in 5 years of our lowest Optimum Internet prices</span>
          </div>

          <h1 id="hero-heading" className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground leading-tight mb-4">
            Get Our <span className="text-gradient">LOWEST</span>{" "}
            <span className="text-primary-foreground">Optimum Internet Price of the Year!</span>
          </h1>

          <p className="text-primary-foreground/80 text-lg md:text-xl mb-8 max-w-2xl">
            Optimum fiber internet delivers blazing-fast download speeds, unlimited data, and whole-home WiFi coverage. Stream, game, and work from home with the most reliable internet service provider in your area.
          </p>

          {/* Price callout */}
          <div className="bg-primary-foreground/10 backdrop-blur-md rounded-2xl p-6 md:p-8 inline-block mb-8 border border-primary-foreground/20">
            <p className="text-primary-foreground/70 text-sm font-semibold uppercase tracking-wider mb-2">Optimum Internet Starting At Just</p>
            <div className="flex items-end gap-1">
              <span className="text-primary-foreground text-2xl font-bold">$</span>
              <span className="text-primary-foreground text-7xl md:text-8xl font-extrabold leading-none">25</span>
              <span className="text-primary-foreground text-2xl font-bold mb-2">/mo</span>
              <span className="text-primary-foreground/60 text-lg ml-4 mb-2">+ 5-Year Price Lock</span>
              <Lock className="text-teal w-5 h-5 mb-3 ml-1" />
            </div>
            <p className="text-primary-foreground/60 text-xs mt-2">w/ eligible $10/mo Auto Pay & Paperless Bill discount. Plus taxes & fees.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button onClick={onOrderClick} className="cta-gradient text-accent-foreground font-bold px-8 py-4 rounded-full text-lg hover:opacity-90 transition-opacity shadow-lg">
              Order Online Now
            </button>
          </div>

          {/* Awards */}
          <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-4 inline-block border border-primary-foreground/10">
            <p className="text-primary-foreground/80 text-xs font-bold uppercase tracking-wider mb-2">Ookla Speedtest Awards:</p>
            <div className="flex flex-wrap gap-4">
              {["Fastest Internet Speeds", "Most Reliable Speeds", "Most Consistent Speeds"].map((award) => (
                <div key={award} className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-teal" />
                  <span className="text-primary-foreground text-sm">{award}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
