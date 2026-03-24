import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MapPin, Package, Clock, ChevronRight, CheckCircle, Truck, Shield } from "lucide-react";
import Navbar from "../Home/Navbar";
import { ImageToggle } from "../../components/ImageToggle";

const DELIVERY_OPTIONS = [
  {
    id: "standard",
    label: "Standard Delivery",
    days: "5–7 Business Days",
    price: 0,
    icon: Truck,
  },
  {
    id: "express",
    label: "Express Delivery",
    days: "2–3 Business Days",
    price: 99,
    icon: Clock,
  },
];

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // ── Normalise incoming state ──────────────────────────────────
  // fromCart  → { cartItems: [...], subtotal, fromCart: true }
  // buyNow    → { product, selectedSize, selectedColor }
  const { cartItems, subtotal: cartSubtotal, fromCart, product, selectedSize, selectedColor } =
    location.state || {};

  // Build a unified items array used for rendering & totals
  const items = fromCart
    ? cartItems.map((item) => ({
        name: item.name,
        category: item.category,
        image1: item.image1,
        price: item.price,
        quantity: item.quantity,
        selectedSize: item.selectedSize,
        selectedColor: item.selectedColor, // hex string
        coupon: item.coupon,
      }))
    : [
        {
          name: product?.name,
          category: product?.category,
          image1: product?.image1,
          price: product?.price,
          quantity: 1,
          selectedSize,
          selectedColor: product?.colors?.[selectedColor], // hex from index
          coupon: product?.coupon,
        },
      ];

  const baseTotal = fromCart
    ? cartSubtotal
    : product?.price ?? 0;

  // For buy-now we apply a 10% coupon discount; cart items are already at their prices
  const discountAmount = fromCart ? 0 : Math.round(baseTotal * 0.1);

  // ── Component state ───────────────────────────────────────────
  const [step, setStep] = useState(1);
  const [delivery, setDelivery] = useState("standard");
  const [placed, setPlaced] = useState(false);

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    pincode: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
  });

  const [errors, setErrors] = useState({});

  const chosenDelivery = DELIVERY_OPTIONS.find((d) => d.id === delivery);
  const deliveryCharge = chosenDelivery.price;
  const total = baseTotal - discountAmount + deliveryCharge;

  const deliveryDays = delivery === "express" ? 3 : 7;
  const estimatedDate = new Date();
  estimatedDate.setDate(estimatedDate.getDate() + deliveryDays);
  const dateStr = estimatedDate.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  // ── Validation ────────────────────────────────────────────────
  function validate() {
    const e = {};
    if (!address.fullName.trim()) e.fullName = "Required";
    if (!/^\d{10}$/.test(address.phone)) e.phone = "Enter a valid 10-digit number";
    if (!/^\d{6}$/.test(address.pincode)) e.pincode = "Enter a valid 6-digit pincode";
    if (!address.line1.trim()) e.line1 = "Required";
    if (!address.city.trim()) e.city = "Required";
    if (!address.state.trim()) e.state = "Required";
    return e;
  }

  function handleContinue() {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setErrors({});
    setStep(2);
  }

  const inputClass = (field) =>
    `w-full px-4 py-3 rounded-xl border text-sm text-gray-800 outline-none transition-all focus:border-[#CC0000] focus:ring-2 focus:ring-red-100 ${
      errors[field] ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50"
    }`;

  // ── Order Placed ──────────────────────────────────────────────
  if (placed) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6 animate-bounce">
            <CheckCircle size={44} className="text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Placed!</h1>
          <p className="text-gray-500 mb-1">
            Thank you, <span className="font-medium text-gray-700">{address.fullName}</span>!
          </p>
          <p className="text-gray-500 mb-8">
            Your order will arrive by{" "}
            <span className="font-semibold text-[#CC0000]">{dateStr}</span>.
          </p>

          {/* Show all ordered items */}
          <div className="bg-[#fce8e8] rounded-2xl px-6 py-5 max-w-sm w-full text-left mb-8">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-3 font-semibold">
              Order Summary
            </p>
            <div className="flex flex-col gap-4">
              {items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="w-16 h-20 bg-[#fce8e8] rounded-xl overflow-hidden shrink-0">
  <ImageToggle image1={item.image1} image2={item.image2} />
</div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 text-sm leading-snug">{item.name}</p>
                    <p className="text-xs text-gray-500">
                      Size: {item.selectedSize}
                      {item.quantity > 1 && ` · Qty: ${item.quantity}`}
                    </p>
                    <p className="text-sm font-bold text-[#CC0000] mt-0.5">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-red-200 mt-4 pt-3 flex justify-between font-bold text-gray-900 text-sm">
              <span>Total Paid</span>
              <span>₹{total.toLocaleString("en-IN")}</span>
            </div>
          </div>

          <button
            onClick={() => navigate("/")}
            className="px-7 py-3 rounded-xl bg-[#CC0000] text-white font-semibold hover:bg-[#aa0000] transition-all shadow-md shadow-red-200"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  // ── Main Checkout ─────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Navbar />

      {/* Stepper */}
      <div className="max-w-3xl mx-auto px-4 pt-6 pb-2">
        <div className="flex items-center gap-2 text-sm font-medium">
          <span className={step >= 1 ? "text-[#CC0000]" : "text-gray-400"}>1. Delivery Address</span>
          <ChevronRight size={14} className="text-gray-300" />
          <span className={step >= 2 ? "text-[#CC0000]" : "text-gray-400"}>2. Review & Pay</span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-4 flex flex-col lg:flex-row gap-6">

        {/* LEFT COLUMN */}
        <div className="flex-1 flex flex-col gap-5">

          {/* ── STEP 1: Address ── */}
          {step === 1 && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-2 mb-5">
                <MapPin size={18} className="text-[#CC0000]" />
                <h2 className="text-base font-bold text-gray-900">Delivery Address</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Full Name</label>
                  <input className={inputClass("fullName")} placeholder="Mansi Jaiswal"
                    value={address.fullName} onChange={(e) => setAddress({ ...address, fullName: e.target.value })} />
                  {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Phone</label>
                  <input className={inputClass("phone")} placeholder="9876543210" maxLength={10}
                    value={address.phone} onChange={(e) => setAddress({ ...address, phone: e.target.value.replace(/\D/, "") })} />
                  {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Pincode</label>
                  <input className={inputClass("pincode")} placeholder="110001" maxLength={6}
                    value={address.pincode} onChange={(e) => setAddress({ ...address, pincode: e.target.value.replace(/\D/, "") })} />
                  {errors.pincode && <p className="text-xs text-red-500 mt-1">{errors.pincode}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Address Line 1</label>
                  <input className={inputClass("line1")} placeholder="House / Flat No., Building, Street"
                    value={address.line1} onChange={(e) => setAddress({ ...address, line1: e.target.value })} />
                  {errors.line1 && <p className="text-xs text-red-500 mt-1">{errors.line1}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">
                    Address Line 2 <span className="text-gray-400 normal-case font-normal">(optional)</span>
                  </label>
                  <input className={inputClass("line2")} placeholder="Landmark, Area"
                    value={address.line2} onChange={(e) => setAddress({ ...address, line2: e.target.value })} />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">City</label>
                  <input className={inputClass("city")} placeholder="New Delhi"
                    value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} />
                  {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">State</label>
                  <input className={inputClass("state")} placeholder="Delhi"
                    value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })} />
                  {errors.state && <p className="text-xs text-red-500 mt-1">{errors.state}</p>}
                </div>
              </div>

              {/* Delivery Options */}
              <div className="mt-6">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Delivery Speed</p>
                <div className="flex flex-col gap-3">
                  {DELIVERY_OPTIONS.map((opt) => {
                    const Icon = opt.icon;
                    const active = delivery === opt.id;
                    return (
                      <button key={opt.id} onClick={() => setDelivery(opt.id)}
                        className={`flex items-center gap-4 px-4 py-3.5 rounded-xl border-2 text-left transition-all ${
                          active ? "border-[#CC0000] bg-red-50" : "border-gray-200 bg-white hover:border-gray-300"
                        }`}
                      >
                        <Icon size={18} className={active ? "text-[#CC0000]" : "text-gray-400"} />
                        <div className="flex-1">
                          <p className={`text-sm font-semibold ${active ? "text-[#CC0000]" : "text-gray-700"}`}>{opt.label}</p>
                          <p className="text-xs text-gray-400">{opt.days}</p>
                        </div>
                        <p className={`text-sm font-bold ${active ? "text-[#CC0000]" : "text-gray-500"}`}>
                          {opt.price === 0 ? "FREE" : `₹${opt.price}`}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <button onClick={handleContinue}
                className="mt-6 w-full py-4 rounded-xl bg-[#CC0000] text-white font-semibold text-base hover:bg-[#aa0000] transition-all shadow-md shadow-red-200 active:scale-[0.98]"
              >
                Continue to Review →
              </button>
            </div>
          )}

          {/* ── STEP 2: Review & Confirm ── */}
          {step === 2 && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-2 mb-5">
                <MapPin size={18} className="text-[#CC0000]" />
                <h2 className="text-base font-bold text-gray-900">Delivering To</h2>
                <button onClick={() => setStep(1)} className="ml-auto text-xs text-[#CC0000] underline font-medium">
                  Edit
                </button>
              </div>

              <div className="bg-gray-50 rounded-xl px-4 py-4 text-sm text-gray-700 leading-relaxed">
                <p className="font-semibold text-gray-900">{address.fullName} · {address.phone}</p>
                <p>{address.line1}{address.line2 ? `, ${address.line2}` : ""}</p>
                <p>{address.city}, {address.state} – {address.pincode}</p>
              </div>

              <div className="mt-4 flex items-center gap-3 px-4 py-3 bg-green-50 rounded-xl border border-green-100">
                <Truck size={16} className="text-green-600 shrink-0" />
                <p className="text-sm text-green-700 font-medium">
                  {chosenDelivery.label} · Estimated by <span className="font-bold">{dateStr}</span>
                </p>
              </div>

              {/* Payment */}
              <div className="mt-6">
                <div className="flex items-center gap-2 mb-3">
                  <Shield size={16} className="text-[#CC0000]" />
                  <p className="text-sm font-bold text-gray-900">Payment</p>
                </div>
                <div className="flex flex-col gap-2">
                  {["UPI / GPay / PhonePe", "Credit / Debit Card", "Cash on Delivery"].map((m) => (
                    <button key={m}
                      className="flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 border-gray-200 hover:border-[#CC0000] text-sm text-gray-700 font-medium text-left transition-all"
                    >
                      <span className="w-2 h-2 rounded-full bg-gray-300 shrink-0" />
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              <button onClick={() => setPlaced(true)}
                className="mt-6 w-full py-4 rounded-xl bg-[#CC0000] text-white font-bold text-base hover:bg-[#aa0000] transition-all shadow-md shadow-red-200 active:scale-[0.98]"
              >
                Place Order · ₹{total.toLocaleString("en-IN")}
              </button>

              <p className="text-xs text-gray-400 text-center mt-3 flex items-center justify-center gap-1">
                <Shield size={12} /> 100% Secure Checkout
              </p>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN – Order Summary */}
        <div className="lg:w-72 shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sticky top-20">
            <div className="flex items-center gap-2 mb-4">
              <Package size={16} className="text-[#CC0000]" />
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Order Summary</h2>
            </div>

            {/* Product list */}
            <div className="flex flex-col gap-4 mb-5">
              {items.map((item, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="w-16 h-20 bg-[#fce8e8] rounded-xl overflow-hidden shrink-0">
                    <img
                      src={item.image1}
                      alt={item.name}
                      className="w-full h-full object-cover object-top"
                      onError={(e) => { e.target.style.display = "none"; }}
                    />
                  </div>
                  <div className="flex flex-col justify-center gap-1">
                    <p className="text-sm font-semibold text-gray-900 leading-snug">{item.name}</p>
                    <p className="text-xs text-gray-400">{item.category}</p>
                    <div className="flex gap-2 text-xs text-gray-500 flex-wrap">
                      <span>Size: <strong>{item.selectedSize}</strong></span>
                      {item.selectedColor && (
                        <span className="flex items-center gap-1">
                          Color:{" "}
                          <span
                            className="w-3 h-3 rounded-full inline-block border border-gray-300"
                            style={{ backgroundColor: item.selectedColor }}
                          />
                        </span>
                      )}
                      {item.quantity > 1 && <span>Qty: <strong>{item.quantity}</strong></span>}
                    </div>
                    <p className="text-xs font-bold text-gray-800">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Price Breakdown */}
            <div className="border-t border-dashed border-gray-200 pt-4 flex flex-col gap-2.5 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{baseTotal.toLocaleString("en-IN")}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-green-600 font-medium">
                  <span>Coupon ({items[0]?.coupon})</span>
                  <span>− ₹{discountAmount.toLocaleString("en-IN")}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-600">
                <span>Delivery</span>
                <span>
                  {deliveryCharge === 0
                    ? <span className="text-green-600 font-medium">FREE</span>
                    : `₹${deliveryCharge}`}
                </span>
              </div>
              <div className="flex justify-between font-bold text-gray-900 text-base border-t border-gray-200 pt-3 mt-1">
                <span>Total</span>
                <span>₹{total.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <p className="text-xs text-gray-400 mt-3 text-center">Inclusive of all taxes</p>
          </div>
        </div>
      </div>
    </div>
  );
}