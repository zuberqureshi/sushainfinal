import { AppState } from 'react-native';
import { focusManager, QueryClient, onlineManager } from '@tanstack/react-query';
// import NetInfo from '@react-native-community/netinfo';

// import { persistQueryClient } from '@tanstack/react-query-persist-client';
// import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';


export const queryClient = new QueryClient(
 );

// onlineManager.setEventListener((setOnline) => {
//   return NetInfo.addEventListener((state) => {
//     setOnline(state.isConnected ? true : false);
//   });
// });

// const clientStorage = {
//   setItem: (key: string, value: string) => {
//     storage.set(key, value);
//   },
//   getItem: (key: string) => {
//     const value = storage.getString(key);
//     return value === undefined ? null : value;
//   },
//   removeItem: (key: string) => {
//     storage.delete(key);
//   },
// };



// const persistor = createAsyncStoragePersister({
//   key: 'MY_APP_PERSISTENCE_KEY',
//   // storage: clientStorage,
// });

// persistQueryClient({
//   queryClient
// });

// focusManager.setEventListener((handleFocus: any) => {
//   AppState.addEventListener('change', handleFocus);
//   return () => {
//     console.log('removeEventListener')
//   };
// });
