import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackRoute } from '../NavigationRoutes';
import { StackNav } from '../NavigationKeys';
import { getLng } from '../../i18n/changeLng';
import strings from '../../i18n/strings';

const Stack = createNativeStackNavigator();

export default function StackNavigation() {

  useEffect(() => {
    selectedLng()
  }, [])

  const selectedLng = async () => {
    const lngData = await getLng()
    if (!!lngData) {
      strings.setLanguage(lngData)
    }
    console.log("Drawer LOggggggg", lngData);

  }

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

      {/* <Stack.Screen
        name={StackNav.ConsultDoctor}
        component={StackRoute.ConsultDoctor}
      /> */}



      {/* <Stack.Screen
        name={StackNav.TermsOfService}
        component={StackRoute.TermsOfService}
      />
      <Stack.Screen
        name={StackNav.PrivacyPolicy}
        component={StackRoute.PrivacyPolicy}
      />
      <Stack.Screen
        name={StackNav.DortorProfile}
        component={StackRoute.DortorProfile}
      />
      <Stack.Screen
        name={StackNav.PatientsReview}
        component={StackRoute.PatientsReview}
      />
      <Stack.Screen
        name={StackNav.PaymentScreen}
        component={StackRoute.PaymentScreen}
      />
      <Stack.Screen
        name={StackNav.SelectTimeSlot}
        component={StackRoute.SelectTimeSlot}
      />
      <Stack.Screen
        name={StackNav.ProductByCategories}
        component={StackRoute.ProductByCategories}
      /> */}

      {/* <Stack.Screen
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
      /> */}

      <Stack.Screen
        name={StackNav.ProductsReview}
        component={StackRoute.ProductsReview}
      />

      <Stack.Screen
        name={StackNav.MedicineCart}
        component={StackRoute.MedicineCart}
      /> 

      <Stack.Screen
        name={StackNav.MedicineAddress}
        component={StackRoute.MedicineAddress}
      /> 

      <Stack.Screen
        name={StackNav.MedicineSummery}
        component={StackRoute.MedicineSummery}
      /> 

    </Stack.Navigator>
  );
}
