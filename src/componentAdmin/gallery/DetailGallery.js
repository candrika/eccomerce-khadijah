import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { GlobalContext } from "../../context/GlobalContext";
import { useNavigate, useParams } from "react-router-dom";
import { Coba10 } from "../../components/reusableComponents/Text";
import { useFormik } from "formik";
import * as Yup from "yup";
import del from "../../assets/delete.png";
import cancel from "../../assets/cancel.png";
import Swal from "sweetalert2";

const initialState = {
  product_id: "",
  delete_images: [0],
  images: [],
  old_images: [],
  id_image: [],
};

const DetailGallery = () => {
  const [inputFields, setInputFields] = useState([{ value: "" }]);
  const { setGallery, fetchGallery, fetchProduct, product } =
    useContext(GlobalContext);
  const navigate = useNavigate();
  // imageGallery --> nampilin old gallery
  const [imagesGallery, setImagesGallery] = useState([]);
  // deleted gallery
  const [delGallery, setDelGallery] = useState([]);
  const [imagesku, setImages] = useState([]);
  const { id } = useParams();
  const [input, setInput] = useState(initialState);
  const [selectedFile, setSelectedFile] = useState([]);
  const [preview, setPreview] = useState("");
  const Swal = require("sweetalert2");

  // const handleFileChange = (event) => {
  //   const files = event.target.files;
  //   const fileList = Array.from(files);
  //   setSelectedFile([...selectedFile, ...fileList]);
  // };

  // modify with image preview
  const handleFileChange = (event, index) => {
    const fileList = Array.from(event.target.files);

    setSelectedFile([...selectedFile, ...fileList]);

    if (fileList.length > 0) {
      const updatedFields = [...inputFields];
      updatedFields[index].image = URL.createObjectURL(fileList[0]);
      setInputFields(updatedFields);
    }
  };

  const fetchProdukById = async (event) => {
    try {
      const response = await axios.get(
        `https://laravel-api-10.cerise.id/api/products/show/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log("response gallery", response.data.success);
      // console.log("id produk", id);
      const data = response.data.success.galleries;
      const imageArray = data.map((data, index) => ({
        id_image: data.id,
        old_images: data.name,
        url: data.url,
      }));

      // console.log("gggg", data.name);

      const oldImages = data.map((data, index) => data.name);

      // console.log("Image Array 2", oldImages);

      setImagesGallery(
        data.map((data, index) => ({
          id_image: data.id,
          old_images: data.name,
          url: data.url,
        }))
      );

      // setSelectedFile(oldImages);

      // console.log("imageArray", imageArray);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // fetch article detail
    fetchProdukById();
  }, []);

  const removeItem = (id_image) => {
    setImagesGallery(
      imagesGallery.filter(
        (imagesGallery) => imagesGallery.id_image !== id_image
      )
    );
    setDelGallery([...delGallery, id_image]);
  };

  // console.log("selec", imagesku);
  // console.log("delgallery", delGallery);
  // console.log("selectedFile", selectedFile);

  const onSubmit = async () => {
    const formData = new FormData();
    delGallery.forEach((item, index) => {
      formData.append(`delete_images[${index}]`, item);
    });
    selectedFile.forEach((item2, index) => {
      formData.append(`images[${index}]`, item2);
    });
    formData.append("product_id", id);
    try {
      const response = await axios.post(
        `https://laravel-api-10.cerise.id/api/products/galleries/update/${id}`,
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
        text: "Berhasil menambahkan data channel",
        icon: "warning",
        confirmButtonText: "OK",
      });
      navigate("/admin/produk/dataProduk");
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

  return (
    <div className="w-[95%] relative bg-white">
      <form onSubmit={handleSubmit}>
        <div className=" grid lg:grid-cols-2 grid-cols-1  gap-4 p-4">
          <div className="text-left rounded-md h-auto ">
            <Coba10 text="Gallery" />
            <div className="grid lg:grid-cols-2 gap-2">
              {imagesGallery.map((imagesku, index) => (
                <div key={index} className="my-4 flex  ">
                  <img
                    src={imagesku.url}
                    alt={imagesku.url}
                    className="w-[200px]"
                  />
                  {/* <div className="w-[80%]">{imagesku.old_images}</div> */}

                  <div className="w-[20%]">
                    <button
                      type="button"
                      onClick={() => removeItem(imagesku.id_image)}
                    >
                      <img src={cancel} alt="" className="w-[20px]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="text-left rounded-md h-auto w-[90%] relative left-[2.5%]">
          <Coba10 text="Gallery" />
          {inputFields.map((inputField, index) => (
            <div key={index} className="flex relative justify-between my-4">
              <div className="w-[50%]">
                <label htmlFor={`imageInput-${index}`}>
                  <img
                    src={
                      inputField.image ||
                      "https://tf.itera.ac.id/wp-content/uploads/2019/06/placeholder.png"
                    }
                    alt={inputField.image ? "Uploaded" : "Upload In Here"}
                    className="w-[200px] cursor-pointer"
                  />
                </label>
                <input
                  type="file"
                  id={`imageInput-${index}`}
                  name="images"
                  onChange={(e) => handleFileChange(e, index)}
                  style={{ display: "none" }}
                />
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

        <div className="p-4">
          <button
            type="submit"
            className=" mr-4 border border-sky-600 bg-sky-600 text-white h-[40px] w-[80px] text-[10px] rounded-md hover:bg-white hover:text-black"
          >
            Add Gallery
          </button>
        </div>
      </form>
    </div>
  );
};

export default DetailGallery;
