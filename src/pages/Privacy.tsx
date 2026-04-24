import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OrderModal from "@/components/OrderModal";
import SEO from "@/components/SEO";
import { useState } from "react";

const LAST_UPDATED = "January 1, 2026";

const Privacy = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | undefined>(undefined);
  const openModal = (plan?: string) => {
    setSelectedPlan(plan);
    setModalOpen(true);
  };

  return (
    <>
      <SEO
        title="Privacy Policy | Optimum Authorized Reseller"
        description="How we collect, use, and protect your information when you order Optimum Internet, TV, or Mobile service online."
        canonical="https://www.optimuminternetservice.com/privacy"
      />
      <Header onOrderClick={openModal} />
      <main className="bg-background">
        <section className="hero-gradient py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary-foreground mb-3">Privacy Policy</h1>
            <p className="text-primary-foreground/80 text-sm md:text-base">Last updated: {LAST_UPDATED}</p>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-3xl prose prose-sm md:prose-base max-w-none text-muted-foreground space-y-6">
            <p>
              This Privacy Policy explains how this authorized Optimum reseller website ("we," "us," or "our") collects, uses, shares, and protects personal information when you visit this site or place an Optimum service order. This site is operated by an independent authorized reseller and is not owned or operated by Altice USA, Inc.
            </p>

            <h2 className="text-xl md:text-2xl font-bold text-foreground pt-4">1. Information We Collect</h2>
            <p>When you place an order for Optimum Internet, TV, or Mobile, we collect the following information to verify identity, check service availability, and complete your order:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Contact information — full name, email address, phone number</li>
              <li>Installation address — street, unit, city, state, ZIP</li>
              <li>Identity verification — date of birth and the last four digits of your Social Security Number (used solely for credit/identity verification with Optimum)</li>
              <li>Service selection — plan, add-ons, installation preferences, current/previous internet provider</li>
              <li>Technical data — browser type, IP address, device identifiers, pages viewed, referral source (collected automatically)</li>
            </ul>

            <h2 className="text-xl md:text-2xl font-bold text-foreground pt-4">2. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Submit and provision your Optimum service order with Altice USA</li>
              <li>Schedule installation and contact you about your order status</li>
              <li>Respond to questions, support requests, and correspondence</li>
              <li>Prevent fraud, verify identity, and comply with legal obligations</li>
              <li>Improve site functionality, security, and marketing effectiveness</li>
            </ul>

            <h2 className="text-xl md:text-2xl font-bold text-foreground pt-4">3. Information Sharing</h2>
            <p>We share the information required to fulfill your order with:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Altice USA / Optimum</strong> — to activate service, schedule installation, and run identity/credit checks</li>
              <li><strong>Service providers</strong> — hosting, analytics, email, CRM, and payment processors bound by confidentiality</li>
              <li><strong>Legal authorities</strong> — when required by law, subpoena, or to protect rights and safety</li>
            </ul>
            <p>We do <strong>not</strong> sell your personal information to third parties for their independent marketing purposes.</p>

            <h2 className="text-xl md:text-2xl font-bold text-foreground pt-4">4. Cookies & Tracking</h2>
            <p>
              This site uses first-party and third-party cookies and similar technologies for essential site functionality, analytics, conversion measurement, and advertising. You can disable cookies in your browser settings; doing so may limit some features of the site.
            </p>

            <h2 className="text-xl md:text-2xl font-bold text-foreground pt-4">5. Your Privacy Rights</h2>
            <p>
              Depending on where you live, you may have rights to access, correct, delete, or port the personal information we hold about you, and to opt out of certain uses. California residents have additional rights under the CCPA/CPRA, including the right to know, delete, correct, and limit the use of sensitive personal information. To exercise any of these rights, contact us using the information below.
            </p>

            <h2 className="text-xl md:text-2xl font-bold text-foreground pt-4">6. Data Security</h2>
            <p>
              We use reasonable administrative, technical, and physical safeguards to protect personal information, including encryption in transit (HTTPS), restricted access, and secure handling of sensitive fields such as date of birth and SSN. No internet transmission is 100% secure, and we cannot guarantee absolute security.
            </p>

            <h2 className="text-xl md:text-2xl font-bold text-foreground pt-4">7. Children's Privacy</h2>
            <p>This site is not directed to children under 13, and we do not knowingly collect personal information from children.</p>

            <h2 className="text-xl md:text-2xl font-bold text-foreground pt-4">8. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. The "Last updated" date at the top reflects the most recent revision. Material changes will be highlighted on the site.</p>

            <h2 className="text-xl md:text-2xl font-bold text-foreground pt-4">9. Contact Us</h2>
            <p>
              Privacy questions or requests to exercise your rights can be submitted by starting an order and noting "Privacy request" in the comments, or by contacting the reseller listed on your order confirmation. For questions about Optimum's own privacy practices, please visit optimum.com/privacy.
            </p>
          </div>
        </section>
      </main>
      <Footer />
      <OrderModal isOpen={modalOpen} onClose={() => setModalOpen(false)} selectedPlan={selectedPlan} />
    </>
  );
};

export default Privacy;
