import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { AuthHero } from "./AuthHero";
import { OtpInput } from "./OtpBtn";

export function SignUpPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [step, setStep] = useState("form"); // "form" | "otp"
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [otp, setOtp] = useState("");

  const setField = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSendOtp = () => {
    if (!form.name || form.phone.length < 10) return;
    setStep("otp");
  };

  const handleVerify = () => {
    if (otp.length < 5) return;
    login({ name: form.name, phone: form.phone, email: form.email, avatar: null });
    navigate("/");
  };

  const handleGoogle = () => {
    login({ name: "Google User", email: "user@gmail.com", avatar: null });
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className="w-full max-w-xl mx-auto">
        <AuthHero />

        {/* ── White card ── */}
        <div className="bg-white mx-4 mt-5 rounded-2xl shadow-lg px-6 pt-6 pb-8">
          {step === "form" && (
            <>
              <h2 className="text-center text-gray-800 font-semibold text-lg mb-1 mt-2">Create Account</h2>
              <p className="text-center text-gray-400 text-sm mb-5">Join Malkein — discover 10,000+ sarees</p>

              <input
                type="text"
                placeholder="Full Name"
                value={form.name}
                onChange={(e) => setField("name", e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#DB0000] focus:ring-2 focus:ring-red-100 transition mb-3"
              />

              <div className="flex gap-2 mb-3">
                <input
                  type="tel"
                  maxLength={10}
                  placeholder="Mobile Number"
                  value={form.phone}
                  onChange={(e) => setField("phone", e.target.value.replace(/\D/, ""))}
                  className="flex-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#DB0000] focus:ring-2 focus:ring-red-100 transition"
                />
                <button
                  onClick={handleSendOtp}
                  className="bg-[#DB0000] hover:bg-red-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition active:scale-95"
                >
                  Get OTP
                </button>
              </div>

              <div className="flex items-center gap-2 my-4">
                <div className="flex-1 h-px bg-gray-100" />
                <span className="text-gray-300 text-xs">or</span>
                <div className="flex-1 h-px bg-gray-100" />
              </div>

              <button
                onClick={handleGoogle}
                className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-lg py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition mb-3"
              >
                <svg width="18" height="18" viewBox="0 0 48 48">
                  <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 3-2.3 5.5-4.8 7.2v6h7.7c4.5-4.1 7-10.2 7-17.2z" />
                  <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.7-6c-2.1 1.4-4.9 2.3-8.2 2.3-6.3 0-11.6-4.2-13.5-9.9H2.6v6.2C6.5 42.5 14.7 48 24 48z" />
                  <path fill="#FBBC05" d="M10.5 28.6c-.5-1.4-.8-3-.8-4.6s.3-3.1.8-4.6v-6.2H2.6C.9 16.8 0 20.3 0 24s.9 7.2 2.6 10.8l7.9-6.2z" />
                  <path fill="#EA4335" d="M24 9.5c3.5 0 6.7 1.2 9.2 3.6l6.8-6.8C35.9 2.4 30.4 0 24 0 14.7 0 6.5 5.5 2.6 13.2l7.9 6.2C12.4 13.7 17.7 9.5 24 9.5z" />
                </svg>
                Continue With Google
              </button>

              <input
                type="email"
                placeholder="User Email ID"
                value={form.email}
                onChange={(e) => setField("email", e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#DB0000] focus:ring-2 focus:ring-red-100 transition"
              />

              <p className="text-center text-xs text-gray-400 mt-5">
                Already have an account?{" "}
                <button onClick={() => navigate("/sign-in")} className="text-[#DB0000] font-medium hover:underline cursor-pointer">
                  Sign In
                </button>
              </p>

              <p className="text-center text-[10px] text-gray-300 mt-2">
                By continuing, I agree to the <span className="text-[#DB0000]">Terms</span>
              </p>
            </>
          )}

          {step === "otp" && (
            <>
              <button onClick={() => setStep("form")} className="text-gray-400 text-sm mb-4 hover:text-gray-600">← Back</button>
              <h2 className="text-center text-gray-800 font-semibold text-lg mb-1">Verify Number</h2>
              <p className="text-center text-gray-400 text-xs mb-6">
                Enter OTP sent to{" "}
                <span className="text-gray-600 font-medium">{form.phone.replace(/(\d{6})(\d{4})/, "XXXXXX$2")}</span>
              </p>

              <OtpInput length={5} value={otp} onChange={setOtp} />

              <p className="text-center text-xs text-gray-400 mt-3 mb-6">
                Resend OTP via{" "}
                <button className="text-[#DB0000] font-medium hover:underline">SMS</button>
              </p>

              <button
                onClick={handleVerify}
                className="w-full bg-[#DB0000] hover:bg-red-700 text-white font-medium py-3 rounded-lg transition active:scale-95"
              >
                Verify & Create Account
              </button>

              <p className="text-center text-[10px] text-gray-300 mt-3">
                By continuing, I agree to the <span className="text-[#DB0000]">Terms</span>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}