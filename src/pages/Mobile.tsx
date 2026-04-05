import { useState } from "react";
import { Check, Smartphone, Signal, DollarSign, Shield, Gift, ChevronDown } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OrderModal from "@/components/OrderModal";
import mobileHero from "@/assets/mobile-hero.jpg";

const unlimitedPlans = [
  {
    name: "Unlimited",
    price: 20,
    priceSuffix: "/mo per line for 3+ lines",
    features: [
      "Nationwide 5G coverage on America's largest network",
      "Unlimited data, talk & text",
      "Premium high-speed data for daily use",
      "Save up to $840/yr vs. Verizon and AT&T",
      "5G reliability and speed",
    ],
    promo: "Get your 3rd line FREE with promo code BIGSAVINGS",
    popular: false,
  },
  {
    name: "Unlimited Max",
    price: 40,
    priceSuffix: "/mo per line for 3+ lines",
    features: [
      "Nationwide 5G coverage on America's largest network",
      "Unlimited data, talk & text with extra premium high-speed data",
      "Save up to $1,140/yr vs. Verizon and AT&T",
      "5G reliability and speed",
      "HD video streaming included",
    ],
    promo: "Get your 3rd line FREE with promo code BIGSAVINGS",
    popular: true,
  },
];

const datePlans = [
  {
    name: "1 GB",
    price: 15,
    priceSuffix: "/mo per line",
    features: [
      "Unlimited 5G talk & text",
      "1 GB premium mobile data",
      "SD video streaming",
      "Great for light data users",
    ],
    popular: false,
  },
  {
    name: "5 GB",
    price: 25,
    priceSuffix: "/mo per line",
    features: [
      "Unlimited 5G talk & text",
      "5 GB premium mobile data",
      "HD video streaming",
      "Best value for moderate data users",
    ],
    popular: true,
  },
];

const whyOptimumMobile = [
  {
    icon: DollarSign,
    title: "Everyday Low Pricing",
    description: "Choose any 3 Unlimited plans — Unlimited, Unlimited Max, or Tablet Unlimited — and get your lowest-priced Unlimited line free. No hidden fees, no surprise rate increases.",
  },
  {
    icon: Shield,
    title: "60-Day Money-Back Guarantee",
    description: "Try Optimum Mobile risk-free with a 60-day money-back guarantee. Refund for Optimum Mobile service and activation fees. We'll even reimburse competitor activation fees up to $25.",
  },
  {
    icon: Signal,
    title: "America's Largest 5G Network",
    description: "Optimum Mobile runs on America's largest and most reliable 5G network, delivering fast download speeds and nationwide coverage so you stay connected everywhere you go.",
  },
  {
    icon: Gift,
    title: "Get Up to $2,500 Back",
    description: "Switching to Optimum Mobile? We'll pay off your existing device balance up to $2,500 when you switch from your current wireless carrier. Terms apply.",
  },
];

const mobileFaqs = [
  {
    q: "What network does Optimum Mobile use?",
    a: "Optimum Mobile operates on T-Mobile's nationwide 4G LTE and 5G network — America's largest 5G network. This gives Optimum Mobile customers extensive nationwide coverage, fast 5G speeds, and reliable connectivity wherever they travel across the United States.",
  },
  {
    q: "Can I keep my current phone number when switching to Optimum Mobile?",
    a: "Yes! When you switch to Optimum Mobile, you can transfer (port) your existing phone number from your current wireless carrier at no extra cost. The number transfer process is simple and typically completes within a few hours.",
  },
  {
    q: "Can I bring my own phone to Optimum Mobile?",
    a: "Absolutely. Optimum Mobile supports most unlocked smartphones, including iPhones and Android devices. You can check your device compatibility on the Optimum Mobile website or contact us to verify that your current phone works with Optimum Mobile's 5G network.",
  },
  {
    q: "What happens if I exceed my data limit on Optimum Mobile?",
    a: "On the 1 GB and 5 GB plans, after reaching your data cap, speeds are reduced to 2G (128 Kbps) for the remainder of your billing cycle. On the Unlimited plan, after 20 GB of premium data, speeds may be reduced to 3G (512 Kbps). On Unlimited Max, the threshold is 50 GB before any speed reduction.",
  },
  {
    q: "Does Optimum Mobile offer family plans?",
    a: "Yes — Optimum Mobile offers multi-line discounts that make it an excellent choice for families. With 3 or more Unlimited lines, you pay as low as $20/mo per line. Plus, you can get your 3rd Unlimited line free with the promo code BIGSAVINGS, making Optimum Mobile one of the most affordable family wireless plans available.",
  },
];

