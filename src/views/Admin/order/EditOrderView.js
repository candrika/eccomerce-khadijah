import React from "react";
import MainLayoutAdmin from "../../../layouts/MainLayoutAdmin";
import HeaderAdmin from "../../../components/reusableComponents/HeaderAdmin";
import EditOrder from "../../../componentAdmin/order/EditOrder";

const EditOrderView = () => {
  return (
    <MainLayoutAdmin>
      <HeaderAdmin header={"Tambah Pesanan Baru"} />
      <EditOrder />
    </MainLayoutAdmin>
  );
};

export default EditOrderView;
