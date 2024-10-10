import React from "react";
import MainLayoutAdmin from "../../../layouts/MainLayoutAdmin";
import HeaderAdmin from "../../../components/reusableComponents/HeaderAdmin";
import EditKupon from "../../../componentAdmin/kupon/EditKupon";

const EditKuponView = () => {
  return (
    <MainLayoutAdmin>
      <HeaderAdmin header={"Edit Data Kupon"} />
      <EditKupon />
    </MainLayoutAdmin>
  );
};

export default EditKuponView;
