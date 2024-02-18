import { useQuery } from '@tanstack/react-query';
import addressService from '../../services/address-service';


function useGetAddressCountries() {
  return useQuery({
    queryKey: [addressService.queryKeys.getAddressCountries],
    queryFn:  addressService.getAddressCountries,
    // enabled: !!data,
  });
}

export default useGetAddressCountries;