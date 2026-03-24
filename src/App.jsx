import Home from './pages/Home.jsx'
import { Routes, Route } from 'react-router-dom'
import CategoryFilters from './pages/Home/CategoriesFilters.jsx'
import Banner from './pages/Home/Banner.jsx'
import ProductDetails from './pages/Product/ProductDetails.jsx'
import SearchBar from './pages/Home/SearchBar.jsx'
import ViewAllButton from './pages/Home/ViewAllButton.jsx'
import ViewAll from './pages/Product/ViewAll.jsx'
import Footer from './pages/Home/Footer.jsx'
import EmptyCart from './pages/Cart/EmptyCart.jsx'
import AddToCart from './pages/Cart/AddToCart.jsx'
import EmptyWishlist from './pages/Wishlist/EmptyWishlist.jsx'
import Policies from './pages/Category/Policies.jsx'
import About from './pages/Category/About.jsx'
import Bridal from './pages/Category/Bridal.jsx'
import Women from './pages/Category/Women.jsx'
import Men from './pages/Category/Men.jsx'
import CheckoutPage from './pages/CheckOut/CheckoutPage.jsx'
import {SignInPage} from "./pages/Auth/SignInPage.jsx"
import {SignUpPage} from "./pages/Auth/SignUpPage.jsx"
import Category from './pages/Product/Category.jsx'
import AddToWishlist from './pages/Wishlist/AddToWishlist.jsx'


const App = () => {
  return (

    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/banner' element={<Banner />} />
      <Route path='/category-filters' element={<CategoryFilters />} />
      <Route path='/product/:id' element={<ProductDetails />} />
      <Route path='/product-details' element={<ProductDetails />} />
      <Route path='/search-bar' element={<SearchBar />} />
      <Route path='/viewAllButton' element={<ViewAllButton />} />
      <Route path='/view-all' element={<ViewAll />} />
      <Route path='/footer' element={<Footer />} />
      <Route path='/empty-cart' element={<EmptyCart />} />
      <Route path='/empty-wishlist' element={<EmptyWishlist />} />
      <Route path='/checkout' element={<CheckoutPage />} />
      <Route path='/cart' element={<AddToCart />} />
      <Route path="/policies" element={<Policies />} />
      <Route path="/about" element={<About />} />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/bridal" element={<Bridal/>}/>
      <Route path='/women' element={<Women/>}/>
      <Route path='/men' element={<Men/>}/>
      <Route path='/category' element={<Category/>}/>
      <Route path="/wishlist" element={<AddToWishlist />} />
    </Routes>

  )
}

export default App