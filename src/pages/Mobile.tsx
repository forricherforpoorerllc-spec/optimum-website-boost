import { useState } from "react";
import { Check, Signal, DollarSign, Shield, Gift, ChevronDown } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OrderModal from "@/components/OrderModal";
import SEO from "@/components/SEO";
import mobileHero from "@/assets/mobile-hero.jpg";
import { MOBILE_PLANS, MOBILE_INTERNET_DISCOUNT } from "@/lib/catalog";

const mobileJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Optimum Mobile Unlimited Wireless Service",
    "description": "Optimum Mobile unlimited wireless plans on America's largest 5G network. Unlimited talk, text, and data from $45/mo for 1 line or 3 lines for $60/mo when you add 2 lines and port a number.",
    "brand": { "@type": "Brand", "name": "Optimum Mobile" },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "USD",
      "lowPrice": "45",
      "highPrice": "80",
      "offerCount": "6"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.5",
      "reviewCount": "8921"
    }
  }
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
    title: "Keep Your Phone, Keep Your Number",
    description: "Bring your own unlocked iPhone or Android, port your existing number in minutes, and activate service on America's largest 5G network — no new device purchase required.",
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
    a: "On Optimum Mobile Unlimited, after 20 GB of premium data in a cycle, speeds may be reduced to 3G (512 Kbps) for the remainder of your billing cycle. On Unlimited Max, the premium-data threshold is 50 GB before any speed reduction — you still keep unlimited talk, text, and data at slower speeds.",
  },
  {
    q: "Does Optimum Mobile offer family plans?",
    a: "Yes — Optimum Mobile is built for families. Add 2 lines and your 3rd line is FREE when you port at least one number, dropping 3 lines of Unlimited to just $60/mo total (≈$20 per line) or 3 lines of Unlimited Max to $80/mo. Combine with an Optimum Internet plan and save another $10/mo on Internet through the Optimum Complete Discount.",
  },
];

