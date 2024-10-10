import React from "react";
import MainLayoutAdmin from "../../../layouts/MainLayoutAdmin";
import HeaderAdmin from "../../../components/reusableComponents/HeaderAdmin";
import EditCourier from "../../../componentAdmin/courier/EditCourier";

const EditCourierView = () => {
  return (
    <MainLayoutAdmin>
      <HeaderAdmin header={"Data Kurir"} />
      <EditCourier />
    </MainLayoutAdmin>
  );
};

export default EditCourierView;
