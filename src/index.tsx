import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Home, HomeSelected } from './assets/svgs'
import { GluestackUIProvider} from "@gluestack-ui/themed"
import { config } from '../gluestack-ui.config'

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AppNavigator from './navigation'
import { queryClient } from './react-query/client'
const App = () => {
  return (

    <QueryClientProvider client={queryClient}>

    <GluestackUIProvider config={config}>
      <AppNavigator/>
    </GluestackUIProvider>
    </QueryClientProvider>

  )
}

export default App

const styles = StyleSheet.create({})