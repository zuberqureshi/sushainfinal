import { StyleSheet, Text, View } from 'react-native'
 
import React,{useEffect} from 'react';
import { Home, HomeSelected } from './assets/svgs'
import { GluestackUIProvider} from "@gluestack-ui/themed"
import { config } from '../gluestack-ui.config'
import AppNavigator from './navigation'
import { notificationListener, requestUserPermission } from './utils/notificationService'


const App = () => {

  useEffect(() => {
    requestUserPermission()
    notificationListener()
    
  }, [])

  return (
    <GluestackUIProvider config={config}>
      <AppNavigator/>
    </GluestackUIProvider>

  )
}

export default App

const styles = StyleSheet.create({})