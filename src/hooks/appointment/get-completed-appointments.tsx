import { useQuery } from '@tanstack/react-query';
import appointmentService from '../../services/appointment-service';

function useGetCompletedAppointments(data:{userid:number}) {
  return useQuery({
    queryKey: [appointmentService.queryKeys.getCompletedAppointments + data?.userid],
    queryFn: () => appointmentService.getCompletedAppointments(data),
    // enabled: !!data,
  });
}

export default useGetCompletedAppointments;