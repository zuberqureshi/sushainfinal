import { useQuery } from '@tanstack/react-query';

import doctorService from '../../services/doctor/doctor-service'; 
 
import React,{useState,useEffect, useContext} from 'react'
 
 function useDoctorListSpec() {
  return useQuery({

    queryKey: [doctorService.queryKeys.getdoctorListBySpec],
    queryFn: async ()=>doctorService.getdoctorListBySpec(),
  });
}

export default useDoctorListSpec;