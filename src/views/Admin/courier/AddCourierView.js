import React from "react";
import MainLayoutAdmin from "../../../layouts/MainLayoutAdmin";
import HeaderAdmin from "../../../components/reusableComponents/HeaderAdmin";
import AddCourier from "../../../componentAdmin/courier/AddCourier";

const AddCourierView = () => {
  return (
    <MainLayoutAdmin>
      <HeaderAdmin header={"Data Kurir"} />
      <AddCourier />
    </MainLayoutAdmin>
  );
};

export default AddCourierView;
