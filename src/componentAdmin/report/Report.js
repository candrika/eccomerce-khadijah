import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalContext";

const Report = () => {
  const Swal = require("sweetalert2");
  const { fetchGudang, fetchReport2, report2, setReport2 } =
    useContext(GlobalContext);

  // console.log("report", report);

  useEffect(() => {
    // fetchReport();
    fetchGudang();
    fetchReport2();
  }, []);
  // console.log("coba report", report2);

  return (
    <div>
      <div className="relative w-[90%] md:w-[98%] left-[5%] md:left-0 mt-[40px]  mb-8  sm:flex sm:justify-between">
        <p>reportnya kaka</p>
        {/* {gudang.map((item, index) => (
          <div>
            <p>gudang </p>
            <p>{item.id}</p>
          </div>
        ))} */}
        <div>
          <p>report</p>

          <p>{report2.count}</p>

          {/* <p>{report.belumBayar.count}</p> */}
        </div>
      </div>
    </div>
  );
};

export default Report;
