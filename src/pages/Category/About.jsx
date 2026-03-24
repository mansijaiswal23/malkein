import Footer from "../Home/Footer"
import Navbar from "../Home/Navbar"
import { Link } from 'react-router-dom'
import Profile from '../../../src/assets/images/prf.png'

const Policies = () => {
  return (
    <>
    <Navbar/>
    <div className="flex flex-col items-center justify-center min-h-screen text-center">

    <div className="text-2xl sm:2xl md:text-4xl lg:text-8xl font-bold mb-4 -mt-24 sm:mt-0">
        About
    </div>

    <p className="text-gray-400 max-w-2xl mx-auto px-4 text-justify">
        We are dedicated to bringing the beauty of Indian tradition and modern fashion together through our exclusive bridal saree collection.
        Our platform offers a carefully curated range of bridal sarees designed for weddings, receptions, and special occasions.
        From elegant silk sarees to premium designer pieces, every product reflects craftsmanship, culture, and timeless style
    </p>

    <div className="flex flex-col shrink-0 items-center justify-center
        px-4 py-4 w-40 h-40
        sm:px-4 sm:w-48 sm:h-48
        md:px-8
        lg:px-10 lg:py-10 lg:w-90 lg:h-90 sm:mt-10
        -mt-15">

        <img
            src={Profile}
            alt="Profile"
            className="w-full h-full rounded-2xl object-cover"
        />
    </div>

    <Link 
        to="/" 
        className="bg-gray-300 px-6 sm:px-10 md:px-12 py-2 sm:py-4 text-base sm:text-lg md:text-xl rounded-[11px] hover:bg-gray-400 transition-colors inline-block"
    >
        Explore & Shop
    </Link>

</div>
    
    <Footer/>
    </>
  )
  
}

export default Policies
