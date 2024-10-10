import React, { useState } from "react";
import { Coba10, Coba4, Coba5 } from "../../components/reusableComponents/Text";
import fragile from "../../assets_admin/fragile.png";
import Invoice from "./Print/Invoice";
import LabelA6 from "./Print/LabelA6";
import SettingInvoice from "./Print/SettingInvoice";
import SettingLabelA6 from "./Print/SettingLabelA6";

const PrintOrder = () => {
  const [selectedOption, setSelectedOption] = useState("option1");

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  // console.log("selected Option", selectedOption);

  // Create a state variable to hold the data
  return (
    <div>
      <div className="relative w-[90%] md:w-[98%] left-[5%] md:left-0  grid grid-cols-1 md:grid-cols-12 gap-2">
        <div className="col-span-12 md:col-span-4 bg-white text-left rounded-lg p-4">
          <Coba4 text="Pengaturan Cetak" />
          <div className=" ">
            <div className=" items-center">
              <input
                type="radio"
                className="form-radio"
                value="option1"
                checked={selectedOption === "option1"}
                onChange={handleOptionChange}
              />
              <span className="ml-2">Shipping Label A6</span>
            </div>
            <div className=" items-center">
              <input
                type="radio"
                className="form-radio"
                value="option2"
                checked={selectedOption === "option2"}
                onChange={handleOptionChange}
              />
              <span className="ml-2">Invoice</span>
            </div>
          </div>
        </div>
        <div className="col-span-12 md:col-span-8 bg-white text-left rounded-lg p-4">
          <Coba4 text="Pengaturan" />
          {selectedOption === "option1" ? (
            <div>
              <SettingLabelA6 />
            </div>
          ) : (
            <div>
              <SettingInvoice />
            </div>
          )}
        </div>
      </div>
      <div className="mt-4 relative w-[90%] md:w-[98%] left-[5%] md:left-0  bg-white p-4">
        {selectedOption === "option1" ? (
          <div>
            <LabelA6 />
          </div>
        ) : (
          <div>
            <Invoice />
          </div>
        )}
      </div>
    </div>
  );
};

export default PrintOrder;
