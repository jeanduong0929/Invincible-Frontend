import { useNavigate } from "react-router-dom";
import Product from "../../models/Product";

interface ProductCardProp {
  products: Product[];
}

const ProductCard = ({ products }: ProductCardProp) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-3 | cursor-pointer | gap-16">
      {products.map((p) => (
        <ul
          className="flex flex-col | font-mono | ease-out duration-300 hover:scale-110 | gap-5 w-80"
          onClick={() => navigate(`/product/${p.id}`)}
        >
          <img src={require(`../../assets/imgs/${p.product}.png`)} alt="" />
          <li className="font-bold text-xl">{p.product}</li>
          <li>${p.price}.00 USD</li>
        </ul>
      ))}
    </div>
  );
};

export default ProductCard;
