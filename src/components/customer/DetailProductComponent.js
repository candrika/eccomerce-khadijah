import React, { useState, useEffect } from "react";
import stock from "../../assets/ready-stock.png";
import discount from "../../assets/discount.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Coba10, Coba13, Coba7 } from "../reusableComponents/Text";
import Swal from "sweetalert2";

const DetailProductComponent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduk] = useState([]);
  const [category, setCategory] = useState();
  const [relatedProduct, setRelatedProduk] = useState([]);
  const [imageSelected, setImageSelected] = useState(0);
  const [discOngkir, setDiscOngkir] = useState(0);
  const [discHarga, setDiscHarga] = useState(0);
  const [priceSale, setPriceSale] = useState(0);
  const [input, setInput] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const fetchProduk = async () => {
    try {
      const response = await axios.get(
        `https://laravel-api-10.cerise.id/api/products/show/${id}`
      );

      const data = response.data.success;
      setProduk([data]);
      const PriceSale = parseFloat(response.data.success.price_sale);
      const JenisDiscOngkir = response.data.success.jenis_discount_ongkir;
      const JenisDiscHarga = response.data.success.jenis_discount_harga;
      const DiscHarga = parseFloat(response.data.success.discount_harga);
      const DiscOngkir = parseFloat(response.data.success.discount_ongkir);
      const TotalDiscHarga =
        parseFloat(response.data.success.discount_harga) *
        (parseFloat(response.data.success.price_sale) / 100);
      const TotalDiscOngkir =
        parseFloat(response.data.success.discount_ongkir) *
        (parseFloat(response.data.success.price_sale) / 100);

      fetchRelatedProduct(response.data.success.category.name);

      setPriceSale(PriceSale);

      if (response.data.success.discount_ongkir == null) {
        setDiscOngkir(0);
      } else {
        if (JenisDiscOngkir == "rupiah") {
          setDiscOngkir(DiscOngkir);
        } else {
          setDiscOngkir(TotalDiscOngkir);
        }
      }

      if (response.data.success.discount_harga == null) {
        setDiscHarga(0);
      } else {
        if (JenisDiscHarga == "rupiah") {
          setDiscHarga(DiscHarga);
        } else {
          setDiscHarga(TotalDiscHarga);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSelectImage = (status) => {
    setImageSelected(status);
  };
  useEffect(() => {
    fetchProduk();
  }, []);

  const fetchRelatedProduct = async (categoryName) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://laravel-api-10.cerise.id/api/categories/${categoryName}/products`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setRelatedProduk(response.data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchRelatedProduct();
  }, []);

  console.log("nyoba aja ", category);

  const handleAddToCart = async () => {
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
        text: "Berhasil Memasukan ke Keranjang",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/");
      });
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.status === 401) {
        navigate("/login");
      }
      console.log("error", error.response ? error.response.status : error);
      console.error("error", error);
    }
  };

  const discountedPrice = priceSale - discHarga - discOngkir;
  const formattedDiscountedPrice = discountedPrice.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });

  return (
    <div>
      {product.map((product, index) => (
        <div className=" relative md:flex md:justify-between">
          <div className=" w-[100%] relative mt-[30px]">
            <div className=" w-[90%] text-left relative left-[5%]">
              <p className="font-bold">{product.name}</p>
            </div>

            <div className=" cursor-pointer w-[90%] text-left flex relative left-[5%]">
              <Link to="/">
                <div>
                  <Coba7 text="Home " />
                </div>
              </Link>
              <div className="mr-2 ml-2">
                <Coba7 text="/" />
              </div>

              <Link to={`/product-by-category/${product.category.name}`}>
                <div className="">
                  <Coba7 text={product.category.name} />
                </div>
              </Link>
              <div className="mr-2 ml-2">
                <Coba7 text="/" />
              </div>

              <div className="">
                <Coba7 text={product.name} />
              </div>
            </div>

            <div className="border border-gray-300 w-[90%] py-4 px-4 relative left-[5%] rounded-lg shadow-lg mt-[20px] flex justify-center">
              {product.galleries.map(
                (item, index) =>
                  index === imageSelected && (
                    <img
                      key={index}
                      src={item.url}
                      alt={item.url}
                      className=" max-w-[350px] h-[350px] object-cover rounded-md"
                    />
                  )
              )}
            </div>
            <div className="  w-[90%] relative left-[5%] grid grid-cols-4 md:grid gap-4 place-items-center justify-between mt-3">
              {product.galleries.map((item, index) => (
                <div
                  className="border border-gray-300 rounded-lg bg-white shadow-lg "
                  onClick={() => handleSelectImage(index)}
                >
                  <img
                    src={item.url}
                    alt={item.url}
                    className=" w-[90px] h-[90px] rounded-md"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className=" w-[100%] relative mt-[30px] text-left ">
            <div className=" w-[90%] text-left relative left-[5%]">
              {discOngkir == 0 ? (
                ""
              ) : (
                <div className="flex">
                  <p className="relative  text-red-500 font-bold text-left ">
                    Diskon Ongkir :
                  </p>

                  {product.jenis_discount_ongkir == "rupiah" ? (
                    <p className="relative  text-red-500 font-bold text-left line-through ml-4">
                      {` Rp ${product.discount_ongkir_formater}`}
                    </p>
                  ) : (
                    <p className="relative  text-red-500 font-bold text-left line-through ml-4">
                      {`  ${product.discount_ongkir_formater} %`}
                    </p>
                  )}
                </div>
              )}

              {discHarga == 0 && discOngkir == 0 ? (
                ""
              ) : (
                <p className="relative  text-red-500 line-through font-bold text-left text-[30px]">
                  : Rp {product.price_sale_formater}
                </p>
              )}

              <div className="flex text-2xl font-semibold">
                <p> {formattedDiscountedPrice}</p>
              </div>

              {/*<p className="relative  text-[#00B7FE] font-bold text-left text-[30px]">*/}
              {/*  Rp {priceSale - discHarga - discOngkir}*/}
              {/*</p>*/}
              <div className=" w-[30%] md:w-[30%] lg:w-[40%] relative flex justify-between ">
                <div className="relative flex justify-between">
                  <img src={stock} alt="" className="w-[20px] h-[20px]" />
                  <p>{product.stock}</p>
                </div>
                {discHarga == 0 ? (
                  ""
                ) : (
                  <div className=" relative flex justify-between  w-[250px] ml-4">
                    <img
                      src={discount}
                      alt=""
                      className="w-[20px] h-[20px] ml-[120px]"
                    />
                    {product.jenis_discount_harga == "rupiah" ? (
                      <p className="relative  text-red-500 font-bold text-left line-through ml-4">
                        {` Rp ${product.discount_harga_formater}`}
                      </p>
                    ) : (
                      <p className="relative  text-red-500 font-bold text-left line-through ml-4">
                        {`  ${product.discount_harga_formater} %`}
                      </p>
                    )}
                  </div>
                )}
              </div>
              {/* <div className=" mb-8">
                <p>Deskripsi</p>
                <p>{product.product_detail}</p>
              </div> */}

              <div className=" w-[100%] md:w-[100%]  relative flex justify-between">
                <div className=" relative flex justify-between w-[65%] md:w-[55%] lg:w-[50%]">
                  <input
                    type="number"
                    placeholder="input order"
                    className="border border-grey-400 text-[#00B7FE] w-[100px] lg:w-[200px] h-[40px] pl-3 rounded-md "
                    value={input}
                    name="quantity"
                    onChange={handleChange}
                  />
                  {/* <select
                    name=""
                    id=""
                    className="border border-grey-400 text-[#00B7FE] w-[100px] h-[40px] px-3 rounded-md "
                  >
                    <option value="tablet">Tablet</option>
                    <option value="tablet">Kapsul</option>
                    <option value="tablet">Botol</option>
                  </select> */}
                </div>
                <div className="relative flex justify-end w-[35%] md:w-[30%] hidden md:block lg:block">
                  <button
                    onClick={handleAddToCart}
                    className="border border-white text-[10px]  rounded-lg bg-primary hover:text-[#00B7FE] text-white w-[100px] hover:bg-white h-[40px]"
                  >
                    Tambah ke Keranjang
                  </button>
                </div>
              </div>
              <div className="lg:hidden md:hidden">
                <div className=" relative flex justify-end w-full">
                  <button
                    onClick={handleAddToCart}
                    className="border border-white text-[14px] my-5 rounded-lg bg-primary hover:text-[#00B7FE] text-white w-full hover:bg-white h-[40px]"
                  >
                    Tambah ke Keranjang
                  </button>
                </div>
              </div>
              <div className=" w-[100%] py-5">
                <p className="py-4">Category : {product.category.name}</p>
                {/* <div className=" relative  grid grid-cols-3 md:gris gap-1 place-items-left">
                  <button className="bg-primary rounded-full px-5 py-1 text-white text-sm">
                    Obat 1
                  </button>
                  <button className="bg-primary rounded-full px-5 py-1 text-white  text-sm">
                    Obat 2
                  </button>
                  <button className="bg-primary rounded-full px-5 py-1 text-white  text-sm">
                    Obat 2
                  </button>
                </div> */}
                <div className=" mb-8">
                  <p>Deskripsi : </p>
                  {/*<p>{product.product_detail}</p>*/}
                  <div
                    dangerouslySetInnerHTML={{ __html: product.product_detail }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="border-t border-gray-300 w-[90%] relative left-[5%] mt-10 ">
        <div className=" mt-5 flex ">
          <p className="text-primary text-xl">
            Relate <span className="font-bold text-2xl">Produk</span>
          </p>
        </div>
        {relatedProduct.map((item, index) => (
          <Link key={index} to={`/detail-product/${item.id}`}>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-2  mt-4">
              <div className="border border-gray-300 md:col-span-3  grid grid-cols-3 p-2 rounded-lg">
                <div className="col-span-1 flex justify-center">
                  {item.galleries.map(
                    (item, index) =>
                      index === 0 && (
                        <img src={item.url} alt="" className="w-[80px]" />
                      )
                  )}
                </div>
                <div className="col-span-2 text-left px-2">
                  <Coba10 text={item.name} />
                  <Coba13 text={item.price_sale_formater} />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DetailProductComponent;
