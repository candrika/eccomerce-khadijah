import React, { useContext, useState } from "react";
import { Coba10 } from "../../../components/reusableComponents/Text";
import { GlobalContext } from "../../../context/GlobalContext";

const SettingLabelA6 = () => {
  const [selectedOption, setSelectedOption] = useState("option1");
  const { printA6, setPrintA6 } = useContext(GlobalContext);

  // console.log("selected Option", selectedOption);

  const handleCheckboxChange = (itemId) => {
    setPrintA6((prevData) =>
      prevData.map((item) =>
        item.id === itemId ? { ...item, status: !item.status } : item
      )
    );
  };

  // console.log("initialState", printA6);
  return (
    <div>
      <div className="grid grid-cols-12 gap-2 ">
        {printA6.map((item, index) => (
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

export default SettingLabelA6;
