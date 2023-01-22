import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center | gap-10 mt-40">
      <h1 className="font-bold text-9xl">HOME</h1>
      <Link to="shop">
        <button className="bg-blue-600 text-yellow-300 | px-5 py-2 | rounded-md shadow-xl | ease-out duration-300 hover:scale-125">
          Shop Now
        </button>
      </Link>
    </div>
  );
};

export default Home;
