import { useQuery } from '@tanstack/react-query';
import instantDoctorService from '../../services/instant-doctor-service';

 
 function useGetInstantspeclizationlist() {
  return useQuery({

    queryKey: [instantDoctorService.queryKeys.getInstantspeclizationlist],
    queryFn: instantDoctorService.getInstantspeclizationlist,
  });
}

export default useGetInstantspeclizationlist;