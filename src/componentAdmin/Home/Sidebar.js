import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";
import { Coba2, Coba1 } from "../../components/reusableComponents/Text";
import logo from "../../assets/login.png";

import SidebarAdmin from "./SidebarAdmin";
import SidebarMember from "./SidebarMember";

const Sidebar = () => {
  const { open, setOpen } = useContext(GlobalContext);
  // untuk hide / show submenu
  const [submenu, setSubmenu] = useState(true);
  const [order, setOrder] = useState(true);
  const [produk, setProduk] = useState(true);

  // saat menu di klik
  const [click, setClick] = useState(false);

  return (
    <div className=" h-screen overscroll-auto  overflow-y-auto bg-white  ">
      <div className="px-4">
        <div className="flex items-center cursor-pointer justify-center py-3 border-b-[1px] border-[#EDEDED]/[0.3]">
          {open ? (
            <Coba1 text="Khadijah" />
          ) : (
            <div>
              <img src={logo} alt="" className="w-[20px]" />
            </div>
          )}
        </div>

        <div>
          {localStorage.getItem("role_id") == 3 ? (
            <SidebarMember />
          ) : (
            <SidebarAdmin />
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
