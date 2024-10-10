import React from "react";
import MainLayoutAdmin from "../../layouts/MainLayoutAdmin";
import HeaderAdmin from "../../components/reusableComponents/HeaderAdmin";
import MemberSetting from "../../componentAdmMember/MemberSetting";

const MemberSettingView = () => {
  return (
    <MainLayoutAdmin>
      <HeaderAdmin header={"Pengaturan User"} />
      <MemberSetting />
    </MainLayoutAdmin>
  );
};

export default MemberSettingView;
