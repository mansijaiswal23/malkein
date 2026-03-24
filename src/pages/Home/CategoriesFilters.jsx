const categories = [
  "All",
  "Designer wear",
  "Under 5k",
  "Bridal Lehenga",
  "Chandni chowk Bridals"
];

export default function CategoryFilters() {
  return (
    <div className="px-4 md:px-6 mt-4">
       <h2 className="text-xl md:text-2xl font-semibold mb-4">Categories</h2>
      <div className="flex gap-2 md:gap-3 overflow-x-auto pb-2">

        {categories.map((cat, index) => (

          <button
            key={index}
            className={`whitespace-nowrap px-3 md:px-4 py-1 md:py-2 rounded-full border text-sm 
            ${
              index === 0
                ? "bg-red-600 text-white border-red-600"
                : "bg-white text-gray-700 border-gray-300"
            }`}
          >
            {cat}
            {index !== 0 && <span className="ml-1 text-red-500">→</span>}
          </button>

        ))}

      </div>

    </div>
  );
}