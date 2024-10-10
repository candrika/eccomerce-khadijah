import React from "react";
import MainLayoutAdmin from "../../../layouts/MainLayoutAdmin";
import HeaderAdmin from "../../../components/reusableComponents/HeaderAdmin";
import Channel from "../../../componentAdmin/channel/Channel";

const ChannelView = () => {
  return (
    <MainLayoutAdmin>
      <HeaderAdmin header={"Data Channel"} />
      <Channel />
    </MainLayoutAdmin>
  );
};

export default ChannelView;
