import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
// import { GlobalContext } from "../../context/GlobalContext";
import { GlobalContextAddress } from "../../context/GlobalContextAddress";
import { BtnAdmin1 } from "../../components/reusableComponents/ButtonAdmin";
import { Coba10 } from "../../components/reusableComponents/Text";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import Select from "react-select";

const initialState = {
  island_id: "",
  province_id: "",
  city_id: "",
  detail_alamat: "",
};

const schemaValidation = Yup.object({
  island_id: Yup.string().required("Pulau Wajib diisi"),
  province_id: Yup.string().required("Provinsi Wajib diisi"),
  city_id: Yup.string().required("Kota Wajib diisi"),
  detail_alamat: Yup.string().required("Detail Alamat Wajib diisi"),
});

const EditAddress = () => {
  const { userSetting } = useContext(GlobalContextAddress);
  const { id } = useParams();
  const [idUser, setIdUser] = useState({
    user_id: "",
  });
  const navigate = useNavigate();
  const [input, setInput] = useState(initialState);
  const Swal = require("sweetalert2");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState({
    value: null,
  });
  const [kecamatan, setKecamatan] = useState([]);
  const [selectedKecamatan, setSelectedKecamatan] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const fetchUserLogin = async () => {
    try {
      const response = await axios.get(
        "https://laravel-api-10.cerise.id/api/member",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setIdUser(response.data.user.id);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchOldAddress = async () => {
    try {
      const response = await axios.get(
        `https://laravel-api-10.cerise.id/api/member/edit/address/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const oldAddress = response.data.address;
      console.log("xx", response.data.address);

      // Set the old values in state
      setInput({
        island_id: oldAddress.island_id,
        province_id: oldAddress.province_id,
        city_id: oldAddress.city_id,
        detail_alamat: oldAddress.detail_alamat,
      });

      if (oldAddress.city_id) {
        // Set selectedCity based on fetched data
        setSelectedCity({
          value: oldAddress.city_id,
          label: oldAddress.city,
          province: oldAddress.province,
        });
      }

      if (oldAddress.subdistrict_name) {
        // Set selectedKecamatan based on fetched data
        setSelectedKecamatan({
          value: oldAddress.subdistrict_id,
          label: oldAddress.subdistrict_name,
        });
      }
    } catch (error) {
      console.log(error);
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
        `https://laravel-api-10.cerise.id/api/rajaongkir/cities-subdistrict/${selectedCity.value}`,
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
    fetchUserLogin();
    fetchOldAddress();
  }, []);

  useEffect(() => {
    if (selectedCity && selectedCity.value !== null) {
      fetchKecamatan();
    }
  }, [selectedCity]);

  const handleSubmit = async () => {
    const confirmationResult = await Swal.fire({
      title: "Apakah anda ingin menyimpan data alamat?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
    });
    if (confirmationResult.isConfirmed) {
      try {
        const response = await axios.put(
          `https://laravel-api-10.cerise.id/api/member/update/address/${id}`,
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
        Swal.fire({
          title: "Success!",
          text: "Berhasil menambahkan data alamat",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "rgb(8 47 73)",
        });
        navigate("/member/member-view");
      } catch (error) {
        console.log("error simpan", error);
        Swal.fire({
          title: " Error!",
          text: error,
          icon: "warning",
          confirmButtonText: "Cool",
        });
      }
    }
  };

  return (
    <div>
      <div className="relative w-[90%] md:w-[100%]  md:w-[98%] left-[5%] md:left-0   relative bg-white">
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          <div className="text-left   rounded-md h-auto ">
            <Coba10 text="Kota*" />

            <Select
              value={selectedCity}
              options={options}
              onChange={(selectedOption) => setSelectedCity(selectedOption)}
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
              onChange={(selectedOption) =>
                setSelectedKecamatan(selectedOption)
              }
              styles={{
                container: (provided) => ({ ...provided }),
              }}
              isClearable
              className="w-[90%]"
            />
          </div>
          <div className="text-left   rounded-md h-auto ">
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
          </div>
        </div>
        {selectedCity == null ||
        selectedKecamatan == null ||
        input.detail_alamat == "" ? (
          <div className="p-4">
            <BtnAdmin1 text="Simpan" />
          </div>
        ) : (
          <div className="p-4">
            <BtnAdmin1 text="Simpan" onClick={handleSubmit} />
          </div>
        )}
      </div>
    </div>
  );
};

export default EditAddress;
