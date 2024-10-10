import React from "react";
import MainLayoutAdmin from "../../../layouts/MainLayoutAdmin";
import HeaderAdmin from "../../../components/reusableComponents/HeaderAdmin";
import AddChannel from "../../../componentAdmin/channel/AddChannel";

const AddChannelView = () => {
  return (
    <MainLayoutAdmin>
      <HeaderAdmin header={"Tambah Data Channel"} />
      <AddChannel />
    </MainLayoutAdmin>
  );
};

export default AddChannelView;
