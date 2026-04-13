import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { SlidersHorizontal, ChevronDown, X, ArrowRight, Star, ShoppingBag } from "lucide-react";
import BreadCrumb from "../../../components/BreadCrumb";

// ─── Placeholder product generator ──────────────────────────────────────────
// TODO: replace with real API call when backend is ready
// e.g.  const res = await fetch(`/api/products?sub=${sub}`);
//       const products = await res.json();
const UNSPLASH_QUERIES = {
  "Wedding Salwar":       "wedding+salwar+kameez",
  "Festive Salwar":       "festive+salwar+suit",
  "Casual / Office Wear": "casual+salwar+kameez",
  Bridal:                 "bridal+salwar+kameez",
  Bollywood:              "bollywood+salwar+suit",
  Sharara:                "sharara+suit+set",
  Anarkali:               "anarkali+suit",
  Punjabi:                "punjabi+suit",
  Pakistani:              "pakistani+salwar+kameez",
  "Jacket Style":         "jacket+style+kurti+set",
  "Slit Style":           "slit+style+kurti",
  Casual:                 "casual+gown+indian",
  "A-Line Anarkali":      "a-line+anarkali+gown",
  Net:                    "net+gown+indian",
  Chiffon:                "chiffon+gown",
  Festive:                "festive+gown+indian",
  "Casual / Office":      "casual+kurti+women",
  Wedding:                "wedding+kurti",
  "Party Wear":           "party+wear+kurti",
  "A-Line":               "a-line+kurti",
  Cotton:                 "cotton+kurti",
  Rayon:                  "rayon+kurti",
  Satin:                  "satin+kurti",
  Silk:                   "silk+saree",
  Banarsi:                "banarasi+saree",
  Kanjivaram:             "kanjivaram+saree",
  Georgette:              "georgette+saree",
  Paithani:               "paithani+saree",
  Linen:                  "linen+saree",
  Organza:                "organza+saree",
};

function makePlaceholderProducts(sub, count = 12) {
  const q = UNSPLASH_QUERIES[sub] ?? sub.toLowerCase().replace(/ /g, "+");
  const discounts = [null, "10% OFF", "20% OFF", "15% OFF", null];
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `${sub} ${["Premium", "Classic", "Elegant", "Royal"][i % 4]} Collection`,
    price: Math.floor(Math.random() * 3000) + 899,
    discount: discounts[i % 5],
    rating: (3.5 + Math.random() * 1.5).toFixed(1),
    // Two image variants so ImageToggle-style hover swap works
    image1: `https://source.unsplash.com/400x500/?${q}&sig=${i * 7 + sub.length}`,
    image2: `https://source.unsplash.com/400x500/?${q}+fashion&sig=${i * 13 + sub.length}`,
    badge: i === 0 ? "New" : i === 1 ? "Bestseller" : null,
  }));
}

// ─── Helpers ────────────────────────────────────────────────────────────────
function getDiscountedPrice(price, discount) {
  if (!discount) return null;
  const match = discount.match(/(\d+)%/);
  if (!match) return null;
  return Math.round(price * (1 - parseInt(match[1], 10) / 100));
}

// ─── StarRating — exactly matches your ProductsGrid ─────────────────────────
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

