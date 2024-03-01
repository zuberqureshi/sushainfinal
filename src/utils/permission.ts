import { PermissionsAndroid, Platform } from "react-native";
import { showErrorCSS } from "react-native-svg/lib/typescript/deprecated";

export const androidCameraPermission = () => new Promise(async (resolve,reject) => {

    try{
        if(Platform.OS === 'android' && Platform.Version > 22 ){
            const granted = await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.CAMERA,
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE 
            ]);

            console.log(granted, 'granted response');

            if(
                granted['android.PERMISSIONS.CAMERA'] !== 'granted' ||
                granted['android.PERMISSIONS.WRITE_EXTERNAL_STORAGE'] !== 'granted' ||
                granted['android.PERMISSIONS.READ_EXTERNAL_STORAGE'] !== 'granted' 
            ){
                console.log("Don't have required permission.Please allow permission");
                return resolve(true)

            }
            return resolve(false)
        }
        return resolve(true);
    }catch(error){
        return resolve(false);

    }
});


export const androidCameraAudioPermission = () => new Promise(async (resolve,reject) => {

    try{
        if(Platform.OS === 'android' && Platform.Version > 22 ){
            const granted = await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.CAMERA,
                PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
         
            ]);

            console.log(granted, 'granted response');

            if(
                granted['android.PERMISSIONS.CAMERA'] !== 'granted' ||
                granted['android.PERMISSIONS.RECORD_AUDIO'] !== 'granted'
        
            ){
                console.log("Don't have required permission.Please allow permission");
                return resolve(true)

            }
            return resolve(false)
        }
        return resolve(true);
    }catch(error){
        return resolve(false);

    }
});