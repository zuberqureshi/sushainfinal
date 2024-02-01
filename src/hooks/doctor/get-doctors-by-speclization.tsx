import { useQuery } from '@tanstack/react-query';
import doctorService from '../../services/doctor-service';



function useGetDoctorBySpeclization(data:{specialization:string}) {
  return useQuery({
    queryKey: [doctorService.queryKeys.getDoctorsBySpeclization + data?.specialization],
    queryFn: () => doctorService.getDoctorsBySpeclization(data),
    enabled: !!data,
  });
}

export default useGetDoctorBySpeclization;