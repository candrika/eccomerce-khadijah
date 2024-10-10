import React from "react";
import AddCategory from "../../../componentAdmin/produk/AddCategory";
import MainLayoutAdmin from "../../../layouts/MainLayoutAdmin";
import HeaderAdmin from "../../../components/reusableComponents/HeaderAdmin";

const AddCategoryView = () => {
  return (
    <MainLayoutAdmin>
      <HeaderAdmin header={"Tambah Data Category"} />
      <AddCategory />
    </MainLayoutAdmin>
  );
};

export default AddCategoryView;
