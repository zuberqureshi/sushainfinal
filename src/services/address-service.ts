 
import { fetcher } from '../utils/fetcher';

class AddressService {

  queryKeys = {
    getAddressCountries: 'getAddressCountries',
    getStateByCountry: "getStateByCountry",
    getCitiesByState: 'getCitiesByState',
    getUserAddresses: 'getUserAddresses',
    addNewAddress : 'addNewAddress',
    deleteAddress : 'deleteAddress',
    updateUserAddress : 'updateUserAddress',

    
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
   
    return fetcher({
      url: 'order/createuseraddress',
      method: 'POST',
      data
    });
 
  }

  deleteAddress = async (data:any) => {
    return fetcher({
      url: `order/address/${data}`,
      method: 'DELETE',
    });
  }

  updateUserAddress = async (data:{payload:any,id:number}) => {
    const {payload,id} = data
    return fetcher({
      url: `order/address/${id}`,
      method: 'PUT',
      data:payload,
    });
  }


  

 
}

export default new AddressService();