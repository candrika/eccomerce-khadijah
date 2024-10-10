import React, { useRef, useEffect, useState } from "react";
import backgroundImage from "../../assets/frontCard.jpg";
import html2canvas from "html2canvas";
import axios from "axios";

const CardMember = () => {
  const cardMemberRef = useRef(null);
  const [input, setInput] = useState([]);
  const [name, setName] = useState("");

  const generateImage = () => {
    if (cardMemberRef && cardMemberRef.current) {
      html2canvas(cardMemberRef.current).then((canvas) => {
        const link = document.createElement("a");
        link.download = "cardMember.png";
        link.href = canvas.toDataURL();
        link.click();
      });
    }
  };

  const fetchUserById = async () => {
    try {
      const response = await axios.get(
        `https://laravel-api-10.cerise.id/api/member`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("x", response.data.user.name);
      setInput(response.data.user.card_member);
      setName(response.data.user.name);
    } catch (error) {
      console.log(`${error} error`);
    }
  };

  useEffect(() => {
    fetchUserById();
  }, []);
  console.log("input", input);
  return (
    <div>
      <div
        className="relative mx-auto m-2 h-[30rem] w-[50rem] bg-cover bg-center bg-no-repeat rounded-lg shadow-md overflow-hidden"
        style={{ backgroundImage: `url(${backgroundImage})` }}
        ref={cardMemberRef}
      >
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="absolute inset-0 flex items-center justify-center text-white text-center">
          <div>
            <h2 className="text-4xl font-semibold -ml-[34rem] -mt-[8rem] text-warning">
              {name}
            </h2>
            <p className="text-lg -ml-[34rem] text-warning">
              {input.number_card}
            </p>
          </div>
        </div>
      </div>

      <button
        className="p-2 rounded shadow text-white bg-yellow-400 my-2 relative"
        onClick={generateImage}
      >
        Download Invoice
      </button>
    </div>
  );
};

export default CardMember;
