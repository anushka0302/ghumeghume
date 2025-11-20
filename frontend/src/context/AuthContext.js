import { createContext, useEffect, useReducer } from "react";

// NEW: Robust function to get initial user from localStorage
const getInitialUser = () => {
  const storedUser = localStorage.getItem('user');

  // If nothing is stored, or if it's the string "null" or "undefined",
  // then there is no user.
  if (!storedUser || storedUser === 'null' || storedUser === 'undefined') {
    return null;
  }

  try {
    // Try to parse the stored data
    return JSON.parse(storedUser);
  } catch (e) {
    // If it's invalid JSON, return null
    console.error("Failed to parse user from localStorage", e);
    return null;
  }
};

// Use the new function to set the initial state
const initial_state = {
  user: getInitialUser(),
  loading: false,
  error: null
};

export const AuthContext = createContext(initial_state);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        user: null,
        loading: true,
        error: null
      };
    case 'LOGIN_SUCCESS':
      return {
        user: action.payload,
        loading: false,
        error: null
      }
    case 'LOGIN_FAILURE':
      return {
        user: null,
        loading: false,
        error: action.payload
      }
    case 'REGISTER_SUCCESS':
      return {
        user: null,
        loading: false,
        error: null
      }
    case 'LOGOUT':
      return {
        user: null,
        loading: false,
        error: null
      }
    default:
      return state
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initial_state);

  useEffect(() => {
    // This effect now correctly stores either the user object or "null"
    localStorage.setItem('user', JSON.stringify(state.user));
  }, [state.user]);

  return <AuthContext.Provider value={{
    user: state.user,
    loading: state.loading,
    error: state.error,
    dispatch,
  }}>
    {children}
  </AuthContext.Provider>
}


/* NOTE: You also had your BASE_URL here.
   Make sure this logic is in your src/utils/config.js file
*/
/* export const BASE_URL='https://ghumeghume.onrender.com/api/v1';*/
// export const BASE_URL = 'http://localhost:4000/api/v1';