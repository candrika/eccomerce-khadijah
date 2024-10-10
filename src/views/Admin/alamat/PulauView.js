import React from "react";
import MainLayoutAdmin from "../../../layouts/MainLayoutAdmin";
import HeaderAdmin from "../../../components/reusableComponents/HeaderAdmin";
import Pulau from "../../../componentAdmin/alamat/Pulau";

const PulauView = () => {
  return (
    <MainLayoutAdmin>
      <HeaderAdmin header={"Data Pulau"} />
      <Pulau />
    </MainLayoutAdmin>
  );
};

export default PulauView;
