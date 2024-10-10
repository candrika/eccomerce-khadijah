import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { GlobalContext } from "../../context/GlobalContext";
import { Coba10 } from "../../components/reusableComponents/Text";
import { useFormik } from "formik";
import * as Yup from "yup";
import del from "../../assets/delete.png";
import Swal from "sweetalert2";

const initialState = {
  images: [],
};

const EditBanner = () => {
  const [inputFields, setInputFields] = useState([{ value: "" }]);
  const { id } = useParams();
  const navigate = useNavigate();
  const { setGallery, fetchGallery, fetchProduct, product } =
    useContext(GlobalContext);
  const [input, setInput] = useState(initialState);
  const [selectedFile, setSelectedFile] = useState([]);
  const [preview, setPreview] = useState("");
  const Swal = require("sweetalert2");

  const handleFileChange = (event) => {
    const files = event.target.files;
    const fileList = Array.from(files);
    setSelectedFile([...selectedFile, ...fileList]);
  };

  const onSubmit = async () => {
    const formData = new FormData();
    selectedFile.forEach((item, index) => {
      formData.append(`images[${index}]`, item);
    });
    try {
      const response = await axios.post(
        "https://laravel-api-10.cerise.id/api/setting-generals/banners-update",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "X-HTTP-Method-Override": "PUT",
          },
        }
      );
      fetchProduct();
      Swal.fire({
        title: "Success!",
        text: "Berhasil menambahkan data banner",
        icon: "warning",
        confirmButtonText: "OK",
      });
      navigate("/admin/banner");
    } catch (error) {
      console.log(error);
      console.log("selectedFile", selectedFile);
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
    enableReinitialize: true,
  });

  const handleInputChange = (index, event) => {
    const values = [...inputFields];
    values[index].value = event.target.value;
    setInputFields(values);
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

  const fetchArticleCategory = async (event) => {
    try {
      setInput({
        product_id: localStorage.getItem("id_produk"),
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
    fetchArticleCategory();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className=" grid lg:grid-cols-2 grid-cols-1  gap-4 p-4">
          <div className="text-left rounded-md h-auto ">
            <Coba10 text="Gallery" />
            {inputFields.map((inputField, index) => (
              <div key={index} className=" flex relative justify-between my-4">
                <div className="w-[50%]">
                  <input
                    type="file"
                    name="images"
                    onChange={handleFileChange}
                  />
                </div>

                <div className="w-[50%]">
                  <button
                    type="button"
                    onClick={() => handleRemoveFields(index)}
                  >
                    <img src={del} alt="" className="w-[20px]" />
                  </button>
                </div>
              </div>
            ))}
            <button type="button" onClick={handleAddFields}>
              Add Field
            </button>
          </div>
        </div>
        <div className="p-4">
          <button
            type="submit"
            className=" mr-4 border border-sky-600 bg-sky-600 text-white h-[40px] w-[80px] rounded-md hover:bg-white hover:text-black"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBanner;
