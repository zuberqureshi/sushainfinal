import { useQuery } from '@tanstack/react-query';
import doctorService from '../../services/doctor-service';

function useGetDoctorsAllSlots() {
  return useQuery({
    queryKey: [doctorService.queryKeys.getDoctorsAllSlots],
    queryFn: doctorService.getDoctorsAllSlots,
    // enabled: !!data,
  });
}

export default useGetDoctorsAllSlots;