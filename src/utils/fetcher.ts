import Axios, { AxiosRequestConfig } from "axios";
 import { useContext } from "react";
// import { getAccessToken } from "./network";
// import { getAuthValue } from "../hooks/common/useAuthValue";
 

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
 
 const API_uri = 'https://api-dev.merabuddy.online/';

 console.log('tokenfetcher',token)
  return await Axios.request({
    baseURL: API_uri,
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