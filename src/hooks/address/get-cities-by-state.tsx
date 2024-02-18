import { useQuery } from '@tanstack/react-query';
import addressService from '../../services/address-service';


function useGetCitiesByState(data:{stateId:String}) {

  return useQuery({
    queryKey: [addressService.queryKeys.getCitiesByState + data?.stateId],
    queryFn: () => addressService.getCitiesByState(data),
    enabled: !!data,
  });
}

export default useGetCitiesByState;