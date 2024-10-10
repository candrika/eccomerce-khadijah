import React, { useRef, useState, useEffect } from "react";
import html2canvas from "html2canvas";
import logo from "../../assets/logo.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Invoice2 = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [input, setInput] = useState([]);
  const [order, setOrder] = useState([]);
  const [product, setProduct] = useState([]);
  const [bundle, setBundle] = useState([]);
  const [rekening1, setRekening1] = useState("");
  const [rekening2, setRekening2] = useState("");
  const [rekening3, setRekening3] = useState("");
  const [rekening4, setRekening4] = useState("");
  const [rekening5, setRekening5] = useState("");
  const watermarkPositions = [
    { top: "5%", left: "5%" },
    { top: "5%", left: "25%" },
    { top: "5%", left: "45%" },
    { top: "5%", left: "65%" },
    { top: "5%", left: "85%" },
    { top: "25%", left: "5%" },
    { top: "25%", left: "25%" },
    { top: "25%", left: "45%" },
    { top: "25%", left: "65%" },
    { top: "25%", left: "85%" },
    { top: "45%", left: "5%" },
    { top: "45%", left: "25%" },
    { top: "45%", left: "45%" },
    { top: "45%", left: "65%" },
    { top: "45%", left: "85%" },
    { top: "65%", left: "5%" },
    { top: "65%", left: "25%" },
    { top: "65%", left: "45%" },
    { top: "65%", left: "65%" },
    { top: "65%", left: "85%" },
  ];

  const fetchUserById = async (event) => {
    try {
      const response = await axios.get(
        `https://laravel-api-10.cerise.id/api/user/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("x", response.data);
      setInput({
        name: response.data.name,
        email: response.data.email,
        role_id: response.data.role_id,
        no_wa: response.data.no_wa,
        gender: response.data.gender,
      });
      const url = response.data.image;
      const filename = url.substring(url.lastIndexOf("/") + 1);
      console.log("url", response.data.image);
      console.log("filename", filename);
    } catch (error) {
      console.log(`${error} error`);
    }
  };
  const fetchRekening = async (event) => {
    try {
      const response = await axios.get(
        `https://laravel-api-10.cerise.id/api/markets`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("rekening", response.data.setting_general.data);
      setRekening1(response.data.setting_general.data.rekening1);
      setRekening2(response.data.setting_general.data.rekening2);
      setRekening3(response.data.setting_general.data.rekening3);
      setRekening4(response.data.setting_general.data.rekening4);
      setRekening5(response.data.setting_general.data.rekening5);
    } catch (error) {
      console.log(`${error} error`);
    }
  };

  const fetchInvoice = async () => {
    try {
      const response = await axios.get(
        `https://laravel-api-10.cerise.id/api/orders/invoice-selected/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Orders", response.data.Order);
      console.log("Products", response.data.Products);
      console.log("Bundles", response.data.Bundles);

      setBundle(response.data.Bundles);
      setProduct(response.data.Products);
      setOrder(response.data.Order);
    } catch (error) {
      console.log(`${error} error`);
    }
  };

  useEffect(() => {
    fetchUserById();
    fetchInvoice();
    fetchRekening();
  }, []);

  const watermarkElements = watermarkPositions.map((position, index) => (
    <div
      key={index}
      className="absolute pointer-events-none watermark opacity-30"
      style={{ top: position.top, left: position.left, zIndex: -1 + index }}
    >
      <div className="absolute top-0 left-0 w-full h-full mt-16 -ml-2 transform -rotate-45 md:mt-20 md:-ml-2">
        <h1 className="text-[0.8rem] font-bold text-gray-300 md:text-xl md:font-bold md:text-gray-300">
          KhadijaMarket
        </h1>
      </div>
    </div>
  ));

  const invoiceRef = useRef(null);

  const generateImage = () => {
    if (invoiceRef && invoiceRef.current) {
      html2canvas(invoiceRef.current).then((canvas) => {
        const link = document.createElement("a");
        link.download = "invoice.png";
        link.href = canvas.toDataURL();
        link.click();
      });
    }
  };

  return (
    <div className="bg-primary py-12 max-h-full h-[100rem]">
      <div className="grid place-content-center">
        <img className="h-[8rem] w-[12rem] mx-5" src={logo} alt="logo" />
      </div>
      <div
        className="relative w-11/12 p-6 mx-auto mt-5 bg-white rounded-md shadow-lg invoice md:w-3/4 lg:w-2/3 xl:w-1/2"
        ref={invoiceRef}
      >
        {order.map((item, index) => (
          <div className="mb-6 text-center header">
            <h1 className="text-3xl font-bold">INVOICE</h1>
            <p className="text-sm">Invoice Number: {item.order_code}</p>
            <p className="text-sm">{`Date : ${item.order_date}`}</p>
          </div>
        ))}
        <div className="grid mb-10 content place-content-center">
          <table className="hidden w-full md:block lg:block">
            <tr>
              <th className="px-4 py-2 border">Description</th>
              <th className="px-4 py-2 border">Quantity</th>
              <th className="px-4 py-2 border">Unit Price</th>
              <th className="px-4 py-2 border">Total</th>
            </tr>
            {product.map((item, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border">{item.name}</td>
                <td className="px-4 py-2 border">{item.quantity}</td>
                <td className="px-4 py-2 border">{item.price_sale_formater}</td>
                <td className="px-4 py-2 border">
                  {parseInt(item.quantity) * parseInt(item.price_sale)}
                </td>
              </tr>
            ))}

            {bundle.map((item, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border">{item.name}</td>
                <td className="px-4 py-2 border">{item.quantity}</td>
                <td className="px-4 py-2 border">{item.price_bundle}</td>
                <td className="px-4 py-2 border">
                  {" "}
                  {parseInt(item.quantity) * parseInt(item.price_bundle)}
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan="3" className="px-4 py-2 font-bold text-black border">
                Total
              </td>

              {order.map((item, index) => (
                <td className="px-4 py-2 font-bold border">
                  {item.total_price}
                </td>
              ))}
            </tr>

            <tr>
              <td colSpan="2" className="px-4 py-2 font-bold text-black border">
                Rekening 1
              </td>
              <td colSpan="2" className="px-4 py-2 border">
                  {rekening1 !== null && rekening1 !== 0 && <p>{rekening1}</p>}
                  {rekening2 !== null && rekening2 !== 0 && <p>{rekening2}</p>}
                  {rekening3 !== null && rekening3 !== 0 && <p>{rekening3}</p>}
                  {rekening4 !== null && rekening4 !== 0 && <p>{rekening4}</p>}
                  {rekening5 !== null && rekening5 !== 0 && <p>{rekening5}</p>}
              </td>
            </tr>
          </table>
          <div className="md:hidden lg:hidden">
            <hr />
            {order.map((item, index) => (
              <div key={index} className="grid grid-cols-2">
                <div className="py-1 font-semibold text-start">Nama</div>
                <div className="py-1 text-end">
                  {item.penerima.name}
                  <span className="text-primary">(Kode Member)</span>
                </div>

                <div className="py-1 font-semibold text-start">Alamat</div>
                <div className="py-1 text-end">{item.detail_alamat}</div>

                <div className="py-1 font-semibold text-start">No Telp.</div>
                <div className="py-1 text-end">{item.no_wa}</div>
              </div>
            ))}
            <br />
            <hr />
            <div className="grid grid-cols-1">
              <div className="font-semibold">Detail Transaksi</div>
            </div>
            <hr />
            <div className="grid grid-cols-3 py-1 text-sm">
              <div className="py-1 font-semibold text-start">Nama Produk</div>
              <div className="py-1 font-semibold text-end">
                Qty|Harga Produk
              </div>
              <div className="py-1 font-semibold text-end">Harga Total</div>

              {product.map((item, index) => (
                <div key={index}>
                  <div className="py-1 text-start">{item.name}</div>
                  <div className="py-1 text-end">
                    {" "}
                    {`${item.quantity} | ${item.price_sale_formater}`}
                  </div>
                  <div className="py-1 text-end">
                    {item.price_sale_formater}
                  </div>
                </div>
              ))}

              {bundle.map((item, index) => (
                <div key={index}>
                  <div className="py-1 text-start">{item.name}</div>
                  <div className="py-1 text-end">
                    {" "}
                    {`${item.quantity} | ${item.price_sale_formater}`}
                  </div>
                  <div className="py-1 text-end">
                    {item.price_sale_formater}
                  </div>
                </div>
              ))}
            </div>
            <hr />
            {order.map((item, index) => (
              <div key={index} className="grid grid-cols-3 py-1">
                <div className="grid col-span-2 font-semibold text-start">
                  {" "}
                  Total
                </div>
                <div className="font-semibold text-end">
                  {" "}
                  {item.total_price}
                </div>
              </div>
            ))}
            <div className="grid grid-cols-3 py-1">
              <div className="grid col-span-1 font-semibold text-start">
                Rekening
              </div>
              <div className="col-span-2 font-semibold text-end">
                <p>{rekening1}</p>
                <p>{rekening2}</p>
                <p>{rekening3}</p>
                <p>{rekening4}</p>
                <p>{rekening5}</p>
              </div>
            </div>
          </div>
        </div>
        {/* Render the watermark elements */}
        {watermarkElements}
      </div>

      {/* Download Image button */}
      <button
        className="p-2 my-2 text-white bg-yellow-400 rounded shadow"
        onClick={generateImage}
      >
        Download Invoice
      </button>
      <br />
      <Link to="/pesanan-baru-member">
        <button className="p-2 my-2 bg-white rounded shadow text-primary">
          Oke (*Back ke Halaman Order Member)
        </button>
      </Link>
    </div>
  );
};

export default Invoice2;
