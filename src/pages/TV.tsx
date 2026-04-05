import { useState } from "react";
import { Check, Tv, Mic, MonitorPlay, Smartphone, HardDrive, ChevronDown } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OrderModal from "@/components/OrderModal";
import tvHero from "@/assets/tv-hero.jpg";

const tvPackages = [
  {
    name: "Entertainment TV",
    channels: "80+",
    description: "Top-rated entertainment TV at a great value with 80+ channels including local news, popular cable networks, and family-friendly programming.",
    features: [
      "80+ live TV channels",
      "Local news & weather channels",
      "Popular entertainment networks",
      "Family & kids programming",
      "Optimum TV app access",
    ],
    popular: false,
  },
  {
    name: "Extra TV",
    channels: "125+",
    description: "News, family, entertainment, and sports channels — 125+ channels for households that want more variety and premium content.",
    features: [
      "125+ live TV channels",
      "All Entertainment TV channels included",
      "Additional sports & news networks",
      "Lifestyle & reality channels",
      "Cloud DVR included",
    ],
    popular: true,
  },
  {
    name: "Everything TV",
    channels: "200+",
    description: "The ultimate Optimum TV experience with 200+ channels — sports, entertainment, premium networks, and everything else.",
    features: [
      "200+ live TV channels",
      "All Extra TV channels included",
      "Premium sports packages",
      "Specialty & international channels",
      "Cloud DVR with expanded storage",
    ],
    popular: false,
  },
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
    a: "Optimum offers three main TV packages: Entertainment TV (80+ channels), Extra TV (125+ channels), and Everything TV (200+ channels). TV plans start as low as $25/mo when bundled with an eligible Optimum Internet plan. Pricing varies by location and current promotions.",
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
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const openModal = () => setModalOpen(true);

  return (
    <>
      <Header onOrderClick={openModal} />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden hero-gradient" aria-labelledby="tv-hero-heading">
          <div className="absolute inset-0 opacity-20">
            <img src={tvHero} alt="Family watching Optimum TV together in living room" width={1920} height={1080} className="w-full h-full object-cover" />
          </div>
          <div className="relative container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-2xl">
              <h1 id="tv-hero-heading" className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground leading-tight mb-4">
                Optimum TV — More Entertainment at a Lower Price
              </h1>
              <p className="text-primary-foreground/80 text-lg md:text-xl mb-6">
                Enjoy 80 to 200+ live TV channels, built-in streaming apps, Cloud DVR, 4K Ultra HD content, and the Optimum TV app — all starting as low as $25/mo with an eligible Optimum Internet plan.
              </p>
              <div className="bg-primary-foreground/10 backdrop-blur-md rounded-2xl p-6 inline-block mb-6 border border-primary-foreground/20">
                <p className="text-primary-foreground/70 text-sm font-semibold uppercase tracking-wider mb-2">Optimum TV Plans From</p>
                <div className="flex items-end gap-1">
                  <span className="text-primary-foreground text-2xl font-bold">$</span>
                  <span className="text-primary-foreground text-7xl font-extrabold leading-none">25</span>
                  <span className="text-primary-foreground text-xl font-bold mb-2">/mo*</span>
                </div>
                <p className="text-primary-foreground/50 text-xs mt-1">*For 12 months w/ Auto Pay & Paperless Bill. Plus taxes & fees. Requires eligible Internet plan.</p>
              </div>
              <div>
                <button onClick={openModal} className="cta-gradient text-accent-foreground font-bold px-8 py-4 rounded-full text-lg hover:opacity-90 transition-opacity shadow-lg">
                  Order Optimum TV Online
                </button>
              </div>
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
              {tvPackages.map((pkg) => (
                <article key={pkg.name} className={`relative bg-card rounded-2xl shadow-lg border-2 overflow-hidden transition-transform hover:-translate-y-1 ${pkg.popular ? "border-accent" : "border-border"}`}>
                  {pkg.popular && (
                    <div className="cta-gradient text-accent-foreground text-center text-xs font-bold py-1.5 uppercase tracking-wider">
                      Most Popular
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-1">{pkg.name}</h3>
                    <p className="text-3xl font-extrabold text-accent mb-2">{pkg.channels} Channels</p>
                    <p className="text-sm text-muted-foreground mb-4">{pkg.description}</p>
                    <ul className="space-y-2 mb-6">
                      {pkg.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-foreground">
                          <Check className="w-4 h-4 text-teal flex-shrink-0 mt-0.5" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <button onClick={openModal} className="w-full cta-gradient text-accent-foreground font-bold py-3 rounded-full hover:opacity-90 transition-opacity">
                      Order Online
                    </button>
                  </div>
                </article>
              ))}
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
                      <button onClick={openModal} className="mt-3 text-accent font-semibold text-sm hover:underline">Order Optimum TV →</button>
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
            <p className="text-primary-foreground/70 mb-6 max-w-xl mx-auto">Get Optimum TV with 80 to 200+ channels, Cloud DVR, and built-in streaming apps starting at $25/mo.</p>
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

export default TVPage;
