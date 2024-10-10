import React from "react";
import MainLayoutAdmin from "../../../layouts/MainLayoutAdmin";
import HeaderAdmin from "../../../components/reusableComponents/HeaderAdmin";
import ReportBackup from "../../../componentAdmin/report/ReportBackup";

const DashboardAdminView = () => {
  return (
    <MainLayoutAdmin>
      <HeaderAdmin header={"Dashboard"} />
      <ReportBackup />
    </MainLayoutAdmin>
  );
};

export default DashboardAdminView;
