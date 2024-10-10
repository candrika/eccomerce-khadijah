import React from "react";
import MainLayoutAdmin from "../../../layouts/MainLayoutAdmin";
import HeaderAdmin from "../../../components/reusableComponents/HeaderAdmin";
import AddGallery from "../../../componentAdmin/gallery/AddGallery";

const AddGalleryView = () => {
  return (
    <MainLayoutAdmin>
      <HeaderAdmin header={"Add Data Kupon"} />
      <AddGallery />
    </MainLayoutAdmin>
  );
};

export default AddGalleryView;
