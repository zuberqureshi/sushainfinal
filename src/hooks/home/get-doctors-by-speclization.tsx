import { useQuery } from '@tanstack/react-query';
import homeService from '../../services/home-service';


function useGetDoctorBySpeclization(data:{specialization:string}) {
  return useQuery({
    queryKey: [homeService.queryKeys.getDoctorsBySpeclization + data?.specialization],
    queryFn: () => homeService.getDoctorsBySpeclization(data),
    enabled: !!data,
  });
}

export default useGetDoctorBySpeclization;