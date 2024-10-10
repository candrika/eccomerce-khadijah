import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Coba10, Coba13, Coba14, Coba6 } from "../reusableComponents/Text";
import { GlobalContext } from "../../context/GlobalContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import img from "../../assets/Frame.png";

const ListCart = () => {
  const navigate = useNavigate();
  const {
    selectedProducts,
    selectedBundle,
    setSelectedProducts,
    setSelectedBundle,
    calculate,
    setCalculate,
    detailCalculateProduct,
    setDetailCalculateProduct,
  } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const [grandTotal, setGrandTotal] = useState(0);
  const [produk, setProduk] = useState([]);
  const [bundle, setBundle] = useState([]);
  const [errorCode, setError] = useState("");
  // match qty produk dengan stok
  const [productList, setProdukList] = useState([]);
  const [productSelected, setProdukSelected] = useState([]);

  const fetchProduk = async () => {
    try {
      const response = await axios.get(
        "https://laravel-api-10.cerise.id/api/products"
      );

      const data = response.data.success;
      setProdukList(data);
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    fetchProduk();
  }, []);

  const fetchCountProduct = async () => {
    try {
      const response = await axios.get(
        "https://laravel-api-10.cerise.id/api/carts",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const dataProduk = response.data.product;
      const dataBundle = response.data.bundle;
      setProduk(dataProduk);
      setBundle(dataBundle);

      // console.log("response cart", response.data.product);
      // console.log("response bundle", response.data.bundle);
    } catch (error) {
      // console.log("error cart", error.response.status);
      setError(error.response.status);
    }
  };

  const removeSelectedCart = async () => {
    setSelectedBundle([]);
    setSelectedProducts([]);
  };

  useEffect(() => {
    fetchCountProduct();
    removeSelectedCart();
  }, []);

  const handleUpdate = async (id, qty, price) => {
    try {
      const response = await axios.put(
        `https://laravel-api-10.cerise.id/api/carts/update-cart`,
        {
          quantity: qty - 1,
          product_id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const total = grandTotal;
      setGrandTotal(total - parseInt(price));
      fetchCountProduct();
    } catch (error) {
      alert("gagal");
      // console.log(error);
    }
  };

  const handleUpdateIncrease = async (item, id, qty, price) => {
    try {
      if (parseInt(item.stock) - qty == 0) {
        alert("melebihi stok");
      } else {
        const response = await axios.put(
          `https://laravel-api-10.cerise.id/api/carts/update-cart`,
          {
            quantity: parseInt(qty) + 1,
            product_id: id,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const total = grandTotal;
        setGrandTotal(total + parseInt(price));
        fetchCountProduct();
      }
    } catch (error) {
      alert("gagal");
      // console.log(error);
    }
  };

  const bundleUpdate = async (item, id, qty, price) => {
    try {
      if (qty == 1) {
        alert("Apakah ingin menghapus produk?");
        const response = await axios.put(
          `https://laravel-api-10.cerise.id/api/carts/update-cart`,
          {
            quantity: qty - 1,
            bundle_id: id,
          },

          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      } else {
        const response = await axios.put(
          `https://laravel-api-10.cerise.id/api/carts/update-cart`,
          {
            quantity: qty - 1,
            bundle_id: id,
          },

          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      }
      const total = grandTotal;
      setGrandTotal(total - parseInt(price));
      fetchCountProduct();
    } catch (error) {
      alert("gagal");
      // console.log(error);
    }
  };

  const bundleUpdateIncrease = async (item, id, qty, price) => {
    try {
      if (parseInt(item.stock) - qty == 0) {
        alert("melebihi stok");
      } else {
        const response = await axios.put(
          `https://laravel-api-10.cerise.id/api/carts/update-cart`,
          {
            quantity: parseInt(qty) + 1,
            bundle_id: id,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const total = grandTotal;
        setGrandTotal(total + parseInt(price));
        fetchCountProduct();
      }
    } catch (error) {
      alert("gagal");
      // console.log(error);
    }
  };

  const handleChange = async (event, item, id, qty, price) => {
    const newQuantity = parseInt(event.target.value);

    // Check if the input is a valid positive number
    if (!Number.isInteger(newQuantity) || newQuantity <= 0) {
      // Do nothing or handle accordingly (you can show a message if needed)
      return;
    }

    // Check if the new quantity exceeds the available stock
    if (newQuantity > item.stock) {
      alert("melebihi stok produk");
      return; // Stop further processing
    }

    try {
      const response = await axios.put(
        `https://laravel-api-10.cerise.id/api/carts/update-cart`,
        {
          quantity: newQuantity,
          product_id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setGrandTotal(newQuantity * parseInt(price));
      fetchCountProduct();
    } catch (error) {
      alert("apakah anda ingin menghapus produk?");
      // console.log(error);
    }
  };

  // console.log("produk selected", productSelected);

  const handleChangeBundle = async (event, item, id, qty, price) => {
    const newQuantity = parseInt(event.target.value);
    if (event.target.name === "quantity") {
      try {
        let canAddToCart = true;

        for (const product of item.products_in_bundle) {
          if (event.target.value >= parseInt(product.available_stock)) {
            alert("salah");
            canAddToCart = false;
            break;
          }
        }
        if (canAddToCart) {
          const response = await axios.put(
            `https://laravel-api-10.cerise.id/api/carts/update-cart`,
            {
              quantity: event.target.value,
              bundle_id: id,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          setGrandTotal(newQuantity * parseInt(price));
          fetchCountProduct();
        }
      } catch (error) {
        alert("apakah anda ingin menghapus produk?");
        // console.log(error);
      }
    }
  };

  const handleProductSelect = (productId, price) => {
    setSelectedProducts((prevSelectedProducts) => {
      if (prevSelectedProducts.includes(productId)) {
        const total = grandTotal;
        setGrandTotal(total - price);
        return prevSelectedProducts.filter((id) => id !== productId);
      } else {
        // Product is not selected, so add it
        const total = grandTotal;
        setGrandTotal(price + total);
        return [...prevSelectedProducts, productId];
      }
    });
  };

  const handleBundleSelect = (productId, price) => {
    setSelectedBundle((prevSelectedProducts) => {
      if (prevSelectedProducts.includes(productId)) {
        const total = grandTotal;
        setGrandTotal(total - price);
        return prevSelectedProducts.filter((id) => id !== productId);
      } else {
        const total = grandTotal;
        setGrandTotal(total + price);
        return [...prevSelectedProducts, productId];
      }
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const cartItems = [];
      selectedProducts.forEach((product, index) => {
        cartItems.push({
          product_id: product.product_id,
          quantity: product.quantity,
        });
      });

      selectedBundle.forEach((bundle) => {
        cartItems.push({
          bundle_id: bundle.bundle_id,
          quantity: bundle.quantity,
        });
      });

      const response = await axios.post(
        "https://laravel-api-10.cerise.id/api/calculate-price",
        {
          cart_items: cartItems,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setLoading(false);

      setCalculate(response.data.total_price_all);
      setDetailCalculateProduct(response.data.detail_calculate_price_product);
      navigate("/check-out");
    } catch (error) {
      setLoading(false);
      // console.log("error checkout", error);
      Swal.fire({
        title: "Error",
        text: "Terjadi kesalahan saat menghitung order.",
        icon: "error",
        confirmButtonColor: "#d33",
        confirmButtonText: "OK",
      });
    }
    // }
  };
  console.log("produk", bundle);
  return (
    <div>
      <div className=" w-[90%] left-[5%] relative">
        <div className="text-left mt-8 ">
          <Coba13 text="Produk Keranjang Saya" />
        </div>
        {produk == null ? (
          <p>Belum mempunyai data produk</p>
        ) : (
          <div>
            {produk.map((item, index) => (
              <div className="m-4 p-4 bg-white  shadow-md">
                <div className="w-[20%] flex mb-4">
                  <input
                    type="checkbox"
                    name="vehicle1"
                    value={item.product_id}
                    onChange={() =>
                      handleProductSelect(item, item.ori_price * item.quantity)
                    }
                  ></input>
                </div>
                <div className="flex">
                  <div>
                    <img
                      src={item.imageUrl}
                      alt=""
                      className="w-[100px] h-[100px] "
                    />
                  </div>

                  <div className=" ">
                    <div className="pl-2 md:col-span-3 lg:col-span-2 text-left">
                      <p>{item.name}</p>
                    </div>
                    <div className=" pl-2 md:col-span-3 lg:col-span-12 text-left ">
                      <Coba14 text={` ${item.price}`} />
                    </div>
                    <div className="pl-2  grid grid-cols-2 md:grid-cols-12 gap-2 ">
                      <div className="md:hidden flex    col-span-2 items-center ">
                        <div
                          onClick={() =>
                            handleUpdate(
                              item.product_id,
                              item.quantity,
                              item.ori_price
                            )
                          }
                          className="bg-primary cursor-pointer text-white w-[30px] h-[30px] rounded-full justify-center flex items-center"
                        >
                          -
                        </div>
                        <div className="mx-[10px]">
                          <input
                            type="number"
                            className="border border-gray-300 w-[60px] h-[40px] rounded-sm px-2"
                            value={item.quantity}
                            name="quantity"
                            onChange={(event) =>
                              handleChange(
                                event,
                                item,
                                item.product_id,
                                item.quantity,
                                item.ori_price
                              )
                            }
                          />
                        </div>
                        <div
                          onClick={() =>
                            handleUpdateIncrease(
                              item,
                              item.product_id,
                              item.quantity,
                              item.ori_price
                            )
                          }
                          className="bg-primary cursor-pointer text-white w-[30px] h-[30px] rounded-full justify-center flex items-center"
                        >
                          +
                        </div>
                      </div>
                      <div className="hidden md:flex md:col-span-6 flex  justify-end">
                        <div
                          onClick={() =>
                            handleUpdate(
                              item.product_id,
                              item.quantity,
                              item.ori_price
                            )
                          }
                          className="bg-primary cursor-pointer text-white w-[30px] h-[30px] rounded-full justify-center flex items-center"
                        >
                          -
                        </div>
                        <div className="mx-[10px]">
                          <input
                            type="number"
                            className="border border-gray-300 w-[60px] h-[40px] rounded-sm px-2"
                            value={item.quantity}
                            name="quantity"
                            onChange={(event) =>
                              handleChange(
                                event,
                                item,
                                item.product_id,
                                item.quantity,
                                item.ori_price
                              )
                            }
                          />
                        </div>
                        <div
                          onClick={() =>
                            handleUpdateIncrease(
                              item,
                              item.product_id,
                              item.quantity,
                              item.ori_price
                            )
                          }
                          className="bg-primary cursor-pointer text-white w-[30px] h-[30px] rounded-full justify-center flex items-center"
                        >
                          +
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className=" w-[90%] left-[5%] relative">
        <div className="text-left mt-8 ">
          <Coba13 text="Bundle Keranjang Saya" />
        </div>
        {bundle == null ? (
          <p>Belum mempunyai data cart</p>
        ) : (
          <div>
            {bundle.map((item, index) => (
              <div className="m-4 p-4 bg-white  shadow-md mb-4">
                <div className="w-[20%] flex mb-4">
                  <input
                    type="checkbox"
                    name="vehicle1"
                    value={item.bundle_id}
                    onChange={() =>
                      handleBundleSelect(item, item.ori_price * item.quantity)
                    }
                  ></input>
                </div>
                <div className="flex">
                  <div>
                    <img
                      src={item.imageUrlBundle}
                      alt=""
                      className="w-[100px] h-[100px] "
                    />
                  </div>

                  <div className=" ">
                    <div className="pl-2 md:col-span-3 lg:col-span-2 text-left">
                      <p>{item.name}</p>
                    </div>
                    <div className=" pl-2 md:col-span-3 lg:col-span-12 text-left ">
                      <Coba14 text={` ${item.price}`} />
                    </div>
                    <div className="pl-2  grid grid-cols-2 md:grid-cols-12 gap-2 ">
                      <div className="md:hidden flex    col-span-2 items-center ">
                        <div
                          onClick={() =>
                            bundleUpdate(
                              item,
                              item.bundle_id,
                              item.quantity,
                              item.ori_price
                            )
                          }
                          className="bg-primary cursor-pointer text-white w-[30px] h-[30px] rounded-full justify-center flex items-center"
                        >
                          -
                        </div>
                        <div className="mx-[10px]">
                          <input
                            type="number"
                            className="border border-gray-300 w-[60px] h-[40px] rounded-sm px-2"
                            value={item.quantity}
                            name="quantity"
                            onChange={(event) =>
                              handleChangeBundle(
                                event,
                                item,
                                item.bundle_id,
                                item.quantity,
                                item.ori_price
                              )
                            }
                          />
                        </div>
                        <div
                          onClick={() =>
                            bundleUpdateIncrease(
                              item,
                              item.bundle_id,
                              item.quantity,
                              item.ori_price
                            )
                          }
                          className="bg-primary cursor-pointer text-white w-[30px] h-[30px] rounded-full justify-center flex items-center"
                        >
                          +
                        </div>
                      </div>
                      <div className="hidden md:flex md:col-span-6 flex  justify-end">
                        <div
                          onClick={() =>
                            bundleUpdate(
                              item,
                              item.bundle_id,
                              item.quantity,
                              item.ori_price
                            )
                          }
                          className="bg-primary cursor-pointer text-white w-[30px] h-[30px] rounded-full justify-center flex items-center"
                        >
                          -
                        </div>
                        <div className="mx-[10px]">
                          <input
                            type="number"
                            className="border border-gray-300 w-[60px] h-[40px] rounded-sm px-2"
                            value={item.quantity}
                            name="quantity"
                            onChange={(event) =>
                              handleChangeBundle(
                                event,
                                item,
                                item.bundle_id,
                                item.quantity,
                                item.ori_price
                              )
                            }
                          />
                        </div>
                        <div
                          onClick={() =>
                            bundleUpdateIncrease(
                              item,
                              item.bundle_id,
                              item.quantity,
                              item.ori_price
                            )
                          }
                          className="bg-primary cursor-pointer text-white w-[30px] h-[30px] rounded-full justify-center flex items-center"
                        >
                          +
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Link to="/product">
        <div className=" w-[90%] left-[5%] relative flex justify-start">
          <button
            // onClick={handleAddToCart}
            className="border border-[#00B7FE] rounded-lg hover:bg-primary text-[#00B7FE] hover:text-white  w-[100%] md:w-[100px] bg-white h-[40px]"
          >
            Belanja Lagi
          </button>
        </div>
      </Link>
      <div>
        {selectedBundle.length + selectedProducts.length == 0 ? (
          ""
        ) : (
          <div className=" fixed bottom-0 pt-4 md:pl-16 pl-4  w-[100%] h-16 shadow-md border flex justify-between bg-white z-30">
            <div className="w-[70%] flex justify-start">
              <Coba6 text="Total  :" />
              <Coba14 text={grandTotal} />
            </div>

            <div className="w-[30%]">
              <button
                onClick={handleSubmit}
                className="border border-[#00B7FE] rounded-lg hover:bg-primary text-[#00B7FE] hover:text-white  text-xs px-2 md:w-[100px] bg-white h-[40px]"
              >
                Check Out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListCart;
