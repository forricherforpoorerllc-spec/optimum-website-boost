import { useState } from "react";
import { X } from "lucide-react";

const OrderModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [form, setForm] = useState({ name: "", email: "", zip: "", address: "" });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Order Optimum Internet Online">
      <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="hero-gradient rounded-t-2xl p-6">
          <button onClick={onClose} className="absolute top-4 right-4 text-primary-foreground/70 hover:text-primary-foreground" aria-label="Close order form">
            <X className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-extrabold text-primary-foreground">Order Optimum Internet Online</h2>
          <p className="text-primary-foreground/70 text-sm mt-1">Get high-speed fiber internet starting at $25/mo with a 5-year price lock.</p>
        </div>

        <div className="p-6">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="order-name" className="block text-sm font-medium text-foreground mb-1">Full Name</label>
                <input
                  id="order-name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-border rounded-lg px-4 py-2.5 text-sm bg-background text-foreground focus:ring-2 focus:ring-accent focus:border-accent outline-none"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label htmlFor="order-email" className="block text-sm font-medium text-foreground mb-1">Email Address</label>
                <input
                  id="order-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-border rounded-lg px-4 py-2.5 text-sm bg-background text-foreground focus:ring-2 focus:ring-accent focus:border-accent outline-none"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="order-zip" className="block text-sm font-medium text-foreground mb-1">Zip Code</label>
                <input
                  id="order-zip"
                  type="text"
                  required
                  pattern="[0-9]{5}"
                  value={form.zip}
                  onChange={(e) => setForm({ ...form, zip: e.target.value })}
                  className="w-full border border-border rounded-lg px-4 py-2.5 text-sm bg-background text-foreground focus:ring-2 focus:ring-accent focus:border-accent outline-none"
                  placeholder="Enter your zip code"
                />
              </div>
              <div>
                <label htmlFor="order-address" className="block text-sm font-medium text-foreground mb-1">Street Address</label>
                <input
                  id="order-address"
                  type="text"
                  required
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className="w-full border border-border rounded-lg px-4 py-2.5 text-sm bg-background text-foreground focus:ring-2 focus:ring-accent focus:border-accent outline-none"
                  placeholder="Enter your street address"
                />
              </div>
              <button type="submit" className="w-full cta-gradient text-accent-foreground font-bold py-3 rounded-full text-lg hover:opacity-90 transition-opacity">
                Check Availability & Order
              </button>
              <p className="text-xs text-muted-foreground text-center">
                By submitting, you agree to our Terms of Use and Privacy Policy. Optimum Internet service availability varies by location.
              </p>
            </form>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-teal/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✓</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Thank You!</h3>
              <p className="text-muted-foreground text-sm">
                We've received your Optimum Internet order request. An Optimum representative will contact you shortly to confirm availability and finalize your internet plan selection.
              </p>
              <button onClick={onClose} className="mt-6 cta-gradient text-accent-foreground font-semibold px-6 py-2.5 rounded-full hover:opacity-90 transition-opacity">
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
