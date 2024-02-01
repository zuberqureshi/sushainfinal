import { useQuery } from '@tanstack/react-query';
import doctorService from '../../services/doctor-service';



function useGetDoctorsReview(data:number) {
  return useQuery({
    queryKey: [doctorService.queryKeys.getDoctorsReview + data],
    queryFn: () => doctorService.getDoctorsReview(data),
    enabled: !!data,
  });
}

export default useGetDoctorsReview;