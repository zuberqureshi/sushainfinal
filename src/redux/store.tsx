import { combineReducers, configureStore   } from "@reduxjs/toolkit";
import {persistReducer } from 'redux-persist';
import productReducer from "./productSlice";
import cartReducer from "./cartSlice";
import AsyncStorage from '@react-native-async-storage/async-storage';
import productBrandReducer from "./productBrandSlice";


// Combine your reducers
const rootReducer = combineReducers({
    product: productReducer,
    cart: cartReducer,
    productBrand : productBrandReducer,
  });

// Middleware to log non-serializable actions

// Configure Redux Persist
const persistConfig = {
    key: 'root',
    storage : AsyncStorage,
    whitelist: ['cart'], // Specify which reducers to persist
  }


// Apply middleware and persist reducer
  const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    // reducer:{
    //     product:productReducer,
    //     cart : cartReducer,
    // },
    reducer : persistedReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false
      }),
})