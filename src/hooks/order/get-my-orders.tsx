import { useQuery } from '@tanstack/react-query';
import orderService from '../../services/order-service';

function useGetMyOrders(data:String) {
  return useQuery({
    queryKey: [orderService.queryKeys.getMyOrders + data],
    queryFn: () => orderService.getMyOrders(data),
    enabled: !!data,
  });
}

export default useGetMyOrders;