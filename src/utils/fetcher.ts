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
 
 const API_uri = 'http://43.205.130.207/api/v1/';

 console.log('tokenfetcher',token)
  return await Axios.request({
    baseURL: API_BASE_URL,
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