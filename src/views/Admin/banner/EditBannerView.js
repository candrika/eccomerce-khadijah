import React from "react";
import MainLayoutAdmin from "../../../layouts/MainLayoutAdmin";
import HeaderAdmin from "../../../components/reusableComponents/HeaderAdmin";
import Banners from "../../../componentAdmin/banner/Banners";
import EditBanner from "../../../componentAdmin/banner/EditBanner";

const EditBannerView = () => {
  return (
    <MainLayoutAdmin>
      <HeaderAdmin header={"Data Banner"} />
      <EditBanner />
    </MainLayoutAdmin>
  );
};

export default EditBannerView;