const MobilePage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [tab, setTab] = useState<"unlimited" | "data">("unlimited");
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const openModal = () => setModalOpen(true);
  const plans = tab === "unlimited" ? unlimitedPlans : datePlans;

  return (
    <>
      <Header onOrderClick={openModal} />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden hero-gradient" aria-labelledby="mobile-hero-heading">
          <div className="absolute inset-0 opacity-20">
            <img src={mobileHero} alt="Woman using Optimum Mobile smartphone with 5G network" width={1920} height={1080} className="w-full h-full object-cover" />
          </div>
          <div className="relative container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-2xl">
              <h1 id="mobile-hero-heading" className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground leading-tight mb-4">
                Optimum Mobile — Unlimited Wireless on America's Largest 5G Network
              </h1>
              <p className="text-primary-foreground/80 text-lg md:text-xl mb-6">
                Get Optimum Mobile unlimited data, talk & text starting at just $20/mo per line. Save up to $1,140/yr compared to Verizon and AT&T with Optimum's affordable wireless plans powered by nationwide 5G coverage.
              </p>
              <div className="bg-primary-foreground/10 backdrop-blur-md rounded-2xl p-6 inline-block mb-6 border border-primary-foreground/20">
                <p className="text-primary-foreground/70 text-sm font-semibold uppercase tracking-wider mb-2">Optimum Mobile Starting At</p>
                <div className="flex items-end gap-1">
                  <span className="text-primary-foreground text-2xl font-bold">$</span>
                  <span className="text-primary-foreground text-7xl font-extrabold leading-none">20</span>
                  <span className="text-primary-foreground text-xl font-bold mb-2">/mo</span>
                  <span className="text-primary-foreground/60 text-sm ml-3 mb-2">per line for 3+ lines</span>
                </div>
              </div>
              <div>
                <button onClick={openModal} className="cta-gradient text-accent-foreground font-bold px-8 py-4 rounded-full text-lg hover:opacity-90 transition-opacity shadow-lg">
                  Order Optimum Mobile Online
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Plans */}
        <section className="py-16 md:py-24 bg-secondary" aria-labelledby="mobile-plans-heading">
          <div className="container mx-auto px-4">
            <h2 id="mobile-plans-heading" className="text-3xl md:text-4xl font-extrabold text-center text-foreground mb-4">
              Choose Your Optimum Mobile Wireless Plan
            </h2>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-8">
              Optimum Mobile offers flexible wireless plans with nationwide 5G coverage. Pick an Unlimited plan for heavy data users or a by-the-gig plan for lighter usage — all with no annual contracts.
            </p>

            <div className="flex justify-center mb-10">
              <div className="bg-background rounded-full p-1 border border-border inline-flex">
                <button onClick={() => setTab("unlimited")} className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${tab === "unlimited" ? "hero-gradient text-primary-foreground shadow-md" : "text-muted-foreground hover:text-foreground"}`}>
                  Unlimited
                </button>
                <button onClick={() => setTab("data")} className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${tab === "data" ? "hero-gradient text-primary-foreground shadow-md" : "text-muted-foreground hover:text-foreground"}`}>
                  1 GB & 5 GB
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {plans.map((plan) => (
                <article key={plan.name} className={`relative bg-card rounded-2xl shadow-lg border-2 overflow-hidden transition-transform hover:-translate-y-1 ${plan.popular ? "border-accent" : "border-border"}`}>
                  {plan.popular && (
                    <div className="cta-gradient text-accent-foreground text-center text-xs font-bold py-1.5 uppercase tracking-wider">
                      {tab === "data" ? "Best Value" : "Most Popular"}
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-1">{plan.name}</h3>
                    <div className="flex items-end gap-1 mb-1">
                      <span className="text-foreground text-lg font-bold">$</span>
                      <span className="text-foreground text-5xl font-extrabold leading-none">{plan.price}</span>
                      <span className="text-muted-foreground text-sm mb-1">{plan.priceSuffix}</span>
                    </div>
                    <ul className="space-y-2 my-5">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-foreground">
                          <Check className="w-4 h-4 text-teal flex-shrink-0 mt-0.5" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    {"promo" in plan && (plan as { promo?: string }).promo && (
                      <div className="flex items-start gap-2 bg-accent/10 rounded-lg p-3 mb-4">
                        <Gift className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-sm font-semibold text-foreground">{(plan as { promo?: string }).promo}</span>
                      </div>
                    )}
                    <button onClick={openModal} className="w-full cta-gradient text-accent-foreground font-bold py-3 rounded-full hover:opacity-90 transition-opacity">
                      Order Online
                    </button>
                  </div>
                </article>
              ))}
            </div>
            <p className="text-center text-xs text-muted-foreground mt-6 max-w-3xl mx-auto">
              *2+ lines. For 12 months. Number transfer or device financing required. Savings via bill credits. Autopay required. Terms apply.
            </p>
          </div>
        </section>

        {/* Why Optimum Mobile */}
        <section className="py-16 md:py-24 bg-background" aria-labelledby="why-mobile-heading">
          <div className="container mx-auto px-4">
            <h2 id="why-mobile-heading" className="text-3xl md:text-4xl font-extrabold text-center text-foreground mb-4">
              Why Customers Love Optimum Mobile
            </h2>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
              Optimum Mobile combines affordable pricing, nationwide 5G wireless coverage, and flexible no-contract plans to deliver the best value in wireless service.
            </p>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {whyOptimumMobile.map((item) => (
                <article key={item.title} className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 rounded-xl hero-gradient flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SEO Content */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-extrabold text-foreground mb-6">Optimum Mobile — Affordable Wireless Service With 5G Speeds</h2>
            <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
              <p>
                <strong className="text-foreground">Optimum Mobile</strong> is a wireless service offered by Optimum that provides affordable unlimited and by-the-gig mobile plans on America's largest 5G network. Optimum Mobile delivers nationwide coverage, reliable 5G connectivity, and significant savings compared to traditional wireless carriers like Verizon Wireless, AT&T, and T-Mobile postpaid plans.
              </p>
              <p>
                With Optimum Mobile, customers can choose from Unlimited plans starting at just $20/mo per line (with 3+ lines) or budget-friendly 1 GB and 5 GB plans for lighter data users. All Optimum Mobile plans include unlimited talk and text, 5G network access, and no annual contracts — giving you the freedom to change or cancel your wireless plan at any time without early termination fees.
              </p>
              <h3 className="text-xl font-bold text-foreground pt-2">Bundle Optimum Internet + Mobile for Maximum Savings</h3>
              <p>
                Optimum customers who bundle their Optimum Internet plan with Optimum Mobile receive the Optimum Complete Discount, which saves an additional $10/mo on their internet service. Combined with Optimum Mobile's already-low wireless pricing, bundling can save families hundreds of dollars per year compared to purchasing internet and wireless service from separate providers.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-24 bg-background" aria-labelledby="mobile-faq-heading">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 id="mobile-faq-heading" className="text-3xl md:text-4xl font-extrabold text-center text-foreground mb-4">
              Optimum Mobile — Frequently Asked Questions
            </h2>
            <div className="space-y-3 mt-10" itemScope itemType="https://schema.org/FAQPage">
              {mobileFaqs.map((faq, i) => (
                <div key={i} className="bg-card rounded-xl border border-border overflow-hidden" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <button onClick={() => setFaqOpen(faqOpen === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left" aria-expanded={faqOpen === i}>
                    <span className="font-semibold text-foreground pr-4" itemProp="name">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform ${faqOpen === i ? "rotate-180" : ""}`} />
                  </button>
                  {faqOpen === i && (
                    <div className="px-5 pb-5" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                      <p className="text-sm text-muted-foreground leading-relaxed" itemProp="text">{faq.a}</p>
                      <button onClick={openModal} className="mt-3 text-accent font-semibold text-sm hover:underline">Order Optimum Mobile →</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="hero-gradient py-12">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold text-primary-foreground mb-3">Ready to Switch to Optimum Mobile?</h2>
            <p className="text-primary-foreground/70 mb-6 max-w-xl mx-auto">Get unlimited wireless on America's largest 5G network. We'll even pay off your old device up to $2,500.</p>
            <button onClick={openModal} className="cta-gradient text-accent-foreground font-bold px-8 py-4 rounded-full text-lg hover:opacity-90 transition-opacity shadow-lg">
              Order Online Now
            </button>
          </div>
        </section>
      </main>
      <Footer />
      <OrderModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default MobilePage;
