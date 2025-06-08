import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../State/Authentication/Action';

const initialValues = {
  fullName: "",
  email: "",
  password: "",
  role: "ROLE_CUSTOMER",
};

const RegisterForm = () => {
  const navigate=useNavigate()
  const dispatch= useDispatch()

  const handelSubmit = (values) => {
    console.log("Form Values",values);
    dispatch(registerUser({userData:values, navigate}))
  }


  return (
   <div>
      <Typography className="text-center " variant="h5">
        Registrarse
      </Typography>

      <Formik initialValues={initialValues}
        onSubmit={handelSubmit}>

        <Form>
{/**FULL NAME */}
        <Field
              as={TextField}
              variant="outlined"
              margin="normal"
              fullWidth
              label="Full Name"
              name="fullName"
              id="fullName"
              autoComplete="fullName"
        />
{/**EMAIL*/}           
        <Field
            as={TextField}
            margin="normal"
            variant="outlined"
            fullWidth
            label="Email Address"
            name="email"
        />
{/**PASSWORD */}
        <Field
            as={TextField}
            variant="outlined"
            margin="normal"
            fullWidth
            label="Password"
            name="password"
            type="password"
        />
{/**ROLE*/}
           <FormControl fullWidth  margin="normal">
          <InputLabel id='demo-simple-select-select-label'>Roll</InputLabel>
          <Field
              className="mt-3"
              as={Select}
              variant="outlined"
              fullWidth
              name="role"
              id="role"
              // autoComplete="role"
            >
              <MenuItem value="ROLE_CUSTOMER">Cliente</MenuItem>
              <MenuItem value="ROLE_RESTAURANT_OWNER">Dueno Restaurante</MenuItem>
            </Field>
            </FormControl>
        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
        >
            Registrarse
        </Button>
      </Form>

    </Formik>

{/** Don\'t have an account? , send it to registration*/}
      <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 3 }}>
        {'Ya tienes una cuenta? '}
        <Button>
          <Button onClick={() => navigate("/account/login")}>
            Login
          </Button>
        </Button>
      </Typography>
    </div>
  )
}

export default RegisterForm


