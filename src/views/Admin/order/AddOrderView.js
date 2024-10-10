import React from "react";
import MainLayoutAdmin from "../../../layouts/MainLayoutAdmin";
import HeaderAdmin from "../../../components/reusableComponents/HeaderAdmin";
import AddOrder from "../../../componentAdmin/order/AddOrder";

const AddOrderView = () => {
  return (
    <MainLayoutAdmin>
      <HeaderAdmin header={"Tambah Pesanan Baru"} />
      <AddOrder />
    </MainLayoutAdmin>
  );
};

export default AddOrderView;
