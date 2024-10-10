import React from "react";
import MainLayoutAdmin from "../../../layouts/MainLayoutAdmin";
import HeaderAdmin from "../../../components/reusableComponents/HeaderAdmin";
import Contact from "../../../componentAdmin/contact/Contact";

const ContactAdminView = () => {
  return (
    <MainLayoutAdmin>
      <HeaderAdmin header={"Data Contact"} />
      <Contact />
    </MainLayoutAdmin>
  );
};

export default ContactAdminView;
