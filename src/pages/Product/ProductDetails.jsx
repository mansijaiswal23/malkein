import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { HeartPlus } from "lucide-react";
import products from "../../data/products.json";
import Navbar from "../Home/Navbar";
import { useCart } from "../../context/CartContext";
import upi from "../../../src/assets/images/phonepe.png";
import googlepay from "../../../src/assets/images/googlepay.png";
import paytm from "../../../src/assets/images/paytm.png";
import message from "../../../src/assets/images/message.png";
import flag from "../../../src/assets/images/flag.png";
import { useWishlist } from "../../context/WishlistContext";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === Number(id));

  const [selectedSize, setSelectedSize] = useState("XS");
  const [selectedColor, setSelectedColor] = useState(0);
  const [added, setAdded] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [isActive, setIsActive] = useState(false)


  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleSubscribe = () => {
    if (!email) return;
    console.log("Subscribed with:", email);
    setSubscribed(true);
    setEmail("");
  };

  const suggestions = useMemo(() => {
    if (!product) return [];
    return products
      .filter((p) => p.id !== product.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex items-center justify-center px-4 py-20">
          <div className="text-center">
            <h1 className="text-2xl font-semibold mb-2">Product not found</h1>
            <p className="text-gray-500 mb-4">
              We couldn&apos;t find the product you are looking for.
            </p>
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
            >
              Go back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />

      {/* Back button (mobile) */}
      <div className="md:hidden px-4 pt-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800"
        >
          ← Back
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col md:flex-row gap-8 md:gap-14">

          {/* LEFT - Image */}
          <div className="relative w-full md:w-auto md:shrink-0 md:max-w-sm">

            {/* Wishlist button */}
            <button
              onClick={() => toggleWishlist({
  id: product.id,
  name: product.name,
  price: product.price,
  category: product.category,
  image1: product.image1,
  image2: product.image2,
})}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-[#D9D9D9] shadow-md flex items-center justify-center transition-transform hover:scale-110"
            >
              <HeartPlus
                size={20}
                color={isInWishlist(product.id) ? "#CC0000" : "#888"}
fill={isInWishlist(product.id) ? "#CC0000" : "none"}
              />
            </button>

            {/* //active setActive */}

         <div
      className="w-full aspect-square bg-[#fce8e8] rounded-3xl overflow-hidden relative group"
      onClick={() => setIsActive(!isActive)}
    >
      <img
        src={product.image1}
        alt={product.name}
        className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-500 ${
          isActive ? "opacity-0" : "opacity-100"
        } md:group-hover:opacity-0`}
      />
      <img
        src={product.image2}
        alt={product.name}
        className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-500 ${
          isActive ? "opacity-100" : "opacity-0"
        } md:group-hover:opacity-100`}
      />
    </div>

            {/* Colors */}
            <div className="flex gap-3 mt-4 flex-wrap">
              {product.colors.map((color, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedColor(i)}
                  className="w-9 h-9 rounded-lg border-2 transition-all"
                  style={{
                    backgroundColor: color,
                    borderColor: selectedColor === i ? "#CC0000" : "transparent",
                    boxShadow:
                      selectedColor === i
                        ? "0 0 0 2px #fff, 0 0 0 4px #CC0000"
                        : "none",
                  }}
                />
              ))}
            </div>

            {/* Description */}
            <div className="pt-4 text-sm text-gray-500 space-y-1">
              {product.description.map((item, index) => (
                <p key={index}>{item}</p>
              ))}
            </div>
          </div>

          {/* RIGHT - Info */}
          <div className="flex-1 flex flex-col gap-4">
            <div>
              <h1 className="text-2xl md:text-4xl font-bold text-gray-900">
                {product.name}
              </h1>
              <p className="text-gray-500">{product.category}</p>
            </div>

            <p className="text-2xl font-semibold">
              ₹{product.price.toLocaleString("en-IN")}
            </p>

            <p className="text-sm text-gray-500 -mt-2">
              Taxes included. Shipping calculated at checkout.
            </p>

            <div className="text-sm text-gray-600">
              <span className="font-medium">*** Unstitched ***</span>
              <p>
                <span className="text-[#CC0000] font-bold">
                  {product.discount} -{" "}
                </span>
                Use{" "}
                <span className="bg-red-50 text-[#CC0000] px-2 py-0.5 rounded">
                  {product.coupon}
                </span>
              </p>
            </div>

            {/* Sizes */}
            <div>
              <p className="font-semibold mb-2">Size</p>
              <div className="flex gap-3 flex-wrap">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className="min-w-10 h-8 px-2 border-2 rounded-sm text-sm transition-all"
                    style={{
                      borderColor: selectedSize === size ? "#CC0000" : "#e5e7eb",
                      backgroundColor: selectedSize === size ? "#fff5f5" : "#fff",
                      color: selectedSize === size ? "#CC0000" : "#374151",
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-3 w-full">
              <button
                onClick={handleAddToCart}
                className="w-full py-3 rounded-xl hover:bg-[#CC0000] hover:text-white bg-[#D9D9D9] active:bg-[#CC0000] active:text-white  transition-colors font-medium  cursor-pointer"
              >
                {added ? "✓ Added to cart!" : "Add to cart"}
              </button>

              <button
                onClick={() =>
                  navigate("/checkout", {
                    state: { product, selectedSize, selectedColor },
                  })
                }
                className="w-full py-3 bg-[#D9D9D9] hover:bg-[#CC0000] hover:text-white active:bg-[#CC0000] active:text-white  rounded-xl transition-colors font-medium  cursor-pointer"
              >
                Buy now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Offers Divider */}
      <hr className="border-t border-gray-300 my-4" />
      <h2 className="text-lg font-semibold text-gray-800 mb-4 px-4 md:px-8 lg:px-50">
        Offers
      </h2>
      <hr className="border-t border-gray-300 my-4" />

      {/* Suggestions Section */}
      <div className="max-w-5xl mx-auto px-4 pb-16">
        <h2 className="text-xl font-semibold mb-4">You may also like</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {suggestions.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(`/product/${item.id}`)}
              className="cursor-pointer group"
            >
              <div className="w-full aspect-square bg-[#fce8e8] rounded-3xl overflow-hidden relative">
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

              <div className="mt-2">
                <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                <p className="text-sm text-gray-500">
                  ₹{item.price.toLocaleString("en-IN")}
                  
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Short description */}
        <div className="py-4 text-sm text-gray-600 space-y-1">
          <p>Soft rose pink with rich gold zari work.</p>
          <p>Royal aur elegant vibe.</p>
        </div>

        {/* Fabric Disclaimer */}
        <p className="text-sm font-semibold text-gray-600 mb-1.5">
          Fabric &amp; Work Disclaimer
        </p>
        <p className="text-sm text-gray-500 leading-relaxed">
          Handcrafted products may have minor variations in weaving, embroidery
          or color tone which are not defects but a part of the product&apos;s
          uniqueness and traditional craftsmanship.
        </p>
      </div>

      {/* Subscribe */}
      <div className="flex flex-col items-center gap-3 px-4 pb-8">
        <p className="text-[15px] tracking-widest text-gray-400 text-center">
          Subscribe to our emails
        </p>
        <div className="flex items-center w-full max-w-xs rounded-lg overflow-hidden bg-[#D9D9D9]">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
            placeholder="Email"
            className="flex-1 px-4 py-2.5 text-sm bg-transparent outline-none text-gray-700 placeholder:text-gray-400"
          />
          <button
            onClick={handleSubscribe}
            className="pr-4 pl-2 text-gray-500 hover:text-[#CC0000] transition-colors"
          >
            {subscribed ? (
              <span className="text-xs text-green-600 font-bold">✓</span>
            ) : (
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            )}
          </button>
        </div>

        {/* Payment icons */}
        <div className="flex items-center gap-4 mt-1">
          <img src={upi} alt="Phonepe" className="w-7 h-7 object-contain" />
          <img src={googlepay} alt="Google Pay" className="w-7 h-7 object-contain" />
          <img src={paytm} alt="Paytm" className="h-6 object-contain" />
        </div>
      </div>

      {/* Footer row */}
      <div className="pb-6 flex items-center justify-between px-4 border-t border-gray-100 pt-4">
        <img src={message} alt="Contact" className="w-9 h-9 object-contain" />
        <div className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-4 py-1.5 bg-[#D9D9D9]">
          <img src={flag} alt="Flag" className="w-5 h-5 object-contain" />
          <span className="text-xs font-medium text-gray-700">INR</span>
        </div>
      </div>
    </div>
  );
}