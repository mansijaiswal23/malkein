import React, { useEffect, useState } from "react";
import Navbar from "../Home/Navbar";
import Footer from "../Home/Footer";
import Category from "../Product/Category";

export default function ViewAllPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Replace this with your API call or data fetch logic
    fetch("/api/products") // Example endpoint
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <>
    <Navbar/>

    <Category />
    <Footer/>
    </>
  );
}