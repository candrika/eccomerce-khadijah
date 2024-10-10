import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";
import { Coba2 } from "../../components/reusableComponents/Text";
import pesanan from "../../assets_admin/shopping-list.png";
import setting from "../../assets_admin/settings.png";
import dashboard from "../../assets_admin/dashboard.png";

const SidebarMember = () => {
  const { open, setOpen } = useContext(GlobalContext);
  const [submenu, setSubmenu] = useState(true);
  const [submenuOrder, setSubmenuOrder] = useState(true);
  const [order, setOrder] = useState(true);
  const [produk, setProduk] = useState(true);
  const [activeItem, setActiveItem] = useState(null);

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
    localStorage.setItem("activeItem", itemName); // Save the selected item in localStorage
    // console.log("first", activeItem);
  };

  useEffect(() => {
    // When the component mounts, check if there's an active item in localStorage
    const storedItem = localStorage.getItem("activeItem");
    setActiveItem(storedItem);
  }, []);

  // saat menu di klik
  const [click, setClick] = useState(false);

  return (
    <div>
      <div className="">
        <div className="border-b-[1px] border-[#EDEDED]/[0.3]">
          {/*<div*/}
          {/*  className={`${*/}
          {/*    submenuOrder ? "opacity-100" : "opacity-0 relative hidden"*/}
          {/*  } "pl-4 transition-hidden duration-500 ease-in-out "`}*/}
          {/*>*/}
          {/*  <Link to="/dashboard-member">*/}
          {/*    <div*/}
          {/*      onClick={() => handleItemClick("dashboard")}*/}
          {/*      className={`hover:bg-blue  hover:rounded-xl flex items-center  justify-between gap-[10px] py-[15px] cursor-pointer ${*/}
          {/*        activeItem == "dashboard"*/}
          {/*          ? "bg-gray-200 rounded-md"*/}
          {/*          : "bg-white"*/}
          {/*      } `}*/}
          {/*    >*/}
          {/*      <div*/}
          {/*        className={`${*/}
          {/*          open ? "pl-2 flex items-center gap-[10px]" : "pl-0"*/}
          {/*        }`}*/}
          {/*      >*/}
          {/*        <img src={dashboard} alt="" className="w-[18px]" />*/}
          {/*        <div*/}
          {/*          className={`${*/}
          {/*            open ? "pl-4" : " hidden "*/}
          {/*          } "pl-4 transition-display duration-100 ease-in-out"`}*/}
          {/*        >*/}
          {/*          <Coba2 text="Dashboard" />*/}
          {/*        </div>*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*  </Link>*/}
          {/*</div>*/}
        </div>
        {/* ADDRESS */}
        <div className="border-b-[1px] border-[#EDEDED]/[0.3]">
          <div
            className={`${
              open ? "text-left" : "hidden"
            } " relative flex justify-between w-[100%]"`}
          >
            <Coba2 text="MANAGEMENT USER" />
            <div>
              <button
                onClick={() => setSubmenuOrder(!submenuOrder)}
                className="text-dark"
              >
                {submenuOrder ? "-" : "+"}
              </button>
            </div>
          </div>

          <div
            className={`${
              submenuOrder ? "opacity-100" : "opacity-0 relative hidden"
            } "pl-4 transition-hidden duration-500 ease-in-out"`}
          >
            <Link to="/member/member-view">
              <div
                onClick={() => handleItemClick("userSetting")}
                className={`hover:bg-blue  hover:rounded-xl flex items-center  justify-between gap-[10px] py-[15px] cursor-pointer ${
                  activeItem == "userSetting"
                    ? "bg-gray-200 rounded-md"
                    : "bg-white"
                } `}
              >
                <div
                  className={`${
                    open ? "pl-2 flex items-center gap-[10px]" : "pl-0"
                  }`}
                >
                  <img src={setting} alt="" className="w-[18px]" />
                  <div
                    className={`${
                      open ? "pl-4" : " hidden "
                    } "pl-4 transition-display duration-100 ease-in-out"`}
                  >
                    <Coba2 text="User Setting" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* ORDER */}
        <div className="border-b-[1px] border-[#EDEDED]/[0.3]">
          <div
            className={`${
              open ? "text-left" : "hidden"
            } " relative flex justify-between w-[100%]"`}
          >
            <Coba2 text="ORDER" />
            <div>
              <button
                onClick={() => setSubmenu(!submenu)}
                className="text-dark"
              >
                {submenu ? "-" : "+"}
              </button>
            </div>
          </div>

          <div
            className={`${
              submenu ? "opacity-100" : "opacity-0 relative hidden"
            } "pl-4 transition-hidden duration-500 ease-in-out"`}
          >
            <Link to="/pesanan-baru-member">
              <div
                onClick={() => handleItemClick("pesanan")}
                className={`hover:bg-blue  hover:rounded-xl flex items-center  justify-between gap-[10px] py-[15px] cursor-pointer ${
                  activeItem == "pesanan"
                    ? "bg-gray-200 rounded-md"
                    : "bg-white"
                } `}
              >
                <div
                  className={`${
                    open ? "pl-2 flex items-center gap-[10px]" : "pl-0"
                  }`}
                >
                  <img src={pesanan} alt="" className="w-[18px]" />
                  <div
                    className={`${
                      open ? "pl-4" : " hidden "
                    } "pl-4 transition-display duration-100 ease-in-out"`}
                  >
                    <Coba2 text="Pesanan Baru" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarMember;
