import Footer from "../Home/Footer"
import Navbar from "../Home/Navbar"
import BridalDropdown from "./BridalMegaMenu";

const lehengas = [
  {
    id: 1,
    name: "Royal Red Bridal Lehenga",
    price: "₹45,000",
    image:
      "https://images.unsplash.com/photo-1733937140732-2cc70a1d7017?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bGVobmdhfGVufDB8fDB8fHww",
  },
  {
    id: 2,
    name: "Pastel Pink Designer Lehenga",
    price: "₹38,000",
    image:
      "https://images.unsplash.com/photo-1722627813009-f1169e6334bc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGVobmdhfGVufDB8fDB8fHww",
  },
  {
    id: 3,
    name: "Golden Embroidered Lehenga",
    price: "₹52,000",
    image:
      "https://images.unsplash.com/photo-1733937111165-36efb3ded769?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGVobmdhfGVufDB8fDB8fHww",
  },
  {
    id: 4,
    name: "Ivory Wedding Lehenga",
    price: "₹47,000",
    image:
      "https://images.unsplash.com/photo-1733937110329-7bfb323fc567?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bGVobmdhfGVufDB8fDB8fHww",
  },
  {
    id: 5,
    name: "Royal Red Bridal Lehenga",
    price: "₹45,000",
    image:
      "https://images.unsplash.com/flagged/photo-1551854716-8b811be39e7e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGluZGlhbiUyMHdlZGRpbmd8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 6,
    name: "Pastel Pink Designer Lehenga",
    price: "₹38,000",
    image:
      "https://images.unsplash.com/photo-1717350917430-e9eea6474594?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGluZGlhbiUyMGJyaWRlfGVufDB8fDB8fHww",
  },
  {
    id: 7,
    name: "Golden Embroidered Lehenga",
    price: "₹52,000",
    image:
      "https://plus.unsplash.com/premium_photo-1724762182780-000d248f9301?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGluZGlhbiUyMGJyaWRlfGVufDB8fDB8fHww",
  },
  {
    id: 8,
    name: "Ivory Wedding Lehenga",
    price: "₹47,000",
    image:
      "https://images.unsplash.com/photo-1588842867976-fd084ca2c87b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGluZGlhbiUyMGJyaWRlfGVufDB8fDB8fHww",
  },
  {
    id: 9,
    name: "Royal Red Bridal Lehenga",
    price: "₹45,000",
    image:
      "https://images.unsplash.com/photo-1610276347233-2ab70fc71da8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGluZGlhbiUyMGJyaWRlfGVufDB8fDB8fHww",
  },
  {
    id: 10,
    name: "Pastel Pink Designer Lehenga",
    price: "₹38,000",
    image:
      "https://images.unsplash.com/photo-1610047520958-b42ebcd2f6cb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGluZGlhbiUyMGJyaWRlfGVufDB8fDB8fHww",
  },
  {
    id: 11,
    name: "Golden Embroidered Lehenga",
    price: "₹52,000",
    image:
      "https://images.unsplash.com/photo-1610173826014-d131b02d69ca?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGluZGlhbiUyMGJyaWRlfGVufDB8fDB8fHww",
  },
  {
    id: 12,
    name: "Ivory Wedding Lehenga",
    price: "₹47,000",
    image:
      "https://plus.unsplash.com/premium_photo-1682096159299-5e8a6d5d442b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aW5kaWFuJTIwYnJpZGV8ZW58MHx8MHx8fDA%3D",
  },
];

export default function Bridal() {
  return (
    <>
    <Navbar/>
    <BridalDropdown />
    <div className="min-h-screen p-6">
      
      {/* Header */}
      <h1 className="text-3xl font-bold text-center mb-8 text-red-600">
        Bridal Lehengas Collection
      </h1>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {lehengas.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
          >
            {/* Image */}
            <div className="overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="h-64 w-full object-cover hover:scale-105 transition duration-300"
              />
            </div>

            {/* Content */}
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800">
                {item.name}
              </h2>
              <p className="text-red-600 font-bold mt-2">
                {item.price}
              </p>

              <button className="mt-4 w-full bg-red-600 text-white py-2 rounded-xl hover:bg-red-700 transition">
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    <Footer/>
    </>
  );
}