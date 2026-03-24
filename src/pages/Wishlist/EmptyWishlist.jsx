import Navbar from "../Home/Navbar"
import Footer from "../Home/Footer"
import Bucket from "../../../src/assets/images/bucket1.png"
import { Link } from 'react-router-dom'
import {Heart} from "lucide-react";


const EmptyWishlist = () => {
    return (
        <div>
            <Navbar />
            <div className="flex flex-col items-center px-2 mt-2 text-center max-w-screen overflow-x-hidden w-full">
                <div className="flex flex-col items-center  relative w-full max-w-3xl mx-auto mt-8 px-4 sm:px-6">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold w-full">
                        Your Wishlist is Empty.
                    </h1>
                    <p className="text-gray-400">Tap on <Heart fill="gray" color="gray" className="inline w-4 h-4 align-middle mx-0"/> for items you love & find all your <br /> favourites at one place</p>
<div className="flex flex-col shrink-0 items-center justify-center
px-4 py-4 w-40 h-40
sm:px-6 sm:w-50 sm:h-50
md:px-8
lg:px-10 lg:py-10 lg:w-90 lg:h-90
-mt-6 sm:-mt-10">                        <img
                            src={Bucket}
                            alt="Cart"
                            className="w-full h-auto rounded-2xl object-cover max-h-125 md:max-h-150"/>
                    </div>
                    <Link
                        to="/"
                        className="bg-gray-300 px-6 sm:px-10 md:px-12 py-2 sm:py-4 -mt-2 sm:-mt-8 text-base sm:text-lg md:text-xl rounded-[11px] hover:bg-gray-400 transition-colors inline-block "
                    >Explore & Shop
                    </Link>
                </div>
 </div>
            <Footer />
        </div>
    )
}

export default EmptyWishlist
