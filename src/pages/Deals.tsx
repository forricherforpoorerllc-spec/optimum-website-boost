import { useState } from "react";
import { Check, Lock, Wifi, Tv, Smartphone, Zap, ShieldCheck, Tag, Star, ChevronDown } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OrderModal from "@/components/OrderModal";
import SEO from "@/components/SEO";
import wifiRouterImg from "@/assets/wifi-router.jpg";
import { INTERNET_PLANS, TV_INTERNET_DISCOUNT, MOBILE_INTERNET_DISCOUNT } from "@/lib/catalog";

const dealsJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Optimum Internet Deals & Offers 2026",
    "description": "Current Optimum Internet deals including 5-Year Price Lock, free WiFi 6E gateway, bundle savings, and Optimum Advantage Internet starting at $15/mo.",
    "url": "https://www.optimuminternetservice.com/deals",
    "itemListElement": [
      {
        "@type": "ListItem", "position": 1,
        "item": {
          "@type": "Offer",
          "name": "Optimum 5-Year Price Lock",
          "description": "Lock in your Optimum Internet price for up to 5 full years with no rate increases.",
          "price": "25.00", "priceCurrency": "USD"
        }
      },
      {
        "@type": "ListItem", "position": 2,
        "item": {
          "@type": "Offer",
          "name": "Free WiFi 6E Gateway",
          "description": "Free WiFi 6E all-in-one gateway and extender included with every Optimum Internet plan.",
          "price": "0.00", "priceCurrency": "USD"
        }
      },
      {
        "@type": "ListItem", "position": 3,
        "item": {
          "@type": "Offer",
          "name": "Optimum TV Bundle Discount",
          "description": "Save $5/mo on Optimum Internet when you add an Optimum TV package.",
          "price": "25.00", "priceCurrency": "USD"
        }
      }
    ]
  }
];

const dealsFaqs = [
  {
    q: "How do I qualify for Optimum's 5-Year Price Lock?",
    a: "The 5-Year Price Lock applies to all Optimum Internet plans (300 Mbps, 500 Mbps, and 1 Gig) when you enroll in Auto Pay and Paperless Bill. There's no annual contract — the price lock is Optimum's commitment to you, not the other way around. Cancel anytime with no early termination fees.",
  },
  {
    q: "Is the WiFi 6E gateway really free?",
    a: "Yes — every Optimum Internet plan includes a free WiFi 6E all-in-one gateway at no additional charge. Whole Home WiFi extenders are available for $5/mo per extender if you need additional coverage in larger homes. Equipment remains Optimum's property and is returned if service is cancelled.",
  },
  {
    q: "Can I stack the TV bundle discount and the Mobile discount?",
    a: "Yes. You can save $5/mo on your Internet by adding Optimum TV, and an additional $10/mo on your Internet through the Optimum Complete Discount when you add Optimum Mobile Unlimited. That's up to $15/mo in automatic monthly savings off your Internet bill.",
  },
  {
    q: "What is Optimum Advantage Internet?",
    a: "Optimum Advantage Internet is a discounted broadband program for eligible low-income households, offering fast internet service at $15/mo with free professional installation and equipment included. It is available to households that qualify based on public assistance program participation.",
  },
  {
    q: "Are these deals available at my address?",
    a: "Optimum Internet service — including all current deals and promotions — is available to residential and business addresses in 21 states. Availability and exact pricing depend on your specific location. Start your order to check availability and lock in today's pricing at your address.",
  },
];

