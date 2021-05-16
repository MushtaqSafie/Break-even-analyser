import React, { createContext, useReducer, useContext } from "react";
import { USER_LOGIN, USER_LOGOUT, USER_REGISTER, GET_PRODUCTS, ADD_PRODUCTS, GET_FIXEDCOST, ADD_FIXEDCOST, GET_MATERIALCOST, ADD_MATERIALCOST } from "./actions";

const StoreContext = createContext();
const { Provider } = StoreContext;

const reducer = (state, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        user: action.user
      }
  
    case USER_LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: {
          id: 0,
          first_name: "",
          last_name: "",
          email_address: ""
        }
      }
  
    case USER_REGISTER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.user
      }

    case GET_PRODUCTS:
      return {
        ...state,
        productsInfo: action.products
      }

    case ADD_PRODUCTS:
      return {
        ...state,
        productsInfo: [action.product, ...state.productsInfo]
      }

    case GET_FIXEDCOST:
      return {
        ...state,
        fixedCosts: action.fixedCosts
      }

    case ADD_FIXEDCOST:
      return {
        ...state,
        fixedCosts: [action.fixedcost, ...state.fixedCosts]
      }  

    case GET_MATERIALCOST:
      return {
        ...state,
        materialCosts: action.materialCosts
      }

    case ADD_MATERIALCOST:
      return {
        ...state,
        materialCosts: [action.materialCost, ...state.materialCosts]
      }  

    default:
      return state;
  }
};

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useReducer(reducer, {
    isAuthenticated: false,
    user: {
      id: 0,
      first_name: "",
      last_name: "",
      email_address: ""
    },
    productsInfo: [],
    fixedCosts: [],
    materialCosts: []
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };

