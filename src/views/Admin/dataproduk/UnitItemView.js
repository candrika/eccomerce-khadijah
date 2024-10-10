import React from "react";
import MainLayoutAdmin from "../../../layouts/MainLayoutAdmin";
import HeaderAdmin from "../../../components/reusableComponents/HeaderAdmin";
import UnitItem from "../../../componentAdmin/produk/UnitItem";

const UnitItemView = () => {
  return (
    <MainLayoutAdmin>
      <HeaderAdmin header={"Data Unit Item"} />
      <UnitItem />
    </MainLayoutAdmin>
  );
};

export default UnitItemView;
