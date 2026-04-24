import { useEffect, useMemo, useState } from "react";
import { X, Check, ShieldCheck, Lock, CreditCard, ArrowLeft, ArrowRight, Loader2, Smartphone, Tv as TvIcon, Wifi } from "lucide-react";
import {
  INTERNET_PLANS,
  TV_PACKAGES,
  ADD_ONS,
  TV_INTERNET_DISCOUNT,
  MOBILE_INTERNET_DISCOUNT,
  calculateOrder,
  type InternetPlan,
  type TVPackage,
  type AddOn,
} from "@/lib/catalog";

/**
 * Apps Script Web App URL — hardcoded.
 * Replace the value below with your deployed Apps Script /exec URL.
 */
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx7DzA6leTuVS873-8r5yuk-dfi4t6fWd2TtOBdjqsrHGupLpCypHfmqMtcM1u0xBp6/exec";

type Step = 1 | 2 | 3 | 4 | 5 | 6 | 7;

type FormState = {
  internetPlanId: InternetPlan["id"] | "";
  tvPackageId: TVPackage["id"] | "none" | "";
  addOnIds: string[];
  firstName: string;
  lastName: string;
  dob: string;
  ssn: string;
  streetAddress: string;
  aptUnit: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
  preferredInstallDate: string;
  preferredInstallTime: string;
  movedInLastYear: "Yes" | "No" | "";
  previousStreetAddress: string;
  previousAptUnit: string;
  previousCity: string;
  previousState: string;
  previousZip: string;
  mobileInterest: "Yes" | "No" | "";
};

const EMPTY_FORM: FormState = {
  internetPlanId: "",
  tvPackageId: "",
  addOnIds: [],
  firstName: "",
  lastName: "",
  dob: "",
  ssn: "",
  streetAddress: "",
  aptUnit: "",
  city: "",
  state: "",
  zip: "",
  phone: "",
  email: "",
  preferredInstallDate: "",
  preferredInstallTime: "",
  movedInLastYear: "",
  previousStreetAddress: "",
  previousAptUnit: "",
  previousCity: "",
  previousState: "",
  previousZip: "",
  mobileInterest: "",
};

const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY",
];

const TIME_WINDOWS = [
  "Morning (8:00 AM - 12:00 PM)",
  "Afternoon (12:00 PM - 4:00 PM)",
  "Evening (4:00 PM - 8:00 PM)",
];

/** Short one-liner copy for the compact add-on cards (falls back to full description). */
const SHORT_ADDON_COPY: Record<string, string> = {
  "whole-home-wifi": "Up to 3 extenders for strong WiFi in every room.",
  "optimum-stream": "Extra Stream device — live TV, DVR & apps on another screen.",
  "hbo-max": "HBO Originals, blockbusters & top series. Added to your bill.",
  "total-care": "No service-visit fees + priority U.S. tech support.",
  "total-care-plus": "Total Care + device protection & accidental damage.",
  "total-care-max": "Total Care + connected-home protection & smart-home installs.",
  "phone-line": "Landline with unlimited nationwide calling.",
};

const ADD_ON_CATEGORY_ORDER: AddOn["category"][] = ["Internet", "TV", "Entertainment", "Protection", "Phone"];
const ADD_ON_GROUPS = ADD_ON_CATEGORY_ORDER
  .map((category) => ({ category, items: ADD_ONS.filter((a) => a.category === category) }))
  .filter((g) => g.items.length > 0);

const inputCls =
  "w-full border border-border rounded-lg px-4 py-2.5 text-sm bg-background text-foreground focus:ring-2 focus:ring-accent focus:border-accent outline-none";
const errInputCls =
  "w-full border border-destructive rounded-lg px-4 py-2.5 text-sm bg-background text-foreground focus:ring-2 focus:ring-destructive/40 focus:border-destructive outline-none";
const labelCls = "block text-sm font-medium text-foreground mb-1";
const fld = (invalid: boolean) => (invalid ? errInputCls : inputCls);

function formatSSN(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 9);
  if (d.length <= 3) return d;
  if (d.length <= 5) return `${d.slice(0, 3)}-${d.slice(3)}`;
  return `${d.slice(0, 3)}-${d.slice(3, 5)}-${d.slice(5)}`;
}

function formatPhone(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 10);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

function formatDOB(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 8);
  if (d.length <= 2) return d;
  if (d.length <= 4) return `${d.slice(0, 2)}/${d.slice(2)}`;
  return `${d.slice(0, 2)}/${d.slice(2, 4)}/${d.slice(4)}`;
}

function isValidDOB(v: string) {
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(v)) return false;
  const [m, d, y] = v.split("/").map(Number);
  const dt = new Date(y, m - 1, d);
  return dt.getFullYear() === y && dt.getMonth() === m - 1 && dt.getDate() === d;
}

