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
  product_id: "",
  images: [],
};

const schemaValidation = Yup.object({
  product_id: Yup.string().required("Product Wajib diisi"),
});

const AddGallery = () => {
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
    const image = event.target.files[0];
    setSelectedFile(image);
    setPreview(URL.createObjectURL(image));
    // console.log(event.target.files[0]);
  };
  const onSubmit = async () => {
    const formData = new FormData();
    selectedFile.forEach((item, index) => {
      formData.append(`images[${index}]`, item);
    });
    formData.append("product_id", values.product_id);
    const confirmationResult = await Swal.fire({
      title: "Apakah anda ingin mengubah gambar produk?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
    });
    if (confirmationResult.isConfirmed) {
      try {
        const response = await axios.post(
          "https://laravel-api-10.cerise.id/api/products/galleries/create",
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        fetchProduct();
        Swal.fire({
          title: "Success!",
          text: "Berhasil menambahkan gambar produk",
          icon: "warning",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        });
        navigate("/admin/produk/dataProduk");
      } catch (error) {
        console.log(error);
        console.log("selectedFile", selectedFile);
        Swal.fire({
          title: "Login Error!",
          text: error,
          confirmButtonColor: "#d33",
          icon: "warning",
          confirmButtonText: "Cool",
        });
      }
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

  // console.log("selectedFile", selectedFile);

  return (
    <div className="w-[95%] relative bg-white">
      <form onSubmit={handleSubmit}>
        <div className=" grid lg:grid-cols-2 grid-cols-1  gap-4 p-4">
          <div className="text-left rounded-md h-auto ">
            <Coba10 text="Produk" />
            <input
              type="text"
              onChange={handleChange}
              name="product_id"
              value={values.product_id}
              onBlur={handleBlur}
              placeholder="Input Nama Channel"
              className="w-[100%] h-[45px] border border-[#D3D3D3] rounded-lg pl-4"
            />

            <p className="col-span-3 text-red-500">
              {touched.product_id === true && errors.product_id}
            </p>
          </div>
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
            Add Gallery
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddGallery;
