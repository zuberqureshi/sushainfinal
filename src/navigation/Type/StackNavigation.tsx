import React, { useContext, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackRoute } from '../NavigationRoutes';
import { StackNav } from '../NavigationKeys';
import { getLng } from '../../i18n/changeLng';
import strings from '../../i18n/strings';
import { AuthContext } from '../../context/AuthContext'
import { getLocation } from '../../utils/service';

const Stack = createNativeStackNavigator();

export default function StackNavigation() {
  const authContext:any = useContext(AuthContext);

  useEffect(() => {
    getLocation()
    selectedLng()
  }, [])

  const selectedLng = async () => {
    const lngData:any = await getLng()
    if (!!lngData) {
      strings.setLanguage(lngData as string) 
    }
    console.log("Drawer LOggggggg", lngData);

  }
  // if (authContext?.authState?.authenticated === false) {
  //   return (
  //     <Stack.Navigator
  //     screenOptions={{
  //       headerShown: false,
  //     }}
  //     initialRouteName={StackNav.Splash}>
  //     <Stack.Screen name={StackNav.Splash} component={StackRoute.Splash} />


  //     <Stack.Screen
  //       name={StackNav.AuthStack}
  //       component={StackRoute.AuthStack}
  //     />
  //   </Stack.Navigator>

  //   )

  // }else{

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={StackNav.Splash}>
      <Stack.Screen name={StackNav.Splash} component={StackRoute.Splash} />

 
 
      <Stack.Screen
        name={StackNav.AuthStack}
        component={StackRoute.AuthStack}
      />
  
      <Stack.Screen
        name={StackNav.DrawerNavigation}
        component={StackRoute.DrawerNavigation}
      />
      <Stack.Screen name={StackNav.TabBar} component={StackRoute.TabBarNavigation} />

      <Stack.Screen
        name={StackNav.InstantConsultation}
        component={StackRoute.InstantConsultation}
      />



      {/* <Stack.Screen
        name={StackNav.TermsOfService}
        component={StackRoute.TermsOfService}
      />
      <Stack.Screen
        name={StackNav.PrivacyPolicy}
        component={StackRoute.PrivacyPolicy}
      /> */}
      <Stack.Screen
        name={StackNav.DoctorProfile}
        component={StackRoute.DoctorProfile}
      />
      <Stack.Screen
        name={StackNav.PatientsReview}
        component={StackRoute.PatientsReview}
      />
      {/* <Stack.Screen
        name={StackNav.PaymentScreen}
        component={StackRoute.PaymentScreen}
      /> */}
      <Stack.Screen
        name={StackNav.SelectTimeSlot}
        component={StackRoute.SelectTimeSlot}
      />
      <Stack.Screen
        name={StackNav.CategoryDoctorList}
        component={StackRoute.CategoryDoctorList}
      />
      <Stack.Screen
        name={StackNav.ProductByCategories}
        component={StackRoute.ProductByCategories}
      />
       <Stack.Screen
        name={StackNav.ProductDetail}
        component={StackRoute.ProductDetail}
      />

      <Stack.Screen
        name={StackNav.AppointmentBooked}
        component={StackRoute.AppointmentBooked}
      />

      <Stack.Screen
        name={StackNav.RescheduleAppointment}
        component={StackRoute.RescheduleAppointment}
      />

      <Stack.Screen
        name={StackNav.AppointmentCancellation}
        component={StackRoute.AppointmentCancellation}
      />

      <Stack.Screen
        name={StackNav.ProductsReview}
        component={StackRoute.ProductsReview}
      />

      <Stack.Screen
        name={StackNav.Cart}
        component={StackRoute.Cart}
      /> 

      <Stack.Screen
        name={StackNav.MedicineAddress}
        component={StackRoute.MedicineAddress}
      /> 

      <Stack.Screen
        name={StackNav.OrderSummery}
        component={StackRoute.OrderSummery}
      /> 
      <Stack.Screen
        name={StackNav.ClinicConsultation}
        component={StackRoute.ClinicConsultation}
      />
      <Stack.Screen
        name={StackNav.Appointments}
        component={StackRoute.Appointments}
      />


    </Stack.Navigator>
  );

    
}
