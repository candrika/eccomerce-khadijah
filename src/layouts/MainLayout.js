import React from "react";
import Navbar from "../components/customer/Navbar";
import Footer from "../components/customer/Footer";
import Jumbotron from "../components/customer/Jumbotron";

const MainLayout = (props) => {
  return (
    <React.Fragment>
      <Navbar />
      <Jumbotron />
      {props.children}
      <Footer />
    </React.Fragment>
  );
};

export default MainLayout;
