import React from "react";
import MainLayoutAdmin from "../../../layouts/MainLayoutAdmin";
import HeaderAdmin from "../../../components/reusableComponents/HeaderAdmin";
import City from "../../../componentAdmin/alamat/City";
import NewAddress from "../../../componentAdmin/alamat/NewAddress";

const NewAddressView = () => {
  return (
    <MainLayoutAdmin>
      <HeaderAdmin header={"Data Alamat"} />
      <NewAddress />
    </MainLayoutAdmin>
  );
};

export default NewAddressView;
