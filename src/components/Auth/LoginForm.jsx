import { Button, TextField, Typography } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../State/Authentication/Action'

const initialValues = {
  email: "",
  password: "",
}

const LoginForm = () => {

  const navigate=useNavigate()
  const dispatch= useDispatch()

  const handelSubmit = (values) => {
/// You can handle login submission here, e.g., send data to your server
       dispatch(loginUser({userData:values, navigate}))
  }

  return (
/**form To log in */
    <div>
      <Typography className="text-center " variant="h5">
        Login
      </Typography>

      <Formik initialValues={initialValues}
        onSubmit={handelSubmit}>

        <Form>
          <Field
            as={TextField}
            margin="normal"
            variant="outlined"
            fullWidth
            label="Email Address"
            name="email"
          />
          <Field
            as={TextField}
            variant="outlined"
            margin="normal"
            fullWidth
            label="Password"
            name="password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2, padding: "1rem" }}
          >
            Login
          </Button>
        </Form>

      </Formik>

{/** Don\'t have an account? , send it to registration*/}
      <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 3 }}>
        {'No tengo Cuenta? '}
        <Button>
          <Button onClick={() => navigate("/account/register")}>
            Registrar
          </Button>
        </Button>
      </Typography>
    </div>
  )
}

export default LoginForm
