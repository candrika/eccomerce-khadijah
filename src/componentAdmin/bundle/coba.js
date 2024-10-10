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
const Coba = () => {
  const [inputFields, setInputFields] = useState([{ value: "" }]);
  const [selectedFile, setSelectedFile] = useState("");
  const [preview, setPreview] = useState("");
  const navigate = useNavigate();
  const [input, setInput] = useState(initialState);
  const Swal = require("sweetalert2");
  const { disc, fetchDiscount, product, fetchProduct } =
    useContext(GlobalContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetchProduct();
  }, []);

  useEffect(() => {
    // Function to fetch all products from the API
    const fetchProducts2 = async () => {
      try {
        const response = await axios.get(
          "https://laravel-api-10.cerise.id/api/products",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setAllProducts(response.data.success);
        // console.log(response.data.success);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts2();
  }, []);

  useEffect(() => {
    // Function to update search results based on the search term
    const updateSearchResults = () => {
      if (searchTerm.trim() === "") {
        setSearchResults([]);
      } else {
        const filteredResults = allProducts.filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(filteredResults);
      }
    };

    updateSearchResults();
  }, [searchTerm, allProducts]);

  const selectOptions = searchResults.map((result) => ({
    value: result.id,
    label: result.name,
  }));

  const handleFileChange = (event) => {
    const files = event.target.files;
    const fileList = Array.from(files);
    setSelectedFile([...selectedFile, ...fileList]);
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

  console.log("first", searchResults);

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

        <div className="text-left rounded-md h-auto ">
          <Coba10 text="Gallery" />
          {inputFields.map((inputField, index) => (
            <div key={index} className=" flex relative justify-between my-4">
              <div className="w-[50%]">
                <select
                  name="product_id"
                  onChange={handleChange}
                  value={values.product_id}
                  onBlur={handleBlur}
                  className="w-[100%] h-[60px] border border-[#D3D3D3] rounded-lg pl-4"
                >
                  <option value="" disabled>
                    Pilih Produk
                  </option>
                  {product.map((product, index) => (
                    <option value={product.id}>{product.name}</option>
                  ))}
                </select>

                <p className="col-span-3 text-red-500">
                  {touched.product_id === true && errors.product_id}
                </p>
              </div>

              <div className="w-[50%]">
                <button type="button" onClick={() => handleRemoveFields(index)}>
                  <img src={del} alt="" className="w-[20px]" />
                </button>
              </div>
            </div>
          ))}
          <button type="button" onClick={handleAddFields}>
            Add Field
          </button>
        </div>
        <div className="text-left rounded-md h-auto ">
          <Coba10 text="Gallery" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter search term"
          />

          <ul>
            {searchResults.map((result) => (
              <li key={result.id}>{result.name}</li> // Assuming 'name' is a property of the product object
            ))}
          </ul>
        </div>

        <div>
          <Select
            options={selectOptions}
            value={selectOptions.find((option) => option.value === searchTerm)}
            onChange={(selectedOption) => setSearchTerm(selectedOption.value)}
            onInputChange={(inputValue) => setSearchTerm(inputValue)}
            placeholder="Enter search term"
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

export default Coba;
