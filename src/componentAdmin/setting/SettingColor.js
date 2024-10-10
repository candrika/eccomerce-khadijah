import React, { useState } from "react";
import {
  Coba1,
  Coba11,
  Coba4,
  Coba6,
} from "../../components/reusableComponents/Text";
import colorPicker from "../../assets_admin/color-wheel.png";
import { useNavigate } from "react-router-dom";
import { BtnAdmin1 } from "../../components/reusableComponents/ButtonAdmin";
import FontPicker from "./FontPicker";
import SettingLogo from "./SettingLogo";
import Banners from "../banner/Banners";
import SettingRekening from "./SettingRekening";

const SettingColor = () => {
  const [colorNavbar, setColorNavbar] = useState(
    localStorage.getItem("color-navbar")
  );
  const [colorTextNavbar, setColorTextNavbar] = useState(
    localStorage.getItem("color-text-navbar")
  );
  const [hide, setHide] = useState(true);
  const [hideFont, setHideFont] = useState(true);
  const navigate = useNavigate();

  const handleColorChange = (event) => {
    setColorNavbar(event.target.value);
    window.location.reload();
  };
  const handleTextColorNavbarChange = (event) => {
    setColorTextNavbar(event.target.value);
  };

  const simpanData = () => {
    localStorage.setItem("color-text-navbar", colorTextNavbar);
    localStorage.setItem("color-navbar", colorNavbar);
    alert("berhasil set color sidebar");
    window.location.reload(false);
  };

  // console.log(localStorage.getItem("color-navbar"));
  return (
    <div className="relative w-[99%] left-[50px] md:left-[10px]   h-[100vh] overflow-y-scroll">
      <div className=" relative ">
        <div className=" ">
          <div className=" flex  justify-between items-center text-left pt-[10px] h-[50px] w-[95%] border-b-[1px] border-[#FFFFFS]/[0.3]">
            <Coba1 text="Setting General " />
          </div>
        </div>
        <div className="bg-gray-100 w-[85%] lg:w-[95%] rounded-lg p-4 my-4">
          <div className="flex justify-between items-center text-left pt-[10px] h-[50px] w-[95%] border-b-[1px] border-[#FFFFFS]/[0.3]">
            <Coba4 text="Color Picker" />
            <button onClick={() => setHide(!hide)}>+</button>
          </div>

          <div>
            <div
              className={`${
                hide
                  ? "relative h-auto transition ease-in-out delay-150 duration-700"
                  : "hidden max-h-none transition ease-in-out delay-150 duration-700"
              } "duration-300 ease-in-out"`}
            >
              <div className=" grid xl:grid-cols-2  grid-cols-1  ">
                <div className="flex relative my-4 w-[95%] lg:w-[95%] bg-white rounded-lg p-2 shadow-sm">
                  <div className=" w-[100%] text-left">
                    <Coba11 text="Navbar Color" />
                    <Coba6
                      text="Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Est aspernatur quia."
                    />
                  </div>
                  <div className=" text-left border-b-[1px] border-[#EDEDED]/[0.3]">
                    <input
                      type="color"
                      value={colorNavbar}
                      name="colorNavbar"
                      onChange={handleColorChange}
                      className="bg-transparent border-none "
                    />
                  </div>
                </div>
                <div className="flex relative my-4 w-[95%] lg:w-[95%] bg-white rounded-lg p-2 shadow-sm">
                  <div className=" w-[100%] text-left">
                    <Coba11 text="Sidebar Color" />
                    <Coba6
                      text="Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Est aspernatur quia."
                    />
                  </div>
                  <div className=" text-left border-b-[1px] border-[#EDEDED]/[0.3]">
                    <input
                      type="color"
                      value={colorNavbar}
                      name="colorNavbar"
                      onChange={handleColorChange}
                      className="bg-transparent border-none "
                    />
                  </div>
                </div>
                <div className="flex relative my-4 w-[95%] lg:w-[95%] bg-white rounded-lg p-2 shadow-sm">
                  <div className=" w-[100%] text-left">
                    <Coba11 text="Main Color" />
                    <Coba6
                      text="Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Est aspernatur quia."
                    />
                  </div>
                  <div className=" text-left border-b-[1px] border-[#EDEDED]/[0.3]">
                    <input
                      type="color"
                      value={colorNavbar}
                      name="colorNavbar"
                      onChange={handleColorChange}
                      className="bg-transparent border-none "
                    />
                  </div>
                </div>
                <div className="flex relative my-4 w-[95%] lg:w-[95%] bg-white rounded-lg p-2 shadow-sm">
                  <div className=" w-[100%] text-left">
                    <Coba11 text="Text Button Color" />
                    <Coba6
                      text="Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Est aspernatur quia."
                    />
                  </div>
                  <div className=" text-left border-b-[1px] border-[#EDEDED]/[0.3]">
                    <input
                      type="color"
                      value={colorNavbar}
                      name="colorNavbar"
                      onChange={handleColorChange}
                      className="bg-transparent border-none "
                    />
                  </div>
                </div>
                <div className="flex relative my-4 w-[95%] lg:w-[95%] bg-white rounded-lg p-2 shadow-sm">
                  <div className=" w-[100%] text-left">
                    <Coba11 text="Button Color" />
                    <Coba6
                      text="Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Est aspernatur quia."
                    />
                  </div>
                  <div className=" text-left border-b-[1px] border-[#EDEDED]/[0.3]">
                    <input
                      type="color"
                      value={colorNavbar}
                      name="colorNavbar"
                      onChange={handleColorChange}
                      className="bg-transparent border-none "
                    />
                  </div>
                </div>
                <div className="flex relative my-4 w-[95%] lg:w-[95%] bg-white rounded-lg p-2 shadow-sm">
                  <div className=" w-[100%] text-left">
                    <Coba11 text="Hover Button Color" />
                    <Coba6
                      text="Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Est aspernatur quia."
                    />
                  </div>
                  <div className=" text-left border-b-[1px] border-[#EDEDED]/[0.3]">
                    <input
                      type="color"
                      value={colorNavbar}
                      name="colorNavbar"
                      onChange={handleColorChange}
                      className="bg-transparent border-none "
                    />
                  </div>
                </div>
                <div className="flex relative my-4 w-[95%] lg:w-[95%] bg-white rounded-lg p-2 shadow-sm">
                  <div className=" w-[100%] text-left">
                    <Coba11 text="Link Text Color" />
                    <Coba6
                      text="Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Est aspernatur quia."
                    />
                  </div>
                  <div className=" text-left border-b-[1px] border-[#EDEDED]/[0.3]">
                    <input
                      type="color"
                      value={colorNavbar}
                      name="colorNavbar"
                      onChange={handleColorChange}
                      className="bg-transparent border-none "
                    />
                  </div>
                </div>
                <div className="flex relative my-4 w-[95%] lg:w-[95%] bg-white rounded-lg p-2 shadow-sm">
                  <div className=" w-[100%] text-left">
                    <Coba11 text="Active  Text Color" />
                    <Coba6
                      text="Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Est aspernatur quia."
                    />
                  </div>
                  <div className=" text-left border-b-[1px] border-[#EDEDED]/[0.3]">
                    <input
                      type="color"
                      value={colorNavbar}
                      name="colorNavbar"
                      onChange={handleColorChange}
                      className="bg-transparent border-none "
                    />
                  </div>
                </div>
                <div className="flex relative my-4 w-[95%] lg:w-[95%] bg-white rounded-lg p-2 shadow-sm">
                  <div className=" w-[100%] text-left">
                    <Coba11 text="Link Hover  Text Color" />
                    <Coba6
                      text="Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Est aspernatur quia."
                    />
                  </div>
                  <div className=" text-left border-b-[1px] border-[#EDEDED]/[0.3]">
                    <input
                      type="color"
                      value={colorNavbar}
                      name="colorNavbar"
                      onChange={handleColorChange}
                      className="bg-transparent border-none "
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-100 w-[85%] lg:w-[95%] rounded-lg p-4 my-4">
          <div className="flex justify-between items-center text-left pt-[10px] h-[50px] w-[95%] border-b-[1px] border-[#FFFFFS]/[0.3]">
            <Coba4 text="Font Picker" />
            <button onClick={() => setHideFont(!hideFont)}>+</button>
          </div>

          <div>
            <div
              className={`${
                hideFont
                  ? "relative h-auto transition ease-in-out delay-150 duration-700"
                  : "hidden max-h-none transition ease-in-out delay-150 duration-700"
              } "duration-300 ease-in-out"`}
            >
              <div className=" grid xl:grid-cols-2  grid-cols-1  ">
                <div className="flex relative my-4 w-[95%] lg:w-[95%] bg-white rounded-lg p-2 shadow-sm">
                  <div className=" w-[100%] text-left">
                    <Coba11 text="H1 Font" />
                    <FontPicker />
                  </div>
                </div>
                <div className="flex relative my-4 w-[95%] lg:w-[95%] bg-white rounded-lg p-2 shadow-sm">
                  <div className=" w-[100%] text-left">
                    <Coba11 text="H2 Font" />
                    <FontPicker />
                  </div>
                </div>
                <div className="flex relative my-4 w-[95%] lg:w-[95%] bg-white rounded-lg p-2 shadow-sm">
                  <div className=" w-[100%] text-left">
                    <Coba11 text="H3 Font" />
                    <FontPicker />
                  </div>
                </div>
                <div className="flex relative my-4 w-[95%] lg:w-[95%] bg-white rounded-lg p-2 shadow-sm">
                  <div className=" w-[100%] text-left">
                    <Coba11 text="H4 Font" />
                    <FontPicker />
                  </div>
                </div>
                <div className="flex relative my-4 w-[95%] lg:w-[95%] bg-white rounded-lg p-2 shadow-sm">
                  <div className=" w-[100%] text-left">
                    <Coba11 text="H5 Font" />
                    <FontPicker />
                  </div>
                </div>
                <div className="flex relative my-4 w-[95%] lg:w-[95%] bg-white rounded-lg p-2 shadow-sm">
                  <div className=" w-[100%] text-left">
                    <Coba11 text="p Font" />
                    <FontPicker />
                  </div>
                </div>
                <div className="flex relative my-4 w-[95%] lg:w-[95%] bg-white rounded-lg p-2 shadow-sm">
                  <div className=" w-[100%] text-left">
                    <Coba11 text="Span Font" />
                    <FontPicker />
                  </div>
                </div>
                <div className="flex relative my-4 w-[95%] lg:w-[95%] bg-white rounded-lg p-2 shadow-sm">
                  <div className=" w-[100%] text-left">
                    <Coba11 text="Logo" />
                    <FontPicker />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-100 w-[85%] lg:w-[95%] rounded-lg p-4 my-4">
          <div className="flex justify-between items-center text-left pt-[10px] h-[50px] w-[95%] border-b-[1px] border-[#FFFFFS]/[0.3]">
            <Coba4 text="Font Picker" />
            <button onClick={() => setHideFont(!hideFont)}>+</button>
          </div>

          <div>
            <div
              className={`${
                hideFont
                  ? "relative h-auto transition ease-in-out delay-150 duration-700"
                  : "hidden max-h-none transition ease-in-out delay-150 duration-700"
              } "duration-300 ease-in-out"`}
            >
              <div className=" grid xl:grid-cols-2  grid-cols-1  ">
                <div className="flex relative my-4 w-[95%] lg:w-[95%] bg-white rounded-lg p-2 shadow-sm">
                  <div className=" w-[100%] text-left">
                    <Coba11 text="H1 Font" />
                    <FontPicker />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-start  w-[90%] relative left-[2%]">
          <BtnAdmin1 onClick={() => simpanData()} text="Save" />
        </div>
      </div>

      <div className="mt-8">
        <SettingRekening />
      </div>
      <div className="mt-8">
        <SettingLogo />
      </div>
      <div className="mt-8">
        <Banners />
      </div>
    </div>
  );
};

export default SettingColor;
