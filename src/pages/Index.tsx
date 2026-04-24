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
import SEO from "@/components/SEO";

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Optimum Internet - Authorized Reseller",
    "description": "Optimum authorized reseller offering high-speed fiber internet plans starting at $25/mo with 5-year price lock. Get Optimum Internet with speeds up to 1 Gbps, unlimited data, and whole-home WiFi.",
    "url": "https://www.optimuminternetservice.com",
    "telephone": "+1-888-467-8468",
    "priceRange": "$25 - $100",
    "serviceType": "Internet Service Provider",
    "areaServed": ["New York", "New Jersey", "Connecticut", "Pennsylvania", "North Carolina", "South Carolina", "Texas", "Arizona"],
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
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.6",
      "reviewCount": "18427",
      "bestRating": "5",
      "worstRating": "1"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.optimuminternetservice.com/" },
      { "@type": "ListItem", "position": 2, "name": "Optimum Internet Plans", "item": "https://www.optimuminternetservice.com/#internet" }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Optimum Fiber Internet",
    "description": "Optimum fiber internet plans with unlimited data, no annual contract, free WiFi 6 gateway, and a 5-year price lock. Speeds from 300 Mbps up to 1 Gbps.",
    "brand": { "@type": "Brand", "name": "Optimum" },
    "category": "Internet Service",
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "USD",
      "lowPrice": "25",
      "highPrice": "45",
      "offerCount": "3",
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.6",
      "reviewCount": "18427",
      "bestRating": "5",
      "worstRating": "1"
    }
  }
];

const Index = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | undefined>(undefined);
  const openModal = (plan?: string) => {
    setSelectedPlan(plan);
    setModalOpen(true);
  };

  return (
    <>
      <SEO
        title="Optimum Internet from $25/mo | 5-Year Price Lock"
        description="Order Optimum fiber internet online — 300 Mbps to 1 Gig plans from $25/mo with a 5-year price lock, unlimited data, and a free WiFi 6 gateway."
        canonical="https://www.optimuminternetservice.com/"
        keywords="Optimum Internet, Optimum fiber internet, order Optimum online, Optimum Internet plans, 5-year price lock, 1 Gig fiber internet, 300 Mbps internet, 500 Mbps internet, Optimum bundle deals, cheap internet near me, best internet service provider"
        jsonLd={jsonLd}
      />
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
      <OrderModal isOpen={modalOpen} onClose={() => { setModalOpen(false); }} selectedPlan={selectedPlan} />
    </>
  );
};

export default Index;
