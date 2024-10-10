import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from "../reusableComponents/Button";
import axios from "axios";
import { GlobalContext } from "../../context/GlobalContext";
import cancel from "../../assets/cancel.png";
import {
  Coba1,
  Coba10,
  Coba11,
  Coba13,
  Coba5,
  Coba7,
  Coba8,
  Coba9,
} from "../reusableComponents/Text";
import Select from "react-select";
import AddAddressModal from "./AddAddressModal";
import { BtnAdmin4 } from "../reusableComponents/ButtonAdmin";
import Swal from "sweetalert2";

const initialState = {
  user_id: "",
};
const CheckOut = () => {
  const {
    selectedProducts,
    isModalOpen,
    isModalAddressOpen,
    isModalAddAddressOpen,
    setIsModalOpen,
    setIsModalAddressOpen,
    setIsModalAddAddressOpen,
    selectedBundle,
    setSelectedProducts,
    setSelectedBundle,
    calculate,
    setCalculate,
    detailCalculateProduct,
    setDetailCalculateProduct,
  } = useContext(GlobalContext);
  const Swal = require("sweetalert2");
  const navigate = useNavigate();
  const [input, setInput] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalWeight, setTotalWeight] = useState(0);
  const [totalPriceBundle, setTotalPriceBundle] = useState(0);
  const [totalWeightBundle, setTotalWeightBundle] = useState(0);
  const [user, setUser] = useState([]);
  const [userAddress, setUserAddress] = useState([]);
  const [kupon, setKupon] = useState([]);
  const [kuponSelected, setKuponSelected] = useState([]);
  const [constShipping, setCostShipping] = useState([]);
  const [addShipping, setShipping] = useState([]);
  const [isAddShipping, setIsAddShipping] = useState(false);
  const [selectedKurir, setSelectedKurir] = useState(null);
  const [ongkirNumeric, setOngkirNumeric] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState({
    city: "",
    city_id: "",
    created_at: "",
    detail_alamat: "",
    id: "",
    province: "",
    subdistrict_name: "",
    updated_at: "",
    user_id: "",
  });
  const [cities, setCities] = useState([]);
  //alamat pengirim
  const [selectedCity, setSelectedCity] = useState(419);
  //alamat tujuan
  const [selectedCity2, setSelectedCity2] = useState(null);

  // console.log("baruu ", user);

  const options = cities.map((city) => ({
    value: city.city_id,
    label: city.city_name,
  }));
  const options2 = cities.map((city2) => ({
    value: city2.city_id,
    label: city2.city_name,
  }));

  const fetchCities = async () => {
    try {
      const response = await axios.get(
        "https://laravel-api-10.cerise.id/api/rajaongkir/cities",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setCities(response.data);
      // console.log("Respon city ", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  // console.log("alamat pengirim", selectedCity);
  // console.log("alamat penerima", selectedCity2);

  // select 2 gudang
  const [warehouse, setWarehouse] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState(1);
  // console.log("selected warehouse", selectedWarehouse);

  const fetchWarehouse = async () => {
    try {
      const response = await axios.get(
        "https://laravel-api-10.cerise.id/api/warehouses",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setWarehouse(response.data.status);
      // console.log("Respon warehouse ", response.data.status);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWarehouse();
  }, []);

  const optionsWarehouse = warehouse.map((warehouse) => ({
    value: warehouse.id,
    label: warehouse.alamat,
  }));

  const openModal = () => {
    setIsModalOpen(true);
  };

  const openModalAlamat = () => {
    setIsModalAddressOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsModalAddressOpen(false);
    setIsModalAddAddressOpen(false);
    // setKuponSelected([]);
  };

  const selectAddrress = (item) => {
    setIsModalAddressOpen(false);
    setSelectedAddress(item);
  };

  // console.log("selected Address", selectedAddress);

  const openAddAddressModal = () => {
    setIsModalAddressOpen(false);
    setIsModalAddAddressOpen(true);
  };

  const saveModal = () => {
    setIsModalOpen(false);
  };

  const fetchKupon = async (query) => {
    try {
      const response = await axios.get(
        `https://laravel-api-10.cerise.id/api/setting-generals/coupons`
      );
      // console.log("respon kupon", response.data.status);
      const data = response.data.status;
      setKupon(data); // Assuming the API returns an array of products
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const fetchUser = async () => {
    try {
      const response = await axios.get(
        "https://laravel-api-10.cerise.id/api/member",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = response.data.user;
      const dataAddress = response.data.allAddress;
      setUser([data]);
    } catch (error) {
      console.log("error cart", error.response.status);
    }
  };

  const fetchAddress = async () => {
    try {
      const response = await axios.get(
        `https://laravel-api-10.cerise.id/api/member`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setInput(response.data.user.id);
      console.log("respon address user", response.data.allAddress);
      setUserAddress(response.data.allAddress);
    } catch (error) {
      console.log("error address", error);
    }
  };

  useEffect(() => {
    fetchKupon();
    fetchAddress();
  }, []);

  useEffect(() => {
    fetchUser();
  }, []);

  const handleKuponSelect = (kuponId) => {
    setKuponSelected((prevSelectedProducts) => {
      if (prevSelectedProducts.includes(kuponId)) {
        // Product is already selected, so remove it
        return prevSelectedProducts.filter((id) => id !== kuponId);
      } else {
        // Product is not selected, so add it
        return [...prevSelectedProducts, kuponId];
      }
    });
    setIsModalOpen(false);
  };

  const calculateTotalPrice = () => {
    const total = selectedProducts.reduce((acc, product) => {
      return acc + parseInt(product.ori_price) * parseInt(product.quantity);
    }, 0);
    return total;
  };

  const calculateTotalPriceBundle = () => {
    const total = selectedBundle.reduce((acc, product) => {
      return acc + parseInt(product.ori_price) * parseInt(product.quantity);
    }, 0);
    return total;
  };

  const calculateTotalWeight = () => {
    const total = selectedProducts.reduce((acc, product) => {
      return acc + product.totalWeightProductOri;
    }, 0);
    return total;
  };

  const calculateTotalWeightBundle = () => {
    const total = selectedBundle.reduce((acc, product) => {
      return acc + product.weightBundleTotal;
    }, 0);
    return total;
  };

  // Update total price when component mounts
  useState(() => {
    const initialTotalPrice = calculateTotalPrice();
    const initialTotalPriceBundle = calculateTotalPriceBundle();
    const initialTotalWeight = calculateTotalWeight();
    const initialTotalWeightBundle = calculateTotalWeightBundle();
    setTotalPrice(initialTotalPrice);
    setTotalPriceBundle(initialTotalPriceBundle);
    setTotalWeight(initialTotalWeight);
    setTotalWeightBundle(initialTotalWeightBundle);
  }, []);

  console.log("selected address", selectedAddress.city_id);
  console.log("weight", totalWeight + totalWeightBundle);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post(
        "https://laravel-api-10.cerise.id/api/rajaongkir/shipping-cost",
        {
          origin: selectedCity,
          destination: selectedAddress.city_id,
          weight: totalWeight + totalWeightBundle,
          selected_option: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setCostShipping(response.data.RajaOngkir);
      navigate("/check-out");
      setLoading(false);
    } catch (error) {
      console.log("error shipping cost", error);
      Swal.fire({
        title: " Error!",
        text: error,
        icon: "warning",
        confirmButtonText: "OK",
        confirmButtonColor: "#00B7FE",
      });
      setLoading(false);
    }
  };

  const AddCostShipping = (item) => {
    setShipping(item);
    const numericString = item.Ongkir.replace(/[^0-9]/g, "");
    const numericResult = parseInt(numericString, 10);
    setOngkirNumeric(numericResult);
  };

  const handleSubmitOrder = async () => {
    try {
      setLoading(true);

      const cartItems = [];

      selectedProducts.forEach((product, index) => {
        cartItems.push({
          product_id: product.product_id, // Use the correct property name
          quantity: product.quantity, // Use the correct property name
        });
      });

      selectedBundle.forEach((bundle) => {
        cartItems.push({
          bundle_id: bundle.bundle_id, // Use the correct property name
          quantity: bundle.quantity, // Use the correct property name
        });
      });

      const kupon = kuponSelected.map((kupon) => ({
        kupon_id: kupon.id,
      }));

      const numericString = addShipping.Ongkir.replace(/[^\d]/g, ""); // Remove non-numeric characters
      const convertedValue = parseInt(numericString, 10);
      const total = totalPrice + totalPriceBundle;
      const convertTotal = total.toLocaleString();

      const response = await axios.post(
        "https://laravel-api-10.cerise.id/api/carts/checkouts",
        {
          // selected_option: 1,
          coupon_codes: kupon,
          courier_id: addShipping.Courier,
          status_order: "1",
          status_pembayaran: "Belum Dibayar",
          ongkirRajaOngkir: numericString,
          etaRajaOngkir: addShipping.Estimasi,
          paketRajaOngkir: addShipping.Service,
          payment: convertTotal,
          warehouse_id: selectedWarehouse.value,
          cart_items: cartItems,
          note: user.note,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setLoading(false);
      Swal.fire({
        title: "Success!",
        text: "Berhasil Order",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#00B7FE",
      });
      console.log("responsukses", response.data.Order_Code);
      navigate(`/invoice/${response.data.Order_Code}`);
    } catch (error) {
      setLoading(false);
      console.log("error nya apa", error);
      Swal.fire({
        title: " Error!",
        text: error,
        icon: "warning",
        confirmButtonText: "OK",
        confirmButtonColor: "#00B7FE",
      });
    }
  };

  // Define a function to check if a coupon matches the product criteria
  const isCouponMatch = (kupon) => {
    const matchingProduct = selectedProducts.find(
      (product) =>
        product.product_id === kupon.product.id &&
        product.quantity === kupon.minimal_pembelian
    );

    return !!matchingProduct; // Return true if a match is found, otherwise false
  };

  //define a function to check selected coupon
  const isCouponSelectedMatch = (kupon) => {
    const matchingProduct = kuponSelected.find(
      (kuponSelect) => kuponSelect.id === kupon.id
    );

    return !!matchingProduct; // Return true if a match is found, otherwise false
  };
  console.log("user", user);

  const handleInputChange = (index, value) => {
    const updatedUser = [...user];
    updatedUser[index].email = value;
    setUser(updatedUser);
  };

  const handleInputChangeNote = (index, value) => {
    const updatedUser = [...user];
    updatedUser[index].note = value;
    setUser(updatedUser);
  };

  const handleInputChangeNoHp = (index, value) => {
    const updatedUser = [...user];
    updatedUser[index].no_wa = value;
    setUser(updatedUser);
  };

  return (
    <div className=" relative p-4">
      <div className="bg-white  rounded-lg shadow-lg relative md:flex w-[90%] left-[5%]">
        <div className=" relative bg-white w-[100%]  ">
          <div className=" w-[90%] relative left-[5%] text-left">
            <p className="font-bold text-lg text-[#00B7FE]">
              Alamat Pengiriman
            </p>
          </div>
          {user.map((item, index) => (
            <div className=" w-[90%] relative left-[5%] text-left">
              <div className=" py-3">
                <input
                  type="text"
                  value={item.name}
                  placeholder="Nama Lengkap"
                  className="border border-gray-300 w-[250px] md:w-[100%] px-4 h-[35px] rounded-lg"
                  disabled
                />
              </div>
              <div className=" py-3">
                <input
                  type="email"
                  value={item.email}
                  placeholder="Email"
                  className="border border-gray-300 w-[250px] md:w-[100%] px-4 h-[35px] rounded-lg"
                  onChange={(e) => handleInputChange(index, e.target.value)}
                />
              </div>
              <div className=" py-3">
                <input
                  type="text"
                  value={item.note}
                  placeholder="note"
                  className="border border-gray-300 w-[250px] md:w-[100%] px-4 h-[35px] rounded-lg"
                  onChange={(e) => handleInputChangeNote(index, e.target.value)}
                />
              </div>
              <div className=" py-3">
                <input
                  type="text"
                  value={item.no_wa}
                  placeholder="No Handphone"
                  className="border border-gray-300 w-[250px] md:w-[100%] px-4 h-[35px] rounded-lg"
                  onChange={(e) => handleInputChangeNoHp(index, e.target.value)}
                />
              </div>
              <button
                onClick={openModalAlamat}
                className="hover:bg-primary w-auto h-[40px] p-2 rounded-sm hover:text-white text-primary bg-white border border-primary "
              >
                Pilih Alamat
              </button>

              <div className=" py-3">
                <input
                  type="text"
                  placeholder="Kota/Kecamatan"
                  className="border border-gray-300 w-[250px] md:w-[100%] px-4 h-[35px] rounded-lg"
                  value={selectedAddress.city}
                  disabled
                />
              </div>
              <div className=" py-3">
                <input
                  type="text"
                  placeholder=""
                  className="border border-gray-300 w-[250px] md:w-[100%] px-4 h-[35px] rounded-lg"
                  value={selectedAddress.province}
                  disabled
                />
              </div>
              <div className=" py-3">
                <textarea
                  name=""
                  placeholder="Alamat Lengkap "
                  id=""
                  cols="30"
                  rows="10"
                  value={selectedAddress.detail_alamat}
                  className="border border-gray-300 w-[100%] md:w-[100%] px-4 rounded-lg"
                  disabled
                ></textarea>
              </div>

              {/* <div className="text-left pb-2">
                <Coba8 text="Alamat Tujuan " />
              </div>
              <div className="text-left pb-2">
                <Select
                  value={selectedCity2}
                  options={options2}
                  onChange={(selectedOption) =>
                    setSelectedCity2(selectedOption)
                  }
                  styles={{
                    container: (provided) => ({ ...provided, width: "100%" }),
                  }}
                  isClearable
                />
              </div> */}

              <div className="p-4 ">
                {loading ? (
                  <button
                    onClick={handleSubmit}
                    className=" mr-4 border border-primary bg-primary text-white h-[40px] w-[120px] rounded-md hover:bg-white hover:text-black"
                  >
                    Loading...
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className=" mr-4 border border-primary bg-primary text-white h-[40px] w-[120px] rounded-md hover:bg-white hover:text-primary"
                  >
                    Cek Ongkir
                  </button>
                )}
              </div>
              <div>
                Kurir Dipilih : {addShipping.Courier} , {addShipping.Service}
              </div>

              <div>
                {constShipping.map((item, index) => (
                  <div>
                    <div
                      onClick={() => AddCostShipping(item)}
                      key={index}
                      className="border-b border-gray-500 py-4 hover:bg-sky-100  "
                    >
                      <div className="flex justify-between ">
                        <div className="w-[10%]">
                          <Coba11 text="No" />
                        </div>
                        <div className="w-[20%]">
                          <Coba11 text="Kurir" />
                        </div>
                        <div className="w-[20%]">
                          <Coba11 text="Ongkir" />
                        </div>
                        <div className="w-[30%]">
                          <Coba11 text="Service" />
                        </div>
                      </div>
                      <div className="flex justify-between ">
                        <div className="w-[10%]">
                          <Coba7 text={index + 1} />
                        </div>
                        <div className="w-[20%]">
                          <Coba7 text={item.Courier} />
                        </div>
                        <div className="w-[20%]">
                          <Coba7 text={item.Ongkir} />
                        </div>
                        <div className="w-[30%]">
                          <Coba7 text={item.Service} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className=" relative bg-white w-[100%]  ">
          <div className=" w-[90%] relative left-[5%] text-left">
            <p className="font-bold text-lg text-[#00B7FE]">Detail Order</p>
            <p className="font-normal text-lg text-[#00B7FE]">Produk :</p>

            <div className=" bg-white ">
              {detailCalculateProduct.map((item, index) => (
                <div className="flex mb-4 bg-white shadow-md">
                  <div className="w-[30%]">
                    <img src="" alt="" />
                  </div>
                  <div className="w-[70%] ">
                    <p>Nama Produk : {item.product}</p>
                    <p>Berat : {item.weight}</p>
                    <p>QTY Produk : {item.qty}</p>
                    <p>Harga Produk : {item.amount_product}</p>
                    <p>Diskon Produk : {item.amount_discount_product}</p>
                    <p>Total : {item.regane_bar_discount_dikali_qty}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="font-normal text-lg text-[#00B7FE]">Bundle :</p>
            {selectedBundle.map((item, index) => (
              <div className="flex mb-4 bg-white shadow-md">
                <div className="w-[30%]">
                  <img src="" alt="" />
                </div>
                <div className="w-[70%]">
                  <p>Nama Produk : {item.name}</p>
                  <p>QTY Produk : {item.quantity}</p>
                  <p>Harga Produk : {item.subtotal}</p>
                </div>
              </div>
            ))}

            <hr />

            <p className="font-bold text-lg text-black">
              Total : {calculate.formatted}
            </p>
            <p className="font-bold text-lg text-black">
              Total Berat: {totalWeight + totalWeightBundle} g
            </p>
            <p className="font-bold text-lg text-black">
              Biaya Kirim : {addShipping.Ongkir}
            </p>
            <p className="font-bold text-lg text-black">
              Ekspedisi : {addShipping.Courier} - {addShipping.Service}
            </p>
            <p className="font-bold text-lg text-black">
              Total : {calculate.unformatted + ongkirNumeric}
            </p>

            {kuponSelected.map((item, index) => (
              <div>
                <div>
                  {item.jenis_potongan == "rupiah" ? (
                    <p className="font-bold text-lg text-black">
                      Potongan : (Rp {item.jumlah_potongan})
                    </p>
                  ) : (
                    <p className="font-bold text-lg text-black">
                      Potongan :
                      {(item.jumlah_potongan * item.product.price_sale) / 100}
                    </p>
                  )}
                </div>
                <div>
                  {item.jenis_potongan == "rupiah" ? (
                    <p className="font-bold text-lg text-black">
                      Total yang harus dibayar:
                      {calculate.unformatted +
                        ongkirNumeric -
                        item.jumlah_potongan}
                    </p>
                  ) : (
                    <p className="font-bold text-lg text-black">
                      Total yang harus dibayar:
                      {calculate.unformatted +
                        ongkirNumeric -
                        (item.jumlah_potongan * item.product.price_sale) / 100}
                    </p>
                  )}
                </div>
              </div>
            ))}

            <div className="flex ">
              <div className=" w-[30%] flex items-center">
                <p className="font-bold text-lg text-black">Kupon : </p>
                <div className="ml-2">
                  {kuponSelected.map((item, index) => (
                    <p>{item.name}</p>
                  ))}
                </div>
              </div>
              <div className=" w-[65%] pb-5">
                <button
                  onClick={openModal}
                  className="w-auto p-3 rounded-lg text-white bg-gradient-to-r from-primary to-primary-dark border-dashed border-2 border-primary hover:bg-gradient-to-l from-primary-dark to-primary relative"
                  style={{
                    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
                    fontWeight: "bold",
                    fontFamily: "Arial, sans-serif",
                    fontSize: "12px",
                  }}
                >
                  {/*<span className="absolute top-0 left-0 w-full h-3 bg-white"></span>*/}
                  Gunakan Kupon
                  {/*<span className="absolute bottom-0 left-0 w-full h-3 bg-white"></span>*/}
                </button>

                {isModalOpen && (
                  <div className=" z-10 fixed top-0 left-0 w-[100%] h-[100%] flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-white  rounded-md p-[20px] shadow-md max-w-[80%] max-h-[80%] overflow-auto">
                      <div className=" w-[21%] fixed text-end">
                        <button className="close-button" onClick={closeModal}>
                          <img src={cancel} alt="" className="w-[20px]" />
                        </button>
                      </div>
                      <div className="modal-content">
                        <h2>Pilih Kupon</h2>

                        {kupon.map((item, index) => (
                          <div
                            className={`w-[300px]  shadow-lg border border-gray-200 mb-4 cursor-pointer p-2 `}
                            key={item.id}
                          >
                            <p>{item.name}</p>
                            <p>{item.id}</p>
                            {kuponSelected.map((kuponSelected, index) => (
                              <p>{kuponSelected.id}</p>
                            ))}
                            {item.jenis_potongan == "rupiah" ? (
                              <p>{`Rp ${item.jumlah_potongan}`}</p>
                            ) : (
                              <p>{`${item.jumlah_potongan} %`}</p>
                            )}
                            <p>{`Minimal Pembelian: ${item.minimal_pembelian}`}</p>
                            <Coba10 text={`Produk : ${item.product.name}`} />
                            {isCouponMatch(item) ? (
                              ""
                            ) : (
                              <div>
                                <Coba5 text="Kupon tidak bisa digunakan" />
                              </div>
                            )}

                            {isCouponSelectedMatch(item) ? (
                              <div>
                                <Coba13 text="Kupon sudah dipilih" />
                              </div>
                            ) : (
                              <div>
                                {isCouponMatch(item) ? (
                                  <div>
                                    <button
                                      className="bg-primary text-white rounded-md p-2 text-xs"
                                      onClick={() => handleKuponSelect(item)}
                                    >
                                      PIlih Kupon
                                    </button>
                                  </div>
                                ) : (
                                  ""
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      <div onClick={saveModal}>
                        <button className="bg-white border border-primary px-4 py-2 rounded-md  text-primary hover:bg-primary hover:text-white">
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {isModalAddressOpen && (
                  <div className="fixed top-0 left-0 w-[100%] h-[100%] flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-white  rounded-md p-[20px] shadow-md max-w-[80%] max-h-[80%] overflow-auto">
                      <div className="flex justify-end">
                        <button className="close-button" onClick={closeModal}>
                          <img src={cancel} alt="" className="w-[20px]" />
                        </button>
                      </div>
                      <div className="modal-content ">
                        <h2>Pilih Alamat</h2>

                        {user && (
                          <div className="w-[300px] ">
                            <div>
                              <button
                                onClick={openAddAddressModal}
                                className="bg-primary py-2 px-4 text-white rounded-lg my-2 "
                              >
                                Tambah Alamat
                              </button>
                            </div>

                            {userAddress.length === 0 ? (
                              <p>Anda belum mempunyai alamat </p>
                            ) : (
                              <div>
                                {userAddress.map((item, index) => (
                                  <div className="  flex shadow-lg border border-gray-200 mb-4 cursor-pointer items-start">
                                    <div className="mt-1 ml-2">
                                      <button
                                        onClick={() => selectAddrress(item)}
                                        className="border border-primary px-4 hover:bg-primary hover:text-white"
                                      >
                                        Pilih
                                      </button>
                                    </div>
                                    <div className="ml-4">
                                      <p>{item.city}</p>
                                      <p>{item.province}</p>
                                      <p>{item.subdistrict_name}</p>
                                      <p>{item.detail_alamat}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {isModalAddAddressOpen && (
                  <div className="fixed top-0 left-0 w-[100%]  h-[100%] flex justify-center items-center bg-black bg-opacity-50  ">
                    <div className="bg-white  rounded-md p-[20px]  shadow-md w-[95%] md:w-[60%] md:h-[80%] overflow-auto  ">
                      <div className="flex justify-end">
                        <button className="close-button" onClick={closeModal}>
                          <img src={cancel} alt="" className="w-[20px]" />
                        </button>
                      </div>
                      <div className="modal-content ">
                        <AddAddressModal />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="mt-8  py-3 hidden lg:block">
            <button
              onClick={handleSubmitOrder}
              className="bg-white border w-[90%] border-primary px-4 py-2 rounded-full text-primary hover:bg-primary hover:text-white"
            >
              Buat Pesanan
            </button>
          </div>
          <div className="fixed z-20 bottom-0 left-0 right-0 py-3 px-4 bg-white lg:hidden md:hidden">
            <button
              onClick={handleSubmitOrder}
              className="w-full border border-primary px-4 text-white bg-primary py-2 rounded-full text-primary hover:bg-primary hover:text-white"
            >
              Buat Pesanan
            </button>
          </div>
        </div>
      </div>
      <div className="   flex justify-end w-[90%] left-[5%] my-8 sticky bottom-0 z-10">
        <Link to="https://api.whatsapp.com/send?phone=087832171593">
          <button className="">
            {/* <img src={wa} alt="" className="w-[40px]" /> */}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CheckOut;
