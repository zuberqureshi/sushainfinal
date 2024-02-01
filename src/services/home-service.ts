 
import { fetcher } from '../utils/fetcher';

class HomeService {

  queryKeys = {
    getHomeData: 'getHomeData',
    getHomeBannerData:'getHomeBannerData',
    getSpeclizationlist:'getSpeclizationlist',
    getDoctorsBySpeclization:'getDoctorsBySpeclization',
  };

  getHomeData = async () => {
    return fetcher({
      url: 'auth/homepage',
      method: 'GET',
    });
  }

  getHomeBannerData = async () => {
    return fetcher({
      url: 'banner/homebanner',
      method: 'GET',
    });
  }
 
  getSpeclizationlist = async () => {
    return fetcher({
      url: 'booking/speclist',
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



   

}

export default new HomeService();