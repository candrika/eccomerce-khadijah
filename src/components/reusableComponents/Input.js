import search from "../../assets/search-interface-symbol.png";

export const InputSearch = (props) => {
  return (
    <div>
      <div className="flex justify-between w-[280px] h-auto items-center ">
        <input
          type="text"
          placeholder={props.text}
          className=" w-[290px] h-[40px] pl-3 border border-gray-400 rounded-lg text-gray-300"
        />
        <div className="relative right-8">
          <img src={search} alt="" className="w-[20px]" />
        </div>
      </div>
    </div>
  );
};
