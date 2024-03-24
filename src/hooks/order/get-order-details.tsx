import { useQuery } from '@tanstack/react-query';
import orderService from '../../services/order-service';

function useGetOrderDetails(data:String) {
  return useQuery({
    queryKey: [orderService.queryKeys.getOrderDetails + data],
    queryFn: () => orderService.getOrderDetails(data),
    enabled: !!data,
  });
}

export default useGetOrderDetails;