 
import React,{useState,useEffect, useContext} from 'react'
import { fetcher } from '../../utils/fetcher';
class DocService {

  queryKeys = {
    getdoctorListBySpec: 'getdoctorListBySpec'
  };

  getdoctorListBySpec = async () => {

    return fetcher({
      url: '/v1/banners',
      method: 'GET',
    });
 
  
    
  }


   

}

export default new DocService();