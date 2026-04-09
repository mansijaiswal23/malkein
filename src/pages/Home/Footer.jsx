import { useState } from "react";
import Logo from "../../../src/assets/images/malkein.png"

/* ── Icons ─────────────────────────────────────────────────────────────── */
const IcoShield  = () => <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
const IcoRefresh = () => <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>;
const IcoBox     = () => <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>;
const IcoLock    = () => <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;
const IcoPhone   = () => <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.42 2 2 0 0 1 3.6 1.24h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.83a16 16 0 0 0 6 6l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z"/></svg>;
const IcoGlobe   = () => <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;
const IcoCheck   = () => <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>;
const IcoArrow   = () => <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;
const IcoInsta   = () => <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>;
const IcoFb      = () => <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>;
const IcoPin     = () => <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>;
const IcoYt      = () => <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg>;
const IcoApple   = () => <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>;
const IcoGplay   = () => <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M3.18 23.76c.31.17.67.22 1.05.14l12.76-7.37-2.74-2.74-11.07 9.97zm-1.73-20.3a1.95 1.95 0 0 0-.05.49v19.1c0 .17.02.33.05.49L14.1 12 1.45 3.46zM20.67 10.6L17.8 8.97l-3.05 3.03 3.05 3.05 2.9-1.67c.83-.48.83-1.3-.03-1.78zM4.23.1C3.85.02 3.49.07 3.18.24L14.1 12 16.84 9.26 4.23.1z"/></svg>;

/* ── Data ───────────────────────────────────────────────────────────────── */
const STRIP = [
  { icon: <IcoBox />,     label: "Free Delivery on ₹999+" },
  { icon: <IcoRefresh />, label: "Easy 30-Day Returns" },
  { icon: <IcoShield />,  label: "100% Authentic Designs" },
  { icon: <IcoLock />,    label: "Secure Payments" },
];

