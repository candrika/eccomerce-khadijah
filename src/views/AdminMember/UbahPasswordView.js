import React from "react";
import MainLayoutAdmin from "../../layouts/MainLayoutAdmin";
import HeaderAdmin from "../../components/reusableComponents/HeaderAdmin";
import MemberSetting from "../../componentAdmMember/MemberSetting";
import EditPassword from "../../componentAdmMember/EditPassword";

const UbahPasswordView = () => {
  return (
    <MainLayoutAdmin>
      <HeaderAdmin header={"Ubah Password"} />
      <EditPassword />
    </MainLayoutAdmin>
  );
};

export default UbahPasswordView;
