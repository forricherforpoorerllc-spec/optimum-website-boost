import { Wifi, Lock, Shield, MonitorPlay, Home, Zap } from "lucide-react";
import routerImage from "@/assets/wifi-router.jpg";

const features = [
  {
    icon: Wifi,
    title: "Whole-Home WiFi Coverage",
    description: "Optimum's advanced WiFi extender technology delivers strong, consistent wireless internet signals to every room — even hard-to-reach areas. Enjoy seamless WiFi coverage throughout your entire home with Optimum Internet.",
  },
  {
    icon: Lock,
    title: "5-Year Internet Price Lock Guarantee",
    description: "With Optimum, your monthly internet price stays the same for up to 5 years. No surprise rate hikes, no hidden fees — just affordable, predictable high-speed internet pricing you can count on.",
  },
  {
    icon: Shield,
    title: "Built-In Internet Security",
    description: "Every Optimum Internet plan includes advanced cybersecurity features that protect your connected devices from malware, phishing attacks, ransomware, and other online threats at no extra cost.",
  },
  {
    icon: Zap,
    title: "Unlimited Internet Data — No Caps",
    description: "All Optimum Internet plans come with truly unlimited data. Stream movies in 4K, download large game files, video conference for work, and browse without worrying about data caps or overage charges.",
  },
  {
    icon: Home,
    title: "Free Optimum Gateway & Equipment",
    description: "Optimum provides a free high-performance gateway modem and WiFi extender with every internet plan. Get professional-grade networking equipment included at no additional monthly rental fee.",
  },
  {
    icon: MonitorPlay,
    title: "Perfect for Streaming & Gaming",
    description: "Optimum's fiber-powered internet delivers the low latency and high bandwidth needed for buffer-free 4K streaming on Netflix, Disney+, and YouTube, plus lag-free online gaming on PlayStation, Xbox, and PC.",
  },
];

const FeaturesSection = ({ onOrderClick }: { onOrderClick: () => void }) => (
  <section className="py-16 md:py-24 bg-background" aria-labelledby="features-heading">
    <div className="container mx-auto px-4">
      <h2 id="features-heading" className="text-3xl md:text-4xl font-extrabold text-center text-foreground mb-4">
        Why Millions Choose Optimum Internet Service
      </h2>
      <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
        Optimum is a leading internet service provider delivering fast, reliable fiber internet with best-in-class WiFi technology, unlimited data, and award-winning customer support across the Tri-State area and beyond.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
        {features.map((f) => (
          <article key={f.title} className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-xl hero-gradient flex items-center justify-center mb-4">
              <f.icon className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">{f.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
          </article>
        ))}
      </div>

      {/* Router showcase */}
      <div className="max-w-5xl mx-auto bg-secondary rounded-2xl overflow-hidden">
        <div className="grid md:grid-cols-2 items-center">
          <div className="p-8 md:p-12">
            <h3 className="text-2xl font-extrabold text-foreground mb-4">
              Optimum Smart WiFi — Powered by Advanced Fiber Technology
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Optimum's next-generation fiber optic internet network uses cutting-edge technology to deliver symmetrical upload and download speeds up to 1 Gbps. Combined with Optimum's Smart WiFi 6 gateway, you get wall-to-wall wireless internet coverage with intelligent device management that automatically optimizes your connection for streaming, gaming, and video calls.
            </p>
            <button onClick={onOrderClick} className="cta-gradient text-accent-foreground font-bold px-8 py-3 rounded-full hover:opacity-90 transition-opacity">
              Order Optimum Internet
            </button>
          </div>
          <div className="h-64 md:h-full">
            <img src={routerImage} alt="Optimum Smart WiFi Gateway router for whole-home internet coverage" loading="lazy" width={800} height={600} className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default FeaturesSection;
