import Axios, { AxiosRequestConfig } from "axios";
// import { getAuthValue } from "../hooks/common/useAuthValue";
import {API_BASE_URL } from '@env'


export const fetcher = async (config: AxiosRequestConfig) => {
  const { url, method, data, headers } = config;
//  const { access_token } = getAuthValue()

 console.log('access API_BASE_URL', API_BASE_URL);
const API_uri = 'https://api-dev.merabuddy.online/';

  return await Axios.request({
    baseURL: API_BASE_URL,
    url,
    method: method ?? 'GET',
    data,
    ...config,
    headers: {
      Authorization: `Bearer 5x4MBPahQak3D5CLmeGm8yMs5jFSyb`,
      ...config?.headers,
      ...headers,
    },
  });
};