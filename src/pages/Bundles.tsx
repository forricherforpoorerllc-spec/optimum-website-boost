import { useState } from "react";
import { Check, Wifi, Tv, Smartphone, Lock, DollarSign, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OrderModal from "@/components/OrderModal";
import SEO from "@/components/SEO";
import { INTERNET_PLANS, TV_PACKAGES, TV_INTERNET_DISCOUNT, MOBILE_INTERNET_DISCOUNT } from "@/lib/catalog";

const bundlesJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Optimum Bundle Deals 2026",
    "description": "Bundle Optimum Internet with TV or Mobile and save up to $15/mo automatically.",
    "url": "https://www.optimuminternetservice.com/bundles",
    "itemListElement": [
      {
        "@type": "ListItem", "position": 1,
        "item": {
          "@type": "Offer",
          "name": "Optimum Internet + TV Bundle",
          "description": "Save $5/mo on Optimum Internet when you add any Optimum TV package.",
          "priceCurrency": "USD", "price": "55.00"
        }
      },
      {
        "@type": "ListItem", "position": 2,
        "item": {
          "@type": "Offer",
          "name": "Optimum Internet + Mobile Bundle",
          "description": "Save $10/mo on Optimum Internet when you add Optimum Mobile Unlimited.",
          "priceCurrency": "USD", "price": "80.00"
        }
      },
      {
        "@type": "ListItem", "position": 3,
        "item": {
          "@type": "Offer",
          "name": "Optimum Complete (Internet + TV + Mobile)",
          "description": "Bundle all three services and save up to $15/mo automatically on Internet.",
          "priceCurrency": "USD", "price": "115.00"
        }
      }
    ]
  }
];

const bundleFaqs = [
  {
    q: "How much do I save by bundling Optimum services?",
    a: "Adding Optimum TV to your Internet plan saves you $5/mo on Internet automatically. Adding Optimum Mobile Unlimited adds another $10/mo off Internet through the Optimum Complete Discount. Stack both and you save $15/mo (up to $180/year) on your Internet bill — while also getting lower per-line mobile pricing and the TV bundle rate.",
  },
  {
    q: "Do bundle discounts expire?",
    a: "No. Optimum bundle discounts apply for as long as you keep both eligible services active. If you cancel one side of the bundle, the corresponding discount comes off automatically. The 5-Year Price Lock on your Internet plan continues regardless.",
  },
  {
    q: "Can I add TV or Mobile to an existing Optimum Internet account?",
    a: "Yes. Existing Optimum Internet customers can add TV or Mobile at any time and the bundle discount applies starting the next billing cycle. Start an order on this site and an agent will coordinate the add-on activation with your existing account.",
  },
  {
    q: "Is there a contract when I bundle?",
    a: "No — Optimum Internet, TV, and Mobile are all contract-free. There are no early termination fees on any service. You can cancel or swap plans at any time.",
  },
  {
    q: "Do I have to bundle to get the 5-Year Price Lock?",
    a: "No. The 5-Year Price Lock applies to every Optimum Internet plan (300 Mbps, 500 Mbps, and 1 Gig) with Auto Pay and Paperless Bill enrollment, whether or not you bundle. Bundling simply stacks additional monthly savings on top of the price lock.",
  },
];

const baseInternet = INTERNET_PLANS[0].price; // 25
const midInternet = INTERNET_PLANS[1].price; // 35
const topInternet = INTERNET_PLANS[2].price; // 45
const entryTV = TV_PACKAGES[0].price; // 30

const bundleCards = [
  {
    title: "Internet + TV",
    subtitle: "Save $5/mo on Internet automatically",
    icon: Tv,
    example: `300 Mbps + Entertainment TV = $${baseInternet - TV_INTERNET_DISCOUNT + entryTV}/mo`,
    perks: [
      `$${TV_INTERNET_DISCOUNT}/mo off Internet for life of service`,
      "75 to 200+ live channels with Cloud DVR",
      "Built-in Netflix, Prime Video, YouTube apps",
      "One bill, one install, one support number",
    ],
  },
  {
    title: "Internet + Mobile",
    subtitle: "Save $10/mo on Internet with Optimum Complete",
    icon: Smartphone,
    example: `300 Mbps + 1 Unlimited line = $${baseInternet - MOBILE_INTERNET_DISCOUNT + 45}/mo`,
    recommended: true,
    perks: [
      `$${MOBILE_INTERNET_DISCOUNT}/mo off Internet — the largest single bundle discount`,
      "Unlimited 5G on America's largest network",
      "Keep your phone, keep your number",
      "3 lines for just $60/mo total with number port",
    ],
  },
  {
    title: "Internet + TV + Mobile",
    subtitle: `Save up to $${TV_INTERNET_DISCOUNT + MOBILE_INTERNET_DISCOUNT}/mo — stack every discount`,
    icon: Wifi,
    example: `1 Gig + Entertainment TV + 1 Unlimited line = $${topInternet - TV_INTERNET_DISCOUNT - MOBILE_INTERNET_DISCOUNT + entryTV + 45}/mo`,
    perks: [
      `Full $${TV_INTERNET_DISCOUNT + MOBILE_INTERNET_DISCOUNT}/mo in stacked Internet discounts`,
      "Fastest Optimum fiber tier included",
      "TV, phone, and home all on one bill",
      "5-Year Price Lock on Internet",
    ],
  },
];

