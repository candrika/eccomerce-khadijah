import React from "react";
import MainLayoutAdmin from "../../layouts/MainLayoutAdmin";
import HeaderAdmin from "../../components/reusableComponents/HeaderAdmin";
import AddAddress from "../../componentAdmMember/AddressMember/AddAddress";

const DashboardView = () => {
  return (
    <MainLayoutAdmin>
      <HeaderAdmin header={"Dashboard View"} />
      {/* <AddAddress /> */}
    </MainLayoutAdmin>
  );
};

export default DashboardView;
