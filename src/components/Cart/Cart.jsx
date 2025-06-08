import { Box, Button, Card, Divider, Grid, Modal, TextField } from '@mui/material'
import React from 'react'
import CartItem from './CartItem'
import AddressCard from './AddressCard'
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { Store } from '@mui/icons-material';
import { cartTotal } from './totalPage';
import { createOrder } from '../State/Order/Action';

export const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  outline: 'none',
  boxShadow: 24,
  p: 4,
};
const initialValues = {
  state: "",
  pincode: "",
  city: ""
}
// const validationSchema = Yup.object.shape({
//   streetAddress: Yup.string().required("Direccion Obligatoria"),
//   state: Yup.string().required("State is required"),
//   pincode: Yup.string().required("Code is required")
//     .matches(/^\d{6}$/, "code must be 6 digits"),
//   city: Yup.string().required("City is required"),
// })

const Cart = () => {
  const createOrderUsingSelectedAddress = () => { }
  const handleOpenAddressModal = () => setOpen(true);
  //mui modal    
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  const { cart, auth} = useSelector(store => store)
  const dispatch = useDispatch()

  const handleSubmit = (values) => {
  const data = {jwt:localStorage.getItem("jwt"), //create-orders
      order: {
        restaurantId: cart.cartItems[0].food?.restaurant.id,
        deliveryAddress: {
          fullName: auth.user?.fullName,
          streetAddress: values.streetAddress,
          city: values.city,
          state: values.state,
          postalCode: values.pincode,
          country: "Costa Rica",
        },
      },
    }
    dispatch(createOrder(data))
    console.log("form value", values)
  };
  
  //calculate the total of the item
  const subtotal = cartTotal(cart.cartItems); //Item Total
  const iva = subtotal * 0.13;                //VAT(13%) 
  const totalPagar = subtotal + iva + 500 + 200;//Platform fee + Express

  return (
    <>
{/*address or add new address*/}
      <main className='lg:flex justify-between'>
        {/**selected food */}
        <section className='lg:w-[30%] space-y-6 lg:min-h-screen pt-10'>
          {cart.cartItems.map((item) => (
            <CartItem item={item}/>
            ))} {/**CartItem.jsx */}

          <Divider />

          {/**Bill Details */}
          <div className='billDetails px-5 text-sm"'>
            <p className='font-extralight py-5'>Detalles de la Factura</p>
            <div className='space-y-3'>
              <div className='flex justify-between text-white'>
                <p>Total Articulo</p>
                <p>₡{subtotal.toFixed(2)}</p>
              </div>
              <div className='flex justify-between text-white'>
                <p>Express</p>
                <p>₡500</p>
              </div>
              <div className='flex justify-between text-white'>
                <p>Tasa de plataforma</p>
                <p>₡200</p>
              </div>
              <div className='flex justify-between text-white'>
                <p>IVA(13%)</p>  {/* Calculate 13% of the total item */}
                <p>₡{iva.toFixed(2)}</p>
              </div>
              {/**total all payable */}
              <div className='flex justify-between text-white'>
                <p>Total Pagar</p>
                  <p>₡{
                       totalPagar.toFixed(2)
                  }</p>
              </div>
            </div>
          </div>
        </section>

        <Divider orientation="vertical" flexItem />
        {/* delivery address */}
        <section className='lg:w-[70%] flex justify-center px-5 pb-10 lg:pb-0'>
          <div className=''>
            <h1 className="text-center font-semibold text-2xl py-10">
              Elije Direccion de Entrega
            </h1>
            <div className='flex gap-5 flex-wrap justify-center'>
              {[1, 1, 1, 1, 1].map((item) => (<AddressCard
                handleSelectAddress={createOrderUsingSelectedAddress}
                item={item}
                showButton={true} />
              ))}

              {/**card add new address */}
              <Card className='flex space-x-5 w-64 p-5'>
                <AddLocationAltIcon />

                <div className="space-y-3 text-gray-500">
                  <h1 className="font-semibold text-lg text-white">Agregar Nueva Direccion</h1>

                  <Button
                    fullWidth onClick={handleOpenAddressModal}
                    variant="contained" //outlined
                    className="w-full" >
                    AGREGAR
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>

      </main>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/**box To add address information */}
        <Box sx={style}>
          <Formik initialValues={initialValues}
            // validationSchema={validationSchema}
            onSubmit={handleSubmit}>
              <Form>
              <Grid container spacing={2}>
{/* streetAddress               */}
              <Grid item xs={12}>
                <Field
                  name="streetAddress"
                  as={TextField}
                  label="Street Address"
                  fullWidth
                  variant="outlined"
                  // error={!ErrorMessage("streetAddress")}
                  // helperText={
                  //   <ErrorMessage name="streetAddress">
                  //     {(msg) => <span className="text-red-600">{msg}</span>}
                  //   </ErrorMessage>
                  // }
                />
              </Grid>
{/* state */}
              <Grid item xs={6}>
                <Field
                  name="state"
                  as={TextField}
                  label="state"
                  fullWidth
                  variant="outlined"
                  // error={!ErrorMessage("state")}
                  // helperText={
                  //   <ErrorMessage name="state">
                  //     {(msg) => <span className="text-red-600">{msg}</span>}
                  //   </ErrorMessage>
                  // }
                />
              </Grid>
{/* pincode */}
              <Grid item xs={6}>
                  <Field
                    name="pincode"
                    as={TextField}
                    label="Pincode"
                    fullWidth
                    variant="outlined"
                    // error={!ErrorMessage("pincode")}
                    // helperText={
                    //   <ErrorMessage name="pincode">
                    //     {(msg) => <span className="text-red-600">{msg}</span>}
                    //   </ErrorMessage>
                    // }
                  />
              </Grid> 
{/* city */}
              <Grid item xs={12}>
                  <Field
                    name="city"
                    as={TextField}
                    label="City"
                    fullWidth
                    variant="outlined"
                    // error={!ErrorMessage("city")}
                    // helperText={
                    //   <ErrorMessage name="city">
                    //     {(msg) => <span className="text-red-600">{msg}</span>}
                    //   </ErrorMessage>
                    // }
                  />
              </Grid>
{/* submit */}
              <Grid item xs={12}>
                  <Button type='submit' variant="contained" color="primary">
                    Entregar Aqui
                  </Button>
                </Grid>

            </Grid>
            </Form>

          </Formik>
        </Box>
      </Modal>
    </>
  )
}

export default Cart
