import React from "react";
import MainLayoutAdmin from "../../layouts/MainLayoutAdmin";
import HeaderAdmin from "../../components/reusableComponents/HeaderAdmin";
import PesananBaruMember from "../../componentAdmMember/Order/PesananBaruMember";

const PesananBaruMemberView = () => {
  return (
    <MainLayoutAdmin>
      <HeaderAdmin header={"Pesanan Baru"} />
      <PesananBaruMember />
    </MainLayoutAdmin>
  );
};

export default PesananBaruMemberView;
