import React from "react";
import AddCustomer from "../../../componentAdmin/customer/AddCustomer";
import MainLayoutAdmin from "../../../layouts/MainLayoutAdmin";
import HeaderAdmin from "../../../components/reusableComponents/HeaderAdmin";

const AddCustomerView = () => {
  return (
    <MainLayoutAdmin>
      <HeaderAdmin header={"Data Customer"} />
      <AddCustomer />
    </MainLayoutAdmin>
  );
};

export default AddCustomerView;
