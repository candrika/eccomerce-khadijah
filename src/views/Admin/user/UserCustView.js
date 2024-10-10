import React from "react";
import MainLayoutAdmin from "../../../layouts/MainLayoutAdmin";
import HeaderAdmin from "../../../components/reusableComponents/HeaderAdmin";
import UserCust from "../../../componentAdmin/user/UserCust";

const UserCustView = () => {
  return (
    <MainLayoutAdmin>
      <HeaderAdmin header={"Data Customer"} />
      <UserCust />
    </MainLayoutAdmin>
  );
};

export default UserCustView;
