import React, { useState, useEffect } from "react";
import store from "../../assets_admin/store.png";
import { InputSearch } from "../../components/reusableComponents/Input";
import axios from "axios";
import left from "../../assets_admin/left.png";
import right from "../../assets_admin/right.png";
import { css } from "@emotion/react";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import ImageViewerModal from "./ImageViewerModal";

const PesananBaru = () => {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [buktiBayar, setBuktiBayar] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const itemsPerPage = 4;
  const siblingCount = 4;

  const [order, setOrder] = useState([]);

  const openModal = (imageURL) => {
    setSelectedImage(imageURL);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setShowModal(false);
  };

  const fetchAllOrder = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://laravel-api-10.cerise.id/api/orders/orders-client",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setOrder(response.data);

      // console.log("respon order", response.data);

      setLoading(false);
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    fetchAllOrder();
  }, []);

  const onSubmit = async (id) => {
    const formData = new FormData();

    formData.append("status_pembayaran", "Sudah Dibayar");
    const confirmationResult = await Swal.fire({
      title: "Apakah anda ingin melakukan konfirmasi pembayaran?",
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
          `https://laravel-api-10.cerise.id/api/orders/update/status/${id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "X-HTTP-Method-Override": "PUT",
            },
          }
        );
        // console.log("respon sukses", response);
        fetchAllOrder();
        // console.log("response sukses");
        Swal.fire({
          title: "Berhasil",
          text: "Konfirmasi Pembayaran Berhasil",
          confirmButtonColor: "#3085d6",
          icon: "success",
          confirmButtonText: "OK",
        });
      } catch (error) {
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

  // console.log("orderku", order);

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
      ...order.map((item, index) => {
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

  // console.log("current order", currentOrders);
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
          <div className=" relative w-[90%]   md:w-[98%] left-[5%] md:left-0 grid grid-cols-1 md:grid-cols-12 ">
            <div className="col-span-1 md:col-span-3">
              <InputSearch text="Pencarian" />
            </div>
            <div className="flex justify-start col-span-1 mt-2 md:mt-0 md:col-span-2">
              <button
                className="border border-dark px-4 py-[6px] rounded-md hover:bg-dark hover:text-white"
                onClick={exportToExcel}
              >
                Export to Excel
              </button>
            </div>
          </div>

          <div className=" border border-gray-300  relative w-[90%] md:w-[98%] left-[5%] md:left-0 hidden md:grid md:grid-cols-12 bg-blue rounded-lg   items-center my-2 mr-4 h-[50px]">
            <div className="col-span-1 ">
              <p>No</p>
            </div>
            <div className="col-span-1 ">
              <p>Order Id</p>
            </div>
            <div className="col-span-2 ">
              <p>Pesanan & Tgl Pesan</p>
            </div>
            <div className="col-span-1 ">
              <p>Produk</p>
            </div>
            <div className="col-span-2 ">
              <p>Tagihan</p>
            </div>
            <div className="col-span-2 ">
              <p>Pembayaran</p>
            </div>
            <div className="col-span-1 ">
              <p>Bukti Transfer</p>
            </div>
            <div className="col-span-2 ">
              <p>Keterangan</p>
            </div>
          </div>

          {currentOrders.map((item, index) => (
            <div>
              <div
                key={index}
                className="relative w-[90%]   md:w-[98%] left-[5%] md:left-0  mt-2  md:w-[98%] border border-gray-300 bg-white rounded-lg p-2 right-4 mb-4"
              >
                <div className=" relative grid grid-cols-1 h-auto md:grid-cols-12 gap-2 justify-between items-center my-2 h-[50px]">
                  <div className="relative flex justify-start col-span-12 md:col-span-1 md:justify-center">
                    <p className="md:hidden">No .</p>
                    <p>{itemsPerPage * (currentPage - 1) + index + 1}</p>
                  </div>
                  <div className="relative flex justify-start col-span-12 md:col-span-1 md:justify-center ">
                    <p>{`# ${item.id}`}</p>
                  </div>
                  <div className="flex justify-start col-span-12 md:col-span-2 md:justify-center">
                    <p className="md:hidden w-[40%] flex justify-start">
                      Pemesan
                    </p>
                    <p> {`${item.pengorder.name}`}</p>
                  </div>
                  <div className="flex justify-start col-span-12 md:col-span-1 md:justify-center">
                    <p className="md:hidden w-[40%] flex justify-start">
                      Produk
                    </p>
                    <p> {item.quantity}</p>
                  </div>
                  <div className="flex justify-start col-span-12 md:col-span-2 md:justify-center ">
                    <p className="md:hidden w-[40%] flex justify-start">
                      Tagihan
                    </p>
                    <p>{item.total_price}</p>
                  </div>
                  <div className="flex justify-start col-span-12 md:col-span-2 md:justify-center ">
                    <p className="md:hidden w-[40%] flex justify-start">
                      Pembayaran
                    </p>
                    <p>{item.payment}</p>
                  </div>
                  <div
                    className={`md:col-span-1 ${
                      item.uploadBuktiPembayaran === null ? "bg-red-500" : ""
                    }`}
                  >
                    {item.uploadBuktiPembayaran === null ? (
                      <p>Bukti Pembayaran Belum Ada</p>
                    ) : (
                      <button
                        onClick={() => openModal(item.buktiPembayaranUrl)}
                        className="px-2 border rounded-xl hover:bg-gray-200"
                      >
                        Lihat
                      </button>
                    )}
                  </div>

                  {item.status_pembayaran == "Sudah Dibayar" ? (
                    <div className="col-span-2 rounded-full bg-sky-200">
                      <p>{item.status_pembayaran}</p>
                    </div>
                  ) : (
                    <div className="col-span-2 bg-red-200 rounded-full">
                      <p>{item.status_pembayaran}</p>
                    </div>
                  )}
                </div>
                <div className="flex justify-between border-t-2 border-gray-400 ">
                  <div className="w-[50%]">
                    <div className="flex justify-start">
                      <img src={store} alt="" className="w-[25px] mr-2" />
                    </div>
                  </div>
                  <div className="w-[50%] flex justify-end ">
                    <div>
                      <Link to={`/admin/order/updateOrder/${item.order_code}`}>
                        <button className="px-4 py-2 mt-2 mr-4 text-dark bg-sky-200">
                          Update Order
                        </button>
                      </Link>
                      <Link to={`/admin/order/invoice/${item.order_code}`}>
                        <button className="px-4 py-2 mt-2 mr-4 text-dark bg-sky-200">
                          invoice
                        </button>
                      </Link>

                      {item.status_pembayaran == "Sudah Dibayar" ? (
                        ""
                      ) : (
                        <button
                          onClick={() => onSubmit(item.order_code)}
                          className="px-4 py-2 mt-2 mr-4 text-dark bg-sky-200"
                        >
                          Konfirmasi Pembayaran
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {showModal && (
            <div>
              <ImageViewerModal
                imageUrl={selectedImage}
                closeModal={closeModal}
              />
            </div>
          )}

          {/* Pagination controls */}
          <div>
            {/* Pagination */}
            <div>
              <ul className="relative flex items-center ml-4 pagination">
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
      )}
    </div>
  );
};

export default PesananBaru;