const BundlesPage = () => {
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
        title="Optimum Bundles | Internet + TV + Mobile Savings"
        description="Bundle Optimum Internet with TV or Mobile and save up to $15/mo automatically. Fiber from $25/mo, TV from $30/mo, unlimited 5G from $45/mo."
        canonical="https://www.optimuminternetservice.com/bundles"
        keywords="Optimum bundles, Optimum Internet and TV bundle, Optimum Internet and Mobile bundle, Optimum Complete Discount, cheap internet TV phone bundle"
        jsonLd={bundlesJsonLd}
      />
      <Header onOrderClick={openModal} />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden hero-gradient" aria-labelledby="bundles-hero-heading">
          <div className="relative container mx-auto px-4 py-10 md:py-14 lg:py-16">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-teal text-teal-foreground px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold mb-4">
                <DollarSign className="w-3.5 h-3.5" />
                <span>Save up to ${TV_INTERNET_DISCOUNT + MOBILE_INTERNET_DISCOUNT}/mo automatically</span>
              </div>
              <h1 id="bundles-hero-heading" className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary-foreground leading-tight mb-3">
                Optimum Bundles — Internet, TV &amp; Mobile
              </h1>
              <p className="text-primary-foreground/80 text-base md:text-lg mb-5 max-w-2xl">
                Combine Optimum Internet with TV or Mobile (or both) and get automatic monthly savings on top of the 5-Year Price Lock. One bill, one install, one number to call.
              </p>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => openModal()} className="cta-gradient text-accent-foreground font-bold px-7 py-3.5 rounded-full text-base hover:opacity-90 transition-opacity shadow-lg">
                  Build My Bundle
                </button>
                <Link to="/deals" className="bg-primary-foreground/10 border border-primary-foreground/30 text-primary-foreground font-semibold px-7 py-3.5 rounded-full text-base hover:bg-primary-foreground/20 transition-colors">
                  See All Deals
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Bundle cards */}
        <section className="py-16 md:py-20 bg-secondary" aria-labelledby="bundles-grid-heading">
          <div className="container mx-auto px-4">
            <h2 id="bundles-grid-heading" className="text-3xl md:text-4xl font-extrabold text-center text-foreground mb-3">
              Pick Your Bundle &amp; Save Every Month
            </h2>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
              Every bundle includes the full 5-Year Price Lock on Internet, unlimited data, and no annual contract.
            </p>

            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {bundleCards.map((card) => (
                <article
                  key={card.title}
                  className={`bg-card border-2 ${card.recommended ? "border-accent" : "border-border"} rounded-2xl p-6 hover:shadow-lg transition-shadow relative`}
                >
                  {card.recommended && (
                    <div className="absolute -top-3 left-6 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full">
                      Most Popular
                    </div>
                  )}
                  <div className="w-12 h-12 rounded-xl hero-gradient flex items-center justify-center mb-4">
                    <card.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-extrabold text-foreground mb-1">{card.title}</h3>
                  <p className="text-sm text-accent font-semibold mb-3">{card.subtitle}</p>
                  <div className="bg-secondary rounded-lg p-3 mb-4">
                    <p className="text-xs text-muted-foreground mb-0.5">Example bundle</p>
                    <p className="text-sm font-bold text-foreground">{card.example}</p>
                  </div>
                  <ul className="space-y-2 mb-5">
                    {card.perks.map((perk) => (
                      <li key={perk} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-teal flex-shrink-0 mt-0.5" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => openModal()}
                    className="w-full cta-gradient text-accent-foreground font-bold py-2.5 rounded-full hover:opacity-90 transition-opacity"
                  >
                    Start This Bundle
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* How it stacks */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-extrabold text-center text-foreground mb-10">
              How Bundle Savings Stack
            </h2>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-card border border-border rounded-2xl p-5 text-center">
                <Wifi className="w-8 h-8 text-accent mx-auto mb-2" />
                <p className="text-xs text-muted-foreground mb-1">Internet alone</p>
                <p className="text-2xl font-extrabold text-foreground">${baseInternet}<span className="text-sm text-muted-foreground">/mo</span></p>
              </div>
              <div className="bg-card border border-border rounded-2xl p-5 text-center">
                <Tv className="w-8 h-8 text-accent mx-auto mb-2" />
                <p className="text-xs text-muted-foreground mb-1">+ TV saves</p>
                <p className="text-2xl font-extrabold text-teal">−${TV_INTERNET_DISCOUNT}<span className="text-sm text-muted-foreground">/mo</span></p>
              </div>
              <div className="bg-card border border-border rounded-2xl p-5 text-center">
                <Smartphone className="w-8 h-8 text-accent mx-auto mb-2" />
                <p className="text-xs text-muted-foreground mb-1">+ Mobile saves</p>
                <p className="text-2xl font-extrabold text-teal">−${MOBILE_INTERNET_DISCOUNT}<span className="text-sm text-muted-foreground">/mo</span></p>
              </div>
              <div className="bg-card border-2 border-accent rounded-2xl p-5 text-center">
                <Lock className="w-8 h-8 text-accent mx-auto mb-2" />
                <p className="text-xs text-muted-foreground mb-1">Internet after bundle</p>
                <p className="text-2xl font-extrabold text-foreground">${baseInternet - TV_INTERNET_DISCOUNT - MOBILE_INTERNET_DISCOUNT}<span className="text-sm text-muted-foreground">/mo</span></p>
              </div>
            </div>
            <p className="text-center text-xs text-muted-foreground mt-4">
              Mid-tier example shown. Same ${TV_INTERNET_DISCOUNT + MOBILE_INTERNET_DISCOUNT}/mo stacked savings applies on 500 Mbps and 1 Gig plans too.
            </p>
          </div>
        </section>

        {/* SEO copy */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-extrabold text-foreground mb-6">Why Bundle Optimum Internet, TV &amp; Mobile?</h2>
            <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
              <p>
                Bundling Optimum services is the single easiest way to cut your monthly home-connectivity bill. Unlike legacy providers that dress up a bundle as a short-term promo and then raise rates, Optimum's bundle discounts are permanent — they apply automatically for as long as both services are active on your account.
              </p>
              <h3 className="text-xl font-bold text-foreground pt-2">Internet + TV — The Entertainment Bundle</h3>
              <p>
                Pair any Optimum Internet plan with Entertainment, Extra, or Everything TV to save ${TV_INTERNET_DISCOUNT}/mo on Internet, plus get 75 to 200+ live channels, Cloud DVR, and 4K Ultra HD. One install, one bill, one remote.
              </p>
              <h3 className="text-xl font-bold text-foreground pt-2">Internet + Mobile — The Optimum Complete Discount</h3>
              <p>
                The Optimum Complete Discount drops your Internet bill by ${MOBILE_INTERNET_DISCOUNT}/mo when you add any Optimum Mobile Unlimited line. Combined with Optimum Mobile's flat household pricing — $45 for one line, $60 for three with a number port — the Internet + Mobile bundle is the highest-value pairing for most families.
              </p>
              <h3 className="text-xl font-bold text-foreground pt-2">Optimum Complete — All Three Services</h3>
              <p>
                Go all-in with Internet + TV + Mobile and stack both discounts: ${TV_INTERNET_DISCOUNT + MOBILE_INTERNET_DISCOUNT}/mo off your Internet, plus the 5-Year Price Lock, plus unlimited data, plus no contract. A typical household on 1 Gig + Entertainment TV + 1 Unlimited line pays ${topInternet - TV_INTERNET_DISCOUNT - MOBILE_INTERNET_DISCOUNT + entryTV + 45}/mo all-in.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-20 bg-background" aria-labelledby="bundles-faq-heading">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 id="bundles-faq-heading" className="text-3xl font-extrabold text-center text-foreground mb-10">
              Optimum Bundles — Frequently Asked Questions
            </h2>
            <div className="space-y-3" itemScope itemType="https://schema.org/FAQPage">
              {bundleFaqs.map((faq, i) => (
                <div key={i} className="bg-card rounded-xl border border-border overflow-hidden" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <button onClick={() => setFaqOpen(faqOpen === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left" aria-expanded={faqOpen === i}>
                    <span className="font-semibold text-foreground pr-4" itemProp="name">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform ${faqOpen === i ? "rotate-180" : ""}`} />
                  </button>
                  {faqOpen === i && (
                    <div className="px-5 pb-5" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                      <p className="text-sm text-muted-foreground leading-relaxed" itemProp="text">{faq.a}</p>
                      <button onClick={() => openModal()} className="mt-3 text-accent font-semibold text-sm hover:underline">Build My Bundle →</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 hero-gradient">
          <div className="container mx-auto px-4 text-center max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-extrabold text-primary-foreground mb-3">
              Ready to Stack Your Savings?
            </h2>
            <p className="text-primary-foreground/80 mb-6">Start your Optimum order in under 3 minutes and a licensed agent will confirm your bundle pricing before install.</p>
            <button onClick={() => openModal()} className="cta-gradient text-accent-foreground font-bold px-8 py-3.5 rounded-full text-base hover:opacity-90 transition-opacity shadow-lg">
              Build My Bundle
            </button>
          </div>
        </section>
      </main>
      <Footer />
      <OrderModal isOpen={modalOpen} onClose={() => setModalOpen(false)} selectedPlan={selectedPlan} />
    </>
  );
};

export default BundlesPage;
