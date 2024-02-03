import { StyleSheet, TouchableOpacity, View, Text, Modal, FlatList, TextInput } from 'react-native';
import React, { useState } from 'react';
import { FlashList } from '@shopify/flash-list';
import { Dropdown } from 'react-native-element-dropdown';

// local imports
import CSafeAreaView from '../../components/common/CSafeAreaView';
import CHeader from '../../components/common/CHeader';
import strings from '../../i18n/strings';
import { BottomIcon, EveningSlotIcon, MorningSlotIcon, BottomIconWhite } from '../../assets/svgs';
import CText from '../../components/common/CText';
import { colors, styles } from '../../themes';
import typography from '../../themes/typography';
import { deviceHeight, deviceWidth, moderateScale } from '../../common/constants';
import { Formik } from 'formik'


import { genderData, bookingFor } from '../../api/constant';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackNav } from '../../navigation/NavigationKeys';
import CheckBox from 'react-native-check-box';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import moment from 'moment';
import DatePicker, { getToday, getFormatedDate } from 'react-native-modern-datepicker';
import { Container } from '../../components/Container';
import Body from '../../components/Body/Body';
import useGetDoctorsAllSlots from '../../hooks/doctor/get-doctor-all-slots';
import { patientBookingValidationSchema } from '../../utils/validators';

