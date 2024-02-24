import {
  StyleSheet,

  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  Pressable,
  TextInput
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors, styles } from '../../themes';
import CHeader from '../../components/common/CHeader';
import strings from '../../i18n/strings';
import SearchWithLikeComponent from '../FindADoctor/SearchWithLikeComponent';
import images from '../../assets/images';
import typography from '../../themes/typography';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import StepIndicator from 'react-native-step-indicator';
import { deviceWidth, moderateScale } from '../../common/constants';
import { BottomIcon, PhoneIcon } from '../../assets/svgs';
import CText from '../../components/common/CText';
import CInput from '../../components/common/CInput';
import { addressData, sampleData } from '../../api/constant';
import { Dropdown } from 'react-native-element-dropdown';
import CheckBox from 'react-native-check-box'

import { Container } from '../../components/Container';
import Body from '../../components/Body/Body';
import { Box, Spinner, Text, Toast, ToastTitle, useToast } from '@gluestack-ui/themed';
import { useFormik } from 'formik';
import useGetAddressCountries from '../../hooks/address/get-address-countries';
import useGetStateByCountry from '../../hooks/address/get-state-by-country';
import useGetCitiesByState from '../../hooks/address/get-cities-by-state';
import PrimaryButton from '../../components/common/Button/PrimaryButton';
import { getAccessToken } from '../../utils/network';
import useGetUserAddresses from '../../hooks/address/get-user-addresses';
import useAddNewAddress from '../../hooks/address/add-new-address';
import { queryClient } from '../../react-query/client';
import addressService from '../../services/address-service';
import { addressAddSchema } from '../../utils/validators';
import Loader from '../../components/Loader/Loader';
import useDeleteAddress from '../../hooks/address/delete-address';
import UpdateUserAddress from '../../hooks/address/update-user-address';

