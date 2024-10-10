import React from "react";
import "../../style/Paragraph.css";

const Paragraph = (props) => {
  return (
    <div>
      <div className={`text-${props.variant}`}>{props.text}</div>
    </div>
  );
};

export default Paragraph;
