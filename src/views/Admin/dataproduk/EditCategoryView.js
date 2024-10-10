import React from "react";
import MainLayoutAdmin from "../../../layouts/MainLayoutAdmin";
import HeaderAdmin from "../../../components/reusableComponents/HeaderAdmin";
import EditCategory from "../../../componentAdmin/produk/EditCategory";

const EditCategoryView = () => {
  return (
    <MainLayoutAdmin>
      <HeaderAdmin header={"Edit Data Kategori"} />
      <EditCategory />
    </MainLayoutAdmin>
  );
};

export default EditCategoryView;
