import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Product from "../../models/Product";
import INV_API from "../../utils/AxiosConfig";
import Loading from "../LoadingPage";
import ProductCard from "./ProductCard";

const ProductListPage = () => {
  const { category } = useParams();
  const sizeDropdownRef = useRef<any>();
  const [products, setProducts] = useState<Product[] | null>(null);
  const [filterSize, setFilterSize] = useState<string[]>([]);
  const [sizeDropdown, setSizeDropdown] = useState<boolean>(false);
  const sizes = [
    { value: "S", label: "S" },
    { value: "M", label: "M" },
    { value: "L", label: "L" },
    { value: "XL", label: "XL" },
  ];

  useEffect(() => {
    if (category === "all") {
      getAllProducts();
    } else {
      getProductByCategory();
    }
  }, [category]);

  useEffect(() => {
    let handler = (e: Event) => {
      if (!sizeDropdownRef.current.contains(e.target)) {
        setSizeDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const getAllProducts = async () => {
    await INV_API.get("/product/all")
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

  const handleFilterSize = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const indexOf = filterSize.indexOf(e.target.value);
    if (indexOf !== -1) {
      filterSize.splice(indexOf, 1);
    } else {
      filterSize.push(e.target.value);
    }
    console.log("Filter size: ", filterSize);
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

          <div
            ref={sizeDropdownRef}
            className="flex items-center | gap-2"
            onClick={() => setSizeDropdown(!sizeDropdown)}
          >
            <li className="hover:underline hover:underline-offset-4">Size</li>
            {/* sizeDropdown true */}
            {sizeDropdown ? (
              <div className="flex flex-col items-end">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fill-rule="evenodd"
                    d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z"
                    clip-rule="evenodd"
                  />
                </svg>
                <ul
                  onClick={(e) => e.stopPropagation()}
                  className="absolute | flex flex-col items-start | bg-slate-200 | translate-y-8 | px-5 py-2 w-32 | rounded-md shadow-xl"
                >
                  {sizes.map((s) => (
                    <div className="flex items-baseline | gap-5">
                      <input
                        type="checkbox"
                        onChange={handleFilterSize}
                        value={s.value}
                      />
                      <label>{s.label}</label>
                    </div>
                  ))}
                </ul>
              </div>
            ) : (
              /* sizeDropdown false */
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
            )}
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
      <ProductCard products={products} />
    </div>
  ) : (
    <Loading />
  );
};

export default ProductListPage;
