import React from "react";
import MainLayoutAdmin from "../../../layouts/MainLayoutAdmin";
import HeaderAdmin from "../../../components/reusableComponents/HeaderAdmin";
import ReportAdmin from "../../../componentAdmin/reportAdmin/ReportAdmin";
import PenjualanPerHari from "../../../componentAdmin/reportAdmin/PenjualanPerHari";

const ReportPenjualanView = () => {
  return (
    <MainLayoutAdmin>
      <HeaderAdmin header={"Report Penjualan Per Hari"} />
      <PenjualanPerHari />
    </MainLayoutAdmin>
  );
};

export default ReportPenjualanView;
