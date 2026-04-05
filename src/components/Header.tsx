import { useState } from "react";
import { Menu, X, Wifi, Smartphone, Tv, Briefcase, HeadphonesIcon } from "lucide-react";
import optimumLogo from "@/assets/optimum-logo.png";

const navItems = [
  { label: "Internet", icon: Wifi },
  { label: "Mobile", icon: Smartphone },
  { label: "TV", icon: Tv },
  { label: "Business", icon: Briefcase },
  { label: "Customer Service", icon: HeadphonesIcon },
];

const Header = ({ onOrderClick }: { onOrderClick: () => void }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background shadow-sm">
      <nav className="container mx-auto flex items-center justify-between py-3 px-4" aria-label="Main navigation">
        <a href="/" className="flex-shrink-0" aria-label="Optimum Authorized Reseller - Home">
          <img src={optimumLogo} alt="Optimum Authorized Reseller Logo" width={180} height={48} className="h-10 w-auto" />
        </a>

        <ul className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => (
            <li key={item.label}>
              <a href={`#${item.label.toLowerCase().replace(/\s+/g, "-")}`} className="flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-accent transition-colors">
                <item.icon className="w-4 h-4" />
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <button onClick={onOrderClick} className="hidden lg:block cta-gradient text-accent-foreground font-semibold px-6 py-2.5 rounded-full text-sm hover:opacity-90 transition-opacity">
          Order Online
        </button>

        <button className="lg:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-background px-4 pb-4">
          <ul className="flex flex-col gap-3 py-3">
            {navItems.map((item) => (
              <li key={item.label}>
                <a href={`#${item.label.toLowerCase().replace(/\s+/g, "-")}`} className="flex items-center gap-2 text-sm font-medium text-foreground" onClick={() => setMobileOpen(false)}>
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <button onClick={() => { onOrderClick(); setMobileOpen(false); }} className="w-full cta-gradient text-accent-foreground font-semibold px-6 py-2.5 rounded-full text-sm">
            Order Online
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
