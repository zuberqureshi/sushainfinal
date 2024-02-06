 
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

  getInstantDoctorsBySpeclization = async (data:{specialization:string}) => {
    const { specialization } = data

    return fetcher({
      url: `booking/instantdoclist?disease=${specialization}`,
      method: 'GET',
    });
  }
 






}

export default new InstantDoctorService();