import React, { useReducer, createContext } from 'react';
import jwtDecode from 'jwt-decode';

const initialState = {
  user: null,
};

if (localStorage.getItem('jwtToken')) {
  const decodedToken = jwtDecode(localStorage.getItem('jwtToken'));

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem('jwtToken');
    initialState.user = null;
  } else {
    initialState.user = decodedToken;
  }
}

// will pass this context object to useContext to recieve new updated context
// parameter of createContext is the default value
const AuthContext = createContext({
  user: null,
  login: (userData) => {}, // login and logout are initialized to do nothing
  logout: () => {},
});

// reducer strictly defines actions

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
      };
    case 'LOGOUT': {
      return {
        ...state,
        user: null,
      };
    }
    default:
      return state;
  }
}

function AuthProvider({ children }) {
  // useReducer hooks gives us access to current state object and dispatch function
  const [state, dispatch] = useReducer(authReducer, initialState);

  // defining login and logout functions on user given back from context
  function login(userData) {
    localStorage.setItem('jwtToken', userData.token);
    dispatch({
      type: 'LOGIN',
      payload: userData,
    });
  }

  function logout() {
    localStorage.removeItem('jwtToken');
    dispatch({
      type: 'LOGOUT',
    });
  }

  return (
    // value is what we can retrieve from the context
    <AuthContext.Provider value={{ user: state.user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
// AuthContext to access context
// AuthProvider wraps entire app

export { AuthContext, AuthProvider };
