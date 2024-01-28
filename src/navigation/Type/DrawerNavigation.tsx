import {Alert, Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React,{useEffect} from 'react';
import {
  DrawerContentScrollView,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import RNRestart from 'react-native-restart'
// local import
import {StackNav} from '../NavigationKeys';
import {StackRoute} from '../NavigationRoutes';
import {colors, styles} from '../../themes';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { responsiveWidth,responsiveHeight,responsiveFontSize } from 'react-native-responsive-dimensions'
import {
  AppointmentsDrawerIcon,
  BookYogaDrawerIcon,
  BottomIcon,
  BuyDrawerIcon,
  CareDrawerIcon,
  EditIcon,
  HomeDrawerIcon,
  MyOrderDrawerIcon,
  ParenthoodDrawerIcon,
  PastYogaDrawerIcon,
  PrescriptionDrawerIcon,
  UpcomingClinicAppointmentsDrawerIcon,
  UpcomingVideoAppointmentsDrawerIcon,
  UpcommingYogaDrawerIcon,
  VideoCallDrawerIcon,
} from '../../assets/svgs';
import {getHeight, moderateScale} from '../../common/constants';
import images from '../../assets/images';
import CText from '../../components/common/CText';
import strings from '../../i18n/strings';
// import {
//   removeRefreshToken,
//   removeToken,
//   removeUserDetail,
// } from '../../utils/asyncstorage';
import { setLng } from '../../i18n/changeLng';



const DrawerContentComponent = (props: any) => {

   


 


  const {icon, title, isNew = false,onPress} = props;

  
  return (
    <TouchableOpacity onPress={onPress} style={localStyles.drawerContentStyle}>
      <View style={localStyles.drawerIconStyle}>{icon}</View>
      <CText
        type="r12"
        numberOfLines={1}
        style={styles.mh10}
        color={colors.textColor5}>
        {title}
      </CText>
      {isNew && (
        <View style={localStyles.newContainer}>
          <CText type="r10" color={colors.white}>
            {'New'}
          </CText>
        </View>
      )}
    </TouchableOpacity>
  );
};

const onPressBookVideoConsultation = () => {
 
}

const changeLng = (lng:string) => {
  if(lng ==='English' || lng === 'إنجليزي'){
    // strings.setLanguage('en')
    setLng('en')
    RNRestart.Restart()
    return
  }else if(lng ==='Arabic' || lng === 'عربي'){
    // strings.setLanguage('ar')
    setLng('ar')
    RNRestart.Restart()
    
    return
  }
}

const InnerSubDrawerComponent = (props: any) => {
  const {icon, title,onPress} = props;

  // const changeLng = (lng:string) => {
  //   if(lng ==='English' || lng === 'إنجليزي'){
  //     // strings.setLanguage('en')
  //     setLng('en')
  //     RNRestart.Restart()
  //     return
  //   }else if(lng ==='Arabic' || lng === 'عربي'){
  //     // strings.setLanguage('ar')
  //     setLng('ar')
  //     RNRestart.Restart()
      
  //     return
  //   }
  // }

  return (
    <TouchableOpacity onPress={()=>{onPress(title)}} style={localStyles.subDrawerStyle}>
      <View style={localStyles.innerDrwerIconStyle}>{icon}</View>
      <CText
        type="r12"
        numberOfLines={1}
        style={styles.mh10}
        color={colors.textColor5}>
        {title}
      </CText>
    </TouchableOpacity>
  );
};


const InnerDrawerComponent = (props: any) => {
  const {icon, title, icon1, icon2, icon3, title1, title2, title3,onPress,onPress1,onPress2} = props;
  const [isOpen, setIsOpen] = React.useState(false);
  const onPressOpen = () => setIsOpen(!isOpen);
  
  
  return (
    <View
      style={[
        localStyles.outerContainer,
        isOpen && {borderWidth: moderateScale(1), borderColor: colors.primary},
      ]}>
      <TouchableOpacity
        onPress={onPressOpen}
        style={localStyles.innerDrawerStyle}>
        <View style={localStyles.innerDrawerIconStyle}>
          <View style={localStyles.drawerIconStyle}>{icon}</View>
          <CText
            type="r12"
            numberOfLines={1}
            style={styles.mh10}
            color={isOpen ? colors.primary : colors.textColor5}>
            {title}
          </CText>
        </View>
        <BottomIcon />
      </TouchableOpacity>
      {isOpen && (
        <View style={localStyles.subContainerStyle}>
          <InnerSubDrawerComponent icon={icon1} title={title1} onPress={onPress} />
          <InnerSubDrawerComponent icon={icon2} title={title2} onPress={onPress1} />
          {title3 && <InnerSubDrawerComponent icon={icon3} title={title3} />}
        </View>
      )}
    </View>
  );
};

const DrawerView = () => {
   
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const onPressLogOut = () => {
    // Alert.alert('Logout', 'Are you sure you want to logout?', [
    //   {
    //     text: 'Cancel',
    //     onPress: () => {},
    //     style: 'cancel',
    //   },
    //   {
    //     text: 'OK',
    //     onPress: async () => {
    //       await removeToken();
    //       await removeRefreshToken();
    //       await removeUserDetail();
    //       navigation.reset({
    //         index: 0,
    //         routes: [{name: StackNav.AuthStack}],
    //       });
    //     },
    //   },
    // ]);
  };

  

  return (
    <View style={localStyles.root}>
      <DrawerContentScrollView showsVerticalScrollIndicator={false}>
        <View style={localStyles.userDetailStyle}>
          <View style={localStyles.userPicStyle}>
            <Image
              source={images.yogaImage}
              style={localStyles.userProfileStyle}
            />
            <View style={styles.ph10}>
              <CText type="r20" color={colors.primary}>
                John Doe
              </CText>
              <CText type="r12" style={styles.mv5} color={colors.textColor2}>
                jeffkumar@gmail.com
              </CText>
              <CText type="r12" color={colors.textColor2}>
                +917089654356
              </CText>
            </View>
          </View>
          <TouchableOpacity style={styles.rowCenter}>
            <CText type="r12" style={styles.mr5} color={colors.primary}>
              Edit
            </CText>
            <EditIcon height={moderateScale(12)} width={moderateScale(12)} />
          </TouchableOpacity>
        </View>
        <View style={localStyles.middelContainer}>
          <DrawerContentComponent
            icon={<HomeDrawerIcon />}
            title={strings.home}
          />
          <DrawerContentComponent
            icon={<VideoCallDrawerIcon />}
            title={strings.bookVideoConsultation}
            onPress={()=>{navigation.navigate(StackNav.InstantConsultation)}}
          />
          <DrawerContentComponent
            icon={<BuyDrawerIcon />}
            title={strings.buyMedicine}
          />
          <DrawerContentComponent
            icon={<CareDrawerIcon />}
            title={strings.buyBeautyPersonalCareProducts}
          />
          <InnerDrawerComponent
            icon={<AppointmentsDrawerIcon />}
            title={strings.myAppointments}
            onPress={()=>{navigation.navigate(StackNav.Appointments)}}
            icon1={<UpcomingVideoAppointmentsDrawerIcon />}
            title1={strings.upcomingVideoAppointments}
            icon2={<AppointmentsDrawerIcon />}
            title2={strings.pastAppointments}
            icon3={<UpcomingClinicAppointmentsDrawerIcon />}
            title3={strings.upcomingClinicAppointments}
          />
          <DrawerContentComponent
            icon={<ParenthoodDrawerIcon />}
            title={strings.myParenthoodProgram}
            isNew
          />
          <InnerDrawerComponent
            icon={<BookYogaDrawerIcon />}
            title={strings.bookYogaSessions}
            icon1={<PastYogaDrawerIcon />}
            title1={strings.pastYogaSessions}
            icon2={<UpcommingYogaDrawerIcon />}
            title2={strings.upcomingYogaSessions}
          />

          <InnerDrawerComponent
            icon={ <MIcon name="google-translate" size={responsiveWidth(6)} color={colors.success} />}
            title={strings.language}
            onPress={changeLng}
            // icon1={<PastYogaDrawerIcon />}
            title1={strings.english}
            onPress1={changeLng}
            // icon2={<UpcommingYogaDrawerIcon />}
            title2={strings.arabic}
            
            
          />
          <DrawerContentComponent
            icon={<MyOrderDrawerIcon />}
            title={strings.myOrders}
            onPress={()=>{navigation.navigate(StackNav.OrderSummery)}}
          />
          <DrawerContentComponent
            icon={<PrescriptionDrawerIcon />}
            title={strings.myPrescription}
          />
          <DrawerContentComponent
            icon={<VideoCallDrawerIcon />}
            title={strings.buyMedicine}
          />
        </View>
        <View style={localStyles.bottomStyle}>
          <CText type="r12" color={colors.success}>
            {strings.support}
          </CText>
          <TouchableOpacity onPress={()=>{
            // navigation.navigate(StackNav.ClinicDoctorDetailCard)
            }} style={styles.mt15}>
            <CText type="r12" color={colors.textColor5}>
              {strings.newTicket}
            </CText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.mt5}>
            <CText type="r12" color={colors.textColor5}>
              {strings.viewTicket}
            </CText>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={onPressLogOut}
          style={localStyles.logOutStyle}>
          <CText type="r12" color={colors.success}>
            {strings.logout}
          </CText>
        </TouchableOpacity>
      </DrawerContentScrollView>
    </View>
  );
};

const Drawer = createDrawerNavigator();
export default function DrawerNavigation() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
        drawerStyle: {width: '85%'},
        drawerHideStatusBarOnOpen: false,
      }}
      initialRouteName={StackNav.TabBar}
      drawerContent={(props: any) => <DrawerView {...props} />}>
      <Drawer.Screen name={StackNav.TabBar} component={StackRoute.TabBarNavigation} />
    </Drawer.Navigator>
  );
}

