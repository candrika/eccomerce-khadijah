import React from "react";
import MainLayoutAdmin from "../../../layouts/MainLayoutAdmin";
import HeaderAdmin from "../../../components/reusableComponents/HeaderAdmin";
import Category from "../../../componentAdmin/produk/Category";

const CategoryView = () => {
  return (
    <MainLayoutAdmin>
      <HeaderAdmin header={"Category"} />
      <Category />
    </MainLayoutAdmin>
  );
};

export default CategoryView;
