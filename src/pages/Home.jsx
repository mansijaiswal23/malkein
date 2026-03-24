import Navbar from "../pages/Home/Navbar";
import Banner from "../pages/Home/Banner";
import CategoriesFilters from "../pages/Home/CategoriesFilters.jsx";
import ProductGrid from "../pages/Home/ProductGrid.jsx";
import ViewAllButton from "../pages/Home/ViewAllButton.jsx";
import Footer from "../pages/Home/Footer.jsx";


export default function Home() {
  return (
    // <div className="min-h-screen overflow-x-hidden md:overflow-x-auto">
      // <div className="w-full md:max-w-380 mx-auto px-4 py-8">
        <div className="overflow-hidden">

          <Navbar />
          <Banner />
          <CategoriesFilters />
          <ProductGrid />
          <ViewAllButton />
          <Footer />


         

        </div>
      // </div>
    // </div>
  );
}