import React, { useEffect, useState } from "react";
import { Coba11 } from "../../components/reusableComponents/Text";
import axios from "axios";

const Rekening = () => {
  const [loading, setLoading] = useState(false);
  const [rekening, setRekening] = useState([]);

  const fetchContact = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://laravel-api-10.cerise.id/api/setting-generals/contact",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setRekening([response.data.data]);
      // console.log("respon", response.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchContact();
  }, []);
  return (
    <div>
      <Coba11 text="Rekening" />
    </div>
  );
};

export default Rekening;
