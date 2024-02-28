 
import { fetcher } from '../utils/fetcher';

class InstantDoctorService {

  queryKeys = {
    getInstantspeclizationlist: 'getInstantspeclizationlist',
    getInstantDoctorsBySpeclization:'getInstantDoctorsBySpeclization',

    
  };

  getInstantspeclizationlist = async () => {
    return fetcher({
      url: 'booking/speclistinstant',
      method: 'GET',
    });
  }

  getInstantDoctorsBySpeclization = async (data:{specialization:string , type:string}) => {
    const { specialization , type } = data
 
    return fetcher({
      url: `booking/instantdoclist?disease=${specialization}&type=${type}`,
      method: 'GET',
    });
  }
 






}

export default new InstantDoctorService();