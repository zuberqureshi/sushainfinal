 
import { fetcher } from '../utils/fetcher';

class BookingService {

  queryKeys = {
    checkCouponCode:'checkCouponCode',
    createConsultation:'createConsultation',
    checkPayment : 'checkPayment',
  };

  checkCouponCode = async (data:{couponcode:string,userid?:number,type:string,displaymode:string,totalmrp:number}) => {
    
    return fetcher({
      url: `booking/couponcheck`,
      method: 'POST',
      data
    });
  }

  createConsultation = async (data:any) => {
    
    return fetcher({
      url: `booking/consultationcreate`,
      method: 'POST',
      data
    });
  }
 
  checkPayment = async (data:any) => {
    console.log('PATCH',data);
    
    return fetcher({
      url: `booking/videoconsultationverify/${data}`,
      method: 'PATCH',
   
    });
  }


 



   

}

export default new BookingService();