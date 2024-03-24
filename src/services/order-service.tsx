 
import { fetcher } from '../utils/fetcher';

class OrderService {

  queryKeys = {
    getMyOrders: 'getMyOrders',
    getOrderDetails : 'getOrderDetails',
    
  };

  getMyOrders = async (data:any) => {
    return fetcher({
      url: `/order/myorder?userId=${data}`,
      method: 'GET',
    });
  }

  getOrderDetails = async (data:any) => {
    return fetcher({
      url: `/order/orderdetails?orderId=${data}`,
      method: 'GET',
    });
  }


}

export default new OrderService();