import React from "react";
import MainLayoutAdmin from "../../../layouts/MainLayoutAdmin";
import HeaderAdmin from "../../../components/reusableComponents/HeaderAdmin";
import UserDetail from "../../../componentAdmin/user/UserDetail";

const UserDetailView = () => {
  return (
    <MainLayoutAdmin>
      <HeaderAdmin header={"Data User"} />
      <UserDetail />
    </MainLayoutAdmin>
  );
};

export default UserDetailView;
