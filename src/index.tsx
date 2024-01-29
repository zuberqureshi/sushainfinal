import { StyleSheet, Text, View } from 'react-native'
import React,{useEffect} from 'react'
import { Home, HomeSelected } from './assets/svgs'
import { GluestackUIProvider} from "@gluestack-ui/themed"
import { config } from '../gluestack-ui.config'
import { QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext'
import { queryClient } from './react-query/client'
 import AppNavigator from './navigation'
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

<AuthProvider >


            <AppNavigator/>
        

  </AuthProvider>
        </GluestackUIProvider>
    </QueryClientProvider>

  )
}

export default App

const styles = StyleSheet.create({})