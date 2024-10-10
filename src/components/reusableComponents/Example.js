import React from "react";
import Button from "./Button";
import Paragraph from "./Paragraph";
import Input, { InputSearch } from "./Input";
import {
  Coba2,
  Coba1,
  Coba3,
  Coba4,
  Coba5,
  Coba6,
  Coba7,
  Coba8,
  Coba9,
  Coba10,
  Coba11,
  Coba12,
  Coba13,
  Coba14,
  Coba15,
} from "./Text";
import {
  BtnAdmin1,
  BtnAdmin10,
  BtnAdmin2,
  BtnAdmin3,
  BtnAdmin4,
  BtnAdmin5,
  BtnAdmin6,
  BtnAdmin7,
  BtnAdmin8,
  BtnAdmin9,
} from "./ButtonAdmin";
import { InputAdmin1 } from "./InputAdmin";

const Example = () => {
  return (
    <div>
      <div className="w-[90%] top-4 relative left-[5%] bg-gray-200 shadow-lg rounded-lg h-[500px]">
        <p className="text-left px-8 pt-4">BUTTON</p>
        <div className=" top-8 relative w-[90%] left-[5%] grid grid-cols-4 gap-4">
          <div>
            <Button text="button-1" variant="button-1" />
          </div>
          <div>
            <Button text="button-2" variant="button-2" />
          </div>
          <div>
            <BtnAdmin1 text="BtnAdmin1" />
          </div>
          <div>
            <BtnAdmin2 text="BtnAdmin2" />
          </div>
          <div>
            <BtnAdmin3 text="BtnAdmin3" />
          </div>
          <div>
            <BtnAdmin4 text="BtnAdmin4" />
          </div>
          <div>
            <BtnAdmin5 text="BtnAdmin5" />
          </div>
          <div>
            <BtnAdmin6 text="BtnAdmin6" />
          </div>
          <div>
            <BtnAdmin7 text="BtnAdmin7" />
          </div>
          <div>
            <BtnAdmin8 text="BtnAdmin8" />
          </div>
          <div>
            <BtnAdmin9 text="BtnAdmin9" />
          </div>
          <div>
            <BtnAdmin10 text="BtnAdmin10" />
          </div>
        </div>
      </div>

      <div className="w-[90%] top-8 mb-4 relative left-[5%] bg-gray-200 shadow-lg rounded-lg h-[200px]">
        <p className="text-left px-8 pt-4">PARAGRAPH</p>
        <div className=" top-8 relative w-[90%] left-[5%] grid grid-cols-3 gap-4">
          <div>
            <Paragraph text="Paragraph 1" variant="paragraph1" />
          </div>
          <div>
            <Paragraph text="Paragraph 2" variant="paragraph2" />
          </div>
          <div>
            <Paragraph text="Paragraph 3" variant="paragraph3" />
          </div>
          <div>
            <Paragraph text="Paragraph 4" variant="paragraph4" />
          </div>
          <div>
            <Paragraph text="Paragraph 5 h" variant="paragraph5" />
          </div>
          <div>
            <Paragraph text="Paragraph 6" variant="paragraph6" />
          </div>
          <div>
            <Paragraph text="Paragraph 7" variant="paragraph7" />
          </div>
          <div>
            <Paragraph text="Paragraph 8" variant="paragraph8" />
          </div>
          <div>
            <Paragraph text="Paragraph 9" variant="paragraph9" />
          </div>
        </div>
      </div>
      <div className="w-[90%] top-8 mb-4  relative left-[5%] bg-gray-200 shadow-lg rounded-lg h-[300px]">
        <p className="text-left px-8 pt-4">ADMIN PARAGRAPH</p>
        <div className=" top-8 relative w-[90%] left-[5%] grid grid-cols-3 gap-4">
          <Coba1 text="Coba1" />
          <Coba2 text="Coba2" />
          <Coba3 text="Coba3" />
          <Coba4 text="Coba4" />
          <Coba5 text="Coba5" />
          <Coba6 text="Coba6" />
          <Coba7 text="Coba7" />
          <Coba8 text="Coba8" />
          <Coba9 text="Coba9" />
          <Coba10 text="Coba10" />
          <Coba11 text="Coba11" />
          <Coba12 text="Coba12" />
          <Coba13 text="Coba13" />
          <Coba14 text="Coba14" />
          <Coba15 text="Coba15" />
        </div>

        <div className=" top-8 relative w-[90%] left-[5%] grid grid-cols-3 gap-4"></div>
      </div>

      <div className="w-[90%] top-8 mb-4  relative left-[5%] bg-gray-200 shadow-lg rounded-lg h-[200px]">
        <p className="text-left px-8 pt-4">ADMIN INPUT</p>

        <div>
          <InputSearch text="coba input" />
          <InputAdmin1 text="InputAdmin1" />
        </div>
      </div>
    </div>
  );
};

export default Example;
