import {
  Alert, Box, Button, Chip, CircularProgress, FormControl, IconButton,
  InputLabel, MenuItem, OutlinedInput, Select, Snackbar, TextField,
} from '@mui/material'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CloseIcon from "@mui/icons-material/Close";
import { createMenuItem } from "../../components/State/Menu/Action"
import { uploadToCloudinary } from '../util/UploadToCloudinary';
//import MenuItem from "@mui/material/MenuItem";
import Grid from '@mui/material/Grid';
import { useParams } from "react-router-dom";

import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required("Por favor, ingresa un nombre para el menú")
    .min(3, "El nombre debe tener al menos 3 caracteres"),
  description: Yup.string()
    .trim()
    .required("La descripción es obligatoria")
    .min(10, "La descripción debe tener al menos 10 caracteres"),
  price: Yup.number()
    .typeError("El precio debe ser un número")
    .required("Indica el precio")
    .positive("El precio debe ser positivo")
    .max(99999, "El precio es demasiado alto"),
  category: Yup.object()
    .required("Selecciona una categoría")
    .nullable(),
  images: Yup.array()
    .min(1, "Por favor, sube al menos una imagen"),
  ingredients: Yup.array()
    .min(1, "Selecciona al menos un ingrediente"),
});


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const initialValues = {
  name: "",
  description: "",
  price: "",
  category: "",
  images: [],
  restaurantId: "",

  vegetarian: true,
  seasonal: false,
  quantity: 0,
  ingredients: [],
};

