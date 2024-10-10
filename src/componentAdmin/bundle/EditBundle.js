import React, { useContext, useState, useEffect } from "react";
import { format } from "date-fns";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { GlobalContext } from "../../context/GlobalContext";
import { Coba10, Coba11 } from "../../components/reusableComponents/Text";
import { InputAdmin1 } from "../../components/reusableComponents/InputAdmin";
import { BtnAdmin1 } from "../../components/reusableComponents/ButtonAdmin";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

const initialState = {
  name: "",
  qty_products: [],
  price_bundle: "",
  image: "",
  product_ids: [],
};

const schemaValidation = Yup.object({
  name: Yup.string().required("Nama Wajib diisi"),
});

const EditBundle = () => {
  const { id } = useParams();
  const { disc, fetchDiscount, product, fetchProduct } =
    useContext(GlobalContext);
  const [inputFields, setInputFields] = useState([{ value: "" }]);
  const [selectedFile, setSelectedFile] = useState("");
  const [preview, setPreview] = useState("");
  const navigate = useNavigate();
  const [input, setInput] = useState(initialState);
  const Swal = require("sweetalert2");
  const [addProduk, setAddProduk] = useState([{ value: "" }]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [addedProducts, setAddedProducts] = useState([]);

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    fetchProducts(query);
  };

  const fetchProducts = async (query) => {
    try {
      const response = await axios.get(
        `https://laravel-api-10.cerise.id/api/products?search=${query}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setSearchResults(response.data.success); // Assuming the API returns an array of products
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const AddProducts = (product) => {
    // Check if the product already exists in the addedProducts array
    const isProductAdded = addedProducts.some(
      (addedProduct) => addedProduct.id === product.id
    );

    if (!isProductAdded) {
      // If the product is not already added, add it with a quantity of 1
      const productWithQuantity = {
        ...product,
        qty: 1,
        total: product.price_sale,
      };
      setAddedProducts((prevProducts) => [
        ...prevProducts,
        productWithQuantity,
      ]);
      alert("Product added: " + product.name);
    } else {
      alert("Quantity increased for: " + product.name);
    }
  };

  // console.log("add produk", addedProducts);

  const increaseQuantity = (productId) => {
    const updatedProducts = [...addedProducts];
    const existingProductIndex = updatedProducts.findIndex(
      (addedProduct) => addedProduct.id === productId
    );

    if (existingProductIndex !== -1) {
      const existingProduct = updatedProducts[existingProductIndex];
      const newQty = existingProduct.qty + 1;
      const newTotal = newQty * existingProduct.price_sale;
      updatedProducts[existingProductIndex] = {
        ...existingProduct,
        qty: newQty,
        total: newTotal,
      };
      setAddedProducts(updatedProducts);
    }
  };

  const decreaseQuantity = (productId) => {
    const updatedProducts = [...addedProducts];
    const existingProductIndex = updatedProducts.findIndex(
      (addedProduct) => addedProduct.id === productId
    );

    if (existingProductIndex !== -1) {
      const existingProduct = updatedProducts[existingProductIndex];
      const newQty = existingProduct.qty - 1;
      const newTotal = existingProduct.total - existingProduct.price_sale;

      if (newQty > 0) {
        updatedProducts[existingProductIndex] = {
          ...existingProduct,
          qty: newQty,
          total: newTotal,
        };
        setAddedProducts(updatedProducts);
      } else {
        // If the quantity becomes zero, remove the product from the addedProducts array
        updatedProducts.splice(existingProductIndex, 1);
        setAddedProducts(updatedProducts);
      }
    }
  };

  const handleFileChange = (event) => {
    const image = event.target.files[0];
    setSelectedFile(image);
    setPreview(URL.createObjectURL(image));
    console.log(event.target.files[0]);
  };

  const fetchUserById = async (event) => {
    try {
      const response = await axios.get(
        `https://laravel-api-10.cerise.id/api/bundles/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("x", response);
      setInput({
        name: response.data.data.name,
        price_bundle: response.data.data.price_bundle,
        image: response.data.data.image,
        // product_ids: [],
        // qty_products: [],
      });
      const url = response.data.data.url;
      const filename = url.substring(url.lastIndexOf("/") + 1);
      // console.log("url", response.data.data.url);
      // console.log("filename", filename);
      setSelectedFile(filename);
      setPreview(response.data.data.url);
      const data = response.data.data.products;
      // console.log("get data produk existing", data);
      setAddedProducts(
        data.map((data, index) => ({
          id: data.id,
          name: data.name,
          price_sale: data.price_sale,
          total: 2 * data.price_sale,
          qty: data.pivot.qty_product,
        }))
      );
    } catch (error) {
      console.log(`${error} error`);
    }
  };

  useEffect(() => {
    fetchUserById();
  }, []);

  const onSubmit = async () => {
    const formData = new FormData();
    formData.append("image", values.image);
    formData.append("name", values.name);
    formData.append("price_bundle", values.price_bundle);
    addedProducts.forEach((item, index) => {
      formData.append(`product_ids[${index}]`, item.id);
    });
    addedProducts.forEach((item, index) => {
      formData.append(`qty_products[${index}]`, item.qty);
    });
    console.log("sssss", addedProducts);
    const confirmationResult = await Swal.fire({
      title: "Apakah anda ingin mengubah data bundle?",
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
          `https://laravel-api-10.cerise.id/api/bundles/update/${id}`,
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
          text: "Berhasil edit data bundle",
          confirmButtonColor: "#3085d6",
          icon: "warning",
          confirmButtonText: "OK",
        });
        navigate("/admin/bundle");
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: "Error",
          text: error,
          icon: "warning",
          confirmButtonText: "Cool",
          cancelButtonColor: "#d33",
        });
      }
    }
  };

  // console.log("data", addedProducts);
  // console.log("data2", selectedFile);

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

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className="w-[95%] relative bg-white">
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
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
          <Coba10 text="Harga Total" />
          <input
            type="text"
            onChange={handleChange}
            name="price_bundle"
            value={values.price_bundle}
            onBlur={handleBlur}
            placeholder="Input Nama Bundle"
            className="w-[100%] h-[45px] border border-[#D3D3D3] rounded-lg pl-4"
          />
        </div>

        <div className="text-left rounded-md h-auto ">
          <Coba10 text="Image" />
          <input type="file" name="image" onChange={handleFileChange} />

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
      </div>
      <div className="text-left rounded-md h-auto p-4 ">
        <Coba10 text="Pilih Produk" />
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className=" ">
            <div className="w-[100%] relative flex justify-start">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-[625px] h-[45px] border border-[#D3D3D3] rounded-lg pl-4"
              />
            </div>
            <div className="mt-4">
              <ul>
                {searchResults.map((product, index) => (
                  <div key={index} className="flex items-center">
                    <div className=" w-[50%] text-left my-2 ">
                      <li key={product.id}>{product.name}</li>
                    </div>
                    <button
                      className="bg-dark text-white h-[30px] w-[70px] rounded-full"
                      onClick={() => AddProducts(product)}
                    >
                      ADD
                    </button>
                  </div>
                ))}
              </ul>
            </div>
          </div>
          <div className=" ">
            <div className=" mx-2 ">
              {addedProducts.map((addedProducts, index) => (
                <div
                  className="bg-white w-[100%]  p-8 grid grid-cols-2 md:grid-cols-12 shadow-lg border border-gray-100 rounded-md"
                  key={addedProducts.id}
                >
                  <div className="md:col-span-8 grid md:grid-cols-12 grid-cols-1">
                    <div className="col-span-4">
                      <Coba11 text="Nama" />
                      <p>{addedProducts.name}</p>
                    </div>
                    <div className="col-span-4">
                      <Coba11 text="Harga" />
                      <p>{addedProducts.price_sale}</p>
                    </div>
                    <div className="col-span-4">
                      <Coba11 text="Total" />
                      <p>{addedProducts.total}</p>
                    </div>
                  </div>
                  <div className="md:col-span-4 flex justify-end ">
                    <button
                      className="bg-dark w-[25px] h-[25px] rounded-full text-white"
                      onClick={() => decreaseQuantity(addedProducts.id)}
                    >
                      -
                    </button>
                    <div className="px-4  relative">
                      <p>{addedProducts.qty}</p>
                    </div>

                    <button
                      className="bg-dark w-[25px]  h-[25px]  rounded-full text-white"
                      onClick={() => increaseQuantity(addedProducts.id)}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="p-4">
        <button
          type="submit"
          onClick={handleSubmit}
          className=" mr-4 border border-sky-600 bg-sky-600 text-white h-[40px] w-[80px] rounded-md hover:bg-white hover:text-black"
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default EditBundle;
