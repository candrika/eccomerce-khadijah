import React from "react";
import MainLayoutAdmin from "../../../layouts/MainLayoutAdmin";
import HeaderAdmin from "../../../components/reusableComponents/HeaderAdmin";
import Banners from "../../../componentAdmin/banner/Banners";

const BannerView = () => {
  return (
    <MainLayoutAdmin>
      <HeaderAdmin header={"Data Banner"} />
      <Banners />
    </MainLayoutAdmin>
  );
};

export default BannerView;
