import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

// ── Women mega-menu data ───────────────────────────────────────────────────
export const WOMEN_MENU = [
  {
    title: "Salwar Kameez",
    color: "#DB0000",
    sub: [
      "Wedding Salwar",
      "Festive Salwar",
      "Casual / Office Wear",
      "Bridal",
      "Bollywood",
      "Sharara",
      "Anarkali",
      "Punjabi",
      "Pakistani",
      "Jacket Style",
      "Slit Style",
    ],
  },
  {
    title: "Gown",
    color: "#C2185B",
    sub: ["Casual", "A-Line Anarkali", "Net", "Chiffon", "Silk", "Festive"],
  },
  {
    title: "Kurti",
    color: "#7C3AED",
    sub: [
      "Casual / Office",
      "Wedding",
      "Party Wear",
      "A-Line",
      "Anarkali",
      "Cotton",
      "Rayon",
      "Satin",
      "Silk",
    ],
  },
  {
    title: "Saree",
    color: "#B8860B",
    sub: [
      "Banarsi",
      "Kanjivaram",
      "Georgette",
      "Paithani",
      "Cotton",
      "Linen",
      "Organza",
      "Silk",
      "Chiffon",
    ],
  },
];

// ── WomenMegaMenu Component ────────────────────────────────────────────────
export default function WomenMegaMenu({ onClose }) {
  const navigate = useNavigate();

  const handleSubClick = (category, sub) => {
    onClose();
    navigate(
      `/women?category=${encodeURIComponent(category)}&sub=${encodeURIComponent(sub)}`
    );
  };

  const handleCategoryClick = (category) => {
    onClose();
    navigate(`/women?category=${encodeURIComponent(category)}`);
  };

  return (
    /*
     * FIX 1 — FLICKER:
     *   `pt-2` adds an invisible hover-bridge between the trigger button and
     *   the visible panel. Without this, the small gap between them causes the
     *   parent's onMouseLeave to fire when the cursor crosses it, collapsing
     *   the menu. The padding keeps the cursor "inside" the wrapper the whole
     *   time so the menu stays open.
     *
     * FIX 2 — RESPONSIVENESS:
     *   Width uses `min(780px, 96vw)` so on smaller viewports the panel
     *   shrinks to fit without overflowing. Padding and font-sizes use
     *   CSS clamp() so the 4-column layout stays intact at any width.
     */
    <div
      className="absolute z-50 pt-2"
      style={{
        left: "50%",
        transform: "translateX(-50%)",
        top: "100%",
        width: "min(580px, 96vw)",
      }}
    >
      {/* Visible panel */}
      <div className="bg-white shadow-2xl border border-gray-100 rounded-lg overflow-hidden">
        {/* Accent bar */}
        <div className="h-1 bg-linear-to-r from-[#DB0000] via-[#7C3AED] to-[#B8860B]" />

        {/* Always 4 cols — fluid padding + font sizes */}
        <div className="grid grid-cols-4 divide-x divide-gray-100">
          {WOMEN_MENU.map((col) => (
            <div key={col.title} style={{ padding: "clamp(8px, 2vw, 20px)" }}>
              {/* Category heading */}
              <button
                onClick={() => handleCategoryClick(col.title)}
                className="flex items-center gap-1 mb-2 group w-full text-left"
              >
                <span
                  className="font-bold tracking-wide uppercase leading-tight"
                  style={{ color: col.color, fontSize: "clamp(9px, 1.2vw, 13px)" }}
                >
                  {col.title}
                </span>
                <ChevronRight
                  size={11}
                  style={{ color: col.color }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0 -translate-x-1 group-hover:translate-x-0 duration-200"
                />
              </button>

              {/* Divider */}
              <div className="h-px mb-2" style={{ background: `${col.color}33` }} />

              {/* Sub-category links */}
              <ul className="space-y-1">
                {col.sub.map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => handleSubClick(col.title, item)}
                      className="text-gray-500 hover:text-gray-900 text-left w-full transition-colors duration-150 flex items-center gap-1 group/item"
                      style={{ fontSize: "clamp(9px, 1.1vw, 12.5px)" }}
                    >
                      <span
                        className="w-1 h-1 rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity shrink-0"
                        style={{ background: col.color }}
                      />
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}