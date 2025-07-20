import React from 'react'
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
} from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { updateRestaurantStatus } from '../../components/State/Restaurant/Action';

const RestaurantDetails = () => {
  const dispatch = useDispatch();
  const { auth, restaurant, ingredients } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  const handleRestaurantStatus = () => {
    dispatch(
      updateRestaurantStatus({
        restaurantId: restaurant.usersRestaurant.id,
        jwt: auth.jwt || jwt,
      })
    );

  }
  return (
    <div className="lg:px-20 px-5">
      <div className="py-5 flex justify-center items-center gap-5">

        <h1 className="text-2xl lg:text-7xl text-center font-bold p-5">
          {restaurant.usersRestaurant?.name}
        </h1>

        <div>
          <Button
            onClick={handleRestaurantStatus}
            size="large"
            //sx={{ padding: "1rem 2rem" }}
            className="py-[1rem] px-[2rem]"
            variant="contained"
            color={restaurant.usersRestaurant?.open ? "error" : "primary"}
          //{true ? "error" : "primary"}
          >
            {restaurant.usersRestaurant?.open
              ? "Cerrar"
              : "Abrir"}
          </Button>
        </div>

      </div>

      <Grid container spacing={2}>
{/* Restaurant owner */}
        <Grid item xs={12}>
          <Card>
            <CardHeader title={<span className="text-gray-300"> Restaurante</span>} />
            <CardContent>
              <div className="space-y-4 text-gray-200">
                <div className="flex">
                  <p className="w-48">Dueño</p>
                  <p className="text-gray-400">
                    {" "}
                    <span className="pr-5">-</span>{" "}
                    {restaurant.usersRestaurant?.owner.fullName}
                  </p>
                </div>
                {/* ----------------------------------------------------------------- */}
                <div className="flex">
                  <p className="w-48">Nombre Restaurante</p>
                  <p className="text-gray-400">
                    {" "}
                    <span className="pr-5">-</span>{" "}
                    {restaurant.usersRestaurant?.name}
                  </p>
                </div>
                {/* ----------------------------------------------------------------- */}
                <div className="flex">
                  <p className="w-48">Tipo de Platillo</p>
                  <p className="text-gray-400">
                    {" "}
                    <span className="pr-5">-</span>{" "}
                    {restaurant.usersRestaurant?.cuisineType}
                  </p>
                </div>
                {/* ----------------------------------------------------------------- */}
                <div className="flex">
                  <p className="w-48">Horario Apertura</p>
                  <p className="text-gray-400">
                    {" "}
                    <span className="pr-5">-</span>{" "}
                    {restaurant.usersRestaurant?.openingHours}
                  </p>
                </div>
                {/* ----------------------------------------------------------------- */}
                <div className="flex">
                  <p className="w-48">Estado</p>
                  <p className="text-gray-400">
                    {" "}
                    <span className="pr-5">-</span>{" "}

                    {restaurant.usersRestaurant?.open ? (
                      <span className="px-5 py-2 rounded-full bg-[#7de51c]  text-gray-950">
                        Abierto
                      </span>
                    ) : (
                      <span className="text-black px-5 py-2 rounded-full bg-red-400">
                        Cerrado
                      </span>
                    )}

                  </p>
                </div>
              </div>
            </CardContent>

          </Card>
        </Grid>
{/* Address */}
        <Grid item xs={12} lg={6}>
          <Card>
            <CardHeader title={<span className="text-gray-300">Direccion</span>} />
            <CardContent>
              <div className="space-y-4 text-gray-200">
                <div className="flex">
                  <p className="w-48">Pais</p>
                  <p className="text-gray-400">
                    {" "}
                    <span className="pr-5">-</span>{" "}
                     {restaurant.usersRestaurant?.address.country}
                  </p>
                </div>
                {/* ----------------------------------------------------------------- */}
                <div className="flex">
                  <p className="w-48">Ciudad</p>
                  <p className="text-gray-400">
                    {" "}
                    <span className="pr-5">-</span>{" "}
                     {restaurant.usersRestaurant?.address.city}
                  </p>
                </div>
                {/* ----------------------------------------------------------------- */}
                <div className="flex">
                  <p className="w-48">Codigo Postal</p>
                  <p className="text-gray-400">
                    {" "}
                    <span className="pr-5">-</span>{" "}
                     {restaurant.usersRestaurant?.address.postalCode}
                  </p>
                </div>
                {/* ----------------------------------------------------------------- */}
                <div className="flex">
                  <p className="w-48">Calle</p>
                  <p className="text-gray-400">
                    {" "}
                    <span className="pr-5">-</span>{" "}
                     {restaurant.usersRestaurant?.address.streetAddress}
                  </p>
                </div>
                {/* ----------------------------------------------------------------- */}

              </div>
            </CardContent>

          </Card>
        </Grid>
{/* Restaurant Contact */}
        <Grid item xs={12} lg={6}>
          <Card>
            <CardHeader title={<span className="text-gray-300"> Contacto</span>} />
            <CardContent>
              <div className="space-y-4 text-gray-200">

                {/* ----------------------------------------------------------------- */}
                <div className="flex">
                  <p className="w-48">Email </p>
                  <p className="text-gray-400">
                    {" "}
                    <span className="pr-5">-</span>{" "}
                    {restaurant.usersRestaurant?.contactInformation.email}
                  </p>
                </div>
                {/* ----------------------------------------------------------------- */}
                <div className="flex">
                  <p className="w-48">Telefono</p>
                  <p className="text-gray-400">
                    {" "}
                    <span className="pr-5">-</span>{" "}
                    {restaurant.usersRestaurant?.contactInformation.mobile}
                  </p>
                </div>
                {/* ----------------------------------------------------------------- */}
                <div className="flex">
                  <p className="w-48">Red Social</p>
                  <div className="text-gray-400 flex items-center pb-3">
                    <span className="pr-5">-</span>
                    <a target="_blank" href={
                        restaurant.usersRestaurant?.contactInformation.instagram
                      }
                      rel="noreferrer"
                    > <InstagramIcon sx={{ fontSize: "3rem", "&:hover": { color: "#7de51c" } }} /> </a>
                    <a target="_blank" href={
                        restaurant.usersRestaurant?.contactInformation.twitter
                      }
                      rel="noreferrer"
                    > <TwitterIcon sx={{ fontSize: "3rem", "&:hover": { color: "#7de51c" } }} /> </a>
                    <a target="_blank" href={
                        restaurant.usersRestaurant?.contactInformation.instagram
                      }
                      rel="noreferrer"
                    > <LinkedInIcon sx={{ fontSize: "3rem", "&:hover": { color: "#7de51c" } }} /> </a>
                    <a target="_blank" href={
                        restaurant.usersRestaurant?.contactInformation.instagram
                      }
                      rel="noreferrer"
                    > <FacebookIcon sx={{ fontSize: "3rem", "&:hover": { color: "#7de51c" } }} /> </a>
                  </div>
                </div>
                {/* ----------------------------------------------------------------- */}

              </div>
            </CardContent>

          </Card>
        </Grid>

      </Grid>
    </div>
  )
}

export default RestaurantDetails
