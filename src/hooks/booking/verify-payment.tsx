import { useMutation, useQuery } from '@tanstack/react-query';
import bookingService from '../../services/booking-service';

export default function useCheckPayment() {
  // const toast = useToast()

  return useMutation({
    mutationFn: bookingService.checkPayment
  });

}