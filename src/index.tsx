import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Home, HomeSelected } from './assets/svgs'
import TabBarNaviagtion from './navigation/TabBarNaviagtion'
import { NavigationContainer } from '@react-navigation/native'

const App = () => {
  return (
    <NavigationContainer>
          <TabBarNaviagtion/>
    </NavigationContainer>

  )
}

export default App

const styles = StyleSheet.create({})