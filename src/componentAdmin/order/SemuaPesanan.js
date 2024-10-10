import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { InputSearch } from "../../components/reusableComponents/Input";
import search from "../../assets/search-interface-symbol.png";
import "../../style/Stepper.css";
import {
  BtnAdmin1,
  BtnAdmin3,
  BtnAdmin4,
  BtnAdmin5,
  BtnAdmin6,
} from "../../components/reusableComponents/ButtonAdmin";
import {
  Coba10,
  Coba11,
  Coba12,
  Coba4,
  Coba5,
  Coba6,
  Coba7,
  Coba8,
  Coba9,
} from "../../components/reusableComponents/Text";
import axios from "axios";
import LionParcel from "../../assets/lionparcel.webp";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { css } from "@emotion/react";
import left from "../../assets_admin/left.png";
import right from "../../assets_admin/right.png";
import Swal from "sweetalert2";

import * as XLSX from "xlsx";

const SemuaPesanan = () => {
  const Swal = require("sweetalert2");
  const steps = [
    "Belum Diproses",
    "Sedang Diproses",
    "Proses Pengriman",
    "Pengiriman Selesai",
  ];
  const [selectAll, setSelectAll] = useState(false);
  const [currentSteps, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [navbar, setNavbar] = useState(false);
  const [order, setOrder] = useState([]);
  const [orderExcel, setOrderExcel] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const siblingCount = 10;
  // handle search
  const [statusBayar, setStatusBayar] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [statusOrder, setStatusOrder] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { printOrder, setPrintOrder } = useContext(GlobalContext);

  const handleSearchStatusBayar = (status) => {
    if (statusBayar.includes(status)) {
      // If the status is already in the array, remove it
      setStatusBayar(statusBayar.filter((s) => s !== status));
    } else {
      // If the status is not in the array, add it
      setStatusBayar([...statusBayar, status]);
    }
  };

  console.log("status dibayar", statusBayar);

  const handleSearchFieldChange = (event) => {
    setSearchField(event.target.value);
  };

  const handleSearchValueChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearchStartDate = (event) => {
    setStartDate(event.target.value);
  };

  const handleSearchEndDate = (event) => {
    setEndDate(event.target.value);
  };

  const handleSearchStatus = (status) => {
    if (statusOrder.includes(status)) {
      // If the status is already in the array, remove it
      setStatusOrder(statusOrder.filter((s) => s !== status));
    } else {
      // If the status is not in the array, add it
      setStatusOrder([...statusOrder, status]);
    }
  };

  const fetchAllOrder = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://laravel-api-10.cerise.id/api/orders/orders-all",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setOrder(response.data);
      setLoading(false);
    } catch (error) {
      console.log("error order", error);
    }
  };

  useEffect(() => {
    fetchAllOrder();
  }, []);

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red; // Customize the spinner color if needed
  `;

  // Calculate the total number of pages
  const totalPages = Math.ceil(order.length / itemsPerPage);

  // Generate an array of page numbers for pagination

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const pageNumbers = [];
  for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
    pageNumbers.push(i);
  }

  // Calculate the range of orders to display based on currentPage and itemsPerPage
  const indexOfLastOrder = currentPage * itemsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
  const currentOrders = order.slice(indexOfFirstOrder, indexOfLastOrder);

  // console.log("current page", currentPage);
  // console.log("orderku ", order);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://laravel-api-10.cerise.id/api/orders/orders-all`,
        {
          params: {
            search: searchValue,
            search_field: searchField,
            status_order: statusOrder,
            date_end: endDate,
            date_start: startDate,
            status_pembayaran: statusBayar,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setOrder(response.data);
      // console.log("respon search ", response.data.message);
      if (response.data.message == "Order is not found.") {
        setOrder([]);
      } else {
        setOrder(response.data);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
      if (404 == error.request.status) {
        setOrder([]);
      }
    }
  };
  // console.log("ya ordernya apa", order.length);

  const handleKuponSelect = (id) => {
    setPrintOrder((prevProducts) => {
      // Check if the id is already in the array
      const idIndex = prevProducts.indexOf(id);

      if (idIndex !== -1) {
        // If id is already in the array, remove it
        return prevProducts.filter((productId) => productId !== id);
      } else {
        // If id is not in the array, add it
        return [...prevProducts, id];
      }
    });

    setOrderExcel((prevOrders) => {
      // Find the matching order by order_code
      const matchingOrder = order.find((o) => o.order_code === id);

      if (matchingOrder) {
        // Check if the matchingOrder is already in the array
        const orderIndex = prevOrders.findIndex(
          (order) => order.order_code === id
        );

        if (orderIndex !== -1) {
          // If matchingOrder is already in the array, remove it
          return prevOrders.filter((order) => order.order_code !== id);
        } else {
          // If matchingOrder is not in the array, add it
          return [...prevOrders, matchingOrder];
        }
      } else {
        // If no matching order found, return the existing array
        return prevOrders;
      }
    });
  };

  // console.log("print selected excel", orderExcel.length);

  const handleCancelOrder = async (id) => {
    const confirmationResult = await Swal.fire({
      title: "Apakah anda ingin membatalkan order?",
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
          `https://laravel-api-10.cerise.id/api/orders/canceling/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        Swal.fire({
          title: "Berhasil",
          text: "Order Berhasil Dibatalkan",
          confirmButtonColor: "#3085d6",
          icon: "success",
          confirmButtonText: "OK",
        });
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: " Error!",
          text: error,
          icon: "warning",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        });
      }
    }
  };

  // console.log("print order nya :", printOrder);
  const exportToExcel = () => {
    const data = [
      [
        "No",
        "Order Code",
        "Kecamatan",
        "Kota",
        "Kode Pos",
        "Detail Alamat",
        "Nama Penerima",
        "Nama Pengirim",
        "No Telp",
        "Pesanan & Tgl Pesan",
        "Harga Total",
        "Total Berat",
      ],
      ...orderExcel.map((item, index) => {
        let kecamatan = "";
        let kota = "";
        let kodepos = "";
        let detail = "";

        const matchingAlamatUser = item.users.alamat_users.find(
          (alamatUser) => alamatUser.id == item.users.address_id
        );

        // If a matching alamat_user is found, use its detail_alamat as kecamatan
        if (matchingAlamatUser) {
          kecamatan = matchingAlamatUser.cities.kecamatan;
          kota = matchingAlamatUser.cities.nameCities;
          kodepos = matchingAlamatUser.cities.kodepos;
          detail = matchingAlamatUser.detail_alamat;
        } else if (item.users.alamat_users[0]) {
          kecamatan = item.users.alamat_users[0].cities.kecamatan;
          kota = item.users.alamat_users[0].cities.nameCities;
          kodepos = item.users.alamat_users[0].cities.kodepos;
          detail = item.users.alamat_users[0].detail_alamat;
        }

        return [
          itemsPerPage * (currentPage - 1) + index + 1,
          `# ${item.id}`,
          kecamatan,
          kota,
          kodepos,
          detail, // Original detail_alamat from item
          item.pengorder.name,
          item.penerima.name,
          item.pengorder.no_wa,
          item.order_date,
          item.total_price,
          item.weightSum,
        ];
      }),
    ];

    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Orders");

    // Save the Excel file
    XLSX.writeFile(wb, "exportedOrders.xlsx");
  };

  // console.log("excel", orderExcel);
  const handleSelectAll = () => {
    if (!selectAll) {
      const allIds = order.map((o) => o.order_code);
      setPrintOrder(allIds);
      setOrderExcel(order);
    } else {
      setPrintOrder([]);
      setOrderExcel([]);
    }
    setSelectAll(!selectAll);
  };

  console.log("order", currentOrders);

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
        <div
          className="relative w-[90%] left-[5%] md:w-[98%] md:left-0 
         "
        >
          <div className=" relative mb-4 grid grid-cols-2 md:grid-cols-12 gap-4 ">
            <button
              className={
                statusOrder.includes(1)
                  ? "bg-dark text-white p-2 rounded-md mr-4 col-span-2"
                  : "bg-white border border-dark text-dark p-2 rounded-md mr-4 col-span-2"
              }
              onClick={() => handleSearchStatus(1)}
            >
              Belum Diproses
            </button>
            <button
              className={
                statusOrder.includes(2)
                  ? "bg-dark text-white p-2 rounded-md mr-4 col-span-2"
                  : "bg-white border border-dark text-dark p-2 rounded-md mr-4 col-span-2"
              }
              onClick={() => handleSearchStatus(2)}
            >
              Sedang Diproses
            </button>
            <button
              className={
                statusOrder.includes(3)
                  ? "bg-dark text-white p-2 rounded-md mr-4 col-span-2"
                  : "bg-white border border-dark text-dark p-2 rounded-md mr-4 col-span-2"
              }
              onClick={() => handleSearchStatus(3)}
            >
              Proses Pengriman
            </button>
            <button
              className={
                statusOrder.includes(4)
                  ? "bg-dark text-white p-2 rounded-md mr-4 col-span-2"
                  : "bg-white border border-dark text-dark p-2 rounded-md mr-4 col-span-2"
              }
              onClick={() => handleSearchStatus(4)}
            >
              Pengiriman Selesai
            </button>
          </div>
          {/* Status Bayar Search */}
          <div className=" relative mb-4 grid grid-cols-2 md:grid-cols-12 gap-4 ">
            <button
              className={
                statusBayar.includes("Belum Dibayar")
                  ? "bg-dark text-white p-2 rounded-md mr-4 col-span-2"
                  : "bg-white border border-dark text-dark p-2 rounded-md mr-4 col-span-2"
              }
              onClick={() => handleSearchStatusBayar("Belum Dibayar")}
            >
              Belum Bayar
            </button>
            <button
              className={
                statusBayar.includes("Sudah Dibayar")
                  ? "bg-dark text-white p-2 rounded-md mr-4 col-span-2"
                  : "bg-white border border-dark text-dark p-2 rounded-md mr-4 col-span-2"
              }
              onClick={() => handleSearchStatusBayar("Sudah Dibayar")}
            >
              Sudah Bayar
            </button>
          </div>
          <div className="mb-4">
            <div className="  flex  w-[100%] md:w-[50%] mb-4 sm:mb-0">
              <label htmlFor="">Tanggal Awal : </label>
              <div>
                <div className="flex justify-between w-[280px] h-auto items-center ">
                  <input
                    value={startDate}
                    onChange={handleSearchStartDate}
                    type="date"
                    placeholder="Pencarian..."
                    className="ml-4 w-[200px] md:w-[290px] h-[40px] pl-3 border border-gray-400 rounded-lg text-gray-300"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <div className="  flex w-[100%] md:w-[50%] mb-4 sm:mb-0">
              <label htmlFor="">Tanggal Akhir : </label>
              <div>
                <div className="flex justify-between w-[280px] h-auto items-center ">
                  <input
                    value={endDate}
                    onChange={handleSearchEndDate}
                    type="date"
                    placeholder="Pencarian..."
                    className=" ml-4 w-[200px] md:w-[290px] h-[40px] pl-3 border border-gray-400 rounded-lg text-gray-300"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* search Status Bayar */}
          {/* <div className="mb-4">
            <div className="  flex w-[100%] md:w-[50%] mb-4 sm:mb-0">
              <label htmlFor="">Status Bayar : </label>
              <div>
                <div className="flex justify-between  w-[300px] h-auto items-center  ">
                  <select
                    value={searchField}
                    onChange={handleSearchStatusBayar}
                    className=" ml-4 w-[200px] md:w-[265px] h-[40px] ml-6  border border-gray-400 rounded-lg text-gray-300"
                  >
                    <option value="Sudah Bayar">Sudah Bayar</option>
                    <option value="Belum Dibayar">Belum Dibayar</option>
                  </select>
                </div>
              </div>
            </div>
          </div> */}
          <div className="w-[98%]   mb-8 relative grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="   relative grid grid-cols-1 md:grid-cols-2 gap-2   w-[100%] mb-4 sm:mb-0">
              <div className=" flex justify-start">
                <select
                  value={searchField}
                  onChange={handleSearchFieldChange}
                  className=" w-[270px] md:w-[230px] h-[40px]  rounded-md border border-gray-400 pl-4  relative"
                >
                  <option value="order_code">Kode Produk</option>
                  <option value="name_product">Nama Produk</option>
                  <option value="sku">SKU</option>
                  <option value="user_name">Nama Pengirim</option>
                  {/* Add more options as needed */}
                </select>
              </div>
              <div className="  flex justify-start">
                <div className="flex  w-[280px] h-auto items-center ">
                  <input
                    value={searchValue}
                    onChange={handleSearchValueChange}
                    type="text"
                    placeholder="Pencarian..."
                    className="w-[370px]  md:w-[240px] h-[40px] pl-3 border border-gray-400 rounded-lg text-gray-300"
                  />
                  <div className="relative -ml-[2rem]  " onClick={handleSearch}>
                    <img src={search} alt="" className="w-[20px] mr-8" />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[100%]  flex md:justify-end justify-start">
              <Link to="/admin/order/addOrder">
                <BtnAdmin3 text="Tambah Order" />
              </Link>
            </div>

            <div className="flex ">
              <div>
                <input
                  type="checkbox"
                  name="selectAll"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
                <div className="ml-2">
                  <Coba6 text="Pilih Semua" />
                </div>
              </div>
              <div className="ml-4">
                {orderExcel.length === 0 ? (
                  ""
                ) : (
                  <button
                    className="border border-dark px-4 py-[6px] rounded-md hover:bg-dark hover:text-white"
                    onClick={exportToExcel}
                  >
                    Export to Excel
                  </button>
                )}
              </div>
            </div>
          </div>

          {order.length === 0 ? (
            <p>Tidak ada data ditemukan</p>
          ) : (
            <div>
              <div>
                {currentOrders.map((order, index) => (
                  <div
                    key={order.id}
                    className=" border border-gray-300   h-auto md:w-[98%] bg-white rounded-lg  my-2 mr-4 h-[50px]"
                  >
                    <div className=" border-b border-gray-300 relative grid grid-cols-1 md:grid-cols-2 gap-2  w-[90%] left-[5%]  pt-8 mb-4">
                      <div className=" text-left">
                        <Coba4 text={order.order_code} />
                        <div className=" flex ">
                          <span>
                            <Coba5 text="Tanggal Order : " />
                          </span>

                          <span>
                            <Coba5 text={order.order_date} />
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-end w-[100%] items-center ">
                        {order.status_order === "0" ? (
                          <div className="flex relative w-[70%] items-center">
                            {steps?.map((step, i) => (
                              <div
                                key={i}
                                className={`step-item  ${
                                  order.status_order == i + 1 && "active"
                                } ${i + 1 < order.status_order && "complete"}`}
                              >
                                <div className="cancel">{i + 1}</div>
                                <div className="text-gray-400">{step}</div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="flex relative w-[70%] items-center">
                            {steps?.map((step, i) => (
                              <div
                                key={i}
                                className={`step-item  ${
                                  order.status_order == i + 1 && "active"
                                } ${i + 1 < order.status_order && "complete"}`}
                              >
                                <div className="step">{i + 1}</div>
                                <div className="text-gray-400">{step}</div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className=" relative w-[90%] left-[5%] grid gap-2 grid-cols-1 md:grid-cols-3 border-b border-gray-300 pb-8 mb-4">
                      <div className="  text-left">
                        <div className="">
                          <div className="py-4">
                            <Coba7 text="Pemesan :" />
                            <Coba8 text={order.users.name} />
                            <Coba9 text="RESELLER" />
                          </div>

                          <div className="py-4">
                            <Coba7 text="Dikirim Kepada :" />
                            {/* <Coba8 text={order.penerima.name} /> */}
                            <Coba9 text="RESELLER" />
                          </div>
                        </div>
                      </div>
                      <div className=" text-left">
                        <div className="">
                          <div className="flex py-2">
                            <p>{/* <Coba10 text={order.status_order} /> */}</p>

                            <span>
                              <Coba4 text="Lihat Riwayat" />
                            </span>
                          </div>

                          <div className="bg-white border border-gray-200 rounded-lg p-3 my-2">
                            <Coba8 text={order.total_price} />
                            <div className="flex ">
                              <BtnAdmin4 text={order.status_pembayaran} />
                            </div>
                          </div>

                          <div>
                            <Coba10 text="Kurir " />
                          </div>
                          <div className="bg-white border border-gray-200 rounded-lg p-3">
                            <div className="flex ">
                              <img
                                src={order.courier.logo}
                                alt={order.courier.logo}
                                className="w-[50px] h-[50px]"
                              />
                              <div className="px-4">
                                <Coba11 text={order.courier.name} />
                                <Coba11 text={order.courier.ongkirRajaOngkir} />
                                <Coba10
                                  text={`Estimasi Pengiriman : ${order.etaRajaOngkir} hari`}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className=" pl-0 md:pl-8 text-left">
                        <div className="">
                          <div>
                            <Coba5 text="Produk (total 6 item) " />
                            <Coba12 text="Be healthy .." />
                            <Link
                              to={`/admin/order/detailOrder/${order.order_code}`}
                            >
                              <BtnAdmin1 text="Lihat Detail" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="relative grid grid-cols-1 md:grid-cols-12 gap-2 w-[90%] left-[5%] pb-8">
                      <div className=" flex justify-between col-span-3 md:col-span-2 ">
                        {/* <input
                        type="checkbox"
                        name="vehicle1"
                        value={order.order_code}
                        onChange={() => handleKuponSelect(order.order_code)}
                      ></input> */}
                        <input
                          type="checkbox"
                          name={`order-${order.order_code}`}
                          value={order.order_code}
                          checked={printOrder.includes(order.order_code)}
                          onChange={() => handleKuponSelect(order.order_code)}
                        />
                        <div className="relative -left-16 md:left-0">
                          <Link to={`/admin/order/printOrder`}>
                            <BtnAdmin6 text="Print" />
                          </Link>
                        </div>
                      </div>
                      <div className="col-span-2"></div>

                      <div className="col-span-8 md:flex md:justify-end ">
                        {order.status_order === "0" ? (
                          " "
                        ) : (
                          <div className="mr-0 md:mr-2 mb-2 md:mb-0">
                            <BtnAdmin1
                              text="Cancel Order"
                              onClick={() =>
                                handleCancelOrder(order.order_code)
                              }
                            />
                          </div>
                        )}
                        <div className="mr-0 md:mr-2 mb-2 md:mb-0">
                          <Link
                            to={`/admin/order/updateOrder/${order.order_code}`}
                          >
                            <BtnAdmin1 text="Update Resi" />
                          </Link>
                        </div>

                        <div className="mr-0 md:mr-2 mb-2 md:mb-0">
                          <Link to={`/admin/order/invoice/${order.order_code}`}>
                            <BtnAdmin1 text="Invoice" />
                          </Link>
                        </div>

                        <div className="mr-0 md:mr-2 mb-2 md:mb-0">
                          <Link
                            to={`/admin/order/editOrder/${order.order_code}`}
                          >
                            <BtnAdmin1 text="Edit Order" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div>
                {/* Pagination controls */}
                <div>
                  {/* Pagination */}
                  <div>
                    <ul className="pagination flex relative ml-4 items-center">
                      {/* Previous Page Button */}
                      <li>
                        <button
                          onClick={() => setCurrentPage(currentPage - 1)}
                          disabled={currentPage === 1}
                        >
                          <img src={left} alt="" className="w-[15px] ml-4" />
                        </button>
                      </li>

                      {/* Page Numbers */}
                      {pageNumbers.map((number) => (
                        <li
                          key={number}
                          className={
                            currentPage === number
                              ? "active bg-dark text-white w-[25px] rounded-full relative ml-2"
                              : " relative ml-2"
                          }
                        >
                          <button onClick={() => setCurrentPage(number)}>
                            {number}
                          </button>
                        </li>
                      ))}

                      {/* Next Page Button */}
                      <li>
                        <button
                          onClick={() => setCurrentPage(currentPage + 1)}
                          disabled={currentPage === totalPages}
                        >
                          <img src={right} alt="" className="w-[15px] ml-4" />
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SemuaPesanan;
