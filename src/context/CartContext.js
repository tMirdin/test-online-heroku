import React, { createContext, useReducer, useState } from "react";

export const cartContext = createContext();

const INIT_STATE = {
  favorite: {},
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_FAVORITE":
      return { ...state, favorite: action.payload };
    default:
      return state;
  }
};

const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  const [color, setColor] = useState({ backgroundColor: "#00b83b" });

  function checkTripInFav(id) {
    let fav = JSON.parse(localStorage.getItem("favorite"));
    if (!fav) {
      fav = {
        trips: [],
      };
    }
    let newfav = fav.trips.filter((elem) => elem.item.id === id);
    return newfav.length > 0
      ? setColor({ backgroundColor: "#00b83b" })
      : setColor({ backgroundColor: "red" });
  }

  function addToFavorite(trip, tripId) {
    checkTripInFav(tripId);
    let favorite = JSON.parse(localStorage.getItem("favorite"));
    if (!favorite) {
      favorite = {
        trips: [],
      };
    }
    let newTrip = {
      item: trip,
    };

    let filteredFavorite = favorite.trips.filter(
      (elem) => elem.item.id === trip.id
    );
    if (filteredFavorite.length > 0) {
      favorite.trips = favorite.trips.filter(
        (elem) => elem.item.id !== trip.id
      );
    } else {
      favorite.trips.push(newTrip);
    }
    localStorage.setItem("favorite", JSON.stringify(favorite));
  }

  function getFav() {
    let favorite = JSON.parse(localStorage.getItem("favorite"));
    if (!favorite) {
      favorite = {
        trips: [],
      };
    }
    dispatch({
      type: "GET_FAVORITE",
      payload: favorite,
    });
  }

  function deleteFavTrip(id) {
    let fav = JSON.parse(localStorage.getItem("favorite"));
    let filteredFav = {
      ...fav,
      trips: fav.trips.filter((e) => e.item.id != id),
    };
    localStorage.setItem("favorite", JSON.stringify(filteredFav));
    setColor({ backgroundColor: "#00b83b" });
    getFav();
  }
  return (
    <cartContext.Provider
      value={{
        favorite: state.favorite,
        getFav,
        addToFavorite,
        color,
        setColor,
        deleteFavTrip,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export default CartContextProvider;
