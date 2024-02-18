import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getAccessToken } from '../../utils/network';

const Test = () => {
    const [userInfo, setUserInfo] = useState();

     async function load(){
      setUserInfo(JSON.parse( await getAccessToken('userInfo') ) ) ;
   }
    
    useEffect(() => {
      load();
    }, []);
    console.log('TEST....',userInfo);
    
  return (
    <View>
      <Text>Test</Text>
    </View>
  )
}

export default Test

const styles = StyleSheet.create({})