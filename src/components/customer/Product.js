import React, { useState, useEffect } from "react";
import disc from "../../assets/discount.png";
import stock from "../../assets/ready-stock.png";
import produk from "../../assets/produk1.jpeg";
import Paragraph from "../reusableComponents/Paragraph";
import axios from "axios";
import { Link } from "react-router-dom";

const Product = () => {
  const [mouseOver, setMouseOver] = useState(true);
  const [mouseOut, setMouseOut] = useState(true);
  const [loading, setLoading] = useState(false);
  const [product, setProduk] = useState([]);

  const fetchProduk = async () => {
    try {
      const response = await axios.get(
        "https://laravel-api-10.cerise.id/api/products",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = response.data.success;
      setProduk(data.splice(0, 8));

      // console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log("produk", product);

  useEffect(() => {
    fetchProduk();
  }, []);
  return (
    <div className="pb-16 relative mt-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        {product.map((product, index) => (
          <Link key={index} to={`/detail-product/${product.id}`}>
            <div className="bg-white rounded-md shadow-lg hover:scale-105 transform transition-transform duration-300 ease-out">
              {/* Product Image */}
              {product.galleries.map(
                (item, index) =>
                  index === 0 && (
                    <img
                      key={index}
                      src={item.url}
                      alt={item.url}
                      className="w-full h-[20rem] md:h-48 lg:h-56 xl:h-64 object-cover"
                    />
                  )
              )}

              {/* Product Details */}
              <div className="mx-auto p-4 sm:p-6 lg:p-8 overflow-y-auto">
                <div className="max-h-20 overflow-hidden">
                  <div className="max-w-xs truncate">
                    <Paragraph text={product.name} variant="paragraph9" />
                  </div>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between">
                  {/* Stock */}
                  <div className="flex items-center">
                    <img src={stock} alt="" className="w-4 h-4 mr-1" />
                    <Paragraph
                      text={"Stock: " + product.stock}
                      variant="paragraph4"
                    />
                  </div>
                  {/* Discount */}
                  <div className="flex items-center">
                    <img src={disc} alt="" className="w-4 h-4 mr-1" />
                    <Paragraph
                      text={
                        product.jenis_discount_harga === "rupiah"
                          ? `Disc: Rp ${product.discount_harga_formater}`
                          : `Disc: ${product.discount_harga_formater}%`
                      }
                      variant="paragraph4"
                    />
                  </div>
                </div>
                {/* Discount Ongkir */}
                <div className="flex mt-1">
                  <img src={disc} alt="" className="w-4 h-4 mr-1" />
                  <Paragraph
                    text={
                      product.jenis_discount_ongkir === "rupiah"
                        ? `Disc Ongkir: Rp ${product.discount_ongkir_formater}`
                        : `Disc Ongkir: ${product.discount_ongkir_formater}%`
                    }
                    variant="paragraph4"
                  />
                </div>
                <hr className="my-2" />
                {/* Price */}
                <div className="text-left">
                  <Paragraph
                    text={`Rp ${product.price_sale_formater}`}
                    variant="paragraph6"
                  />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Product;
