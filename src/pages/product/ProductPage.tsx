import { FormEvent, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import SelectComponent, { Option } from "../../components/SelectComponent";
import { AuthContext } from "../../contexts/AuthProvider";
import Product from "../../models/Product";
import INV_API from "../../utils/AxiosConfig";
import LoadingPage from "../LoadingPage";

const ProductPage = () => {
  const { id } = useParams();
  const auth = useContext(AuthContext);
  const [size, setSize] = useState<string>("S");
  const [product, setProduct] = useState<Product | null>(null);
  const sizes: Option[] = [
    { value: "S", label: "S" },
    { value: "M", label: "M" },
    { value: "L", label: "L" },
    { value: "XL", label: "XL" },
  ];

  useEffect(() => {
    getProductById();
  }, []);

  const getProductById = async () => {
    await INV_API.get(`/product/id?id=${id}`)
      .then((r) => {
        setProduct(r.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const addToCart = async (e: FormEvent) => {
    e.preventDefault();

    if (!auth) {
      ErrorToaster("Please sign in to add to cart");
    }
  };

  const ErrorToaster = (msg: string) => {
    toast.error(msg, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  return product ? (
    <form
      className="flex font-mono p-16 gap-10"
      onSubmit={(e: FormEvent) => addToCart(e)}
    >
      <img src={require(`../../assets/imgs/${product.product}.png`)} alt="" />
      <div className="flex flex-col gap-10">
        <h1 className="font-bold text-3xl">{product.product}</h1>
        <h2 className="text-3xl">${product.price}.00</h2>
        <p className="text-xl">Size</p>
        <SelectComponent
          className="px-5 py-4 | rounded-md shadow-xl"
          options={sizes}
          setOption={setSize}
        />
        <button
          type="submit"
          className="py-5 | shadow-xl | ease-in-out duration-500 hover:bg-slate-500 hover:text-white"
        >
          Add to cart
        </button>
      </div>
    </form>
  ) : (
    <LoadingPage />
  );
};

export default ProductPage;