// import RNPgReactNativeSDK from 'react-native-pg-react-native-sdk';
interface Props {
  route: any;
  navigation: any;
}
export default function SelectTimeSlot({ route, }: Props) {

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  //init
  const { id, doctorslots } = route.params;
  const { data: allSlotsData, isLoading } = useGetDoctorsAllSlots()

  const doctorSlotsArray = doctorslots.split(',').map(Number)

  const slotListMorningArray = allSlotsData?.data?.result[0]?.slotListMorning?.filter(item => doctorSlotsArray.includes(item.id)).map(item => item);
  const slotListEveningArray = allSlotsData?.data?.result[0]?.slotListEvening?.filter(item => doctorSlotsArray.includes(item.id)).map(item => item);
  console.log(slotListMorningArray,'Mornig');
  console.log(slotListEveningArray,'EVVVin');
  // console.log(allSlotsData?.data?.result[0]?.slotList, doctorSlotsArray,slotArray,'TIMESLOTSS');




  const [bookingForSelected, setBookingForSelected] = useState('');
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

  const onChangeBooking = (item: any) => setBookingForSelected(item.value);
  const onChangePatientName = (item: any) => setPatientName(item);
  const onChangeApplyCoupons = (item: any) => setApplyCoupons(item);
  const onChangePatientNumber = (item: any) => setPatientNumber(item);
  const onChangePatientAge = (item: any) => setPatientAge(item);
  const onChangePatientWeight = (item: any) => setPatientWeight(item);
  const onChangePatientGender = (item: any) => setPatientGender(item.value);



  // Get the current date
  const currentDate = moment();

  // Array to store the next five dates
  const nextFiveDates = [];

  // Loop to add the next five dates to the array
  for (let i = 0; i <= 4; i++) {
    const nextDate = moment(currentDate).add(i, 'days');
    nextFiveDates.push(nextDate.format('YYYY-MM-DD'));
  }





  const renderSlotItem = ({ item, index }: any) => {
    return (
      <>
        {item?.slot === 'MORNING' && <TouchableOpacity style={localStyles.slotContainer}>
          <CText type="m10">{moment(item?.slot_start_time).format('h:mm A')}</CText>
        </TouchableOpacity> }
      </>

    );
  };
//   <CText type="r14" numberOfLines={1} color={colors.success}>
//   No Slots Available
// </CText>
  const renderEveningSlotItem = ({ item, index }: any) => {
    return (
      <>
        {item?.slot === 'EVENING' && <TouchableOpacity style={localStyles.slotContainer}>
          <CText type="m10">{moment(item?.slot_start_time).format('h:mm A')}</CText>
        </TouchableOpacity> }
      </>

    );
  };

  const renderNoSlotItem = ({ item, index }: any) => {
    return (
      <View>
        <CText type="r14" numberOfLines={1} color={colors.success}>
          No Slots Available
        </CText>
      </View>
    );
  };

  return (
    <Container statusBarStyle='dark-content' >
      <CHeader title={strings.selectTimeSlot} />
      <Body contentContainerStyle={localStyles.mainRoot}>

        {/* use formik   */}
        <Formik
          enableReinitialize={true}
          initialValues={{ bookingfor: "", patientname: "", patientnumber: "", patientage: "", patientweight: "", patientgender: "", slotdateday: "", slottime: "" }}
          // validationSchema={patientBookingValidationSchema}
          onSubmit={(values, action) => {
            // updateProfile(values.country,values.address,values.name,values.mobile)
            console.warn('updatePatient', values);
            // action.resetForm()
            // loadUserInfo();

          }
          }
        >
          {({ handleChange, handleBlur, handleSubmit, values, touched, errors, isValid, setFieldValue }) => (
            <View>



              <CText type="s12" style={localStyles.labelStyle}>
                {'Booking For'}
              </CText>
              <Dropdown
                style={localStyles.dropdown}
                placeholderStyle={localStyles.placeholderStyle}
                selectedTextStyle={localStyles.selectedTextStyle}
                data={bookingFor}
                labelField="label"
                valueField="value"
                placeholder={'Relationship With user'}
                value={bookingForSelected}
                onChange={(item)=>{setFieldValue('bookingfor',item?.value)}}
                renderRightIcon={() => <BottomIcon />}
                itemTextStyle={localStyles.selectedTextStyle}
                itemContainerStyle={localStyles.itemContainerStyle}
              />

              <CText type="s12" style={localStyles.labelStyle}>
                {strings.patientName}
              </CText>

              <TextInput
                value={values.patientname}
                style={localStyles.inputTextField}
                onChangeText={handleChange('patientname')}
                placeholderTextColor={colors.placeHolderColor}
                placeholder={strings.enterPatientName}

              />

              <CText type="s12" style={styles.mt5}>
                {strings.patientMobileNo}
              </CText>

              <TextInput
                value={values.patientnumber}
                style={localStyles.inputTextField}
                onChangeText={handleChange('patientnumber')}
                placeholderTextColor={colors.placeHolderColor}
                placeholder={strings.enterPatientNumber}
                keyboardType='number-pad'

              />
              <View style={localStyles.ageGenderContainer}>
                <View style={localStyles.widthStyle}>
                  <CText type="s12">{strings.patientAge}</CText>
                  <TextInput
                     value={values.patientage}
                     style={localStyles.inputTextField}
                     onChangeText={handleChange('patientage')}
                    placeholderTextColor={colors.placeHolderColor}
                    placeholder={strings.age}
                    keyboardType='number-pad'

                  />
                </View>
                <View style={localStyles.widthStyle}>
                  <CText type="s12">{strings.patientWeight}</CText>
                  <TextInput
                    value={values.patientweight}
                    style={localStyles.inputTextField}
                    onChangeText={handleChange('patientweight')}
                    placeholderTextColor={colors.placeHolderColor}
                    placeholder={strings.weight}
                    keyboardType='number-pad'

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
                    onChange={(item)=>{setFieldValue('patientgender',item?.value)}}
                    renderRightIcon={() => <BottomIcon />}
                    itemTextStyle={localStyles.selectedTextStyle}
                    itemContainerStyle={localStyles.itemContainerStyle}
                  />
                </View>
              </View>

              <View style={{ marginTop: responsiveHeight(2) }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
                  <Text style={{
                    color: colors.black, ...typography.fontSizes.f12,
                    ...typography.fontWeights.SemiBold,
                  }} >{strings.SelectDateDay}</Text>

                  <TouchableOpacity activeOpacity={0.6} onPress={() => { setDatePickerModel(!datePickerModel) }} >

                    <View style={{ backgroundColor: colors.primary, flexDirection: 'row', paddingHorizontal: responsiveWidth(3.5), paddingVertical: responsiveHeight(0.5), borderRadius: responsiveWidth(2), gap: responsiveWidth(1) }} >
                      <Text style={{
                        color: colors.white, ...typography.fontSizes.f10,
                        ...typography.fontWeights.SemiBold,
                      }} >{moment(currentDate).format('MMM')},{moment(currentDate).format('YYYY')}</Text>
                      <BottomIconWhite />
                    </View>

                  </TouchableOpacity>

                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: responsiveHeight(2.5) }} >

                  {
                    nextFiveDates.map((item, index) => {

                      return (
                        <TouchableOpacity key={index.toString()} activeOpacity={0.6} onPress={() => { setSelectedDateOption(index) }} >
                          <View style={{ backgroundColor: selectedDateOption === index ? colors.primary : colors.white, paddingHorizontal: responsiveWidth(3.5), paddingVertical: responsiveHeight(1.5), gap: responsiveHeight(1.5), justifyContent: 'center', alignItems: 'center', borderRadius: responsiveWidth(3) }} >
                            <Text style={{ color: selectedDateOption === index ? colors.white : colors.black, ...typography.fontSizes.f12, ...typography.fontWeights.Medium, }} >{moment(item).format('ddd')}</Text>
                            <Text style={{ color: selectedDateOption === index ? colors.white : colors.black, ...typography.fontSizes.f12, ...typography.fontWeights.Medium, }}>{moment(item).format('D')}</Text>
                          </View>

                        </TouchableOpacity>
                      )
                    })
                  }

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
              <View style={{  }}>
                <FlashList
                  data={slotListMorningArray}
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

              <View style={{  }} >
                <FlashList
                  data={slotListEveningArray}
                  renderItem={renderEveningSlotItem}
                  keyExtractor={(item, index) => index.toString()}
                  numColumns={5}
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

                <TextInput
                  value={applyCoupons}
                  style={localStyles.inputTextField}
                  onChangeText={(t) => { setApplyCoupons(t) }}
                  placeholderTextColor={colors.placeHolderColor}


                />
              </View>



        <View style={localStyles.termStyle}>
          <CheckBox
            containerStyle={{}}
            isChecked={coloredCheckBoxValue}
            checkBoxColor={'#D0D0D0'}
            onClick={() => { setColoredCheckBoxValue(!coloredCheckBoxValue) }}
            checkedCheckBoxColor={colors.primary}
          />
          <CText type="r12" color={colors.gray} style={{ width: responsiveWidth(75), marginLeft: responsiveWidth(4) }} >
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
          <TouchableOpacity onPress={handleSubmit} style={localStyles.btn}>
            <CText
              type="r16"
              numberOfLines={1}
              color={'#5E5D5D'}
              style={styles.ml10}>
              {strings.close}
            </CText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { navigation.navigate(StackNav.AppointmentBooked) }}
            style={[localStyles.btn, { backgroundColor: colors.success }]}>
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
                selected={ !!values.slotdateday ? startDate : values.slotdateday}
                onDateChange={(propDate) => { setFieldValue('slotdateday',propDate) }}
                minimumDate={startDate}
              />


              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
                <TouchableOpacity activeOpacity={0.6} onPress={() => { setDatePickerModel(false) }} >

                  <Text style={{ color: colors.black, ...typography.fontSizes.f12, ...typography.fontWeights.Medium, }} >{strings.cancel}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { setDatePickerModel(false) }} style={{ backgroundColor: colors.success, paddingHorizontal: responsiveWidth(2.5), paddingVertical: responsiveHeight(0.5), borderRadius: responsiveWidth(2) }} >

                  <Text style={{ color: colors.white, ...typography.fontSizes.f14, ...typography.fontWeights.Bold, }} >Done</Text>
                </TouchableOpacity>
              </View>


            </View>
          </View>


        </Modal>

        </View>
          )}
        </Formik> 
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
    color: colors.black,
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
    width: moderateScale(60),
    borderRadius: moderateScale(4),
    borderWidth: moderateScale(1),
    borderColor: colors.primary,

  },
  btnSection: {
    ...styles.rowSpaceBetween,
    ...styles.mh10,
    // alignItems:'center',
    marginBottom: responsiveHeight(2.5)
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
    alignItems: 'center',
    marginBottom: responsiveHeight(3)
  },
  underLineStyle: {
    textDecorationStyle: 'solid',
    textDecorationColor: colors.success,
  },
  modalCenterView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: deviceHeight * 0.25
  },
  modalView: {
    marginHorizontal: responsiveWidth(5),
    marginVertical: responsiveHeight(2.5),
    backgroundColor: colors.white,
    borderRadius: responsiveWidth(5),
    width: '90%',
    paddingHorizontal: responsiveWidth(8),
    paddingVertical: responsiveHeight(3),
    //  alignItems:'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,

    },
    shadowOpacity: 0.25,
    shadowRadius: responsiveWidth(1.5),
    elevation: 5
  },
  inputTextField: {
    color: colors.black,
    ...typography.fontSizes.f12,
    ...typography.fontWeights.Medium,
    flex: 1,
    borderWidth: 1,
    borderColor: colors.primary,
    ...styles.ph10,
    height: responsiveHeight(5.3),
    borderRadius: responsiveWidth(1.5)
    , ...styles.mv5
  }

});
function handleResponseChanges(response: string) {
  throw new Error('Function not implemented.');
}
