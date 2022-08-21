import React, { useContext, useEffect, useState } from "react";
import { productContext } from "../../context/ProductContext";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Button, CardActionArea, CardActions, Grid } from "@mui/material";
import { NavLink, useSearchParams } from "react-router-dom";
import Filter from "../Filter/Filter";
import ReactPaginate from "react-paginate";
import "./Paginate.css";

const ProductsList = () => {
  const { getProducts, products } = useContext(productContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const [type, setType] = useState(searchParams.get("type") || "all");

  const paramsWithType = () => {
    return {
      type: type,
      q: searchParams.get("q") || "",
    };
  };

  const paramsNoType = () => {
    return {
      q: searchParams.get("q") || "",
    };
  };

  useEffect(() => {
    if (searchParams.get("type")) {
      setSearchParams(paramsWithType());
    } else {
      setSearchParams(paramsNoType());
    }
  }, []);

  useEffect(() => {
    getProducts();
    if (type === "all") {
      setSearchParams(paramsNoType());
    } else {
      setSearchParams(paramsWithType());
    }
  }, [searchParams, type]);

  // useEffect(() => {
  //   if (type === "all") {
  //     setSearchParams(paramsNoType());
  //   } else {
  //     setSearchParams(paramsWithType());
  //   }
  // }, [type]);

  // ! PAGINATE

  const [pageNumber, setPageNumber] = useState(0);

  const productsPerPage = 3;
  const pagesVisited = pageNumber * productsPerPage;

  const pageCount = Math.ceil(products.length / productsPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <>
      <Filter type={type} setType={setType} />
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          mt: 5,
        }}
      >
        {products
          ? products
              .slice(pagesVisited, pagesVisited + productsPerPage)
              .map((item) => (
                <Grid xs={3.5} mb={7}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="140"
                        image={item.image}
                        alt="green iguana"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {item.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Lizards are a widespread group of squamate reptiles,
                          with over 6,000 species, ranging across all continents
                          except Antarctica
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <NavLink to={`/details/${item.id}`}>
                        <Button size="small" color="primary">
                          Share
                        </Button>
                      </NavLink>
                    </CardActions>
                  </Card>
                </Grid>
              ))
          : null}
        <ReactPaginate
          previousLabel={"Назад"}
          nextLabel={"Вперед"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
        />
      </Box>
    </>
  );
};

export default ProductsList;
