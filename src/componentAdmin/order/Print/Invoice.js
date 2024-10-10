import React, { useContext, useEffect, useState, useRef } from "react";
import { GlobalContext } from "../../../context/GlobalContext";
import khadija from "../../../assets_admin/khadija.png";
import axios from "axios";
import {
  Coba1,
  Coba11,
  Coba6,
} from "../../../components/reusableComponents/Text";
import ReactToPrint from "react-to-print";
import "./File.css";

const Invoice = () => {
  const printContentRef = useRef(null);
  const { printOrder, setPrintOrder, printInvoice, setPrintInvoice } =
    useContext(GlobalContext);
  const [invoice, setInvoice] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchInvoice = async () => {
    setLoading(true);
    try {
      const printOrderString = printOrder.join(",");
      const response = await axios.get(
        `https://laravel-api-10.cerise.id/api/orders/invoice-selected/${printOrderString}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setInvoice(response.data.data);
      // console.log("respon invoicenya ", response.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchInvoice();
    // handlePrint();
  }, []);
  return (
    <div>
      <div className="flex relative">
        <ReactToPrint
          trigger={() => (
            <button className="border border-dark px-8 py-2 rounded-md hover:bg-dark hover:text-white">
              Print
            </button>
          )}
          content={() => printContentRef.current}
        />
      </div>
      <div
        ref={printContentRef}
        className=" grid grid-cols-1  gap-2 pt-4 px-4  "
      >
        {invoice.map((item, index) => (
          <div key={index} className="mt-4 print:page-break">
            <div className="relative  bg-white rounded-lg grid grid-cols-12 gap-2">
              <div className=" col-span-2">
                <img src={khadija} alt={khadija} />
              </div>
              <div className=" col-span-4 ">
                <div className="text-left  w-[90%] relative left-[5%]">
                  <Coba1 text="Khadijah" />
                </div>
                <div className="text-left  w-[90%] relative left-[5%]">
                  <Coba6 text="Khadija Market adalah toko online yamg menyediakan produk herbal berkualitas dan keperluan terapis" />
                </div>
              </div>
              <div className=" col-span-6 text-left border border-gray-200 p-2 rounded-md w-[100%] grid grid-cols-4">
                <div className="mb-2">
                  <Coba6 text="Tanggal :" />
                  <Coba6 text={item.order_date} />
                </div>
                <div className="mb-2 col-span-2">
                  <Coba6 text="Nomor Invoice :" />
                  <Coba6 text={item.order_code} />
                </div>
                {/* <div className="mb-2">
                  <Coba6 text="Admin :" />
                  <Coba6 text="[ini nanti nama adm]" />
                </div> */}
                <div className="mb-2">
                  <span>
                    <Coba6 text="Paid" />
                    {item.payment_date}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-left ">
              <div className="w-[95%] relative left-[2.5%]">
                <Coba11 text={`Kepada ${item.pengorder}`} />
                <Coba6 text="Terimakasih sudah berbelanja" />
              </div>
            </div>

            <div className="text-left mt-4">
              <div className="w-[95%] relative left-[2.5%]">
                <Coba11 text="Produk :" />
              </div>
            </div>

            <div className="relative border border-gray-200  bg-print-gray bg-gray-200  print:bg-gray-200  grid grid-cols-12 gap-2">
              <div className=" col-span-1">
                <Coba6 text="No." />
              </div>
              <div className=" col-span-6">
                <Coba6 text="Nama Produk" />
              </div>
              {printInvoice[3].status ? (
                <div className=" col-span-2">
                  <Coba6 text="Berat" />
                </div>
              ) : (
                <div className=" col-span-2">
                  <p></p>
                </div>
              )}

              <div className=" col-span-3">
                <Coba6 text="Total" />
              </div>
            </div>
            {item.order.products.length == 0 ? (
              <div className="bg-gray-100 border-gray-100 py-2 my-2 px-8 text-left">
                <Coba6 text="Tidak ada data" />
              </div>
            ) : (
              <div>
                {item.order.products.map((produk, index) => (
                  <div
                    key={index}
                    className="relative border border-gray-100  bg-gray-100 py-2 my-2  grid grid-cols-12 gap-2"
                  >
                    <div className=" col-span-1">
                      <Coba6 text={index + 1} />
                    </div>
                    <div className=" col-span-6">
                      <Coba6 text={produk.item_name} />
                    </div>
                    {printInvoice[3].status ? (
                      <div className=" col-span-2">
                        <Coba6 text={produk.weight} />
                      </div>
                    ) : (
                      <div className=" col-span-2">
                        <Coba6 text="" />
                      </div>
                    )}

                    <div className=" col-span-3">
                      <Coba6 text={produk.total_amount} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="text-left mt-4">
              <div className="w-[95%] relative left-[2.5%]">
                <Coba11 text="Bundle :" />
              </div>
            </div>

            <div className="relative border border-gray-200  bg-gray-200  grid grid-cols-12 gap-2">
              <div className=" col-span-1">
                <Coba6 text="No." />
              </div>
              <div className=" col-span-6">
                <Coba6 text="Nama Produk" />
              </div>

              {printInvoice[3].status ? (
                <div className=" col-span-2">
                  <Coba6 text="Berat" />
                </div>
              ) : (
                <div className=" col-span-2">
                  <p></p>
                </div>
              )}

              <div className=" col-span-3">
                <Coba6 text="Total" />
              </div>
            </div>

            {item.order.bundles.length === 0 ? (
              <div className="border border-gray-100 bg-gray-100 py-2 my-2 px-8 text-left">
                <Coba6 text="Tidak ada data" />
              </div>
            ) : (
              <div>
                {item.order.bundles.map((bundle, index) => (
                  <div
                    key={index}
                    className="relative border border-gray-100 print:bg-red-500 bg-gray-100 py-2 my-2  grid grid-cols-12 gap-2"
                  >
                    <div className=" col-span-1">
                      <Coba6 text={index + 1} />
                    </div>
                    <div className=" col-span-6">
                      <Coba6 text={bundle.item_name} />
                    </div>
                    {printInvoice[3].status ? (
                      <div className=" col-span-2">
                        <Coba6 text={bundle.weight} />
                      </div>
                    ) : (
                      ""
                    )}

                    <div className=" col-span-3">
                      <Coba6 text={bundle.total_amount} />
                    </div>
                  </div>
                ))}
              </div>
            )}
            {printInvoice[2].status ? (
              <div className="text-left my-2">
                <div className="w-[95%] relative left-[2.5%] grid grid-cols-12">
                  <div className="col-span-3">
                    <Coba6 text="Ekspedisi :" />
                  </div>
                  <div className="col-span-9">
                    <img
                      src={item.courier_logo}
                      alt={item.courier_logo}
                      className="w-[100px]"
                    />
                    <Coba6 text={item.courier_name} />
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
            {printInvoice[1].status ? (
              <div className="text-left my-2">
                <div className="w-[95%] relative left-[2.5%] grid grid-cols-12">
                  <div className="col-span-3">
                    <Coba6 text="Rekening Pembayaran :" />
                  </div>
                  <div className="col-span-9">
                    <Coba11 text={item.rekening.rekening1} />
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}

            <div className="text-left my-2">
              {printInvoice[0].status ? (
                <div>
                  <div className="w-[95%] relative left-[2.5%] grid grid-cols-12">
                    <div className="col-span-3">
                      <Coba6 text="Alamat Pengiriman  :" />
                    </div>
                    <div className="col-span-9">
                      <Coba11 text="ALAMAT " />
                      <Coba6 text={item.alamat_pengiriman_kecamatan} />
                      <Coba6 text={item.alamat_pengiriman_kota} />
                      <Coba6 text={item.alamat_pengiriman_kodepos} />
                      <Coba6 text="Telp " />
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Invoice;
