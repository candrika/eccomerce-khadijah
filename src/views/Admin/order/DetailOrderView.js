import React from "react";
import MainLayoutAdmin from "../../../layouts/MainLayoutAdmin";
import HeaderAdmin from "../../../components/reusableComponents/HeaderAdmin";
import DetailOrder from "../../../componentAdmin/order/DetailOrder";

const DetailOrderView = () => {
  return (
    <MainLayoutAdmin>
      <HeaderAdmin header={"Detail Order"} />
      <DetailOrder />
    </MainLayoutAdmin>
  );
};

export default DetailOrderView;
