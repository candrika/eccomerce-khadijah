import React from "react";
import MainLayoutAdmin from "../../../layouts/MainLayoutAdmin";
import HeaderAdmin from "../../../components/reusableComponents/HeaderAdmin";
import EditGudang from "../../../componentAdmin/produk/EditGudang";

const EditGudangView = () => {
  return (
    <MainLayoutAdmin>
      <HeaderAdmin header={"Edit Data Gudang"} />
      <EditGudang />
    </MainLayoutAdmin>
  );
};

export default EditGudangView;