// ─── ProductCard — mirrors your ProductsGrid card 1:1 ───────────────────────
function ProductCard({ product }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const [imgErr, setImgErr] = useState(false);
  const discountedPrice = getDiscountedPrice(product.price, product.discount);

  return (
    <div
      className="relative pb-4 cursor-pointer"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      {/* Image card — bg-[#FF00001F] rounded-3xl, same as yours */}
      <div className="bg-[#FF00001F] rounded-3xl overflow-visible relative flex items-end justify-center pt-4 px-4 h-45 md:h-74 group">
        <div className="absolute inset-0 rounded-3xl overflow-hidden">
          {!imgErr ? (
            <img
              src={hovered ? product.image2 : product.image1}
              alt={product.name}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              onError={() => setImgErr(true)}
              className="w-full h-full object-cover transition-opacity duration-300"
            />
          ) : (
            // Fallback when image fails — use your ImageToggle if you prefer:
            // <ImageToggle image1={product.image1} image2={product.image2} />
            <div className="w-full h-full flex items-center justify-center text-5xl bg-red-50">
              💃
            </div>
          )}
        </div>

        {/* New / Bestseller badge */}
        {product.badge && (
          <span className="absolute top-2 left-2 bg-[#DB0000] text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10">
            {product.badge}
          </span>
        )}

        {/* Floating Shop now button — exact copy of yours */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/product/${product.id}`);
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
            <ShoppingBag size={15} className="text-white" />
          </span>
          Shop now
        </button>
      </div>

      {/* Product info — mt-8 layout same as yours */}
      <div className="mt-8 text-md">
        <p className="font-medium text-gray-900 text-md md:text-lg truncate">{product.name}</p>
        <div className="flex justify-between items-center mt-1 flex-wrap gap-1">
          <span className="flex items-center gap-1.5">
            {discountedPrice ? (
              <>
                <span className="text-gray-400 line-through text-sm md:text-base">
                  ₹{product.price.toLocaleString("en-IN")}
                </span>
                <span className="font-semibold text-gray-900 text-md md:text-lg">
                  ₹{discountedPrice.toLocaleString("en-IN")}
                </span>
              </>
            ) : (
              <span className="font-semibold text-gray-900 text-md md:text-lg">
                ₹{product.price.toLocaleString("en-IN")}
              </span>
            )}
          </span>
          <StarRating rating={product.rating} />
        </div>
      </div>
    </div>
  );
}

// ─── Sort options ────────────────────────────────────────────────────────────
const SORT_OPTIONS = [
  { label: "Recommended", value: "default" },
  { label: "Price: Low to High", value: "asc" },
  { label: "Price: High to Low", value: "desc" },
  { label: "Top Rated", value: "rating" },
];

// ─── Overview mode — 4-product preview per subcategory ──────────────────────
function OverviewMode({ data, navigate }) {
  return (
    <div className="space-y-10">
      {data.sub.map((sub) => {
        const products = makePlaceholderProducts(sub, 4);
        return (
          <section key={sub}>
            {/* Section header */}
            <div className="flex items-center justify-between mb-6 px-3 md:px-6">
              <div className="flex items-center gap-2">
                <div className="w-1 h-5 rounded-full" style={{ background: data.color }} />
                <h2 className="text-base font-extrabold text-gray-800">{sub}</h2>
              </div>
              <button
                onClick={() => navigate(`/women/${data.slug}/${encodeURIComponent(sub)}`)}
                className="flex items-center gap-1 text-xs font-bold hover:underline"
                style={{ color: data.color }}
              >
                View All <ArrowRight size={13} />
              </button>
            </div>

            {/* Grid — px-3 md:px-6 matches your ProductsGrid wrapper */}
            <div className="px-3 md:px-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}

// ─── Filtered mode — full grid for one subcategory + sort/filter ─────────────
function FilteredMode({ data, activeSub, navigate }) {
  const [sort, setSort] = useState("default");
  const [filterOpen, setFilterOpen] = useState(false);
  const [maxPrice, setMaxPrice] = useState(10000);

  const allProducts = useMemo(() => makePlaceholderProducts(activeSub, 16), [activeSub]);

  const products = useMemo(() => {
    let list = allProducts.filter((p) => p.price <= maxPrice);
    if (sort === "asc")    list.sort((a, b) => a.price - b.price);
    if (sort === "desc")   list.sort((a, b) => b.price - a.price);
    if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [allProducts, sort, maxPrice]);

  return (
    <>
      {/* Controls */}
      <div className="flex items-center justify-between mb-4 px-3 md:px-6">
        <p className="text-xs text-gray-400">{products.length} products</p>
        <div className="flex items-center gap-2">
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="appearance-none text-xs font-semibold border border-gray-200 rounded-full px-3 py-1.5 pr-7 focus:outline-none focus:border-red-400 cursor-pointer"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
          </div>
          <button
            onClick={() => setFilterOpen((o) => !o)}
            className="flex items-center gap-1.5 text-xs font-semibold border border-gray-200 rounded-full px-3 py-1.5 hover:border-red-400 transition-colors"
          >
            <SlidersHorizontal size={13} /> Filter
          </button>
        </div>
      </div>

      {/* Filter panel */}
      {filterOpen && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-4 mx-3 md:mx-6 flex flex-wrap gap-6 items-end">
          <div className="flex-1 min-w-45">
            <p className="text-xs font-bold text-gray-700 mb-2">
              Max Price: ₹{maxPrice.toLocaleString("en-IN")}
            </p>
            <input
              type="range" min={500} max={10000} step={100}
              value={maxPrice}
              onChange={(e) => setMaxPrice(+e.target.value)}
              className="w-full accent-red-600"
            />
          </div>
          <button
            onClick={() => setMaxPrice(10000)}
            className="flex items-center gap-1 text-xs text-red-600 font-semibold hover:underline"
          >
            <X size={11} /> Reset
          </button>
        </div>
      )}

      {/* Grid */}
      <div className="px-3 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </>
  );
}

// ─── Main export ─────────────────────────────────────────────────────────────
export default function SubCategoryLayout({ data, activeSub, breadcrumb }) {
  const navigate = useNavigate();

  const fullBreadcrumb = activeSub
    ? [...breadcrumb, { label: activeSub }]
    : breadcrumb;

  return (
    <main className="max-w-7xl mx-auto py-5 font-['Baloo_Bhai_2']">

      {/* Breadcrumb + header + pill tabs */}
      <div className="px-3 md:px-6 mb-5">
        <BreadCrumb crumbs={fullBreadcrumb} />

        <div className="flex items-baseline gap-3 mt-3 mb-4">
          <h1 className="text-xl font-extrabold text-gray-900">
            {activeSub ?? data.title}
          </h1>
          {!activeSub && (
            <span className="text-sm text-gray-400">{data.sub.length} categories</span>
          )}
        </div>

        {/* Pill tabs — always visible, active pill uses category color */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => navigate(`/women/${data.slug}`)}
            className="text-xs font-semibold rounded-full px-3 py-1 border-2 transition-all"
            style={
              !activeSub
                ? { background: data.color, borderColor: data.color, color: "#fff" }
                : { borderColor: "#e5e7eb", color: "#4b5563" }
            }
          >
            All
          </button>
          {data.sub.map((sub) => (
            <button
              key={sub}
              onClick={() => navigate(`/women/${data.slug}/${encodeURIComponent(sub)}`)}
              className="text-xs font-semibold rounded-full px-3 py-1 border-2 transition-all"
              style={
                sub === activeSub
                  ? { background: data.color, borderColor: data.color, color: "#fff" }
                  : { borderColor: "#e5e7eb", color: "#4b5563" }
              }
            >
              {sub}
            </button>
          ))}
        </div>
      </div>

      {/* Switch between overview and filtered grid */}
      {activeSub ? (
        <FilteredMode data={data} activeSub={activeSub} navigate={navigate} />
      ) : (
        <OverviewMode data={data} navigate={navigate} />
      )}
    </main>
  );
}