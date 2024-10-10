import React from "react";
import MainLayoutAdmin from "../../../layouts/MainLayoutAdmin";
import HeaderAdmin from "../../../components/reusableComponents/HeaderAdmin";
import EditAddressByAdm from "../../../componentAdmin/user/EditAddressByAdmin";

const EditAddressByAdmView = () => {
  return (
    <MainLayoutAdmin>
      <HeaderAdmin header={"Edit Data Alamat"} />
      <EditAddressByAdm />
    </MainLayoutAdmin>
  );
};

export default EditAddressByAdmView;
