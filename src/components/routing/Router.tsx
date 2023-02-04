import { Routes, Route } from "react-router-dom";
import ErrorPage from "../../pages/ErrorPage";
import HomePage from "../../pages/HomePage";
import LoginPage from "../../pages/LoginPage";
import ProductListPage from "../../pages/ProductListPage";
import ProductPage from "../../pages/ProductPage";
import RegisterPage from "../../pages/RegisterPage";
import Layout from "./Layout";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/shop/:category" element={<ProductListPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
};

export default Router;
