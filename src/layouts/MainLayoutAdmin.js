import React, { useContext } from "react";
import Sidebar from "../componentAdmin/Home/Sidebar";
import Navbar from "../componentAdmin/Home/Navbar";
import { GlobalContext } from "../context/GlobalContext";

const MainLayoutAdmin = (props) => {
  const { open, setOpen } = useContext(GlobalContext);
  return (
    <React.Fragment>
      <div className="flex relative justify-between ">
        <div
          className={`${
            open ? "w-[250px]  fixed  " : "w-[50px] fixed  "
          }  duration-500  h-[100vh] border z-20 `}
        >
          <Sidebar />
        </div>
        <div
          className={`${
            open ? "w-[100%] " : "w-[100%] border"
          } fixed   h-[50px]  z-20  `}
        >
          <Navbar />
        </div>
        <div
          className={`${
            open
              ? "transition-all duration-300 relative w-[83%] left-[17%] pl-[50px]  "
              : " transition-all duration-300 pl-[50px] sm:pl-[40px] md:pl-[40px]  relative  pr-0 md:pr-4 w-[100%] sm:w-[97%]  left-0 md:left-[3%] "
          } pt-[60px] bg-gray-100 h-auto min-h-screen -bottom-8 pb-[50px]  overflow-x-hidden`}
        >
          {props.children}
        </div>
      </div>
    </React.Fragment>
  );
};

export default MainLayoutAdmin;
