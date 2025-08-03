import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,

} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useState } from 'react'
import { categorizeIngredients } from '../Util/CategoriseIngredients';
import { addItemToCart } from '../State/Cart/Action';
import { useDispatch } from 'react-redux';


const demo = [
  {
    category: "Proteinas",
    ingredients: ["Tiras de Tocino"]
  },
  {
    category: "Vegetales",
    ingredients: ["Lechuga", "Tomate", "Cebolla"]
  }
]
const MenuCard = ({ item }) => {
  const dispatch = useDispatch();
  const [selectedIngredients, setSelectedIngredients] = useState([])

  //select ingredient
  const handleCheckBoxChange = (itemName) => {
    console.log("value", itemName)
    if (selectedIngredients.includes(itemName)) {
      console.log("no");
      setSelectedIngredients(selectedIngredients.filter((item) => item !== itemName)
      );
    } else {
      console.log("yes");
      setSelectedIngredients([...selectedIngredients, itemName]); //no tiene el  set es Selected...
    }
  }

  const handleAddItemToCart = (e) => {
    e.preventDefault() //view the ingredients in the cart on the console
    const reqData = {
      token: localStorage.getItem("jwt"),
      cartItem: {    //REQUEST ...class AddCartItemRequest in java
        menuItemId: item.id,
        quantity: 1,
        ingredients: selectedIngredients,
      },
    };
    console.log("req data", reqData)
    dispatch(addItemToCart(reqData))
  };



  {/**Menu of restaurant */ }
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <div className='lg:flex items-center justify-between'>
          <div className="lg:flex items-center lg:space-x-5">
            <img
              className="w-[7rem] h-[7rem] object-cover"
              src={item.images[0]}
              alt=""
            />

            <div className="space-y-1 lg:space-y-5 lg:max-w-2xl">
              <p className="font-semibold text-xl">{item.name}</p>
              <p>₡{item.price}</p>
              <p className="text-gray-400">{item.description}</p>
            </div>
          </div>
        </div>
      </AccordionSummary>


      <AccordionDetails>  {/**Minimize information of menuItemCard */}
        <form onSubmit={handleAddItemToCart}>
          <div className='flex gap-5 flex-wrap'>
            {Object.keys(categorizeIngredients(item?.ingredients))?.map((category) => (
              <div className="pr-5">
                <p>{category}</p>
                <FormGroup>
                  {categorizeIngredients(item?.ingredients)[category].map((item) =>( 
                    <FormControlLabel
                      key={item.id}
                      control={
                        <Checkbox
                          checked={selectedIngredients.includes(
                            item.name
                          )}
                          onChange={() => handleCheckBoxChange(item.name)}
                          disabled={!item.inStoke}
                        />
                      }
                      label={item.name}
                    />))}
                </FormGroup>
              </div>))}
          </div>

          <div className='pt-5'>
            <Button variant="contained" disabled={!item.available}
              type="submit">{item.available ? "Agregar al carrito" : "No Disponible"}
            </Button>

          </div>
        </form>
      </AccordionDetails>
    </Accordion>


  )
}

export default MenuCard
