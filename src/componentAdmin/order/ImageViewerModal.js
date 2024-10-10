import React from "react";
import cancel from "../../assets/cancel.png";

const ImageViewerModal = ({ imageUrl, closeModal }) => {
  return (
    <div className=" z-10 fixed top-0 left-0 w-[100%] h-[100%] flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white  rounded-md p-[20px] shadow-md max-w-[80%] max-h-[80%] overflow-auto">
        <div className=" w-[55%] fixed text-end flex justify-end ">
          <button className="close-button" onClick={closeModal}>
            <img src={cancel} alt="" className="w-[20px]" />
          </button>
        </div>
        <div className="modal-content">
          <img src={imageUrl} alt={imageUrl} className="w-[800px]" />
        </div>
      </div>
    </div>
  );
};

export default ImageViewerModal;
