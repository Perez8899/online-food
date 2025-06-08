import { api } from "../../Config/Api";

// import { createOrderFailure, createOrderRequest, createOrderSuccess, getUsersOrdersFailure, getUsersOrdersRequest, getUsersOrdersSuccess } from "./ActionCreators";

import { CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, GET_USERS_NOTIFICATION_FAILURE, 
    GET_USERS_NOTIFICATION_REQUEST, 
    GET_USERS_NOTIFICATION_SUCCESS, 
    GET_USERS_ORDERS_FAILURE, 
    GET_USERS_ORDERS_REQUEST,
    GET_USERS_ORDERS_SUCCESS} from "./ActionTypes";


export const createOrder = (reqData) => {
  return async (dispatch) => {
    dispatch({type:CREATE_ORDER_REQUEST});
    try {
      const {data} = await api.post('/api/order', reqData.order,{
        headers: {
            Authorization: `Bearer ${reqData.jwt}`,
          },
      });
//INTEGRACION DE PAGOS-----------------------------------------------   
    //   if(data.payment_url){
    //     window.location.href=data.payment_url;
    //   }
      console.log("created order data",data)
      dispatch({type:CREATE_ORDER_SUCCESS, payload:data});
    } catch (error) {
      console.log("error ",error)
      dispatch({type:CREATE_ORDER_SUCCESS, payload:error});
    }
  };
};


export const getUsersOrders = (jwt) => {
  return async (dispatch) => {
    dispatch({type:GET_USERS_ORDERS_REQUEST});
    try {
      const {data} = await api.get(`/api/order/user`,{
        headers: {
            Authorization: `Bearer ${jwt}`,
          },
      });
      console.log("users order ",data)
      dispatch({type:GET_USERS_ORDERS_SUCCESS, payload:data});
    } catch (error) {
      dispatch({type:GET_USERS_ORDERS_FAILURE, payload:error});
    }
  };
};


export const getUsersNotificationAction = () => { //NO SE HISO- se ara mas adelante -----------------------
  return async (dispatch) => {
    dispatch({type:GET_USERS_NOTIFICATION_REQUEST});
    try {
      const {data} = await api.get('/api/notifications');
     
      console.log("all notifications ",data)
      dispatch({type:GET_USERS_NOTIFICATION_SUCCESS,payload:data});
    } catch (error) {
      console.log("error ",error)
      dispatch({type:GET_USERS_NOTIFICATION_FAILURE,payload:error});
    }
  };
};
