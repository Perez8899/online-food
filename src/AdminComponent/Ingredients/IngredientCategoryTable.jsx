import { Box, Card, CardHeader, Fade, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'
import { Create, Delete, Remove } from "@mui/icons-material";
import { useState } from 'react';
import CreateIngredientForm from './CreateIngredientForm';
import CreateIngredientCategoryForm from './CreateIngredientCategory';
import { useDispatch, useSelector } from 'react-redux';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: 'secondary.main' ,
  boxShadow: 24,
  outline: "none",
  p: 4,
};

const orders = [1, 1, 1, 1, 1, 1, 1];


const IngredientCategoryTable = () => {
  const dispatch = useDispatch();
  const { auth, restaurant, ingredients } = useSelector((store) => store);

  const [openIngredientCategory, setOpenIngredientCategory] = useState(false);
    const handleOpenIngredientCategory = () => setOpenIngredientCategory(true);
    const handleCloseIngredientCategory = () => setOpenIngredientCategory(false);
   const jwt = localStorage.getItem("jwt");

  return (
 // MenuTable header
    <Box>
      <Card className='mt-1'>
        <CardHeader 
        action={
                         
             <IconButton onClick={handleOpenIngredientCategory}> 
              <Create color="primary"/>
            </IconButton>
          }

        title={"Categoria de Ingredientes"}
          sx={{
            pt: 2,
            alignItems: "center",
            "& .MuiCardHeader-action": { mt: 0.6 },
          }} />
  {/* MenuTable body */}
        <TableContainer component={Paper}>
          <Table  aria-label="simple table">
            <TableHead>
              <TableRow> 
                
                <TableCell align="">Id</TableCell>
                <TableCell align="right ">Nombre</TableCell>
             
               </TableRow>
            </TableHead>
            
            <TableBody>
              {ingredients.category?.map((item) => (
                <TableRow
                  key={item?.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item?.id}
                  </TableCell>

                  <TableCell align="">{item.name}</TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <Modal
        open={openIngredientCategory}
        onClose={handleCloseIngredientCategory}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Fade in={openIngredientCategory} timeout={900}> 
        <Box sx={style}>
          <CreateIngredientCategoryForm
            handleClose={handleCloseIngredientCategory}
          />
        </Box>
        </Fade>

      </Modal>
    </Box>
  )
}

export default IngredientCategoryTable
