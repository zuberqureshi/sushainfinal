import { useQuery } from '@tanstack/react-query';
import appointmentService from '../../services/appointment-service';

function useGetUpcomingAppointments(data:{userid:number}) {
  return useQuery({
    queryKey: [appointmentService.queryKeys.getUpcomingAppointments + data?.userid],
    queryFn: () => appointmentService.getUpcomingAppointments(data),
    // enabled: !!data,
  });
}

export default useGetUpcomingAppointments;