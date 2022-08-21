import React, { useContext, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { productContext } from "../../context/ProductContext";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const LiveSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  // Хук useSearchParams предназначен для чтения и изменения строки запроса в URL для текущего маршрута. По аналогии с хуком useState возвращает значение и функцию для изменения этого значения.
  //   https://tokmakov.msk.ru/blog/item/678#:~:text=useSearchParams,%D1%84%D1%83%D0%BD%D0%BA%D1%86%D0%B8%D1%8E%20%D0%B4%D0%BB%D1%8F%20%D0%B8%D0%B7%D0%BC%D0%B5%D0%BD%D0%B5%D0%BD%D0%B8%D1%8F%20%D1%8D%D1%82%D0%BE%D0%B3%D0%BE%20%D0%B7%D0%BD%D0%B0%D1%87%D0%B5%D0%BD%D0%B8%D1%8F.

  const location = useLocation();
  //   Хук useLocation возвращает объект location, представляющий текущий URL. Его можно рассматривать как useState, который возвращает новое местоположение при каждом изменении URL. Этот хук можно использовать, например, чтобы вызвать событие просмотра новой страницы для инструмента веб-аналитики.

  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    // let currentParams = Object.fromEntries([...searchParams]);
    // console.log(...searchParams);
    if (location.pathname === "/list") {
      setSearchParams({
        // ...currentParams,
        q: searchValue,
      });
    }
  }, [searchValue]);

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        onChange={(e) => setSearchValue(e.target.value)}
        value={searchValue}
      />
    </Search>
  );
};

export default LiveSearch;
