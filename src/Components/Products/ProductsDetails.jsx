import React, { useContext, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { cartContext } from "../../context/CartContext";
import { productContext } from "../../context/ProductContext";

const ProductsDetails = () => {
  const { productDetails, getProductsDetails, deleteProduct } =
    useContext(productContext);
  const { addToFavorite } = useContext(cartContext);
  let { id } = useParams();
  useEffect(() => {
    getProductsDetails(id);
  }, []);
  return (
    <>
      {productDetails ? (
        <>
          <h2>{productDetails.title}</h2>
          <NavLink to="/list">
            <button onClick={() => deleteProduct(id)}>delete</button>
          </NavLink>
          <NavLink to={`/edit/${id}`}>
            <button>edit</button>
          </NavLink>
          <button
            className="btnFav"
            onClick={() => addToFavorite({ ...productDetails }, id)}
          >
            В избранное
          </button>
        </>
      ) : null}
    </>
  );
};

export default ProductsDetails;
