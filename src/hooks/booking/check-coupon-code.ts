import { useQuery } from '@tanstack/react-query';
import { useMutation } from "@tanstack/react-query";
import bookingService from '../../services/booking-service';

function useCheckCouponCode() {
    return useMutation({
        mutationFn: bookingService.checkCouponCode
      });
}

export default useCheckCouponCode;