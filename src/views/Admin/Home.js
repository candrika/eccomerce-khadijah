import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import Sidebar from "../../componentAdmin/Home/Sidebar";
import Navbar from "../../componentAdmin/Home/Navbar";
import SettingColor from "../../componentAdmin/setting/SettingColor";
import MainLayoutAdmin from "../../layouts/MainLayoutAdmin";
import Report from "../../componentAdmin/report/Report";
import HeaderAdmin from "../../components/reusableComponents/HeaderAdmin";

const Home = () => {
  const { open, setOpen } = useContext(GlobalContext);

  return (
    <MainLayoutAdmin>
      <HeaderAdmin header={"Dashboard"} />
      {localStorage.getItem("role_id") == 3 ? (
        <p>dashboard member</p>
      ) : (
        <Report />
      )}
    </MainLayoutAdmin>
  );
};

export default Home;
