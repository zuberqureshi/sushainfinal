import Axios, { AxiosRequestConfig } from "axios";
 import { useContext } from "react";
// import { getAccessToken } from "./network";
// import { getAuthValue } from "../hooks/common/useAuthValue";
import { API_BASE_URL, } from '@env'

export const fetcher = async (config: AxiosRequestConfig) => {
  // const authContext = useContext(AuthContext);
  // console.log( 'cauthin fetcher',authContext )

   var token = '';
  // var localStorage:any =   await getAccessToken() ;
  // if( localStorage){
  // localStorage = JSON.parse( localStorage );
  //   token =   localStorage.accessToken;
  // } 
  const { url, method, data, headers } = config;
 
//  const API_uri = 'https://api-dev.merabuddy.online/';

 console.log('tokenfetcher',token)
  return await Axios.request({
    baseURL: `http://3.110.107.128:3006/api/v1/`,
    url,
    method: method ?? 'GET',
    data,
    ...config,
    headers: {
      Authorization: `Bearer ${token}`,
      ...config?.headers,
      ...headers,
    },
  });
};