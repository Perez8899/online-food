import { Avatar, Backdrop, Box, Button, Card, CardHeader, Chip, CircularProgress, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect } from 'react'
import { Create, Delete, Remove } from "@mui/icons-material";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFoodAction, getMenuItemsByRestaurantId, updateMenuItemsAvailability } from '../../components/State/Menu/Action';
import { categorizedIngredients } from '../util/CategorizeIngredients';
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import DeleteIcon from "@mui/icons-material/Delete";

//const orders = [1, 1, 1, 1, 1, 1, 1];

const MenuTable = ({ isDashboard, name}) => {
   const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { menu, ingredients, restaurant,auth } = useSelector((store) => store);
  const { id } = useParams();
  const jwt=localStorage.getItem("jwt");

  useEffect(() => {
    
      if(restaurant.usersRestaurant){
       dispatch( getMenuItemsByRestaurantId({
        restaurantId: restaurant.usersRestaurant?.id,
        jwt: localStorage.getItem("jwt"),
        seasonal: false,
        vegetarian: false,
        nonveg: false,
        foodCategory: "",
      }));
      }
      
    
  }, [ingredients.update,restaurant.usersRestaurant]);

  // console.log(
  //   "-------- ",
  //   menu.menuItems[1].ingredients,
  //   categorizedIngredients(menu.menuItems[1].ingredients)
  // );

  

  const handleFoodAvialability = (foodId) => {
    dispatch(updateMenuItemsAvailability({foodId,jwt:auth.jwt || jwt}));
  };

  const handleDeleteFood = (foodId) => {
    dispatch(deleteFoodAction({foodId,jwt:auth.jwt || jwt}));
  };

  return (
 // MenuTable header
    <Box>
      <Card className='mt-1'>
        <CardHeader 
        action={
             <IconButton onClick={() => navigate("/admin/restaurants/add-menu")}> 
              <Create color="primary"/>
            </IconButton>
          }

        title={"Menu"}
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
                
                <TableCell align="">Imagen</TableCell>
                <TableCell align="">Titulo</TableCell>
                <TableCell align="">Ingredientes</TableCell>
                <TableCell align="right">Precio</TableCell>
                <TableCell align="center">Disponible</TableCell>
                <TableCell align="center">Eliminar</TableCell>
                
               </TableRow>
            </TableHead>
            <TableBody>
              {menu.menuItems?.map((item) => (
                <TableRow
                  hover
                  key={item.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  
                  <TableCell>
                    {" "}
                    <Avatar alt={item.name} src={item.images[0]} />{" "}
                  </TableCell>
                  <TableCell align="">{item.name}</TableCell>
{/* Ingredients List -------------------------------------------------------------------*/}
                 <TableCell>
                      {Object.keys(
                        categorizedIngredients(item?.ingredients)
                      )?.map((category) => (
                        <div key={category}>
                          <p className="font-semibold">{category}</p>
                          <div className="pl-5">
                            {categorizedIngredients(item?.ingredients)[
                              category
                            ].map((ingredient, index) => (
                              <div
                                key={ingredient.id}
                                className="flex gap-1 items-center"
                              >
                                <div>
                                  <HorizontalRuleIcon
                                    sx={{ fontSize: "1rem" }}
                                  />
                                </div>
                                <div
                                  key={ingredient.id}
                                  className="flex gap-4 items-center"
                                >
                                  <p>{ingredient.name}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                  </TableCell>

                  <TableCell align="right">₡ {item.price}</TableCell>
{/* Stock -------------------------------------------------------------------*/}
                  <TableCell sx={{ textAlign: "center" }}>
                    <Button 
                      color={item.available ? "success" : "error"}
                      variant='text'
                      onClick={() => handleFoodAvialability(item.id)}
                       sx={{ fontWeight: 'bold' }}
                    >
                      {item.available ? "Disponible" : "No Disponible"}
                    </Button>
                  </TableCell>
{/* delete */}
                  <TableCell sx={{ textAlign: "center" }}>
                      <IconButton onClick={() => handleDeleteFood(item.id)}>
                        <DeleteIcon color="error" />
                      </IconButton>
                    </TableCell>
                 
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

       <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={menu.loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default MenuTable
