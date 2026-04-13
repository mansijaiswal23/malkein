import { useParams } from "react-router-dom";
import { WOMEN_MENU } from "../WomenMegaMenu";
import SubCategoryLayout from "./SubCategoryLayout";
import Navbar from "../../Home/Navbar";
import Footer from "../../Home/Footer";

const DATA = WOMEN_MENU.find((m) => m.slug === "kurti");

export default function Kurti() {
  const { sub } = useParams();
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
