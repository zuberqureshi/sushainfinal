import React, { useContext, useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigation from './Type/StackNavigation';
import {StatusBar} from 'react-native';
import { AuthContext } from '../context/AuthContext'
import { getAccessToken, setAccessToken, CallApiJson } from '../../src/utils/network'

export default function AppNavigator() {
  const authContext:any = useContext(AuthContext);
  console.log('APP Navigator')

     async function load () {
      console.log('APP Navigatorloadfunct')

      let v =  JSON.parse( await getAccessToken('AccessTokenInfo') ); 

      if(  v?.accessToken){
        console.log('tokeninfo from memoery',v)

        let  currentTime = Math.floor(new Date().getTime() / 1000);

        if( currentTime < v?.expirationTime ){
          console.log('tokenvalid ')

          authContext.setAuthState({
            accessToken: v?.accessToken,
            refreshToken: v?.refreshToken,
            expirationTime: v?.expirationTime,
            authenticated: true,
          });

        }else{

         let body2 = {
            token:v?.refreshToken
          }
          const reftechAccessToken =  await CallApiJson( 'auth/refreshtoken', 'POST', body2 );

          console.log( 'expiredtokenFetchedNewToken', reftechAccessToken )
          if( reftechAccessToken.result.success==true){
            await setAccessToken('AccessTokenInfo',
            JSON.stringify({
              accessToken:reftechAccessToken.result.access_token,
              refreshToken:v?.refreshToken,
              expirationTime: reftechAccessToken.result.ExpirationTime,
            }) )

            authContext.setAuthState({
            
              accessToken:reftechAccessToken.result.access_token,
              refreshToken:v?.refreshToken,
              expirationTime: reftechAccessToken.result.ExpirationTime,
              authenticated: true,

            });



          }else{
            console.log('redirect to login ');
          }

 

        }
   


      }else{
        console.log('No tokeninfo from memoery' )

      }


  }
  useEffect(

   ()=>{

load()

},[]

  );
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <StackNavigation />
    </NavigationContainer>
  );
}
