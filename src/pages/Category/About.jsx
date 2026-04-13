import { useState, useEffect } from "react";
import Navbar from "../Home/Navbar"
import Footer from "../Home/Footer"

// Google Font import via style tag
const fontStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Baloo+Bhai+2:wght@400;500;600;700;800&display=swap');
  * { font-family: 'Baloo Bhai 2', cursive; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(40px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes floatPetal {
    0%   { transform: translateY(0px) rotate(0deg); opacity: 0.8; }
    50%  { transform: translateY(-18px) rotate(8deg); opacity: 1; }
    100% { transform: translateY(0px) rotate(0deg); opacity: 0.8; }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.85); }
    to   { opacity: 1; transform: scale(1); }
  }
  @keyframes slideLeft {
    from { opacity: 0; transform: translateX(-50px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes slideRight {
    from { opacity: 0; transform: translateX(50px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  .animate-fade-up   { animation: fadeUp 0.8s ease forwards; }
  .animate-scale-in  { animation: scaleIn 0.7s ease forwards; }
  .animate-slide-left  { animation: slideLeft 0.8s ease forwards; }
  .animate-slide-right { animation: slideRight 0.8s ease forwards; }
  .float-petal { animation: floatPetal 3.5s ease-in-out infinite; }

  .shimmer-text {
    background: linear-gradient(90deg, #dc2626, #fbbf24, #dc2626, #fbbf24, #dc2626);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 3s linear infinite;
  }

  .card-hover {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  .card-hover:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 40px rgba(220, 38, 38, 0.18);
  }

  .btn-ripple {
    position: relative;
    overflow: hidden;
  }
  .btn-ripple::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(255,255,255,0.15);
    opacity: 0;
    transition: opacity 0.3s;
  }
  .btn-ripple:hover::after { opacity: 1; }

  .border-pattern {
    background-image: repeating-linear-gradient(
      45deg,
      #dc2626 0px, #dc2626 2px,
      transparent 2px, transparent 12px
    );
  }

  @keyframes weaveThread {
  0% { stroke-dashoffset: 120; opacity: 0; }
  50% { opacity: 1; }
  100% { stroke-dashoffset: 0; opacity: 1; }
}

@keyframes fabricWave {
  0% { transform: perspective(600px) rotateX(0deg); }
  50% { transform: perspective(600px) rotateX(6deg); }
  100% { transform: perspective(600px) rotateX(0deg); }
}

@keyframes silkShimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

/* THREAD SVG animation */
.thread-path {
  stroke-dasharray: 120;
  stroke-dashoffset: 120;
}

.card-hover:hover .thread-path {
  animation: weaveThread 1.2s ease forwards;
}

/* FABRIC WAVE */
.fabric-hover:hover {
  animation: fabricWave 0.6s ease;
}

/* SILK SHIMMER OVERLAY */
.silk-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    120deg,
    transparent 30%,
    rgba(255,255,255,0.25),
    transparent 70%
  );
  background-size: 200% 100%;
  opacity: 0;
  transition: opacity 0.3s;
}

.card-hover:hover .silk-overlay {
  opacity: 1;
  animation: silkShimmer 1.5s linear;
}
`;

// ─── Decorative SVG Motifs ────────────────────────────────────────────────────
const Paisley = ({ className = "" }) => (
    <svg viewBox="0 0 80 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="40" cy="50" rx="18" ry="26" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M40 24 Q55 10 58 30 Q62 50 40 56" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <circle cx="40" cy="24" r="3" fill="currentColor" opacity="0.6" />
        <path d="M30 45 Q38 35 48 45" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5" />
    </svg>
);

const DiamondDivider = () => (
    <div className="flex items-center justify-center gap-3 my-4">
        <div className="h-px w-16 bg-red-300" />
        <svg viewBox="0 0 20 20" className="w-4 h-4 text-red-600" fill="currentColor">
            <path d="M10 0 L20 10 L10 20 L0 10 Z" />
        </svg>
        <div className="h-px w-16 bg-red-300" />
    </div>
);

// ─── Data ─────────────────────────────────────────────────────────────────────
const stats = [
    { value: "12+", label: "Years of Craftsmanship" },
    { value: "5000+", label: "Happy Customers" },
    { value: "200+", label: "Unique Designs" },
    { value: "15+", label: "Cities Delivered" },
];

const values = [
    {
        icon: "🪡",
        title: "Handcrafted Excellence",
        desc: "Every thread is woven with love and precision by skilled artisans carrying generations of craft.",
    },
    {
        icon: "🌸",
        title: "Feminine Grace",
        desc: "Our designs celebrate the strength and elegance of every woman who wears Malkein.",
    },
    {
        icon: "🎨",
        title: "Vibrant Heritage",
        desc: "Rich colours, traditional motifs and modern silhouettes united in one soulful collection.",
    },
    {
        icon: "💎",
        title: "Premium Quality",
        desc: "Only the finest silks, chiffons and georgettes are chosen to drape you in luxury.",
    },
];



// ─── Floating petals ──────────────────────────────────────────────────────────
const petals = [
    { top: "8%", left: "5%", delay: "0s", size: "w-6 h-6", opacity: "opacity-30" },
    { top: "15%", left: "90%", delay: "0.8s", size: "w-4 h-4", opacity: "opacity-20" },
    { top: "60%", left: "3%", delay: "1.2s", size: "w-5 h-5", opacity: "opacity-25" },
    { top: "72%", left: "92%", delay: "0.4s", size: "w-7 h-7", opacity: "opacity-20" },
    { top: "40%", left: "95%", delay: "1.8s", size: "w-4 h-4", opacity: "opacity-30" },
];

// ─── Main Component ───────────────────────────────────────────────────────────
export default function About() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setVisible(true), 100);
        return () => clearTimeout(t);
    }, []);

    return (
        <>
            <Navbar />
            <style>{fontStyle}</style>

            <div className="min-h-screen bg-red-50 overflow-x-hidden relative">

                {/* Floating decorative petals */}
                {petals.map((p, i) => (
                    <Paisley
                        key={i}
                        className={`absolute ${p.size} ${p.opacity} text-red-400 float-petal pointer-events-none`}
                        style={{ top: p.top, left: p.left, animationDelay: p.delay }}
                    />
                ))}


                {/* ── HERO ─────────────────────────────────────────────────────────── */}
                <section className="relative bg-linear-to-br from-red-700 via-red-600 to-rose-700 py-10 sm:py-14 lg:py-30 overflow-hidden">
                    {/* Background geometric ornament */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/30 translate-x-1/2 -translate-y-1/3" />
                        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-white/20 -translate-x-1/3 translate-y-1/3" />
                        {/* diagonal lines */}
                        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                            {[...Array(12)].map((_, i) => (
                                <line key={i} x1={`${i * 10}%`} y1="0" x2={`${i * 10 + 15}%`} y2="100%" stroke="white" strokeWidth="0.5" opacity="0.3" />
                            ))}
                        </svg>
                    </div>

                    <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
                        <p className={`text-red-200 text-sm sm:text-base font-semibold tracking-[0.25em] uppercase mb-3 ${visible ? "animate-fade-up" : "opacity-0"}`}
                            style={{ animationDelay: "0.1s" }}>
                            ✦ Our Story ✦
                        </p>
                        <h1 className={`text-white font-extrabold text-4xl sm:text-6xl lg:text-7xl leading-tight mb-5 ${visible ? "animate-fade-up" : "opacity-0"}`}
                            style={{ animationDelay: "0.25s" }}>
                            About <span className="text-yellow-300">Malkein</span>
                        </h1>
                        <DiamondDivider />
                        <p className={`text-red-100 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mt-4 ${visible ? "animate-fade-up" : "opacity-0"}`}
                            style={{ animationDelay: "0.4s" }}>
                            Where tradition meets elegance — dressing every woman like a queen in hand-crafted lehengas, chunnis & traditional Indian wear.
                        </p>

                    </div>
                </section>

                {/* ── BRAND STRIP ───────────────────────────────────────────────────── */}
                <div className="bg-white border-y border-red-100 py-3 overflow-hidden">
                    <div className="flex gap-12 items-center animate-[marquee_18s_linear_infinite] whitespace-nowrap">
                        {["Lehenga Choli", "Chunni Dupatta", "Anarkali Suits", "Sarees", "Ghagra", "Sharara Sets", "Palazzo Kurta"].concat(
                            ["Lehenga Choli", "Chunni Dupatta", "Anarkali Suits", "Sarees", "Ghagra", "Sharara Sets", "Palazzo Kurta"]
                        ).map((t, i) => (
                            <span key={i} className="text-red-500 font-semibold text-sm sm:text-base flex items-center gap-3">
                                <span className="text-red-300 text-xs">✦</span>{t}
                            </span>
                        ))}
                    </div>
                    <style>{`
            @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
          `}</style>
                </div>

                {/* ── STORY SECTION ─────────────────────────────────────────────────── */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                        {/* Image mock */}
                        <div className={`relative ${visible ? "animate-slide-left" : "opacity-0"}`} style={{ animationDelay: "0.2s" }}>
                            <div className=" rounded-2xl overflow-hidden shadow-2xl h-100 sm:h-125">
                                {/* Actual Image */}
                                <img
                                    src="https://images.pexels.com/photos/35276608/pexels-photo-35276608.jpeg"
                                    alt="Traditional Indian Wear"
                                    className="w-full h-full object-cover"
                                />
                                {/* Pattern overlay */}
                                <div className="absolute inset-0 opacity-10 border-pattern" />

                            </div>
                            {/* Floating badge */}
                            <div className="absolute -bottom-5 -right-3 sm:-right-6 bg-red-600 text-white rounded-2xl px-5 py-3 shadow-xl">
                                <p className="font-extrabold text-2xl sm:text-3xl leading-none">12+</p>
                                <p className="text-red-200 text-xs font-medium mt-0.5">Years of Trust</p>
                            </div>
                        </div>

                        {/* Text */}
                        <div className={`${visible ? "animate-slide-right" : "opacity-0"}`} style={{ animationDelay: "0.3s" }}>
                            <span className="bg-red-100 text-red-600 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">Our Journey</span>
                            <h2 className="text-red-800 font-extrabold text-2xl sm:text-3xl lg:text-4xl mt-4 leading-tight">
                                Born from a <span className="shimmer-text">love of tradition</span>
                            </h2>
                            <DiamondDivider />
                            <div className="space-y-4 text-red-700 text-base sm:text-lg leading-relaxed mt-4">
                                <p>
                                    Malkein was born in 2012 from a single vision — to give every Indian woman the joy of wearing something truly extraordinary. Our founder Priya Sharma started with a small boutique in Jaipur, hand-picking fabrics from local weavers.
                                </p>
                                <p>
                                    The name <span className="font-bold text-red-600">"Malkein"</span> means queen in Punjabi — because every woman who steps into our store deserves to feel like royalty. Our designs blend classical Mughal embroidery patterns with contemporary fits.
                                </p>
                                <p>
                                    From delicate gota-patti lehengas to vivid bandhani chunnis, each piece is an act of devotion to the craft and to you.
                                </p>
                            </div>
                            <a href="#" className="mt-8 inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3.5 rounded-full shadow-lg transition-all btn-ripple">
                                Explore Collection
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </section>

                {/* ── STATS ─────────────────────────────────────────────────────────── */}
                <section className="bg-linear-to-r from-red-600 to-rose-600 py-4 sm:py-6">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                        {stats.map((s, i) => (
                            <div key={i} className="text-center" style={{ animationDelay: `${i * 0.1}s` }}>
                                <p className="text-white font-extrabold text-4xl sm:text-5xl">{s.value}</p>
                                <p className="text-red-200 text-sm sm:text-base font-medium mt-1">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── VALUES ────────────────────────────────────────────────────────── */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
                    <div className="text-center mb-12">
                        <span className="bg-red-100 text-red-600 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">What We Stand For</span>
                        <h2 className="text-red-800 font-extrabold text-3xl sm:text-4xl lg:text-5xl mt-4">Our Core Values</h2>
                        <DiamondDivider />
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((v, i) => (
                            <div key={i} className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-red-100 card-hover text-center relative overflow-hidden">
                                {/* top red bar */}
                                <div className="absolute top-0 left-0 right-0 h-1 bg-red-600 rounded-t-3xl" />
                                <div className="text-5xl mb-4">{v.icon}</div>
                                <h3 className="text-red-700 font-bold text-lg mb-2">{v.title}</h3>
                                <p className="text-red-500 text-sm leading-relaxed">{v.desc}</p>
                                <Paisley className="absolute bottom-2 right-2 w-10 h-10 text-red-100" />
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── PROCESS ───────────────────────────────────────────────────────── */}
                <section className="bg-white border-y border-red-100 py-6 sm:py-12">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6">
                        <div className="text-center mb-12">
                            <span className="bg-red-100 text-red-600 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">How It Works</span>
                            <h2 className="text-red-800 font-extrabold text-3xl sm:text-4xl lg:text-5xl mt-4">From Loom to You</h2>
                            <DiamondDivider />
                        </div>
                        <div className="grid sm:grid-cols-3 gap-8 relative">
                            {/* connector line */}
                            <div className="hidden sm:block absolute top-10 left-1/6 right-1/6 h-0.5 bg-red-200 z-0" />
                            {[
                                { step: "01", title: "Fabric Selection", desc: "We source premium silks, georgettes and chiffons directly from weavers.", icon: <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m240-522-40 22q-14 8-30 4t-24-18L66-654q-8-14-4-30t18-24l230-132h70q9 0 14.5 5.5T400-820v20q0 33 23.5 56.5T480-720q33 0 56.5-23.5T560-800v-20q0-9 5.5-14.5T580-840h70l230 132q14 8 18 24t-4 30l-80 140q-8 14-23.5 17.5T760-501l-40-20v361q0 17-11.5 28.5T680-120H280q-17 0-28.5-11.5T240-160v-362Zm80-134v456h320v-456l124 68 42-70-172-100q-15 51-56.5 84.5T480-640q-56 0-97.5-33.5T326-758L154-658l42 70 124-68Zm160 177Z"/></svg> },
                                { step: "02", title: "Artisan Crafting", desc: "Skilled karigars embroider each design with traditional hand techniques.", icon: <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M760-120 480-400l-94 94q8 15 11 32t3 34q0 66-47 113T240-80q-66 0-113-47T80-240q0-66 47-113t113-47q17 0 34 3t32 11l94-94-94-94q-15 8-32 11t-34 3q-66 0-113-47T80-720q0-66 47-113t113-47q66 0 113 47t47 113q0 17-3 34t-11 32l494 494v40H760ZM600-520l-80-80 240-240h120v40L600-520ZM296.5-663.5Q320-687 320-720t-23.5-56.5Q273-800 240-800t-56.5 23.5Q160-753 160-720t23.5 56.5Q207-640 240-640t56.5-23.5ZM494-466q6-6 6-14t-6-14q-6-6-14-6t-14 6q-6 6-6 14t6 14q6 6 14 6t14-6ZM296.5-183.5Q320-207 320-240t-23.5-56.5Q273-320 240-320t-56.5 23.5Q160-273 160-240t23.5 56.5Q207-160 240-160t56.5-23.5Z"/></svg> },
                                { step: "03", title: "Your Doorstep", desc: "Wrapped in heritage packaging and delivered with love across India.", icon: <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M440-183v-274L200-596v274l240 139Zm80 0 240-139v-274L520-457v274Zm-80 92L160-252q-19-11-29.5-29T120-321v-318q0-22 10.5-40t29.5-29l280-161q19-11 40-11t40 11l280 161q19 11 29.5 29t10.5 40v318q0 22-10.5 40T800-252L520-91q-19 11-40 11t-40-11Zm200-528 77-44-237-137-78 45 238 136Zm-160 93 78-45-237-137-78 45 237 137Z"/></svg> },
                            ].map((p, i) => (
                                <div key={i} className="relative z-10 flex flex-col items-center text-center">
                                    <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center text-3xl shadow-lg mb-4">
                                        {p.icon}
                                    </div>
                                    <span className="text-red-300 font-extrabold text-xs tracking-widest">{p.step}</span>
                                    <h3 className="text-red-800 font-bold text-lg mt-1 mb-2">{p.title}</h3>
                                    <p className="text-red-500 text-sm leading-relaxed">{p.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>


                {/* ── CTA ───────────────────────────────────────────────────────────── */}
                <section className="bg-red-600 py-8 sm:py-10 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="absolute rounded-full bg-white"
                                style={{ width: `${60 + i * 20}px`, height: `${60 + i * 20}px`, top: `${Math.random() * 80}%`, left: `${i * 13}%`, opacity: 0.3 }} />
                        ))}
                    </div>
                    <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
                        <h2 className="text-white font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight mb-4">
                            Ready to feel like a <span className="text-yellow-300">Malkein?</span>
                        </h2>
                        <p className="text-red-200 text-base sm:text-lg mb-8">
                            Browse our latest collection and find the perfect outfit for your next celebration.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href="#" className="bg-white text-red-600 font-bold px-8 py-3.5 rounded-full hover:bg-red-50 transition-colors shadow-lg btn-ripple">
                                Shop Collection
                            </a>
                            <a href="#" className="border-2 border-white text-white font-bold px-8 py-3.5 rounded-full hover:bg-white hover:text-red-600 transition-colors btn-ripple">
                                Contact Us
                            </a>
                        </div>
                    </div>
                </section>


                <Footer />
            </div>
        </>
    );
}