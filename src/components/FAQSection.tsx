import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Are there any data caps with Optimum Internet plans?",
    a: "No — all Optimum Internet plans include truly unlimited data. Whether you're streaming 4K movies, downloading large game files, attending video conferences for remote work, or browsing social media, you'll never hit a data cap or face overage fees with Optimum. Unlimited internet data is included with every Optimum fiber internet plan at no additional cost.",
  },
  {
    q: "What internet equipment do I need for Optimum Internet service?",
    a: "Optimum provides all the equipment you need to get online. Every Optimum Internet plan includes a free high-performance gateway modem and, if needed, a free WiFi extender for whole-home wireless coverage. You can also use your own approved modem or router; however, Optimum cannot guarantee the performance or reliability of third-party networking equipment on the Optimum fiber network.",
  },
  {
    q: "Does Optimum offer internet and mobile bundle deals?",
    a: "Yes! Optimum offers bundle packages that combine high-speed fiber internet with Optimum Mobile unlimited wireless plans. When you bundle Optimum Internet with Optimum Mobile, you'll receive the Optimum Complete Discount — saving $10/mo on your internet bill. You can also add Optimum TV for a complete home entertainment and connectivity package.",
  },
  {
    q: "Is Optimum Internet good for online gaming and 4K streaming?",
    a: "Absolutely. Optimum fiber internet is ideal for gaming and streaming. With download speeds up to 1 Gbps, low latency connections, and unlimited data, you can enjoy smooth online gaming on PlayStation, Xbox, and PC, plus buffer-free 4K UHD streaming on services like Netflix, Hulu, Disney+, HBO Max, and YouTube TV — all at the same time on multiple devices.",
  },
  {
    q: "What is Optimum's 5-Year Price Lock guarantee?",
    a: "Optimum's 5-Year Price Lock means the monthly price you see when you sign up is the price you'll pay for up to 5 full years. Unlike other internet service providers that raise rates after a promotional period, Optimum guarantees your internet price won't increase during the lock period. This applies to all Optimum Internet plans — 300 Mbps, 500 Mbps, and 1 Gig fiber.",
  },
  {
    q: "How fast is Optimum fiber internet?",
    a: "Optimum offers three internet speed tiers to match your household's needs: 300 Mbps for everyday browsing and streaming, 500 Mbps for multi-device households with 4K streaming and gaming, and 1 Gig (1,000 Mbps) for power users and smart homes with 10+ connected devices. All Optimum plans are powered by advanced fiber optic internet technology for maximum reliability.",
  },
  {
    q: "Is Optimum Internet available in my area?",
    a: "Optimum Internet is available across the Tri-State area including parts of New York, New Jersey, Connecticut, and Pennsylvania, as well as select areas in other states. Optimum continues to expand its fiber optic internet network to bring high-speed internet service to more communities. Use the Order Online button above to check Optimum Internet availability at your address.",
  },
  {
    q: "Can I transfer my Optimum Internet service when I move?",
    a: "Yes! If you're an existing Optimum customer, you can transfer your Optimum Internet service to your new address at no cost. Your current plan, pricing, and 5-year price lock will carry over to your new location as long as Optimum service is available at your new address. Click 'Order Online' to initiate your Optimum Internet service transfer.",
  },
];

const FAQSection = ({ onOrderClick }: { onOrderClick: () => void }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 md:py-24 bg-secondary" aria-labelledby="faq-heading">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 id="faq-heading" className="text-3xl md:text-4xl font-extrabold text-center text-foreground mb-4">
          Frequently Asked Questions About Optimum Internet
        </h2>
        <p className="text-center text-muted-foreground mb-10">
          Get answers to the most common questions about Optimum Internet plans, pricing, speeds, equipment, and service availability.
        </p>

        <div className="space-y-3" itemScope itemType="https://schema.org/FAQPage">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-card rounded-xl border border-border overflow-hidden" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
                aria-expanded={openIndex === i}
              >
                <span className="font-semibold text-foreground pr-4" itemProp="name">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform ${openIndex === i ? "rotate-180" : ""}`} />
              </button>
              {openIndex === i && (
                <div className="px-5 pb-5" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <p className="text-sm text-muted-foreground leading-relaxed" itemProp="text">{faq.a}</p>
                  <button onClick={onOrderClick} className="mt-3 text-accent font-semibold text-sm hover:underline">
                    Order Optimum Internet →
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
