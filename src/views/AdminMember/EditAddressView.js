import React from "react";
import DataMember from "../../componentAdmMember/AddressMember/DataMember";
import MainLayoutAdmin from "../../layouts/MainLayoutAdmin";
import HeaderAdmin from "../../components/reusableComponents/HeaderAdmin";
import AddAddress from "../../componentAdmMember/AddressMember/AddAddress";
import EditAddress from "../../componentAdmMember/AddressMember/EditAddress";

const EditAddressView = () => {
  return (
    <MainLayoutAdmin>
      <HeaderAdmin header={"Edit Data Member"} />
      <EditAddress />
    </MainLayoutAdmin>
  );
};

export default EditAddressView;
