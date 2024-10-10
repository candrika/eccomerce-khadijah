import React, { useState, useEffect } from "react";
import store from "../../assets_admin/store.png";
import { InputSearch } from "../../components/reusableComponents/Input";
import axios from "axios";
import { Link } from "react-router-dom";
import cancel from "../../assets/cancel.png";
import { Coba10 } from "../../components/reusableComponents/Text";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import { css } from "@emotion/react";
import left from "../../assets_admin/left.png";
import right from "../../assets_admin/right.png";
import { ClipLoader } from "react-spinners";

const initialState = {
  uploadBuktiPembayaran: "",
};
const PesananBaruMember = () => {
  const [input, setInput] = useState(initialState);
  const Swal = require("sweetalert2");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderList, setOrderList] = useState([]);
  const [selectedFile, setSelectedFile] = useState("");
  const [preview, setPreview] = useState("");
  const [orderCode, setOrderCode] = useState("");
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const siblingCount = 10;

  // console.log("order code", orderCode);
  const openModal = (item) => {
    setIsModalOpen(true);
    setOrderCode(item);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFileChange = (event) => {
    const uploadBuktiPembayaran = event.target.files[0];
    setSelectedFile(uploadBuktiPembayaran);
    setPreview(URL.createObjectURL(uploadBuktiPembayaran));
    console.log(event.target.files[0]);
  };

  // console.log("selected file ", selectedFile);
  const fetchOrderList = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://laravel-api-10.cerise.id/api/carts/checkouts-list",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setOrderList(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrderList();
  }, []);

  const onSubmit = async (e) => {
    // e.preventDefault();
    const formData = new FormData();

    formData.append("uploadBuktiPembayaran", selectedFile);

    try {
      await axios.post(
        `https://laravel-api-10.cerise.id/api/member/upload-bukti/${orderCode}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchOrderList();
      Swal.fire({
        title: "Success!",
        text: "Berhasil Upload Bukti Pembayaran",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "rgb(8 47 73)",
      });
      setIsModalOpen(false);
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

  // console.log("respon order list", orderList);
  // pagination
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red; // Customize the spinner color if needed
  `;

  // Calculate the total number of pages
  const totalPages = Math.ceil(orderList.length / itemsPerPage);

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
  const currentOrders = orderList.slice(indexOfFirstOrder, indexOfLastOrder);

  // console.log("current page", currentPage);
  // end pagination

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
        <div className="relative ">
          <div className="  relative w-[90%] md:w-[100%] left-[5%] md:left-0 flex justify-start my-4 ">
            <InputSearch text="Pencarian" />
          </div>

          <div className=" border border-gray-300    md:w-[98%] bg-blue rounded-lg  hidden md:grid  grid-cols-12  gap-2 items-center my-2 mr-4 h-[50px]">
            <div className="col-span-1 ">
              <p>No</p>
            </div>
            <div className="col-span-2 ">
              <p>Order Id</p>
            </div>
            <div className="col-span-3 ">
              <p>Pesanan & Tgl Pesan</p>
            </div>
            {/* <div className="col-span-2 ">
              <p>Produk</p>
            </div> */}
            <div className="col-span-2 ">
              <p>Tagihan</p>
            </div>

            <div className="col-span-2 ">
              <p>Bukti Transfer</p>
            </div>
            <div className="col-span-2">
              <p>Keterangan</p>
            </div>
          </div>

          {currentOrders.map((item, index) => (
            <div
              key={index}
              className=" relative w-[90%] left-[5%] md:left-0 md:w-[98%] border border-gray-300 bg-white rounded-lg p-2 right-4 mb-4"
            >
              <div className="  grid rid-cols-1 md:grid-cols-12 gap-2 items-center my-2  md:auto md:h-[50px] text-[12px]">
                <div className=" md:col-span-1">
                  <div className="relative flex justify-start md:justify-center">
                    <p className="text-left md:hidden">No.</p>
                    <p className="text-center">{index + 1}</p>
                  </div>
                </div>
                <div className=" md:col-span-2">
                  <div className="relative flex md:justify-center">
                    <p className="text-left md:hidden">No Order :</p>
                    <p className="text-center">{`#${item.id}`}</p>
                  </div>
                </div>
                <div className=" md:col-span-3">
                  <div className="relative flex md:justify-center">
                    <p className="text-left md:hidden">Tgl Pesan :</p>
                    <p className="text-center">
                      {item.order_date}
                    </p>
                  </div>
                </div>
                {/* <div className=" md:col-span-2">
                  <div className="relative flex md:justify-center">
                    <p className="text-left md:hidden">Produk :</p>
                    <p className="text-center">
                      {Object.keys(item.products).length}
                    </p>
                  </div>
                </div> */}
                <div className="md:col-span-2 ">
                  <div className="relative flex md:justify-center">
                    <p className="text-left md:hidden">Tagihan (Sudah Termasuk Ongkir)  :</p>
                    <p className="text-center">{`Rp. ${parseInt(item.payment, 10) + parseInt(item.ongkirRajaOngkir, 10)}`}</p>
                  </div>
                </div>

                <div className="md:col-span-2">
                  {!item.buktiPembayaranUrl == null ? (
                    <div>
                      <button
                        onClick={() => openModal(item.order_code)}
                        className="px-1 border rounded-md border-sky-200 hover:bg-sky-200 hover:text-dark"
                      >
                        Upload Bukti Bayar
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => openModal(item.order_code)}
                      className="px-1 border rounded-md border-sky-200 hover:bg-sky-200 hover:text-dark"
                    >
                      Lihat Bukti Bayar
                    </button>
                  )}
                </div>
                <div className="md:col-span-2">
                    {item.status_pembayaran === "Sudah Dibayar" ? (
                        <div className="border rounded-md border-primary">
                        <p className="text-primary">{item.status_pembayaran}</p>
                        </div>
                    ) : item.status_pembayaran === "Belum Dibayar" ? (
                        <div className="border border-red-500 rounded-md">
                        <p className="text-red-500">{item.status_pembayaran}</p>
                        </div>
                    ) : (
                        <div className="text-white bg-red-500 border border-red-500 rounded-md">
                        <p>Order Cancelled</p>
                        </div>
                    )}
                    </div>
              </div>
              <div className="grid grid-cols-1 gap-2 border-t-2 border-gray-400 md:grid-cols-12">
                {/*<div className="col-span-6">*/}
                {/*  <div className="flex justify-start">*/}
                {/*    <img src={store} alt="" className="w-[25px] mr-2" />*/}
                {/*    <p>Storefront</p>*/}
                {/*  </div>*/}
                {/*</div>*/}
                <div className="flex items-center justify-center col-span-6 md:justify-end ">
                  <div className="flex justify-start ">
                    <Link to={`/invoice/${item.order_code}`}>
                      <button className="px-4 py-2 mt-2 mr-4 text-dark bg-sky-200">
                        Yang Harus Dibayar
                      </button>
                    </Link>
                  </div>
                  <div className="relative flex justify-start ">
                    <Link to={`/order-detail-member/${item.order_code}`}>
                      <button className="px-4 py-2 mt-2 ml-4 mr-2 text-dark bg-sky-200">
                        Detail Order
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {isModalOpen && (
            <div className="fixed top-0 left-0 w-[100%] h-[100%] flex justify-center items-center bg-black bg-opacity-50">
              <div className="bg-white  rounded-md p-[20px] shadow-md w-[85%] md:w-[50%] h-[50%] ml-12 md:ml-0 overflow-auto">
                <div className="flex justify-end">
                  <button className="close-button" onClick={closeModal}>
                    <img src={cancel} alt="" className="w-[20px]" />
                  </button>
                </div>
                <Coba10 text="Upload Bukti Pembayaran" />
                <p>{orderCode}</p>

                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 gap-4 p-4 lg:grid-cols-2">
                    <div className="h-auto text-left rounded-md ">
                      <Coba10 text="Image" />
                      <input
                        type="file"
                        name="uploadBuktiPembayaran"
                        onChange={handleFileChange}
                      />

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
                  <div className="flex justify-start p-4 ">
                    <button
                      type="submit"
                      className=" mr-4 border border-sky-600 bg-sky-600 text-white h-[40px] w-[80px] rounded-md hover:bg-white hover:text-black"
                    >
                      Create
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* image */}
          {/* {isModalOpen && (
            <div className="fixed top-0 left-0 w-[100%] h-[100%] flex justify-center items-center bg-black bg-opacity-50">
              {!item.buktiPembayaranUrl == null ?}
              <div>
                {currentOrders.map((item, index) => (
                  <div className="bg-white  rounded-md p-[20px] shadow-md w-[40%] h-[50%] overflow-auto">
                    <img
                      src={item.buktiPembayaranUrl}
                      alt={item.buktiPembayaranUrl}
                    />
                  </div>
                ))}
              </div>
            </div>
          )} */}

          {/* Pagination controls */}
          {orderList.length == 0 ? (
            <div className="md:w-[98%] border border-gray-300 bg-white rounded-lg p-2 right-4 mb-4">
              <p>Anda belum memiliki daftar pesanan</p>
            </div>
          ) : (
            <div>
              {/* Pagination */}
              <div>
                <ul className=" flex items-center ml-4 pagination">
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
                          ? "active bg-dark text-white w-[25px] rounded-full  ml-2"
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
          )}
        </div>
      )}
    </div>
  );
};

export default PesananBaruMember;
