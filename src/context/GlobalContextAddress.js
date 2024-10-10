import { createContext, useState } from "react";
import axios from "axios";

export const GlobalContextAddress = createContext();
// komponen provider
export const GlobalProviderAddress = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [pulau, setPulau] = useState([]);
  const [provinsi, setProvinsi] = useState([]);
  const [city, setCity] = useState([]);
  const [userSetting, setUserSetting] = useState([]);
  const [userAddress, setUserAddress] = useState([]);

  const fetchPulau = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://laravel-api-10.cerise.id/api/islands",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setPulau(response.data.data);
      // console.log("respon", response.data.data);
      setLoading(false);
    } catch (error) {
      // console.log(error);
    }
  };

  const fetchProvinsi = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://laravel-api-10.cerise.id/api/provinces",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setProvinsi(response.data.message);
      // console.log("respon", response.data.message);
      setLoading(false);
    } catch (error) {
      // console.log(error);
    }
  };

  const fetchCity = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://laravel-api-10.cerise.id/api/cities",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setCity(response.data.success.data);
      // console.log("respon", response.data.success.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      // console.log(error);
    }
  };

  const fetchUserSetting = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://laravel-api-10.cerise.id/api/member",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setUserSetting([response.data.user]);
      // console.log("respon member", response.data.data);
      setUserAddress(response.data.allAddress);

      // console.log("member", response.data.message);
      // console.log("member", response);
      // console.log("memberAddress", response);
      setLoading(false);
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <GlobalContextAddress.Provider
      value={{
        pulau: pulau,
        setPulau: setPulau,
        fetchPulau: fetchPulau,
        provinsi: provinsi,
        setProvinsi: setProvinsi,
        fetchProvinsi: fetchProvinsi,
        city: city,
        setCity: setCity,
        fetchCity: fetchCity,
        userSetting: userSetting,
        setUserSetting: setUserSetting,
        fetchUserSetting: fetchUserSetting,
        userAddress: userAddress,
        setUserAddress: setUserAddress,
        loading,
      }}
    >
      {children}
    </GlobalContextAddress.Provider>
  );
};