const AddMenuForm = () => {
  const [uploadImage, setUploadImage] = useState(false);
  const { restaurant, ingredients, auth, menu } = useSelector((store) => store);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt")
  
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      values.restaurantId = restaurant.usersRestaurant.id;

      dispatch(createMenuItem({ menu: values, jwt: auth.jwt || jwt }));
      console.log("values ----- ", values);
    }
  });

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    setUploadImage(true)
    const image = await uploadToCloudinary(file)
    console.log("imagen", image);

    formik.setFieldValue("images", [...formik.values.images, image]);
    setUploadImage(false);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...formik.values.images];
    updatedImages.splice(index, 1);
    formik.setFieldValue("images", updatedImages);
  };

  const [openSnackBar, setOpenSnackBar] = useState(false);

  useEffect(() => {
    if (menu.message || menu.error) setOpenSnackBar(true);
  }, [menu.message, menu.error]);

  const handleCloseSnackBar = () => {
    setOpenSnackBar(false);
  };

  return (
    <div className="py-10 px-5 lg:flex items-center justify-center min-h-screen">
      <div className="lg:max-w-4xl ">

        <h1 className="font-bold text-2xl text-center py-2">
          Agregar Nuevo Menu
        </h1>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <Grid container spacing={2}>
            {/* --------------------------------------------------------------*/}
            {/* add menu image */}
            <Grid className="flex flex-wrap gap-5" item size={12}>

              <input
                type="file"
                accept="image/*"
                id="fileInput"
                style={{ display: "none" }}
                onChange={handleImageChange}
                onBlur={formik.handleBlur}
              />
              {/* UPLOAD IMAGES */}
              <label className="relative inline-block" htmlFor="fileInput">
                <div className="w-24 h-24 cursor-pointer flex items-center justify-center p-3 border rounded-md border-gray-600">
                  <AddAPhotoIcon className="text-white" />
                  {uploadImage && (
                    <div className="absolute inset-0 flex justify-center items-center">
                      <CircularProgress className="text-blue-500" />
                    </div>
                  )}
                </div>
              </label>

              {/* image */}
              <div className="flex flex-wrap gap-2">
                {formik.values.images.map((image, index) =>
                  <div className='relative'>
                    <img
                      className="w-24 h-24 object-cover"
                      key={index}
                      src={image}
                      alt={`ImagenProducto ${index + 1}`} />
                    {/* delete images X */}
                    <IconButton
                      onClick={() => handleRemoveImage(index)}
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        outline: "none",
                      }}>
                      <CloseIcon sx={{ fontSize: "1rem", color: "red" }} />
                    </IconButton>
                  </div>)}
              </div>
              {formik.touched.images && formik.errors.images && (
                <p className="text-red-100 text-xs mt-1">{formik.errors.images}</p>
              )}
            </Grid>
            {/* --------------------------------------------------------------*/}
            {/* menu name */}
            <Grid item size={12}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Nombre"
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                error={formik.touched.name && Boolean(formik.errors.name)}

              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-red-100 text-xs mt-1">{formik.errors.name}</p>
              )}
            </Grid>
            {/* description */}
            <Grid item size={12}>
              <TextField
                fullWidth
                id="description"
                name="description"
                label="Descripcion"
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }

              />
              {formik.touched.description && formik.errors.description && (
                <p className="text-red-100 text-xs mt-1">{formik.errors.description}</p>
              )}
            </Grid>
            {/* price */}
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="price"
                name="price"
                label="Precio"
                variant="outlined"
                type="text" 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.price}
                error={formik.touched.price && Boolean(formik.errors.price)}

                onInput={(e) => {
                  const value = e.target.value;
                  const regex = /^\d*\.?\d{0,2}$/;
                  if (!regex.test(value)) {
                    e.target.value = formik.values.price; 
                  }
                }}
              />
              {formik.touched.price && formik.errors.price && (
                <p className="text-red-100 text-xs mt-1">{formik.errors.price}</p>
              )}
            </Grid>

            {/* category */}
            <Grid item size={6}>
              <FormControl fullWidth
                variant="outlined"
                error={formik.touched.category && Boolean(formik.errors.category)}>
                <InputLabel htmlFor="categoryId">Categoria</InputLabel>
                <Select
                  id="category"
                  name="category"
                  label="Tipo Comida"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.category}
                >
                  {restaurant.categories.map((item) => (
                    <MenuItem value={item}>{item.name}</MenuItem>
                    //  <MenuItem value={10}>diez</MenuItem>

                  ))}
                </Select>
                {formik.touched.category && formik.errors.category && (
                  <p className="text-red-100 text-xs mt-1">{formik.errors.category}</p>
                )}
              </FormControl>
            </Grid>
            {/* add ingredients */}
            <Grid item size={12}>
              <FormControl fullWidth error={formik.touched.ingredients && Boolean(formik.errors.ingredients)}>
                <InputLabel id="ingredient-multiple-chip-label">
                  Ingredientes
                </InputLabel>
                <Select
                  labelId="ingredient-multiple-chip-label"
                  id="ingredient-multiple-chip"
                  multiple
                  name="ingredients"
                  value={formik.values.ingredients}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  input={
                    <OutlinedInput
                      id="select-multiple-chip"
                      label="ingredientes"
                    />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value.id} label={value.name} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {ingredients.ingredients?.map((item) => (

                    <MenuItem
                      key={item.id}
                      value={item}
                      sx={{ color: 'white' }}
                    // style={getStyles(name, personName, theme)}
                    >

                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
                {formik.touched.ingredients && formik.errors.ingredients && (
                  <p className="text-red-100 text-xs mt-1">{formik.errors.ingredients}</p>
                )}
              </FormControl>
            </Grid>
            {/* is vetegetarian*/}
            <Grid item size={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="vegetarian">Es Vegetariano</InputLabel>
                <Select
                  id="vegetarian"
                  name="vegetarian"
                  label="Is Vegetarian"
                  onChange={formik.handleChange}
                  value={formik.values.vegetarian}
                >
                  <MenuItem value={true}>Si</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {/* Is Seasonal*/}
            <Grid item size={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="seasonal">Temporal</InputLabel>
                <Select
                  id="seasonal"
                  name="seasonal"
                  label="Is Seasonal"
                  onChange={formik.handleChange}
                  value={formik.values.seasonal}
                >
                  <MenuItem value={true}>Si</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {/* --------------------------------------------------------------*/}
          </Grid>

          <Button variant="contained" color="primary" type="submit">
            Crear Menu
          </Button>
        </form>

      </div>

      <Snackbar
        sx={{ zIndex: 50 }}
        open={openSnackBar}
        autoHideDuration={3000}
        onClose={handleCloseSnackBar}
        // handleClose={handleCloseSnackBar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity={menu.error ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {menu.message || auth.error}
        </Alert>
      </Snackbar>

    </div> //final div

  );
};

export default AddMenuForm
