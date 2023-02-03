import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Product from "../models/Product";
import INV_API from "../utils/AxiosConfig";
import Loading from "./Loading";

const ProductList = () => {
  const { category } = useParams();
  const [products, setProducts] = useState<Product[] | null>(null);

  useEffect(() => {
    if (category === "all") {
      getAllProducts();
    } else {
      console.log(category);
      getProductByCategory();
    }
  }, [category]);

  const getAllProducts = async () => {
    await INV_API.get("/product")
      .then((r) => {
        setProducts(r.data);
      })
      .catch(() => setProducts(null));
  };

  const getProductByCategory = async () => {
    await INV_API.get(`/product/category?category=${category}`)
      .then((r) => {
        setProducts(r.data);
      })
      .catch(() => setProducts(null));
  };

  return products ? (
    /* There is a product */
    <div className="font-mono | px-20 py-24">
      {/* Path */}
      <h1 className="font-bold text-7xl | mb-20">{category?.toUpperCase()}</h1>

      {/* Filter */}
      <div className="flex justify-between items-center | cursor-pointer | mb-16">
        <ul className="flex items-center | gap-5">
          <li>Filter:</li>

          <div className="flex items-center | gap-2">
            <li className="hover:underline hover:underline-offset-4">
              Availability
            </li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fill-rule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clip-rule="evenodd"
              />
            </svg>
          </div>

          <div className="flex items-center | gap-2">
            <li className="hover:underline hover:underline-offset-4">Size</li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fill-rule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clip-rule="evenodd"
              />
            </svg>
          </div>

          <div className="flex items-center | gap-2">
            <li className="hover:underline hover:underline-offset-4">Price</li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fill-rule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </ul>

        <ul>
          <li>Sort by:</li>
        </ul>
      </div>

      {/* Card */}
      <div className="grid grid-cols-3 | cursor-pointer | gap-16">
        {products.map((p) => (
          <ul className="flex flex-col | font-mono | ease-out duration-300 hover:scale-110 | gap-5 w-80">
            <img
              className=""
              src={require(`../assets/imgs/${p.product}.png`)}
              alt=""
            />
            <li className="font-bold text-xl">{p.product}</li>
            <li>${p.price}.00 USD</li>
          </ul>
        ))}
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default ProductList;
