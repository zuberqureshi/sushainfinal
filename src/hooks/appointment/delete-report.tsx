import { useMutation, useQuery } from '@tanstack/react-query';
import appointmentService from '../../services/appointment-service';


export default function useDeleteReportById() {
  // const toast = useToast()

  return useMutation({
    mutationFn: appointmentService.deleteReportById
  });

}