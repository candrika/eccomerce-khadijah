import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GlobalContext } from "../../context/GlobalContext";
import del from "../../assets/delete.png";
import { Coba10 } from "../../components/reusableComponents/Text";
import { InputAdmin1 } from "../../components/reusableComponents/InputAdmin";
import { BtnAdmin1 } from "../../components/reusableComponents/ButtonAdmin";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import Select from "react-select";

const initialState = {
  name: "",
  qty_products: [],
  price_bundle: "",
  image: "",
  product_ids: "",
};

const schemaValidation = Yup.object({
  name: Yup.string().required("Nama Wajib diisi"),
  keterangan: Yup.string().required("Keterangan Wajib diisi"),
});
const AddBundle = () => {
  const [inputFields, setInputFields] = useState([{ value: "" }]);
  const [selectedFile, setSelectedFile] = useState("");
  const [preview, setPreview] = useState("");
  const navigate = useNavigate();
  const [input, setInput] = useState(initialState);
  const Swal = require("sweetalert2");
  const [addProduk, setAddProduk] = useState([{ value: "" }]);

  const { disc, fetchDiscount, product, fetchProduct } =
    useContext(GlobalContext);

  const handleFileChange = (event) => {
    const image = event.target.files[0];
    setSelectedFile(image);
    setPreview(URL.createObjectURL(image));
    // console.log(event.target.files[0]);
  };
  // console.log("preview", preview);
  // select2
  const [options, setOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Function to fetch data from the API based on the search term
  const fetchData = async (inputValue) => {
    try {
      const response = await axios.get(
        `https://laravel-api-10.cerise.id/api/products?search=${inputValue}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = response.data.success;
      // console.log("data", data);

      const formattedOptions = data.map((product) => ({
        value: product.id,
        label: product.name,
      }));

      setOptions(formattedOptions);

      const values = [...addProduk];
      values.push({ value: "" });

      const newData = data.map((product) => ({
        id: product.id,
        produk: product.name,
        qty: 0,
        harga: 0,
      }));
      setAddProduk([...addProduk, newData]);
    } catch (error) {
      console.log(error.response.status);
    }
  };
  // console.log("produk", addProduk);

  // Function to handle the user's input and fetch data accordingly
  const handleInputChange = (inputValue) => {
    if (inputValue) {
      fetchData(inputValue);
    } else {
      setOptions([]); // Reset options if the input is empty
    }
  };

  const handleAddFields = () => {
    const values = [...inputFields];
    values.push({ value: "" });
    setInputFields(values);
  };

  const handleRemoveFields = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };
  const onSubmit = async () => {
    try {
      const response = await axios.post(
        "https://laravel-api-10.cerise.id/api/setting-generals/sales-channels/create",
        {
          name: values.name,
          status: values.status,
          keterangan: values.keterangan,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchProduct();
      Swal.fire({
        title: "Success!",
        text: "Berhasil menambahkan data channel",
        icon: "warning",
        confirmButtonText: "OK",
      });
      navigate("/admin/settingGeneral/channel/channel");
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Login Error!",
        text: error,
        icon: "warning",
        confirmButtonText: "Cool",
      });
    }
  };

  const {
    handleChange,
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
      <div className=" grid grid-cols-2 gap-4 p-4">
        <div className="text-left rounded-md h-auto ">
          <Coba10 text="Nama Bundle" />
          <input
            type="text"
            onChange={handleChange}
            name="name"
            value={values.name}
            onBlur={handleBlur}
            placeholder="Input Nama Bundle"
            className="w-[100%] h-[45px] border border-[#D3D3D3] rounded-lg pl-4"
          />

          <p className="col-span-3 text-red-500">
            {touched.name === true && errors.name}
          </p>
        </div>

        <div className="text-left rounded-md h-auto ">
          <Coba10 text="Input Keterangan" />
          <input
            type="tetxt"
            onChange={handleChange}
            name="keterangan"
            value={values.keterangan}
            onBlur={handleBlur}
            placeholder="Input Keterangan"
            className="w-[100%] h-[45px] border border-[#D3D3D3] rounded-lg pl-4"
          />

          <p className="col-span-3 text-red-500">
            {touched.keterangan === true && errors.keterangan}
          </p>
        </div>

        <div className="text-left rounded-md h-auto ">
          <Coba10 text="Harga Total" />
          <input
            type="tetxt"
            onChange={handleChange}
            name="keterangan"
            value={values.keterangan}
            onBlur={handleBlur}
            placeholder="Input Total"
            className="w-[100%] h-[45px] border border-[#D3D3D3] rounded-lg pl-4"
          />

          <p className="col-span-3 text-red-500">
            {touched.keterangan === true && errors.keterangan}
          </p>
        </div>

        <div className="text-left rounded-md h-auto ">
          <Coba10 text="Image" />
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            // accept="image/*"
            // onChange={(e) => setInput("image", e.currentTarget.files[0])}
          />
          {/* <File onChange={(e) => setInput(e.target.files[0])} /> */}

          {preview ? (
            <div>
              <img
                src={preview}
                alt="Preview Image"
                className="w-[200px] mt-4"
              />
            </div>
          ) : (
            <div></div>
          )}
          <p className="col-span-3 text-red-500">
            {touched.image === true && errors.image}
          </p>
        </div>

        <div>
          <Select
            options={options}
            onInputChange={handleInputChange}
            placeholder="Search for products..."
            isClearable
            isSearchable
          />
        </div>
      </div>

      <div className="p-4">
        <BtnAdmin1 text="Simpan" onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default AddBundle;
