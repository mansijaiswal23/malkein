import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import Navbar from "../Home/Navbar";
import { useWishlist } from "../../context/WishlistContext";

export default function AddToWishlist() {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const navigate = useNavigate();

  // ✅ Auto-redirect to empty wishlist page when all items are removed
  useEffect(() => {
    if (wishlistItems.length === 0) {
      navigate("/empty-wishlist", { replace: true });
    }
  }, [wishlistItems.length, navigate]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          My Wishlist{" "}
          <span className="text-base font-normal text-gray-400">
            ({wishlistItems.length} item{wishlistItems.length > 1 ? "s" : ""})
          </span>
        </h1>

        <div className="flex flex-col gap-4">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 items-center border border-gray-100 rounded-2xl p-3 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Product image */}
              <div
                onClick={() => navigate(`/product/${item.id}`)}
                className="w-24 h-24 shrink-0 bg-[#fce8e8] rounded-xl overflow-hidden cursor-pointer group relative"
              >
                <img
                  src={item.image1}
                  alt={item.name}
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                />
                <img
                  src={item.image2}
                  alt={item.name}
                  className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
              </div>

              {/* Product info */}
              <div
                className="flex-1 cursor-pointer"
                onClick={() => navigate(`/product/${item.id}`)}
              >
                <p className="font-semibold text-gray-800 line-clamp-1">
                  {item.name}
                </p>
                <p className="text-sm text-gray-500">{item.category}</p>
                <p className="text-sm font-semibold mt-1">
                  ₹{item.price.toLocaleString("en-IN")}
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col items-end gap-2 shrink-0">
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-red-100 hover:text-[#CC0000] transition-colors"
                  title="Remove from wishlist"
                >
                  <X size={15} />
                </button>
                <button
                  onClick={() => navigate(`/product/${item.id}`)}
                  className="text-xs px-3 py-1.5 rounded-lg bg-[#D9D9D9] hover:bg-[#CC0000] hover:text-white transition-colors font-medium"
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}