import Axios, { AxiosRequestConfig } from "axios";
 import { useContext } from "react";
 import { getAccessToken } from "./network";
// import { getAuthValue } from "../hooks/common/useAuthValue";
import { API_BASE_URL, } from '@env'

export const fetcher = async (config: AxiosRequestConfig) => {
  // const authContext = useContext(AuthContext);
  // console.log( 'cauthin fetcher',authContext )

   var token = '';
   let fetchToken =  JSON.parse( await getAccessToken('AccessTokenInfo') ); 
   var medType = await getAccessToken('medType')
   if(  fetchToken?.accessToken){
    token = fetchToken?.accessToken
   }

  // var localStorage:any =   await getAccessToken() ;
  // if( localStorage){
  // localStorage = JSON.parse( localStorage );
  //   token =   localStorage.accessToken;
  // } 
  const { url, method, data, headers } = config;
 
 const API_uri = 'http://43.205.130.207/api/v1/';

 console.log('tokenfetcher',token)
  return await Axios.request({
    baseURL: `http://13.232.170.16:3006/api/v1/`,
    url,
    method: method ?? 'GET',
    data,
    ...config,
    headers: {
      appType: medType,
      Authorization: `Bearer ${token}`,
      ...config?.headers,
      ...headers,
    },
  });
};