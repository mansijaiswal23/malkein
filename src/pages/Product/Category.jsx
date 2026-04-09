import { useNavigate } from 'react-router-dom';
import { Star, Plus, Sparkles, IndianRupee, Heart, MapPin } from 'lucide-react';
import products from "../../data/products.json";
import Navbar from '../Home/Navbar';
import Footer from '../Home/Footer';

// ── helpers ──────────────────────────────────────────────────────────────────

function StarRating({ rating }) {
  const value = parseFloat(rating);
  return (
    <span className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={11}
          fill={i < Math.round(value) ? "#DB0000" : "none"}
          color="#DB0000"
        />
      ))}
      <span className="ml-1 text-xs font-medium text-gray-800">{rating}</span>
    </span>
  );
}

function getDiscountedPrice(price, discount) {
  if (!discount) return null;
  const match = discount.match(/(\d+)%/);
  if (!match) return null;
  const pct = parseInt(match[1], 10);
  return Math.round(price * (1 - pct / 100));
}

function ProductCard({ item }) {
  const navigate = useNavigate();
  const discountedPrice = getDiscountedPrice(item.price, item.discount);

  return (
    <div
      className="relative pb-4 cursor-pointer"
      onClick={() => navigate(`/product/${item.id}`)}
    >
      {/* Image Card */}
      <div className="bg-[#FF00001F] rounded-3xl overflow-visible relative flex items-end justify-center pt-4 px-4 h-44 md:h-64 group">
        <div className="absolute inset-0 rounded-3xl overflow-hidden">
          {/* First Image */}
          <img
            src={item.image1}
            alt={item.name}
            className="w-full h-full object-contain object-bottom absolute inset-0 transition-all duration-500 group-hover:opacity-0 group-hover:scale-95"
          />
          {/* Second Image */}
          {item.image2 && (
            <img
              src={item.image2}
              alt={item.name}
              className="w-full h-full object-contain object-bottom absolute inset-0 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-95"
            />
          )}
        </div>

        {/* Discount badge */}
        {item.discount && (
          <span className="absolute top-3 left-3 bg-[#DB0000] text-white text-[10px] font-semibold px-2 py-0.5 rounded-full z-10 shadow-sm">
            {item.discount}
          </span>
        )}

        {/* Buy now button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/product/${item.id}`);
          }}
          className="
            absolute -bottom-4 left-1/2 -translate-x-1/2
            flex items-center gap-2
            bg-[#D9D9D9] text-black text-xs font-medium
            pl-1 pr-4 py-1 rounded-[7.08px]
            shadow-md z-10 whitespace-nowrap
            transition-all duration-200
            hover:bg-[#DB0000] hover:text-white hover:shadow-lg hover:scale-105
            active:scale-95
          "
        >
          <span className="w-6 h-6 rounded-full bg-black flex items-center justify-center shrink-0">
            <Plus size={15} className="fill-white text-white" />
          </span>
          Buy now
        </button>
      </div>

      {/* Product Info */}
      <div className="mt-8 text-md">
        <p className="font-medium text-gray-900 text-md md:text-lg truncate">{item.name}</p>
        <div className="flex justify-between items-center mt-1 flex-wrap gap-1">
          {/* Price block */}
          <span className="flex items-center gap-1.5">
            {discountedPrice ? (
              <>
                <span className="text-gray-400 line-through text-sm md:text-base">
                  ₹{item.price.toLocaleString("en-IN")}
                </span>
                <span className="font-semibold text-gray-900 text-md md:text-lg">
                  ₹{discountedPrice.toLocaleString("en-IN")}
                </span>
              </>
            ) : (
              <span className="font-semibold text-gray-900 text-md md:text-lg">
                ₹{item.price.toLocaleString("en-IN")}
              </span>
            )}
          </span>
          <StarRating rating={item.rating} />
        </div>
      </div>
    </div>
  );
}

// ── section component ─────────────────────────────────────────────────────────

function CategorySection({ title, subtitle, icon: Icon, accentColor, items ,sectionKey }) {
  return (
    <section id={`section-${sectionKey}`} className="mb-14"  scroll-mt-24>
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6 px-3 md:px-6">
        {/* Decorative left bar */}
        <div
          className="w-1 h-10 rounded-full shrink-0"
          style={{ background: accentColor }}
        />

        <div>
          <div className="flex items-center gap-2">
            <Icon size={18} style={{ color: accentColor }} />
            <h2
              className="text-lg md:text-2xl font-bold tracking-tight"
              style={{
                fontFamily: "'Georgia', 'Times New Roman', serif",
                color: "#1a1a1a",
              }}
            >
              {title}
            </h2>
          </div>
          {subtitle && (
            <p className="text-xs text-gray-500 mt-0.5 ml-6">{subtitle}</p>
          )}
        </div>

        {/* Decorative line */}
        <div
          className="flex-1 h-px ml-2"
          style={{
            background: `linear-gradient(to right, ${accentColor}55, transparent)`,
          }}
        />
      </div>

      {/* Product Grid */}
      <div className="px-3 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {items.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── category definitions ──────────────────────────────────────────────────────

const CATEGORIES = [
  {
    title: "Designer Wear",
    sectionKey: "designer-wear",
    subtitle: "Crafted for those who wear art",
    icon: Sparkles,
    accentColor: "#DB0000",
  },
  {
    title: "Under ₹5K",
    sectionKey: "under-5k",
    subtitle: "Style that doesn't break the bank",
    icon: IndianRupee,
    accentColor: "#7C3AED",
  },
  {
    title: "Bridal Lehenga",
    sectionKey: "bridal-lehenga",
    subtitle: "For the most beautiful day of your life",
    icon: Heart,
    accentColor: "#C2185B",
  },
  {
    title: "Chandni Chowk Bridal",
    sectionKey: "chandni-chowk-bridal",
    subtitle: "Old Delhi's finest — timeless & royal",
    icon: MapPin,
    accentColor: "#B8860B",
  },
];

// ── page ──────────────────────────────────────────────────────────────────────

export default function Category() {
  return (
    <>
      <Navbar />
      <div className="py-8 bg-white min-h-screen">
        {/* Page Title */}
        <div className="px-3 md:px-6 mb-10">
          <h1
            className="text-2xl md:text-4xl font-bold text-[#1a1a1a]"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
          >
            Shop by Category
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Discover curated collections for every occasion
          </p>
          {/* Red underline accent */}
          <div className="mt-3 w-16 h-1 rounded-full bg-[#DB0000]" />
        </div>

        {/* Render each category section */}
        {CATEGORIES.map((cat) => {
          const items = products.filter((p) => p.section === cat.sectionKey);
          if (!items.length) return null;
          return (
            <CategorySection
              key={cat.title}
              title={cat.title}
              subtitle={cat.subtitle}
              icon={cat.icon}
              accentColor={cat.accentColor}
              items={items}
              sectionKey={cat.sectionKey}   // ← add this line
            />
          );
        })}
      </div>
      <Footer />
    </>
  );
}