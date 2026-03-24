import Footer from "../Home/Footer"
import Navbar from "../Home/Navbar"
const Policies = () => {
  return (
    <>
    <Navbar/>
    
    <div className="min-h-screen bg-gray-50 text-gray-800 px-6 py-10">
      <div className="max-w-5xl mx-auto space-y-10">
        <h1 className="text-4xl font-bold text-center">Store Policies</h1>

        {/* Introduction */}
        <section className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-semibold mb-3">Welcome</h2>
          <p className="text-gray-600 leading-relaxed">
            Welcome to our lehenga boutique. We specialize in premium ethnic wear crafted with care. Please read our policies carefully before placing an order.
          </p>
        </section>

        {/* Shipping Policy */}
        <section className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-semibold mb-3">Shipping Policy</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>Orders are processed within 2–5 business days.</li>
            <li>Delivery time: 5–10 business days across India.</li>
            <li>International shipping may take 10–20 days.</li>
            <li>Tracking details will be shared via email/SMS.</li>
          </ul>
        </section>

        {/* Return Policy */}
        <section className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-semibold mb-3">Return & Exchange Policy</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>Returns accepted within 5 days of delivery.</li>
            <li>Items must be unused with original tags intact.</li>
            <li>Custom-stitched lehengas are non-returnable.</li>
            <li>Exchange allowed for size issues (subject to availability).</li>
          </ul>
        </section>

        {/* Cancellation */}
        <section className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-semibold mb-3">Order Cancellation</h2>
          <p className="text-gray-600">
            Orders can be cancelled within 24 hours of placing them. Once processing starts, cancellations may not be possible.
          </p>
        </section>

        {/* Payment Policy */}
        <section className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-semibold mb-3">Payment Policy</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>We accept UPI, credit/debit cards, and net banking.</li>
            <li>Cash on Delivery (COD) is available for select locations.</li>
            <li>All payments are secured and encrypted.</li>
          </ul>
        </section>

        {/* Privacy Policy */}
        <section className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-semibold mb-3">Privacy Policy</h2>
          <p className="text-gray-600 leading-relaxed">
            Your personal information is safe with us. We do not share your data with third parties except for order fulfillment and shipping purposes.
          </p>
        </section>

        
      </div>
    </div>
  


    <Footer/>
    </>
  )
  
}

export default Policies
