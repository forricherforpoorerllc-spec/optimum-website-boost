import { Link } from "react-router-dom";
import optimumLogo from "@/assets/optimum-logo.png";

const Footer = () => (
  <footer className="bg-navy py-12" aria-label="Site footer">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-3 gap-8 mb-8">
        <div>
          <img src={optimumLogo} alt="Optimum Authorized Reseller" width={140} height={38} className="h-8 w-auto brightness-0 invert mb-4" />
          <p className="text-navy-foreground/60 text-sm leading-relaxed">
            Authorized Optimum reseller offering high-speed fiber Internet, TV, and Mobile with transparent pricing and a 5-year price guarantee. Order online in minutes and a licensed Optimum agent schedules your installation.
          </p>
        </div>

        <div>
          <h4 className="text-navy-foreground font-semibold mb-3">Shop Optimum</h4>
          <ul className="space-y-2 text-sm text-navy-foreground/60">
            <li><Link to="/" className="hover:text-accent transition-colors">Fiber Internet Plans</Link></li>
            <li><Link to="/tv" className="hover:text-accent transition-colors">Optimum TV Packages</Link></li>
            <li><Link to="/mobile" className="hover:text-accent transition-colors">Optimum Mobile</Link></li>
            <li><Link to="/bundles" className="hover:text-accent transition-colors">Bundles &amp; Savings</Link></li>
            <li><Link to="/deals" className="hover:text-accent transition-colors">Deals &amp; Promotions</Link></li>
            <li><a href="/#internet" className="hover:text-accent transition-colors">Compare Plans &amp; Pricing</a></li>
            <li><a href="/#faq" className="hover:text-accent transition-colors">Frequently Asked Questions</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-navy-foreground font-semibold mb-3">About &amp; Legal</h4>
          <ul className="space-y-2 text-sm text-navy-foreground/60">
            <li className="text-navy-foreground/80 font-medium">Authorized Optimum Reseller</li>
            <li className="text-navy-foreground/60">Serving 21 Optimum states</li>
            <li><Link to="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-accent transition-colors">Terms of Service</Link></li>
            <li className="pt-2 text-navy-foreground/60 text-xs">
              Questions? Start your order online and an agent will reach out within one business hour.
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-navy-foreground/10 pt-6">
        <p className="text-xs text-navy-foreground/40 leading-relaxed">
          © {new Date().getFullYear()} Authorized Optimum Reseller. &quot;Optimum&quot; and the Optimum logo are registered trademarks of Altice USA; used with permission. This site is operated by an authorized reseller, not Altice USA. Internet speeds, pricing, and service availability vary by location. Advertised speeds are maximum wired speeds; actual speeds vary based on device, connection type, and network conditions. 5-year price guarantee applies to eligible plans with Auto Pay &amp; Paperless Bill enrollment. Taxes, fees, and surcharges extra. Not all services available in all areas. First month of service is required to be pre-authorized before a technician is dispatched.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
