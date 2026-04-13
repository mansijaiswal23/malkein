import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function Breadcrumb({ crumbs }) {
  // crumbs = [{ label, path }, ...]  last one has no path (current page)
  return (
    <nav className="flex items-center gap-1 text-xs text-gray-500 font-['Baloo_Bhai_2'] flex-wrap">
      {crumbs.map((crumb, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && <ChevronRight size={11} className="text-gray-300" />}
          {crumb.path ? (
            <Link to={crumb.path} className="hover:text-red-600 transition-colors">
              {crumb.label}
            </Link>
          ) : (
            <span className="text-gray-800 font-semibold">{crumb.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}