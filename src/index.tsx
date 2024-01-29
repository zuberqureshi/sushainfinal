import { StyleSheet, Text, View } from 'react-native'
import React,{useEffect} from 'react'
import { Home, HomeSelected } from './assets/svgs'
import { GluestackUIProvider} from "@gluestack-ui/themed"
import { config } from '../gluestack-ui.config'
import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from './react-query/client'
// import { QueryClientProvider } from '@tanstack/react-query';
 import AppNavigator from './navigation'
   
// import { queryClient } from './react-query/client'
import { notificationListener, requestUserPermission } from './utils/notificationService'
const App = () => {

  useEffect(() => {
    requestUserPermission()
    notificationListener()
    
  }, [])

  return (

    // <QueryClientProvider client={queryClient}>

    // <GluestackUIProvider config={config}>
    //   <AppNavigator/>
    // </GluestackUIProvider>
    // </QueryClientProvider>

    <QueryClientProvider client={queryClient}>
        <GluestackUIProvider config={config}>
 
            <AppNavigator/>
 
        </GluestackUIProvider>
    </QueryClientProvider>

  )
}

export default App

const styles = StyleSheet.create({})