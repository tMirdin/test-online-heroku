import { Button, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { productContext } from "../../../context/ProductContext";

const initObj = {
  title: "",
  type: "",
  description: "",
  price: "",
  img1: "",
  img2: "",
  img3: "",
};

const AddProduct = () => {
  const { addProduct } = useContext(productContext);
  const [inpValues, setInpValues] = useState(initObj);

  const handleChange = (e) => {
    let obj = {
      ...inpValues,
      [e.target.name]: e.target.value,
    };
    setInpValues(obj);
    // console.log(obj);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (
      !inpValues.title.trim() ||
      !inpValues.type.trim() ||
      !inpValues.description.trim() ||
      !inpValues.price.trim() ||
      !inpValues.img1.trim() ||
      !inpValues.img2.trim() ||
      !inpValues.img3.trim()
    ) {
      alert("1111111");
      return;
    }
    addProduct(inpValues);
    setInpValues(initObj);
  };

  return (
    <form onSubmit={(e) => handleSave(e)}>
      <TextField
        id="outlined-basic"
        label="Название"
        variant="outlined"
        value={inpValues.title}
        name="title"
        onChange={(e) => handleChange(e)}
      />
      <TextField
        id="outlined-basic"
        label="Тип"
        variant="outlined"
        value={inpValues.type}
        name="type"
        onChange={(e) => handleChange(e)}
      />
      <TextField
        id="outlined-basic"
        label="Описание"
        variant="outlined"
        value={inpValues.description}
        name="description"
        onChange={(e) => handleChange(e)}
      />
      <TextField
        id="outlined-basic"
        label="Цена"
        variant="outlined"
        value={inpValues.price}
        name="price"
        onChange={(e) => handleChange(e)}
      />
      <TextField
        id="outlined-basic"
        label="Изображение 1"
        variant="outlined"
        value={inpValues.img1}
        name="img1"
        onChange={(e) => handleChange(e)}
      />
      <TextField
        id="outlined-basic"
        label="Изображение 2"
        variant="outlined"
        value={inpValues.img2}
        name="img2"
        onChange={(e) => handleChange(e)}
      />
      <TextField
        id="outlined-basic"
        label="Изображение 3"
        variant="outlined"
        value={inpValues.img3}
        name="img3"
        onChange={(e) => handleChange(e)}
      />
      <Button type="submit" variant="contained">
        Save
      </Button>
    </form>
  );
};

export default AddProduct;
