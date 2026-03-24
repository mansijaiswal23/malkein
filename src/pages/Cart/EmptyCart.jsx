import Navbar from '../Home/Navbar.jsx'
import Footer from '../Home/Footer.jsx'
import emptycart from '../../../src/assets/images/empty-cart.jpeg'
import bubbleL from '../../../src/assets/images/bubble-l.png'
import bubbleR from '../../../src/assets/images/bubble-r.png'
import { Link } from 'react-router-dom'

const EmptyCart = () => {
  return (
    <>
      <Navbar />

      {/* Main Content */}

      <div className="flex flex-col items-center px-2 mt-2 text-center max-w-screen overflow-x-hidden w-full">
        <div className="relative w-full max-w-3xl mx-auto mt-8 px-4 sm:px-6">

          {/* Right dot - outside top-right corner */}
          <div className="absolute right-8 sm:right-4 lg:right-0 top-0 lg:-top-10 flex">
            <img
                          src={bubbleR}
                          alt="Phonepe"
                          className="w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 object-contain"
                        />
 
</div>


          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-8xl font-bold w-full"
          >
            Your cart is
          </h1>
          <h2 className='text-2xl sm:text-4xl md:text-4xl lg:text-6xl font-thin w-full' >empty!</h2>

          {/* Left dot - outside bottom-left corner */}
          <div className="absolute left-8 sm:left-4 lg:left-12 bottom-0 lg:-bottom-6 flex">
            <img
                          src={bubbleL}
                          alt="Phonepe"
                          className="w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 object-contain"
                        />
          </div>

        </div>


        <p className="text-black  text-3xl sm:text-2xl md:text-4xl lg:text-4xl font-thin w-full mt-4 lg:mt-20">
          Have an account? <br />
        </p>
        <p className='text-gray-600'><Link to="/login" className="text-red-600 underline">Log in</Link> to check out faster.</p>


        <Link
          to="/"
          className="bg-gray-300 px-4 sm:px-8 md:px-12 py-2 sm:py-4 mt-6 sm:mt-10 text-base sm:text-lg md:text-xl rounded-sm hover:bg-gray-400 transition-colors inline-block"
        >
          Continue shopping
        </Link>
 
        <div className="flex flex-col items-start shrink-0 px-4 sm:px-6 md:px-8 py-6 md:py-8">
          <img
            src={emptycart}
            alt="Malkein"
            className="w-full h-auto rounded-2xl object-cover max-h-125 md:max-h-150
    "
          />
        </div>
      </div>


      <Footer />
    </>
  )
}
  


export default EmptyCart
