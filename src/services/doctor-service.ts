 
import { fetcher } from '../utils/fetcher';

class DoctorService {

  queryKeys = {
    getFindADoctorHome: 'getFindADoctorHome',
    getDoctorsBySpeclization: 'getDoctorsBySpeclization',
    getDoctorsProfile: 'getDoctorsProfile',
    getDoctorsReview: 'getDoctorsReview',
    
  };

  getFindADoctorHome = async () => {
    return fetcher({
      url: 'booking/videomainpage',
      method: 'GET',
    });
  }

  getDoctorsBySpeclization = async (data:{specialization:string}) => {
    const { specialization } = data

    return fetcher({
      url: `booking/doclistingspec?specialization=${specialization}`,
      method: 'GET',
    });
  }

  getDoctorsProfile = async (data:number) => {

    return fetcher({
      url: `booking/docprofile?doc_id=${data}`,
      method: 'GET',
    });
  }

  getDoctorsReview = async (data:number) => {

    return fetcher({
      url: `booking/docreview?doc_id=${data}`,
      method: 'GET',
    });
  }






}

export default new DoctorService();