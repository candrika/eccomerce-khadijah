import filter from "../../assets/filter.png";
import search from "../../assets/search-interface-symbol.png";
import print from "../../assets_admin/print.png";

export const BtnAdmin1 = (props) => {
  return (
    <div className="flex justify-between items-center">
      <button
        onClick={props.onClick}
        className="border border-dark w-[auto] px-8 rounded-lg h-[45px] bg-b hover:bg-dark hover:text-white text-dark"
      >
        <p className="font-medium text-[15px] leading-[25px]">{props.text}</p>
      </button>
    </div>
  );
};

export const BtnAdmin2 = (props) => {
  return (
    <div className="flex justify-between items-center">
      <button className="border border-dark w-[200px] flex items-center justify-between px-4 rounded-lg h-[45px] bg-b hover:bg-dark hover:text-white text-dark">
        <p className="font-medium text-[15px] leading-[25px]">{props.text}</p>

        <img src={filter} alt="" className="w-[20px] ml-4" />
      </button>
    </div>
  );
};

export const BtnAdmin3 = (props) => {
  return (
    <div className="flex justify-between items-center">
      <button className="border hover:border-dark w-[200px] flex items-center justify-between px-4 rounded-lg h-[45px] hover:bg-white bg-dark text-white hover:text-dark">
        <p className="font-medium text-[15px] leading-[25px]">{props.text}</p>

        <p className="font-medium text-[15px] leading-[25px]">+</p>
      </button>
    </div>
  );
};

export const BtnAdmin4 = (props) => {
  return (
    <div className="flex justify-between items-center">
      <button className="border  w-auto flex items-center justify-between px-4 rounded-lg h-[30px] bg-primary text-white ">
        <p className="font-medium text-[11px] leading-[25px]">{props.text}</p>
      </button>
    </div>
  );
};

export const BtnAdmin5 = (props) => {
  return (
    <div className="flex justify-between items-center">
      <button className="border  w-auto flex items-center justify-between px-4 rounded-lg h-[30px] bg-gray-500 text-white ">
        <p className="font-medium text-[11px] leading-[25px]">{props.text}</p>
      </button>
    </div>
  );
};

export const BtnAdmin6 = (props) => {
  return (
    <div className="flex justify-between items-center px-4">
      <button className="border border-dark w-[auto] flex items-center justify-between px-4 rounded-lg h-[45px] bg-b hover:bg-dark hover:text-white text-dark">
        <img src={print} alt="" className="w-[20px] mr-2" />
        <p className="font-medium text-[15px] leading-[25px]">{props.text}</p>
      </button>
    </div>
  );
};

export const BtnAdmin7 = (props) => {
  return (
    <div className="flex justify-between items-center">
      <button className="border  w-auto flex items-center justify-between px-4 rounded-lg h-[30px] bg-warningHover  ">
        <p className="font-medium text-[11px] leading-[25px] text-warning">
          {props.text}
        </p>
      </button>
    </div>
  );
};

export const BtnAdmin8 = (props) => {
  return (
    <div className="flex justify-between items-center">
      <button className="border  w-auto flex items-center justify-between px-4 rounded-lg h-[30px] bg-lime">
        <p className="font-medium text-[11px] leading-[25px] text-primary">
          {props.text}
        </p>
      </button>
    </div>
  );
};

export const BtnAdmin9 = (props) => {
  return (
    <div className="flex justify-between items-center">
      <button className="border  w-auto flex items-center justify-between px-4 rounded-lg h-[30px] bg-red-500 text-white ">
        <p className="font-medium text-[11px] leading-[25px]">{props.text}</p>
      </button>
    </div>
  );
};

export const BtnAdmin10 = (props) => {
  return (
    <div className="flex justify-between items-center">
      <button
        className="border  w-auto flex items-center justify-between px-4 rounded-full h-[30px] bg-primary text-white "
        onClick={props.onClick}
      >
        <p className="font-medium text-[11px] leading-[25px]">{props.text}</p>
      </button>
    </div>
  );
};
