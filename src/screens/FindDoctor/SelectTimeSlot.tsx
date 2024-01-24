import {StyleSheet, TouchableOpacity, View,Text,Modal, FlatList} from 'react-native';
import React, {useState} from 'react';
import {FlashList} from '@shopify/flash-list';
import {Dropdown} from 'react-native-element-dropdown';

// local imports
import CSafeAreaView from '../../components/common/CSafeAreaView';
import CHeader from '../../components/common/CHeader';
import strings from '../../i18n/strings';
import {BottomIcon, EveningSlotIcon, MorningSlotIcon,BottomIconWhite} from '../../assets/svgs';
import CText from '../../components/common/CText';
import {colors, styles} from '../../themes';
import typography from '../../themes/typography';
import {deviceHeight, deviceWidth, moderateScale} from '../../common/constants';
import CInput from '../../components/common/CInput';
import KeyBoardAvoidWrapper from '../../components/common/KeyBoardAvoidWrapper';
import {genderData, sampleData} from '../../api/constant';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackNav} from '../../navigation/NavigationKeys';
import CheckBox from 'react-native-check-box';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

import DatePicker,{getToday,getFormatedDate} from 'react-native-modern-datepicker';
import { Container } from '../../components/Container';
import Body from '../../components/Body/Body';

// import RNPgReactNativeSDK from 'react-native-pg-react-native-sdk';

export default function SelectTimeSlot() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [bookingFor, setBookingFor] = useState('');
  const [patientName, setPatientName] = useState('');
  const [applyCoupons, setApplyCoupons] = useState('');
  const [patientNumber, setPatientNumber] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [patientWeight, setPatientWeight] = useState('');
  const [patientGender, setPatientGender] = useState('');
  const [coloredCheckBoxValue, setColoredCheckBoxValue] = useState(false);

  const [selectedDateOption, setSelectedDateOption] = useState(0)

  const [datePickerModel, setDatePickerModel] = useState(false)

  const today = new Date()
  const startDate = getFormatedDate(today.setDate(today.getDate()), 'YYYY/MM/DD')
  const [selectedDate, setSelectedDate] = useState(startDate);

