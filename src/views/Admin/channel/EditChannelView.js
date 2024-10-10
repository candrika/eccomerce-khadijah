import React from "react";
import MainLayoutAdmin from "../../../layouts/MainLayoutAdmin";
import HeaderAdmin from "../../../components/reusableComponents/HeaderAdmin";
import EditChannel from "../../../componentAdmin/channel/EditChannel";

const EditChannelView = () => {
  return (
    <MainLayoutAdmin>
      <HeaderAdmin header={"Edit Data Channel"} />
      <EditChannel />
    </MainLayoutAdmin>
  );
};

export default EditChannelView;
