import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Home, HomeSelected } from './assets/svgs'
import { GluestackUIProvider} from "@gluestack-ui/themed"
import { config } from '../gluestack-ui.config'

import AppNavigator from './navigation'

const App = () => {
  return (
    <GluestackUIProvider config={config}>
      <AppNavigator/>
    </GluestackUIProvider>

  )
}

export default App

const styles = StyleSheet.create({})