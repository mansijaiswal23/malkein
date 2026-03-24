import logo from "../../../src/assets/images/malkein-w.png";
import { useNavigate } from "react-router-dom";

const Sparkle = ({ className = "" }) => (
  <svg className={className} width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path d="M14 0L15.5 12.5L28 14L15.5 15.5L14 28L12.5 15.5L0 14L12.5 12.5L14 0Z" fill="white" fillOpacity="0.9" />
  </svg>
);

export function AuthHero() {
  const navigate = useNavigate();

  return (
    <div
      className="relative w-full h-[55vh] rounded-b-[40px] overflow-hidden flex flex-col items-center justify-center"
      style={{ background: "linear-gradient(200deg, #E60606 50%, #F4F4F4 100%)" }}
    >
      {/* Skip */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-5 right-5 text-white text-sm font-medium opacity-90 hover:opacity-100"
      >
        Skip
      </button>

      {/* Sparkles */}
      <Sparkle className="absolute top-10 left-8 opacity-80" />
      <Sparkle className="absolute top-16 right-12 opacity-50 scale-50" />

      {/* Logo */}
      <img src={logo} alt="Malkein" className="h-16 w-auto drop-shadow-lg" />
      <p className="text-white/80 text-xs mt-1 tracking-widest uppercase">13-Day Easy Return Policy</p>
    </div>
  );
}