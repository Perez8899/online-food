import { Button, Container, TextField, Typography, IconButton, InputAdornment } from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../State/Authentication/Action';
import * as Yup from "yup";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const initialValues = {
  email: "",
  password: "",
}

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Formato inválido de email")
    .required("Email es requerido"),
  password: Yup.string().required("Contraseña es requerida"),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (values) => {
    dispatch(loginUser({ userData: values, navigate }));
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container component="main" maxWidth="xs">
      <div>
        <Typography className="text-center" variant="h5">
          Login
        </Typography>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleBlur, values }) => (
            <Form>
              <TextField
                margin="normal"
                variant="outlined"
                fullWidth
                label="Email"
                name="email"
                id="email"
                autoComplete="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={
                  <ErrorMessage name="email">
                    {(msg) => (
                      <span style={{ color: '#808080' }}>{msg}</span>
                    )}
                  </ErrorMessage>
                }
              />

              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="Contraseña"
                name="password"
                id="password"
                autoComplete="current-password"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        edge="end"
                        aria-label="toggle password visibility"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                helperText={
                  <ErrorMessage name="password">
                    {(msg) => (
                      <span style={{ color: '#808080' }}>{msg}</span>
                    )}
                  </ErrorMessage>
                }
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{
                  mt: 2,
                  padding: "1rem",
                  "&:hover": {
                    backgroundColor: " #479b67",
                  },
                }}
              >
                Login
              </Button>
            </Form>
          )}
        </Formik>

        <Typography
          variant="body2"
          color="textSecondary"
          align="center"
          sx={{ mt: 3 }}
        >
          {'¿No tienes cuenta? '}
          <Button onClick={() => navigate("/account/register")}>
            Registrar
          </Button>
        </Typography>
      </div>
    </Container>
  );
};

export default LoginForm;