const localStyles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
  userDetailStyle: {
    ...styles.pv10,
    ...styles.ph15,
    ...styles.flexRow,
    ...styles.itemsStart,
    ...styles.justifyBetween,
  },
  userProfileStyle: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    backgroundColor: 'red',
  },
  userPicStyle: {
    ...styles.flexRow,
  },
  middelContainer: {
    ...styles.p15,
    backgroundColor: colors.drawerBg,
    gap: moderateScale(13),
  },
  drawerContentStyle: {
    ...styles.flexRow,
    ...styles.itemsCenter,
    ...styles.p10,
    backgroundColor: colors.white,
    borderRadius: moderateScale(10),
  },
  newContainer: {
    backgroundColor: colors.success,
    ...styles.ph5,
    paddingVertical: moderateScale(2),
    borderRadius: moderateScale(5),
  },
  drawerIconStyle: {
    height: getHeight(26),
    width: moderateScale(26),
    ...styles.center,
  },
  bottomStyle: {
    ...styles.p15,
    ...styles.itemsStart,
    borderBottomWidth: moderateScale(1),
    borderBottomColor: colors.gray4,
  },
  logOutStyle: {
    ...styles.p15,
  },
  innerDrawerStyle: {
    ...styles.rowSpaceBetween,
    backgroundColor: colors.white,
  },
  outerContainer: {
    borderRadius: moderateScale(10),
    ...styles.p10,
    backgroundColor: colors.white,
  },
  innerDrawerIconStyle: {
    ...styles.flexRow,
    ...styles.itemsCenter,
  },
  subDrawerStyle: {
    ...styles.rowStart,
    borderRadius: moderateScale(10),
  },
  innerDrwerIconStyle: {
    height: getHeight(16),
    width: moderateScale(16),
    ...styles.center,
  },
  subContainerStyle: {
    width: '80%',
    ...styles.selfEnd,
    ...styles.mt10,
    gap: moderateScale(15),
  },
});
