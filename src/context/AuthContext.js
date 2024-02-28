//AuthContext.js
import React, {createContext, useState} from 'react';
 
const AuthContext = createContext(null);
const {Provider} = AuthContext;

const AuthProvider = ({children}) => {
  const [authState, setAuthState] = useState({
    accessToken: null,
    refreshToken: null,
    authenticated: false,
  });
  const [userInfo, setUserInfo] = useState({

    userUniqueId: null,
    userId: null,
    userName: null,
    userMobile: null,
  
  });
  const logout = async () => {
   // await Keychain.resetGenericPassword();
    setAuthState({
      accessToken: null,
      refreshToken: null,
      authenticated: false,
    });
  };

  const getAccessToken = () => {
    return authState.accessToken;
  };

  return (
    <Provider
      value={{
        authState,
        userInfo,
        getAccessToken,
        setAuthState,
        setUserInfo,
        logout,
      }}>
      {children}
    </Provider>
  );
};

export {AuthContext, AuthProvider};