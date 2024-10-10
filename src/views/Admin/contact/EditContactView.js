import React from "react";
import MainLayoutAdmin from "../../../layouts/MainLayoutAdmin";
import HeaderAdmin from "../../../components/reusableComponents/HeaderAdmin";
import ContactEdit from "../../../componentAdmin/contact/ContactEdit";

const EditContactView = () => {
  return (
    <MainLayoutAdmin>
      <HeaderAdmin header={"Edit Data Contact"} />
      <ContactEdit />
    </MainLayoutAdmin>
  );
};

export default EditContactView;
