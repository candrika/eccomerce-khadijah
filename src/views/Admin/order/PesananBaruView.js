import React from "react";
import PesananBaru from "../../../componentAdmin/order/PesananBaru";
import MainLayoutAdmin from "../../../layouts/MainLayoutAdmin";
import HeaderAdmin from "../../../components/reusableComponents/HeaderAdmin";

const PesananBaruView = () => {
  return (
    <MainLayoutAdmin>
      <HeaderAdmin header={"Pesanan Baru"} />
      <PesananBaru />
    </MainLayoutAdmin>
  );
};

export default PesananBaruView;
