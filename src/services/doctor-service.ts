 
import { fetcher } from '../utils/fetcher';

class DoctorService {

  queryKeys = {
    getFindADoctorHome: 'getFindADoctorHome',
    getDoctorsBySpeclization: 'getDoctorsBySpeclization',
    getDoctorsProfile: 'getDoctorsProfile',
    getDoctorsReview: 'getDoctorsReview',
    getDoctorsAllSlots: 'getDoctorsAllSlots',
    getDoctorsListBySpeclization : 'getDoctorsListBySpeclization',
    
  };

  getFindADoctorHome = async () => {
    return fetcher({
      url: 'booking/videomainpage',
      method: 'GET',
    });
  }

  getDoctorsBySpeclization = async (data:{specialization:string,type:string}) => {
    const { specialization , type } = data
    
    return fetcher({
      url: `booking/doclistingspec?specialization=${specialization}&type=${type}`,
      method: 'GET',
    });
  }

  getDoctorsListBySpeclization = async (data:{specialization:string,type:string,pageParam:number}) => {
    const { specialization , type , pageParam } = data
      console.log({pageParam});
      
    return fetcher({
      url: `booking/doclistingspec?specialization=${specialization}&type=${type}&skip=${pageParam}`,
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

  getDoctorsAllSlots = async () => {

    return fetcher({
      url: `booking/fetchslots`,
      method: 'GET',
    });
  }






}

export default new DoctorService();