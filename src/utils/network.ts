 import AsyncStorage from '@react-native-async-storage/async-storage';



const API_uri = 'http://13.232.170.16:3006/api/v1/';
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
    .then(   r => {  r.json();       console.log('apiresjson', r.json() )
  })
    .then(response => {
      console.log('apires', response )
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
async function setAccessToken(name,data) {

   await AsyncStorage.setItem(
    name,
    data,
  );


}
async function getAccessToken(name) {
  const value = await AsyncStorage.getItem(name);
  return value;

 

}

async function removeAccessToken(name) {
  const token = await AsyncStorage.removeItem(name);
      console.log("Token Removed",name)
  return token;
}

 

async function refreshTokenFetch() {

  const value =   await AsyncStorage.getItem('AccessTokenInfo') ;
  const tkn = JSON.parse( value );
 
const refreshTokenEndpoint = API_uri+'/auth/refreshtoken';

// Assuming you have a refresh token stored somewhere
const refreshToken = tkn.refreshToken;

// Prepare the request body
const requestBody = {
   refreshToken: refreshToken, 
};


  try {
    const response = await fetch(refreshTokenEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any additional headers required by your authentication server
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error('Failed to refresh token');
    }

    const tokenData = await response.json();
 
     return tokenData;
  } catch (error) {
    console.error('Error refreshing token:', error.message);
    // Handle the error or rethrow it based on your application's needs
    throw error;
  }
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
 
export { setAccessToken , getAccessToken,removeAccessToken,  CallApiJson , refreshTokenFetch };