import { useState } from "react";
import { Check, Lock, Zap, Gamepad2, MonitorPlay, Download, Home, Shield } from "lucide-react";

const internetPlans = [
  {
    name: "300 Mbps",
    subtitle: "Optimum Internet",
    price: 25,
    originalPrice: null,
    features: [
      "Blazing-fast 300 Mbps download speeds",
      "HD & 4K video streaming",
      "Online gaming with low latency",
      "Fast large file downloads",
      "5-year price lock guarantee",
    ],
    icon: Download,
    savings: "Save $120/year vs. competitors",
    popular: false,
  },
  {
    name: "500 Mbps",
    subtitle: "Optimum Internet",
    price: 35,
    originalPrice: null,
    features: [
      "Ultra-fast 500 Mbps download speeds",
      "Seamless 4K UHD streaming on multiple devices",
      "Competitive multiplayer gaming",
      "Work from home & video conferencing",
      "5-year price lock guarantee",
    ],
    icon: MonitorPlay,
    savings: "Save $300/year vs. competitors",
    popular: true,
  },
  {
    name: "1 Gig",
    subtitle: "Optimum Fiber Internet",
    price: 45,
    originalPrice: null,
    features: [
      "Gigabit 1,000 Mbps download speeds",
      "Ultra-connected smart homes",
      "Support for 10+ simultaneous devices",
      "Perfect for power users & large households",
      "5-year price lock guarantee",
    ],
    icon: Zap,
    savings: "Save $300/year vs. competitors",
    popular: false,
  },
];

const bundlePlans = [
  {
    name: "300 Mbps + Mobile",
    subtitle: "Optimum Internet + Mobile Bundle",
    price: 60,
    originalPrice: 80,
    features: [
      "300 Mbps high-speed internet",
      "Unlimited mobile data, talk & text",
      "5-year internet price lock",
      "Optimum Complete Discount — $10/mo off internet",
    ],
    icon: Download,
    savings: "Save $240/year when you bundle",
    popular: false,
  },
  {
    name: "500 Mbps + Mobile",
    subtitle: "Optimum Internet + Mobile Bundle",
    price: 70,
    originalPrice: 90,
    features: [
      "500 Mbps ultra-fast internet",
      "Unlimited mobile data, talk & text",
      "5-year internet price lock",
      "Optimum Complete Discount — $10/mo off internet",
    ],
    icon: MonitorPlay,
    savings: "Save $240/year when you bundle",
    popular: true,
  },
  {
    name: "1 Gig + Mobile",
    subtitle: "Optimum Fiber Internet + Mobile Bundle",
    price: 80,
    originalPrice: 100,
    features: [
      "Gigabit 1,000 Mbps fiber internet",
      "Unlimited mobile data, talk & text",
      "5-year internet price lock",
      "Optimum Complete Discount — $10/mo off internet",
      "Best value for connected households",
    ],
    icon: Zap,
    savings: "Save $240/year when you bundle",
    popular: false,
  },
];

const PlansSection = ({ onOrderClick }: { onOrderClick: () => void }) => {
  const [tab, setTab] = useState<"internet" | "bundle">("internet");
  const plans = tab === "internet" ? internetPlans : bundlePlans;

  return (
    <section id="internet" className="py-16 md:py-24 bg-secondary" aria-labelledby="plans-heading">
      <div className="container mx-auto px-4">
        <h2 id="plans-heading" className="text-3xl md:text-4xl font-extrabold text-center text-foreground mb-4">
          Choose the Best Optimum Internet Plan for Your Home
        </h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-8">
          Optimum offers high-speed fiber internet plans with unlimited data, no annual contracts, and a 5-year price lock. Whether you need internet for streaming, gaming, or remote work, Optimum has a plan that fits your household.
        </p>

        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div className="bg-background rounded-full p-1 border border-border inline-flex">
            <button
              onClick={() => setTab("internet")}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${tab === "internet" ? "hero-gradient text-primary-foreground shadow-md" : "text-muted-foreground hover:text-foreground"}`}
            >
              Internet Only
            </button>
            <button
              onClick={() => setTab("bundle")}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${tab === "bundle" ? "hero-gradient text-primary-foreground shadow-md" : "text-muted-foreground hover:text-foreground"}`}
            >
              Bundle & Save
            </button>
          </div>
        </div>

        {/* Plan cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`relative bg-card rounded-2xl shadow-lg border-2 overflow-hidden transition-transform hover:-translate-y-1 ${plan.popular ? "border-accent" : "border-border"}`}
            >
              {plan.popular && (
                <div className="cta-gradient text-accent-foreground text-center text-xs font-bold py-1.5 uppercase tracking-wider">
                  Most Popular Optimum Plan
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-1">
                  <plan.icon className="w-5 h-5 text-accent" />
                  <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
                </div>
                <p className="text-xs text-muted-foreground mb-4">{plan.subtitle}</p>

                <div className="bg-secondary rounded-xl p-4 mb-4">
                  <p className="text-xs text-teal font-semibold mb-1">{plan.savings}</p>
                  <div className="flex items-end gap-1">
                    {plan.originalPrice && (
                      <span className="text-muted-foreground line-through text-lg mr-1">${plan.originalPrice}</span>
                    )}
                    <span className="text-foreground text-lg font-bold">$</span>
                    <span className="text-foreground text-5xl font-extrabold leading-none">{plan.price}</span>
                    <span className="text-muted-foreground text-sm mb-1">/mo</span>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <Lock className="w-3 h-3 text-teal" />
                    <span className="text-xs text-muted-foreground">5-year price lock</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">w/ eligible $10/mo Auto Pay & Paperless Bill discount. Plus taxes & fees.</p>
                </div>

                <ul className="space-y-2 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-foreground">
                      <Check className="w-4 h-4 text-teal flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>

                <button onClick={onOrderClick} className="w-full cta-gradient text-accent-foreground font-bold py-3 rounded-full hover:opacity-90 transition-opacity">
                  Order Online
                </button>
              </div>
            </article>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6 max-w-3xl mx-auto">
          *Not available in all areas. Advertised max speed for wired connection. Actual Optimum internet speeds, including over WiFi, may vary and are not guaranteed. Optimum internet service requires compatible equipment. See full terms and conditions for details.
        </p>
      </div>
    </section>
  );
};

export default PlansSection;
