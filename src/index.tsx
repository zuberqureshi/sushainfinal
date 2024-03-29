import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Home, HomeSelected } from './assets/svgs'
import { GluestackUIProvider } from "@gluestack-ui/themed"
import { config } from '../gluestack-ui.config'
import { QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext'
import { queryClient } from './react-query/client'
import AppNavigator from './navigation'
import { notificationListener, requestUserPermission } from './utils/notificationService'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

const persistor = persistStore(store);

const App = () => {

  useEffect(() => {
    requestUserPermission()
    notificationListener()

  }, [])

  return (



    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider config={config}>
        <Provider store={store} >
          <PersistGate persistor={persistor}>
            <AuthProvider >

              <AppNavigator />

            </AuthProvider>
          </PersistGate>
        </Provider>

      </GluestackUIProvider>
    </QueryClientProvider>

  )
}

export default App

const styles = StyleSheet.create({})