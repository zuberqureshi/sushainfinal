import { useQuery } from '@tanstack/react-query';
import appointmentService from '../../services/appointment-service';

function useGetReportByAppointmentId(data:any) {
  return useQuery({
    queryKey: [appointmentService.queryKeys.getReportByAppointmentId + data],
    queryFn: () => appointmentService.getReportByAppointmentId(data),
    // enabled: !!data,
  });
}

export default useGetReportByAppointmentId;