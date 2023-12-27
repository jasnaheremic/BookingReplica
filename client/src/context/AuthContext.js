/*import { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    loading: false,
    error: null
};

export const AuthContext = createContext(INITIAL_STATE)

const AuthReducer = (state,action) => {
    switch(action.type){
       case "LOGIN_START":
       return{
        user: null,
        loading: true,
        error: null
       };
       case "LOGIN_SUCCESS":
        return{
         user: action.playload,
         loading: false,
         error: null
        };
        case "LOGIN_FAILURE":
            return{
             user: null,
             loading: false,
             error: action.playload
            };
            case "LOGOUT":
                return{
                 user: null,
                 loading: true,
                 error: null
                };    
       default:
            return state;
    }
}

export const AuthContextProvider = ({children}) => {
    const [state,dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    useEffect(() =>{
        localStorage.setItem("user", JSON.stringify(state.user))
    },[state.user])

return(
    <AuthContext.Provider 
    value={{
        user:state.user, 
        loading:state.loading, 
        error: state.error, 
        dispatch
        }}>
        {children}
    </AuthContext.Provider>
)

}*/
/*
import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  // Function to set the user information
  const setUserInformation = (user) => {
    setUser(user);
    setLoading(false); // Set loading to false after user information is set
  };

  return (
    <AuthContext.Provider value={{ user, loading, setUserInformation }}>
      {children}
    </AuthContext.Provider>
  );
};*/

import { createContext, useReducer, useState } from "react";

export const AuthContext = createContext();

const INITIAL_STATE = {
  user: null,
  loading: false,
  error: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, INITIAL_STATE);

  const setUserInformation = (user) => {
    dispatch({ type: "LOGIN_SUCCESS", payload: user });
  };

  return (
    <AuthContext.Provider value={{ state, dispatch, setUserInformation }}>
      {children}
    </AuthContext.Provider>
  );
};



