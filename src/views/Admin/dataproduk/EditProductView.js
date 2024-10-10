import React from "react";
import MainLayoutAdmin from "../../../layouts/MainLayoutAdmin";
import HeaderAdmin from "../../../components/reusableComponents/HeaderAdmin";
import EditProduct from "../../../componentAdmin/produk/EditProduct";
import AddGallery from "../../../componentAdmin/gallery/AddGallery";

const EditProductView = () => {
  return (
    <MainLayoutAdmin>
      <HeaderAdmin header={"Edit Data Produk"} />
      <EditProduct />
      <AddGallery />
    </MainLayoutAdmin>
  );
};

export default EditProductView;
