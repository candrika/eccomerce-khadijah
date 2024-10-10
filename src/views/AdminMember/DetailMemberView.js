import React from "react";
import DataMember from "../../componentAdmMember/AddressMember/DataMember";
import MainLayoutAdmin from "../../layouts/MainLayoutAdmin";
import HeaderAdmin from "../../components/reusableComponents/HeaderAdmin";
import AddAddress from "../../componentAdmMember/AddressMember/AddAddress";
import DetailMember from "../../componentAdmMember/AddressMember/DetailMember";

const DetailMemberView = () => {
  return (
    <MainLayoutAdmin>
      <HeaderAdmin header={"Detail Data Member"} />
      <DetailMember />
    </MainLayoutAdmin>
  );
};

export default DetailMemberView;
