 import AsyncStorage from '@react-native-async-storage/async-storage';



const API_uri = 'https://api-dev.merabuddy.online/';
function CallApi(endpoint, method = 'GET', body = null, token = null) {
  const toUrlEncoded = obj =>
    Object.keys(obj)
      .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(obj[k]))
      .join('&');
  body = body ? toUrlEncoded(body) : null;

  return new Promise(resolve => {
    let headres = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Access-Control-Request-Headers': 'Authorization',
      Authorization: 'Bearer ' + (token ? token : ''),
    };

    fetch(API_uri + endpoint, {
      method: method,
      headers: headres,
      body: body,
    })
      .then(   r => { console.log('1stthan', endpoint , r.json()) ; return r.json();    })
      .then(response => {

        resolve(response);
      })
      .catch(e => {

 console.log('errorincatch', endpoint, e ) ; 

        // console.log(e);
        resolve({
          status: 500,
          message: e.message,
        });
      });
  });
}

function CallApiJson(endpoint, method = 'GET', body = null, token = null) {
 

  body = body ? JSON.stringify(body) : null;
  // console.log( 'networkbody', body)
   return new Promise(resolve => {
    let headres = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
     'Access-Control-Request-Headers': 'Authorization',
     Authorization: 'Bearer ' + (token ? token : ''),
    };

    //console.log( 'fetch Method ', API_uri+endpoint); 
    
    fetch(API_uri + endpoint, {
      method: method,
      headers: headres,
      body: body,
    })
    .then(   r => {  r.json();    })
    .then(response => {
        resolve(response);
      })
      .catch(e => {
 
         console.log('API Call Error ',e);
        resolve({
          status: 500,
          message: e.message,
        });
      });
  });
}


// async function setToken(token) {
//    return EncryptedStorage.setItem('token', JSON.stringify(token) )
//     .then(() => 'success')
//     .catch(e => 'error');
// }
async function setAccessToken(token) {

  console.log( 'setacesstokn', token );
  await AsyncStorage.setItem(
    'accessToken',
    token,
  );


}
async function getAccessToken() {
  const value = await AsyncStorage.getItem('accessToken');
  return value;

 

}

async function removeAccessToken() {
  const token = await AsyncStorage.removeItem('accessToken');
      console.log("Token Removed",token)
  return token;
}


// async function getToken() {
//   const token = await EncryptedStorage.getItem('token');
//    return token;
// }


// async function removeToken() {
//   const token = await EncryptedStorage.removeItem('token');
//       console.log("Token Removed",token)
//   return token;
// }


export default CallApi  ;
 
export {setToken, getToken , removeToken , setAccessToken , getAccessToken,removeAccessToken,  CallApiJson};