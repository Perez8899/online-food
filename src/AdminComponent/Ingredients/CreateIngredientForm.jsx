

import React, { useState } from 'react';
import { TextField, Button, makeStyles, Card, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Create } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { createIngredient } from '../../components/State/Ingredients/Action'



const CreateIngredientForm = ({ handleClose }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { auth, restaurant, ingredients } = useSelector((store) => store)
  const jwt = localStorage.getItem("jwt")

  const [errors, setErrors] = useState({
    name: '',
    ingredientCategoryId: ''
  });

  const [formData, setFormData] = useState({
    name: '',
    ingredientCategoryId: ''
  });

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted:', formData);

    const newErrors = {
      name: formData.name.trim() === '' ? 'Por favor ingresa un nombre de Ingrediente' : '',
      ingredientCategoryId: !formData.ingredientCategoryId ? 'Selecciona una categoría' : ''
    };

    setErrors(newErrors);

    // If there is an error, the form will not be sent
    if (newErrors.name || newErrors.ingredientCategoryId) {
      return;
    }

    const data = { ...formData, restaurantId: restaurant.usersRestaurant.id }
    dispatch(createIngredient({ jwt: auth.jwt || jwt, data }))
    handleClose();

    setFormData({
      name: '',
      ingredientCategoryId: ''
    });
    setErrors({
      name: '',
      ingredientCategoryId: ''
    });

  };

  const handleInputChange = (event) => {

    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className=' '>
      <div className='p-5'>
        <h1 className='text-white text-center text-xl pb-10'>Crear Ingrediente</h1>
        <form className="space-y-5" onSubmit={handleFormSubmit}>
          <TextField
            label="Ingrediente"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            fullWidth
            error={Boolean(errors.name)}
            helperText={errors.name}
            sx={{
              '& .MuiFormHelperText-root.Mui-error': {
                color: '#fee2e2' 
              }
            }}
          />

          <FormControl fullWidth error={Boolean(errors.ingredientCategoryId)}>
            <InputLabel id="demo-simple-select-label">Categoría</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formData.ingredientCategoryId}
              label="Categoría"
              name='ingredientCategoryId'
              onChange={handleInputChange}
            >
              {ingredients.category.map((item) => (
                <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
              ))}
            </Select>
            {errors.ingredientCategoryId && (
              <p className="text-red-100 text-xs mt-1">{errors.ingredientCategoryId}</p>
            )}
          </FormControl>


          <Button type="submit" variant="contained" color="primary">
            Crear
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateIngredientForm;
