import { useQuery } from '@tanstack/react-query';
import addressService from '../../services/address-service';


function useGetStateByCountry(data:{countryId:String}) {

  return useQuery({
    queryKey: [addressService.queryKeys.getStateByCountry + data?.countryId],
    queryFn: () => addressService.getStateByCountry(data),
    enabled: !!data,
  });
}

export default useGetStateByCountry;