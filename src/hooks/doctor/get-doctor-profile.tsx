import { useQuery } from '@tanstack/react-query';
import doctorService from '../../services/doctor-service';



function useGetDoctorsProfile(data:number) {
  return useQuery({
    queryKey: [doctorService.queryKeys.getDoctorsProfile + data],
    queryFn: () => doctorService.getDoctorsProfile(data),
    enabled: !!data,
  });
}

export default useGetDoctorsProfile;