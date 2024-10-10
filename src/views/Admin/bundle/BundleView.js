import React from "react";
import MainLayoutAdmin from "../../../layouts/MainLayoutAdmin";
import HeaderAdmin from "../../../components/reusableComponents/HeaderAdmin";
import Bundle from "../../../componentAdmin/bundle/Bundle";

const BundleView = () => {
  return (
    <MainLayoutAdmin>
      <HeaderAdmin header={"Tambah Data Bundle"} />
      <Bundle />
    </MainLayoutAdmin>
  );
};

export default BundleView;
