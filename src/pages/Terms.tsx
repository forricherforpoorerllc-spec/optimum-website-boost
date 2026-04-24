import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OrderModal from "@/components/OrderModal";
import SEO from "@/components/SEO";
import { useState } from "react";

const LAST_UPDATED = "January 1, 2026";

const Terms = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | undefined>(undefined);
  const openModal = (plan?: string) => {
    setSelectedPlan(plan);
    setModalOpen(true);
  };

  return (
    <>
      <SEO
        title="Terms of Service | Optimum Authorized Reseller"
        description="Terms and conditions for using this Optimum authorized reseller website and placing an Optimum service order online."
        canonical="https://www.optimuminternetservice.com/terms"
      />
      <Header onOrderClick={openModal} />
      <main className="bg-background">
        <section className="hero-gradient py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary-foreground mb-3">Terms of Service</h1>
            <p className="text-primary-foreground/80 text-sm md:text-base">Last updated: {LAST_UPDATED}</p>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-3xl prose prose-sm md:prose-base max-w-none text-muted-foreground space-y-6">
            <p>
              These Terms of Service ("Terms") govern your use of this website and your submission of an online order for Optimum Internet, TV, or Mobile service through this authorized reseller. By using this site or placing an order, you agree to these Terms.
            </p>

            <h2 className="text-xl md:text-2xl font-bold text-foreground pt-4">1. Reseller Relationship</h2>
            <p>
              This site is operated by an independent authorized reseller of Altice USA's Optimum-branded services. We are not Altice USA, Inc. "Optimum" and the Optimum logo are trademarks of Altice USA and are used with permission.
            </p>

            <h2 className="text-xl md:text-2xl font-bold text-foreground pt-4">2. Eligibility</h2>
            <p>You must be at least 18 years old and a legal U.S. resident to place an order. Service availability varies by address, and all orders are subject to Optimum's underwriting, credit, and identity verification.</p>

            <h2 className="text-xl md:text-2xl font-bold text-foreground pt-4">3. Pricing, Promotions & Price Lock</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>All prices shown exclude taxes, fees, and government surcharges unless explicitly stated.</li>
              <li>The 5-Year Price Lock applies to eligible Optimum Internet plans and requires enrollment in Auto Pay and Paperless Billing. Equipment fees, add-ons, and regulatory charges are not subject to the price lock.</li>
              <li>Bundle discounts (e.g., $5/mo off Internet with TV, $10/mo off Internet with Mobile Unlimited) require both services to remain active and are removed automatically if either service is cancelled.</li>
              <li>Promotions shown on this site are subject to change or withdrawal at any time and are only binding once confirmed by Optimum in your order confirmation.</li>
            </ul>

            <h2 className="text-xl md:text-2xl font-bold text-foreground pt-4">4. First-Month Pre-Authorization</h2>
            <p>
              To reserve an installation window and hold your equipment, Optimum requires a first-month pre-authorization charge before dispatch. The amount is held on file and finalized after installation is complete and service is confirmed working. If installation cannot be completed through no fault of yours, the pre-authorization will be released.
            </p>

            <h2 className="text-xl md:text-2xl font-bold text-foreground pt-4">5. 30-Day Money-Back Guarantee</h2>
            <p>
              Optimum Internet plans include a 30-day money-back guarantee on monthly service charges. Equipment must be returned in good condition within the return window; unreturned or damaged equipment may be charged at its replacement cost. Installation fees, third-party services, and taxes are non-refundable.
            </p>

            <h2 className="text-xl md:text-2xl font-bold text-foreground pt-4">6. Equipment</h2>
            <p>
              Optimum-provided equipment (gateways, WiFi extenders, TV boxes, etc.) remains the property of Optimum and must be returned if service is cancelled. Failure to return equipment within the stated window may result in non-return fees.
            </p>

            <h2 className="text-xl md:text-2xl font-bold text-foreground pt-4">7. No Annual Contract</h2>
            <p>Optimum Internet plans do not require an annual contract and carry no early termination fee. The 5-Year Price Lock is Optimum's commitment to you, not a term commitment on your part.</p>

            <h2 className="text-xl md:text-2xl font-bold text-foreground pt-4">8. Acceptable Use</h2>
            <p>You agree not to use this site or Optimum services to (a) violate any law, (b) infringe others' rights, (c) transmit malware, (d) engage in fraud or identity theft, or (e) interfere with the operation or security of any system or network.</p>

            <h2 className="text-xl md:text-2xl font-bold text-foreground pt-4">9. Disclaimers</h2>
            <p>
              This site is provided "as is" without warranties of any kind, express or implied, including merchantability, fitness for a particular purpose, and non-infringement. Advertised speeds are maximum wired speeds; actual speeds vary based on device, connection type, location, and network conditions.
            </p>

            <h2 className="text-xl md:text-2xl font-bold text-foreground pt-4">10. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, neither the reseller nor its affiliates will be liable for indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, arising from your use of this site or any order placed through it.
            </p>

            <h2 className="text-xl md:text-2xl font-bold text-foreground pt-4">11. Governing Law</h2>
            <p>These Terms are governed by the laws of the State of New York, without regard to conflict-of-laws principles. Any disputes will be resolved in the state or federal courts located in New York County, New York.</p>

            <h2 className="text-xl md:text-2xl font-bold text-foreground pt-4">12. Changes</h2>
            <p>We may update these Terms from time to time. Continued use of the site after an update constitutes acceptance of the new Terms.</p>

            <h2 className="text-xl md:text-2xl font-bold text-foreground pt-4">13. Contact</h2>
            <p>Questions about these Terms? Start an order and include "Terms question" in the comments, or reach out to the reseller listed on your order confirmation.</p>
          </div>
        </section>
      </main>
      <Footer />
      <OrderModal isOpen={modalOpen} onClose={() => setModalOpen(false)} selectedPlan={selectedPlan} />
    </>
  );
};

export default Terms;
