import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import MainLayout from "../../layouts/MainLayout";
import CategoryProduct from "../../components/customer/CategoryProduct";
import Product from "../../components/customer/Product";
import Profile from "../../components/customer/Profile";
import Slider from "../../components/bannerPromo/Slider";
import Bundle2 from "../../components/customer/Bundle2";
import Popup from "../../components/reusableComponents/Popup";

const Home = () => {
  const [showPopup, setShowPopup] = useState(false);
  console.log("pop up ", showPopup);
  useEffect(() => {
    const popupShown = sessionStorage.getItem("popupShown");

    // If popupShown is not set or is "false", show the popup
    if (!popupShown || popupShown === "true") {
      setShowPopup(true);
      sessionStorage.setItem("popupShown", "true");
    }
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
    sessionStorage.setItem("popupShown", "false");
  };

  return (
    <MainLayout>
      <CategoryProduct />
      <Product />
      <Profile />
      {/* <ProductDiscount /> */}
      <Slider />
      <Bundle2 />
      <Popup show={showPopup} onClose={handleClosePopup} />
    </MainLayout>
  );
};

export default Home;
