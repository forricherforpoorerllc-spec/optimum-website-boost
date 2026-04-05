import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import MovingBanner from "@/components/MovingBanner";
import PlansSection from "@/components/PlansSection";
import FeaturesSection from "@/components/FeaturesSection";
import SEOContent from "@/components/SEOContent";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import OrderModal from "@/components/OrderModal";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Optimum Internet - Authorized Reseller",
  "description": "Optimum authorized reseller offering high-speed fiber internet plans starting at $25/mo with 5-year price lock. Get Optimum Internet with speeds up to 1 Gbps, unlimited data, and whole-home WiFi.",
  "url": "https://www.optimuminternetservice.com",
  "serviceType": "Internet Service Provider",
  "areaServed": ["New York", "New Jersey", "Connecticut", "Pennsylvania"],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Optimum Internet Plans",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": { "@type": "Service", "name": "Optimum 300 Mbps Internet" },
        "price": "25.00",
        "priceCurrency": "USD",
        "priceSpecification": { "@type": "UnitPriceSpecification", "unitText": "MONTH" }
      },
      {
        "@type": "Offer",
        "itemOffered": { "@type": "Service", "name": "Optimum 500 Mbps Internet" },
        "price": "35.00",
        "priceCurrency": "USD",
        "priceSpecification": { "@type": "UnitPriceSpecification", "unitText": "MONTH" }
      },
      {
        "@type": "Offer",
        "itemOffered": { "@type": "Service", "name": "Optimum 1 Gig Fiber Internet" },
        "price": "45.00",
        "priceCurrency": "USD",
        "priceSpecification": { "@type": "UnitPriceSpecification", "unitText": "MONTH" }
      }
    ]
  }
};

const Index = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header onOrderClick={openModal} />
      <main>
        <HeroSection onOrderClick={openModal} />
        <MovingBanner onOrderClick={openModal} />
        <PlansSection onOrderClick={openModal} />
        <FeaturesSection onOrderClick={openModal} />
        <SEOContent />
        <FAQSection onOrderClick={openModal} />
      </main>
      <Footer />
      <OrderModal isOpen={modalOpen} onClose={() => { setModalOpen(false); }} />
    </>
  );
};

export default Index;
