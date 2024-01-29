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
    name: null,
    mobile: null,
    email: null,
    walletCoin: null,
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