import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center | gap-10 mt-40">
      <h1 className="font-bold text-9xl">COLLECTIONS</h1>
      <Link to="shop/all">
        <button className="bg-gradient-to-r from-slate-900 to-cyan-900 text-yellow-300 | px-7 py-4 | rounded-md shadow-xl | ease-out duration-300 hover:scale-125">
          Shop Now
        </button>
      </Link>
    </div>
  );
};

export default Home;
