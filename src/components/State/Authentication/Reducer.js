import { isPresentInFavorites } from "../../Config/Logic";
import {
    ADD_TO_FAVORITES_REQUEST, ADD_TO_FAVORITES_SUCCESS, GET_USER_FAILURE,
    GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT,
    REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, CLEAR_AUTH_MESSAGES
} from "./ActionType";

const initialState = {
    user: null,
    isLoading: false,
    error: null,
    jwt: null,
    favorities: [],
    success: null,
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
        case GET_USER_REQUEST:
        case ADD_TO_FAVORITES_REQUEST:
            return { ...state, isLoading: true, error: null, success: null };


        case REGISTER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                jwt: action.payload.jwt || action.payload,
                success: action.payload.message || "Registro exitoso",
                //   jwt: action.payload,
                //   success: "Registro Exitoso",
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                jwt: action.payload.jwt || action.payload,
                success: action.payload.message || "Inicio de sesión exitoso", // message from the bank end

                error: null,
                user: action.payload.user || null
            };

        case ADD_TO_FAVORITES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                //favorites:[action.payload,...state.favorites],
                favorities: isPresentInFavorites(state.favorities, action.payload)
                    ? state.favorities.filter((item) => item.id !== action.payload.id) //deleted if exist  restaurant favorite
                    : [action.payload, ...state.favorities],//add to favorite
            };

        case GET_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: action.payload,
                favorities: action.payload.favorities,
            };

        case REGISTER_FAILURE:
        case LOGIN_FAILURE:
        case GET_USER_FAILURE:
            return { ...state, isLoading: false, error: action.payload };

        case CLEAR_AUTH_MESSAGES:
            return { ...state, success: null, error: null };



        case LOGOUT:
            localStorage.removeItem("jwt");
            return {
                ...initialState,
                success: "Sesión cerrada correctamente"
            };
        //return initialState;
        //success: action.payload?.message || "Sesión cerrada correctamente"


        //localStorage.removeItem("jwt");
        //return { ...state, jwt: null, user: null, success: "login exitoso" };
        //?


        default:
            return state;
    }
}
