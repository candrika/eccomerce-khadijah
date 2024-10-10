import React from "react";
import MainLayoutAdmin from "../../../layouts/MainLayoutAdmin";
import HeaderAdmin from "../../../components/reusableComponents/HeaderAdmin";
import EditUser from "../../../componentAdmin/user/EditUser";

const EditUserView = () => {
  return (
    <MainLayoutAdmin>
      <HeaderAdmin header={"Edit Data User"} />
      <EditUser />
    </MainLayoutAdmin>
  );
};

export default EditUserView;
