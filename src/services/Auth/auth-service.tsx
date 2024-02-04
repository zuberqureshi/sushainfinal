 
import React,{useState,useEffect, useContext} from 'react'
import { fetcher } from '../../utils/fetcher';
class AuthService {

  queryKeys = {
    loginByPassword: 'loginByPassword'
  };

  loginByPassword = async (data:any) => {

    return fetcher({
      url: '/auth/login',
      method: 'POST',
      data
    });
 
  
    
  }


   

}

export default new AuthService();