import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import windowButton from "../../assets/window.png";
import burger from "../../assets/menu.png";
import product from "../../assets/produk1.jpeg";
import inStock from "../../assets/in-stock.png";
import Paragraph from "../reusableComponents/Paragraph";
import { Link, useNavigate, useParams } from "react-router-dom";
import Bundle from "./Bundle";
import { GlobalContext } from "../../context/GlobalContext";
import soldout from "../../assets/out-of-stock.png";
import Button from "../reusableComponents/Button";
import { Coba7 } from "../reusableComponents/Text";

const ProdukByCategory = () => {
  const { id } = useParams();
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

      // console.log("hasil search produk", response.data.success);
      // setSearchResultsProduk(data.splice(0, 3)); // Assuming the API returns an array of products
      setProdukList(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const handleFilterClick = () => {
    alert("oke?");
    fetchProdukSearch();
  };

  const fetchProduk = async () => {
    try {
      const response = await axios.get(
        `https://laravel-api-10.cerise.id/api/categories/${id}/products`
      );

      const data = response.data.products;
      setProdukList(data);

      // console.log("data by category", response.data.products);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log("produk list", productList);

  const handleAddToCart = async (id) => {
    alert("Apakah anda ingin menyimpan order ?");
    try {
      setLoading(true);
      const response = await axios.post(
        "https://laravel-api-10.cerise.id/api/carts/add-to-cart",
        {
          // selected_option: 1,
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
      alert("berhasil order");
      window.location.reload();
      navigate("/product");
    } catch (error) {
      if (401 == error.request.status) {
        navigate("/login");
      }
      setLoading(false);
      console.log("error", error.request.status);
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchProduk();
  }, []);

  // console.log("query prodyk", searchQueryProduk);
  // console.log("final search produk", productList);

  return (
    <div className="mt-4">
      <div className=" w-[90%] relative left-[5%]  mb-4 p-4">
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
        <div className=" cursor-pointer text-left flex relative mt-2">
          <Link to="/">
            <div>
              <Coba7 text="Home " />
            </div>
          </Link>
          <div className="mr-2 ml-2">
            <Coba7 text="/" />
          </div>

          <Link to="/member-category">
            <div className="">
              <Coba7 text="Category " />
            </div>
          </Link>
          <div className="mr-2 ml-2">
            <Coba7 text="/" />
          </div>
          <Link to="/product">
            <div className="">
              <Coba7 text="List Produk " />
            </div>
          </Link>
        </div>

        {list ? (
          <div className=" relative  w-[100%] my-4">
            {productList.map((item, index) => (
              <div
                key={index}
                className="relative flex justify-between w-[100%] border border-gray-100 rounded-lg shadow-lg bg-white py-4 my-2"
              >
                {/* <div className=" w-[35%] relative flex justify-start items-center">
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
                </div> */}
                <div className="  w-[65%] text-left">
                  <Paragraph text={item.name} variant="paragraph6" />
                  {/*<Paragraph text={item.product_detail} variant="paragraph4" />*/}
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
                        <Paragraph text={item.stock} variant="paragraph6" />
                      </div>
                    )}
                  </div>
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
                  <p className="text-red-500 line-through ">{`Rp ${item.price_sale_formater}`}</p>
                  <p className="text-[#00B7FE] ">
                    ({item.price_sale_formater}+{item.discount_harga_formater} -
                    {item.discount_harga_formater})
                  </p>
                  <div>
                    {item.stock <= 0 ? (
                      ""
                    ) : (
                      <button
                        onClick={() => handleAddToCart(item.id)}
                        className="bg-primary text-white rounded-lg p-3 w-[200px] mt-4"
                      >
                        Add To Cart
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
                {/* <div className="flex justify-center">
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
                </div> */}

                <div className="w-[100%] h-[100%]  text-left px-2 ">
                  <Paragraph text={item.name} variant="paragraph7" />
                  {/*<Paragraph text={item.product_detail} variant="paragraph4" />*/}
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
                    <Button text="Add to cart" variant="button-2" />
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
    </div>
  );
};

export default ProdukByCategory;
