import React from "react";
import MainLayoutAdmin from "../../../layouts/MainLayoutAdmin";
import HeaderAdmin from "../../../components/reusableComponents/HeaderAdmin";
import EditBundle from "../../../componentAdmin/bundle/EditBundle";

const EditBundleView = () => {
  return (
    <MainLayoutAdmin>
      <HeaderAdmin header={"Edit Data Bundle"} />
      <EditBundle />
    </MainLayoutAdmin>
  );
};

export default EditBundleView;
