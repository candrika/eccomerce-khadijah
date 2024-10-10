import React, { useEffect, useState } from "react";
import {
  Coba10,
  Coba11,
  Coba12,
} from "../../components/reusableComponents/Text";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";

const DetailOrder = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [detailOrder, setDetailOrder] = useState([]);
  const [bundle, setBundle] = useState([]);
  const [produk, setProduk] = useState([]);
  const [alamatUtama, setAlamatUtama] = useState("");

  const fetchAllOrder = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://laravel-api-10.cerise.id/api/orders/order-detail/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log(
      //   "respon detail order",
      //   response.data.Order[0].penerima.address_id
      // );
      setDetailOrder(response.data.Order);
      setAlamatUtama(response.data.Order[0].penerima.address_id);

      setBundle(response.data.Bundles);
      setProduk(response.data.Bundles);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // console.log("Bundleee", bundle);
  // console.log("det order", detailOrder);
  useEffect(() => {
    fetchAllOrder();
  }, []);
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red; // Customize the spinner color if needed
  `;
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
        <div>
          {detailOrder.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-2 gap-4 p-4 mb-8 border border-gray-200 rounded-md shadow-md "
            >
              <div className="grid grid-cols-3 gap-2 ">
                <div className="col-span-3 text-left ">
                  <Coba12 text={`#${item.id}`} />
                </div>
                <div className="col-span-3 text-left">
                  <Coba12 text={item.order_code} />
                </div>
                <div className="text-left ">
                  <Coba11 text="Status Bayar  " />
                </div>
                <div className="col-span-2 text-left ">
                  <Coba10 text={`: ${item.status_pembayaran}`} />
                </div>
                <div className="text-left ">
                  <Coba11 text="Paket Raja Ongkir  " />
                </div>
                <div className="col-span-2 text-left ">
                  <Coba10 text={`: ${item.paketRajaOngkir}`} />
                </div>
                <div className="text-left ">
                  <Coba11 text="Estimasi   " />
                </div>
                <div className="col-span-2 text-left ">
                  <Coba10 text={`: ${item.etaRajaOngkir} hari`} />
                </div>
                <div className="text-left ">
                  <Coba11 text="Ongkir   " />
                </div>
                <div className="col-span-2 text-left ">
                  <Coba10 text={`: Rp ${item.ongkirRajaOngkir}`} />
                </div>
                {/* PENGIRIM */}
                <div className="col-span-3 mt-4 text-left">
                  <Coba12 text="Pengirim : " />
                </div>
                <div className="text-left ">
                  <Coba11 text="Name   " />
                </div>
                <div className="col-span-2 text-left ">
                  <Coba10 text={`:  ${item.users.name}`} />
                </div>
                <div className="text-left ">
                  <Coba11 text="Email   " />
                </div>
                <div className="col-span-2 text-left ">
                  <Coba10 text={`:  ${item.users.email}`} />
                </div>
                <div className="text-left ">
                  <Coba11 text="No Wa   " />
                </div>
                <div className="col-span-2 text-left ">
                  <Coba10 text={`:  ${item.users.no_wa}`} />
                </div>
                <div className="text-left ">
                  <Coba11 text="Alamat User   " />
                </div>

                <div className="col-span-2 text-left ">
              {item.users.alamat_users.map((items, index) => (
                <Coba10
                  text={`:  ${items.detail_alamat}, ${items.city}, ${items.subdistrict_name}`}
                />
              ))}
            </div>
                {/* PENERIMA */}
                <div className="col-span-3 text-left">
                  <Coba12 text="Penerima : " />
                </div>
                <div className="text-left ">
                  <Coba11 text="Name   " />
                </div>
                <div className="col-span-2 text-left ">
                  <Coba10 text={`:  ${item.penerima.name}`} />
                </div>
                <div className="text-left ">
                  <Coba11 text="Email   " />
                </div>
                <div className="col-span-2 text-left ">
                  <Coba10 text={`:  ${item.penerima.email}`} />
                </div>
                <div className="text-left ">
                  <Coba11 text="No Wa   " />
                </div>
                <div className="col-span-2 text-left ">
                  <Coba10 text={`:  ${item.penerima.no_wa}`} />
                </div>

                {/* CHANNEL */}
                <div className="col-span-3 text-left">
                  <Coba12 text="Channel : " />
                </div>
                <div className="text-left ">
                  <Coba11 text="Name   " />
                </div>
                <div className="col-span-2 text-left ">
                  {/* <Coba10 text={`:  ${item.channels.name}`} /> */}
                </div>
              </div>
              <div className="">
                <div className="col-span-3 text-left">
                  <Coba12 text="Product : " />
                </div>
                <div className="grid grid-cols-2 col-span-3 gap-2 p-4 text-left rounded-md ">
                  <div className="text-left ">
                    <Coba11 text="Nama Produk  " />
                  </div>
                  <div className="text-left ">
                    <Coba10 text={`: ${item.products.name}`} />
                  </div>
                  <div className="text-left ">
                    <Coba11 text="Harga Jual  " />
                  </div>
                  <div className="text-left ">
                    <Coba10
                      text={`: Rp ${item.products.price_reseller_formater}`}
                    />
                  </div>
                  <div className="text-left ">
                    <Coba11 text="SKU   " />
                  </div>
                  <div className="text-left ">
                    <Coba10 text={`: ${item.products.SKU}`} />
                  </div>
                  <div className="text-left ">
                    <Coba11 text="Produk Detail   " />
                  </div>
                  <div className="text-left ">
                    <div className="flex">
                      :
                      <div
                        dangerouslySetInnerHTML={{
                          __html: item.products.product_detail,
                        }}
                      />
                    </div>
                  </div>
                  <div className="text-left ">
                    <Coba11 text="Berat   " />
                  </div>
                  <div className="text-left ">
                    <Coba10 text={`: ${item.products.berat}`} />
                  </div>
                </div>
              </div>

              {bundle.map((item, index) => (
                <div key={index}>
                  <div className="col-span-3 mt-4 text-left">
                    <Coba12 text="Bundle : " />
                  </div>
                  <div className="grid grid-cols-2 col-span-3 gap-2 p-4 text-left rounded-md ">
                    <div className="text-left ">
                      <Coba11 text="Nama Bundle  " />
                    </div>
                    <div className="text-left ">
                      <Coba10 text={`: ${item.name}`} />
                    </div>
                    <div className="text-left ">
                      <Coba11 text="Harga Bundle  " />
                    </div>
                    <div className="text-left ">
                      <Coba10 text={`: Rp ${item.price_bundle}`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DetailOrder;
