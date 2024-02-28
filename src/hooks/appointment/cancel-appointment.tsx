import { useMutation, useQuery } from '@tanstack/react-query';
import appointmentService from '../../services/appointment-service';


export default function useCancelAppointment() {
  // const toast = useToast()

  return useMutation({
    mutationFn: appointmentService.cancelAppointment
  });

}