import React from "react";
import MainLayoutAdmin from "../../../layouts/MainLayoutAdmin";
import HeaderAdmin from "../../../components/reusableComponents/HeaderAdmin";
import Gallery from "../../../componentAdmin/gallery/Gallery";

const GalleryView = () => {
  return (
    <MainLayoutAdmin>
      <HeaderAdmin header={"Add Data Gallery"} />
      <Gallery />
    </MainLayoutAdmin>
  );
};

export default GalleryView;
