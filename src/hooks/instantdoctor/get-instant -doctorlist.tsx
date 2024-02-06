import { useQuery } from '@tanstack/react-query';
import instantDoctorService from '../../services/instant-doctor-service';

function useGetInstantDoctorsBySpeclization(data:{specialization:string}) {
  return useQuery({
    queryKey: [instantDoctorService.queryKeys.getInstantDoctorsBySpeclization + data?.specialization],
    queryFn: () => instantDoctorService.getInstantDoctorsBySpeclization(data),
    enabled: !!data,
  });
}

export default useGetInstantDoctorsBySpeclization;