import axios from "axios";
import React, { createContext, useReducer } from "react";
import { useLocation } from "react-router-dom";

export const productContext = createContext();

// const API = "http://localhost:8000/products";
const API = "https://online-shop-14.herokuapp.com/products";
const API1 = "https://backend-for-fs-makers.herokuapp.com/api/v1/products/";

const INIT_STATE = {
  products: [],
  productDetails: {},
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return { ...state, products: action.payload };
    case "GET_PRODUCTS_DETAILS":
      return { ...state, productDetails: action.payload };
    default:
      return state;
  }
};

const ProductContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const location = useLocation();

  const addProduct = async (newProduct) => {
    await axios.post(API, newProduct);
  };

  const getProducts = async () => {
    const { data } = await axios.get(`${API}${window.location.search}`);
    dispatch({
      type: "GET_PRODUCTS",
      payload: data,
    });
  };

  const getProductsDetails = async (id) => {
    const { data } = await axios.get(`${API}/${id}`);
    dispatch({
      type: "GET_PRODUCTS_DETAILS",
      payload: data,
    });
  };

  const deleteProduct = async (id) => {
    await axios.delete(`${API}/${id}`);
    getProducts();
  };

  const editProduct = async (id, prodObj) => {
    await axios.patch(`${API}/${id}`, prodObj);
    getProducts();
  };

  return (
    <productContext.Provider
      value={{
        products: state.products,
        productDetails: state.productDetails,
        addProduct,
        getProducts,
        getProductsDetails,
        deleteProduct,
        editProduct,
      }}
    >
      {children}
    </productContext.Provider>
  );
};

export default ProductContextProvider;
