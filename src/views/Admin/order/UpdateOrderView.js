import React from "react";
import MainLayoutAdmin from "../../../layouts/MainLayoutAdmin";
import HeaderAdmin from "../../../components/reusableComponents/HeaderAdmin";
import UpdateOrder from "../../../componentAdmin/order/UpdateOrder";

const UpdateOrderView = () => {
  return (
    <MainLayoutAdmin>
      <HeaderAdmin header={"Update Order"} />
      <UpdateOrder />
    </MainLayoutAdmin>
  );
};

export default UpdateOrderView;
