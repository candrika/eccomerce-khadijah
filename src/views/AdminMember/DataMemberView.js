import React from "react";
import DataMember from "../../componentAdmMember/AddressMember/DataMember";
import MainLayoutAdmin from "../../layouts/MainLayoutAdmin";
import HeaderAdmin from "../../components/reusableComponents/HeaderAdmin";

const DataMemberView = () => {
  return (
    <MainLayoutAdmin>
      <HeaderAdmin header={"Data Member"} />
      <DataMember />
    </MainLayoutAdmin>
  );
};

export default DataMemberView;
