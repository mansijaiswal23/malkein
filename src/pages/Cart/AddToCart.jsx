import { useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus } from "lucide-react";
import Navbar from "../Home/Navbar";
import { useCart } from "../../context/CartContext";
import EmptyCart from "../Cart/EmptyCart";
import { ImageToggle } from "../../components/ImageToggle";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, cartCount } = useCart();
  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // ── Empty state ──────────────────────────────────────────────
  if (cartItems.length === 0) {
    return (
      <EmptyCart />
    );
  }

  // ── Filled cart ──────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
          Your Cart
        </h1>
        <p className="text-sm text-gray-400 mb-8">
          {cartCount} {cartCount === 1 ? "item" : "items"}
        </p>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* ── Item list ── */}
          <div className="flex-1 flex flex-col gap-4">
            {cartItems.map((item, idx) => (
              <div
                key={idx}
                className="flex gap-4 bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
              >
                {/* Thumbnail - using image1 URL directly from JSON */}
                <div className="w-24 h-28 rounded-xl bg-[#fce8e8] overflow-hidden shrink-0 relative">
  <ImageToggle image1={item.image1} image2={item.image2} />
</div>

                {/* Info */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-base leading-tight">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">{item.category}</p>
                    <div className="flex gap-2 mt-2 items-center">
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">
                        Size: {item.selectedSize}
                      </span>
                      <span
                        className="w-4 h-4 rounded-full border border-gray-200"
                        style={{ backgroundColor: item.selectedColor }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    {/* Qty controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.selectedSize,
                            item.selectedColor,
                            -1
                          )
                        }
                        className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="text-sm font-semibold w-5 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.selectedSize,
                            item.selectedColor,
                            1
                          )
                        }
                        className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition"
                      >
                        <Plus size={13} />
                      </button>
                    </div>

                    <p className="font-bold text-gray-900 text-base">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>

                {/* Delete */}
                <button
                  onClick={() =>
                    removeFromCart(item.id, item.selectedSize, item.selectedColor)
                  }
                  className="self-start text-gray-300 hover:text-red-500 transition-colors p-1"
                >
                  <Trash2 size={17} />
                </button>
              </div>
            ))}
          </div>

          {/* ── Order summary ── */}
          <div className="lg:w-80 shrink-0">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-6">
              <h2 className="text-lg font-bold text-gray-900 mb-5">Order Summary</h2>

              <div className="flex flex-col gap-3 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal ({cartCount} items)</span>
                  <span className="font-medium text-gray-900">
                    ₹{subtotal.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="border-t pt-3 flex justify-between font-bold text-base text-gray-900">
                  <span>Total</span>
                  <span>₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <button
                onClick={() =>
                  navigate("/checkout", {
                    state: {
                      cartItems,
                      subtotal,
                      fromCart: true,
                    },
                  })
                }
                className="mt-6 w-full py-4 bg-[#CC0000] hover:bg-[#aa0000] text-white font-semibold rounded-xl transition-all shadow-md shadow-red-100 text-base">
                Proceed to Checkout
              </button>

              <button
                onClick={() => navigate("/")}
                className="mt-3 w-full py-3 border-2 border-gray-200 rounded-xl text-gray-600 font-medium text-sm hover:border-gray-400 transition-all"
              >
                Continue Shopping
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}