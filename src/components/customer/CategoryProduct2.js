import React, { useState, useEffect } from "react";
import iconCategory from "../../assets/traditional-medicine.png";
import brushLine from "../../assets/brush-line.png";
import Paragraph from "../reusableComponents/Paragraph";
import axios from "axios";
import { Link } from "react-router-dom";
import { Coba7 } from "../reusableComponents/Text";

const CategoryProduct2 = () => {
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
        <Paragraph text="Categories " variant="paragraph2" />
        <br />
        <Paragraph
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt non
          labore culpa eligendi, quia dolore nemo perferendis sint?"
          variant="paragraph4"
        />
      </div>
      <div className="flex justify-center mb-4">
        <div className=" cursor-pointer flex relative ">
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
      </div>
      <div className="w-[90%] lg:max-w-xl mx-auto grid grid-cols-3 md:grid-cols-5 gap-5 place-items-center">
        {category.map((categori, index) => (
          <div>
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryProduct2;
