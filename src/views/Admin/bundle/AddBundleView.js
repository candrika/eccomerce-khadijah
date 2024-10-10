import React from "react";
import MainLayoutAdmin from "../../../layouts/MainLayoutAdmin";
import HeaderAdmin from "../../../components/reusableComponents/HeaderAdmin";
import AddBundle from "../../../componentAdmin/bundle/AddBundle";
import SearchProduct from "../../../componentAdmin/bundle/SearchProduct";

const AddBundleView = () => {
  return (
    <MainLayoutAdmin>
      <HeaderAdmin header={"Tambah Data Bundle"} />
      <AddBundle />
    </MainLayoutAdmin>
  );
};

export default AddBundleView;
