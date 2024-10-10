import React, { useContext, useState } from "react";
import { Coba10 } from "../../../components/reusableComponents/Text";
import { GlobalContext } from "../../../context/GlobalContext";

const SettingInvoice = () => {
  const [selectedOption, setSelectedOption] = useState("option1");
  const { printInvoice, setPrintInvoice } = useContext(GlobalContext);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleCheckboxChange = (itemId) => {
    setPrintInvoice((prevData) =>
      prevData.map((item) =>
        item.id === itemId ? { ...item, status: !item.status } : item
      )
    );
  };
  // console.log("initialState Invoice", printInvoice);

  return (
    <div>
      <div className="grid grid-cols-12 gap-2 ">
        {printInvoice.map((item, index) => (
          <div className="flex col-span-3" key={index}>
            <div>
              <input
                type="checkbox"
                name="vehicle1"
                value="detailOrder"
                onChange={() => handleCheckboxChange(item.id)}
                checked={item.status}
              ></input>
            </div>
            <div className="ml-2">
              <Coba10 text={item.name} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SettingInvoice;
