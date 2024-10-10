import React from "react";
import MainLayoutAdmin from "../../layouts/MainLayoutAdmin";
import HeaderAdmin from "../../components/reusableComponents/HeaderAdmin";
import DetailOrderMember from "../../componentAdmMember/Order/DetailOrderMember";

const DetailOrderMemberView = () => {
  return (
    <MainLayoutAdmin>
      <HeaderAdmin header={"Detail Order Members"} />
      <DetailOrderMember />
    </MainLayoutAdmin>
  );
};

export default DetailOrderMemberView;
