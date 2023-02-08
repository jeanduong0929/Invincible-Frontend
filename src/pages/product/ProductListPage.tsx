import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Product from "../../models/Product";
import INV_API from "../../utils/AxiosConfig";
import Loading from "../LoadingPage";
import ProductCard from "./ProductCard";
import "../css/productlistpage.css";

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

  // Load products
  useEffect(() => {
    if (category === "all") {
      getAllProducts();
    } else {
      getProductByCategory();
    }
  }, [category]);

  // Close dropdown when clicking outside
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

  // Get all products
  const getAllProducts = async () => {
    await INV_API.get("/product/all")
      .then((r) => {
        setProducts(r.data);
      })
      .catch(() => setProducts(null));
  };

  // Get product by category
  const getProductByCategory = async () => {
    await INV_API.get(`/product/category?category=${category}`)
      .then((r) => {
        setProducts(r.data);
      })
      .catch(() => setProducts(null));
  };

  // Check the boxes after closing the dropdown
  const handleCheckBox = (value: string): boolean => {
    return filterSize.indexOf(value) !== -1;
  };

  // Set the filter sizes
  const handleFilterSize = (value: string): void => {
    const indexOf = filterSize.indexOf(value);
    if (indexOf === -1) {
      setFilterSize((prev) => [...prev, value]);
    } else {
      setFilterSize(filterSize.filter((s) => s !== value));
    }
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

          {/* Size dropdown */}
          <div
            ref={sizeDropdownRef}
            className="flex items-center | gap-2"
            onClick={() => setSizeDropdown(!sizeDropdown)}
          >
            <li className="hover:underline hover:underline-offset-4">Size</li>
            {/* sizeDropdown true */}
            {sizeDropdown ? (
              <div className="flex flex-col items-end">
                {/* chevron up */}
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
                {/* sizeDropdown options */}
                <ul
                  onClick={(e) => e.stopPropagation()}
                  className="absolute | flex flex-col items-start | bg-slate-200 | translate-y-8 px-5 py-2 w-32 | rounded-md shadow-xl"
                >
                  {sizes.map((s) => (
                    <div
                      onClick={() => handleFilterSize(s.value)}
                      className="flex items-center | gap-3 px-3 w-28 -translate-x-4 | group ease-out transition duration-300 hover:scale-110"
                    >
                      <input
                        id="filter-size"
                        type="checkbox"
                        checked={handleCheckBox(s.value)}
                        value={s.value}
                        style={{}}
                      />
                      <label className="group-hover:font-bold">{s.label}</label>
                    </div>
                  ))}
                </ul>
              </div>
            ) : (
              /* sizeDropdown false */
              /* chevron down */
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
