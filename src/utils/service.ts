import GetLocation from 'react-native-get-location'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getLocation = async() => {
    GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 60000,
    }).then(location => {
    
        // console.log(location,'LOCAAAA');
        fetch( `https://nominatim.openstreetmap.org/reverse?format=json&lat=${location?.latitude}&lon=${location?.longitude}`, ) .then(response => response.json()) .then( async(data) => { 
        //   console.log({data}); 
        // Extract city and country information from the response
         const city = data.address.city || data.address.town || data.address.village || data.address.hamlet; 
         const country = data.address.country;
         await AsyncStorage.setItem('getUserCity',city)
         
          console.log(city); 
        }) .catch(error => {
             // Handle errors
              console.error('Error:', error); });
            
    }).catch(error => {
        const { code, message } = error;
        console.warn(code, message);
    })
}