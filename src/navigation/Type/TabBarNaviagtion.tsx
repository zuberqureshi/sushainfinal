// Library import
import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View,Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {CurvedBottomBar} from 'react-native-curved-bottom-bar';

// Local import
// import {StackRoute, TabRoute} from '../NavigationRoutes';
// import {StackNav, TabNav} from '../NavigationKeys';
import {isAndroid, moderateScale} from '../../common/constants';
import {
  ContactUs,
  ContactUsSelected,
  FindADoctor,
  FindADoctorSelected,
  Home,
  HomeSelected,
  Medicines,
  MedicineSelected,
} from '../../assets/svgs';
import {colors, styles} from '../../themes';
import CText from '../../components/common/CText';
import CSafeAreaView from '../../components/common/CSafeAreaView';
import images from '../../assets/images';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MedicinesMain from '../../screens/Medicines/Medicines';
import HomeMain from '../../screens/Home/HomeMain';
import { StackRoute, TabRoute } from '../NavigationRoutes';
import { StackNav, TabNav } from '../NavigationKeys';

const Stack = createNativeStackNavigator();

const selectedSvgWH = moderateScale(30);
const svgHW = moderateScale(23);

const tabRouteDoctor = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={StackNav.FindADoctor}>
      <Stack.Screen
        name={StackNav.FindADoctor}
        component={TabRoute.FindADoctor}
      />
      {/* <Stack.Screen
        name={StackNav.CategoryDoctorListTab}
        component={StackRoute.CategoryDoctorList}
      /> */}
      {/* <Stack.Screen
        name={StackNav.ClinicDoctorDetailCard}
        component={StackRoute.ClinicDoctorDetailCard}
        
      /> */}
    </Stack.Navigator>
  );
};

const tabRouteMedicines = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={StackNav.MedicineHome}>
      <Stack.Screen
        name={StackNav.MedicineHome}
        component={TabRoute.Medicines}
      />
      <Stack.Screen
        name={StackNav.ProductByCategoriesTab}
        component={StackRoute.ProductByCategories}
      />
      {/* <Stack.Screen
        name={StackNav.ProductDetail}
        component={StackRoute.ProductDetail}
      /> */}
     
    </Stack.Navigator>
  );
};



export default function TabBarNavigation({}) {
  const Tab = createBottomTabNavigator();
  interface TabTextProps {
    text: boolean;
    routeName: string;
    selectedTab: string;
    style: any | undefined;
  }

  interface TabBarProps {
    routeName: string;
    selectedTab: string;
    navigate: any;
  }

  const TabText = ({
    text,
    routeName,
    selectedTab,
    style,
  }: TabTextProps): JSX.Element => {
    let icon;
    switch (routeName) {
      case 'Home':
        icon =
          routeName == selectedTab ? (
            <HomeSelected width={selectedSvgWH} height={selectedSvgWH} />
          ) : (
            <Home width={svgHW} height={svgHW} />
          );
        break;
      case TabNav.FindADoctorHome:
        icon =
          routeName == selectedTab ? (
            <FindADoctorSelected width={selectedSvgWH} height={selectedSvgWH} />
          ) : (
            <FindADoctor width={svgHW} height={svgHW} />
          );
        break;
      case TabNav.Medicines:
        icon =
          routeName == selectedTab ? (
            <MedicineSelected width={selectedSvgWH} height={selectedSvgWH} />
          ) : (
            <Medicines width={svgHW} height={svgHW} />
          );
        break;
      case 'ContactUs':
        icon =
          routeName == selectedTab ? (
            <ContactUsSelected width={selectedSvgWH} height={selectedSvgWH} />
          ) : (
            <ContactUs width={svgHW} height={svgHW} />
          );
        break;
    }
    return (
      <View style={[localStyles.tabViewContainer, style]}>
        {icon}
        {!!text && (
          <CText
            type={'m14'}
            numberOfLines={1}
            style={styles.mt5}
            color={routeName == selectedTab ? colors.primary : colors.gray4}>
            {routeName}
          </CText>
        )}
      </View>
    );
  };
  const renderTabBar = ({routeName, selectedTab, navigate}: TabBarProps) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigate('routeName', routeName);
        }}>
        <TabText
          text={true}
          routeName={routeName}
          selectedTab={selectedTab}
          style={undefined}
        />
      </TouchableOpacity>
    );
  };
  return (
  
      <CurvedBottomBar.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarHideOnKeyboard: isAndroid ? true : false,
         
         
       
        }}
        
        height={moderateScale(75)}
        borderTopLeftRight
        circleWidth={moderateScale(60)}
        circlePosition="CENTER"
        type="DOWN"
        shadowStyle={localStyles.shadow}
        renderCircle={({selectedTab, navigate}) => (
          <TouchableOpacity onPress={() => navigate(TabNav.AskVirtualVaidya)}>
            <View style={localStyles.btnCircleUp}>
              <Image
                source={images.askVirtualVaidya}
                style={localStyles.askVirtualVaidyaImageStyle}
              />
            </View>
          </TouchableOpacity>
        )}
        bgColor="white"
        tabBar={renderTabBar}
        initialRouteName={'Home'}>
        <Tab.Screen
          position="LEFT"
          name={'Home'}
          component={()=>{return(<HomeMain/>)}}
        />
        <Tab.Screen
          position="LEFT"
          name={TabNav.FindADoctorHome}
          component={tabRouteDoctor}
             
        />
        <Tab.Screen
          position="CIRCLE"
          name={TabNav.AskVirtualVaidya}
          component={TabRoute.AskVirtualVaidya}
        />
        <Tab.Screen
          position="RIGHT"
          name={TabNav.Medicines}
          component={tabRouteMedicines}
        />
        <Tab.Screen
          position="RIGHT"
          name={TabNav.ContactUs}
          component={TabRoute.ContactUs}
        />
      </CurvedBottomBar.Navigator>
   
  );
}
const localStyles = StyleSheet.create({
  root: {
    ...styles.flex,
    backgroundColor: colors.white,
  },
  tabViewContainer: {
    ...styles.center,
  },
  shadow: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  btnCircleUp: {
    bottom: moderateScale(25),
    backgroundColor: colors.primary,
    borderRadius: moderateScale(30),
    width: moderateScale(60),
    height: moderateScale(60),
    ...styles.center,
  },
  askVirtualVaidyaImageStyle: {
    width: moderateScale(50),
    height: moderateScale(50),
    resizeMode: 'contain',
  },
});
