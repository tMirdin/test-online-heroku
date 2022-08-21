import React from "react";
import { BrowserRouter } from "react-router-dom";
import PrimarySearchAppBar from "./Components/Navbar/Navbar";
import CartContextProvider from "./context/CartContext";
import ProductContextProvider from "./context/ProductContext";
import MainRoutes from "./MainRoutes";

const App = () => {
  return (
    <BrowserRouter>
      <CartContextProvider>
        <ProductContextProvider>
          <PrimarySearchAppBar />
          <MainRoutes />
        </ProductContextProvider>
      </CartContextProvider>
    </BrowserRouter>
  );
};

export default App;
