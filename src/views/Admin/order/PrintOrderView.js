import React from "react";
import MainLayoutAdmin from "../../../layouts/MainLayoutAdmin";
import HeaderAdmin from "../../../components/reusableComponents/HeaderAdmin";
import SemuaPesanan from "../../../componentAdmin/order/SemuaPesanan";
import PrintOrder from "../../../componentAdmin/order/PrintOrder";

const PrintOrderView = () => {
  return (
    <MainLayoutAdmin>
      <HeaderAdmin header={"Print"} />
      <PrintOrder />
    </MainLayoutAdmin>
  );
};

export default PrintOrderView;
