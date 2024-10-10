import React, { useState, useEffect } from "react";
import {
  Coba10,
  Coba11,
  Coba6,
  Coba7,
  Coba8,
} from "../../components/reusableComponents/Text";
import axios from "axios";
import edit from "../../assets/edit.png";
import trash from "../../assets/delete.png";
import Select from "react-select";
import emptyBox from "../../assets/empty-box.png";
import { useNavigate } from "react-router-dom";
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";
import Swal from "sweetalert2";

const AddOrder = () => {
  const navigate = useNavigate();
  const Swal = require("sweetalert2");
  const [loading, setLoading] = useState(false);
  const [constShipping, setCostShipping] = useState([]);

  // alamat penerima dan pemesan
  const [cityPenerima, setCityPenerima] = useState("");
  const [cityPemesan, setCityPemesan] = useState("");

  // calculate
  const [calculate, setCalculate] = useState("");
  const [calculateDisc, setCalculateDisc] = useState("");
  const [detailCalculateProduct, setDetailCalculateProduct] = useState([]);
  const [totalDiscountTable, setTotalDiscountTable] = useState(0);

  // console.log("coupon_discount", detailCalculateProduct);
  // select 2 cities
  const [cities, setCities] = useState([]);
  //alamat pengirim
  const [selectedCity, setSelectedCity] = useState(null);
  //alamat tujuan
  const [selectedCity2, setSelectedCity2] = useState(null);

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
      // console.log(error);
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  // console.log("alamat pengirim", selectedCity);
  // console.log("alamat penerima", selectedCity2);

  const options = cities.map((city) => ({
    value: city.city_id,
    label: city.city_name,
  }));
  const options2 = cities.map((city2) => ({
    value: city2.city_id,
    label: city2.city_name,
  }));

  // select 2 gudang
  const [warehouse, setWarehouse] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);

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
      // console.log(error);
    }
  };

  useEffect(() => {
    fetchWarehouse();
  }, []);

  const optionsWarehouse = warehouse.map((warehouse) => ({
    value: warehouse.id,
    label: warehouse.alamat,
  }));

  // select 2 kurir
  const [kurir, setKurir] = useState([]);
  const [selectedKurir, setSelectedKurir] = useState(null);

  const fetchKurir = async () => {
    try {
      const response = await axios.get(
        "https://laravel-api-10.cerise.id/api/setting-generals/couriers",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setKurir(response.data.data);
      // console.log("Respon kurir ", response);
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    fetchKurir();
  }, []);

  const optionsKurir = kurir.map((kurir) => ({
    value: kurir.id,
    label: kurir.name,
  }));

  // select 2 channel
  const [channel, setChannel] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null);

  const fetchChannel = async () => {
    try {
      const response = await axios.get(
        "https://laravel-api-10.cerise.id/api/setting-generals/sales-channels",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setChannel(response.data.data);
      // console.log("Respon Channel ", response);
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    fetchChannel();
  }, []);

  const optionsChannel = channel.map((channel) => ({
    value: channel.id,
    label: channel.name,
  }));

  // select Bank Account
  const [bank, setBank] = useState([]);

  const fetchBank = async () => {
    try {
      const response = await axios.get(
        "https://laravel-api-10.cerise.id/api/setting-generals",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setBank(response.data.data);
      // console.log("Respon Bank Account ", response.data.data);
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    fetchBank();
  }, []);

  // total price and weight
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalWeight, setTotalWeight] = useState(0);

  // console.log("total weight", totalWeight);

  // handle search kupon
  const [searchQueryKupon, setSearchQueryKupon] = useState("");
  const [searchResultsKupon, setSearchResultsKupon] = useState([]);
  const [addKupon, setAddKupon] = useState([]);
  const [isAddKupon, setIsAddKupon] = useState(false);

  const fetchKupon = async (query) => {
    try {
      const response = await axios.get(
        `https://laravel-api-10.cerise.id/api/setting-generals/coupons?search=${query}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log("respon kupon", response.data.status);
      const data = response.data.status;
      setSearchResultsKupon(data.splice(0, 3)); // Assuming the API returns an array of products
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSearchChangeKupon = (event) => {
    const query = event.target.value;
    setSearchQueryKupon(query);
    fetchKupon(query);
  };
  const AddKupon2 = (kupon) => {
    // Check if the product already exists in the addedProducts array
    const isProductAdded = addKupon.some(
      (addKupon) => addKupon.id === kupon.id
    );
    setIsAddKupon(true);

    if (!isProductAdded) {
      // If the product is not already added, add it with a quantity of 1
      const penerima = {
        ...kupon,
      };
      setAddKupon((prevProducts) => [...prevProducts, penerima]);
      Swal.fire({
        title: "Success!",
        text: `Kupon ${kupon.name}   berhasil ditambah`,
        confirmButtonColor: "#3085d6",
        icon: "success",
        confirmButtonText: "OK",
      });
    } else {
      Swal.fire({
        title: "Success!",
        text: `Kupon ${kupon.name}   berhasil ditambah`,
        confirmButtonColor: "#3085d6",
        icon: "success",
        confirmButtonText: "OK",
      });
    }
  };

  const handleDeleteKupon = (index) => {
    const updatedList = addKupon.filter((_, i) => i !== index);
    setAddKupon(updatedList);
  };

  // handle search pemesan
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [addPemesan, setAddPemesan] = useState([]);
  const [addIdPengirim, setAddIdPengirim] = useState("");
  const [isAddPemesan, setIsAddPemesan] = useState(false);

  console.log("add pemesan", addPemesan);
  console.log("add city_id", cityPemesan);
  console.log("add city_id penerima", cityPenerima);
  const fetchPemesan = async (query) => {
    try {
      const response = await axios.get(
        `https://laravel-api-10.cerise.id/api/user/all?search=${query}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log("respon", response.data.data);
      const data = response.data.data;
      setSearchResultsPenerima(data.splice(0, 3)); // Assuming the API returns an array of products
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    fetchPenerima(query);
  };
  console.log("search result", searchResults);
  const AddMembers = (member) => {
    // Check if the product already exists in the addedProducts array
    const isProductAdded = addPemesan.some(
      (addPemesan) => addPemesan.id === member.id
    );

    if (member.address_primary && member.address_primary.city_id !== null) {
      setIsAddPemesan(true);
      setCityPemesan(member.address_primary.city_id);
      setCityPenerima(member.address_primary.city_id);
    } else {
      Swal.fire({
        title: "Error",
        text: "Silahkan Lengkapi Data Alamat Member",
        confirmButtonColor: "#3085d6",
        icon: "error",
        confirmButtonText: "OK",
      }).then(() => {
        // Redirect to /addAddress
        navigate(`/admin/user/userDetail/${member.id}`);
      });
      return;
    }

    if (!isProductAdded) {
      // If the product is not already added, add it with a quantity of 1
      const productWithQuantity = {
        ...member,
      };
      setAddPemesan([productWithQuantity]);
      setAddPenerima([productWithQuantity]);
      setAddIdPengirim(productWithQuantity);
      Swal.fire({
        title: "Success!",
        text: `Pemesan ${member.name} berhasil ditambahkan`,
        confirmButtonColor: "#3085d6",
        icon: "success",
        confirmButtonText: "OK",
      });
      // alert("Product added: " + member.name);
    } else {
      Swal.fire({
        title: "Success!",
        text: `Pemesan ${member.name} berhasil diubah`,
        confirmButtonColor: "#3085d6",
        icon: "success",
        confirmButtonText: "OK",
      });
      // alert("Quantity increased for: " + member.name);
    }
  };

  const editPemesan = () => {
    setIsAddPemesan(false);
  };

  // handle search penerima
  const [searchQueryPenerima, setSearchQueryPenerima] = useState("");
  const [searchResultsPenerima, setSearchResultsPenerima] = useState([]);
  const [addPenerima, setAddPenerima] = useState([]);
  const [isAddPenerima, setIsAddPenerima] = useState(false);

  const fetchPenerima = async (query) => {
    try {
      const response = await axios.get(
        `https://laravel-api-10.cerise.id/api/user/all?search=${query}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log("respon", response.data.data);
      const data = response.data.data;
      setSearchResults(data.splice(0, 3)); // Assuming the API returns an array of products
    } catch (error) {
      console.error("Error fetch penerima:", error);
    }
  };

  const handleSearchChangePenerima = (event) => {
    const query = event.target.value;
    setSearchQueryPenerima(query);
    fetchPemesan(query);
  };

  const AddPenerima2 = (member) => {
    // Check if the product already exists in the addedProducts array
    const isProductAdded = addPenerima.some(
      (addPenerima) => addPenerima.id === member.id
    );
    setIsAddPenerima(true);

    if (!isProductAdded) {
      // If the product is not already added, add it with a quantity of 1
      const penerima = {
        ...member,
      };
      setCityPenerima(member.address_primary.city_id);

      Swal.fire({
        title: "Success!",
        text: `Penerima ${member.name}   berhasil ditambah`,
        confirmButtonColor: "#3085d6",
        icon: "success",
        confirmButtonText: "OK",
      });
    } else {
      Swal.fire({
        title: "Success!",
        text: `Penerima ${member.name}   berhasil diubah`,
        confirmButtonColor: "#3085d6",
        icon: "success",
        confirmButtonText: "OK",
      });
    }
  };

  const editPenerima = () => {
    setIsAddPenerima(false);
  };
  // handle search produk
  const [searchQueryProduk, setSearchQueryProduk] = useState("");
  const [searchResultsProduk, setSearchResultsProduk] = useState([]);
  const [addProduk, setAddProduk] = useState([]);
  const [isAddProduk, setIsAddProduk] = useState(false);

  // handle search bundle
  const [searchQueryBundle, setSearchQueryBundle] = useState("");
  const [searchResultsBundle, setSearchResultsBundle] = useState([]);
  const [addBundle, setAddBundle] = useState([]);
  const [isAddBundle, setIsAddBundle] = useState(false);

  // handle search pemesan

  // handle search produk
  const fetchProduk = async (query) => {
    try {
      const response = await axios.get(
        `https://laravel-api-10.cerise.id/api/products?search=${query}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log("respon produk", response.data.success);
      const data = response.data.success;
      setSearchResultsProduk(data.splice(0, 3)); // Assuming the API returns an array of products
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSearchChangeProduk = (event) => {
    const query = event.target.value;
    setSearchQueryProduk(query);
    fetchProduk(query);
    setIsAddProduk(false);
  };

  const AddProduk2 = (product) => {
    // Check if the product already exists in the addedProducts array
    const isProductAdded = addProduk.some(
      (addProduk) => addProduk.id === product.id
    );

    if (!isProductAdded) {
      // If the product is not already added, add it with a quantity of 1
      const productWithQuantity = {
        ...product,
        qty: 1,
        total: product.price_sale,
      };
      setAddProduk((prevProducts) => [...prevProducts, productWithQuantity]);
      Swal.fire({
        title: "Success!",
        text: `Produk ${product.name}   berhasil ditambah`,
        confirmButtonColor: "#3085d6",
        icon: "success",
        confirmButtonText: "OK",
      });
      // alert("Product added: " + product.name);
      setIsAddProduk(true);

      // calculate price
      const handleNum1Change = parseInt(product.price_sale);
      const handleNewNumChange = parseInt(totalPrice);
      const newTotalPrice = handleNum1Change + handleNewNumChange;
      setTotalPrice(newTotalPrice);

      // calculate weight
      const handleWeight = parseInt(product.berat);
      const handleNewWeight = parseInt(totalWeight);
      const newTotalWeight = handleWeight + handleNewWeight;
      setTotalWeight(newTotalWeight);
    } else {
      Swal.fire({
        title: "Success!",
        text: `Produk ${product.name}   berhasil ditambah`,
        confirmButtonColor: "#3085d6",
        icon: "success",
        confirmButtonText: "OK",
      });
      // alert("Quantity increased for: " + product.name);
    }
  };

  const increaseQuantity = (productId) => {
    const updatedProducts = [...addProduk];
    const existingProductIndex = updatedProducts.findIndex(
      (addProduk) => addProduk.id === productId
    );

    if (existingProductIndex !== -1) {
      const existingProduct = updatedProducts[existingProductIndex];
      const newQty = existingProduct.qty + 1;
      const newTotal = existingProduct.price_sale * newQty;
      updatedProducts[existingProductIndex] = {
        ...existingProduct,
        qty: newQty,
        total: newTotal,
      };
      setAddProduk(updatedProducts);

      // handle TOTAL PRODUK
      const handleNum1Change = parseInt(existingProduct.price_sale);
      const handleNewNumChange = parseInt(totalPrice);
      const newTotalPrice = handleNum1Change + handleNewNumChange;
      setTotalPrice(newTotalPrice);

      // handle TOTAL WEIGHT
      const handleWeight = parseInt(existingProduct.berat);
      const handleNewWeight = parseInt(totalWeight);
      const newTotalWeight = handleWeight + handleNewWeight;
      setTotalWeight(newTotalWeight);
    }
  };

  // console.log("total harga", totalPrice);

  const decreaseQuantity = (productId) => {
    const updatedProducts = [...addProduk];
    const existingProductIndex = updatedProducts.findIndex(
      (addProduk) => addProduk.id === productId
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
        setAddProduk(updatedProducts);

        // handle TOTAL PRICE
        const handleNum1Change = parseInt(existingProduct.price_sale);
        const handleNewNumChange = parseInt(totalPrice);
        const newTotalPrice = handleNewNumChange - handleNum1Change;
        setTotalPrice(newTotalPrice);

        // handle TOTAL WEIGHT

        // handle TOTAL WEIGHT
        const handleWeight = parseInt(existingProduct.berat);
        const handleNewWeight = parseInt(totalWeight);
        const newTotalWeight = handleWeight + handleNewWeight;
        setTotalWeight(newTotalWeight);
      } else {
        // If the quantity becomes zero, remove the product from the addedProducts array
        alert("Apakah anda ingin menghapus produk?");
        updatedProducts.splice(existingProductIndex, 1);
        setAddProduk(updatedProducts);

        const handleNewNumChange = parseInt(totalPrice);
        const handleNum1Change = parseInt(existingProduct.price_sale);
        setTotalPrice(handleNewNumChange - handleNum1Change);
      }
    }
  };

  // handle search bundle
  const fetchBundle = async (query) => {
    try {
      const response = await axios.get(
        `https://laravel-api-10.cerise.id/api/bundles?search=${query}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log("respon bundle", response.data.data);
      const data = response.data.data;

      setSearchResultsBundle(data.splice(0, 3)); // Assuming the API returns an array of products
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const handleSearchChangeBundle = (event) => {
    const query = event.target.value;
    setSearchQueryBundle(query);
    fetchBundle(query);
    setIsAddBundle(false);
  };

  const AddBundle2 = (bundle) => {
    // Check if the product already exists in the addedProducts array
    const isProductAdded = addBundle.some(
      (addBundle) => addBundle.id === bundle.id
    );

    if (!isProductAdded) {
      // If the product is not already added, add it with a quantity of 1
      const productWithQuantity = {
        ...bundle,
        qty: 1,
        total: bundle.price_bundle,
      };
      setAddBundle((prevProducts) => [...prevProducts, productWithQuantity]);
      Swal.fire({
        title: "Success!",
        text: `Bundle ${bundle.name}   berhasil ditambah`,
        confirmButtonColor: "#3085d6",
        icon: "success",
        confirmButtonText: "OK",
      });
      // alert("Bundle added: " + bundle.name);
      setIsAddBundle(true);

      // calculate price
      const handleNum1Change = parseInt(bundle.price_bundle);
      const handleNewNumChange = parseInt(totalPrice);
      const newTotalPrice = handleNum1Change + handleNewNumChange;
      setTotalPrice(newTotalPrice);

      // calculate weight
      let totalBerat = 0;
      bundle.products.forEach((bundle) => {
        totalBerat += parseInt(bundle.berat);
      });

      const handleNewWeight = parseInt(totalWeight);
      const newTotalWeight = totalBerat + handleNewWeight;
      setTotalWeight(newTotalWeight);
    } else {
      Swal.fire({
        title: "Success!",
        text: `Bundle ${bundle.name}   berhasil ditambah`,
        confirmButtonColor: "#3085d6",
        icon: "success",
        confirmButtonText: "OK",
      });
    }
  };
  // console.log("total weight bundle ", totalWeight);

  const increaseQuantityBundle = (bundleId) => {
    const updatedProducts = [...addBundle];
    const existingProductIndex = updatedProducts.findIndex(
      (addBundle) => addBundle.id === bundleId
    );

    if (existingProductIndex !== -1) {
      const existingProduct = updatedProducts[existingProductIndex];
      const newQty = existingProduct.qty + 1;
      const newTotal = existingProduct.price_bundle * parseInt(newQty);
      updatedProducts[existingProductIndex] = {
        ...existingProduct,
        qty: newQty,
        total: newTotal,
      };
      setAddBundle(updatedProducts);

      //TOTAL HARGA
      const handleNum1Change = parseInt(existingProduct.price_bundle);
      const handleNewNumChange = parseInt(totalPrice);
      const newTotalPrice = handleNum1Change + handleNewNumChange;
      setTotalPrice(newTotalPrice);

      //TOTAL WEIGHT
      let totalBerat = 0;
      existingProduct.products.forEach((product) => {
        totalBerat += parseInt(product.berat);
      });

      const handleNewWeight = parseInt(totalWeight);
      const newTotalWeight = totalBerat + handleNewWeight;
      setTotalWeight(newTotalWeight);
    }
  };

  const decreaseQuantityBundle = (bundleId) => {
    const updatedProducts = [...addBundle];
    const existingProductIndex = updatedProducts.findIndex(
      (addBundle) => addBundle.id === bundleId
    );

    if (existingProductIndex !== -1) {
      const existingProduct = updatedProducts[existingProductIndex];
      const newQty = existingProduct.qty - 1;
      const newTotal = existingProduct.price_bundle * parseInt(newQty);

      if (newQty > 0) {
        updatedProducts[existingProductIndex] = {
          ...existingProduct,
          qty: newQty,
          total: newTotal,
        };
        setAddBundle(updatedProducts);

        //HANDLE TOTAL
        const handleNum1Change = parseInt(existingProduct.price_bundle);
        const handleNewNumChange = parseInt(totalPrice);
        const newTotalPrice = handleNewNumChange - handleNum1Change;
        setTotalPrice(newTotalPrice);

        //HANDLE WEIGHT
        let totalBerat = 0;
        existingProduct.products.forEach((product) => {
          totalBerat += parseInt(product.berat);
        });

        const handleNewWeight = parseInt(totalWeight);
        const newTotalWeight = handleNewWeight - totalBerat;
        setTotalWeight(newTotalWeight);
      } else {
        // If the quantity becomes zero, remove the product from the addedProducts array
        updatedProducts.splice(existingProductIndex, 1);
        setAddBundle(updatedProducts);
        alert("Apakah anda ingin menghapus produk?");

        //PRODUK
        const handleNewNumChange = parseInt(totalPrice);
        const handleNum1Change = parseInt(existingProduct.price_bundle);
        setTotalPrice(handleNewNumChange - handleNum1Change);

        //WEIGHT
        let totalBerat = 0;
        existingProduct.products.forEach((product) => {
          totalBerat += parseInt(product.berat);
        });

        const handleNewWeight = parseInt(totalWeight);
        const newTotalWeight = handleNewWeight - totalBerat;
        setTotalWeight(newTotalWeight);
      }
    }
  };

  // handle toggle
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let destination;
    if (cityPenerima === cityPemesan) {
      destination = "419";
    } else {
      destination = cityPemesan; // Set to the value from cityPemesan or any other appropriate value
    }
    const confirmationResult = await Swal.fire({
      title: "Apakah anda ingin menambah cost shipping?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
    });
    if (confirmationResult.isConfirmed) {
      try {
        setLoading(true);
        const response = await axios.post(
          "https://laravel-api-10.cerise.id/api/rajaongkir/shipping-cost",
          {
            origin: 1,
            destination: destination,
            weight: totalWeight,
            // selected_option: 1,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        Swal.fire({
          title: "Success!",
          text: "Berhasil ",
          confirmButtonColor: "#3085d6",
          icon: "success",
          confirmButtonText: "OK",
        });
        // console.log("coba shipping ", response.data.RajaOngkir);
        setCostShipping(response.data.RajaOngkir);
        navigate("/admin/order/addOrder");
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
        Swal.fire({
          title: "Error!",
          text: `  ${error}`,
          icon: "warning",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        });
      }
    }
  };

  // select kurir
  const [addShipping, setShipping] = useState([]);
  const [isAddShipping, setIsAddShipping] = useState(false);
  const AddCostShipping = (constShipping) => {
    // Check if the product already exists in the addedProducts array
    const isProductAdded = addPemesan.some(
      (addPemesan) => addPemesan.id === constShipping.id
    );
    setIsAddShipping(true);

    if (!isProductAdded) {
      // If the product is not already added, add it with a quantity of 1
      const shipping = {
        ...constShipping,
      };
      setShipping([shipping]);
      alert("Product added: " + constShipping.name);
    } else {
      alert("Quantity increased for: " + constShipping.name);
    }
  };

  // console.log("kurir", addShipping);

  const [input, setInput] = useState({
    detail_alamat: "",
    order_date: "",
    status_pembayaran: "",
    note: "",
  });

  // console.log("kupon", addKupon);

  const handleChange = (event) => {
    if (event.target.name === "order_date") {
      setInput({ ...input, order_date: event.target.value });
    } else if (event.target.name == "detail_alamat") {
      setInput({ ...input, detail_alamat: event.target.value });
    } else if (event.target.name == "status_pembayaran") {
      setInput({ ...input, status_pembayaran: event.target.value });
    } else if (event.target.name == "note") {
      const truncatedValue = event.target.value.substring(0, 250);
      setInput({ ...input, note: truncatedValue });
    } else if (event.target.name == "payment") {
      setInput({ ...input, payment: event.target.value });
    } else if (event.target.name == "paymentDate") {
      setInput({ ...input, paymentDate: event.target.value });
    }
  };

  const handleSubmitOrder = async () => {
    const confirmationResult = await Swal.fire({
      title: "Apakah anda ingin menyimpan order ?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
    });
    if (confirmationResult.isConfirmed) {
      try {
        setLoading(true);
        const send_for = addPenerima.length > 0 ? addPenerima[0].id : null;
        const user_id = addPemesan.length > 0 ? addPemesan[0].id : null;
        const warehouseee = warehouse.length > 0 ? warehouse[0].id : null;
        const channell = channel.length > 0 ? channel[0].id : null;
        const kurirr = kurir.length > 0 ? kurir[0].id : null;

        const productsData = addProduk.map((produk) => ({
          product_id: produk.id,
          quantity: produk.qty,
        }));
        const bundles = addBundle.map((bundles) => ({
          bundle_id: bundles.id,
          quantity: bundles.qty,
        }));

        const kupon = addKupon.map((kupon) => ({
          kupon_id: kupon.id,
        }));

        // console.log("user_id", user_id);
        const response = await axios.post(
          "https://laravel-api-10.cerise.id/api/orders/create",
          {
            // selected_option: 1,
            send_for: send_for,
            user_id: user_id,
            coupon_codes: addKupon.name,
            products: productsData,
            courier_id: kurirr,
            // island_id: "",
            // province_id: "",
            // city_id: "",
            detail_alamat: input.detail_alamat,
            order_date: input.order_date,
            status_order: "1",
            status_pembayaran: input.status_pembayaran,
            note: input.note, // max 250
            bundles: bundles,
            warehouse_id: warehouseee,
            sales_channel_id: channell,
            paketRajaOngkir: "REG",
            etaRajaOngkir: "3-4",
            ongkirRajaOngkir: "30000",
            payment: input.payment,
            paymentDate: input.paymentDate,
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
          text: "Order Berhasil Ditambahkan ",
          confirmButtonColor: "#3085d6",
          icon: "success",
          confirmButtonText: "OK",
        });
        navigate("/admin/order/addOrder");
      } catch (error) {
        setLoading(false);
        console.log("error gagal order", error);
        Swal.fire({
          title: "Gagal!",
          text: "Order Gagal ",
          confirmButtonColor: "#d33",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    }
  };

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red; // Customize the spinner color if needed
  `;

  const CalculatePrice = async (event) => {
    event.preventDefault();
    const confirmationResult = await Swal.fire({
      title: "Apakah anda ingin menghitung total produk?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
    });
    if (confirmationResult.isConfirmed) {
      try {
        setLoading(true);

        const cartItems = [];
        const productsData = addProduk.map((produk) => ({
          product_id: produk.id,
          quantity: produk.qty,
        }));
        const bundles = addBundle.map((bundles) => ({
          bundle_id: bundles.id,
          quantity: bundles.qty,
        }));
        // const kupon = addKupon.map((kupon) => ({
        //   coupon_codes: kupon.name,
        // }));
        const kuponCodes = addKupon.map((kupon) => kupon.name);

        const response = await axios.post(
          "https://laravel-api-10.cerise.id/api/orders/calculate-order",
          {
            coupon_codes: kuponCodes,
            products: productsData,
            bundles: bundles,
            user_id: addIdPengirim.id,
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
          text: "Hitung Harga Produk Berhasil ",
          confirmButtonColor: "#3085d6",
          icon: "success",
          confirmButtonText: "OK",
        });
        console.log("respon calculate : ", response.data.total_price);
        setCalculate(response.data.total_price);
        setCalculateDisc(response.data.coupon_discount);
        setDetailCalculateProduct(response.data.product_responses);

        // Calculate the sum of discountTable values
        const totalDiscountTable = response.data.product_responses.reduce(
          (accumulator, product) => accumulator + product.discountTable,
          0
        );

        // Update the totalDiscountTable state
        setTotalDiscountTable(totalDiscountTable);
        navigate("/admin/order/addOrder");
      } catch (error) {
        setLoading(false);
        console.log("error hitung harga", error);
        Swal.fire({
          title: "Error!",
          text: `Gagal menghitung produk`,
          icon: "warning",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        });
      }
    }
  };

  console.log("list prooduk", searchResultsBundle);
  return (
    <div>
      {loading ? (
        <div className="loading-container">
          <ClipLoader
            color="rgb(8 47 73)"
            loading={loading}
            css={override}
            size={50}
          />
        </div>
      ) : (
        <div className="w-[95%] relative ">
          <div className="relative grid lg:grid-cols-3 grid-cols-2 gap-4">
            <div className="bg-white p-4 ">
              {/* Pilih pemesan */}
              <div className="text-left pb-2">
                {!isAddPemesan ? (
                  <Coba8 text="Pilih Pemesan" />
                ) : (
                  <Coba8 text="Nama Pemesan" />
                )}
              </div>
              <div className="">
                {!isAddPemesan ? (
                  <div className=" w-[100%] ">
                    <div className="w-[100%] relative flex justify-start">
                      <input
                        type="text"
                        placeholder="Cari Pemesan..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="w-[800px] h-[45px] border border-[#D3D3D3] rounded-lg pl-4"
                      />
                    </div>
                    <div className="mt-4  w-[100%] h-auto rounded-lg ">
                      <ul>
                        {searchResults.map((member) => (
                          <div
                            onClick={() => AddMembers(member)}
                            className="flex items-center border border-gray-300 my-2 w-[100%] h-auto pl-4 rounded-lg shadow-lg"
                          >
                            <div className=" w-[100%] text-left my-2 ">
                              <li key={member.id}>
                                <Coba11 text={`Gender :  ${member.name}`} />
                                <Coba6 text={`Gender :  ${member.email}`} />
                                <Coba6 text={`Gender :  ${member.no_wa}`} />
                                <Coba6 text={`Gender :  ${member.gender}`} />
                              </li>
                            </div>
                          </div>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <p></p>
                )}
                <div className="w-[100%] flex ">
                  <div className=" w-[100%] ">
                    {addPemesan.map((addPemesan, index) => (
                      <div className="w-[100%] flex" key={index}>
                        <div className="text-left w-[80%]">
                          <Coba11 text={`Gender :  ${addPemesan.name}`} />
                          <Coba6 text={`Gender :  ${addPemesan.email}`} />
                          <Coba6 text={`Gender :  ${addPemesan.no_wa}`} />
                          <Coba6 text={`Gender :  ${addPemesan.gender}`} />
                        </div>
                        <div className="w-[20%] ">
                          <img
                            src={edit}
                            alt=""
                            className="w-[25px]"
                            onClick={editPemesan}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Pilih Penerima */}
              <div className="text-left pb-2">
                {!isAddPenerima ? (
                  <Coba8 text="Pilih Penerima" />
                ) : (
                  <Coba8 text="Nama Penerima" />
                )}
              </div>
              <div className="">
                {!isAddPenerima ? (
                  <div className=" w-[100%] ">
                    <div className="w-[100%] relative flex justify-start">
                      <input
                        type="text"
                        placeholder="Cari Penerima..."
                        value={searchQueryPenerima}
                        onChange={handleSearchChangePenerima}
                        className="w-[800px] h-[45px] border border-[#D3D3D3] rounded-lg pl-4"
                      />
                    </div>
                    <div className="mt-4  w-[100%] h-auto rounded-lg ">
                      <ul>
                        {searchResultsPenerima.map((member, index) => (
                          <div
                            key={index}
                            onClick={() => AddPenerima2(member)}
                            className="flex items-center border border-gray-300 my-2 w-[100%] h-auto pl-4 rounded-lg shadow-lg"
                          >
                            <div className=" w-[100%] text-left my-2 ">
                              <li key={member.id}>
                                <Coba11 text={`Gender :  ${member.name}`} />
                                <Coba6 text={`Gender :  ${member.email}`} />
                                <Coba6 text={`Gender :  ${member.no_wa}`} />
                                <Coba6 text={`Gender :  ${member.gender}`} />
                              </li>
                            </div>
                          </div>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <p></p>
                )}
                <div className="w-[100%] ">
                  <div className="  ">
                    {addPenerima.map((addPenerima, index) => (
                      <div className="w-[100%] flex" key={index}>
                        <div className="text-left w-[80%]">
                          <Coba11 text={`Gender :  ${addPenerima.name}`} />
                          <Coba6 text={`Gender :  ${addPenerima.email}`} />
                          <Coba6 text={`Gender :  ${addPenerima.no_wa}`} />
                          <Coba6 text={`Gender :  ${addPenerima.gender}`} />
                        </div>
                        <div className="w-[20%] ">
                          <img
                            src={edit}
                            alt=""
                            className="w-[25px]"
                            onClick={editPenerima}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Pilih Pengiriman Dari  */}
              {/* <div className="text-left pb-2">
                <Coba8 text="Pengiriman dari " />
              </div>
              <div className="text-left pb-2">
                <Select
                  value={selectedCity}
                  options={options}
                  onChange={(selectedOption) => setSelectedCity(selectedOption)}
                  styles={{
                    container: (provided) => ({ ...provided, width: 320 }),
                  }}
                  isClearable
                />
              </div>
              <div className="text-left pb-2">
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
                    container: (provided) => ({ ...provided, width: 320 }),
                  }}
                  isClearable
                />
              </div> */}
              {/* Pilih Alamat Gudang  */}
              <div className="text-left pb-2">
                {/* {!isAddPenerima ? (
              <Coba8 text="Pilih Pengiriman dari " />
            ) : ( */}
                <Coba8 text="Alamat Gudang " />
                {/* )} */}
              </div>
              <div className="text-left pb-2">
                <Select
                  value={selectedWarehouse}
                  options={optionsWarehouse}
                  onChange={(selectedOption) =>
                    setSelectedWarehouse(selectedOption)
                  }
                  styles={{
                    container: (provided) => ({ ...provided, width: 320 }),
                  }}
                  isClearable
                />
              </div>
              {/* Pilih Alamat Channel  */}
              <div className="text-left pb-2">
                {/* {!isAddPenerima ? (
              <Coba8 text="Pilih Pengiriman dari " />
            ) : ( */}
                <Coba8 text="Channel " />
                {/* )} */}
              </div>
              <div className="text-left pb-2">
                <Select
                  value={selectedChannel}
                  options={optionsChannel}
                  onChange={(selectedOption) =>
                    setSelectedChannel(selectedOption)
                  }
                  styles={{
                    container: (provided) => ({ ...provided, width: 320 }),
                  }}
                  isClearable
                />
              </div>
              {/* Input Kode Kupon  */}
              <div className="text-left pb-2">
                <Coba8 text="Kupon" />
              </div>
              <div className="">
                <div className=" w-[100%] ">
                  <div className="w-[100%] relative flex justify-start">
                    <input
                      type="text"
                      placeholder="Cari Kupon..."
                      value={searchQueryKupon}
                      onChange={handleSearchChangeKupon}
                      className="w-[800px] h-[45px] border border-[#D3D3D3] rounded-lg pl-4"
                    />
                  </div>
                  <div className="mt-4  w-[100%] h-auto rounded-lg ">
                    <ul>
                      {searchResultsKupon.map((kupon) => (
                        <div
                          key={kupon.id}
                          onClick={() => AddKupon2(kupon)}
                          className="flex items-center border border-gray-300 my-2 w-[100%] h-auto pl-4 rounded-lg shadow-lg"
                        >
                          <div className=" w-[100%] text-left my-2 ">
                            <li key={kupon.id}>
                              <Coba11 text={`  ${kupon.name}`} />
                            </li>
                          </div>
                        </div>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="w-[100%] flex ">
                  <div className=" w-[100%] ">
                    {addKupon.map((addKupon, index) => (
                      <div className="w-[100%] flex" key={index}>
                        <div className="text-left w-[80%]">
                          <Coba10 text={`Kupon :  ${addKupon.name}`} />
                        </div>
                        <div className="w-[20%] ">
                          <img
                            src={trash}
                            alt=""
                            className="w-[15px]"
                            onClick={() => handleDeleteKupon(index)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Input Order Date  */}
              <div className="text-left pb-2">
                <Coba8 text="Order Date " />
              </div>
              <div className="text-left pb-2">
                <input
                  type="date"
                  className="border border-gray-300 w-[320px] h-[40px] rounded-sm pl-2"
                  placeholder="Input Kupon ..."
                  value={input.order_date}
                  name="order_date"
                  onChange={handleChange}
                />
              </div>
              {/* Input Detail Alamat  */}
              <div className="text-left pb-2">
                {/* {!isAddPenerima ? (
              <Coba8 text="Pilih Pengiriman dari " />
            ) : ( */}
                <Coba8 text="Detail Alamat " />
                {/* )} */}
              </div>
              <div className="text-left pb-2">
                <input
                  type="text"
                  className="border border-gray-300 w-[320px] h-[40px] rounded-sm pl-2"
                  placeholder="Input Detail Alamat ..."
                  value={input.detail_alamat}
                  name="detail_alamat"
                  onChange={handleChange}
                />
              </div>
              {/* Input Status Pembayaran  */}
              <div className="text-left pb-2">
                <Coba8 text="Status Pembayaran " />
              </div>
              <div className="text-left pb-2">
                <select
                  className="border border-gray-300 h-[40px] rounded-sm w-[320px]"
                  name="status_pembayaran"
                  value={input.status_pembayaran}
                  onChange={handleChange}
                >
                  <option value="" selected>
                    -Pilih Status Pembayaran-
                  </option>
                  <option value="Sudah Bayar"> Sudah Bayar</option>
                  <option value="Belum Dibayar">Belum Dibayar</option>
                </select>
              </div>
              {/* Input Payment  */}
              <div className="text-left pb-2">
                <Coba8 text="Payment " />
              </div>
              <div className="text-left pb-2">
                <select
                  className="border border-gray-300 h-[40px] rounded-sm w-[320px]"
                  name="payment"
                  value={input.payment}
                  onChange={handleChange}
                >
                  <option value="" selected>
                    -Pilih Cara Pembayaran-
                  </option>
                  <option value="Cash"> Cash</option>
                </select>
              </div>

              {/* Input Cara Pembayaran  */}

              <div className="text-left pb-2">
                <Coba8 text="Bank Account " />
              </div>
              <div className="text-left pb-2">
                <select
                  className="border border-gray-300 h-[40px] rounded-sm w-[320px]"
                  name="payment"
                  value={input.payment}
                  onChange={handleChange}
                >
                  <option value="" selected>
                    -Pilih Bank Account-
                  </option>
                  <option value={bank.rekening1}> {bank.rekening1}</option>
                  <option value={bank.rekening2}> {bank.rekening2}</option>
                  <option value={bank.rekening3}> {bank.rekening3}</option>
                  <option value={bank.rekening4}> {bank.rekening4}</option>
                  <option value={bank.rekening5}> {bank.rekening5}</option>
                </select>
              </div>

              {/* Input Payment Date  */}
              <div className="text-left pb-2">
                <Coba8 text="Payment Date " />
              </div>
              <div className="text-left pb-2">
                <input
                  type="date"
                  className="border border-gray-300 w-[320px] h-[40px] rounded-sm pl-2"
                  value={input.paymentDate}
                  name="paymentDate"
                  onChange={handleChange}
                />
              </div>
              {/* Input Catatan  */}
              <div className="text-left pb-2">
                {/* {!isAddPenerima ? (
              <Coba8 text="Pilih Pengiriman dari " />
            ) : ( */}
                <Coba8 text="Catatan " />
                {/* )} */}
              </div>
              <div className="text-left pb-2">
                <input
                  type="text"
                  className="border border-gray-300 w-[320px] h-[40px] rounded-sm pl-2"
                  placeholder="Input Catatan ..."
                  value={input.note}
                  name="note"
                  onChange={handleChange}
                />
              </div>
              {/* Input Kurir  */}
              <div className="text-left pb-2">
                {/* {!isAddPenerima ? (
              <Coba8 text="Pilih Pengiriman dari " />
            ) : ( */}
                <Coba8 text="Kurir " />
                {/* )} */}
              </div>
              <div className="text-left pb-2">
                <Select
                  value={selectedKurir}
                  options={optionsKurir}
                  onChange={(selectedKurir) => setSelectedKurir(selectedKurir)}
                  styles={{
                    container: (provided) => ({ ...provided, width: 320 }),
                  }}
                  isClearable
                />
              </div>
              {/* Button shipping cost */}
              <div className="p-4 ">
                {loading ? (
                  <button
                    onClick={handleSubmit}
                    className=" mr-4 border border-sky-600 bg-sky-600 text-white h-[40px] w-[120px] rounded-md hover:bg-white hover:text-black"
                  >
                    Loading...
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className=" mr-4 border border-sky-600 bg-sky-600 text-white h-[40px] w-[120px] rounded-md hover:bg-white hover:text-black"
                  >
                    Cost Shipping
                  </button>
                )}
              </div>
            </div>

            {/* abaikan dlu  */}
            <div className="bg-white col-span-2 p-4">
              <div className="flex  relative  left-[2.5%] md:w-[95%]">
                <div className="md:w-[35%] flex items-center">
                  {isToggled ? (
                    <Coba6 text="Ingin menambahkan bundle ?" />
                  ) : (
                    <Coba6 text="Ingin menambahkan produk ?" />
                  )}
                </div>
                <div className=" relative   md:w-[65%] py-2 flex justify-start">
                  <button
                    className={`p-1 bg-dark w-[50px] rounded-full focus:outline-none ${
                      isToggled ? "bg-gray-500 w-[50px]" : ""
                    }`}
                    onClick={handleToggle}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        isToggled ? "transform translate-x-full" : ""
                      }`}
                    ></div>
                  </button>
                </div>
              </div>
              {/*search bundle or product*/}
              <div className=" w-[95%] relative left-[2.5%]  ">
                {isToggled ? (
                  <div className="w-[100%] relative flex justify-start">
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQueryProduk}
                      onChange={handleSearchChangeProduk}
                      className="w-[100%] h-[45px] border border-[#D3D3D3] rounded-lg pl-4"
                    />
                  </div>
                ) : (
                  <div className="w-[100%] relative flex justify-start">
                    <input
                      type="text"
                      placeholder="Search bundle..."
                      value={searchQueryBundle}
                      onChange={handleSearchChangeBundle}
                      className="w-[100%] h-[45px] border border-[#D3D3D3] rounded-lg pl-4"
                    />
                  </div>
                )}
              </div>

              {/* search product result */}
              <div className=" w-[95%] relative left-[2.5%]  ">
                {isToggled ? (
                  // produk
                  <div className="mt-4  w-[100%] h-auto rounded-lg  ">
                    {/* add condition when product is selected, list will hidden */}
                    {!isAddProduk ? (
                      <div>
                        <ul>
                          {searchResultsProduk.map((produk, index) => (
                            <div
                              key={index}
                              onClick={() => AddProduk2(produk)}
                              className="flex items-center border border-gray-300 bg-sky-100 my-2 w-[100%] h-auto pl-4 rounded-lg shadow-lg"
                            >
                              <div className=" w-[100%] text-left my-2 ">
                                <div
                                  key={produk.id}
                                  className="relative grid lg:grid-cols-5 grid-cols-2 gap-4"
                                >
                                  <div className="">
                                    {produk.galleries.map(
                                      (item, index) =>
                                        index === 0 && (
                                          <img
                                            src={item.url}
                                            alt=""
                                            className="w-[80px]"
                                          />
                                        )
                                    )}
                                  </div>
                                  <div className=" col-span-4 ">
                                    <Coba11
                                      text={`Nama Produk :  ${produk.name}`}
                                    />
                                    <Coba6
                                      text={`Harga :  ${produk.price_sale}`}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <p></p>
                    )}
                  </div>
                ) : (
                  // bundle
                  <div className="mt-4  w-[100%] h-auto rounded-lg  ">
                    {!isAddBundle ? (
                      <ul>
                        {searchResultsBundle.map((bundle, index) => (
                          <div
                            key={index}
                            onClick={() => AddBundle2(bundle)}
                            className="flex items-center border border-gray-300 bg-gray-100 my-2 w-[100%] h-auto pl-4 rounded-lg shadow-lg"
                          >
                            <div className=" w-[100%] text-left my-2 ">
                              <div
                                key={bundle.id}
                                className="relative grid lg:grid-cols-5 grid-cols-2 gap-4"
                              >
                                <div>
                                  <img
                                    src={bundle.url}
                                    alt=""
                                    className="w-[80px]"
                                  />
                                </div>
                                <div className=" col-span-4">
                                  <Coba11
                                    text={`Nama Produk :  ${bundle.name}`}
                                  />
                                  <Coba6
                                    text={`Harga :  ${bundle.price_bundle}`}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </ul>
                    ) : (
                      <p></p>
                    )}
                  </div>
                )}
              </div>

              {/* bundle search result */}

              <div>
                {addProduk.length === 0 && addBundle.length === 0 ? (
                  <div>
                    <div className="flex justify-center">
                      <img src={emptyBox} alt="" className="w-[200px]" />
                    </div>
                    <Coba10 text="Tidak ada data produk" />
                  </div>
                ) : (
                  <div className=" w-[95%] relative left-[2.5%]   ">
                    {/* PRODUK */}
                    <div className="w-[100%] ">
                      <div className="  ">
                        {addProduk.map((addProduk, index) => (
                          <div
                            key={index}
                            className="flex items-center border-b border-gray-300 my-2 w-[100%] h-auto p-8 "
                          >
                            <div className=" w-[100%] text-left my-2 ">
                              <div
                                key={addProduk.id}
                                className="relative grid lg:grid-cols-4 grid-cols-2 gap-4"
                              >
                                <div>
                                  {addProduk.galleries.map(
                                    (item, index) =>
                                      index === 0 && (
                                        <img
                                          key={index}
                                          src={item.url}
                                          alt={item.url}
                                          className=" w-[300px] object-cover rounded-md"
                                        />
                                      )
                                  )}
                                </div>
                                <div className=" col-span-2">
                                  <Coba11
                                    text={`Nama addProduk :  ${addProduk.name}`}
                                  />
                                  <Coba6
                                    text={`Min Grosir :  ${addProduk.min_grosir}`}
                                  />

                                  <Coba6
                                    text={`Max Grosir :  ${addProduk.max_grosir}`}
                                  />
                                  <Coba6
                                    text={`Price Grosir :  Rp ${addProduk.price_grosir_formater}`}
                                  />
                                  <Coba6
                                    text={`Price Reseller : Rp ${addProduk.price_reseller_formater}`}
                                  />
                                  <Coba6
                                    text={`Harga Jual : Rp ${addProduk.price_sale_formater}`}
                                  />
                                  <div>
                                    {addProduk.jenis_discount_harga ==
                                    "rupiah" ? (
                                      <Coba6
                                        text={`Diskon : Rp ${addProduk.discount_harga_formater}`}
                                      />
                                    ) : (
                                      <Coba6
                                        text={`Diskon : ${addProduk.discount_harga_formater} %`}
                                      />
                                    )}
                                  </div>

                                  <div>
                                    {addProduk.jenis_discount_ongkir ==
                                    "rupiah" ? (
                                      <Coba6
                                        text={`Diskon Ongkir : Rp ${addProduk.discount_ongkir_formater}`}
                                      />
                                    ) : (
                                      <Coba6
                                        text={`Diskon Ongkir : Rp ${addProduk.discount_ongkir_formater}`}
                                      />
                                    )}
                                  </div>
                                  <Coba6 text={`Berat :  ${addProduk.berat}`} />
                                  <Coba6 text={`Total :  ${addProduk.total}`} />
                                </div>
                                <div className=" flex justify-end ">
                                  <button
                                    className="bg-dark w-[25px] h-[25px]   rounded-full text-white"
                                    onClick={() =>
                                      decreaseQuantity(addProduk.id)
                                    }
                                  >
                                    -
                                  </button>
                                  <div className="px-4  relative">
                                    <p>{addProduk.qty}</p>
                                  </div>

                                  <button
                                    className="bg-dark w-[25px]  h-[25px]  rounded-full text-white"
                                    onClick={() =>
                                      increaseQuantity(addProduk.id)
                                    }
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* BUNDLE */}
                    <div className="w-[100%] ">
                      <div className="  ">
                        {addBundle.map((addBundle, index) => (
                          <div
                            key={index}
                            className="flex items-center  border-b border-gray-300 my-2 w-[100%] h-auto p-8 "
                          >
                            <div className=" w-[100%] text-left my-2 ">
                              <div
                                key={addBundle.id}
                                className="relative grid lg:grid-cols-4 grid-cols-2 gap-4"
                              >
                                <div>
                                  <img
                                    src={addBundle.url}
                                    alt=""
                                    className="w-[300px] rounded-md"
                                  />
                                </div>
                                <div className=" col-span-2">
                                  <Coba11
                                    text={`Nama addProduk :  ${addBundle.name}`}
                                  />
                                  <Coba6
                                    text={`Harga :  ${addBundle.price_bundle}`}
                                  />
                                  <Coba6 text={`Total :  ${addBundle.total}`} />

                                  <p>List Produk</p>
                                  {addBundle.products.map(
                                    (addBundle, index) => (
                                      <div
                                        key={index}
                                        className=" border border-gray-200 grid grid-cols-3 gap-4"
                                      >
                                        <Coba6 text={addBundle.name} />
                                        <Coba6
                                          text={`Harga Jual : ${addBundle.price_sale_formater}`}
                                        />
                                        <Coba6
                                          text={`Berat ${addBundle.berat} g`}
                                        />
                                      </div>
                                    )
                                  )}
                                </div>
                                <div className=" flex justify-end ">
                                  <button
                                    className="bg-dark w-[25px] h-[25px]   rounded-full text-white"
                                    onClick={() =>
                                      decreaseQuantityBundle(addBundle.id)
                                    }
                                  >
                                    -
                                  </button>
                                  <div className="px-4  relative">
                                    <p>{addBundle.qty}</p>
                                  </div>

                                  <button
                                    className="bg-dark w-[25px]  h-[25px]  rounded-full text-white"
                                    onClick={() =>
                                      increaseQuantityBundle(addBundle.id)
                                    }
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* TOTAL */}
                    <div className="flex justify-end">
                      <button
                        onClick={CalculatePrice}
                        className=" mr-4 border border-sky-600 bg-sky-600 text-white h-[40px] w-[120px] rounded-md hover:bg-white hover:text-black"
                      >
                        Hitung Harga
                      </button>
                    </div>

                    <div>
                      <div className="text-left flex justify-between">
                        <div>
                          <Coba11 text="DISKON KUPON" />
                        </div>
                        <div>{detailCalculateProduct.coupon_discount}</div>
                      </div>
                      <div className="text-left flex justify-between">
                        <div>
                          <Coba11 text="TOTAL DISKON TABLE" />
                        </div>
                        <div>{totalDiscountTable}</div>
                      </div>
                      <div className="text-left flex justify-between">
                        <div>
                          <Coba11 text="TOTAL HARGA" />
                        </div>
                        <div>{calculate}</div>
                      </div>
                      <div className="text-left flex justify-between">
                        <div>
                          <Coba11 text="TOTAL BERAT PRODUK" />
                        </div>
                        <div>{totalWeight}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className=" w-[95%] relative left-[2.5%]  pt-8">
                {/* {searchResultsProduk.map((produk, index) => ( */}
                <div className="text-left pb-4 pt-4">
                  <Coba11 text="SHIPPING COST" />
                </div>

                {/* SHIPPING COST TERPILIH  */}
                <div className="text-left pb-4 pt-4">
                  <Coba11 text="Shipping cost terpilih :" />
                </div>

                <div>
                  {addShipping.map((addShipping, index) => (
                    <div className="text-left">
                      <Coba10 text={addShipping.Courier} />
                      <Coba10 text={addShipping.Detail} />
                      <Coba10 text={addShipping.Estimasi} />
                      <Coba10 text={addShipping.Ongkir} />
                      <Coba10 text={addShipping.Service} />
                    </div>
                  ))}
                </div>

                <div>
                  {constShipping.map((constShipping, index) => (
                    <div
                      onClick={() => AddCostShipping(constShipping)}
                      key={index}
                      className="border-b border-gray-500 py-4 hover:bg-sky-100  "
                    >
                      <div className="flex justify-between ">
                        <div className="w-[10%]">
                          <Coba11 text="No" />
                        </div>
                        <div className="w-[30%]">
                          <Coba11 text="Kurir" />
                        </div>

                        <div className="w-[20%]">
                          <Coba11 text="Estimasi" />
                        </div>
                        <div className="w-[20%]">
                          <Coba11 text="Ongkir" />
                        </div>
                        <div className="w-[20%]">
                          <Coba11 text="Service" />
                        </div>
                      </div>
                      <div className="flex justify-between ">
                        <div className="w-[10%]">
                          <Coba7 text={index + 1} />
                        </div>
                        <div className="w-[30%]">
                          <Coba7 text={constShipping.Courier} />
                        </div>

                        <div className="w-[20%]">
                          <Coba7 text={constShipping.Estimasi} />
                        </div>
                        <div className="w-[20%]">
                          <Coba7 text={constShipping.Ongkir} />
                        </div>
                        <div className="w-[20%]">
                          <Coba7 text={constShipping.Service} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Button order */}
              <div className="p-4  flex justify-end">
                {loading ? (
                  <button
                    onClick={handleSubmitOrder}
                    className=" mr-4 border border-sky-600 bg-sky-600 text-white h-[40px] w-[120px] rounded-md hover:bg-white hover:text-black"
                  >
                    Loading
                  </button>
                ) : (
                  <button
                    onClick={handleSubmitOrder}
                    className=" mr-4 border border-sky-600 bg-sky-600 text-white h-[40px] w-[120px] rounded-md hover:bg-white hover:text-black"
                  >
                    Order
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddOrder;
