import React, { useContext, useEffect } from "react";
import { cartContext } from "../../context/CartContext";

const CartProducts = () => {
  const { getFav, favorite, deleteFavTrip } = useContext(cartContext);

  useEffect(() => {
    getFav();
  }, []);

  return (
    <div className="container">
      {favorite.trips ? (
        <div className="favourite">
          {favorite.trips.map((elem, index) => (
            <div key={index}>
              <button
                className="btnDelFav"
                onClick={() => deleteFavTrip(elem.item.id)}
              >
                X
              </button>
              <h1>{elem.item.title}</h1>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default CartProducts;
