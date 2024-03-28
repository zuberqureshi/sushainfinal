 
import { fetcher } from '../utils/fetcher';

class OrderService {

  queryKeys = {
    getMyOrders: 'getMyOrders',
    getOrderDetails : 'getOrderDetails',
    orderCreate : 'orderCreate',
    
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

  orderCreate = async (data:any) => {
    
    return fetcher({
      url: `order/createorder`,
      method: 'POST',
      data
    });
  }


}

export default new OrderService();