import React from "react";
import MainLayoutAdmin from "../../../layouts/MainLayoutAdmin";
import HeaderAdmin from "../../../components/reusableComponents/HeaderAdmin";
import SemuaPesanan from "../../../componentAdmin/order/SemuaPesanan";

const SemuaOrderView = () => {
  return (
    <MainLayoutAdmin>
      <HeaderAdmin header={"Semua Pesanan"} />
      <SemuaPesanan />
    </MainLayoutAdmin>
  );
};

export default SemuaOrderView;
