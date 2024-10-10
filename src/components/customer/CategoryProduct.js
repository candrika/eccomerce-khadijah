import React, { useState, useEffect } from "react";
import iconCategory from "../../assets/traditional-medicine.png";
import brushLine from "../../assets/brush-line.png";
import Paragraph from "../reusableComponents/Paragraph";
import axios from "axios";
import { Link } from "react-router-dom";

const CategoryProduct = () => {
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState([]);

  const fetchCategory = async () => {
    try {
      const response = await axios.get(
        "https://laravel-api-10.cerise.id/api/categories",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setCategory(response.data.data);
      // console.log(response.data.data);
      // console.log("category", response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <div className=" h-full relative mt-8 ">
      <div className=" w-[80%] relative left-[10%] md:h-[100px] h-[150px] mt-8 ">
        <Paragraph text="Kategori " variant="paragraph2" />
        <br />
        <Paragraph text="Kategori Produk Khadija" variant="paragraph4" />
      </div>
      <div className="w-[90%] lg:max-w-xl mx-auto grid grid-cols-3 md:grid-cols-5 gap-5 place-items-center">
        {category.map((categori, index) => (
          <Link to={`/product-by-category/${categori.name}`}>
            <div key={index} className="w-[100px]">
              <img
                src={iconCategory}
                alt=""
                className="w-16 mx-auto lg:w-[70px]"
              />
              <Paragraph text={categori.name} variant="paragraph10" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryProduct;
