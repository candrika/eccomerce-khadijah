import React from "react";
import DataMember from "../../componentAdmMember/AddressMember/DataMember";
import MainLayoutAdmin from "../../layouts/MainLayoutAdmin";
import HeaderAdmin from "../../components/reusableComponents/HeaderAdmin";
import AddAddress from "../../componentAdmMember/AddressMember/AddAddress";

const AddAddressView = () => {
  return (
    <MainLayoutAdmin>
      <HeaderAdmin header={"Add Data Member"} />
      <AddAddress />
    </MainLayoutAdmin>
  );
};

export default AddAddressView;
