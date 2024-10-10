import React from "react";
import AddItem from "../../../componentAdmin/produk/AddItem";
import MainLayoutAdmin from "../../../layouts/MainLayoutAdmin";
import HeaderAdmin from "../../../components/reusableComponents/HeaderAdmin";

const AddUnitItemView = () => {
  return (
    <MainLayoutAdmin>
      <HeaderAdmin header={"Tambah Data Produk"} />
      <AddItem />
    </MainLayoutAdmin>
  );
};

export default AddUnitItemView;
