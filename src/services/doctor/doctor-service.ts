
import React,{useState,useEffect, useContext} from 'react'
import { fetcher } from "../../utils/fetcher";
class DocService {


  getOnboarding = async () => {

    return fetcher({
      url: 'auth/homepage',
      method: 'GET',
    });
  //  const response = await fetch(`https://api-dev.merabuddy.online/v1/categories`, {
  //   // headers: {
  //   //   Authorization: `Bearer ${user.accessToken}`
  //   // }
  // })
 
  // const kk= await response.json();
  // console.log('kk',kk)
  //  return  kk;

 

    
  }


   

}

export default new DocService();