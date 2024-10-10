import React from "react";
import MainLayoutAdmin from "../../../layouts/MainLayoutAdmin";
import HeaderAdmin from "../../../components/reusableComponents/HeaderAdmin";
import SettingColor from "../../../componentAdmin/setting/SettingColor";

const GeneralSetting = () => {
  return (
    <MainLayoutAdmin>
      <HeaderAdmin header={"Setting General"} />
      <SettingColor />
    </MainLayoutAdmin>
  );
};

export default GeneralSetting;
