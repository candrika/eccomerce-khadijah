import React from "react";
import MainLayoutAdmin from "../../../layouts/MainLayoutAdmin";
import HeaderAdmin from "../../../components/reusableComponents/HeaderAdmin";
import Banners from "../../../componentAdmin/banner/Banners";
import AddBanners from "../../../componentAdmin/banner/AddBanners";

const AddBannerView = () => {
  return (
    <MainLayoutAdmin>
      <HeaderAdmin header={"Tambah Data Banner"} />
      <AddBanners />
    </MainLayoutAdmin>
  );
};

export default AddBannerView;
