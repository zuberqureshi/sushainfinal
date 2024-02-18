import { useMutation, useQuery } from '@tanstack/react-query';
import addressService from '../../services/address-service';


 
 

export default function useAddNewAddress() {
  // const toast = useToast()

  return useMutation({
    mutationFn: addressService.addNewAddress
  });

}