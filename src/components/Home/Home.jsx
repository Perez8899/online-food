import React, {useEffect } from 'react'
import "./Home.css"
import MultiItemCarousel from './MultiItemCarousel'
import RestaurantCard from '../Restaurant/RestaurantCard'
import { getAllRestaurantsAction } from '../State/Restaurant/Action'
import{ useDispatch, useSelector} from 'react-redux'

//const restaurants = [1, 1, 1, 1, 1, 1, 1, 1]
const Home = () => {

  //const { auth, restaurant} = useSelector((store) => store); //extracts data from the Redux store
  //const dispatch = useDispatch();                             //shoot an action

  //useEffect(() => {                                           //API calls
    //if (auth.user) {
     // dispatch(getAllRestaurantsAction(localStorage.getItem("jwt")));
    //}
  //}, [auth.user]);
  const dispatch = useDispatch();  
  const jwt = localStorage.getItem("jwt")
  const {restaurant} = useSelector(store => store);
  console.log("restaurant", restaurant)

  useEffect(() => {                                           //API calls
    dispatch(getAllRestaurantsAction(jwt));
  }, []);

    return (
    <div className='pb-10'>

      {/*phrases*/}
      <section className="banner -z-50 relative flex flex-col justify-center items-center">
        <div className="w-[50vw] z-10 text-center">
          <p className="z-10   text-gray-300 text-xl lg:text-4xl">
            "Ding dong" La comida ha
          </p>
          <p className='z-10   text-gray-300 text-xl lg:text-4xl'>llegado</p>
        </div>

        <div className="cover absolute top-0 left-0 right-0"></div>
        <div className="fadout"></div>
      </section>

      {/*carousel*/}
      <section className='p-10 lg:py-10 lg:px-20'>
        <p className='text-2x1 font-semibold text-white py-3 pb-10'>Platos principales de los restaurantes</p>
        <MultiItemCarousel />
      </section>

      {/*Restaurants*/}
      <section className="px-5 lg:px-20 pt-5">
        <div className="">
          <h1 className="text-2xl font-semibold text-white pb-10 ">
            ¡Elige tu restaurante favorito y haz tu pedido fácilmente desde la comodidad de tu hogar!
          </h1>
          <div className="flex flex-wrap items-center justify-around gap-5">
            {
              restaurant.restaurants.map((item) => <RestaurantCard data= {item} />)
            }
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
