import { CssBaseline, ThemeProvider } from '@mui/material';
import './App.css';

import Navbar from './components/Navbar/Navbar';
import darkTheme from './Theme/DarkTheme';
import Home from './components/Home/Home';
import RestaurantDetails from './components/Restaurant/RestaurantDetails';
import Cart from './components/Cart/Cart';
import Profile from './components/Profile/Profile';
import CustomerRouter from './Routers/CustomerRouter';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUser } from './components/State/Authentication/Action';
import { findCart } from './components/State/Cart/Action';


function App() {
                  //send stock to the store.
  const dispatch= useDispatch(); 
  const jwt = localStorage.getItem("jwt");

  const {auth} = useSelector(store=>store);

  useEffect(()=>{
   dispatch(getUser(auth.jwt || jwt));
   dispatch(findCart(jwt));
  },[auth.jwt]);


  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
       
        <CustomerRouter/>
 
    </ThemeProvider>
   
  );
}

export default App;
