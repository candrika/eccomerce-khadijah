import React, { useEffect, useState } from "react";

const City = () => {
  const [cities, setCities] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true); // Initialize isLoading as true

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://laravel-api-10.cerise.id/api/cities?page=${currentPage}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCities(data.success.data);
        setTotalPages(data.success.last_page);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false); // Set isLoading to false after the initial data fetch
      }
    };

    fetchData();
  }, [currentPage]);

  const visiblePageCount = 5; // Number of visible page numbers
  const halfVisibleCount = Math.floor(visiblePageCount / 2);

  // Generate an array of page numbers based on the current page and total pages
  const generatePageNumbers = () => {
    const start = Math.max(currentPage - halfVisibleCount, 1);
    const end = Math.min(start + visiblePageCount - 1, totalPages);
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div className="w-[98%] relative  container  my-4 bg-white">
      {" "}
      {/* Set the background to white here */}
      <h1 className="text-2xl font-bold mb-4">Daftar Kota</h1>
      {/* Loading spinner */}
      {isLoading ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div>
          <table className="w-[95%] relative left-[2.5%] table-auto border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">#</th>
                <th className="border border-gray-300 px-4 py-2">Kota</th>
                <th className="border border-gray-300 px-4 py-2">Kecamatan</th>
                <th className="border border-gray-300 px-4 py-2">Kode POS</th>
              </tr>
            </thead>
            <tbody>
              {cities.map((city, index) => (
                <tr key={city.id}>
                  <td className="border border-gray-300 px-4 py-2">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {city.nameCities}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {city.kecamatan}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {city.kodepos}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination controls */}
          <div className="mt-4 flex justify-between items-center">
            {/* First Page Button */}
            <button
              className={`px-4 py-2 rounded-full ${
                currentPage === 1
                  ? "bg-gray-400 text-gray-800 cursor-not-allowed"
                  : "bg-blue-500 text-white"
              }`}
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              First
            </button>

            {/* Page Numbers */}
            <div className="flex space-x-2">
              {pageNumbers.map((pageNumber) => (
                <button
                  key={pageNumber}
                  className={`px-3 py-2 rounded-full ${
                    currentPage === pageNumber
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 text-gray-700 hover:bg-blue-500 hover:text-white"
                  }`}
                  onClick={() => setCurrentPage(pageNumber)}
                >
                  {pageNumber}
                </button>
              ))}
            </div>

            {/* Previous Page Button */}
            <button
              className={` py-2 rounded-full ${
                currentPage === 1
                  ? "bg-gray-400 text-gray-800 cursor-not-allowed"
                  : "bg-blue-500 text-white"
              }`}
              onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            {/* Next Page Button */}
            <button
              className={` py-2 rounded-full ${
                currentPage === totalPages
                  ? "bg-gray-400 text-gray-800 cursor-not-allowed"
                  : "bg-blue-500 text-white"
              }`}
              onClick={() =>
                setCurrentPage(Math.min(currentPage + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </button>
            {/* Last Page Button */}
            <button
              className={` py-2 rounded-full ${
                currentPage === totalPages
                  ? "bg-gray-400 text-gray-800 cursor-not-allowed"
                  : "bg-blue-500 text-white"
              }`}
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
            >
              Last
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default City;
