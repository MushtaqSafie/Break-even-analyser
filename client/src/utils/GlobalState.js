import React, { createContext, useReducer, useContext } from "react";
import { USER_LOGIN, USER_LOGOUT, USER_REGISTER } from "./actions";

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
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };

