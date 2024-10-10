import React, { useContext, useEffect, useState } from "react";
import { InputSearch } from "../../components/reusableComponents/Input";
import settings from "../../assets/settings.png";
import edit from "../../assets/edit.png";
import deleted from "../../assets/delete.png";
import chevron from "../../assets_admin/down.png";
import login from "../../assets/login.png";
import axios from "axios";
import Swal from "sweetalert2";

import {
  Coba10,
  Coba11,
  Coba12,
  Coba13,
  Coba5,
} from "../../components/reusableComponents/Text";
import {
  BtnAdmin5,
  BtnAdmin9,
} from "../../components/reusableComponents/ButtonAdmin";
import { Link } from "react-router-dom";
import { BtnAdmin3 } from "../../components/reusableComponents/ButtonAdmin";
import { GlobalContext } from "../../context/GlobalContext";

const Produk = () => {
  const { fetchProduct, product } = useContext(GlobalContext);
  const Swal = require("sweetalert2");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, []);

  // Start Show More || Show Less
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };
  // End Show More || Show Less

  const onDelete = async (id) => {
    const confirmationResult = await Swal.fire({
      title: "Apakah anda menghapus produk?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
    });
    if (confirmationResult.isConfirmed) {
      try {
        const response = await axios.delete(
          `https://laravel-api-10.cerise.id/api/products/delete/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        Swal.fire({
          title: "Success!",
          text: "Data produk berhasil dihapus",
          confirmButtonColor: "#3085d6",
          icon: "success",
          confirmButtonText: "OK",
        });
        fetchProduct();
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: error,
          cancelButtonColor: "#d33",
          icon: "warning",
          confirmButtonText: "OK",
        });
      }
    }
  };

  // console.log("produkd", product);
  return (
    <div className=" relative">
      <div className=" w-[90%] left-[5%] md:left-0 md:w-[98%]  mt-[40px]  mb-8 relative grid grid-cols-1 md:grid-cols-2 gap-2">
        <div className="w-[100%] mb-4 sm:mb-0">
          <InputSearch text="Pencarian" />
        </div>
        <div className=" flex justify-start md:justify-end">
          <Link to="/admin/produk/AddDataProduk">
            <BtnAdmin3 text="Tambah Produk" />
          </Link>
        </div>
      </div>

      <div className=" relative w-[90%] left-[5%] md:left-0 md:w-[98%]  bg-blue rounded-lg hidden md:grid  md:grid-cols-12 gap-2 my-2 h-[50px] p-2">
        <div className=" col-span-1 text-left ">
          <input type="checkbox" />
        </div>
        <div className=" col-span-2 text-left">
          <p>Produk & Harga </p>
        </div>
        <div className="col-span-2 text-left flex ">
          <p>Stok</p>
          <button onClick={() => setOpen(!open)}>
            <img src={chevron} alt="" className="w-[20px]" />
          </button>
        </div>
        <div className="col-span-1 text-left">
          <p>Kategori</p>
        </div>
        <div className="col-span-2 text-left">
          <p>Keterangan</p>
        </div>
        <div className="col-span-1 text-left">
          <p>Berat</p>
        </div>

        <div className="col-span-2 text-left">
          <p>QTY Grosir</p>
        </div>
        <div className="col-span-1 text-left">
          <img src={settings} alt="" className="w-[20px]" />
        </div>
      </div>

      {/* looping data produk */}
      {product.map((product, index) => (
        <div
          key={index}
          className=" w-[90%] md:w-[98%] left-[5%] md:left-0 bg-white hover:shadow-lg rounded-lg p-2 my-4 h-auto "
        >
          <div className=" pb-3">
            <div className=" grid grid-cols-1 md:grid-cols-12 gap-2 justify-between items-start my-2  h-auto ">
              <div className="col-span-1 text-left pl-4 pt-2  flex items-start">
                <input type="checkbox" />
              </div>
              <div className="col-span-2   text-left flex ">
                <div className="w-[50%] mr-2 ">
                  {product.galleries.map(
                    (item, index) =>
                      index === 0 && (
                        <img src={item.url} alt="" className="w-[150px]" />
                      )
                  )}
                </div>
              </div>
              <div className="col-span-2  text-left">
                <Coba13 text={`${product.stock} in stock `} />
              </div>

              <div className="col-span-1  text-left">
                <Coba10 text={product.category.name} />
              </div>
              <div className="col-span-2  text-left">
                {/*Show More || Show Less Detail*/}
                {/*<Coba10 text={product.product_detail} />*/}
                <div>
                  {/* Render the content with limited height */}
                  <div
                    className={`${
                      expanded ? "max-h-none" : "max-h-48 overflow-hidden"
                    } product-detail`}
                    dangerouslySetInnerHTML={{ __html: product.product_detail }}
                  />
                  {/* Button to toggle expansion */}
                  <button
                    onClick={toggleExpand}
                    className="text-blue-500 hover:underline cursor-pointer"
                  >
                    {expanded ? "Show Less" : "Show More"}
                  </button>
                </div>
              </div>
              {/*End Show More Show Less Detail*/}
              <div className="col-span-1 text-left">
                <Coba10 text={`${product.berat}gram`} />
              </div>

              <div className="col-span-2  text-left">
                <div className="flex">
                  <Coba5 text="Min Grosir:" />
                  <Coba5
                    text={`${product.min_grosir} ${product.item_unit.name}`}
                  />
                </div>
                <div className="flex">
                  <Coba5 text="Max Grosir:" />
                  <Coba5
                    text={`${product.max_grosir} ${product.item_unit.name}`}
                  />
                </div>
              </div>

              <div className="col-span-1  text-left flex justify-between">
                <Link to={`/admin/produk/detail-produk/${product.id}`}>
                  <img src={edit} alt="" className="w-[20px]" />
                </Link>

                <img
                  src={deleted}
                  alt=""
                  className="w-[20px]"
                  onClick={() => onDelete(product.id)}
                />
              </div>
            </div>
          </div>
          <div
            className={` mb-4  pb-3 transition-opacity duration-5000 ${
              open ? "" : "opacity-0 invisible"
            }`}
          >
            <div className=" grid grid-cols-1 md:grid-cols-12 gap-2 justify-between items-start my-2  h-auto ">
              <div className="col-span-3 ">
                <Coba12 text={product.name} />
                <Coba12 text={product.id} />
                <Coba5 text="Harga Jual:" />
                <Coba10 text={product.price_sale} />
                <Coba5 text="Harga Reseller:" />
                <Coba10 text={product.price_reseller} />
                <Coba5 text="Harga Grosir:" />
                <Coba10 text={product.price_grosir} />
              </div>
              <div className="col-span-9 ">
                <div className="border-2 border-gray-200  rounded-xl relative ">
                  <div className=" flex justify-between px-8 text-left py-4">
                    <div className="w-[40%]">
                      {/*<Coba11 text="Variance" />*/}
                    </div>
                    <div className="w-[30%]">
                      <Coba11 text="Stock" />
                    </div>
                    <div className="w-[30%]">
                      <Coba11 text="Harga Jual" />
                    </div>
                  </div>
                  <div className="flex justify-between px-8 text-left py-4">
                    <div className="w-[40%] "></div>
                    <div className="w-[30%]">
                      <Coba13 text={product.stock} />
                    </div>
                    <div className="w-[30%]">
                      <Coba10 text={product.price_sale} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`border-t border-gray-400 p-4 mt-2 grid grid-cols-1 md:grid-cols-12 gap-2 transition-all duration-5000 ease-in-out transform ${
              open ? "mt-0" : "-mt-[15rem]"
            }`}
          >
            <div className="col-span-1">
              <BtnAdmin5 text={product.warehouse.alamat} />
            </div>
            <div className="col-span-2 ">
              {product.discount_harga == null ? (
                <div></div>
              ) : (
                <div>
                  {product.jenis_discount_harga == "rupiah" ? (
                    <BtnAdmin9
                      text={`Diskon Harga : Rp ${product.discount_harga}`}
                    />
                  ) : (
                    <BtnAdmin9
                      text={`Diskon Harga : ${product.discount_harga} %`}
                    />
                  )}
                </div>
              )}
            </div>
            <div className="col-span-2">
              {product.discount_harga == null ? (
                <div></div>
              ) : (
                <div>
                  {product.jenis_discount_ongkir == "rupiah" ? (
                    <BtnAdmin9
                      text={`Dics Ongkir : Rp ${product.discount_ongkir}`}
                    />
                  ) : (
                    <BtnAdmin9
                      text={`Dics Ongkir : ${product.discount_ongkir} %`}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Produk;
