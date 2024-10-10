import React from "react";
import MainLayoutAdmin from "../../../layouts/MainLayoutAdmin";
import HeaderAdmin from "../../../components/reusableComponents/HeaderAdmin";
import User from "../../../componentAdmin/user/User";

const UserView = () => {
  return (
    <MainLayoutAdmin>
      <HeaderAdmin header={"Data User"} />
      <User />
    </MainLayoutAdmin>
  );
};

export default UserView;
