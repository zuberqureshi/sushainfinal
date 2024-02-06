
import { useMutation } from "@tanstack/react-query";
import bookingService from '../../services/booking-service';

function useCreateConsultation() {
    return useMutation({
        mutationFn: bookingService.createConsultation
      });
}

export default useCreateConsultation;