const DealsPage = () => {
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
        title="Optimum Deals & Offers 2026 | Best Promotions"
        description="Shop today's best Optimum deals — 5-Year Price Lock from $25/mo, free WiFi 6E gateway, TV bundle savings, and Optimum Advantage from $15/mo."
        canonical="https://www.optimuminternetservice.com/deals"
        keywords="Optimum Internet deals, Optimum promotions, Optimum offers 2026, Optimum 5-year price lock, free WiFi gateway, Optimum bundle discount, Optimum Advantage Internet, cheap internet deals"
        jsonLd={dealsJsonLd}
      />
      <Header onOrderClick={openModal} />
      <main>

        {/* Hero */}
        <section className="relative overflow-hidden hero-gradient" aria-labelledby="deals-hero-heading">
          <div className="relative container mx-auto px-4 py-10 md:py-14 lg:py-16">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-teal text-teal-foreground px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold mb-4">
                <Tag className="w-3.5 h-3.5" />
                <span>Limited-time offers — lock in today's pricing</span>
              </div>
              <h1 id="deals-hero-heading" className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary-foreground leading-tight mb-3">
                Optimum Internet Deals &amp; Offers for 2026
              </h1>
              <p className="text-primary-foreground/80 text-base md:text-lg mb-5 max-w-2xl">
                From price-lock guarantees to free equipment and bundle savings — these are the best Optimum Internet promotions available right now. All deals include unlimited data and no annual contract.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => openModal()}
                  className="cta-gradient text-accent-foreground font-bold px-7 py-3.5 rounded-full text-base hover:opacity-90 transition-opacity shadow-lg"
                >
                  Shop All Deals
                </button>
                <a
                  href="#deals-grid"
                  className="flex items-center gap-2 border border-primary-foreground/30 text-primary-foreground font-semibold px-7 py-3.5 rounded-full text-base hover:bg-primary-foreground/10 transition-colors"
                >
                  See All Offers ↓
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Deal cards grid */}
        <section id="deals-grid" className="py-16 md:py-20 bg-secondary" aria-labelledby="deals-grid-heading">
          <div className="container mx-auto px-4">
            <h2 id="deals-grid-heading" className="text-3xl md:text-4xl font-extrabold text-center text-foreground mb-3">
              Today's Best Optimum Promotions
            </h2>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
              Every deal below is available when you order online today. Pricing reflects Auto Pay &amp; Paperless Bill enrollment where applicable.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">

              {/* Deal 1 — 5-Year Price Lock */}
              <article className="bg-card border-2 border-accent rounded-2xl overflow-hidden shadow-lg flex flex-col">
                <div className="cta-gradient px-5 py-3 flex items-center gap-2">
                  <Star className="w-4 h-4 text-accent-foreground" />
                  <span className="text-accent-foreground text-xs font-bold uppercase tracking-wider">Best Deal</span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="w-11 h-11 rounded-xl hero-gradient flex items-center justify-center mb-4">
                    <Lock className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-extrabold text-foreground mb-2">5-Year Price Lock</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
                    The price you see today is the price you'll pay for up to <strong className="text-foreground">5 full years</strong> — guaranteed. No promotional rates that expire, no surprise bill increases, no fine print. Applies to all three Optimum Internet speed tiers.
                  </p>
                  <ul className="space-y-2 mb-5">
                    {["No rate hikes for 5 years", "All three speed tiers qualify", "No annual contract required", "Cancel anytime, no ETF"].map((b) => (
                      <li key={b} className="flex items-center gap-2 text-sm text-foreground">
                        <Check className="w-4 h-4 text-teal flex-shrink-0" /> {b}
                      </li>
                    ))}
                  </ul>
                  <div className="bg-secondary rounded-xl p-3 mb-5">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold mb-1">Available on</p>
                    <div className="flex flex-wrap gap-2">
                      {INTERNET_PLANS.map((p) => (
                        <span key={p.id} className="text-xs font-bold bg-card border border-border rounded-full px-3 py-1">
                          {p.shortName} — <span className="text-accent">${p.price}/mo</span>
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => openModal()}
                    className="w-full cta-gradient text-accent-foreground font-bold py-3 rounded-full hover:opacity-90 transition-opacity"
                  >
                    Lock In My Price
                  </button>
                </div>
              </article>

              {/* Deal 2 — Free WiFi 6E Gateway */}
              <article className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm flex flex-col hover:border-accent/40 transition-colors">
                <div className="h-48 overflow-hidden">
                  <img src={wifiRouterImg} alt="Optimum WiFi 6E all-in-one gateway and extender" className="w-full h-full object-cover" width={600} height={400} />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="inline-flex items-center gap-1.5 bg-teal/10 text-teal text-xs font-bold rounded-full px-3 py-1 mb-3 w-fit">
                    <Wifi className="w-3.5 h-3.5" /> FREE Equipment
                  </div>
                  <h3 className="text-xl font-extrabold text-foreground mb-2">Free WiFi 6E Gateway + Extender</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
                    Every Optimum Internet plan includes a <strong className="text-foreground">free WiFi 6E all-in-one gateway</strong> — the latest generation of home networking hardware supporting speeds up to 9.6 Gbps and wall-to-wall coverage. No equipment rental fees.
                  </p>
                  <ul className="space-y-2 mb-5">
                    {["WiFi 6E — tri-band 9.6 Gbps capable", "Smart device optimization built in", "Free if you stay on Optimum service", "Whole Home WiFi extenders available $5/mo"].map((b) => (
                      <li key={b} className="flex items-center gap-2 text-sm text-foreground">
                        <Check className="w-4 h-4 text-teal flex-shrink-0" /> {b}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => openModal()}
                    className="w-full cta-gradient text-accent-foreground font-bold py-3 rounded-full hover:opacity-90 transition-opacity"
                  >
                    Get Free WiFi 6E Gateway
                  </button>
                </div>
              </article>

              {/* Deal 3 — Bundle & Save */}
              <article className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm flex flex-col hover:border-accent/40 transition-colors">
                <div className="p-6 flex flex-col flex-1">
                  <div className="w-11 h-11 rounded-xl hero-gradient flex items-center justify-center mb-4">
                    <Tv className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div className="inline-flex items-center gap-1.5 bg-accent/10 text-accent text-xs font-bold rounded-full px-3 py-1 mb-3 w-fit">
                    Save up to $15/mo
                  </div>
                  <h3 className="text-xl font-extrabold text-foreground mb-2">Bundle &amp; Save Every Month</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    Stack your monthly Internet savings by adding Optimum TV and Optimum Mobile. Discounts apply automatically — no promo codes needed.
                  </p>
                  <div className="bg-secondary rounded-xl p-4 mb-5 space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Tv className="w-4 h-4 text-accent" />
                        <span className="font-semibold text-foreground">Add Optimum TV</span>
                      </div>
                      <span className="font-extrabold text-teal">-${TV_INTERNET_DISCOUNT}/mo</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Smartphone className="w-4 h-4 text-accent" />
                        <span className="font-semibold text-foreground">Add Optimum Mobile</span>
                      </div>
                      <span className="font-extrabold text-teal">-${MOBILE_INTERNET_DISCOUNT}/mo</span>
                    </div>
                    <div className="border-t border-border pt-2 flex items-center justify-between text-sm font-extrabold text-foreground">
                      <span>Max monthly savings</span>
                      <span className="text-teal text-base">-${TV_INTERNET_DISCOUNT + MOBILE_INTERNET_DISCOUNT}/mo</span>
                    </div>
                  </div>
                  <ul className="space-y-2 mb-5 flex-1">
                    {["Discounts applied automatically at checkout", "No promo codes or waiting periods", "Works with all three Internet speed tiers", "Mobile plans from $45/mo — Unlimited talk, text & 5G"].map((b) => (
                      <li key={b} className="flex items-center gap-2 text-sm text-foreground">
                        <Check className="w-4 h-4 text-teal flex-shrink-0" /> {b}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => openModal()}
                    className="w-full cta-gradient text-accent-foreground font-bold py-3 rounded-full hover:opacity-90 transition-opacity"
                  >
                    Bundle &amp; Save Now
                  </button>
                </div>
              </article>

              {/* Deal 4 — Optimum Advantage */}
              <article className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm flex flex-col hover:border-accent/40 transition-colors">
                <div className="p-6 flex flex-col flex-1">
                  <div className="w-11 h-11 rounded-xl bg-teal/20 flex items-center justify-center mb-4">
                    <Zap className="w-5 h-5 text-teal" />
                  </div>
                  <div className="inline-flex items-center gap-1.5 bg-teal/10 text-teal text-xs font-bold rounded-full px-3 py-1 mb-3 w-fit">
                    Budget-Friendly
                  </div>
                  <h3 className="text-xl font-extrabold text-foreground mb-2">Optimum Advantage Internet</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
                    Fast, reliable broadband for <strong className="text-foreground">less than $1 a day</strong>. Optimum Advantage Internet is designed for budget-conscious households — with free professional installation, equipment included, and no hidden fees.
                  </p>
                  <div className="bg-secondary rounded-xl p-4 mb-5">
                    <div className="flex items-end gap-1">
                      <span className="text-foreground text-lg font-bold">$</span>
                      <span className="text-foreground text-5xl font-extrabold leading-none">15</span>
                      <span className="text-muted-foreground text-sm mb-1">/mo</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">For eligible households. Equipment &amp; installation included.</p>
                  </div>
                  <ul className="space-y-2 mb-5">
                    {["Free professional installation", "Equipment included at no extra charge", "No data caps, no throttling", "Available to qualifying low-income households"].map((b) => (
                      <li key={b} className="flex items-center gap-2 text-sm text-foreground">
                        <Check className="w-4 h-4 text-teal flex-shrink-0" /> {b}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => openModal()}
                    className="w-full border-2 border-accent text-accent font-bold py-3 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    Check Eligibility
                  </button>
                </div>
              </article>

              {/* Deal 5 — Free Installation */}
              <article className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm flex flex-col hover:border-accent/40 transition-colors">
                <div className="p-6 flex flex-col flex-1">
                  <div className="w-11 h-11 rounded-xl hero-gradient flex items-center justify-center mb-4">
                    <ShieldCheck className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div className="inline-flex items-center gap-1.5 bg-accent/10 text-accent text-xs font-bold rounded-full px-3 py-1 mb-3 w-fit">
                    $0 Setup Cost
                  </div>
                  <h3 className="text-xl font-extrabold text-foreground mb-2">Free Professional Installation</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
                    A licensed Optimum technician comes to your home, runs the fiber connection, installs your gateway, configures your WiFi network, and verifies your speeds — all at <strong className="text-foreground">no charge</strong>. Most installs complete in under 2 hours.
                  </p>
                  <ul className="space-y-2 mb-5">
                    {["Certified Optimum technician", "Fiber line run to your home if needed", "WiFi network named & secured", "Speed test performed before tech leaves"].map((b) => (
                      <li key={b} className="flex items-center gap-2 text-sm text-foreground">
                        <Check className="w-4 h-4 text-teal flex-shrink-0" /> {b}
                      </li>
                    ))}
                  </ul>
                  <div className="bg-secondary rounded-xl p-3 mb-5 text-sm text-muted-foreground">
                    Installation typically scheduled within <strong className="text-foreground">3–7 business days</strong> of order. morning, afternoon, and evening windows available.
                  </div>
                  <button
                    onClick={() => openModal()}
                    className="w-full cta-gradient text-accent-foreground font-bold py-3 rounded-full hover:opacity-90 transition-opacity"
                  >
                    Schedule Free Install
                  </button>
                </div>
              </article>

              {/* Deal 6 — 30-Day Guarantee */}
              <article className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm flex flex-col hover:border-accent/40 transition-colors">
                <div className="p-6 flex flex-col flex-1">
                  <div className="w-11 h-11 rounded-xl bg-teal/20 flex items-center justify-center mb-4">
                    <ShieldCheck className="w-5 h-5 text-teal" />
                  </div>
                  <div className="inline-flex items-center gap-1.5 bg-teal/10 text-teal text-xs font-bold rounded-full px-3 py-1 mb-3 w-fit">
                    Risk-Free
                  </div>
                  <h3 className="text-xl font-extrabold text-foreground mb-2">30-Day Money-Back Guarantee</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
                    Every Optimum Internet order comes with a <strong className="text-foreground">30-day satisfaction guarantee</strong>. If you're not happy with your speeds or service in the first 30 days, cancel for a full refund of your service charges — no restocking fees, no difficult cancellation process.
                  </p>
                  <ul className="space-y-2 mb-5">
                    {["Full refund of service charges", "No restocking fees", "No 30-day notice required", "Applies to all Internet plans"].map((b) => (
                      <li key={b} className="flex items-center gap-2 text-sm text-foreground">
                        <Check className="w-4 h-4 text-teal flex-shrink-0" /> {b}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => openModal()}
                    className="w-full cta-gradient text-accent-foreground font-bold py-3 rounded-full hover:opacity-90 transition-opacity"
                  >
                    Order Risk-Free
                  </button>
                </div>
              </article>

            </div>
          </div>
        </section>

        {/* Savings calculator strip */}
        <section className="py-12 bg-background border-y border-border">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-extrabold text-center text-foreground mb-10">
              How Much Can You Save with Optimum Bundles?
            </h2>
            <div className="grid sm:grid-cols-3 gap-4 text-center">
              <div className="bg-secondary rounded-2xl p-6">
                <div className="text-3xl font-extrabold text-foreground mb-1">$25<span className="text-sm text-muted-foreground font-medium">/mo</span></div>
                <div className="text-sm font-semibold text-foreground mb-1">Internet Only</div>
                <div className="text-xs text-muted-foreground">300 Mbps · Unlimited · 5-Yr Lock</div>
              </div>
              <div className="bg-secondary rounded-2xl p-6 relative border-2 border-accent">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-teal text-teal-foreground text-[10px] font-bold uppercase tracking-wide px-3 py-1 rounded-full">
                  Most Popular
                </div>
                <div className="text-3xl font-extrabold text-foreground mb-1">
                  $20<span className="text-sm text-muted-foreground font-medium">/mo</span>
                </div>
                <div className="text-sm font-semibold text-foreground mb-1">Internet + TV Bundle</div>
                <div className="text-xs text-muted-foreground">Save ${TV_INTERNET_DISCOUNT}/mo off Internet automatically</div>
              </div>
              <div className="bg-secondary rounded-2xl p-6">
                <div className="text-3xl font-extrabold text-foreground mb-1">
                  $15<span className="text-sm text-muted-foreground font-medium">/mo</span>
                </div>
                <div className="text-sm font-semibold text-foreground mb-1">Internet + TV + Mobile</div>
                <div className="text-xs text-muted-foreground">Max savings: -${TV_INTERNET_DISCOUNT + MOBILE_INTERNET_DISCOUNT}/mo off Internet</div>
              </div>
            </div>
            <p className="text-center text-xs text-muted-foreground mt-6">
              Internet prices shown are the discounted rate after applying bundle savings to the 300 Mbps plan with Auto Pay &amp; Paperless Bill. Taxes &amp; fees not included.
            </p>
          </div>
        </section>

        {/* SEO content */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-extrabold text-foreground mb-6">
              The Best Optimum Internet Deals Available in 2026
            </h2>
            <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
              <p>
                <strong className="text-foreground">Optimum Internet</strong> currently offers some of the most competitive deals in the residential broadband market. The flagship offer — the <strong className="text-foreground">5-Year Price Lock</strong> — is a genuine industry differentiator: while most ISPs advertise artificially low promotional rates that jump after 12–24 months, Optimum locks in your rate for up to five full years when you enroll in Auto Pay and Paperless Billing.
              </p>
              <p>
                For households looking to maximize value, <strong className="text-foreground">Optimum bundle deals</strong> offer the most compelling savings. Adding Optimum TV to your Internet plan automatically reduces your monthly Internet bill by ${TV_INTERNET_DISCOUNT}. Adding Optimum Mobile Unlimited stacks an additional ${MOBILE_INTERNET_DISCOUNT}/mo off your Internet through the Optimum Complete Discount — totaling up to ${TV_INTERNET_DISCOUNT + MOBILE_INTERNET_DISCOUNT}/mo in automatic Internet savings with a full triple-play bundle.
              </p>
              <h3 className="text-xl font-bold text-foreground pt-2">How to Get the Best Optimum Deal</h3>
              <p>
                To take advantage of Optimum's current promotions, order online today. Online orders typically qualify for the full suite of current deals, including the 5-Year Price Lock, free professional installation, and free WiFi 6E gateway equipment. Pricing is transparent — no promotional rates that expire, no surprise surcharges beyond standard taxes and fees.
              </p>
              <p>
                For existing Optimum customers looking to add TV or Mobile service to their Internet plan, these bundle discounts also apply — immediately reducing your existing Internet bill. Contact your authorized Optimum representative when placing your order to confirm which promotions apply to your address.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-20 bg-background" aria-labelledby="deals-faq-heading">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 id="deals-faq-heading" className="text-3xl font-extrabold text-center text-foreground mb-10">
              Deals &amp; Promotions — Frequently Asked Questions
            </h2>
            <div className="space-y-3" itemScope itemType="https://schema.org/FAQPage">
              {dealsFaqs.map((faq, i) => (
                <div key={i} className="bg-card rounded-xl border border-border overflow-hidden" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <button
                    onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left"
                    aria-expanded={faqOpen === i}
                  >
                    <span className="font-semibold text-foreground pr-4" itemProp="name">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform ${faqOpen === i ? "rotate-180" : ""}`} />
                  </button>
                  {faqOpen === i && (
                    <div className="px-5 pb-5" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                      <p className="text-sm text-muted-foreground leading-relaxed" itemProp="text">{faq.a}</p>
                      <button onClick={() => openModal()} className="mt-3 text-accent font-semibold text-sm hover:underline">
                        Get this deal →
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="hero-gradient py-12">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold text-primary-foreground mb-3">
              Ready to Lock In Today's Best Price?
            </h2>
            <p className="text-primary-foreground/70 mb-6 max-w-xl mx-auto">
              Order online now and a licensed Optimum agent will call within one business hour to confirm your order and schedule installation.
            </p>
            <button
              onClick={() => openModal()}
              className="cta-gradient text-accent-foreground font-bold px-8 py-4 rounded-full text-lg hover:opacity-90 transition-opacity shadow-lg"
            >
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

export default DealsPage;
