import React from "react";
import MainLayoutAdmin from "../../../layouts/MainLayoutAdmin";
import HeaderAdmin from "../../../components/reusableComponents/HeaderAdmin";
import EditDiskon from "../../../componentAdmin/produk/EditDiskon";

const EditDiskonView = () => {
  return (
    <MainLayoutAdmin>
      <HeaderAdmin header={"Edit Data Diskon"} />
      <EditDiskon />
    </MainLayoutAdmin>
  );
};

export default EditDiskonView;
