 
import React,{useState,useEffect, useContext} from 'react'
import { fetcher } from '../../utils/fetcher';
class AuthService {

  queryKeys = {
    loginByPassword: 'loginByPassword',
    userRegister: 'userRegister',
    loginOtpVerify: 'loginOtpVerify',
    resendOtp: 'resendOtp',
  };

  loginByPassword = async (data:any) => {

    return fetcher({
      url: '/auth/login',
      method: 'POST',
      data
    });
 
  }

  userRegister = async (data:any) => {

    return fetcher({
      url: 'auth/loginotp',
      method: 'POST',
      data
    });
 
  }

 loginOtpVerify = async (data:any) => {

    return fetcher({
      url: 'auth/loginotpverify',
      method: 'POST',
      data
    });
 
  }

  resendOtp = async (data:any) => {

    return fetcher({
      url: 'auth/resendmobileotp',
      method: 'POST',
      data
    });
 
  }
   

}

export default new AuthService();