const Address = () => {

  const toast = useToast()
  const [stepCurrentPosition, setStepCurrentPosition] = useState(1)

  const [userAlternateNoShow, setUserAlternateNoShow] = useState(false);

  const [userInfo, setUserInfo] = useState();
  const [addressCheckBox, setAddressCheckBox] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState(0)
  const [addNewAddress, setAddNewAddress] = useState(true)
  const [countryList, setCountryList] = useState([])
  const [stateList, setStateList] = useState([])
  const [citiesList, setCitiesList] = useState([])
  const [isEdit, setIsEdit] = useState(false)
  const [updatedAddressID, setUpdatedAddressID] = useState()





  const useAddNewAddressMutation = useAddNewAddress()
  const useDeleteAddressMutation = useDeleteAddress()
  const updateUserAddressMutation = UpdateUserAddress()


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { name: "", mobile: "", alternatemobile: "", pincode: "", address: "", locality: "", country: { id: "", name: "" }, city: { id: "", name: "" }, state: { id: "", name: "" }, type: 'Home' },
    validationSchema: addressAddSchema,
    onSubmit: values => {
      // updateProfile(values.country,values.address,values.name,values.mobile)
      // console.warn('formsubmit', values);
      if (!(!!values.country.name)) {

        toast.show({
          placement: "bottom",
          render: ({ id }: { id: string }) => {
            const toastId = "toast-" + id
            return (
              <Toast nativeID={toastId} variant="accent" action="error">
                <ToastTitle>Please Select Country</ToastTitle>
              </Toast>
            );
          },
        })
      }
      if (!(!!values.state.name)) {

        toast.show({
          placement: "bottom",
          render: ({ id }: { id: string }) => {
            const toastId = "toast-" + id
            return (
              <Toast nativeID={toastId} variant="accent" action="error">
                <ToastTitle>Please Select State</ToastTitle>
              </Toast>
            );
          },
        })
      }
      if (!(!!values.city.name)) {

        toast.show({
          placement: "bottom",
          render: ({ id }: { id: string }) => {
            const toastId = "toast-" + id
            return (
              <Toast nativeID={toastId} variant="accent" action='error'>
                <ToastTitle>Please Select City</ToastTitle>
              </Toast>
            );
          },
        })
      }


      const payload = {
        user_id: userInfo?.userUniqueId,
        type: formik.values.type,  // Home , Office
        name: formik.values.name,
        mobile_no: formik.values.mobile,
        address: formik.values.address,
        city_id: formik.values.city?.id,
        city: formik.values.city?.name,
        state_id: formik.values.state?.id,
        state: formik.values.state?.name,
        country_id: formik.values.country?.id,
        country: formik.values.country?.name,
        pincode: Number(formik.values.pincode)
      }

      console.log('PAYLOAD', payload);

      if(!isEdit){
        useAddNewAddressMutation.mutate(payload, {
          onSuccess: (data) => {
  
            // console.log('SUGNUPP DATA',data?.data);
  
            toast.show({
              placement: "bottom",
              render: ({ id }: { id: string }) => {
                const toastId = "toast-" + id
                return (
                  <Toast nativeID={toastId} variant="accent" action="success">
                    <ToastTitle>Address Added Successfully</ToastTitle>
                  </Toast>
                );
              },
            })
  
  
  
            queryClient.invalidateQueries({
              queryKey: [addressService.queryKeys.getUserAddresses + userInfo?.userUniqueId]
            })
  
            // navigation.navigate(StackNav.VerifyLoginOtp,{mobile:values.number,screenType:'signup'})
            formik.resetForm()
            setAddNewAddress(true)
          },
          onError: (error) => {
            console.log(error);
  
            toast.show({
              placement: "bottom",
              render: ({ id }: { id: string }) => {
                const toastId = "toast-" + id
                return (
                  <Toast nativeID={toastId} variant="accent" action="error">
                    <ToastTitle>Something went wrong, please try again later</ToastTitle>
                  </Toast>
                )
              }
            })
          }
        })
    
      }else if(isEdit){

        const payload = {
          user_id: userInfo?.userUniqueId,
          type: formik.values.type,  // Home , Office
          name: formik.values.name,
          mobile_no: formik.values.mobile,
          address: formik.values.address,
          city_id: formik.values.city?.id,
          city: formik.values.city?.name,
          state_id: formik.values.state?.id,
          state: formik.values.state?.name,
          country_id: formik.values.country?.id,
          country: formik.values.country?.name,
          pincode: Number(formik.values.pincode)
        }

        updateUserAddressMutation.mutate({ payload: payload, id: Number(updatedAddressID) }, {
          onSuccess: (data) => {
  
            // console.log('SUGNUPP DATA',data?.data);
  
            toast.show({
              placement: "bottom",
              render: ({ id }: { id: string }) => {
                const toastId = "toast-" + id
                return (
                  <Toast nativeID={toastId} variant="accent" action="success">
                    <ToastTitle>Address Updated Successfully</ToastTitle>
                  </Toast>
                );
              },
            })
  
  
  
            queryClient.invalidateQueries({
              queryKey: [addressService.queryKeys.getUserAddresses + userInfo?.userUniqueId]
            })
  
            // navigation.navigate(StackNav.VerifyLoginOtp,{mobile:values.number,screenType:'signup'})
            formik.resetForm()
            setAddNewAddress(true)
          },
          onError: (error) => {
            console.log(error);
  
            toast.show({
              placement: "bottom",
              render: ({ id }: { id: string }) => {
                const toastId = "toast-" + id
                return (
                  <Toast nativeID={toastId} variant="accent" action="error">
                    <ToastTitle>Something went wrong, please try again later</ToastTitle>
                  </Toast>
                )
              }
            })
          }
        })
        
       
        
      }

      // navigation.navigate(StackNav.VerifyLoginOtp,{mobile:values.number})
     


    }

  });


  async function load() {
    setUserInfo(JSON.parse(await getAccessToken('userInfo')));
  }

  const deleteUserAddress = (id) => {



    useDeleteAddressMutation.mutate(id, {
      onSuccess: (data) => {

        // console.log('SUGNUPP DATA',data?.data);

        toast.show({
          placement: "bottom",
          render: ({ id }: { id: string }) => {
            const toastId = "toast-" + id
            return (
              <Toast nativeID={toastId} variant="accent" action="success">
                <ToastTitle>Address Deleted Successfully</ToastTitle>
              </Toast>
            );
          },
        })



        queryClient.invalidateQueries({
          queryKey: [addressService.queryKeys.getUserAddresses + userInfo?.userUniqueId]
        })

        // navigation.navigate(StackNav.VerifyLoginOtp,{mobile:values.number,screenType:'signup'})
        formik.resetForm()
        setAddNewAddress(true)
      },
      onError: (error) => {
        console.log(error);

        toast.show({
          placement: "bottom",
          render: ({ id }: { id: string }) => {
            const toastId = "toast-" + id
            return (
              <Toast nativeID={toastId} variant="accent" action="error">
                <ToastTitle>Something went wrong, please try again later</ToastTitle>
              </Toast>
            )
          }
        })
      }
    })
  }

  const editAddress = async (item) => {


    await setIsEdit(true)


    formik.setFieldValue('name', item?.name)
    formik.setFieldValue('mobile', item?.mobile_no)
    formik.setFieldValue('pincode', item?.pincode.toString())
    formik.setFieldValue('address', item?.address)
    formik.setFieldValue('country', { id: item?.country_id, name: item?.country })
    formik.setFieldValue('state', { id: item?.state_id, name: item?.state })
    formik.setFieldValue('city', { id: item?.city_id, name: item?.city })
    formik.setFieldValue('type', item?.type)
    setUpdatedAddressID(item?.id)

    setAddNewAddress(false)

  }

  useEffect(() => {
    load();
  }, []);
  // console.log('UserData....', userInfo?.userUniqueId);

  //api call
  const { data: addressCountriesData, isLoading: addressCountriesDataIsLoading } = useGetAddressCountries()
  const { data: stateByCountryData, isLoading: stateByCountryDataIsLoading, isFetching: stateByCountryDataIsFetching } = useGetStateByCountry({ countryId: formik?.values?.country?.id })
  const { data: citiesByStateData, isLoading: citiesByStateDataIsLoading, isFetching: citiesByStateDataIsFetching } = useGetCitiesByState({ stateId: formik?.values?.state?.id })
  const { data: userAddressesData, isLoading: userAddressesDataIsLoading, isFetching: userAddressesDataIsFetching } = useGetUserAddresses({ userUniqueId: userInfo?.userUniqueId })
  console.log('ADDRESS COTRY',stateByCountryData?.data?.result[0]?.statesList[0],'city',citiesByStateData?.data?.result[0]?.citiesList[0]);



  const onChangeCountry = async(item: any) => {
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

        console.log('state chnges', updatedData);

        setStateList((prev: any[]) => {
          // Ensure updatedData is an array and merge it with the previous state list
          return [...prev, ...(updatedData || [])];
        })

      }

      if (citiesByStateData?.data && !citiesByStateDataIsLoading) {
        setCitiesList([])
        console.log('City chnges');

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



  const labels = ["Cart", "Address", "Payment", "Summary"];
  const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 25,
    separatorStrokeWidth: 1.5,
    currentStepStrokeWidth: 1.5,
    stepStrokeCurrentColor: colors.primary,
    stepStrokeWidth: 1.5,
    stepStrokeFinishedColor: colors.primary,
    stepStrokeUnFinishedColor: '#D3D5D6',
    separatorFinishedColor: colors.primary,
    separatorUnFinishedColor: '#E7DFDF',
    stepIndicatorFinishedColor: colors.primary,
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 10,
    currentStepIndicatorLabelFontSize: 10,
    stepIndicatorLabelCurrentColor: colors.primary,
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#B9BCBC',
    labelColor: '#9A9999',
    labelSize: 10,
    currentStepLabelColor: colors.black,


  }

  const onPageChange = (position) => {
    setStepCurrentPosition(position);
  }

  if (userAddressesDataIsLoading) {
    return (<Container statusBarStyle='dark-content' >
      <Loader />
    </Container>)
  }



  return (
    <Container statusBarStyle='dark-content' >
      <CHeader title='Add Address' />

      <Body>

        <View style={{ width: deviceWidth + responsiveWidth(15), alignSelf: 'center', marginRight: responsiveWidth(2.5), paddingVertical: responsiveHeight(1.8) }} >
          <StepIndicator
            stepCount={4}
            customStyles={customStyles}
            currentPosition={stepCurrentPosition}
            labels={labels}
          />
        </View>

        {!addNewAddress && <View>


          <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: responsiveWidth(3), gap: responsiveWidth(3) }}  >
            <PhoneIcon />
            <CText type='b14' >
              Contact Details
            </CText>

          </View>

          <View style={{ paddingHorizontal: responsiveWidth(3), marginTop: responsiveHeight(1), gap: responsiveHeight(1.5) }} >





            <Box borderWidth={1} borderColor={colors.primary} borderRadius={6} height={40}   >
              <TextInput
                style={localStyles.textInput}
                placeholderTextColor={colors.placeHolderColor}
                placeholder={'Name*'}
                onChangeText={formik.handleChange('name')}
                onBlur={formik.handleBlur('name')}
                value={formik.values.name}

              />
            </Box>
            {(formik.errors.name && formik.touched.name) ? <Text fontFamily='$InterRegular' lineHeight={14} fontSize={12} style={{ color: 'red', }} >{formik.errors.name}</Text> : null}

            <Box borderWidth={1} borderColor={colors.primary} borderRadius={6} height={40}   >
              <TextInput
                style={localStyles.textInput}
                placeholderTextColor={colors.placeHolderColor}
                placeholder={'Mobile No*'}
                onChangeText={formik.handleChange('mobile')}
                onBlur={formik.handleBlur('mobile')}
                value={formik.values.mobile}
                keyboardType='number-pad'
              />
            </Box>
            {(formik.errors.mobile && formik.touched.mobile) ? <Text fontFamily='$InterRegular' fontSize={12} lineHeight={14} style={{ color: 'red', }} >{formik.errors.mobile}</Text> : null}

            {userAlternateNoShow && <Box borderWidth={1} borderColor={colors.primary} borderRadius={6} height={40}   >
              <TextInput
                style={localStyles.textInput}
                onChangeText={formik.handleChange('alternatemobile')}
                onBlur={formik.handleBlur('alternatemobile')}
                value={formik.values.alternatemobile}
                placeholderTextColor={colors.placeHolderColor}
                placeholder={'Alternate Mobile No*'}
                keyboardType='number-pad'
              />
            </Box>}

            <Pressable onPress={() => { setUserAlternateNoShow(!userAlternateNoShow) }} >
              <CText type='m10' color={colors.primary} >+Add Alternate Phone Number</CText>
            </Pressable>
          </View>

          <CText type='b14' style={{ paddingHorizontal: responsiveWidth(3), marginVertical: responsiveHeight(1) }} >Address</CText>

          <View style={{ paddingHorizontal: responsiveWidth(3), marginTop: responsiveHeight(1), gap: responsiveHeight(1.5) }} >
            <Box borderWidth={1} borderColor={colors.primary} borderRadius={6} height={40}   >
              <TextInput
                style={localStyles.textInput}
                onChangeText={formik.handleChange('pincode')}
                onBlur={formik.handleBlur('pincode')}
                value={formik.values.pincode}
                placeholderTextColor={colors.placeHolderColor}
                placeholder={'Pin Code*'}
                keyboardType='number-pad'
              />
            </Box>
            {(formik.errors.pincode && formik.touched.pincode) ? <Text fontFamily='$InterRegular' fontSize={12} lineHeight={14} style={{ color: 'red', }}>{formik.errors.pincode}</Text> : null}

            <Box borderWidth={1} borderColor={colors.primary} borderRadius={6} height={40}   >
              <TextInput
                style={localStyles.textInput}
                onChangeText={formik.handleChange('address')}
                onBlur={formik.handleBlur('address')}
                value={formik.values.address}
                placeholderTextColor={colors.placeHolderColor}
                placeholder={'Address ( House NO. Building, Street, Area )*'}

              />
            </Box>
            {(formik.errors.address && formik.touched.address) ? <Text fontFamily='$InterRegular' fontSize={12} lineHeight={14} style={{ color: 'red', }}>{formik.errors.address}</Text> : null}

            <Box borderWidth={1} borderColor={colors.primary} borderRadius={6} height={40}   >
              <TextInput
                style={localStyles.textInput}
                onChangeText={formik.handleChange('locality')}
                onBlur={formik.handleBlur('locality')}
                value={formik.values.locality}
                placeholderTextColor={colors.placeHolderColor}
                placeholder={'Locality / Town*'}

              />
            </Box>
            {(formik.errors.locality && formik.touched.locality) ? <Text fontFamily='$InterRegular' fontSize={12} lineHeight={14} style={{ color: 'red', }}>{formik.errors.locality}</Text> : null}

            <Dropdown
              style={localStyles.dropdown}
              placeholderStyle={localStyles.placeholderStyle}
              selectedTextStyle={localStyles.selectedTextStyle}
              data={countryList}
              disable={!(!!countryList)}
              labelField="label"
              valueField="value"
              placeholder={'countries*'}
              value={formik.values.country?.id}

              onChange={onChangeCountry}
              renderRightIcon={() => <BottomIcon />}
              itemTextStyle={localStyles.selectedTextStyle}
              itemContainerStyle={localStyles.itemContainerStyle}
              selectedTextProps={{ numberOfLines: 1 }}
              renderItem={(item) => { return (<Text fontFamily='$InterMedium' fontSize={12} lineHeight={14} numberOfLines={1} style={{ paddingHorizontal: responsiveWidth(2.5), paddingVertical: responsiveHeight(1) }} >{item?.label}</Text>) }}
              activeColor={colors.primary3}
            />

            <View style={{ flexDirection: 'row', alignItems: 'center', gap: responsiveWidth(2) }} >
              <Dropdown
                style={localStyles.dropdown}
                placeholderStyle={localStyles.placeholderStyle}
                selectedTextStyle={localStyles.selectedTextStyle}
                data={stateList}
                disable={!(!!stateList)}
                labelField="label"
                valueField="value"
                placeholder={'State*'}
                value={formik.values.state?.id}
                onChange={onChangeState}
                renderRightIcon={() => <BottomIcon />}
                itemTextStyle={localStyles.selectedTextStyle}
                itemContainerStyle={localStyles.itemContainerStyle}
                selectedTextProps={{ numberOfLines: 1 }}
                renderItem={(item) => { return (<Text fontFamily='$InterMedium' fontSize={12} lineHeight={14} numberOfLines={1} style={{ paddingHorizontal: responsiveWidth(2.5), paddingVertical: responsiveHeight(1) }} >{item?.label}</Text>) }}
                activeColor={colors.primary3}
              />
              <Dropdown
                style={localStyles.dropdown}
                placeholderStyle={localStyles.placeholderStyle}
                selectedTextStyle={localStyles.selectedTextStyle}
                data={citiesList}
                disable={!(!!citiesList)}
                labelField="label"
                valueField="value"
                placeholder={'City / District*'}
                value={formik.values.city?.id}
                onChange={onChangeCity}
                renderRightIcon={() => <BottomIcon />}
                itemTextStyle={localStyles.selectedTextStyle}
                itemContainerStyle={localStyles.itemContainerStyle}
                selectedTextProps={{ numberOfLines: 1 }}
                renderItem={(item) => { return (<Text fontFamily='$InterMedium' fontSize={12} lineHeight={14} numberOfLines={1} style={{ paddingHorizontal: responsiveWidth(2.5), paddingVertical: responsiveHeight(1) }} >{item?.label}</Text>) }}
                activeColor={colors.primary3}
              />



            </View>

            <CText type='s14' style={{ marginVertical: responsiveHeight(1.5) }} >Save Address</CText>

            <View style={{ flexDirection: 'row', alignItems: 'center', gap: responsiveWidth(4) }} >

              <Pressable onPress={() => { formik.setFieldValue('type', 'Home') }} style={{ backgroundColor: formik.values.type === 'Home' ? colors.primary : colors.white, borderRadius: responsiveWidth(3), paddingHorizontal: responsiveWidth(3), paddingVertical: formik.values.type === 'Home' ? responsiveHeight(0.5) : responsiveHeight(0.4), borderWidth: formik.values.type === 'Home' ? 0 : 1, borderColor: colors.primary }} >
                <CText type='b12' color={formik.values.type === 'Home' ? colors.white : colors.black} >Home</CText>
              </Pressable>

              <Pressable onPress={() => { formik.setFieldValue('type', 'Work') }} style={{ backgroundColor: formik.values.type === 'Work' ? colors.primary : colors.white, borderRadius: responsiveWidth(3), paddingHorizontal: responsiveWidth(3.5), paddingVertical: formik.values.type === 'Work' ? responsiveHeight(0.5) : responsiveHeight(0.4), borderWidth: formik.values.type === 'Work' ? 0 : 1, borderColor: colors.primary }} >
                <CText type='b12' color={formik.values.type === 'Work' ? colors.white : colors.black} >Work</CText>
              </Pressable>

            </View>

          </View>

          {/* <View style={{ flexDirection: 'row', alignItems: 'center', gap: responsiveWidth(2), paddingHorizontal: responsiveWidth(3), marginTop: responsiveHeight(3.5) }} >

            <CheckBox
              style={{}}
              onClick={() => {
                setAddressCheckBox(!addressCheckBox)
              }}
              isChecked={addressCheckBox}
              checkedCheckBoxColor={colors.primary}
              uncheckedCheckBoxColor={colors.primary}
            />

            <CText type='s12' >Make this my default address</CText>

          </View> */}



          <PrimaryButton disabled={useAddNewAddressMutation.isPending || updateUserAddressMutation ?.isPending} loading={useAddNewAddressMutation.isPending || updateUserAddressMutation ?.isPending} onPress={formik.handleSubmit} buttonText={isEdit ? 'Update Address' : 'Add Address'} marginHorizontal={responsiveWidth(3)} marginTop={responsiveHeight(2.5)} />

        </View>}

        {addNewAddress && <View style={{ borderTopWidth: 1, borderTopColor: '#DAD9D9' }} >

          {/* <TouchableOpacity style={{ backgroundColor: '#F9F4F4', paddingVertical: responsiveHeight(1.3), marginHorizontal: responsiveWidth(5), marginVertical: responsiveHeight(1.5), borderRadius: responsiveWidth(3), borderWidth: 1, borderColor: colors.primary, overflow: 'hidden' }} >
            <View style={{ backgroundColor: colors.primary, width: '11%', height: responsiveHeight(5.2), position: 'absolute', borderTopRightRadius: responsiveWidth(2), borderBottomRightRadius: responsiveWidth(2) }} ></View>
            <CText type='m12' style={{ alignSelf: 'center' }} >Address Saved</CText>
          </TouchableOpacity> */}


          <TouchableOpacity activeOpacity={0.6} onPress={() => {
            setIsEdit(false)
            setAddNewAddress(!addNewAddress)
          }} >
            <CText type='m14' color={colors.primary} style={{ paddingHorizontal: responsiveWidth(4), paddingVertical: responsiveHeight(1.5) }} >
              + ADD NEW ADDRESS
            </CText>
          </TouchableOpacity>



          {
            userAddressesData?.data?.result[0]?.userAddressList?.map((item, index) => {
              return (
                <View key={index} style={{ paddingHorizontal: responsiveWidth(4), paddingVertical: responsiveHeight(2.4), backgroundColor: selectedAddress === index ? '#FCE3D6' : colors.white, gap: responsiveHeight(1.5), borderBottomWidth: responsiveWidth(0.5), borderBottomColor: '#DAD9D9' }} >

                  <View style={{ ...styles.flexRow, alignItems: 'center', justifyContent: 'space-between' }} >
                    <View style={{ ...styles.flexRow, alignItems: 'center', gap: responsiveWidth(2) }}  >
                      <CText type='s14' >{item?.name}</CText>
                      {item?.type && <CText type='m10' style={{ backgroundColor: '#F8F5F3', paddingHorizontal: responsiveWidth(2.5) }} >{item?.type}</CText>}
                    </View>
                    <TouchableOpacity onPress={() => { setSelectedAddress(index) }} style={{ borderWidth: 1, borderColor: colors.primary, paddingHorizontal: responsiveWidth(0.8), paddingVertical: responsiveHeight(0.4), borderRadius: responsiveWidth(4) }} >
                      <View style={{ backgroundColor: selectedAddress === index ? colors.primary : colors.white, paddingHorizontal: responsiveWidth(1.4), paddingVertical: responsiveHeight(0.7), borderRadius: responsiveWidth(2) }} ></View>
                    </TouchableOpacity>
                  </View>

                  <CText type='m12' >
                    {item?.address}
                  </CText>
                  <CText type='m12' >+91 {item?.mobile_no}</CText>

                  <View style={{ ...styles.flexRow, alignItems: 'center', gap: responsiveWidth(5) }} >

                    <TouchableOpacity onPress={() => { editAddress(item) }} >
                     <CText type='s12' color='#F27636' >EDIT</CText>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { deleteUserAddress(item?.id) }} >
                      {useDeleteAddressMutation?.isPending ? <Spinner size={'small'} color={colors.primary} /> : <CText type='s12' color='#F27636' >REMOVE</CText>}
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <CText type='s12' color='#F27636' >SET AS DEFAULT</CText>
                    </TouchableOpacity>

                  </View>

                  {selectedAddress === index && <TouchableOpacity activeOpacity={0.6} style={{ backgroundColor: '#FF9B66', paddingVertical: responsiveHeight(1.8), borderRadius: responsiveWidth(3), marginHorizontal: responsiveWidth(1.5) }} >
                    <CText type='s12' color={colors.white} style={{ alignSelf: 'center' }} >Deliver to this Address</CText>
                  </TouchableOpacity>}
                </View>
              )
            })
          }


        </View>}


      </Body>

    </Container>
  )
}

export default Address

const localStyles = StyleSheet.create({

  patientNameTxt: {
    borderColor: colors.primary,
    height: moderateScale(26),
    ...styles.pv25,
  },
  placeSty: {
    height: moderateScale(40),
    ...typography.fontSizes.f12,
    ...typography.fontWeights.Medium,
  },
  dropdown: {
    borderColor: colors.primary,
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(6),
    height: moderateScale(26),
    ...styles.pv20,
    ...styles.ph10,
    // ...styles.mt5,
    flex: 1,

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
  textInput: {

    paddingLeft: responsiveWidth(3),
    ...typography.fontSizes.f12,
    ...typography.fontWeights.Medium,
    color:colors.black




  },

})