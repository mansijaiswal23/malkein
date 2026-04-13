import { useParams, useNavigate } from "react-router-dom";
import { WOMEN_MENU } from "../WomenMegaMenu";
import BreadCrumb from "../../../components/BreadCrumb";
import SubCategoryLayout from "./SubCategoryLayout";
import Navbar from "../../Home/Navbar";
import Footer from "../../Home/Footer";

const DATA = WOMEN_MENU.find((m) => m.slug === "salwar-kameez");

export default function SalwarKameez() {
  const { sub } = useParams(); // defined when route is /women/salwar-kameez/:sub
  const decodedSub = sub ? decodeURIComponent(sub) : null;

  return (
    <>
    <Navbar/>
    <SubCategoryLayout
      data={DATA}
      activeSub={decodedSub}
      breadcrumb={[
        { label: "Home", path: "/" },
        { label: "Women", path: "/women" },
        { label: DATA.title },
      ]}
    />
    <Footer/>
    </>
  );
}
