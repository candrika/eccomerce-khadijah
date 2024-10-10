import React, { useState } from "react";
import axios from "axios";
import { Coba11 } from "../../components/reusableComponents/Text";
import AddBundle from "./AddBundle";

const SearchProduct = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [addedProducts, setAddedProducts] = useState([]);

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    fetchProducts(query);
  };

  const fetchProducts = async (query) => {
    try {
      const response = await axios.get(
        `https://laravel-api-10.cerise.id/api/products?search=${query}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setSearchResults(response.data.success); // Assuming the API returns an array of products
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const AddProducts = (product) => {
    // Check if the product already exists in the addedProducts array
    const isProductAdded = addedProducts.some(
      (addedProduct) => addedProduct.id === product.id
    );

    if (!isProductAdded) {
      // If the product is not already added, add it with a quantity of 1
      const productWithQuantity = {
        ...product,
        qty: 1,
        total: product.price_sale,
      };
      setAddedProducts((prevProducts) => [
        ...prevProducts,
        productWithQuantity,
      ]);
      alert("Product added: " + product.name);
    } else {
      alert("Quantity increased for: " + product.name);
    }
  };

  // console.log("add produk", addedProducts);

  const increaseQuantity = (productId) => {
    const updatedProducts = [...addedProducts];
    const existingProductIndex = updatedProducts.findIndex(
      (addedProduct) => addedProduct.id === productId
    );

    if (existingProductIndex !== -1) {
      const existingProduct = updatedProducts[existingProductIndex];
      const newQty = existingProduct.qty + 1;
      const newTotal = existingProduct.total * 2 * existingProduct.qty;
      updatedProducts[existingProductIndex] = {
        ...existingProduct,
        qty: newQty,
        total: newTotal,
      };
      setAddedProducts(updatedProducts);
    }
  };

  const decreaseQuantity = (productId) => {
    const updatedProducts = [...addedProducts];
    const existingProductIndex = updatedProducts.findIndex(
      (addedProduct) => addedProduct.id === productId
    );

    if (existingProductIndex !== -1) {
      const existingProduct = updatedProducts[existingProductIndex];
      const newQty = existingProduct.qty - 1;
      const newTotal = existingProduct.total - existingProduct.price_sale;

      if (newQty > 0) {
        updatedProducts[existingProductIndex] = {
          ...existingProduct,
          qty: newQty,
          total: newTotal,
        };
        setAddedProducts(updatedProducts);
      } else {
        // If the quantity becomes zero, remove the product from the addedProducts array
        updatedProducts.splice(existingProductIndex, 1);
        setAddedProducts(updatedProducts);
      }
    }
  };

  return (
    <div className="flex">
      <div className=" w-[50%] ">
        <div className="w-[100%] relative flex justify-start">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-[625px] h-[45px] border border-[#D3D3D3] rounded-lg pl-4"
          />
        </div>
        <div className="mt-4">
          <ul>
            {searchResults.map((product) => (
              <div className="flex items-center">
                <div className=" w-[50%] text-left my-2 ">
                  <li key={product.id}>{product.name}</li>
                </div>
                <button
                  className="bg-dark text-white h-[30px] w-[70px] rounded-full"
                  onClick={() => AddProducts(product)}
                >
                  ADD
                </button>
              </div>
            ))}
          </ul>
        </div>
      </div>
      <div className="w-[50%] ">
        <div className=" mx-2 ">
          {addedProducts.map((addedProducts, index) => (
            <div
              className="bg-white w-[100%]  p-8 flex shadow-lg border border-gray-100 rounded-md"
              key={addedProducts.id}
            >
              <div className="w-[60%] flex justify-between">
                <div>
                  <Coba11 text="Nama" />
                  <p>{addedProducts.name}</p>
                </div>
                <div>
                  <Coba11 text="Harga" />
                  <p>{addedProducts.price_sale}</p>
                </div>
                <div>
                  <Coba11 text="Total" />
                  <p>{addedProducts.total}</p>
                </div>
              </div>
              <div className="w-[40%] flex justify-end ">
                <button
                  className="bg-dark w-[25px] h-[25px] rounded-full text-white"
                  onClick={() => decreaseQuantity(addedProducts.id)}
                >
                  -
                </button>
                <div className="px-4  relative">
                  <p>{addedProducts.qty}</p>
                </div>

                <button
                  className="bg-dark w-[25px]  h-[25px]  rounded-full text-white"
                  onClick={() => increaseQuantity(addedProducts.id)}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchProduct;
