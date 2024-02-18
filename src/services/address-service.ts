 
import { fetcher } from '../utils/fetcher';

class AddressService {

  queryKeys = {
    getAddressCountries: 'getAddressCountries',
    getStateByCountry: "getStateByCountry",
    getCitiesByState: 'getCitiesByState',
    getUserAddresses: 'getUserAddresses',
    addNewAddress : 'addNewAddress',

    
  };

  getAddressCountries= async () => {

    return fetcher({
      url: `/order/countries`,
      method: 'GET',
    });
  }

  getStateByCountry = async (data:{countryId:string}) => {
    const { countryId } = data
   
    return fetcher({
      url: `/order/statesbycountryid?countryId=${countryId}`,
      method: 'GET',
    });
  }

  getCitiesByState = async (data:{stateId:string}) => {
    const { stateId } = data
   
    return fetcher({
      url: `/order/citiesbystateid?stateId=${stateId}`,
      method: 'GET',
    });
  }

  getUserAddresses = async (data:{userUniqueId:string}) => {
    const { userUniqueId } = data
   
    return fetcher({
      url: `order/getuseraddress?userID=${userUniqueId}`,
      method: 'GET',
    });
  }

  addNewAddress = async (data:any) => {
   console.log(data,'ttt');
   
    return fetcher({
      url: 'order/createuseraddress',
      method: 'POST',
      data
    });
 
  }

  

 
}

export default new AddressService();