// console.log("selectedtdt Datee",selectedDate);

  const onChangeBooking = (item: any) => setBookingFor(item.value);
  const onChangePatientName = (item: any) => setPatientName(item);
  const onChangeApplyCoupons = (item: any) => setApplyCoupons(item);
  const onChangePatientNumber = (item: any) => setPatientNumber(item);
  const onChangePatientAge = (item: any) => setPatientAge(item);
  const onChangePatientWeight = (item: any) => setPatientWeight(item);
  const onChangePatientGender = (item: any) => setPatientGender(item.value);

  // function onPayPressHandle() {
  //   const orderDetails = {
  //     orderId: 'Order0001',
  //     orderAmount: '1',
  //     appId: '83811acaeed3206f02fcf524a11838',
  //     tokenData:
  //       'se9JCN4MzUIJiOicGbhJCLiQ1VKJiOiAXe0Jye.U49JSN1EDN1IzN1czY1UjNiojI0xWYz9lIsQTOxATNxMDM3EjOiAHelJCLiIlTJJiOik3YuVmcyV3QyVGZy9mIsEjOiQnb19WbBJXZkJ3biwiIxADMwIXZkJ3TiojIklkclRmcvJye.TGhcJX6BBOuG1z8Bm2AypHtvmKO1tKbhsQQjV3agVbMeKd5byck1N9yxS8wQJzB-ao',
  //     orderCurrency: 'INR',
  //     orderNote: 'asdasdasd',
  //     notifyUrl: 'https://test.gocashfree.com/notify',
  //     customerName: 'Cashfree User',
  //     customerPhone: '9999999999',
  //     customerEmail: 'cashfree@cashfree.com',
  //   };
  //   RNPgReactNativeSDK.startPaymentWEB(
  //     orderDetails,
  //     'TEST',
  //     (result: string) => {
  //       console.log(result);
  //       var response = '';
  //       var obj = JSON.parse(result, function (key, value) {
  //         console.log(key + '::' + value);
  //         response += key + ':: ' + value + '\n';
  //         // Do something with the result
  //       });
  //       handleResponseChanges(response);
  //     },
  //   );
  // }

  const renderSlotItem = ({item, index}: any) => {
    return (
      <TouchableOpacity style={localStyles.slotContainer}>
        <CText type="m10">{'9:30AM'}</CText>
      </TouchableOpacity>
    );
  };
  const renderNoSlotItem = ({item, index}: any) => {
    return (
      <View>
        <CText type="r14" numberOfLines={1} color={colors.success}>
          No Slots Available
        </CText>
      </View>
    );
  };

  return (
    <Container>
      <CHeader title={strings.selectTimeSlot} />
      <Body contentContainerStyle={localStyles.mainRoot}>
        <CText type="s12" style={localStyles.labelStyle}>
          {'Booking For'}
        </CText>
        <Dropdown
          style={localStyles.dropdown}
          placeholderStyle={localStyles.placeholderStyle}
          selectedTextStyle={localStyles.selectedTextStyle}
          data={sampleData}
          labelField="label"
          valueField="value"
          placeholder={'Select item'}
          value={bookingFor}
          onChange={onChangeBooking}
          renderRightIcon={() => <BottomIcon />}
          itemTextStyle={localStyles.selectedTextStyle}
          itemContainerStyle={localStyles.itemContainerStyle}
        />
        <CText type="s12" style={localStyles.labelStyle}>
          {strings.patientName}
        </CText>
        <CInput
          toGetTextFieldValue={onChangePatientName}
          _value={patientName}
          inputBoxStyle={localStyles.placeSty}
          inputContainerStyle={localStyles.patientNameTxt}
          placeholder={strings.enterPatientName}
          inputStyle={styles.mt5}
        />
        <CText type="s12" style={styles.mt5}>
          {strings.patientMobileNo}
        </CText>
        <CInput
          toGetTextFieldValue={onChangePatientNumber}
          _value={patientNumber}
          inputBoxStyle={localStyles.placeSty}
          inputContainerStyle={localStyles.patientNameTxt}
          placeholder={strings.enterPatientNumber}
          inputStyle={styles.mt5}
          keyBoardType={'number-pad'}
        />
        <View style={localStyles.ageGenderContainer}>
          <View style={localStyles.widthStyle}>
            <CText type="s12">{strings.patientAge}</CText>
            <CInput
              toGetTextFieldValue={onChangePatientAge}
              _value={patientAge}
              inputBoxStyle={localStyles.placeSty}
              inputContainerStyle={localStyles.patientNameTxt}
              placeholder={strings.age}
              inputStyle={styles.mt5}
              keyBoardType={'number-pad'}
            />
          </View>
          <View style={localStyles.widthStyle}>
            <CText type="s12">{strings.patientWeight}</CText>
            <CInput
              toGetTextFieldValue={onChangePatientWeight}
              _value={patientWeight}
              inputBoxStyle={localStyles.placeSty}
              inputContainerStyle={localStyles.patientNameTxt}
              placeholder={strings.weight}
              inputStyle={styles.mt5}
              keyBoardType={'number-pad'}
            />
          </View>
          <View style={localStyles.widthStyle}>
            <CText type="s12">{strings.PatientGender}</CText>
            <Dropdown
              style={localStyles.dropdown}
              placeholderStyle={localStyles.placeholderStyle}
              selectedTextStyle={localStyles.selectedTextStyle}
              data={genderData}
              labelField="label"
              valueField="value"
              placeholder={strings.gender}
              value={patientGender}
              onChange={onChangePatientGender}
              renderRightIcon={() => <BottomIcon />}
              itemTextStyle={localStyles.selectedTextStyle}
              itemContainerStyle={localStyles.itemContainerStyle}
            />
          </View>
        </View>

        <View style={{marginTop:responsiveHeight(2)}}>
          <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}} >
            <Text style={{color:colors.black,   ...typography.fontSizes.f12,
    ...typography.fontWeights.SemiBold,}} >{strings.SelectDateDay}</Text>

            <TouchableOpacity activeOpacity={0.6} onPress={()=>{setDatePickerModel(!datePickerModel)}} >

              <View style={{backgroundColor:colors.primary,flexDirection:'row',paddingHorizontal:responsiveWidth(3.5),paddingVertical:responsiveHeight(0.5),borderRadius:responsiveWidth(2),gap:responsiveWidth(1)}} >
                <Text style={{color:colors.white,   ...typography.fontSizes.f10,
    ...typography.fontWeights.SemiBold,}} >Aug,2023</Text>
                <BottomIconWhite/>
              </View>

            </TouchableOpacity>

          </View>

          <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:responsiveHeight(2.5)}} >
            
            <TouchableOpacity activeOpacity={0.6} onPress={()=>{setSelectedDateOption(0)}} >
            <View style={{backgroundColor:selectedDateOption===0?colors.primary:colors.white,paddingHorizontal:responsiveWidth(4),paddingVertical:responsiveHeight(1.5),gap:responsiveHeight(1.5),justifyContent:'center',alignItems:'center',borderRadius:responsiveWidth(3)}} >
              <Text style={{color:selectedDateOption===0?colors.white:colors.black,   ...typography.fontSizes.f12,...typography.fontWeights.Medium,}} >Sat</Text>
              <Text style={{color:selectedDateOption===0?colors.white:colors.black,   ...typography.fontSizes.f12,...typography.fontWeights.Medium,}}>13</Text>
            </View>

            </TouchableOpacity>


            <TouchableOpacity activeOpacity={0.6} onPress={()=>{setSelectedDateOption(1)}}>
            <View style={{backgroundColor:selectedDateOption===1?colors.primary:colors.white,paddingHorizontal:responsiveWidth(4),paddingVertical:responsiveHeight(1.5),gap:responsiveHeight(1.5),justifyContent:'center',alignItems:'center',borderRadius:responsiveWidth(3)}} >
              <Text style={{color:selectedDateOption===1?colors.white:colors.black,   ...typography.fontSizes.f12,...typography.fontWeights.Medium,}} >Mon</Text>
              <Text style={{color:selectedDateOption===1?colors.white:colors.black,   ...typography.fontSizes.f12,...typography.fontWeights.Medium,}}>15</Text>
            </View>      
              
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.6} onPress={()=>{setSelectedDateOption(2)}}>
              <View style={{backgroundColor:selectedDateOption===2?colors.primary:colors.white,paddingHorizontal:responsiveWidth(4),paddingVertical:responsiveHeight(1.5),gap:responsiveHeight(1.5),justifyContent:'center',alignItems:'center',borderRadius:responsiveWidth(3)}} >
              <Text style={{color:selectedDateOption===2?colors.white:colors.black,   ...typography.fontSizes.f12,...typography.fontWeights.Medium,}} >Tue</Text>
              <Text style={{color:selectedDateOption===2?colors.white:colors.black,   ...typography.fontSizes.f12,...typography.fontWeights.Medium,}}>16</Text>
            </View>
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.6} onPress={()=>{setSelectedDateOption(3)}}>
              <View style={{backgroundColor:selectedDateOption===3?colors.primary:colors.white,paddingHorizontal:responsiveWidth(4),paddingVertical:responsiveHeight(1.5),gap:responsiveHeight(1.5),justifyContent:'center',alignItems:'center',borderRadius:responsiveWidth(3)}} >
              <Text style={{color:selectedDateOption===3?colors.white:colors.black,   ...typography.fontSizes.f12,...typography.fontWeights.Medium,}} >Wed</Text>
              <Text style={{color:selectedDateOption===3?colors.white:colors.black,   ...typography.fontSizes.f12,...typography.fontWeights.Medium,}}>17</Text>
            </View>
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.6} onPress={()=>{setSelectedDateOption(4)}}>
              <View style={{backgroundColor:selectedDateOption===4?colors.primary:colors.white,paddingHorizontal:responsiveWidth(4),paddingVertical:responsiveHeight(1.5),gap:responsiveHeight(1.5),justifyContent:'center',alignItems:'center',borderRadius:responsiveWidth(3)}} >
              <Text style={{color:selectedDateOption===4?colors.white:colors.black,   ...typography.fontSizes.f12,...typography.fontWeights.Medium,}} >Thu</Text>
              <Text style={{color:selectedDateOption===4?colors.white:colors.black,   ...typography.fontSizes.f12,...typography.fontWeights.Medium,}}>18</Text>
            </View>
              </TouchableOpacity>
          </View>
        </View>

        <CText type="m14" style={styles.mt10}>
          {strings.timeAvailable}
        </CText>
        <View style={localStyles.rowStyle}>
          <MorningSlotIcon />
          <CText type="r12" style={styles.ph5}>
            {strings.morningSlots}
          </CText>
        </View>
        <View style={{height:responsiveHeight(15)}}>
        <FlashList
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          renderItem={renderSlotItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={5}
          estimatedItemSize={100}
          // justifyContent="space-between"
        />
        </View>
       
        <View style={localStyles.rowStyle}>
          <EveningSlotIcon />
          <CText type="r12" style={styles.ph5}>
            {strings.eveningsSlots}
          </CText>
        </View>
  
       <View style={{height:responsiveHeight(15)}} >
       <FlashList
          data={[1]}
          renderItem={renderNoSlotItem}
          keyExtractor={(item, index) => index.toString()}
          estimatedItemSize={100}
          // justifyContent="space-between"
        />
       </View>

        
      
      
        <View style={localStyles.couponStyle}>
          <CText
            type="r14"
            
            color={colors.primary}
            style={styles.center}>
            {strings.ApplyCoupon}
          </CText>
          <CInput
            toGetTextFieldValue={onChangeApplyCoupons}
            _value={applyCoupons}
            inputBoxStyle={localStyles.placeSty}
            inputContainerStyle={localStyles.patientNameTxt}
            inputStyle={styles.mt5}
          />
        </View>

        <View style={localStyles.termStyle}>
          <CheckBox
            containerStyle={{}}
            isChecked={coloredCheckBoxValue}
            checkBoxColor={'#D0D0D0'}
            onClick={() => {setColoredCheckBoxValue(!coloredCheckBoxValue)}}
            checkedCheckBoxColor={colors.primary}
          />
          <CText type="r12" color={colors.gray} style={{width:responsiveWidth(75),marginLeft:responsiveWidth(4)}} >
            {strings.Iagreetothese}
            <CText
              suppressHighlighting={true}
              type="r12"
              style={[
                localStyles.underLineStyle,
                {
                  textDecorationColor: colors.primary,
                },
              ]}
              color={colors.primary}>
              {strings.TermsandConditions}
            </CText>
            {' & '}
            <CText
              suppressHighlighting={true}
              type="r12"
              style={[
                localStyles.underLineStyle,
                {
                  textDecorationColor: colors.primary,
                },
              ]}
              color={colors.primary}>
              {strings.cancelPolicy}
            </CText>
          </CText>
        </View>
        <View style={localStyles.btnSection}>
          <TouchableOpacity style={localStyles.btn}>
            <CText
              type="r16"
              numberOfLines={1}
              color={'#5E5D5D'}
              style={styles.ml10}>
              {strings.close}
            </CText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={()=>{navigation.navigate(StackNav.AppointmentBooked)}}
            style={[localStyles.btn, {backgroundColor: colors.success}]}>
            <CText
              type="r16"
              numberOfLines={1}
              color={colors.white}
              >
              {strings.pay}715
            </CText>
          </TouchableOpacity>
        </View>

        <Modal
         animationType='slide'
         transparent={true}
         visible={datePickerModel}
        >

          <View style={localStyles.modalCenterView} >

            <View style={localStyles.modalView}>


              <DatePicker
               mode='calendar'
               selected={selectedDate}
               onDateChange={(propDate)=>{setSelectedDate(propDate)}}
               minimumDate={startDate}
              />


                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}} >
                      <TouchableOpacity activeOpacity={0.6} onPress={()=>{setDatePickerModel(false)}} >

                        <Text style={{color:colors.black,   ...typography.fontSizes.f12,...typography.fontWeights.Medium,}} >{strings.cancel}</Text>
                      </TouchableOpacity>

                      <TouchableOpacity onPress={()=>{setDatePickerModel(false)}} style={{backgroundColor:colors.success,paddingHorizontal:responsiveWidth(2.5),paddingVertical:responsiveHeight(0.5),borderRadius:responsiveWidth(2)}} >

                        <Text style={{color:colors.white,   ...typography.fontSizes.f14,...typography.fontWeights.Bold,}} >Done</Text>
                      </TouchableOpacity>
                    </View>


            </View>
          </View>


        </Modal>
      </Body>
    </Container>
  );
}

