import { useQuery } from '@tanstack/react-query';

import doctorService from '../../services/doctor/doctor-service'; 

import { AuthContext } from "../../context/AuthContext";
 import React,{useState,useEffect, useContext} from 'react'


async function getUser(){

 

  //  const response = await fetch(`https://api-dev.merabuddy.online/v1/categories`, {
  //   // headers: {
  //   //   Authorization: `Bearer ${user.accessToken}`
  //   // }
  // })
 
  //  return await response.json();
}


 function useDoctorListSpec() {
  return useQuery({
    queryKey: [],
    queryFn: async ()=>doctorService.getOnboarding(),
  });
}

export default useDoctorListSpec;