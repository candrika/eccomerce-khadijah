import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import paid from "../../assets_report/money.png";
import unpaid from "../../assets_report/paper-money.png";
import onlineShopping from "../../assets_report/online-shopping.png";
import top from "../../assets_report/top-rated.png";
import salary from "../../assets_report/salary.png";
import order from "../../assets_report/order.png";
import { Coba12, Coba8 } from "../../components/reusableComponents/Text";
import Chart from "chart.js/auto";

const PenjualanPerHari = () => {
  const [loading, setLoading] = useState(false);

  const [day, setDay] = useState([]);
  const [dayConvert, setDayConvert] = useState([]);

  const [firstDate, setFirstDate] = useState("");
  const [lastDate, setLastDate] = useState("");
  // console.log("hari ", day);

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

      const extractedDays = response.data.data.graphWeek.data.map(
        (dateObject) => {
          const date = new Date(dateObject.date);
          return date.getDate();
        }
      );
      setDayConvert(extractedDays);
      setDay(response.data.data.graphWeek.data);
      setFirstDate(response.data.data.graphWeek.data[0].date);
      setLastDate(
        response.data.data.graphWeek.data[
          response.data.data.graphWeek.data.length - 1
        ].date
      );
      // console.log(" repor", response.data.data.graphWeek.data);
      // console.log(" report produk", response.data.data.topBuyer.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  // console.log("first date", firstDate);
  // console.log("last date", lastDate);
  //   chart
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const myChartRef = chartRef.current?.getContext("2d");

    // Check if a chart instance already exists and destroy it if it does
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    if (day.length === 0) {
      // Display a loading message or placeholder
      return;
    }

    const labels = day.map((entry) => entry.date);
    const data = day.map((entry) => entry.order_count);
    // console.log("first lebel", dayConvert);

    // Create a new chart instance
    chartInstance.current = new Chart(myChartRef, {
      type: "line",
      data: {
        labels: dayConvert,
        datasets: [
          {
            label: `Data Penjualan ${firstDate} s/d ${lastDate}`,
            data: data,
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 2,
          },
        ],
      },
    });
  }, [day]);

  return (
    <div>
      <div className=" w-[90%] md:w-[98%] relative md:left-0 left-[5%]  grid grid-cols-1  gap-2 ">
        <p>Data Penjualan Dalam 1 Bulan</p>
        <div className="chart-container">
          <canvas ref={chartRef}></canvas>
        </div>
      </div>
    </div>
  );
};

export default PenjualanPerHari;
