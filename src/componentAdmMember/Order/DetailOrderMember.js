import React, { useState, useEffect } from "react";
import {
  Coba1,
  Coba10,
  Coba11,
  Coba12,
} from "../../components/reusableComponents/Text";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import cancel from "../../assets/cancel.png";

const DetailOrderMember = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [orderList, setOrderList] = useState([]);
  const [produk, setProduk] = useState([]);
  const [bundle, setBundle] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchOrderList = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://laravel-api-10.cerise.id/api/detail-order-member/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setOrderList(response.data.Order);

      if (response.data.Products.length == 0) {
        setProduk([]);
      } else {
        setProduk(response.data.Products);
      }

      if (response.data.Bundles.length == 0) {
        setBundle([]);
      } else {
        setBundle(response.data.Bundles);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrderList();
  }, []);

  const openModal = (item) => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  console.log("orderr", orderList);
  // console.log("orderr produk", produk);
  // console.log("orderr bundle", bundle);
  // console.log("orderr bundle produk", bundle.products);
  return (
    <div className=" grid grid-cols-1 lg:grid-cols-2 gap-4 w-[95%]">
      {orderList.map((item, index) => (
        <div>
          <div>
            <div className=" text-left bg-white rounded-md p-2 mb-4">
              <div className="mb-8 border-b pb-4">
                <Coba1 text={`Order Id #${item.id}`} />
              </div>
              <div className=" flex mb-4">
                <div className="w-[30%]  ">
                  <Coba11 text="Dikirim ke " />
                </div>
                <div className="w-[70%]  ">
                  <Coba10 text={`: ${item.penerima.name}`} />
                </div>
              </div>
              <div className=" flex mb-4">
                <div className="w-[30%]  ">
                  <Coba11 text="Alamat " />
                </div>
                <div className="w-[70%]  ">
                  <Coba10 text=": belum ada" />
                </div>
              </div>
              <div className=" flex mb-4">
                <div className="w-[30%]  ">
                  <Coba11 text="No Hp" />
                </div>
                <div className="w-[70%]  ">
                  <Coba10 text={`: ${item.penerima.no_wa}`} />
                </div>
              </div>
              <div className=" flex ">
                <div className="w-[30%]  ">
                  <Coba11 text="Kurir : " />
                </div>
              </div>
              <div className="border rounded-lg p-2 flex mb-4">
                <div className=" w-[30%]">
                  <img
                    src={item.courier.logo}
                    alt={item.courier.logo}
                    className="w-[100px]"
                  />
                </div>
                <div className=" w-[50%]">
                  <Coba11 text={item.courier.name} />
                  <Coba10 text={item.paketRajaOngkir} />
                </div>
                <div className=" w-[20%]">
                  <Coba10 text={item.ongkirRajaOngkir} />
                </div>
              </div>
            </div>

            <div className=" bg-white p-2 rounded-md mb-4">
              <div className="border-b pb-4 mb-4  text-left">
                <Coba1 text="Info Transaksi" />
              </div>
              {/*<div className=" flex mb-4">*/}
              {/*  <div className="w-[30%] text-left ">*/}
              {/*    <Coba11 text="Total Tagihan " />*/}
              {/*  </div>*/}
              {/*  <div className="w-[70%]  ">*/}
              {/*    <Coba10 text={`: ${item.total_price}`} />*/}
              {/*  </div>*/}
              {/*</div>*/}
              <div className=" flex mb-4">
                <div className="w-[30%] text-left ">
                  <Coba11 text="Jumlah Yang Harus Dibayar " />
                </div>
                <div className="w-[70%]  ">
                  <Coba10 text={`: ${parseInt(item.payment, 10) + parseInt(item.ongkirRajaOngkir, 10)}`} />
                </div>



              </div>
              <div className=" flex mb-4">
                <div className="w-[30%]  text-left">
                  <Coba11 text="Bukti Bayar " />
                </div>
                <div
                  className="w-[70%] cursor-pointer"
                  onClick={() => openModal(item.order_code)}
                >
                  <Coba12 text=": Lihat Foto" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className=" text-left">
        <div className="">
          {produk.map((item, index) => (
            <div>
              {produk.length == 0 ? (
                ""
              ) : (
                <div className=" bg-white p-2 rounded-md mb-4">
                  <div className="border-b pb-4 mb-4">
                    <Coba1 text="Detail Order Produk" />
                  </div>
                  <div className=" mb-4 border p-2 ">
                    <div className=" flex ">
                      <div className="w-[100%]  ">
                        <Coba11 text={item.name} />
                      </div>
                    </div>
                    <div className=" flex ">
                      <div className="w-[30%]  ">
                        <Coba11 text="Qty " />
                      </div>
                      <div className="w-[70%]  ">
                        <Coba10 text={`: ${item.quantity}`} />
                      </div>
                    </div>
                    <div className=" flex ">
                      <div className="w-[30%]  ">
                        <Coba11 text="Harga " />
                      </div>
                      <div className="w-[70%]  ">
                        <Coba10 text={`: ${item.price_sale_formater}`} />
                      </div>
                    </div>

                    <div className=" flex ">
                      <div className="w-[30%]  ">
                        <Coba11 text="Diskon Ongkir " />
                      </div>
                      <div className="w-[70%]  ">
                        <Coba10 text={`: ${item.discount_harga_formater}`} />
                      </div>
                    </div>
                    <div className=" flex ">
                      <div className="w-[30%]  ">
                        <Coba11 text="Diskon Harga " />
                      </div>
                      <div className="w-[70%]  ">
                        <Coba10 text={`: ${item.discount_ongkir_formater}`} />
                      </div>
                    </div>
                    <div className=" flex ">
                      <div className="w-[30%]  ">
                        <Coba11 text="product detail " />
                      </div>
                      <div className="w-[70%] flex ">
                        :
                        <div
                          dangerouslySetInnerHTML={{
                            __html: item.product_detail,
                          }}
                        />
                      </div>
                    </div>
                    {/* <div className=" flex ">
                      <div className="w-[30%]  ">
                        <Coba11 text="Total " />
                      </div>
                      <div className="w-[70%]  ">
                        <Coba10 text={`: ${item.quantity}`} />
                      </div>
                    </div> */}
                  </div>
                </div>
              )}
            </div>
          ))}

          {bundle.map((item, index) => (
            <div>
              {bundle.length == 0 ? (
                ""
              ) : (
                <div className=" bg-white p-2 rounded-md ">
                  <div className="border-b pb-4 mb-4">
                    <Coba1 text="Detail Order Bundle" />
                  </div>

                  <div className=" mb-4  p-2 ">
                    <div className=" flex ">
                      <div className="w-[100%]  ">
                        <Coba11 text={item.name} />
                      </div>
                    </div>
                    <div className=" flex ">
                      <div className="w-[30%]  ">
                        <Coba11 text="Qty " />
                      </div>
                      <div className="w-[70%]  ">
                        <Coba10 text={`: ${item.quantity}`} />
                      </div>
                    </div>
                    <div className=" flex ">
                      <div className="w-[30%]  ">
                        <Coba11 text="Harga " />
                      </div>
                      <div className="w-[70%]  ">
                        <Coba10 text={`: ${item.price_bundle}`} />
                      </div>
                    </div>
                    <div className=" flex ">
                      <div className="w-[30%]  ">
                        <Coba11 text="Total " />
                      </div>
                      <div className="w-[70%]  ">
                        <Coba10 text=": Rp 80000" />
                      </div>
                    </div>

                    {item.products.map((item, index) => (
                      <div className="  border p-2 mt-4 ">
                        <div className=" flex ">
                          <div className="w-[30%]  ">
                            <Coba11 text={item.name} />
                          </div>
                        </div>
                        <div className=" flex ">
                          <div className="w-[30%]  ">
                            <Coba11 text="QTY  " />
                          </div>
                          <div className="w-[70%]  ">
                            <Coba10 text={`: ${item.pivot.qty_product}`} />
                          </div>
                        </div>
                        <div className=" flex ">
                          <div className="w-[30%]  ">
                            <Coba11 text="Harga  " />
                          </div>
                          <div className="w-[70%]  ">
                            <Coba10 text={`: ${item.price_sale}`} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed top-0 left-0 w-[100%] h-[100%] flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white  rounded-md p-[20px] shadow-md w-[40%] h-[50%] overflow-auto">
            <div className="flex justify-end">
              <button className="close-button" onClick={closeModal}>
                <img src={cancel} alt="" className="w-[20px]" />
              </button>
            </div>
            <Coba10 text=" Bukti Pembayaran" />
            <div>
              {orderList.map((item, index) => (
                <div>
                  <img
                    src={item.buktiPembayaranUrl}
                    alt={item.buktiPembayaranUrl}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailOrderMember;
