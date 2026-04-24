import { useState } from "react";
import { Check, Tv, Mic, MonitorPlay, Smartphone, HardDrive, ChevronDown } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OrderModal from "@/components/OrderModal";
import SEO from "@/components/SEO";
import tvHero from "@/assets/tv-hero.jpg";
import { TV_PACKAGES, TV_INTERNET_DISCOUNT } from "@/lib/catalog";

const tvJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Optimum TV Service",
    "description": "Optimum TV packages with 75 to 200+ channels, Cloud DVR, 4K Ultra HD content, voice remote, and built-in streaming apps. From $30/mo with Optimum Internet.",
    "brand": { "@type": "Brand", "name": "Optimum TV" },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "USD",
      "lowPrice": "30",
      "highPrice": "150",
      "offerCount": "3"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.4",
      "reviewCount": "5210"
    }
  }
];

const tvFeatures = [
  {
    icon: Mic,
    title: "Voice-Activated Remote",
    description: "Optimum TV's Bluetooth-enabled remote lets you use voice commands to search for channels, shows, movies, and apps — just speak and watch. No more scrolling through endless channel guides.",
  },
  {
    icon: MonitorPlay,
    title: "4K Ultra HD Content",
    description: "Experience select movies, live sports, and shows in stunning 4K Ultra HD resolution on Optimum TV. See every detail with four times the clarity of standard HD television.",
  },
  {
    icon: Tv,
    title: "Built-In Streaming Apps",
    description: "Access popular streaming services like Netflix, YouTube, Prime Video, and more directly through the Optimum TV experience — no additional devices or switching inputs required.",
  },
  {
    icon: Smartphone,
    title: "Optimum TV App",
    description: "Watch live TV, On Demand content, and manage your DVR recordings from anywhere using the Optimum TV App on your smartphone or tablet. Take your entertainment on the go.",
  },
  {
    icon: HardDrive,
    title: "Cloud DVR",
    description: "Record up to 15 shows simultaneously with up to 150 hours of cloud DVR storage. Cloud DVR (25 hours) is included at no extra charge with select 1 Gig Internet + TV packages.",
  },
];

const tvFaqs = [
  {
    q: "Is Optimum TV available in my area?",
    a: "Optimum TV service is available in 21 states across the United States. Availability depends on your specific address and location. Use the Order Online button to check if Optimum TV is available at your home address, or contact us for assistance.",
  },
  {
    q: "Can I watch Optimum TV on my mobile device or streaming devices?",
    a: "Yes! Optimum TV subscribers can access their favorite channels using the Optimum TV app, available for Apple iOS and Android devices. You can also use the Optimum app on popular streaming devices and Smart TVs by selecting Optimum TV as your TV provider with your Optimum ID and password.",
  },
  {
    q: "What are the Optimum TV packages and how much do they cost?",
    a: "Optimum offers three TV packages: Entertainment TV (75+ channels, $30/mo), Extra TV (120+ channels, $95/mo), and Everything TV (200+ channels, $150/mo). All require an eligible Optimum Internet plan — and when you add TV, you save $5/mo on your Internet automatically through the Optimum bundle discount.",
  },
  {
    q: "Do I need Optimum Internet to get Optimum TV?",
    a: "Yes — Optimum TV service requires an active Optimum Internet subscription. This ensures you get the best possible TV experience with reliable connectivity for streaming, On Demand content, Cloud DVR, and the Optimum TV app features.",
  },
  {
    q: "Does Optimum TV include a DVR?",
    a: "Select Optimum TV packages include Cloud DVR at no extra charge. With Cloud DVR, you can record up to 15 shows simultaneously and store up to 150 hours of content. Cloud DVR recordings can be accessed from any TV in your home or through the Optimum TV app on your mobile device.",
  },
];

