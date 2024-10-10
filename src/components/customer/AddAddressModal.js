import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GlobalContext } from "../../context/GlobalContext";
import { GlobalContextAddress } from "../../context/GlobalContextAddress";
import { Coba10 } from "../../components/reusableComponents/Text";
import { InputAdmin1 } from "../../components/reusableComponents/InputAdmin";
import { BtnAdmin1 } from "../../components/reusableComponents/ButtonAdmin";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import Select from "react-select";

const schemaValidation = Yup.object({
  detail_alamat: Yup.string().required("Detail Alamat Wajib diisi"),
});
const AddAddressModal = () => {
  const [idUser, setIdUser] = useState("");

  const [cities, setCities] = useState([]);
  const [cityID, setCityId] = useState("");
  const [selectedCity, setSelectedCity] = useState();
  const [kecamatan, setKecamatan] = useState([]);
  const [selectedKecamatan, setSelectedKecamatan] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIsland, setSelectedIsland] = useState(null);
  const { setIsModalAddressOpen, setIsModalAddAddressOpen, fetchUserMember } =
    useContext(GlobalContext);
  const navigate = useNavigate();
  const [input, setInput] = useState({
    detail_alamat: "",
  });
  const Swal = require("sweetalert2");

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
      // console.log("x", response.data.user.id);
      setIdUser(response.data.user.id);
    } catch (error) {
      console.log(`${error} error`);
    }
  };
  const fetchCities = async (query) => {
    try {
      const response = await axios.get(
        `https://laravel-api-10.cerise.id/api/rajaongkir/cities?nameCities=${query}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setCities(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchKecamatan = async () => {
    try {
      const response = await axios.get(
        `https://laravel-api-10.cerise.id/api/rajaongkir/cities-subdistrict/${cityID}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setKecamatan(response.data);
    } catch (error) {
      console.log("Error in fetchKecamatan:", error);
    }
  };
  const handleChange = (event) => {
    if (event.target.name === "detail_alamat") {
      setInput({ ...input, detail_alamat: event.target.value });
    }
  };
  const options = cities.map((city) => ({
    value: city.city_id,
    label: city.city_name,
    province: city.province,
  }));
  const optionsKecamatan = kecamatan.map((item) => ({
    value: item.subdistrict_id,
    label: item.subdistrict_name,
  }));
  useEffect(() => {
    fetchCities();
    fetchUserById();
  }, []);

  useEffect(() => {
    if (cityID !== null) {
      fetchKecamatan();
    }
  }, [cityID]);

  // console.log("membeer user login");

  const onSubmit = async () => {
    try {
      const response = await axios.post(
        `https://laravel-api-10.cerise.id/api/member/add/address/${idUser}`,
        {
          province: selectedCity.province,
          city: selectedCity.label,
          city_id: selectedCity.value,
          subdistrict_name: selectedKecamatan.label,
          detail_alamat: input.detail_alamat,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchUserMember();
      setIsModalAddAddressOpen(false);
      setIsModalAddressOpen(true);
      Swal.fire({
        title: "Success!",
        text: "Berhasil menambahkan data alamat",
        icon: "warning",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error!",
        text: error,
        icon: "warning",
        confirmButtonText: "Cool",
      });
      setIsModalAddAddressOpen(false);
      setIsModalAddressOpen(true);
    }
  };

  const {
    values,
    handleSubmit,
    resetForm,
    errors,
    handleBlur,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: input,
    onSubmit: onSubmit,
    validationSchema: schemaValidation,
    enableReinitialize: true,
  });

  return (
    <div className="w-[95%] relative bg-white">
      <div className="text-left   rounded-md h-auto ">
        <Coba10 text="Kota*" />

        <Select
          value={selectedCity}
          options={options}
          onChange={(selectedOption) => {
            setSelectedCity(selectedOption);
            setCityId(selectedOption ? selectedOption.value : ""); // Update cityID
          }}
          styles={{
            container: (provided) => ({ ...provided }),
          }}
          onInputChange={(inputValue) => {
            setSearchQuery(inputValue);
            fetchCities(inputValue);
          }}
          isClearable
          className="w-[90%]"
        />
      </div>

      <div className="text-left   rounded-md h-auto ">
        <Coba10 text="Kecamatan*" />
        <Select
          value={selectedKecamatan}
          options={optionsKecamatan}
          onChange={(selectedOption) => setSelectedKecamatan(selectedOption)}
          styles={{
            container: (provided) => ({ ...provided }),
          }}
          isClearable
          className="w-[90%]"
        />
      </div>

      <div className=" py-3">
        <Coba10 text="Alamat Lengkap*" />
        <input
          type="text"
          className="border border-gray-300 w-[90%] h-[40px] rounded-sm pl-2"
          placeholder="Masukan Alamat Lengkap ..."
          value={input.detail_alamat}
          name="detail_alamat"
          onChange={handleChange}
          required
        />

        <p className="col-span-3 text-red-500">
          {touched.detail_alamat === true && errors.detail_alamat}
        </p>
      </div>

      <div className="">
        <BtnAdmin1 text="Simpan" onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default AddAddressModal;
