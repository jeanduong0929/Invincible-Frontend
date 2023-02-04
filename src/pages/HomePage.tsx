import { Link } from "react-router-dom";
import "./homepage.css";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center | gap-10">
      <img
        className="home-img"
        src={require("../assets/imgs/painting.jpg")}
        alt=""
      />
      <div className="absolute | flex flex-col items-center | gap-10 translate-y-1/2">
        <h1 className="font-bold text-9xl text-yellow-300">COLLECTIONS</h1>
        <Link to="shop/all">
          <button className="bg-gradient-to-r from-slate-900 to-cyan-900 text-yellow-300 | px-7 py-4 | rounded-md shadow-xl | ease-out duration-500 hover:scale-125">
            Shop Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
