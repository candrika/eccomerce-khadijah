import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import paid from "../../assets_report/money.png";
import unpaid from "../../assets_report/paper-money.png";
import onlineShopping from "../../assets_report/online-shopping.png";
import top from "../../assets_report/top-rated.png";
import salary from "../../assets_report/salary.png";
import order from "../../assets_report/order.png";
import { Coba1, Coba12, Coba8 } from "../../components/reusableComponents/Text";
import Chart from "chart.js/auto";

const ReportBackup = () => {
  const [loading, setLoading] = useState(false);

  const [firstDate, setFirstDate] = useState("");
  const [lastDate, setLastDate] = useState("");

  const [belumBayar, setBelumBayar] = useState("");
  const [sudahBayar, setSudahBayar] = useState("");
  const [totalPendapatan, setTotalPendapatan] = useState("");
  const [jumlahOrder, setJumlahOrder] = useState("");
  const [orderToday, setOrderToday] = useState("");
  const [orderWeek, setOrderWeek] = useState("");
  const [orderMonth, setOrderMonth] = useState("");
  const [orderYear, setOrderYear] = useState("");
  const [topBuyerBundle, setTopBuyerBundle] = useState("");
  const [topBuyerProduk, setTopBuyerProduk] = useState("");

  const [sunday, setSunday] = useState("");
  const [monday, setMonday] = useState("");
  const [tuesday, setTuesday] = useState("");
  const [thursday, setThursday] = useState("");
  const [friday, setFriday] = useState("");
  const [saturday, setSaturday] = useState("");

  const dayArray = [sunday, monday, tuesday, thursday, friday, saturday];
  // console.log("dayArray", dayArray);
  // console.log("sunday", sunday);

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

      setFirstDate(response.data.data.graphWeek.data[0].date);
      setLastDate(
        response.data.data.graphWeek.data[
          response.data.data.graphWeek.data.length - 1
        ].date
      );
      setBelumBayar(response.data.data.belumBayar);
      setSudahBayar(response.data.data.sudahBayar);
      setTotalPendapatan(response.data.data.totalPendapatan);
      setJumlahOrder(response.data.data.jumlahOrder);
      setOrderToday(response.data.data.orderToday);
      setOrderWeek(response.data.data.orderWeek);
      setOrderMonth(response.data.data.orderMonth);
      setOrderYear(response.data.data.orderYear);
      setTopBuyerProduk(response.data.data.topBuyer.products);
      setTopBuyerBundle(response.data.data.topBuyer.bundles);
      // console.log(" report bundle", response.data.data.topBuyer.bundles);
      // console.log(" report produk", response.data.data.topBuyer.products);

      const sumSunday = response.data.data.graphWeek.data.reduce(
        (total, item) => {
          if (item.day_name.toLowerCase() === "Sunday") {
            return total + item.order_count;
          }
          return total;
        },
        0
      );
      const sumMonday = response.data.data.graphWeek.data.reduce(
        (total, item) => {
          if (item.day_name.toLowerCase() === "Monday") {
            return total + item.order_count;
          }
          return total;
        },
        0
      );
      const sumTuesday = response.data.data.graphWeek.data.reduce(
        (total, item) => {
          if (item.day_name.toLowerCase() === "Tuesday") {
            return total + item.order_count;
          }
          return total;
        },
        0
      );
      const sumThursday = response.data.data.graphWeek.data.reduce(
        (total, item) => {
          if (item.day_name.toLowerCase() === "Thursday") {
            return total + item.order_count;
          }
          return total;
        },
        0
      );
      const sumFriday = response.data.data.graphWeek.data.reduce(
        (total, item) => {
          if (item.day_name.toLowerCase() === "Friday") {
            return total + item.order_count;
          }
          return total;
        },
        0
      );
      const sumSaturday = response.data.data.graphWeek.data.reduce(
        (total, item) => {
          if (item.day_name.toLowerCase() === "Saturday") {
            return total + item.order_count;
          }
          return total;
        },
        0
      );

      setSunday(sumSunday);
      setMonday(sumMonday);
      setTuesday(sumTuesday);
      setThursday(sumThursday);
      setFriday(sumFriday);
      setSaturday(sumSaturday);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  //   chart
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const myChartRef = chartRef.current.getContext("2d");

    // Check if a chart instance already exists and destroy it if it does
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create a new chart instance
    chartInstance.current = new Chart(myChartRef, {
      type: "line",
      data: {
        labels: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Friday",
          "Saturday",
        ],
        datasets: [
          {
            label: "Data Penjualan",
            data: dayArray,
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 2,
          },
        ],
      },
    });
  }, []);

  return (
    <div>
      <div className=" w-[90%] md:w-[98%] relative md:left-0 left-[5%]  grid grid-cols-1 md:grid-cols-12 gap-2 mb-8">
        <div className="col-span-12">
          <Coba8 text="Dashboard Penjualan" />
        </div>
        <div className="col-span-12">
          <Coba8 text={`${firstDate} s/d ${lastDate} `} />
        </div>
        <div className=" col-span-3 bg-white rounded-lg p-4 shadow-md">
          <div>
            <img src={unpaid} alt="paid" className="w-[70px]" />
          </div>
          <div className="text-left">
            <Coba12 text={belumBayar.title} />
            <Coba8 text={belumBayar.message} />
          </div>
        </div>

        <div className=" col-span-3 bg-white rounded-lg p-4 shadow-md">
          <div>
            <img src={paid} alt="paid" className="w-[70px]" />
          </div>
          <div className="text-left">
            <Coba12 text={sudahBayar.title} />
            <Coba8 text={sudahBayar.message} />
          </div>
        </div>

        <div className=" col-span-3 bg-white rounded-lg p-4 shadow-md">
          <div>
            <img src={salary} alt="paid" className="w-[70px]" />
          </div>
          <div className="text-left">
            <Coba12 text={totalPendapatan.title} />
            <Coba8 text={totalPendapatan.count} />
          </div>
        </div>

        <div className=" col-span-3 bg-white rounded-lg p-4 shadow-md">
          <div>
            <img src={onlineShopping} alt="paid" className="w-[70px]" />
          </div>
          <div className="text-left">
            <Coba12 text={jumlahOrder.title} />
            <Coba8 text={jumlahOrder.count} />
          </div>
        </div>

        <div className=" col-span-3 bg-white rounded-lg p-4 shadow-md">
          <div>
            <img src={order} alt="paid" className="w-[70px]" />
          </div>
          <div className="text-left">
            <Coba12 text="Orderan Hari ini" />
            <Coba8 text={orderToday.count} />
          </div>
        </div>

        <div className=" col-span-3 bg-white rounded-lg p-4 shadow-md">
          <div>
            <img src={order} alt="paid" className="w-[70px]" />
          </div>
          <div className="text-left">
            <Coba12 text="Orderan Minggu Ini" />
            <Coba8 text={orderWeek.count} />
          </div>
        </div>

        <div className=" col-span-3 bg-white rounded-lg p-4 shadow-md">
          <div>
            <img src={order} alt="paid" className="w-[70px]" />
          </div>
          <div className="text-left">
            <Coba12 text="Orderan Bulan Ini" />
            <Coba8 text={orderMonth.count} />
          </div>
        </div>

        <div className=" col-span-3 bg-white rounded-lg p-4 shadow-md">
          <div>
            <img src={order} alt="paid" className="w-[70px]" />
          </div>
          <div className="text-left">
            <Coba12 text="Orderan Tahun Ini" />
            <Coba8 text={orderYear.count} />
          </div>
        </div>
      </div>

      <div className=" w-[90%] md:w-[98%] relative md:left-0 left-[5%]  grid grid-cols-1  gap-2 ">
        <p>Data Penjualan Dalam 1 Bulan</p>
        <div className="chart-container">
          <canvas ref={chartRef}></canvas>
        </div>
      </div>
    </div>
  );
};

export default ReportBackup;
