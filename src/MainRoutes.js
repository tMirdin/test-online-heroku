import React from "react";
import { Route, Routes } from "react-router-dom";
import AddProduct from "./Components/Admin/AddProduct/AddProduct";
import Home from "./Components/Home/Home";
import ProductsDetails from "./Components/Products/ProductsDetails";
import ProductsList from "./Components/Products/ProductsList";
import EditProduct from "./Components/Admin/EditProduct/EditProduct";
import CartProducts from "./Components/CartProducts/CartProducts";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add" element={<AddProduct />} />
      <Route path="/list" element={<ProductsList />} />
      <Route path="/details/:id" element={<ProductsDetails />} />
      <Route path="/edit/:id" element={<EditProduct />} />
      <Route path="/cart" element={<CartProducts />} />
    </Routes>
  );
};

export default MainRoutes;
