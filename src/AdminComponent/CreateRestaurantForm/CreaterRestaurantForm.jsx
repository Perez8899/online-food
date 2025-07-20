import { Button, CircularProgress, Grid, IconButton, TextField } from '@mui/material'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CloseIcon from "@mui/icons-material/Close";
import { createRestaurant } from "../../components/State/Restaurant/Action"
import { uploadToCloudinary } from '../util/UploadToCloudinary';


const initialValues = {
  name: "",
  description: "",
  cuisineType: "",
  streetAddress: "",
  city: "",
  stateProvince: "",
  postalCode: "",
  country: "",
  email: "",
  mobile: "",
  twitter: "",
  instagram: "",
  openingHours: "Mon-Sun: 10:00 AM - 10:00 PM",
  images: [],
};

const CreaterRestaurantForm = () => {
  const [uploadImage, setUploadImage] = useState(false);
  const dispatch = useDispatch();
  const token = localStorage.getItem("jwt")

  const handleSubmit = (values) => {
    const data = {
      name: values.name,
      description: values.description,
      cuisineType: values.cuisineType,
      address: {
        streetAddress: values.streetAddress,
        city: values.city,
        stateProvince: values.stateProvince,
        postalCode: values.postalCode,
        country: values.country,
      },
      contactInformation: {
        email: values.email,
        mobile: values.mobile,
        twitter: values.twitter,
        instagram: values.instagram,
      },
      openingHours: values.openingHours,
      images: values.images,
    };
    dispatch(createRestaurant({ data, token }));
    console.log("data", data);
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
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

  return (
    <div className="py-10 px-5 lg:flex items-center justify-center min-h-screen">
      <div className="lg:max-w-4xl ">

        <h1 className="font-bold text-2xl text-center py-2">
          No Tienes Restaurante Registrado! Agregar Tu Restaurante
        </h1>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <Grid container spacing={2}>
{/* --------------------------------------------------------------*/}
            <Grid className="flex flex-wrap gap-5" item size={12}>
              {/* add restaurant image */}
              <input
                type="file"
                accept="image/*"
                id="fileInput"
                style={{ display: "none" }}
                onChange={handleImageChange}
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

            </Grid>
{/* --------------------------------------------------------------*/}
            <Grid item size={12}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Nombre"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
            </Grid>

            <Grid item size={12}>
              <TextField
                fullWidth
                id="description"
                name="description"
                label="Descripcion"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.description}
              />
            </Grid>
            <Grid item size={6}>
              <TextField
                fullWidth
                id="cuisineType"
                name="cuisineType"
                label="Tipo Comida"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.cuisineType}
              />
            </Grid>
            <Grid item size={6}>
              <TextField
                fullWidth
                id="openingHours"
                name="openingHours"
                label="Hora Apertura"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.openingHours}
              />
            </Grid>
            <Grid item size={12}>
              <TextField
                fullWidth
                id="streetAddress"
                name="streetAddress"
                label="Direccion"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.streetAddress}
              />
            </Grid>
            <Grid item size={4}>
              <TextField
                fullWidth
                id="city"
                name="city"
                label="Ciudad"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.city}
              />
            </Grid>
            <Grid item size={4}>
              <TextField
                fullWidth
                id="stateProvince"
                name="stateProvince"
                label="Estado/Provincia"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.stateProvince}
              />
            </Grid>
            <Grid item size={4}>
              <TextField
                fullWidth
                id="postalCode"
                name="postalCode"
                label="Codigo Postal"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.postalCode}
              />
            </Grid>
            <Grid item size={12}>
              <TextField
                fullWidth
                id="country"
                name="country"
                label="Pais"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.country}
              />
            </Grid>
            <Grid item size={6}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
            </Grid>
            <Grid item size={6}>
              <TextField
                fullWidth
                id="mobile"
                name="mobile"
                label="Telefono"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.mobile}
              />
            </Grid>
            <Grid item size={6}>
              <TextField
                fullWidth
                id="twitter"
                name="twitter"
                label="Twitter X"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.twitter}
              />
            </Grid>
            <Grid item size={6}>
              <TextField
                fullWidth
                id="instagram"
                name="instagram"
                label="Instagram"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.instagram}
              />
            </Grid>
{/* --------------------------------------------------------------*/}
          </Grid>

          <Button variant="contained" color="primary" type="submit">
            Crear Restaurante
          </Button>
        </form>

      </div>
    </div> //final div
  );
};

export default CreaterRestaurantForm
