import React, { useRef } from "react";
import html2canvas from "html2canvas";
import logo from "../../assets/logo.png";

const Receipt = () => {
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

  const watermarkElements = watermarkPositions.map((position, index) => (
    <div
      key={index}
      className="watermark absolute pointer-events-none opacity-30"
      style={{ top: position.top, left: position.left, zIndex: -1 + index }}
    >
      <div className="w-full h-full absolute top-0 left-0 transform -rotate-45 mt-16 -ml-2 md:mt-20 md:-ml-2">
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
        className="invoice bg-white shadow-lg w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto p-6 relative mt-5 rounded-md"
        ref={invoiceRef}
      >
        <div className="header text-center mb-6">
          <h1 className="text-3xl font-bold">RECEIPT</h1>
          <p className="text-sm">Receipt Number: INV-12345</p>
          <p className="text-sm">Date: July 26, 2023</p>
        </div>
        <div className="content mb-10 grid place-content-center">
          <table className="w-full hidden md:block lg:block">
            <tr>
              <th className="px-4 py-2 border">Description</th>
              <th className="px-4 py-2 border">Quantity</th>
              <th className="px-4 py-2 border">Unit Price</th>
              <th className="px-4 py-2 border">Total</th>
            </tr>
            <tr>
              <td className="px-4 py-2 border">Product A</td>
              <td className="px-4 py-2 border">2</td>
              <td className="px-4 py-2 border">IDR 50.00</td>
              <td className="px-4 py-2 border">IDR 100.00</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border">Product B</td>
              <td className="px-4 py-2 border">1</td>
              <td className="px-4 py-2 border">IDR 75.00</td>
              <td className="px-4 py-2 border">IDR 23.00</td>
            </tr>
            <tr>
              <td colSpan="3" className="px-4 py-2 border text-black font-bold">
                Total
              </td>
              <td className="px-4 py-2 border font-bold"> IDR 50.000</td>
            </tr>
          </table>
          <div className="md:hidden lg:hidden">
            <hr />
            <div className="grid grid-cols-2">
              <div className="text-start font-semibold py-1">Nama</div>
              <div className="text-end py-1">
                Ayu Widya Inggit Gemoiiii{" "}
                <span className="text-primary">(Kode Member)</span>
              </div>

              <div className="text-start font-semibold py-1">Alamat</div>
              <div className="text-end py-1">Bantul Palbapang</div>

              <div className="text-start font-semibold py-1">No Telp.</div>
              <div className="text-end py-1">+62838219893</div>
            </div>
            <br />
            <hr />

            <div className="grid grid-cols-1">
              <div className="font-semibold">Detail Transaksi</div>
            </div>

            <hr />

            <div className="grid grid-cols-3 py-1 text-sm">
              <div className="text-start font-semibold py-1">Nama Produk</div>
              <div className="text-end font-semibold py-1">
                Qty|Harga Produk
              </div>
              <div className="text-end font-semibold py-1">Harga Total</div>

              <div className="text-start  py-1">Barang A</div>
              <div className="text-end  py-1">2@IDR 2.000</div>
              <div className="text-end  py-1">IDR 100.0000</div>

              <div className="text-start  py-1">Barang B</div>
              <div className="text-end  py-1">2@IDR 2.000</div>
              <div className="text-end  py-1">IDR 100.0000</div>
            </div>

            <div className="grid grid-cols-3 py-1">
              <div className="grid col-span-2 text-start font-semibold">
                {" "}
                Total
              </div>
              <div className="text-end font-semibold"> IDR 100.0000</div>
            </div>

            <hr />

            <div className="grid grid-cols-3 py-1">
              <div className="grid col-span-2 text-start font-semibold">
                PEMBAYARAN
              </div>
              <div className="text-end font-semibold text-warning"> LUNAS</div>
            </div>
          </div>
        </div>
        {/* Render the watermark elements */}
        {watermarkElements}
      </div>

      {/* Download Image button */}
      <button
        className="p-2 rounded shadow text-white bg-yellow-400 my-2"
        onClick={generateImage}
      >
        Download Receipt
      </button>
      <br />
      <button className="my-2 p-2 rounded shadow text-primary bg-white">
        Oke (*Back ke Halaman Order Member)
      </button>
    </div>
  );
};

export default Receipt;
