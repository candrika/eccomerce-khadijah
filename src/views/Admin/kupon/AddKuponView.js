import React from "react";
import MainLayoutAdmin from "../../../layouts/MainLayoutAdmin";
import HeaderAdmin from "../../../components/reusableComponents/HeaderAdmin";
import AddKupon from "../../../componentAdmin/kupon/AddKupon";

const AddKuponView = () => {
  return (
    <MainLayoutAdmin>
      <HeaderAdmin header={"Add Data Kupon"} />
      <AddKupon />
    </MainLayoutAdmin>
  );
};

export default AddKuponView;
