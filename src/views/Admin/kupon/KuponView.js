import React from "react";
import MainLayoutAdmin from "../../../layouts/MainLayoutAdmin";
import HeaderAdmin from "../../../components/reusableComponents/HeaderAdmin";
import Kupon from "../../../componentAdmin/kupon/Kupon";

const KuponView = () => {
  return (
    <MainLayoutAdmin>
      <HeaderAdmin header={"Data Kupon"} />
      <Kupon />
    </MainLayoutAdmin>
  );
};

export default KuponView;
