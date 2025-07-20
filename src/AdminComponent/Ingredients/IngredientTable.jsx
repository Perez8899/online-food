import { Box, Button, Card, CardHeader, Fade, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useState } from 'react'
import { Create, Delete, Remove } from "@mui/icons-material";
import { useDispatch, useSelector } from 'react-redux';
import CreateIngredientForm from './CreateIngredientForm';
import CreateIngredientCategoryForm from './CreateIngredientCategory';
import { updateStockOfIngredient } from '../../components/State/Ingredients/Action';

const orders = [1, 1, 1, 1, 1, 1, 1];
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'secondary.main',
  boxShadow: 24,
  outline: "none",
  p: 4,
};

const IngredientTable = () => {
  const dispatch = useDispatch();
  const { auth, restaurant, ingredients } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  const [openIngredientCategory, setOpenIngredientCategory] = useState(false);
  const handleOpenIngredientCategory = () => setOpenIngredientCategory(true);
  const handleCloseIngredientCategory = () => setOpenIngredientCategory(false);

  const [openIngredient, setOpenIngredient] = useState(false);
  const handleOpenIngredient = () => setOpenIngredient(true);
  const handleCloseIngredient = () => setOpenIngredient(false);

     const handleUpdateStocke = (id) => {
    dispatch(updateStockOfIngredient({ id, jwt }));
  };

  return (
// MenuTable header
    <Box>
      <Card className='mt-1'>
        <CardHeader
          action={
            <IconButton onClick={handleOpenIngredient}>
              <Create color="primary" />

            </IconButton>
          }

          title={"Ingredientes"}
          sx={{
            pt: 2,
            alignItems: "center",
            "& .MuiCardHeader-action": { mt: 0.6 },
          }} />
{/* MenuTable body */}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>

                <TableCell align="">Id</TableCell>
                <TableCell align="right ">Nombre</TableCell>
                <TableCell align="right">Categoria</TableCell>
                <TableCell align="right">Disponible</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {ingredients.ingredients.map((item, index) => (
                <TableRow
                  key={item.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item.id}
                  </TableCell>
                  <TableCell align="left">{item.name}</TableCell>
                  <TableCell align="right">{item.category.name}</TableCell>

                  <TableCell align="right">
                    <Button onClick={() => handleUpdateStocke(item.id)}
                    color={item.inStoke ? "primary" : "error"}
                    variant='contained'
                    >
                      {item.inStoke ? "Disponible" : "No Disponible"}
                    </Button>
                  </TableCell>

 
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <Modal
        open={openIngredient}
        onClose={handleCloseIngredient}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Fade in={openIngredient} timeout={900}>
          <Box sx={style}>
            <CreateIngredientForm handleClose={handleCloseIngredient} />
          </Box>
        </Fade>
        
      </Modal>

      <Modal
        open={openIngredientCategory}
        onClose={handleCloseIngredientCategory}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CreateIngredientCategoryForm
            handleClose={handleCloseIngredientCategory}
          />
        </Box>
      </Modal>
    </Box>
  )
}

export default IngredientTable
