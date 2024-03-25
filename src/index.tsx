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
import crashlytics from '@react-native-firebase/crashlytics';

const persistor = persistStore(store);

const App = () => {

  const getUserDetails = async() => {
    // console.log('gggg');
    
    crashlytics().log('User signed in.');
    await Promise.all([
      crashlytics().setUserId('99999'),
      crashlytics().setAttribute('credits', String(999)),
      crashlytics().setAttributes({
        role: 'admin',
        followers: '13',
        email: 'phoenix@example.com',
        username:'DANIITESSS',
      }),
    ]);
  }

  useEffect(() => {
    // crashlytics().crash()
    crashlytics().log('Crashlytics Mounted')
    getUserDetails()
    requestUserPermission()
    notificationListener()

    return () => {
      crashlytics().log('Crashlytics UnMounted')
    }

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