import { useMutation, useQuery } from '@tanstack/react-query';
import authService from '../../services/Auth/auth-service';

 
 

export default function useLoginOtpVerify() {
  // const toast = useToast()

  return useMutation({
    mutationFn: authService.loginOtpVerify
  });

}