 
import { fetcher } from '../utils/fetcher';

class BookingService {

  queryKeys = {
    checkCouponCode:'checkCouponCode',
  };

  checkCouponCode = async (data:{couponcode:string,userid?:number,type:string,displaymode:string,totalmrp:number}) => {
    
    return fetcher({
      url: `booking/couponcheck`,
      method: 'POST',
      data
    });
  }

 



   

}

export default new BookingService();