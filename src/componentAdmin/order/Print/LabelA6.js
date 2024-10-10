import React, { useContext, useEffect, useState, useRef } from "react";
import { GlobalContext } from "../../../context/GlobalContext";
import khadija from "../../../assets_admin/khadija.png";
import {
  Coba1,
  Coba11,
  Coba6,
} from "../../../components/reusableComponents/Text";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactToPrint from "react-to-print";
import "./File.css";

const LabelA6 = () => {
  const printContentRef = useRef(null);
  const {
    printOrder,
    setPrintOrder,
    printA6,
    setPrintA6,
    setInvoice,
    invoice,
  } = useContext(GlobalContext);

  // const [invoice, setInvoice] = useState([]);
  const [produk, setProduk] = useState([]);
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
      // console.log("respon invoicenya produk ", response.data.data[1].orders);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchInvoice();
  }, []);
  // console.log("print order label a6", printOrder);
  // console.log("invoice a6", invoice);

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
        className=" grid grid-cols-1 md:grid-cols-12 gap-2 mt-4 p-4"
      >
        {invoice.map((item, index) => (
          <div
            key={index}
            className="col-span-6 border border border-black w-[100%] grid grid-cols-12 mt-2 print:page-break"
          >
            <div className=" col-span-12 flex relative justify-between ">
              {printA6[1].status ? (
                <div className=" border border border-black">
                  <img
                    src={item.courier_logo}
                    alt={item.courier_logo}
                    className="w-[100px]"
                  />
                </div>
              ) : (
                ""
              )}
              <div className="border text-center border-black w-[100%]">
                <Coba11 text={item.courier_name} />
                <p>REG</p>
              </div>
              {printA6[3].status ? (
                <div className=" border border-black w-[20%]">
                  <p>{item.total_weight} kg</p>
                </div>
              ) : (
                ""
              )}

              {printA6[2].status ? (
                <div className=" border border border-black p-2">
                  <img src={khadija} alt={khadija} className="w-[100px]" />
                </div>
              ) : (
                ""
              )}
            </div>

            <div className="col-span-12 border border border-black w-[100%] p-2 text-left">
              <p>RESI : {item.order_code}</p>
            </div>

            <div className="col-span-12 border border border-black w-[100%] p-2 text-left">
              {item.role === "4" ? (
                <p>PENGIRIM : {item.pengorder}</p>
              ) : (
                <p>PENGIRIM : KHADIJAH MARKET</p>
              )}
            </div>
            <div className="col-span-12 border border border-black w-[100%] p-2 text-left">
              <p>KEPADA : {item.penerima}</p>
              <p>ALamat Pengiriman : </p>
              <Coba6 text={item.alamat_pengiriman_kecamatan} />
              <Coba6 text={item.alamat_pengiriman_kota} />
              <Coba6 text={item.alamat_pengiriman_kodepos} />
            </div>
            {printA6[0].status ? (
              <div className="col-span-12 border border border-black w-[100%] p-2 text-left">
                <p>ISI PAKET :</p>
                <Coba11 text="Produk" />
                {item.order.products.map((item2, index) => (
                  <div className="grid grid-cols-3">
                    <div className="col-span-1">
                      <p>{item2.item_name}</p>
                    </div>
                    <div className="col-span-1 text-right">
                      <p> {item2.weight} g</p>
                    </div>
                    <div className="col-span-1 text-right">
                      <p>Rp {item2.total_amount}</p>
                    </div>
                  </div>
                ))}

                <Coba11 text="Bundle" />
                {item.order.bundles.map((item2, index) => (
                  <div className="grid grid-cols-3">
                    <div className="col-span-1">
                      <p>{item2.item_name}</p>
                    </div>
                    <div className="col-span-1 text-right">
                      <p> {item2.weight} g</p>
                    </div>
                    <div className="col-span-1 text-right">
                      <p>Rp {item2.total_amount}</p>
                    </div>
                  </div>
                ))}
                <div className="grid grid-cols-3">
                  <div className="col-span-2">
                    <p>TOTAL ITEM : </p>
                  </div>
                  <div className="col-span-1 text-right">
                    {/* {item.orders.map((item2, index) => (
                    <p>{item2.length}</p>
                  ))} */}
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}

            {/* <div className="col-span-12 border border border-black w-[100%] text-left">
              <p>BARCODE</p>
            </div> */}

            <div className="col-span-12 border border border-black w-[100%] p-2 text-left grid grid-cols-3">
              <div className="col-span-2 grid grid-cols-2">
                <p>Biaya Kirim</p>
                <p>: Rp {item.total_ongkir}</p>

                <p>Total Biaya</p>
                <p>: Rp {item.total_price}</p>
              </div>
              <div className="col-span-1 flex relative items-center text-center">
                <Coba1 text="#44" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LabelA6;