const TVPage = () => {
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
        title="Optimum TV from $30/mo | 75-200+ Channels & DVR"
        description="Order Optimum TV online. Packages with 75 to 200+ live channels, Cloud DVR, 4K Ultra HD, voice remote, and built-in streaming apps from $30/mo."
        canonical="https://www.optimuminternetservice.com/tv"
        keywords="Optimum TV, Optimum cable, cable TV packages, Cloud DVR, 4K TV, Optimum TV app, voice remote, streaming apps cable, TV and internet bundle"
        jsonLd={tvJsonLd}
      />
      <Header onOrderClick={openModal} />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden hero-gradient" aria-labelledby="tv-hero-heading">
          <div className="absolute inset-0 opacity-20">
            <img src={tvHero} alt="Family watching Optimum TV together in living room" width={1920} height={1080} className="w-full h-full object-cover" />
          </div>
          <div className="relative container mx-auto px-4 py-10 md:py-14 lg:py-16">
            <div className="max-w-3xl">
              <h1 id="tv-hero-heading" className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary-foreground leading-tight mb-3">
                Optimum TV — More Entertainment at a Lower Price
              </h1>
              <p className="text-primary-foreground/80 text-base md:text-lg mb-5 max-w-2xl">
                75 to 200+ live channels, Cloud DVR, 4K Ultra HD, and built-in streaming apps — from $30/mo with Optimum Internet, plus save ${TV_INTERNET_DISCOUNT}/mo on your Internet for bundling.
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="bg-primary-foreground/10 backdrop-blur-md rounded-xl px-5 py-3 border border-primary-foreground/20">
                  <p className="text-primary-foreground/70 text-[11px] font-semibold uppercase tracking-wider">Entertainment TV</p>
                  <div className="flex items-end gap-1">
                    <span className="text-primary-foreground text-lg font-bold">$</span>
                    <span className="text-primary-foreground text-5xl md:text-6xl font-extrabold leading-none">30</span>
                    <span className="text-primary-foreground text-lg font-bold mb-1">/mo*</span>
                  </div>
                </div>
                <button onClick={() => openModal()} className="cta-gradient text-accent-foreground font-bold px-7 py-3.5 rounded-full text-base hover:opacity-90 transition-opacity shadow-lg">
                  Order Optimum TV
                </button>
              </div>
              <p className="text-primary-foreground/60 text-xs mt-4">*Requires an eligible Optimum Internet plan. Plus taxes &amp; fees. Bundle and save ${TV_INTERNET_DISCOUNT}/mo on Internet automatically.</p>
            </div>
          </div>
        </section>

        {/* TV Packages */}
        <section className="py-16 md:py-24 bg-secondary" aria-labelledby="tv-packages-heading">
          <div className="container mx-auto px-4">
            <h2 id="tv-packages-heading" className="text-3xl md:text-4xl font-extrabold text-center text-foreground mb-4">
              Select the Optimum TV Package That's Right for You
            </h2>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-10">
              Optimum offers three TV packages to fit every household's entertainment needs — from basic local channels to the full premium sports and entertainment experience.
            </p>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {TV_PACKAGES.map((pkg) => {
                const recommended = pkg.id === "extra";
                return (
                  <article key={pkg.id} className={`relative bg-card rounded-2xl shadow-lg border-2 overflow-hidden transition-transform hover:-translate-y-1 ${recommended ? "border-accent" : "border-border"}`}>
                    {recommended && (
                      <div className="cta-gradient text-accent-foreground text-center text-xs font-bold py-1.5 uppercase tracking-wider">
                        Most Popular
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-foreground mb-1">{pkg.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{pkg.channels} channels</p>
                      <div className="flex items-end gap-1 mb-3">
                        <span className="text-foreground text-lg font-bold">$</span>
                        <span className="text-foreground text-5xl font-extrabold leading-none">{pkg.price}</span>
                        <span className="text-muted-foreground text-sm mb-1">/mo</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">{pkg.blurb}</p>
                      <div className="text-xs text-teal font-semibold mb-4">+ save ${TV_INTERNET_DISCOUNT}/mo on Optimum Internet when you bundle</div>
                      <button onClick={() => openModal()} className="w-full cta-gradient text-accent-foreground font-bold py-3 rounded-full hover:opacity-90 transition-opacity">
                        Order {pkg.name}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
            <p className="text-center text-xs text-muted-foreground mt-6 max-w-3xl mx-auto">
              *Not available in all areas. TV service requires eligible Optimum Internet plan. Channel lineups vary by location. Plus taxes & fees.
            </p>
          </div>
        </section>

        {/* TV Features */}
        <section className="py-16 md:py-24 bg-background" aria-labelledby="tv-features-heading">
          <div className="container mx-auto px-4">
            <h2 id="tv-features-heading" className="text-3xl md:text-4xl font-extrabold text-center text-foreground mb-4">
              Explore Optimum's Full Entertainment Experience
            </h2>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
              Optimum TV goes beyond traditional cable television with smart features, streaming integration, and advanced technology that transforms how you watch and enjoy entertainment at home.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {tvFeatures.map((f) => (
                <article key={f.title} className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 rounded-xl hero-gradient flex items-center justify-center mb-4">
                    <f.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SEO Content */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-extrabold text-foreground mb-6">Optimum TV — Cable Television Reimagined for the Modern Home</h2>
            <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
              <p>
                <strong className="text-foreground">Optimum TV</strong> combines traditional live television with modern streaming convenience, delivering an all-in-one entertainment solution for families. With packages ranging from 80 to 200+ channels, Optimum TV provides access to local news, national cable networks, premium sports programming, and popular streaming apps — all through a single, unified interface.
              </p>
              <p>
                Unlike standalone streaming services that require multiple subscriptions, Optimum TV bundles live TV, On Demand content, Cloud DVR, and built-in streaming apps into one package. Combined with Optimum's high-speed fiber internet, you get a seamless entertainment experience with zero buffering, 4K Ultra HD picture quality, and the ability to watch from any room in your home or on the go with the Optimum TV app.
              </p>
              <h3 className="text-xl font-bold text-foreground pt-2">Bundle Optimum TV with Internet for the Best Value</h3>
              <p>
                Optimum TV is designed to work alongside Optimum Internet for the ultimate connected home experience. When you bundle TV with Optimum fiber internet, you receive special bundle pricing, included Cloud DVR storage, and access to premium features like 4K Ultra HD content and multi-room viewing capabilities. Adding Optimum Mobile to your bundle further increases your savings with the Optimum Complete Discount.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-24 bg-background" aria-labelledby="tv-faq-heading">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 id="tv-faq-heading" className="text-3xl md:text-4xl font-extrabold text-center text-foreground mb-4">
              Optimum TV — Frequently Asked Questions
            </h2>
            <div className="space-y-3 mt-10" itemScope itemType="https://schema.org/FAQPage">
              {tvFaqs.map((faq, i) => (
                <div key={i} className="bg-card rounded-xl border border-border overflow-hidden" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <button onClick={() => setFaqOpen(faqOpen === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left" aria-expanded={faqOpen === i}>
                    <span className="font-semibold text-foreground pr-4" itemProp="name">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform ${faqOpen === i ? "rotate-180" : ""}`} />
                  </button>
                  {faqOpen === i && (
                    <div className="px-5 pb-5" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                      <p className="text-sm text-muted-foreground leading-relaxed" itemProp="text">{faq.a}</p>
                      <button onClick={() => openModal()} className="mt-3 text-accent font-semibold text-sm hover:underline">Order Optimum TV →</button>
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
            <h2 className="text-2xl md:text-3xl font-extrabold text-primary-foreground mb-3">Ready to Upgrade Your Home Entertainment?</h2>
            <p className="text-primary-foreground/70 mb-6 max-w-xl mx-auto">Get Optimum TV with 75 to 200+ channels, Cloud DVR, and built-in streaming apps from $30/mo — plus ${TV_INTERNET_DISCOUNT}/mo off your Internet for bundling.</p>
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

export default TVPage;
