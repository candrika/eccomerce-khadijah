import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import windowButton from "../../assets/window.png";
import burger from "../../assets/menu.png";
import product from "../../assets/produk1.jpeg";
import inStock from "../../assets/in-stock.png";
import Paragraph from "../reusableComponents/Paragraph";
import { Link, useNavigate } from "react-router-dom";
import Bundle from "./Bundle";
import { GlobalContext } from "../../context/GlobalContext";
import soldout from "../../assets/out-of-stock.png";
import Button from "../reusableComponents/Button";
import Swal from "sweetalert2";
import { Coba6 } from "../reusableComponents/Text";

const Product2 = () => {
  const { setCart } = useContext(GlobalContext);
  const [list, setList] = useState(false);
  const [loading, setLoading] = useState(false);
  const [productList, setProdukList] = useState([]);
  const navigate = useNavigate();
  const [input, setInput] = useState(1);

  // handle search produk
  const [searchQueryProduk, setSearchQueryProduk] = useState("");
  const [searchResultsProduk, setSearchResultsProduk] = useState([]);
  const [addProduk, setAddProduk] = useState([]);
  const [isAddProduk, setIsAddProduk] = useState(false);

  const handleSearchChangeProduk = (event) => {
    const query = event.target.value;
    setSearchQueryProduk(query);
    // fetchProdukSearch(query);
    setIsAddProduk(false);
  };
  const fetchProdukSearch = async () => {
    try {
      const response = await axios.get(
        `https://laravel-api-10.cerise.id/api/products?search=${searchQueryProduk}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log("respon produk", response.data.success);
      const data = response.data.success;

      //   console.log("hasil search produk", response.data.success);
      // setSearchResultsProduk(data.splice(0, 3)); // Assuming the API returns an array of products
      setProdukList(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const handleFilterClick = async () => {
    const result = await Swal.fire({
      title: "Apakah Anda Yakin?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "OK",
    });

    if (result.isConfirmed) {
      fetchProdukSearch();
    }
  };

  const fetchProduk = async () => {
    try {
      const response = await axios.get(
        "https://laravel-api-10.cerise.id/api/products"
      );

      const data = response.data.success;
      setProdukList(data);

      // console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log("produk list", productList);

  const handleAddToCart = async (id) => {
    const result = await Swal.fire({
      title: "Apakah anda ingin menyimpan di keranjang?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
    });

    if (result.isConfirmed) {
      try {
        setLoading(true);
        const response = await axios.post(
          "https://laravel-api-10.cerise.id/api/carts/add-to-cart",
          {
            quantity: input,
            product_id: id,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setLoading(false);
        Swal.fire({
          title: "Berhasil order",
          icon: "success",
        }).then(() => {
          window.location.reload();
          navigate("/product");
        });
      } catch (error) {
        setLoading(false);
        if (error.response && error.response.status === 401) {
          navigate("/login");
        }
        console.log("error", error.response ? error.response.status : error);
        console.error("error", error);
      }
    }
  };

  useEffect(() => {
    fetchProduk();
  }, []);

  // console.log("query prodyk", searchQueryProduk);
  // console.log("final search produk", setProdukList);

  console.log("produkss list", productList);

  return (
    <div className="mt-4">
      <div className=" w-[90%] relative left-[5%] border-b border-gray-400 mb-4 p-4">
        <div className="relative flex justify-between w-[100%]">
          <div className="relative hidden md:flex justify-between w-[25%] md:w-[7%]">
            {/* {`${navbar ? "left-[0]" : "left-[-200px]"}`} */}
            <button
              onClick={() => setList(false)}
              className={`${
                list
                  ? " bg-gray-300 w-[35px] h-[35px] relative flex justify-center items-center"
                  : "bg-primary w-[35px] h-[35px] relative flex justify-center items-center"
              }`}
            >
              <img src={windowButton} className="  w-[15px]" alt="" />
            </button>
            <button
              onClick={() => setList(true)}
              className={`${
                list
                  ? "bg-primary   w-[35px] h-[35px] relative flex justify-center items-center"
                  : "  bg-gray-300 w-[35px] h-[35px] relative flex justify-center items-center"
              }`}
            >
              <img src={burger} className="  w-[15px]" alt="" />
            </button>
          </div>
          <div className=" w-[100%]  md:w-[50%] lg:w-[30%] ms:relative md:flex md:justify-between">
            <input
              type="text"
              value={searchQueryProduk}
              onChange={handleSearchChangeProduk}
              className="h-[35px] border border-gray-400 w-[100%] md:w-auto px-3 rounded-full"
              placeholder="Cari products"
            />
            <div className="hidden  md:relative md:flex md:justify-between md:w-[150px] ">
              <button
                onClick={handleFilterClick}
                className="h-[35px] bg-primary  rounded-full w-[100%] text-white"
              >
                Filter
              </button>
            </div>
          </div>
        </div>
        <div className="md:hidden relative flex justify-between w-[100%] my-4">
          <button
            onClick={handleFilterClick}
            className="h-[40px] bg-primary rounded-full w-[100%] text-white"
          >
            Filter
          </button>
        </div>

        {list ? (
          <div className=" relative  w-[100%] my-4">
            {productList.map((item, index) => (
              <div
                key={index}
                className="relative flex justify-between w-[100%] border border-gray-100 rounded-lg shadow-lg bg-white py-4 my-2"
              >
                <div className=" w-[35%] relative flex justify-start items-start">
                  {item.galleries.map(
                    (item, index) =>
                      index === 0 && (
                        <img
                          key={index} // Make sure to add a unique key for each element in the array
                          src={item.url}
                          alt={item.url}
                          className=" w-[100%] p-2 "
                        />
                      )
                  )}
                </div>
                <div className="  w-[65%] text-left">
                  <Paragraph text={item.name} variant="paragraph6" />

                  <div
                    dangerouslySetInnerHTML={{
                      __html: item.product_detail.slice(0, 100),
                    }}
                  />
                  <div className=" lg:w-[12%] relative flex w-[15%] justify-between py-3">
                    {item.stock == 0 ? (
                      <div>
                        <img src={soldout} alt="" className="w-[40px]" />
                      </div>
                    ) : (
                      <div>
                        <img src={inStock} alt="" className="w-[25px] " />
                      </div>
                    )}
                  </div>
                  <Coba6 text={`${item.sum_quantity} terjual`} />

                  <div className="flex">
                    <Paragraph text="Diskon Ongkir : " variant="paragraph4" />
                    {item.jenis_discount_ongkir == "rupiah" ? (
                      <Paragraph
                        text={`Rp ${item.discount_ongkir_formater}`}
                        variant="paragraph8"
                      />
                    ) : (
                      <Paragraph
                        text={` ${item.discount_ongkir_formater} %`}
                        variant="paragraph8"
                      />
                    )}
                  </div>
                  <div className="flex">
                    <Paragraph text="Diskon Harga : " variant="paragraph4" />
                    {item.jenis_discount_harga == "rupiah" ? (
                      <Paragraph
                        text={`Rp ${item.discount_harga_formater}`}
                        variant="paragraph8"
                      />
                    ) : (
                      <Paragraph
                        text={` ${item.discount_harga_formater} %`}
                        variant="paragraph8"
                      />
                    )}
                  </div>
                  <p className="text-green-500 ">{`Rp ${item.price_sale_formater}`}</p>

                  <div>
                    {item.stock <= 0 ? (
                      ""
                    ) : (
                      <button
                        onClick={() => handleAddToCart(item.id)}
                        className="bg-primary text-white rounded-lg p-3 w-[200px] mt-4"
                      >
                        Tambah ke Keranjang
                      </button>
                    )}
                  </div>
                  <Link to={`/detail-product/${item.id}`}>
                    <button className="bg-primary text-white rounded-lg p-3 w-[200px] mt-4">
                      Detail
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className=" relative grid gap-2 grid-cols-1 md:grid-cols-3 lg:grid-cols-4  w-[100%] my-4 ">
            {productList.map((item, index) => (
              // <div>{item.name}</div>
              <div
                key={index}
                className="p-2 border border-gray-100 shadow-lg w-[100%] h-[100%] relative   items-center justify-between bg-white rounded-md"
              >
                <div className="flex justify-center">
                  {item.galleries.map(
                    (item, index) =>
                      index === 0 && (
                        <img
                          key={index} // Make sure to add a unique key for each element in the array
                          src={item.url}
                          alt={item.url}
                          className="w-[60%] "
                        />
                      )
                  )}
                </div>

                <div className="w-[100%] h-[100%]  text-left px-2 ">
                  <Paragraph text={item.name} variant="paragraph7" />
                  <div
                    dangerouslySetInnerHTML={{
                      __html: item.product_detail.slice(0, 100),
                    }}
                  />

                  <div className=" lg:w-[12%] relative flex w-[15%] justify-between py-3">
                    {item.stock == 0 ? (
                      <div>
                        <img src={soldout} alt="" className="w-[25px]" />
                      </div>
                    ) : (
                      <div className="flex">
                        <img src={inStock} alt="" className="w-[25px] " />
                        <div className="ml-2">
                          <Paragraph text={item.stock} variant="paragraph6" />
                        </div>
                      </div>
                    )}
                  </div>
                  <Coba6 text={`${item.sum_quantity} terjual`} />
                  <div className="flex">
                    <Paragraph text="Disc Ongkir : " variant="paragraph4" />
                    {item.jenis_discount_ongkir == "rupiah" ? (
                      <Paragraph
                        text={`Rp ${item.discount_ongkir_formater}`}
                        variant="paragraph8_1"
                      />
                    ) : (
                      <Paragraph
                        text={` ${item.discount_ongkir_formater} %`}
                        variant="paragraph8_1"
                      />
                    )}
                  </div>
                  <div className="flex">
                    <Paragraph text="Disc Harga : " variant="paragraph4" />
                    {item.jenis_discount_harga == "rupiah" ? (
                      <Paragraph
                        text={`Rp ${item.discount_harga_formater}`}
                        variant="paragraph8_1"
                      />
                    ) : (
                      <Paragraph
                        text={` ${item.discount_harga_formater} %`}
                        variant="paragraph8_1"
                      />
                    )}
                  </div>
                  <p className="text-primary ">{`Rp ${item.price_sale_formater}`}</p>
                  <div
                    className="mt-2"
                    onClick={
                      item.stock > 0
                        ? () => handleAddToCart(item.id)
                        : undefined
                    }
                  >
                    <Button text="Tambah ke Keranjang" variant="button-2" />
                  </div>

                  <Link to={`/detail-product/${item.id}`}>
                    <div className="mt-2">
                      <Button text="Detail" variant="button-2" />
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Bundle />
    </div>
  );
};

export default Product2;