const COLS = [
  {
    title: "Collections",
    links: [
      { label: "Bridal Lehenga" },
      { label: "Party Wear",      badge: "New" },
      { label: "Anarkali Suits" },
      { label: "Sharara Sets" },
      { label: "Indo-Western",    badge: "New" },
      { label: "Designer Sarees" },
      { label: "Festive Wear" },
      { label: "Palazzo Sets" },
    ],
  },
  {
    title: "Help & Info",
    links: [
      { label: "Track My Order" },
      { label: "Returns & Refunds" },
      { label: "Size Guide" },
      { label: "Custom Stitching" },
      { label: "Bulk / Wholesale" },
      { label: "Gift Cards" },
      { label: "Blog & Style Tips" },
      { label: "Contact Us" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us" },
      { label: "Press & Media" },
      { label: "Sustainability" },
      { label: "Affiliate Program" },
      { label: "Sell on Malkein" },
      { label: "Investor Relations" },
    ],
  },
];

const FEATURES = [
  { icon: <IcoBox />,     title: "Free Delivery", sub: "Orders ₹999+" },
  { icon: <IcoRefresh />, title: "Easy Returns",  sub: "30-day policy" },
  { icon: <IcoLock />,    title: "Safe Checkout", sub: "256-bit SSL" },
  { icon: <IcoPhone />,   title: "24/7 Support",  sub: "Chat & Call" },
];

const PAYMENTS  = ["VISA", "Mastercard", "UPI", "Paytm", "PhonePe", "Net Banking", "EMI", "COD"];
const SOCIAL    = [
  { icon: <IcoInsta />, label: "Instagram" },
  { icon: <IcoPin />,   label: "Pinterest" },
  { icon: <IcoFb />,    label: "Facebook" },
  { icon: <IcoYt />,    label: "YouTube" },
];
const BOT_LINKS = ["Privacy Policy", "Terms of Use", "Cookie Settings", "Accessibility", "Sitemap"];

/* ── Footer Component ────────────────────────────────────────────────────── */
export default function Footer() {
  const [email, setEmail]           = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="bg-gray-100 text-gray-700 text-sm font-sans w-full mt-8 md:mt-12 lg:mt-16">

      {/* ── Trust Strip ── */}
      <div className="bg-red-600 flex flex-wrap justify-center items-center gap-x-4 sm:gap-x-6 md:gap-x-8 gap-y-2 sm:gap-y-1 px-4 sm:px-6 py-2 md:py-3">
        {STRIP.map(({ icon, label }) => (
          <span key={label} className="flex items-center gap-1 sm:gap-1.5 text-[9px] sm:text-[10px] md:text-[11px] font-semibold tracking-widest uppercase text-white">
            {icon} {label}
          </span>
        ))}
      </div>

      {/* ── Main Grid ── */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.8fr_1fr_1fr_1fr_1.2fr] divide-y md:divide-y-0 md:divide-x divide-gray-200 border-b border-gray-200 px-4 sm:px-6 lg:px-10 py-8 md:py-10 gap-y-8 md:gap-y-0">

        {/* Brand column */}
        <div className="pb-8 md:pb-0 md:col-span-2 lg:col-span-1 lg:pr-10">
          <img
  src={Logo}
  alt="Malkein Logo"
  className="h-6 sm:h-7 md:h-8 w-auto mb-2 md:mb-0.5"
/>
          <p className="text-[9px] sm:text-[10px] tracking-[0.14em] uppercase text-red-600 font-semibold mb-3 md:mb-4">Tradition, Reimagined</p>
          <p className="text-[12px] sm:text-[13px] leading-relaxed text-gray-500 mb-4 md:mb-5 max-w-xs">
            India's most-loved destination for bridal &amp; festive lehenga cholis — curated from Jaipur, Surat &amp; Lucknow's finest artisans.
          </p>

          {/* Social icons */}
          <div className="flex gap-2 md:gap-2.5 mb-4 md:mb-5">
            {SOCIAL.map(({ icon, label }) => (
              <button
                key={label}
                aria-label={label}
                className="w-7 h-7 md:w-8 md:h-8 rounded-full border border-gray-300 bg-white text-gray-500 flex items-center justify-center hover:bg-red-600 hover:border-red-600 hover:text-white transition-all duration-200"
              >
                {icon}
              </button>
            ))}
          </div>

          {/* App store badges */}
          <div className="flex gap-2 flex-wrap">
            {[
              { icon: <IcoApple />, small: "Download on the", big: "App Store" },
              { icon: <IcoGplay />, small: "Get it on",       big: "Google Play" },
            ].map(({ icon, small, big }) => (
              <button
                key={big}
                className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 hover:border-red-500 hover:shadow-sm transition-all text-left text-[11px] md:text-[12px]"
              >
                <span className="text-gray-700 shrink-0">{icon}</span>
                <span>
                  <span className="block text-[8px] sm:text-[9px] text-gray-400 tracking-wide">{small}</span>
                  <span className="block text-[10px] sm:text-[12px] font-semibold text-gray-800">{big}</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {COLS.map(({ title, links }) => (
          <div key={title} className="pt-8 md:pt-0 md:col-span-1 lg:px-8 first:pt-0 md:first:pt-0">
            <h3 className="text-[11px] sm:text-[12px] font-bold text-gray-900 uppercase tracking-widest mb-3 md:mb-4 pb-2 border-b-2 border-red-600 inline-block">
              {title}
            </h3>
            <ul className="space-y-2 md:space-y-2.5">
              {links.map(({ label, badge }) => (
                <li key={label}>
                  <a href="#" className="text-[11px] sm:text-[12px] md:text-[12.5px] text-gray-500 hover:text-red-600 transition-colors duration-150">
                    {label}
                    {badge && (
                      <span className="ml-2 text-[8px] sm:text-[9px] font-bold uppercase tracking-wider bg-red-600 text-white px-1.5 py-0.5 rounded align-middle">
                        {badge}
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Newsletter column */}
        <div className="pt-8 md:pt-0 md:col-span-2 lg:col-span-1 lg:pl-8">
          <h3 className="text-[11px] sm:text-[12px] font-bold text-gray-900 uppercase tracking-widest mb-3 md:mb-4 pb-2 border-b-2 border-red-600 inline-block">
            Stay in the Loop
          </h3>
          <p className="text-[11px] sm:text-[12px] text-gray-500 mb-3 md:mb-3 leading-relaxed">
            Get new arrivals &amp; exclusive deals straight to your inbox.
          </p>

          {subscribed ? (
            <div className="flex items-center gap-2 text-[11px] sm:text-[12px] text-green-600 font-semibold mb-4 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
              <IcoCheck /> You're subscribed — thank you!
            </div>
          ) : (
            <div className="flex mb-4 shadow-sm flex-col sm:flex-row gap-0">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === "Enter" && email.trim() && setSubscribed(true)}
                placeholder="Your email address"
                className="flex-1 min-w-0 border border-gray-300 sm:border-r-0 rounded-lg sm:rounded-r-none px-3 py-2 sm:py-2.5 text-[12px] text-gray-800 placeholder-gray-400 outline-none focus:border-red-500 bg-white transition-colors"
              />
              <button
                onClick={() => email.trim() && setSubscribed(true)}
                className="bg-red-600 hover:bg-red-700 text-white text-[10px] sm:text-[11px] font-bold tracking-widest uppercase px-3 py-2 sm:py-2.5 rounded-lg sm:rounded-l-none transition-colors flex items-center justify-center gap-1 border border-red-600 mt-2 sm:mt-0"
              >
                Join <IcoArrow />
              </button>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {[
              { icon: <IcoShield />, text: "Secure" },
              { icon: <IcoCheck />,  text: "No Spam" },
              { icon: <IcoLock />,   text: "Early Access" },
            ].map(({ icon, text }) => (
              <span key={text} className="flex items-center gap-1 text-[10px] sm:text-[10.5px] text-gray-500 border border-gray-200 rounded px-2 py-1 bg-white">
                <span className="text-red-600">{icon}</span> {text}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Payments + Features ── */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row flex-wrap items-start gap-6 md:gap-8 px-4 sm:px-6 lg:px-10 py-6 md:py-8 border-b border-gray-200">
        <div className="flex-1 min-w-full sm:min-w-75">
          <p className="text-[9px] sm:text-[10px] tracking-widest uppercase text-gray-400 font-semibold mb-2.5 md:mb-3">Accepted Payments</p>
          <div className="flex flex-wrap gap-2">
            {PAYMENTS.map(p => (
              <span key={p} className="bg-white border border-gray-200 rounded px-2 sm:px-2.5 py-1 sm:py-1.5 text-[10px] sm:text-[11px] font-semibold text-gray-600 shadow-sm">
                {p}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-4 md:gap-6 justify-start md:justify-end flex-1 w-full md:w-auto">
          {FEATURES.map(({ icon, title, sub }) => (
            <div key={title} className="flex items-start sm:items-center gap-2 sm:gap-2.5">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-red-50 border border-red-100 flex items-center justify-center text-red-600 shrink-0 text-sm sm:text-base">
                {icon}
              </div>
              <div>
                <span className="block text-[11px] sm:text-[12px] font-semibold text-gray-800">{title}</span>
                <span className="block text-[9px] sm:text-[10.5px] text-gray-400">{sub}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 lg:px-10 py-3 md:py-4">
        <p className="text-[10px] sm:text-[11.5px] text-gray-400 order-3 md:order-1 w-full md:w-auto text-center md:text-left">
          © 2025 <span className="text-gray-600 font-medium">Malkein Pvt. Ltd.</span> — All rights reserved.&nbsp;&nbsp;GST: 09ABCDE1234F1Z5
        </p>
        <div className="flex flex-wrap gap-2 md:gap-4 justify-center md:justify-start order-1 md:order-2 flex-1 md:flex-none">
          {BOT_LINKS.map(l => (
            <a key={l} href="#" className="text-[9px] sm:text-[11.5px] text-gray-400 hover:text-red-600 transition-colors whitespace-nowrap">{l}</a>
          ))}
        </div>
        <button className="flex items-center gap-1.5 text-[9px] sm:text-[11.5px] text-gray-400 hover:text-red-600 transition-colors order-2 md:order-3">
          <IcoGlobe /> <span className="hidden sm:inline">English / हिंदी</span><span className="sm:hidden">EN/हिंदी</span>
        </button>
      </div>

    </footer>
  );
}