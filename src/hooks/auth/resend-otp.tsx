import { useMutation, useQuery } from '@tanstack/react-query';
import authService from '../../services/Auth/auth-service';

 
 

export default function useResendOtp() {
  // const toast = useToast()

  return useMutation({
    mutationFn: authService.resendOtp
  });

}