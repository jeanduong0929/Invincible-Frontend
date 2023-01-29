import { useEffect } from "react";
import { useParams } from "react-router-dom";
import INV_API from "../utils/AxiosConfig";

const Products = () => {
  const { product } = useParams();

  useEffect(() => {}, [product]);

  const getProducts = async () => {
    await INV_API.post(``);
  };

  return (
    <div>
      <h1>Product page works!</h1>
    </div>
  );
};

export default Products;
