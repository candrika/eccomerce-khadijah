import React from "react";
import MainLayoutAdmin from "../../../layouts/MainLayoutAdmin";
import HeaderAdmin from "../../../components/reusableComponents/HeaderAdmin";
import City from "../../../componentAdmin/alamat/City";

const CityView = () => {
  return (
    <MainLayoutAdmin>
      <HeaderAdmin header={"Data City"} />
      <City />
    </MainLayoutAdmin>
  );
};

export default CityView;
