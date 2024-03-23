import { Modal, StyleSheet, TextInput, TouchableOpacity, View, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Container } from '../../components/Container'
import CHeader from '../../components/common/CHeader'
import Body from '../../components/Body/Body'
import { Avatar, AvatarFallbackText, Box, Image, Text } from '@gluestack-ui/themed'
import { colors, styles } from '../../themes'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import DatePicker, { getToday, getFormatedDate } from 'react-native-modern-datepicker';
import images from '../../assets/images'
import { useFormik } from 'formik'
import PrimaryButton from '../../components/common/Button/PrimaryButton'
import { genderData } from '../../api/constant'
import { BottomIcon } from '../../assets/svgs'
import strings from '../../i18n/strings'
import { Dropdown } from 'react-native-element-dropdown'
import { deviceHeight, moderateScale } from '../../common/constants'
import typography from '../../themes/typography'
import useGetAddressCountries from '../../hooks/address/get-address-countries'
import useGetStateByCountry from '../../hooks/address/get-state-by-country'
import useGetCitiesByState from '../../hooks/address/get-cities-by-state'
import moment from 'moment'

const Profile = () => {

  const [countryList, setCountryList] = useState([])
  const [stateList, setStateList] = useState([])
  const [citiesList, setCitiesList] = useState([])
  const [datePickerModel, setDatePickerModel] = useState(false)

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { name: '', number: '', email: '', password: '', dob: '', gender: '', country: { id: "", name: "" }, city: { id: "", name: "" }, state: { id: "", name: "" }, healthconcern: '', height: '', allergy: '' },
    // validationSchema: patientBookingValidationSchema
    onSubmit: values => {
      // updateProfile(values.country,values.address,values.name,values.mobile)
      // console.log('profileData', values);
      // action.resetForm()
      // loadUserInfo();
    }

  });

  //api call
  const { data: addressCountriesData, isLoading: addressCountriesDataIsLoading } = useGetAddressCountries()
  const { data: stateByCountryData, isLoading: stateByCountryDataIsLoading, isFetching: stateByCountryDataIsFetching } = useGetStateByCountry({ countryId: formik?.values?.country?.id })
  const { data: citiesByStateData, isLoading: citiesByStateDataIsLoading, isFetching: citiesByStateDataIsFetching } = useGetCitiesByState({ stateId: formik?.values?.state?.id })

  const onChangeCountry = async (item: any) => {
    await formik.setFieldValue('country', { id: item.value, name: item.label })

  };
  const onChangeCity = (item: any) => formik.setFieldValue('city', { id: item.value, name: item.label });
  const onChangeState = (item: any) => formik.setFieldValue('state', { id: item.value, name: item.label });

  useEffect(() => {
    if (addressCountriesData?.data && !addressCountriesDataIsLoading) {
      const updatedData = addressCountriesData?.data?.result[0]?.countriesList?.map((item: any) => {
        return { label: item?.name, value: item?.id }
      })

      setCountryList(updatedData)

    }
  }, [addressCountriesDataIsLoading])

  useEffect(() => {

    const fetchStates = async () => {

      if (stateByCountryData?.data && !stateByCountryDataIsLoading) {
        setStateList([])

        const updatedData = await stateByCountryData?.data?.result[0]?.statesList?.map((item: any) => {
          return { label: item?.name, value: item?.id }
        })

        // console.log('state chnges', updatedData);

        setStateList((prev: any[]) => {
          // Ensure updatedData is an array and merge it with the previous state list
          return [...prev, ...(updatedData || [])];
        })

      }

      if (citiesByStateData?.data && !citiesByStateDataIsLoading) {
        setCitiesList([])
        // console.log('City chnges');

        const updatedData = await citiesByStateData?.data?.result[0]?.citiesList?.map((item: any) => {
          return { label: item?.name, value: item?.id }
        })

        setCitiesList((prev: any[]) => {
          // Ensure updatedData is an array and merge it with the previous state list
          return [...prev, ...(updatedData || [])];
        })
      }



    }

    fetchStates()

  }, [stateByCountryDataIsLoading, citiesByStateDataIsLoading, formik?.values?.country, formik?.values?.state])
  return (
    <Container statusBarStyle='dark-content' >
      <CHeader title='Profile' />
      <Body>

        <Box flexDirection='row' alignItems='center' px={10} py={10} >
          <Box flex={0.8} >
            <Text fontFamily='$InterRegular' color={colors.primary} fontSize={13} lineHeight={16} >Full Name</Text>
            <Box borderBottomWidth={1} borderColor='#EAEAEA' h={30} w={'95%'} >
              <TextInput
                placeholder='Full Name'
                value={formik.values.name}
                onChangeText={formik.handleChange('name')}
                placeholderTextColor={colors.placeHolderColor}
                style={{ fontSize: responsiveFontSize(1.6), height: responsiveHeight(4.5), paddingLeft: 0 }}
              />
            </Box>
          </Box>
          <Box flex={0.2} gap={5} alignItems='center' >
            {/* <Box w={56} h={56} borderRadius={28} overflow='hidden' >
              <Image alt='user' source={images.drImg2} w={'100%'} h={'100%'} resizeMode='cover' />
            </Box> */}
            <Avatar bgColor="$amber600" size="lg" borderRadius="$full">
              <AvatarFallbackText>Sandeep Srivastava</AvatarFallbackText>
            </Avatar>
            <TouchableOpacity activeOpacity={0.6} >
              <Text fontFamily='$InterRegular' color={colors.primary} fontSize={10} lineHeight={12} >ADD PICTURE</Text>
            </TouchableOpacity>

          </Box>
        </Box>

        <Box borderBottomWidth={8} borderBottomColor='#F7F7F7' h={10} pb={8} ></Box>


        <Box px={10} mt={15} >
          <Text fontFamily='$InterRegular' color={colors.primary} fontSize={13} lineHeight={16} >Contact Number</Text>
          <Box borderBottomWidth={1} borderColor='#EAEAEA' h={30} >
            <TextInput
              placeholder='Contact Number'
              value={formik.values.number}
              onChangeText={formik.handleChange('number')}
              placeholderTextColor={colors.placeHolderColor}
              style={{ fontSize: responsiveFontSize(1.6), height: responsiveHeight(4.5), paddingLeft: 0 }}
            />
          </Box>
        </Box>
        <Box px={10} mt={20} >
          <Text fontFamily='$InterRegular' color={colors.primary} fontSize={13} lineHeight={16} >Email ID</Text>
          <Box borderBottomWidth={1} borderColor='#EAEAEA' h={30} w={'95%'} >
            <TextInput
              placeholder='Email ID'
              value={formik.values.email}
              onChangeText={formik.handleChange('email')}
              placeholderTextColor={colors.placeHolderColor}
              style={{ fontSize: responsiveFontSize(1.6), height: responsiveHeight(4.5), paddingLeft: 0 }}
            />
          </Box>
        </Box>
        <Box px={10} mt={20} >
          <Text fontFamily='$InterRegular' color={colors.primary} fontSize={13} lineHeight={16} >Password</Text>
          <Box borderBottomWidth={1} borderColor='#EAEAEA' h={30} w={'95%'} >
            <TextInput
              placeholder='Password'
              value={formik.values.password}
              onChangeText={formik.handleChange('password')}
              placeholderTextColor={colors.placeHolderColor}
              style={{ fontSize: responsiveFontSize(1.6), height: responsiveHeight(4.5) }}
            />
          </Box>
        </Box>
        <TouchableOpacity activeOpacity={0.6} onPress={() => { setDatePickerModel(!datePickerModel) }} >
          <Box borderBottomWidth={1} borderColor='#EAEAEA' h={30} w={'95%'} mt={20} mx={10} >
            <Text fontFamily='$InterRegular' color={colors.primary} fontSize={13} lineHeight={16} >{moment(formik.values.dob).isValid() ? `${moment(formik.values?.dob).format('d')}/${moment(formik.values?.dob).format('MM')}/${moment(formik.values?.dob).format('YYYY')}` : 'DOB (DD-MM-YYYY)'}</Text>
          </Box>
        </TouchableOpacity>
        <Box px={10} mt={20} style={localStyles.widthStyle}>
          <Text fontFamily='$InterRegular' color={colors.primary} fontSize={13} lineHeight={16} >Gender</Text>
          <Dropdown
            style={localStyles.dropdown}
            placeholderStyle={localStyles.placeholderStyle}
            selectedTextStyle={localStyles.selectedTextStyle}
            data={genderData}
            labelField="label"
            valueField="value"
            placeholder={strings.gender}
            value={formik.values.gender}
            onChange={(item) => { formik.setFieldValue('gender', item?.value) }}
            renderRightIcon={() => <BottomIcon />}
            itemTextStyle={localStyles.selectedTextStyle}
            itemContainerStyle={localStyles.itemContainerStyle}
            selectedTextProps={{ numberOfLines: 1 }}
            renderItem={(item) => { return (<Text fontFamily='$InterMedium' fontSize={12} lineHeight={14} numberOfLines={1} style={{ paddingHorizontal: responsiveWidth(2.5), paddingVertical: responsiveHeight(1) }} >{item?.label}</Text>) }}
            activeColor={colors.primary3}
          />
        </Box>
        <Box px={10} mt={20} style={localStyles.widthStyle}>
          <Text fontFamily='$InterRegular' color={colors.primary} fontSize={13} lineHeight={16} >country</Text>
          <Dropdown
            style={localStyles.dropdown}
            placeholderStyle={localStyles.placeholderStyle}
            selectedTextStyle={localStyles.selectedTextStyle}
            data={countryList}
            disable={!(!!countryList)}
            labelField="label"
            valueField="value"
            placeholder={'countries'}
            value={formik.values.country?.id}

            onChange={onChangeCountry}
            renderRightIcon={() => <BottomIcon />}
            itemTextStyle={localStyles.selectedTextStyle}
            itemContainerStyle={localStyles.itemContainerStyle}
            selectedTextProps={{ numberOfLines: 1 }}
            renderItem={(item) => { return (<Text fontFamily='$InterMedium' fontSize={12} lineHeight={14} numberOfLines={1} style={{ paddingHorizontal: responsiveWidth(2.5), paddingVertical: responsiveHeight(1) }} >{item?.label}</Text>) }}
            activeColor={colors.primary3}
          />
        </Box>
        <Box px={10} mt={20} style={localStyles.widthStyle}>
          <Text fontFamily='$InterRegular' color={colors.primary} fontSize={13} lineHeight={16} >State</Text>
          <Dropdown
            style={localStyles.dropdown}
            placeholderStyle={localStyles.placeholderStyle}
            selectedTextStyle={localStyles.selectedTextStyle}
            data={stateList}
            disable={!(!!stateList)}
            labelField="label"
            valueField="value"
            placeholder={'State'}
            value={formik.values.state?.id}
            onChange={onChangeState}
            renderRightIcon={() => <BottomIcon />}
            itemTextStyle={localStyles.selectedTextStyle}
            itemContainerStyle={localStyles.itemContainerStyle}
            selectedTextProps={{ numberOfLines: 1 }}
            renderItem={(item) => { return (<Text fontFamily='$InterMedium' fontSize={12} lineHeight={14} numberOfLines={1} style={{ paddingHorizontal: responsiveWidth(2.5), paddingVertical: responsiveHeight(1) }} >{item?.label}</Text>) }}
            activeColor={colors.primary3}
          />
        </Box>
        <Box px={10} mt={20} style={localStyles.widthStyle}>
          <Text fontFamily='$InterRegular' color={colors.primary} fontSize={13} lineHeight={16} >City</Text>
          <Dropdown
            style={localStyles.dropdown}
            placeholderStyle={localStyles.placeholderStyle}
            selectedTextStyle={localStyles.selectedTextStyle}
            data={citiesList}
            disable={!(!!citiesList)}
            labelField="label"
            valueField="value"
            placeholder={'City'}
            value={formik.values.city?.id}
            onChange={onChangeCity}
            renderRightIcon={() => <BottomIcon />}
            itemTextStyle={localStyles.selectedTextStyle}
            itemContainerStyle={localStyles.itemContainerStyle}
            selectedTextProps={{ numberOfLines: 1 }}
            renderItem={(item) => { return (<Text fontFamily='$InterMedium' fontSize={12} lineHeight={14} numberOfLines={1} style={{ paddingHorizontal: responsiveWidth(2.5), paddingVertical: responsiveHeight(1) }} >{item?.label}</Text>) }}
            activeColor={colors.primary3}
          />
        </Box>

        <Box px={10} mt={20} >
          <Text fontFamily='$InterRegular' color={colors.primary} fontSize={13} lineHeight={16} >Height</Text>
          <Box borderBottomWidth={1} borderColor='#EAEAEA' h={30} w={'95%'} >
            <TextInput
              placeholder='Height'
              value={formik.values.height}
              onChangeText={formik.handleChange('height')}
              keyboardType='number-pad'
              placeholderTextColor={colors.placeHolderColor}
              style={{ fontSize: responsiveFontSize(1.6), height: responsiveHeight(4.5) }}
            />
          </Box>
        </Box>



        <PrimaryButton buttonText='Save' onPress={formik.handleSubmit} marginVertical={responsiveHeight(2.5)} marginHorizontal={responsiveWidth(2.5)} />


        <Modal animationType='slide' transparent={true} visible={datePickerModel} >
          <View style={localStyles.modalCenterView} >
            <View style={localStyles.modalView}>
              <DatePicker
                mode='calendar'
                selected={formik.values.dob}
                onDateChange={(propDate) => { formik.setFieldValue('dob', moment(propDate, 'YYYY/MM/DD').format('YYYY-MM-DD')) }}
              // minimumDate={startDate}
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



      </Body>
    </Container>

  )
}

export default Profile

const localStyles = StyleSheet.create({
  widthStyle: {
    // width: '30%',
  },
  dropdown: {
    borderColor: '#EAEAEA',
    borderBottomWidth: moderateScale(1),
    borderRadius: moderateScale(6),
    height: moderateScale(26),
    // ...styles.pv20,
    // ...styles.ph5,
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
})