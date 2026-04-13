import { useNavigate } from "react-router-dom";

export const BRIDAL_MENU = [
  {
    title: "LEHENGA",
    color: "#DB0000",
    sub: [
      "Bridal Lehenga",
      "Wedding Lehenga",
      "Party Wear Lehenga",
      "Festive Lehenga",
      "Navratri Lehenga",
      "Haldi / Mehndi Lehenga",
    ],
  },
];

export default function BridalMegaMenu({ onClose }) {
  const navigate = useNavigate();

  return (
    <div className="absolute top-full left-0 pt-2 z-50">
      <div
        className="bg-white border border-gray-200 rounded-b-xl shadow-lg"
        style={{ minWidth: "220px" }}
      >
        <div className="flex gap-10 px-6 py-5">
          {BRIDAL_MENU.map((col) => (
            <div key={col.title} className="flex flex-col min-w-[160px]">
              {/* Column heading */}
              <p
                className="text-xs font-bold tracking-widest uppercase mb-2 pb-2 border-b"
                style={{ color: col.color, borderColor: col.color }}
              >
                {col.title}
              </p>

              {/* Sub-items */}
              <ul className="flex flex-col gap-0.5">
                {col.sub.map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => {
                        onClose();
                        navigate(
                          `/bridal?category=${encodeURIComponent(col.title)}&sub=${encodeURIComponent(item)}`
                        );
                      }}
                      className="text-sm text-gray-500 hover:text-[#DB0000] text-left w-full py-1.5 transition-colors duration-150"
                    >
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