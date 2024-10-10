import React, { useState, useEffect } from "react";
import { Coba10, Coba13, Coba15 } from "../reusableComponents/Text";
import axios from "axios";
import { Link } from "react-router-dom";

const Bundle2 = () => {
  const [bundleList, setBundleList] = useState([]);

  const fetchProduk = async () => {
    try {
      const response = await axios.get(
        "https://laravel-api-10.cerise.id/api/bundles"
      );

      const data = response.data.data;
      setBundleList(data.splice(0, 8));

      // console.log("response bundle", response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log("produk", bundleList);

  useEffect(() => {
    fetchProduk();
  }, []);
  return (
    <div>
      <div className=" w-[90%] relative left-[5%] text-center mb-8 mt-8 ">
        <div className="mb-4 mt-8">
          <Coba13 text="Bundle " />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {bundleList.map((item, index) => (
            <Link to={`/detail-bundle/${item.id}`}>
              <div
                key={index}
                className=" bg-white shadow-lg flex justify-between p-4"
              >
                <div className=" w-[50%]">
                  <img src={item.url} alt={item.url} />
                </div>
                <div className=" ml-2 w-[50%]">
                  <Coba10 text={item.name} />
                  {item.price_total == null ? (
                    <Coba10 text="-" />
                  ) : (
                    <Coba13 text={`Rp ${item.price_total}`} />
                  )}
                  {/* <Coba10 text={`Rp ${item.price_bundle}`} /> */}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bundle2;
