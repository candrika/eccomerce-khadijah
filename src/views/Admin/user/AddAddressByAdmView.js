import React from "react";
import MainLayoutAdmin from "../../../layouts/MainLayoutAdmin";
import HeaderAdmin from "../../../components/reusableComponents/HeaderAdmin";
import AddUser from "../../../componentAdmin/user/AddUser";
import AddAddressByAdm from "../../../componentAdmin/user/AddAddressByAdm";

const AddAddressByAdmView = () => {
  return (
    <MainLayoutAdmin>
      <HeaderAdmin header={"Tambah Data Alamat"} />
      <AddAddressByAdm />
    </MainLayoutAdmin>
  );
};

export default AddAddressByAdmView;
