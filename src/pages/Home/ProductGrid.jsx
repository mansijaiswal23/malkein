import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import products from "../../data/products.json";
import { Star, Plus } from 'lucide-react';
import { ImageToggle } from '../../components/ImageToggle';


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

export default function ProductsGrid() {
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState({});

  return (
    <div className="px-3 md:px-6 mt-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {products.map((item) => {
          const discountedPrice = getDiscountedPrice(item.price, item.discount);

          return (
            <div
              key={item.id}
              className="relative pb-4 cursor-pointer"
              onClick={() => navigate(`/product/${item.id}`)}
            >
              {/* Image Card */}
              <div className="bg-[#FF00001F] rounded-3xl overflow-visible relative flex items-end justify-center pt-4 px-4 h-45 md:h-74 group">
                <div className="absolute inset-0 rounded-3xl overflow-hidden cursor-pointer">
                  <ImageToggle image1={item.image1} image2={item.image2} onClick={() => navigate(`/product/${item.id}`)} />
                </div>

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
                    hover:bg-[#DB0000] hover:text-white hover:shadow-lg hover:scale-105 cursor-pointer
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
        })}
      </div>
    </div>
  );
}