import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const categories = [
  { label: "All",                    sectionKey: null },
  { label: "Designer Wear",          sectionKey: "designer-wear" },
  { label: "Under ₹5K",             sectionKey: "under-5k" },
  { label: "Bridal Lehenga",         sectionKey: "bridal-lehenga" },
  { label: "Chandni Chowk Bridals",  sectionKey: "chandni-chowk-bridal" },
];

export default function CategoryFilters() {
  const [active, setActive] = useState(0);
  const navigate   = useNavigate();
  const location   = useLocation();

  const handleClick = (index, sectionKey) => {
    setActive(index);

    const scrollToSection = (key) => {
      if (!key) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      const el = document.getElementById(`section-${key}`);
      if (el) {
        const offset = 80; // navbar height buffer
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    };

    // If already on /category page, just scroll
    if (location.pathname === "/category") {
      scrollToSection(sectionKey);
    } else {
      // Navigate to /category then scroll after page loads
      navigate("/category");
      setTimeout(() => scrollToSection(sectionKey), 300);
    }
  };

  return (
    <div className="px-4 md:px-6 mt-4">
      <h2 className="text-xl md:text-2xl font-semibold mb-4">Categories</h2>

      <div className="flex gap-2 md:gap-3 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat, index) => (
          <button
            key={index}
            onClick={() => handleClick(index, cat.sectionKey)}
            className={`
              group whitespace-nowrap px-3 md:px-4 py-1.5 md:py-2 rounded-full border text-sm
              font-medium transition-all duration-200
              ${active === index
                ? "bg-red-600 text-white border-red-600 shadow-md"
                : "bg-white text-gray-700 border-gray-300 hover:bg-red-600 hover:text-white hover:border-red-600 hover:shadow-md cursor-pointer"
              }
            `}
          >
            {cat.label}
            {index !== 0 && (
              <span
                className={`ml-1.5 transition-colors duration-200 ${
                  active === index ? "text-white" : "text-red-500 group-hover:text-white"
                }`}
              >
                →
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}