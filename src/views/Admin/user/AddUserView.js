import React from "react";
import MainLayoutAdmin from "../../../layouts/MainLayoutAdmin";
import HeaderAdmin from "../../../components/reusableComponents/HeaderAdmin";
import AddUser from "../../../componentAdmin/user/AddUser";

const AddUserView = () => {
  return (
    <MainLayoutAdmin>
      <HeaderAdmin header={"Data User"} />
      <AddUser />
    </MainLayoutAdmin>
  );
};

export default AddUserView;
