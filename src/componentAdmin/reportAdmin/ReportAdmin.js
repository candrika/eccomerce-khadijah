import React, { useEffect, useState } from "react";
import axios from "axios";
import top1 from "../../assets_admin/rank_1.png";
import top2 from "../../assets_admin/rank_2.png";
import top3 from "../../assets_admin/rank_3.png";
import {
  Coba10,
  Coba11,
  Coba12,
  Coba8,
} from "../../components/reusableComponents/Text";
import Chart from "chart.js/auto";

const ReportAdmin = () => {
  const [loading, setLoading] = useState(false);

  const [firstDate, setFirstDate] = useState("");
  const [lastDate, setLastDate] = useState("");

  const [topBuyerBundle, setTopBuyerBundle] = useState([]);
  const [topBuyerProduk, setTopBuyerProduk] = useState([]);

  const fetchReport = async () => {
    try {
      const response = await axios.get(
        "https://laravel-api-10.cerise.id/api/reports",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setTopBuyerProduk(response.data.data.topBuyer.products);
      setTopBuyerBundle(response.data.data.topBuyer.bundles);
      setFirstDate(response.data.data.graphWeek.data[0].date);
      setLastDate(
        response.data.data.graphWeek.data[
          response.data.data.graphWeek.data.length - 1
        ].date
      );
      console.log("first", response.data.data.topBuyer);
      // console.log(" report bundle", response.data.data.topBuyer.bundles);
      // console.log(" report produk", response.data.data.topBuyer.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  // console.log("top buyer bundle ", topBuyerBundle);
  // console.log("top buyer produk ", topBuyerProduk);

  return (
    <div>
      <div className=" py-4 relative w-[90%] md:w-[98%] left-[5%] md:left-0 border border-white bg-white rounded-lg  grid grid-cols-1 md:grid-cols-12 gap-2 items-center my-2 h-auto">
        <div className="col-span-12 text-left pl-4">
          <Coba8
            text={`Penjualan Produk Terbanyak ${firstDate} s/d ${lastDate}`}
          />
        </div>

        <div className="col-span-11 grid grid-cols-12 gap-4 text-left pl-4  relative left-[5%] ">
          {topBuyerProduk.map((item, index) => (
            <div
              key={index}
              className="col-span-6 border border-gray-200 rounded-lg p-2"
            >
              <div className="text-center  bg-sky-100 p-2 rounded-md">
                <Coba12 text={item.product_name} />
              </div>
              {/* <div key={index} className="mt-4 grid grid-cols-12 text-center">
                <div className="col-span-1 ">
                  <Coba11 text="No" />
                </div>
                <div className="col-span-6">
                  <Coba11 text="Nama Member" />
                </div>
                <div className="col-span-5">
                  <Coba11 text="Jumlah Pembelian" />
                </div>
              </div> */}

              {item.buyers.map((item, index) => (
                <div
                  key={index}
                  className=" grid grid-cols-12 text-center border-b-2 border-gray-300 h-[50px] items-center"
                >
                  <div className="col-span-1 ">
                    {/* <Coba10 text={index + 1} /> */}
                    {index + 1 < 2 ? (
                      <div className="flex ">
                        <img src={top1} alt="top 1 " />
                        <p className="relative -left-[26px] top-[8px] text-xs">
                          {index + 1}
                        </p>
                      </div>
                    ) : index + 1 < 3 ? (
                      <div className="flex ">
                        <img src={top2} alt="top 2 " />
                        <p className="relative -left-[26px] top-[8px] text-xs">
                          {index + 1}
                        </p>
                      </div>
                    ) : index + 1 < 4 ? (
                      <div className="flex ">
                        <img src={top3} alt="top 3 " />
                        <p className="relative -left-[26px] top-[8px] text-xs">
                          {index + 1}
                        </p>
                      </div>
                    ) : (
                      <p>{index + 1}</p>
                    )}
                  </div>
                  <div className="col-span-6">
                    <Coba10 text={item.user_name} />
                  </div>
                  <div className="col-span-5">
                    <Coba10 text={item.order_count} />
                  </div>
                </div>
              ))}
            </div>
          ))}

          {/* {topBuyerProduk.map((item, index) => (
            <div
              key={index}
              className="col-span-12 grid grid-cols-12 border border-gray-200"
            >
              <div className="col-span-5">
                <Coba10 text={item.product_name} />
              </div>
              {item.buyers.map((item, index) => (
                <div key={index} className="col-span-5 grid grid-cols-12">
                  <div className="col-span-6">
                    <Coba10 text={item.user_name} />
                  </div>
                  <div className="col-span-6">
                    <Coba10 text={item.order_count} />
                  </div>
                </div>
              ))}
            </div>
          ))} */}
        </div>
      </div>

      <div className=" py-4 relative w-[90%] md:w-[98%] left-[5%] md:left-0 border border-white bg-white rounded-lg  md:grid grid-cols-1 md:grid-cols-12 gap-2 items-center my-2 h-auto">
        <div className="col-span-12 text-left pl-4">
          <Coba8 text="Penjualan Bundle Terbanyak " />
        </div>

        <div className="col-span-11 grid grid-cols-12 gap-4 text-left pl-4  relative left-[5%] ">
          {topBuyerBundle.map((item, index) => (
            <div className="col-span-6 border border-gray-200 rounded-lg p-2">
              <div className="text-center">
                <Coba12 text={item.bundle_name} />
              </div>
              <div key={index} className="mt-4 grid grid-cols-12 text-center">
                <div className="col-span-1 ">
                  <Coba11 text="No" />
                </div>
                <div className="col-span-6">
                  <Coba11 text="Nama Member" />
                </div>
                <div className="col-span-5">
                  <Coba11 text="Jumlah Pembelian" />
                </div>
              </div>

              {item.buyers.map((item, index) => (
                <div key={index} className=" grid grid-cols-12 text-center">
                  <div className="col-span-1 ">
                    <Coba10 text={index + 1} />
                  </div>
                  <div className="col-span-6">
                    <Coba10 text={item.user_name} />
                  </div>
                  <div className="col-span-5">
                    <Coba10 text={item.order_count} />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportAdmin;
