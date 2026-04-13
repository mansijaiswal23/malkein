import { useNavigate } from "react-router-dom";
import { WOMEN_MENU } from "../WomenMegaMenu";
import BreadCrumb from "../../../components/BreadCrumb";

// Cover images per category (swap with real ones when backend ready)
const COVER_IMAGES = {
  "salwar-kameez": "https://source.unsplash.com/600x700/?salwar+kameez+indian+woman&sig=10",
  gown:            "https://source.unsplash.com/600x700/?indian+gown+woman&sig=20",
  kurti:           "https://source.unsplash.com/600x700/?kurti+indian+woman&sig=30",
  saree:           "https://source.unsplash.com/600x700/?saree+indian+woman&sig=40",
};

export default function index() {
  const navigate = useNavigate();

  return (
    <main className="max-w-7xl mx-auto px-4 py-5 font-['Baloo_Bhai_2']">
      <BreadCrumb
        crumbs={[{ label: "Home", path: "/" }, { label: "Women" }]}
      />

      <div className="flex items-baseline gap-3 mt-3 mb-5">
        <h1 className="text-2xl font-extrabold text-gray-900">Women's Collection</h1>
        <span className="text-sm text-gray-400 font-medium">Explore by category</span>
      </div>

      {/* Category tiles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {WOMEN_MENU.map((cat) => (
          <div
            key={cat.slug}
            onClick={() => navigate(`/women/${cat.slug}`)}
            className="group relative rounded-2xl overflow-hidden cursor-pointer shadow hover:shadow-xl transition-all duration-300 aspect-3/4"
          >
            <img
              src={COVER_IMAGES[cat.slug]}
              alt={cat.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
            {/* Colored top accent on hover */}
            <div
              className="absolute top-0 left-0 right-0 h-1 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
              style={{ background: cat.color }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h2 className="text-white text-lg font-extrabold leading-tight">{cat.title}</h2>
              <p className="text-gray-300 text-xs mt-0.5">{cat.sub.length} styles</p>
            </div>
          </div>
        ))}
      </div>

      {/* Subcategory quick-links */}
      <div className="space-y-4">
        <h2 className="text-base font-extrabold text-gray-800">Browse Subcategories</h2>
        {WOMEN_MENU.map((cat) => (
          <div key={cat.slug}>
            <p
              className="text-xs font-bold uppercase tracking-wider mb-1.5"
              style={{ color: cat.color }}
            >
              {cat.title}
            </p>
            <div className="flex flex-wrap gap-2">
              {cat.sub.map((sub) => (
                <button
                  key={sub}
                  onClick={() => navigate(`/women/${cat.slug}/${encodeURIComponent(sub)}`)}
                  className="text-xs border border-gray-200 rounded-full px-3 py-1 text-gray-600 hover:text-red-600 hover:border-red-400 hover:bg-red-50 transition-all"
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
