import { Button, TextField } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createCategoryAction } from '../../components/State/Restaurant/Action';

const CreateCategory = ({ handleClose }) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { auth, restaurant } = useSelector(store => store)
    const jwt = localStorage.getItem("jwt")
    const [formData, setFormData] = useState({
        categoryName: '',
        restaurantId: '',
    });

    const [error, setError] = useState({
        empty: false,
        exists: false
    });
    const [errorMessage, setErrorMessage] = useState('');

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (!formData.categoryName.trim()) {
            setError({...error, empty: true});
            setErrorMessage("El nombre de la categoria es Requerido");
            return;
        }

        const data = {
            name: formData.categoryName,
            restaurant: { id }
        };

        try {
            await dispatch(createCategoryAction({ reqData: data, jwt: auth.jwt || jwt }));
            setFormData({
                categoryName: '',
                restaurantId: '',
            });
            setError({empty: false, exists: false});
            setErrorMessage('');
            handleClose();
        } catch (err) {
            if (err.message.includes("Categoria ya existe")) {
                setError({...error, exists: true});
                setErrorMessage("Esta categoría ya existe para este restaurante");
            } else {
                setError({...error, exists: true});
                setErrorMessage("Error al crear la categoría");
            }
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        // Clear errors when typing
        if (value.trim() !== '') {
            setError({empty: false, exists: false});
            setErrorMessage('');
        }
    };

    return (
        <div className=''>
            <div className='p-5'>
                <h1 className='text-white text-center text-xl pb-10'>Crear Categoria</h1>
                <form className="space-y-5" onSubmit={handleFormSubmit}>
                    <TextField
                        label="Nombre Categoria"
                        name="categoryName"
                        value={formData.categoryName}
                        onChange={handleInputChange}
                        error={error.empty || error.exists}
                        helperText={errorMessage}
                        fullWidth
                        sx={{
                            '& .MuiFormHelperText-root': {
                                color: ' #f0aea0 ', 
                            }
                        }}
                    />

                    <Button type="submit" variant="contained" color="primary">
                        Crear
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default CreateCategory