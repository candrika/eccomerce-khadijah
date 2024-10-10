import React from "react";
import MainLayoutAdmin from "../../../layouts/MainLayoutAdmin";
import HeaderAdmin from "../../../components/reusableComponents/HeaderAdmin";
import EditItem from "../../../componentAdmin/produk/EditItem";

const EditItemView = () => {
  return (
    <MainLayoutAdmin>
      <HeaderAdmin header={"Edit Data Item"} />
      <EditItem />
    </MainLayoutAdmin>
  );
};

export default EditItemView;
