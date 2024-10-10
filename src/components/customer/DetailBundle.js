import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Coba10, Coba13, Coba15, Coba6 } from "../reusableComponents/Text";

const DetailBundle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduk] = useState([]);
  const [productDetail, setProdukDetail] = useState([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState(1);

  const fetchProduk = async () => {
    try {
      const response = await axios.get(
        `https://laravel-api-10.cerise.id/api/bundles/${id}`
      );

      const data = response.data.data;
      const data2 = response.data.data.products;
      setProduk([data]);
      setProdukDetail(data2);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log("produk", product);
  // console.log("detail", productDetail);

  useEffect(() => {
    fetchProduk();
  }, []);

  const handleAddToCart = async (id) => {
    alert("Apakah anda ingin menyimpan order ?");
    try {
      setLoading(true);

      const response = await axios.post(
        "https://laravel-api-10.cerise.id/api/carts/add-bundle-to-cart",
        {
          // selected_option: 1,
          quantity: input,
          bundle_id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setLoading(false);
      alert("berhasil order");
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

  return (
    <div>
      <div className=" relative w-[90%] left-[5%]">
        <Coba13 text="Detail Produk Bundle" />
        {product.map((item, index) => (
          <div className=" flex justify-between">
            <div className="w-[30%] ">
              <img src={item.url} alt={item.url} className="w-[350px]" />
            </div>
            <div className="w-[80%]  text-left pl-4">
              <div>
                <Coba10 text={item.name} />
                <Coba15 text={`Rp ${item.price_total}`} />
                <Coba10 text={`Rp ${item.price_bundle}`} />
              </div>
              <button
                onClick={() => handleAddToCart(item.id)}
                className="bg-primary text-white rounded-lg p-3 w-[200px] mt-4"
              >
                Add To Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className=" relative w-[90%] left-[5%] grid grid-cols-3 gap-2 mt-8">
        {productDetail.map((item, index) => (
          <div className="">
            <div className="bg-white p-2 rounded-md border text-left  ">
              <div>{`Produk name : ${item.name}`}</div>
              <div>{`SKU : ${item.SKU}`}</div>
              {item.jenis_discount_harga === "rupiah" ? (
                <div>{`Diskon Harga  : Rp ${item.discount_harga_formater}`}</div>
              ) : (
                <div>{`Diskon Harga : ${item.discount_harga_formater} %`}</div>
              )}

              {item.jenis_discount_ongkir === "rupiah" ? (
                <div>{`Diskon Harga  : Rp ${item.discount_ongkir_formater}`}</div>
              ) : (
                <div>{`Diskon Harga : ${item.discount_ongkir_formater} %`}</div>
              )}

              <div>{`Harga Jual : ${item.price_sale}`}</div>
              <div>{`Berat : ${item.stock} g`}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailBundle;
