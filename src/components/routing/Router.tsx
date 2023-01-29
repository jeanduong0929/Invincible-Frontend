import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "../../pages/Home";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import Products from "../../pages/Products";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/collections:/products" element={<Products />} />
      </Route>
    </Routes>
  );
};

export default Router;