const TOTAL_STEPS = 7;

type OrderModalProps = {
  isOpen: boolean;
  onClose: () => void;
  /** Optional plan pre-selection: internet plan id, or legacy plan name (matched against catalog). */
  selectedPlan?: string;
};

const OrderModal = ({ isOpen, onClose, selectedPlan }: OrderModalProps) => {
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [showAgreement, setShowAgreement] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [mobileSaved, setMobileSaved] = useState(false);
  const [showValidation, setShowValidation] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const sel = typeof selectedPlan === "string" ? selectedPlan : "";
      const selLower = sel.toLowerCase();
      const match =
        INTERNET_PLANS.find((p) => p.id === sel) ||
        INTERNET_PLANS.find((p) => sel && p.name.toLowerCase() === selLower) ||
        INTERNET_PLANS.find((p) => sel && selLower.includes(p.shortName.toLowerCase()));
      setForm({ ...EMPTY_FORM, internetPlanId: match?.id ?? "", addOnIds: ["whole-home-wifi"] });
      setStep(1);
      setSubmitted(false);
      setShowAgreement(false);
      setAgreed(false);
      setErrorMsg("");
      setMobileSaved(false);
      setShowValidation(false);
    }
  }, [isOpen, selectedPlan]);

  const order = useMemo(() => {
    if (!form.internetPlanId) return null;
    return calculateOrder({
      internetPlanId: form.internetPlanId,
      tvPackageId: form.tvPackageId && form.tvPackageId !== "none" ? form.tvPackageId : null,
      addOnIds: form.addOnIds,
    });
  }, [form.internetPlanId, form.tvPackageId, form.addOnIds]);

  const firstMonthCharge = order ? order.monthlyTotal : 0;

  const installDateBounds = useMemo(() => {
    const min = new Date();
    min.setDate(min.getDate() + 2);
    const max = new Date();
    max.setDate(max.getDate() + 16); // 2-day buffer + 14-day window
    const fmt = (d: Date) =>
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    return { min: fmt(min), max: fmt(max) };
  }, []);

  if (!isOpen) return null;

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const toggleAddOn = (id: string) =>
    setForm((prev) => ({
      ...prev,
      addOnIds: prev.addOnIds.includes(id)
        ? prev.addOnIds.filter((a) => a !== id)
        : [...prev.addOnIds, id],
    }));

  const validateStep = (): string => {
    if (step === 1) {
      if (!form.streetAddress.trim() || !form.city.trim() || !form.state || !form.zip.match(/^\d{5}$/))
        return "Please enter a complete service address with a valid 5-digit ZIP code.";
      if (!form.movedInLastYear) return "Please tell us if you moved in the last 12 months.";
      if (form.movedInLastYear === "Yes") {
        if (!form.previousStreetAddress.trim() || !form.previousCity.trim() || !form.previousState || !form.previousZip.match(/^\d{5}$/))
          return "Please enter your complete previous address.";
      }
    }
    if (step === 2) {
      if (!form.firstName.trim() || !form.lastName.trim()) return "First and last name are required.";
      if (!isValidDOB(form.dob)) return "Date of birth is required (MM/DD/YYYY).";
      if (form.ssn.replace(/\D/g, "").length !== 9)
        return "A valid 9-digit SSN is required for a soft credit check.";
      if (!/^\S+@\S+\.\S+$/.test(form.email)) return "Please enter a valid email address.";
      if (form.phone.replace(/\D/g, "").length !== 10) return "Please enter a valid 10-digit phone number.";
    }
    if (step === 3) {
      if (!form.internetPlanId) return "Please select an Optimum Internet plan to continue.";
    }
    if (step === 4) {
      if (!form.tvPackageId) return "Please either pick a TV package or choose 'No TV, thanks'.";
    }
    // Step 5 (Add-Ons) has no required fields.
    if (step === 6) {
      if (!form.preferredInstallDate) return "Please pick a preferred installation date.";
      if (!form.preferredInstallTime) return "Please pick a preferred installation time window.";
    }
    return "";
  };

  const next = () => {
    setShowValidation(true);
    const err = validateStep();
    if (err) {
      setErrorMsg(err);
      return;
    }
    setShowValidation(false);
    setErrorMsg("");
    setStep((s) => (Math.min(s + 1, TOTAL_STEPS) as Step));
  };

  const back = () => {
    setErrorMsg("");
    setShowValidation(false);
    setStep((s) => (Math.max(s - 1, 1) as Step));
  };

  const handleReviewContinue = () => {
    setErrorMsg("");
    setShowAgreement(true);
  };

  const buildPayload = (overrides: Partial<Record<string, string>> = {}) => {
    const o = order!;
    return {
      type: "order",
      internetPlanId: o.internet.id,
      internetPlanName: o.internet.name,
      internetMonthly: String(o.internet.price),
      internetDiscount: String(o.internetDiscount),
      internetNetMonthly: String(o.internetNet),
      tvPackageId: o.tv?.id ?? "",
      tvPackageName: o.tv?.name ?? "",
      tvMonthly: String(o.tvTotal),
      addOns: o.addOns.map((a) => `${a.name} ($${a.price}/mo)`).join("; "),
      addOnIds: o.addOns.map((a) => a.id).join(","),
      addOnMonthly: String(o.addOnTotal),
      monthlyTotal: String(o.monthlyTotal),
      firstMonthCharge: String(o.monthlyTotal),
      firstName: form.firstName,
      lastName: form.lastName,
      dob: form.dob,
      ssn: form.ssn,
      email: form.email,
      phone: form.phone,
      streetAddress: form.streetAddress,
      aptUnit: form.aptUnit,
      city: form.city,
      state: form.state,
      zip: form.zip,
      preferredInstallDate: form.preferredInstallDate,
      preferredInstallTime: form.preferredInstallTime,
      movedInLastYear: form.movedInLastYear,
      previousStreetAddress: form.previousStreetAddress,
      previousAptUnit: form.previousAptUnit,
      previousCity: form.previousCity,
      previousState: form.previousState,
      previousZip: form.previousZip,
      mobileInterest: form.mobileInterest,
      source: typeof window !== "undefined" ? window.location.href : "",
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
      submittedAt: new Date().toISOString(),
      ...overrides,
    };
  };

  const postPayload = async (payload: Record<string, string>) => {
    if (APPS_SCRIPT_URL.includes("REPLACE_ME")) {
      console.warn("APPS_SCRIPT_URL is not configured. Simulating submission.", payload);
      await new Promise((r) => setTimeout(r, 700));
      return;
    }
    // Use GET + query param — Apps Script 302-redirects POST requests, which causes
    // browsers to drop the body and switch to GET, so doPost is never called.
    // Sending data as a URL query param survives the redirect, and doGet reads it.
    const url = `${APPS_SCRIPT_URL}?data=${encodeURIComponent(JSON.stringify(payload))}`;
    await fetch(url, { mode: "no-cors" });
  };

  const submitOrder = async () => {
    if (!agreed) {
      setErrorMsg("You must agree to the first-month pre-authorization before we can schedule installation.");
      return;
    }
    if (!order) {
      setErrorMsg("Please select an Internet plan before submitting.");
      return;
    }
    setSubmitting(true);
    setErrorMsg("");
    try {
      await postPayload(buildPayload());
      setSubmitted(true);
      setShowAgreement(false);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Submission failed. Please try again.";
      setErrorMsg(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const submitMobileInterest = async (interest: "Yes" | "No") => {
    update("mobileInterest", interest);
    if (interest === "No") {
      setMobileSaved(true);
      return;
    }
    try {
      await postPayload({
        type: "mobile-interest",
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        mobileInterest: interest,
        source: typeof window !== "undefined" ? window.location.href : "",
        submittedAt: new Date().toISOString(),
      });
    } catch (e) {
      // non-blocking: still show confirmation
      console.warn("Mobile interest follow-up failed", e);
    }
    setMobileSaved(true);
  };

  const resetAndClose = () => {
    setForm(EMPTY_FORM);
    setStep(1);
    setSubmitted(false);
    setShowAgreement(false);
    setAgreed(false);
    setErrorMsg("");
    setMobileSaved(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Order Optimum Fiber Internet Online"
    >
      <div className="absolute inset-0 bg-foreground/60 backdrop-blur-sm" onClick={resetAndClose} />
      <div className="relative bg-card rounded-2xl shadow-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="hero-gradient rounded-t-2xl p-6 relative">
          <button
            onClick={resetAndClose}
            className="absolute top-4 right-4 text-primary-foreground/70 hover:text-primary-foreground"
            aria-label="Close order form"
          >
            <X className="w-6 h-6" />
          </button>
          <h2 className="text-2xl md:text-3xl font-extrabold text-primary-foreground">
            Order Optimum Fiber Internet
          </h2>
          <p className="text-primary-foreground/80 text-sm mt-1">
            Lock in your 5-year price today. Installation typically scheduled within 3-7 business days.
          </p>

          {!submitted && (
            <div className="mt-5 flex items-center gap-2" aria-label={`Step ${step} of ${TOTAL_STEPS}`}>
              {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map((n) => (
                <div
                  key={n}
                  className={`h-1.5 flex-1 rounded-full ${n <= step ? "bg-teal" : "bg-primary-foreground/20"}`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="p-6">
          {submitted ? (
            <SuccessView
              form={form}
              firstMonth={firstMonthCharge}
              mobileSaved={mobileSaved}
              onAnswerMobile={submitMobileInterest}
              onClose={resetAndClose}
            />
          ) : (
            <>
              {errorMsg && (
                <div className="mb-4 bg-destructive/10 border border-destructive/30 text-destructive text-sm rounded-lg p-3">
                  {errorMsg}
                </div>
              )}

              {step === 1 && (
                <section aria-label="Service installation address">
                  <h3 className="text-lg font-bold text-foreground mb-4">Step 1 — Service Address</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label htmlFor="street" className={labelCls}>Street Address</label>
                      <input id="street" className={fld(showValidation && !form.streetAddress.trim())} value={form.streetAddress} onChange={(e) => update("streetAddress", e.target.value)} required />
                      {showValidation && !form.streetAddress.trim() && <p className="text-xs text-destructive mt-1">Required</p>}
                    </div>
                    <div>
                      <label htmlFor="apt" className={labelCls}>Apt / Unit <span className="text-muted-foreground font-normal">(optional)</span></label>
                      <input id="apt" className={inputCls} value={form.aptUnit} onChange={(e) => update("aptUnit", e.target.value)} />
                    </div>
                    <div>
                      <label htmlFor="city" className={labelCls}>City</label>
                      <input id="city" className={fld(showValidation && !form.city.trim())} value={form.city} onChange={(e) => update("city", e.target.value)} required />
                      {showValidation && !form.city.trim() && <p className="text-xs text-destructive mt-1">Required</p>}
                    </div>
                    <div>
                      <label htmlFor="state" className={labelCls}>State</label>
                      <select id="state" className={fld(showValidation && !form.state)} value={form.state} onChange={(e) => update("state", e.target.value)} required>
                        <option value="">Select…</option>
                        {US_STATES.map((s) => (<option key={s} value={s}>{s}</option>))}
                      </select>
                      {showValidation && !form.state && <p className="text-xs text-destructive mt-1">Required</p>}
                    </div>
                    <div>
                      <label htmlFor="zip" className={labelCls}>ZIP Code</label>
                      <input id="zip" inputMode="numeric" pattern="[0-9]{5}" maxLength={5} className={fld(showValidation && !form.zip.match(/^\d{5}$/))} value={form.zip} onChange={(e) => update("zip", e.target.value.replace(/\D/g, "").slice(0, 5))} required />
                      {showValidation && !form.zip.match(/^\d{5}$/) && <p className="text-xs text-destructive mt-1">5-digit ZIP required</p>}
                    </div>
                  </div>

                  <div className="mt-5">
                    <span className={labelCls}>Have you moved within the last 12 months?</span>
                    <div className="flex gap-3 mt-1">
                      {(["Yes", "No"] as const).map((opt) => (
                        <button key={opt} type="button" onClick={() => update("movedInLastYear", opt)}
                          className={`px-5 py-2 rounded-full border font-medium text-sm ${form.movedInLastYear === opt ? "border-accent bg-accent text-accent-foreground" : "border-border text-foreground"}`}>
                          {opt}
                        </button>
                      ))}
                    </div>
                    {showValidation && !form.movedInLastYear && <p className="text-xs text-destructive mt-1">Please make a selection</p>}
                  </div>

                  {form.movedInLastYear === "Yes" && (
                    <div className="mt-4 border-t border-border pt-4">
                      <p className="text-sm font-semibold text-foreground mb-3">Previous Address</p>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="sm:col-span-2">
                          <label htmlFor="prevStreet" className={labelCls}>Previous Street Address</label>
                          <input id="prevStreet" className={fld(showValidation && !form.previousStreetAddress.trim())} value={form.previousStreetAddress} onChange={(e) => update("previousStreetAddress", e.target.value)} />
                          {showValidation && !form.previousStreetAddress.trim() && <p className="text-xs text-destructive mt-1">Required</p>}
                        </div>
                        <div>
                          <label htmlFor="prevApt" className={labelCls}>Apt / Unit</label>
                          <input id="prevApt" className={inputCls} value={form.previousAptUnit} onChange={(e) => update("previousAptUnit", e.target.value)} />
                        </div>
                        <div>
                          <label htmlFor="prevCity" className={labelCls}>City</label>
                          <input id="prevCity" className={fld(showValidation && !form.previousCity.trim())} value={form.previousCity} onChange={(e) => update("previousCity", e.target.value)} />
                          {showValidation && !form.previousCity.trim() && <p className="text-xs text-destructive mt-1">Required</p>}
                        </div>
                        <div>
                          <label htmlFor="prevState" className={labelCls}>State</label>
                          <select id="prevState" className={fld(showValidation && !form.previousState)} value={form.previousState} onChange={(e) => update("previousState", e.target.value)}>
                            <option value="">Select…</option>
                            {US_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                          </select>
                          {showValidation && !form.previousState && <p className="text-xs text-destructive mt-1">Required</p>}
                        </div>
                        <div>
                          <label htmlFor="prevZip" className={labelCls}>ZIP</label>
                          <input id="prevZip" inputMode="numeric" maxLength={5} className={fld(showValidation && !form.previousZip.match(/^\d{5}$/))} value={form.previousZip} onChange={(e) => update("previousZip", e.target.value.replace(/\D/g, "").slice(0, 5))} />
                          {showValidation && !form.previousZip.match(/^\d{5}$/) && <p className="text-xs text-destructive mt-1">5-digit ZIP required</p>}
                        </div>
                      </div>
                    </div>
                  )}
                </section>
              )}

              {step === 2 && (
                <section aria-label="Your contact information">
                  <h3 className="text-lg font-bold text-foreground mb-4">Step 2 — Contact & Identity</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className={labelCls}>First Name</label>
                      <input id="firstName" className={fld(showValidation && !form.firstName.trim())} value={form.firstName} onChange={(e) => update("firstName", e.target.value)} required />
                      {showValidation && !form.firstName.trim() && <p className="text-xs text-destructive mt-1">Required</p>}
                    </div>
                    <div>
                      <label htmlFor="lastName" className={labelCls}>Last Name</label>
                      <input id="lastName" className={fld(showValidation && !form.lastName.trim())} value={form.lastName} onChange={(e) => update("lastName", e.target.value)} required />
                      {showValidation && !form.lastName.trim() && <p className="text-xs text-destructive mt-1">Required</p>}
                    </div>
                    <div>
                      <label htmlFor="dob" className={labelCls}>Date of Birth</label>
                      <input id="dob" type="text" inputMode="numeric" maxLength={10} placeholder="MM/DD/YYYY" className={fld(showValidation && !isValidDOB(form.dob))} value={form.dob} onChange={(e) => update("dob", formatDOB(e.target.value))} required />
                      {showValidation && !isValidDOB(form.dob) && <p className="text-xs text-destructive mt-1">Enter a valid date (MM/DD/YYYY)</p>}
                    </div>
                    <div>
                      <label htmlFor="ssn" className={labelCls}>
                        Social Security Number <span className="text-muted-foreground font-normal">(soft credit check)</span>
                      </label>
                      <input id="ssn" inputMode="numeric" autoComplete="off" className={fld(showValidation && form.ssn.replace(/\D/g, "").length !== 9)} value={form.ssn} onChange={(e) => update("ssn", formatSSN(e.target.value))} placeholder="XXX-XX-XXXX" required />
                      {showValidation && form.ssn.replace(/\D/g, "").length !== 9 && <p className="text-xs text-destructive mt-1">Enter full 9-digit SSN</p>}
                    </div>
                    <div>
                      <label htmlFor="email" className={labelCls}>Email Address</label>
                      <input id="email" type="email" className={fld(showValidation && !/^\S+@\S+\.\S+$/.test(form.email))} value={form.email} onChange={(e) => update("email", e.target.value)} required />
                      {showValidation && !/^\S+@\S+\.\S+$/.test(form.email) && <p className="text-xs text-destructive mt-1">Enter a valid email address</p>}
                    </div>
                    <div>
                      <label htmlFor="phone" className={labelCls}>Mobile Phone</label>
                      <input id="phone" type="tel" className={fld(showValidation && form.phone.replace(/\D/g, "").length !== 10)} value={form.phone} onChange={(e) => update("phone", formatPhone(e.target.value))} placeholder="(555) 555-5555" required />
                      {showValidation && form.phone.replace(/\D/g, "").length !== 10 && <p className="text-xs text-destructive mt-1">Enter a valid 10-digit phone number</p>}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3 flex items-start gap-1.5">
                    <Lock className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-teal" />
                    Your information is transmitted over a secure connection and used only for identity verification and service setup.
                  </p>
                </section>
              )}

              {step === 3 && (
                <section aria-label="Choose your Optimum Internet plan">
                  <h3 className="text-lg font-bold text-foreground mb-1 flex items-center gap-2">
                    <Wifi className="w-5 h-5 text-accent" /> Step 3 — Choose Your Internet Plan
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Symmetrical fiber speeds. Unlimited data. No contracts. 5-year price guarantee.
                  </p>
                  {showValidation && !form.internetPlanId && (
                    <p className="text-sm text-destructive mb-2">Please select a plan to continue.</p>
                  )}
                  <div className="grid sm:grid-cols-3 gap-3">
                    {INTERNET_PLANS.map((p) => {
                      const active = form.internetPlanId === p.id;
                      return (
                        <button type="button" key={p.id} onClick={() => update("internetPlanId", p.id)}
                          className={`relative text-left border-2 rounded-xl p-4 transition-all ${active ? "border-accent bg-accent/5" : "border-border hover:border-accent/50"}`}
                          aria-pressed={active}>
                          {p.recommended && (
                            <span className="absolute -top-2 right-3 bg-teal text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">Most Popular</span>
                          )}
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-foreground">{p.shortName}</span>
                            {active && <Check className="w-4 h-4 text-accent" />}
                          </div>
                          <div className="text-2xl font-extrabold text-foreground mt-1">
                            ${p.price}<span className="text-sm font-medium text-muted-foreground">/mo</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{p.tagline}</p>
                        </button>
                      );
                    })}
                  </div>
                </section>
              )}

              {step === 4 && (
                <section aria-label="Add Optimum TV (optional)">
                  <h3 className="text-lg font-bold text-foreground mb-1 flex items-center gap-2">
                    <TvIcon className="w-5 h-5 text-accent" /> Step 4 — Add Optimum TV? (Optional)
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Add a TV package and <strong className="text-teal">save ${TV_INTERNET_DISCOUNT}/mo on your Internet</strong>.
                  </p>
                  {showValidation && !form.tvPackageId && (
                    <p className="text-sm text-destructive mb-2">Please make a selection to continue.</p>
                  )}
                  <div className="grid gap-3">
                    {TV_PACKAGES.map((t) => {
                      const active = form.tvPackageId === t.id;
                      return (
                        <button type="button" key={t.id} onClick={() => update("tvPackageId", t.id)}
                          className={`text-left border-2 rounded-xl p-4 transition-all ${active ? "border-accent bg-accent/5" : "border-border hover:border-accent/50"}`}
                          aria-pressed={active}>
                          <div className="flex items-center justify-between gap-2">
                            <div>
                              <div className="font-bold text-foreground">{t.name} <span className="text-muted-foreground font-medium">· {t.channels} channels</span></div>
                              <p className="text-sm text-muted-foreground mt-1">{t.blurb}</p>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <div className="text-xl font-extrabold text-foreground">${t.price}<span className="text-xs font-medium text-muted-foreground">/mo</span></div>
                              {active && <Check className="w-4 h-4 text-accent inline-block mt-1" />}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                    <button type="button" onClick={() => update("tvPackageId", "none")}
                      className={`text-left border-2 rounded-xl p-4 transition-all ${form.tvPackageId === "none" ? "border-accent bg-accent/5" : "border-border hover:border-accent/50"}`}
                      aria-pressed={form.tvPackageId === "none"}>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-foreground">No TV, thanks — Internet only</span>
                        {form.tvPackageId === "none" && <Check className="w-4 h-4 text-accent" />}
                      </div>
                    </button>
                  </div>
                </section>
              )}

              {step === 5 && (
                <section aria-label="Optional add-ons">
                  <h3 className="text-lg font-bold text-foreground mb-1">Step 5 — Add-Ons</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    All optional. <strong>Whole Home WiFi</strong> is pre-selected — uncheck if you don't need it.
                  </p>
                  <div className="space-y-2">
                    {ADD_ONS.map((a) => {
                      const checked = form.addOnIds.includes(a.id);
                      return (
                        <label key={a.id}
                          className={`flex items-center gap-3 border rounded-lg px-3 py-2.5 cursor-pointer transition-colors ${checked ? "border-accent bg-accent/5" : "border-border hover:border-accent/50"}`}>
                          <input type="checkbox" checked={checked} onChange={() => toggleAddOn(a.id)} className="w-4 h-4 accent-accent flex-shrink-0" />
                          <span className="flex-1 font-semibold text-sm text-foreground">{a.name}</span>
                          <span className="text-sm font-bold text-foreground whitespace-nowrap">${a.price}/mo</span>
                        </label>
                      );
                    })}
                  </div>
                </section>
              )}

              {step === 6 && (
                <section aria-label="Installation preferences">
                  <h3 className="text-lg font-bold text-foreground mb-4">Step 6 — Installation Date & Time</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="installDate" className={labelCls}>Preferred Install Date</label>
                      <input id="installDate" type="date" min={installDateBounds.min} max={installDateBounds.max} className={fld(showValidation && !form.preferredInstallDate)} value={form.preferredInstallDate} onChange={(e) => update("preferredInstallDate", e.target.value)} required />
                      {showValidation && !form.preferredInstallDate && <p className="text-xs text-destructive mt-1">Please pick a date</p>}
                    </div>
                    <div>
                      <label htmlFor="installTime" className={labelCls}>Preferred Time Window</label>
                      <select id="installTime" className={fld(showValidation && !form.preferredInstallTime)} value={form.preferredInstallTime} onChange={(e) => update("preferredInstallTime", e.target.value)} required>
                        <option value="">Select…</option>
                        {TIME_WINDOWS.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                      {showValidation && !form.preferredInstallTime && <p className="text-xs text-destructive mt-1">Please select a time window</p>}
                    </div>
                  </div>
                </section>
              )}

              {step === 7 && order && (
                <ReviewView form={form} order={order} />
              )}

              {/* Nav buttons */}
              <div className="flex items-center justify-between mt-6 gap-3">
                <button
                  type="button"
                  onClick={back}
                  disabled={step === 1}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-muted-foreground disabled:opacity-40 hover:text-foreground"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>

                {step < TOTAL_STEPS ? (
                  <button
                    type="button"
                    onClick={next}
                    className="inline-flex items-center gap-1 cta-gradient text-accent-foreground font-bold py-3 px-6 rounded-full hover:opacity-90 transition-opacity"
                  >
                    Continue <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleReviewContinue}
                    className="inline-flex items-center gap-2 cta-gradient text-accent-foreground font-bold py-3 px-6 rounded-full hover:opacity-90 transition-opacity"
                  >
                    <ShieldCheck className="w-4 h-4" /> Review & Authorize Install
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Agreement popup */}
      {showAgreement && !submitted && order && (
        <AgreementPopup
          firstMonth={firstMonthCharge}
          planName={order.internet.name}
          agreed={agreed}
          onToggleAgreed={() => setAgreed((v) => !v)}
          submitting={submitting}
          onCancel={() => setShowAgreement(false)}
          onConfirm={submitOrder}
          errorMsg={errorMsg}
        />
      )}
    </div>
  );
};

type OrderBreakdown = NonNullable<ReturnType<typeof calculateOrder>>;

const ReviewView = ({ form, order }: { form: FormState; order: OrderBreakdown }) => (
  <section aria-label="Review your order">
    <h3 className="text-lg font-bold text-foreground mb-4">Step 7 — Review Your Order</h3>

    <div className="bg-secondary rounded-xl p-4 text-sm space-y-3 mb-4">
      <p className="text-xs uppercase tracking-wide font-bold text-muted-foreground">Monthly Breakdown</p>
      <LineItem label={order.internet.name} value={`$${order.internet.price.toFixed(2)}/mo`} />
      {order.internetDiscount > 0 && (
        <LineItem label="TV bundle discount (Internet)" value={`-$${order.internetDiscount.toFixed(2)}/mo`} highlight />
      )}
      {order.tv && <LineItem label={order.tv.name} value={`$${order.tv.price.toFixed(2)}/mo`} />}
      {order.addOns.map((a) => (
        <LineItem key={a.id} label={a.name} value={`$${a.price.toFixed(2)}/mo`} />
      ))}
      <div className="border-t border-border pt-2 flex justify-between font-extrabold text-foreground text-base">
        <span>Monthly total</span>
        <span>${order.monthlyTotal.toFixed(2)}/mo</span>
      </div>
    </div>

    <div className="bg-secondary rounded-xl p-4 text-sm space-y-2 mb-4">
      <p className="text-xs uppercase tracking-wide font-bold text-muted-foreground">Customer & Install</p>
      <ReviewRow label="Name" value={`${form.firstName} ${form.lastName}`} />
      <ReviewRow label="Email" value={form.email} />
      <ReviewRow label="Phone" value={form.phone} />
      <ReviewRow
        label="Service Address"
        value={`${form.streetAddress}${form.aptUnit ? ` #${form.aptUnit}` : ""}, ${form.city}, ${form.state} ${form.zip}`}
      />
      <ReviewRow label="Install Date" value={form.preferredInstallDate} />
      <ReviewRow label="Install Time" value={form.preferredInstallTime} />
      {form.movedInLastYear === "Yes" && (
        <ReviewRow
          label="Previous Address"
          value={`${form.previousStreetAddress}${form.previousAptUnit ? ` #${form.previousAptUnit}` : ""}, ${form.previousCity}, ${form.previousState} ${form.previousZip}`}
        />
      )}
    </div>

    <div className="rounded-xl border border-teal/40 bg-teal/5 p-4 text-sm">
      <div className="flex items-center gap-2 font-bold text-foreground">
        <Check className="w-4 h-4 text-teal" /> Everything looks good — click below to submit your order.
      </div>
    </div>
  </section>
);

const LineItem = ({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) => (
  <div className={`flex justify-between ${highlight ? "text-teal font-semibold" : "text-foreground"}`}>
    <span>{label}</span>
    <span>{value}</span>
  </div>
);

const ReviewRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-start gap-3">
    <span className="text-muted-foreground w-32 flex-shrink-0">{label}</span>
    <span className="text-foreground font-medium break-words">{value || "—"}</span>
  </div>
);

const SuccessView = ({
  form,
  firstMonth,
  mobileSaved,
  onAnswerMobile,
  onClose,
}: {
  form: FormState;
  firstMonth: number;
  mobileSaved: boolean;
  onAnswerMobile: (v: "Yes" | "No") => void;
  onClose: () => void;
}) => (
  <div className="text-center py-6">
    <div className="w-16 h-16 rounded-full bg-teal/20 flex items-center justify-center mx-auto mb-4">
      <Check className="w-8 h-8 text-teal" />
    </div>
    <h3 className="text-2xl font-extrabold text-foreground mb-2">You're All Set, {form.firstName}!</h3>
    <p className="text-muted-foreground text-sm max-w-md mx-auto">
      Your order has been received. An Optimum agent will call <strong>{form.phone}</strong> within one business hour to confirm your details and lock in your installation on <strong>{form.preferredInstallDate}</strong>.
    </p>
    <p className="text-xs text-muted-foreground mt-3">
      Confirmation sent to {form.email}.
    </p>

    {/* Mobile upsell */}
    <div className="mt-6 mx-auto max-w-md text-left border-2 border-accent/30 bg-accent/5 rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-1">
        <Smartphone className="w-5 h-5 text-accent" />
        <h4 className="font-extrabold text-foreground">One more thing — save on Mobile</h4>
      </div>
      {mobileSaved ? (
        <p className="text-sm text-foreground">
          {form.mobileInterest === "Yes"
            ? "Great — an Optimum Mobile specialist will reach out with your best-fit plan and any line-switch credits you qualify for."
            : "No problem. You can always add Optimum Mobile later from your account."}
        </p>
      ) : (
        <>
          <p className="text-sm text-muted-foreground">
            Optimum Mobile customers save an extra <strong className="text-teal">${MOBILE_INTERNET_DISCOUNT}/mo on Internet</strong>. Plans start at $45/mo for 1 line of Unlimited. Want a specialist to walk through pricing and switching credits?
          </p>
          <div className="flex gap-2 mt-3">
            <button
              type="button"
              onClick={() => onAnswerMobile("Yes")}
              className="flex-1 cta-gradient text-accent-foreground font-bold py-2.5 px-4 rounded-full hover:opacity-90 transition-opacity text-sm"
            >
              Yes, tell me more
            </button>
            <button
              type="button"
              onClick={() => onAnswerMobile("No")}
              className="flex-1 border border-border text-foreground font-semibold py-2.5 px-4 rounded-full hover:bg-secondary text-sm"
            >
              No thanks
            </button>
          </div>
        </>
      )}
    </div>

    <button
      onClick={onClose}
      className={`mt-6 font-bold px-8 py-3 rounded-full transition-opacity ${mobileSaved ? "cta-gradient text-accent-foreground hover:opacity-90 shadow-md" : "text-sm text-muted-foreground hover:text-foreground"}`}
    >
      {mobileSaved ? "Done — Close" : "Close"}
    </button>
  </div>
);

const AgreementPopup = ({
  firstMonth,
  planName,
  agreed,
  onToggleAgreed,
  submitting,
  onCancel,
  onConfirm,
  errorMsg,
}: {
  firstMonth: number;
  planName: string;
  agreed: boolean;
  onToggleAgreed: () => void;
  submitting: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  errorMsg: string;
}) => (
  <div
    className="fixed inset-0 z-[110] flex items-center justify-center p-4"
    role="dialog"
    aria-modal="true"
    aria-labelledby="agreement-title"
  >
    <div className="absolute inset-0 bg-foreground/70 backdrop-blur-sm" />
    <div className="relative bg-card rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden">
      <div className="cta-gradient p-4 text-accent-foreground">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5" />
          <h3 id="agreement-title" className="text-lg font-extrabold">
            One Last Step
          </h3>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-baseline justify-between border-b border-border pb-3 mb-4">
          <div>
            <div className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">Your Plan</div>
            <div className="text-xs text-muted-foreground">{planName}</div>
          </div>
          <div className="text-3xl font-extrabold text-foreground">${firstMonth.toFixed(2)}<span className="text-base font-semibold text-muted-foreground">/mo</span></div>
        </div>

        <p className="text-sm text-muted-foreground mb-3">
          Your first month is due to confirm your order and hold your installation slot. An Optimum agent will call you to collect payment and finalize scheduling.
        </p>

        <label className="flex items-start gap-3 cursor-pointer select-none border border-border rounded-lg p-3 hover:border-accent/50">
          <input type="checkbox" checked={agreed} onChange={onToggleAgreed} className="mt-1 w-4 h-4 accent-accent" />
          <span className="text-sm text-foreground">
            I agree to pay <strong>${firstMonth.toFixed(2)}</strong> for my first month and authorize Optimum to call me to process payment and confirm my installation.
          </span>
        </label>

        {errorMsg && (
          <div className="mt-3 text-sm text-destructive">{errorMsg}</div>
        )}

        <div className="mt-4 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={submitting}
            className="text-sm font-semibold text-muted-foreground hover:text-foreground disabled:opacity-50"
          >
            Back
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={!agreed || submitting}
            className="inline-flex items-center gap-2 cta-gradient text-accent-foreground font-bold py-3 px-6 rounded-full hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Submitting…
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" /> Submit Order
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default OrderModal;
