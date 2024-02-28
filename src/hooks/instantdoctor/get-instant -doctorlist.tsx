import { useQuery } from '@tanstack/react-query';
import instantDoctorService from '../../services/instant-doctor-service';

function useGetInstantDoctorsBySpeclization(data:{specialization:string , type:string}) {
  return useQuery({
    queryKey: [instantDoctorService.queryKeys.getInstantDoctorsBySpeclization + data?.specialization + data?.type],
    queryFn: () => instantDoctorService.getInstantDoctorsBySpeclization(data),
    enabled: !!data,
  });
}

export default useGetInstantDoctorsBySpeclization;