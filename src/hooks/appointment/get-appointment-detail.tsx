import { useQuery } from '@tanstack/react-query';
import appointmentService from '../../services/appointment-service';

function useGetAppointmentDetail(data:{type:string,appId:string}) {

  return useQuery({
    queryKey: [appointmentService.queryKeys.getAppointmentDetail + data?.type + data?.appId],
    queryFn: () => appointmentService.getAppointmentDetail(data),
    enabled: !!data,
  });
}

export default useGetAppointmentDetail;