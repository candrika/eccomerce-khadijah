import React from "react";

const File = ({ img, ...rest }) => {
  return (
    <div>
      {img && <img className="" src={img} alt="preview" />}
      <input type="file" {...rest} />
    </div>
  );
};

export default File;
