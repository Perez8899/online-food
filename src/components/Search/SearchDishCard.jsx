import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardContent, CardHeader, IconButton } from "@mui/material";
import EastIcon from "@mui/icons-material/East";
import { addItemToCart } from '../State/Cart/Action'

const SearchDishCard = ({ item }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    if (!item) {
        return null; 
    }


    const handleAddItemToCart = () => {
        if (!item?.id) {
            console.error("No se puede agregar: agrega un menu");
            return;
        }

        const data = {
            token: localStorage.getItem("jwt"),
            cartItem: {
                menuItemId: item.id,
                quantity: 1,
            }
        }
        dispatch(addItemToCart(data)) //What the customer is looking for appears in your restaurant
    }
    return (
        <Card className=" m-3">
            <CardHeader className="text-sm"
                action={
                    <IconButton onClick={() => navigate(`/restaurant/${item.restaurant.address.city}/${item.restaurant.name}/${item.restaurant.id}`)} aria-label="settings"
                        disabled={!item.restaurant}>
                        <EastIcon />
                    </IconButton>
                }
                title={<p className="text-base"> {item.restaurant?.name} </p>}

            />
            <CardContent>
                <div>
                    <div className="flex justify-between">
                        <div className="w-[70%] space-y-2">

                            <p className="font-semibold">{item.name} </p>
                            <p> ₡ {item.price}</p>
                            <p className="text-gray-400 text-sm">
                                {item.description}
                            </p>
                        </div>
                        <div className="flex flex-col justify-center items-center space-y-2">
                            <img
                                className="w-[5rem] h-[5rem]"
                                src={item.images[0]}
                                alt={item.name || "Imagen del producto"}
                            />
                            {/* <Button onClick={handleAddItemToCart} size="small">Agregar</Button> */}
                        </div>
                    </div>
                </div>
            </CardContent>

        </Card>
    )
}

export default SearchDishCard
