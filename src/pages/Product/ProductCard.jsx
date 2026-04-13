import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Star, Heart } from "lucide-react";

// ─── Single Product Card ─────────────────────────────────────────────────────
export default function ProductCard({ product, categorySlug, sub, accentColor }) {
  const navigate = useNavigate();
  const [wished, setWished] = useState(false);
  const [imgErr, setImgErr] = useState(false);

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <div
      className="group relative bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer font-['Baloo_Bhai_2']"
      onClick={() =>
        navigate(
          `/women/${categorySlug}/${encodeURIComponent(sub)}/product/${product.id}`
        )
      }
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-gray-50 aspect-4/5">
        {!imgErr ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImgErr(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-red-50 text-4xl">
            💃
          </div>
        )}
        {product.badge && (
          <span
            className="absolute top-2 left-2 text-white text-[10px] font-bold px-2 py-0.5 rounded-full"
            style={{ background: accentColor }}
          >
            {product.badge}
          </span>
        )}
        {discount > 0 && (
          <span className="absolute top-2 right-2 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            -{discount}%
          </span>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setWished((w) => !w);
          }}
          className="absolute bottom-2 right-2 p-1.5 bg-white rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Heart
            size={14}
            className={
              wished ? "fill-red-600 text-red-600" : "text-gray-400"
            }
          />
        </button>
      </div>

      {/* Info */}
      <div className="p-2.5">
        <p className="text-xs text-gray-700 font-semibold leading-tight line-clamp-2 mb-1">
          {product.name}
        </p>
        <div className="flex items-center gap-1 mb-1">
          <div className="flex items-center bg-green-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded gap-0.5">
            <Star size={8} className="fill-white" /> {product.rating}
          </div>
          <span className="text-[10px] text-gray-400">({product.reviews})</span>
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-sm font-extrabold text-gray-900">
            ₹{product.price.toLocaleString()}
          </span>
          <span className="text-[11px] text-gray-400 line-through">
            ₹{product.originalPrice.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
