import React, { useEffect } from 'react'
import { motion } from "framer-motion";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCartAction } from '../State/Cart/Action';
import { Button } from '@mui/material';
import { green } from '@mui/material/colors';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const navigateToHome = () => navigate("/"); //go to HOME
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearCartAction());
  }, []);

  return (
    <div className="min-h-screen  px-5">
      <div className="flex flex-col items-center justify-center h-[90vh]">
        <motion.div
          className="box w-full lg:w-1/4 flex flex-col items-center rounded-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <TaskAltIcon sx={{ fontSize: "5rem", color: green[600] }} />
          </motion.div>

          <h1 className="py-5 text-2xl font-semibold">Orden Exitosa !</h1>
          <p className="py-3 text-center text-black">
            ¡Muchas gracias por preferirnos! Tu orden es muy importante para nosotros
          </p>
          <p className="py-2 text-center text-white text-lg">
            ¡Disfruta tu día al máximo!
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >


            <motion.div                         //exit button animation
              animate={{ opacity: [1, 0.5, 1] }} 
              transition={{
                duration: 1.5,
                repeat: Infinity, 
                ease: "easeInOut"
              }}
              whileHover={{ opacity: 1 }} 
            >
              <Button
                variant="contained"
                className="my-5"
                sx={{ margin: "1rem 0rem" }}
                onClick={navigateToHome}
              >
                Ir al Inicio
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};


export default PaymentSuccess
