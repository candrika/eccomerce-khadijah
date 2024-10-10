import React from "react";
import HeaderAdmin from "../../../components/reusableComponents/HeaderAdmin";
import MainLayoutAdmin from "../../../layouts/MainLayoutAdmin";
import Customer from "../../../componentAdmin/customer/Customer";

const CustomerView = () => {
  return (
    <MainLayoutAdmin>
      <HeaderAdmin header={"Data Customer"} />
      <Customer />
    </MainLayoutAdmin>
  );
};

export default CustomerView;
