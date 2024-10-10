import React, { useEffect, useState } from "react";
import {
  Coba10,
  Coba11,
  Coba12,
} from "../../components/reusableComponents/Text";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { BtnAdmin1 } from "../../components/reusableComponents/ButtonAdmin";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import * as Yup from "yup";

const initialState = {
  status_order: "",
  status_print: "",
};
const UpdateOrder = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [detailOrder, setDetailOrder] = useState([]);
  const [bundle, setBundle] = useState([]);
  const [produk, setProduk] = useState([]);
  const [input, setInput] = useState(initialState);

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
      setDetailOrder(response.data.Order);

      // console.log("respon detail order", response.data);
      setBundle(response.data.Bundles);
      setProduk(response.data.Bundles);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // console.log("Bundleee", bundle);
  useEffect(() => {
    fetchAllOrder();
  }, []);

  const onSubmit = async (id) => {
    const confirmationResult = await Swal.fire({
      title: "Apakah anda ingin menyimpan perubahan?",
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
          { status_order: values.status_order },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "X-HTTP-Method-Override": "PUT",
            },
          }
        );
        // console.log("respon sukses", response);
        fetchAllOrder();
        navigate("/admin/order/semuaOrder");
        // console.log("response sukses");
        await Swal.fire({
          title: "Sukses",
          text: "Edit Order Berhasil",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        });
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Terjadi kesalahan ",
          icon: "error",
          confirmButtonColor: "#d33",
          confirmButtonText: "OK",
        });
      }
    }
  };

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
    //   {currentOrders.map((order) => (
    <div>
      {detailOrder.map((item, index) => (
        <div className="grid grid-cols-2 gap-4 p-4 mb-8 border border-gray-200 rounded-md shadow-md ">
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
          <div>
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
                  {/* <Coba10 text={`: ${item.products.product_detail}`} /> */}
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
              <div>
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

            <div className="mt-4 text-left">
              <Coba11 text="Konfirmasi Order" />
              <select
                name="status_order"
                onChange={handleChange}
                value={values.status_order}
                onBlur={handleBlur}
                className="w-[100%] h-[60px] border border-[#D3D3D3] rounded-lg pl-4"
              >
                <option value="" disabled>
                  Konfirmasi Order
                </option>
                <option value="">-Pilih-</option>
                <option value="1">Belum Diproses</option>
                <option value="2">Sedang Diproses</option>
                <option value="3">Proses Pengiriman</option>
                <option value="4">Pengiriman Selesai</option>
              </select>
            </div>
            <div className="mt-4">
              <BtnAdmin1
                text="simpan"
                onClick={() => onSubmit(item.order_code)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UpdateOrder;