const MobilePage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | undefined>(undefined);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const openModal = (plan?: string) => {
    setSelectedPlan(plan);
    setModalOpen(true);
  };

  return (
    <>
      <SEO
        title="Optimum Mobile | Unlimited 5G from $20/line"
        description="Switch to Optimum Mobile — unlimited 5G plans from $45/mo for 1 line or 3 lines for $60 total. Keep your number, bring your phone, save every month."
        canonical="https://www.optimuminternetservice.com/mobile"
        keywords="Optimum Mobile, Optimum wireless, 5G phone plans, unlimited mobile plan, cheap cell phone plan, family mobile plan, switch cell carrier, bring your own phone"
        jsonLd={mobileJsonLd}
      />
      <Header onOrderClick={openModal} />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden hero-gradient" aria-labelledby="mobile-hero-heading">
          <div className="absolute inset-0 opacity-20">
            <img src={mobileHero} alt="Woman using Optimum Mobile smartphone with 5G network" width={1920} height={1080} className="w-full h-full object-cover" />
          </div>
          <div className="relative container mx-auto px-4 py-10 md:py-14 lg:py-16">
            <div className="max-w-3xl">
              <h1 id="mobile-hero-heading" className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary-foreground leading-tight mb-3">
                Optimum Mobile — Unlimited Wireless on America's Largest 5G Network
              </h1>
              <p className="text-primary-foreground/80 text-base md:text-lg mb-5 max-w-2xl">
                Unlimited talk, text, and 5G data from $45/mo for 1 line — or 3 lines for $60/mo when you port one number. Plus an extra ${MOBILE_INTERNET_DISCOUNT}/mo off your Internet with the Optimum Complete Discount.
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="bg-primary-foreground/10 backdrop-blur-md rounded-xl px-5 py-3 border border-primary-foreground/20">
                  <p className="text-primary-foreground/70 text-[11px] font-semibold uppercase tracking-wider">Unlimited · 1 line</p>
                  <div className="flex items-end gap-1">
                    <span className="text-primary-foreground text-lg font-bold">$</span>
                    <span className="text-primary-foreground text-5xl md:text-6xl font-extrabold leading-none">45</span>
                    <span className="text-primary-foreground text-lg font-bold mb-1">/mo</span>
                    <span className="text-primary-foreground/70 text-xs mb-1 ml-2">from $20/line with 3 lines*</span>
                  </div>
                </div>
                <button onClick={() => openModal()} className="cta-gradient text-accent-foreground font-bold px-7 py-3.5 rounded-full text-base hover:opacity-90 transition-opacity shadow-lg">
                  Order Optimum Mobile
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Plans */}
        <section className="py-16 md:py-24 bg-secondary" aria-labelledby="mobile-plans-heading">
          <div className="container mx-auto px-4">
            <h2 id="mobile-plans-heading" className="text-3xl md:text-4xl font-extrabold text-center text-foreground mb-4">
              Optimum Mobile Pricing — 1 to 3 Lines
            </h2>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-10">
              Two Unlimited plans, transparent per-line pricing, no annual contracts, and an extra <strong className="text-teal">${MOBILE_INTERNET_DISCOUNT}/mo off your Optimum Internet</strong> when you bundle.
            </p>

            <div className="max-w-3xl mx-auto overflow-x-auto bg-card border-2 border-border rounded-2xl">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-secondary">
                    <th className="text-left p-4 font-bold text-foreground">Lines</th>
                    <th className="text-left p-4 font-bold text-foreground">Unlimited</th>
                    <th className="text-left p-4 font-bold text-foreground">Unlimited Max</th>
                  </tr>
                </thead>
                <tbody>
                  {MOBILE_PLANS.map((row) => (
                    <tr key={row.lines} className="border-t border-border">
                      <td className="p-4 font-semibold text-foreground">{row.lines}</td>
                      <td className="p-4 text-foreground">
                        {row.unlimited !== null ? (
                          <>
                            <span className="text-2xl font-extrabold">${row.unlimited}</span>
                            <span className="text-muted-foreground text-xs">/mo total</span>
                          </>
                        ) : "—"}
                      </td>
                      <td className="p-4 text-foreground">
                        {row.unlimitedMax !== null ? (
                          <>
                            <span className="text-2xl font-extrabold">${row.unlimitedMax}</span>
                            <span className="text-muted-foreground text-xs">/mo total</span>
                          </>
                        ) : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="p-4 border-t border-border bg-secondary/50 text-xs text-muted-foreground">
                *Add 2 lines and get a 3rd line FREE when you port at least 1 number. All plans include unlimited talk &amp; text, 5G access, and 20+ GB (Unlimited) / 50+ GB (Unlimited Max) of premium high-speed data.
              </div>
            </div>

            <div className="mt-8 grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
              <div className="bg-card border border-border rounded-2xl p-5">
                <h3 className="font-bold text-foreground mb-1">Unlimited</h3>
                <p className="text-sm text-muted-foreground">Unlimited talk, text &amp; 5G data with 20 GB of premium high-speed data each line. HD video streaming.</p>
              </div>
              <div className="bg-card border border-accent/40 rounded-2xl p-5">
                <h3 className="font-bold text-foreground mb-1">Unlimited Max</h3>
                <p className="text-sm text-muted-foreground">Everything in Unlimited plus 50 GB of premium data, hotspot, and international calling to 85+ countries.</p>
              </div>
            </div>

            <div className="text-center mt-8">
              <button onClick={() => openModal()} className="cta-gradient text-accent-foreground font-bold py-3 px-8 rounded-full hover:opacity-90 transition-opacity">
                Start My Optimum Order
              </button>
              <p className="text-xs text-muted-foreground mt-3 max-w-xl mx-auto">
                Mobile is easier with Internet first — kick off your Internet order and our specialist will complete your Mobile switch on the same call.
              </p>
            </div>
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
                With Optimum Mobile, customers choose between two Unlimited plans and can add up to three lines. Pricing is transparent and flat per household: $45/mo for 1 Unlimited line, $60/mo for 2 lines, and just $60/mo for 3 lines when you add 2 lines and port at least one number. Unlimited Max scales the same way — $55, $80, and $80 respectively — with 50 GB of premium high-speed data and international calling to 85+ countries included.
              </p>
              <h3 className="text-xl font-bold text-foreground pt-2">Bundle Optimum Internet + Mobile for Maximum Savings</h3>
              <p>
                Optimum customers who bundle Optimum Internet with Optimum Mobile unlock the Optimum Complete Discount — an extra ${MOBILE_INTERNET_DISCOUNT}/mo off Internet for as long as you keep both services active. Stacked on top of Optimum Mobile's already-low per-line pricing, bundling routinely saves families hundreds of dollars a year compared to buying Internet and wireless from separate providers.
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
                      <button onClick={() => openModal()} className="mt-3 text-accent font-semibold text-sm hover:underline">Order Optimum Mobile →</button>
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
            <p className="text-primary-foreground/70 mb-6 max-w-xl mx-auto">Get unlimited wireless on America's largest 5G network. Keep your number, bring your phone, and save every month.</p>
            <button onClick={() => openModal()} className="cta-gradient text-accent-foreground font-bold px-8 py-4 rounded-full text-lg hover:opacity-90 transition-opacity shadow-lg">
              Order Online Now
            </button>
          </div>
        </section>
      </main>
      <Footer />
      <OrderModal isOpen={modalOpen} onClose={() => setModalOpen(false)} selectedPlan={selectedPlan} />
    </>
  );
};

export default MobilePage;
