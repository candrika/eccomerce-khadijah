import React from "react";
import MainLayoutAdmin from "../../../layouts/MainLayoutAdmin";
import HeaderAdmin from "../../../components/reusableComponents/HeaderAdmin";
import ReportAdmin from "../../../componentAdmin/reportAdmin/ReportAdmin";
import PenjualanPerHari from "../../../componentAdmin/reportAdmin/PenjualanPerHari";

const ReportView = () => {
  return (
    <MainLayoutAdmin>
      <HeaderAdmin header={"Report"} />
      <ReportAdmin />
    </MainLayoutAdmin>
  );
};

export default ReportView;
