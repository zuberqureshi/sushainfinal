import { useQuery } from '@tanstack/react-query';
import doctorService from '../../services/doctor-service';
 
 function useGetFindADoctor() {
  return useQuery({

    queryKey: [doctorService.queryKeys.getFindADoctorHome],
    queryFn: doctorService.getFindADoctorHome,
  });
}

export default useGetFindADoctor;