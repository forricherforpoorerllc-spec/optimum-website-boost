import { Check, Lock, Zap, MonitorPlay, Download, Wifi, Tv, Smartphone } from "lucide-react";
import { INTERNET_PLANS, TV_INTERNET_DISCOUNT, MOBILE_INTERNET_DISCOUNT } from "@/lib/catalog";

const planIcons: Record<string, typeof Download> = {
  "300": Download,
  "500": MonitorPlay,
  "1gig": Zap,
};

const PlansSection = ({ onOrderClick }: { onOrderClick: (plan?: string) => void }) => {
  return (
    <section id="internet" className="py-16 md:py-24 bg-secondary" aria-labelledby="plans-heading">
      <div className="container mx-auto px-4">
        <h2 id="plans-heading" className="text-3xl md:text-4xl font-extrabold text-center text-foreground mb-4">
          Choose the Best Optimum Internet Plan for Your Home
        </h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-10">
          Optimum fiber Internet with unlimited data, no annual contracts, and a 5-year price guarantee. Add TV, mobile, or both in the next step and watch your discounts stack up automatically.
        </p>

        {/* Plan cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {INTERNET_PLANS.map((plan) => {
            const Icon = planIcons[plan.id] ?? Wifi;
            return (
              <article
                key={plan.id}
                className={`relative bg-card rounded-2xl shadow-lg border-2 overflow-hidden transition-transform hover:-translate-y-1 ${plan.recommended ? "border-accent" : "border-border"}`}
              >
                {plan.recommended && (
                  <div className="cta-gradient text-accent-foreground text-center text-xs font-bold py-1.5 uppercase tracking-wider">
                    Most Popular Optimum Plan
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className="w-5 h-5 text-accent" />
                    <h3 className="text-xl font-bold text-foreground">{plan.shortName}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground mb-4">{plan.tagline}</p>

                  <div className="bg-secondary rounded-xl p-4 mb-4">
                    <div className="flex items-end gap-1">
                      <span className="text-foreground text-lg font-bold">$</span>
                      <span className="text-foreground text-5xl font-extrabold leading-none">{plan.price}</span>
                      <span className="text-muted-foreground text-sm mb-1">/mo</span>
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <Lock className="w-3 h-3 text-teal" />
                      <span className="text-xs text-muted-foreground">5-year price guarantee</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      w/ Auto Pay &amp; Paperless Bill discount. Plus taxes &amp; fees.
                    </p>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {plan.bullets.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-foreground">
                        <Check className="w-4 h-4 text-teal flex-shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => onOrderClick(plan.id)}
                    className="w-full cta-gradient text-accent-foreground font-bold py-3 rounded-full hover:opacity-90 transition-opacity"
                  >
                    Order {plan.shortName}
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bundle-savings callout strip */}
        <div className="mt-10 max-w-5xl mx-auto grid sm:grid-cols-2 gap-4">
          <div className="bg-card border border-border rounded-2xl p-5 flex items-start gap-3">
            <Tv className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-foreground">Add TV, save ${TV_INTERNET_DISCOUNT}/mo on Internet</h3>
              <p className="text-sm text-muted-foreground mt-0.5">
                Entertainment TV ($30), Extra TV ($95), or Everything TV ($150). Choose a package during checkout.
              </p>
            </div>
          </div>
          <div className="bg-card border border-border rounded-2xl p-5 flex items-start gap-3">
            <Smartphone className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-foreground">Add Optimum Mobile, save ${MOBILE_INTERNET_DISCOUNT}/mo on Internet</h3>
              <p className="text-sm text-muted-foreground mt-0.5">
                Unlimited from $45/mo · 1 line. A specialist follows up right after your Internet order.
              </p>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6 max-w-3xl mx-auto">
          *Not available in all areas. Advertised max speed is for wired connection. Actual Optimum Internet speeds, including over WiFi, may vary and are not guaranteed. Optimum service requires compatible equipment. See full terms and conditions for details.
        </p>
      </div>
    </section>
  );
};

export default PlansSection;

