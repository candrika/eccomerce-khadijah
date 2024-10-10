import React from "react";
import MainLayoutAdmin from "../../../layouts/MainLayoutAdmin";
import HeaderAdmin from "../../../components/reusableComponents/HeaderAdmin";
import Courier from "../../../componentAdmin/courier/Courier";

const CourierView = () => {
  return (
    <MainLayoutAdmin>
      <HeaderAdmin header={"Data Kurir"} />
      <Courier />
    </MainLayoutAdmin>
  );
};

export default CourierView;
