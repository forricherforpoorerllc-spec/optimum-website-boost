import { Link } from "react-router-dom";
import optimumLogo from "@/assets/optimum-logo.png";

const Footer = () => (
  <footer className="bg-navy py-12" aria-label="Site footer">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-4 gap-8 mb-8">
        <div>
          <img src={optimumLogo} alt="Optimum Authorized Reseller" width={140} height={38} className="h-8 w-auto brightness-0 invert mb-4" />
          <p className="text-navy-foreground/60 text-sm leading-relaxed">
            Optimum is a leading internet service provider offering high-speed fiber internet, mobile, and TV services. As an authorized Optimum reseller, we help customers find the best Optimum internet deals and plans for their homes.
          </p>
        </div>
        <div>
          <h4 className="text-navy-foreground font-semibold mb-3">Optimum Internet</h4>
          <ul className="space-y-2 text-sm text-navy-foreground/60">
            <li><Link to="/" className="hover:text-accent transition-colors">Internet Plans & Pricing</Link></li>
            <li><Link to="/" className="hover:text-accent transition-colors">Fiber Internet Speeds</Link></li>
            <li><Link to="/" className="hover:text-accent transition-colors">Internet & Mobile Bundles</Link></li>
            <li><Link to="/" className="hover:text-accent transition-colors">5-Year Price Lock</Link></li>
            <li><Link to="/" className="hover:text-accent transition-colors">Internet Availability</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-navy-foreground font-semibold mb-3">Optimum Services</h4>
          <ul className="space-y-2 text-sm text-navy-foreground/60">
            <li><Link to="/mobile" className="hover:text-accent transition-colors">Optimum Mobile</Link></li>
            <li><Link to="/tv" className="hover:text-accent transition-colors">Optimum TV</Link></li>
            <li><Link to="/" className="hover:text-accent transition-colors">Moving Services</Link></li>
            <li><Link to="/" className="hover:text-accent transition-colors">WiFi Equipment</Link></li>
            <li><Link to="/" className="hover:text-accent transition-colors">Bundle & Save</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-navy-foreground font-semibold mb-3">Support</h4>
          <ul className="space-y-2 text-sm text-navy-foreground/60">
            <li><Link to="/" className="hover:text-accent transition-colors">FAQ</Link></li>
            <li><a href="#" className="hover:text-accent transition-colors">Terms & Conditions</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Accessibility</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-navy-foreground/10 pt-6">
        <p className="text-xs text-navy-foreground/40 leading-relaxed">
          © {new Date().getFullYear()} Optimum Authorized Reseller. All rights reserved. Optimum and the Optimum logo are registered trademarks of Altice USA. This website is operated by an authorized Optimum reseller. Internet speeds, pricing, and availability vary by location. Advertised speeds are maximum wired speeds. Actual Optimum internet speeds may vary based on device, connection type, network conditions, and other factors. 5-year price lock applies to eligible plans with Auto Pay & Paperless Bill enrollment. Taxes, fees, and surcharges extra. Not all services available in all areas.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
