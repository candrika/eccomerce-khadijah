import React from "react";
import MainLayoutAdmin from "../../../layouts/MainLayoutAdmin";
import HeaderAdmin from "../../../components/reusableComponents/HeaderAdmin";
import Diskon from "../../../componentAdmin/produk/Diskon";

const DiskonView = () => {
  return (
    <MainLayoutAdmin>
      <HeaderAdmin header={"Data Diskon"} />
      <Diskon />
    </MainLayoutAdmin>
  );
};

export default DiskonView;
