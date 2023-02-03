import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "../../pages/Home";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import ProductList from "../../pages/ProductList";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/shop/:product_path" element={<ProductList />} />
      </Route>
    </Routes>
  );
};

export default Router;
