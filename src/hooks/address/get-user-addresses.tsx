import { useQuery } from '@tanstack/react-query';
import addressService from '../../services/address-service';


function useGetUserAddresses(data:{userUniqueId:String}) {

  return useQuery({
    queryKey: [addressService.queryKeys.getUserAddresses + data?.userUniqueId],
    queryFn: () => addressService.getUserAddresses(data),
    enabled: !!data,
  });
}

export default useGetUserAddresses;