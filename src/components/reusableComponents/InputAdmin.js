export const InputAdmin1 = (props) => {
  return (
    <div>
      <div className="flex justify-between w-[100%] h-[40px] items-center ">
        <input
          type="text"
          placeholder={props.text}
          name={props.name}
          value={props.value}
          onBlur={props.onBlur}
          className=" w-[100%] h-[40px] pl-3 border bg-gray-100 rounded-lg "
        />
      </div>
    </div>
  );
};
