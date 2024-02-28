import { useQuery } from '@tanstack/react-query';
import appointmentService from '../../services/appointment-service';

function useGetTodayAppointments(data:{userid:number}) {
  return useQuery({
    queryKey: [appointmentService.queryKeys.getTodayAppointments + data?.userid],
    queryFn: () => appointmentService.getTodayAppointments(data),
    // enabled: !!data,
  });
}

export default useGetTodayAppointments;