const localStyles = StyleSheet.create({
  mainRoot: {
    ...styles.ph20,
  },
  dropdown: {
    borderColor: colors.primary,
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(6),
    height: moderateScale(26),
    ...styles.pv20,
    ...styles.ph10,
    ...styles.mt5,
  },
  labelStyle: {
    ...styles.mt15,
  },
  placeholderStyle: {
    ...typography.fontSizes.f12,
    ...typography.fontWeights.Medium,
    color: colors.placeHolderColor,
  },
  selectedTextStyle: {
    ...typography.fontSizes.f12,
    ...typography.fontWeights.Medium,
    color: colors.gray7,
  },
  itemContainerStyle: {
    // ...styles.ph10,
    // backgroundColor: 'red',
  },
  patientNameTxt: {
    borderColor: colors.primary,
    height: moderateScale(26),
    ...styles.pv20,
  },
  placeSty: {
    height: moderateScale(40),
    ...typography.fontSizes.f12,
    ...typography.fontWeights.Medium,
  },
  ageGenderContainer: {
    ...styles.flexRow,
    ...styles.justifyBetween,
    ...styles.mt5,
  },
  widthStyle: {
    width: '30%',
  },
  rowStyle: {
    ...styles.flexRow,
    ...styles.itemsCenter,
    ...styles.mt10,
  },
  slotContainer: {
    ...styles.center,
    ...styles.mh5,
    ...styles.mv10,
    height: moderateScale(31),
    width: moderateScale(51),
    borderRadius: moderateScale(4),
    borderWidth: moderateScale(1),
    borderColor: colors.primary,
  },
  btnSection: {
    ...styles.rowSpaceBetween,
    ...styles.mh10,
    // alignItems:'center',
    marginBottom:responsiveHeight(2.5)
  },
  btn: {
    backgroundColor: colors.lightwhite,
    ...styles.p10,
    borderRadius: 10,
    width: moderateScale(100),
    ...styles.justifyCenter,
    ...styles.center,
  },
  couponStyle: {
    width: '30%',
    ...styles.selfEnd,
  },
  termStyle: {
    ...styles.flexRow,
    ...styles.itemsCenter,
    alignItems:'center',
    marginBottom:responsiveHeight(3)
  },
  underLineStyle: {
    textDecorationStyle: 'solid',
    textDecorationColor: colors.success,
  },
 modalCenterView:{
  justifyContent:'center',
  alignItems:'center',
  marginTop:deviceHeight*0.25
 },
 modalView:{
   marginHorizontal:responsiveWidth(5),
   marginVertical:responsiveHeight(2.5),
   backgroundColor:colors.white,
   borderRadius:responsiveWidth(5),
   width:'90%',
   paddingHorizontal:responsiveWidth(8),
   paddingVertical:responsiveHeight(3),
  //  alignItems:'center',
   shadowColor:'#000',
   shadowOffset:{
    width:0,
    height:2,

   },
   shadowOpacity:0.25,
   shadowRadius:responsiveWidth(1.5),
   elevation: 5
 }

});
function handleResponseChanges(response: string) {
  throw new Error('Function not implemented.');
}
