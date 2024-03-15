import GetLocation from 'react-native-get-location'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PermissionsAndroid } from 'react-native';
import { useEffect } from 'react';
import { Toast,useToast,ToastTitle } from '@gluestack-ui/themed';

export const getLocation = async() => {

    // useEffect(() => {
    //   requestCameraPermission()
    // }, [])
    


    const requestLocationPermission = async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Permission',
              message:
                'Cool Photo App needs access to your camera ' +
                'so you can take awesome pictures.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the Location');
          } else {
            console.log('Location permission denied');
          }
        } catch (err) {
          console.warn(err);
        }
      };

      await requestLocationPermission()

    GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 60000,
    }).then(location => {
    
        // console.log(location,'LOCAAAA');
        fetch( `https://nominatim.openstreetmap.org/reverse?format=json&lat=${location?.latitude}&lon=${location?.longitude}`, ) .then(response => response.json()) .then( async(data) => { 
      
        // Extract city and country information from the response
         const city = data.address.city || data.address.town || data.address.village || data.address.hamlet; 
         const country = data.address.country;
         const state = data?.address?.state
         await AsyncStorage.setItem('getUserCity',city)
         await AsyncStorage.setItem('getUserState',state)
         
          console.log(state,city); 
          // console.log({data}); 
        }) .catch(error => {
             // Handle errors
              console.error('Error:', error); });
            
    }).catch(error => {
        
        const { code, message } = error;
        // if(code === 'UNAVAILABLE'){
            
        // }
        console.warn(code, message,);
    })
}