import { StyleSheet, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Container } from '../../components/Container'
import CHeader from '../../components/common/CHeader'
import { Box, Toast, ToastTitle, VStack, useToast } from '@gluestack-ui/themed'
import { Dropdown } from 'react-native-element-dropdown';
import { bookingFor, chooseRole } from '../../api/constant'
import { BottomIcon, CallBlackIcon, CallContactUs, FacebookContactUs, InstaContactUs, MailBlackIcon, MailContactUs, PersonContactUsIcon, YouTubeContactUs } from '../../assets/svgs'
import { useFormik } from 'formik'
import { colors, styles } from '../../themes'
import { getCountryCode, getDeviceIp, moderateScale } from '../../common/constants'
import typography from '../../themes/typography'
import { Text } from '@gluestack-ui/themed'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import useGetInstantspeclizationlist from '../../hooks/instantdoctor/get-instant-speclizationlist'
import { contactUsSchema } from '../../utils/validators'
import PrimaryButton from '../../components/common/Button/PrimaryButton'
import useContactUs from '../../hooks/home/contact-us'
import { getDeviceName } from 'react-native-device-info'
import AsyncStorage from '@react-native-async-storage/async-storage'
import DeviceCountry from 'react-native-device-country';

const ContactUs = () => {

  const toast = useToast()
  const [healthIssueOptions, setHealthIssueOptions] = useState([])

  const useContactUsMutation = useContactUs()

  const getDeviceDataFetch = async () => {
    let ip = await getDeviceIp()
    let nm = await getDeviceName()
    let countryCode = await getCountryCode()
    // formik.setFieldValue( 'devicename' , nm )
    // formik.setFieldValue( 'deviceip' , ip )
    let city =  await AsyncStorage.getItem('getUserCity')
    // formik.setFieldValue( 'devicefcm' , fcmToken )
   
    let deviceData = {ip:ip,nm:nm,city,countryCode}
    return deviceData
}

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { chooseRole: '', name : '' , number : '' , email : '' ,healthconcern : '' },
    validationSchema: contactUsSchema,
    onSubmit: async (values) => {
      // updateProfile(values.country,values.address,values.name,values.mobile)
      // console.log('updatePatient', values);
      // action.resetForm()
      // loadUserInfo();
      if (formik.values.healthconcern === '' ) {
        toast.show({
          placement: "top",
          render: ({ id }) => {
            const toastId = "toast-" + id
            return (
              <Toast nativeID={toastId} action="warning" variant="accent" >
                <VStack space="xs">
                  <ToastTitle>Please selecte health concern</ToastTitle>
                
                </VStack>
              </Toast>
            )
          },
        })
      } else {

        let deviceInfo = await getDeviceDataFetch()
        
        const payload = {
          name: formik.values?.name,
          country_code: deviceInfo?.countryCode,
          country_mobile_code: "91",
          source: "NATIVEAPP",
          lead_origin: formik.values.chooseRole,
          mobile: formik.values?.number,
          email: formik.values?.email,
          city: deviceInfo?.city,
          rest_data: "  from app ",
          lead_page_source:"ContactUs",
          utm_source:""
        }
        useContactUsMutation.mutate(payload, {
          onSuccess: (data) => {
    
            // console.log('SUGNUPP DATA',data?.data);
    
            toast.show({
              placement: "bottom",
              render: ({ id }: { id: string }) => {
                const toastId = "toast-" + id
                return (
                  <Toast nativeID={toastId} variant="accent" action="success">
                    <ToastTitle>Submitted Successfully</ToastTitle>
                  </Toast>
                );
              },
            })
    
    
    
         
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
    }

  })

  //api call
  const { data: speclizationlistData, isLoading: isLoadingSpeclizationlist } = useGetInstantspeclizationlist()

    useEffect(() => {
    if (speclizationlistData?.data && !isLoadingSpeclizationlist) {
      const updatedData = speclizationlistData?.data?.result[0]?.specList?.map((item: any) => {

        return { id: item?.id, label: item?.name, value: item?.name }
      })

      setHealthIssueOptions(updatedData)
    }

  }, [speclizationlistData?.data, isLoadingSpeclizationlist,])

  const onChangeHealthIssue = (item: any) => formik.setFieldValue('healthconcern',item.value);

  return (
    <Container statusBarStyle='dark-content' >
      <CHeader title='Contact Us' />

      <Box flex={1} px={10} mt={10} >

        <Box>
          <Text fontFamily='$InterMedium' fontSize={12} lineHeight={15} color={colors.black} >Choose Your Role</Text>
          <Dropdown
            style={localStyles.dropdown}
            placeholderStyle={localStyles.placeholderStyle}
            selectedTextStyle={localStyles.selectedTextStyle}
            data={chooseRole}
            labelField="label"
            valueField="value"
            placeholder={'Choose your role'}
            // value={formik.values.bookingfor}
            onChange={(item) => { formik.setFieldValue('chooseRole', item?.value) }}
            renderRightIcon={() => <BottomIcon />}
            itemTextStyle={localStyles.selectedTextStyle}
            itemContainerStyle={localStyles.itemContainerStyle}
            renderItem={(item) => { return (<Text fontFamily='$InterMedium' fontSize={12} lineHeight={14} numberOfLines={1}  px={10} py={10} >{item?.label}</Text>) }}
            // activeColor={colors.primary}
          
          />
        </Box>

    { formik.values.chooseRole !== '' &&  <Box backgroundColor='#F1FDFF' mt={10} alignItems='center' px={15} py={15} gap={10} borderRadius={10} style={styles.shadowStyle} >
        <Text fontFamily='$InikaRegular' fontSize={13} lineHeight={16} numberOfLines={1} color={colors.black} >Contact Information</Text>
        <Text fontFamily='$InikaRegular' fontSize={12} lineHeight={15} numberOfLines={1} color={colors.black} >Please enter your contact details</Text>

        <Box w={'100%'}>
        <Box flexDirection='row' alignItems='center' borderWidth={1} borderColor='#E0DCDC' borderRadius={5} h={40} px={10} gap={8} >
            <PersonContactUsIcon/>
            <TextInput
             placeholder='Name'
             placeholderTextColor={colors.placeHolderColor}
             style={{flex:1,fontSize:responsiveFontSize(1.5),lineHeight:responsiveHeight(1.8)}}
             value={formik.values.name}
             onChangeText={formik.handleChange('name')}
             onBlur={formik.handleBlur('name')}
            />

          </Box>
          {(formik.errors.name && formik.touched.name) ? <Text style={{ color: 'red', paddingHorizontal: responsiveWidth(0.7) }}>{formik.errors.name}</Text> : null}

        </Box>
       
 
          <Box w={'100%'}>
          <Box flexDirection='row' alignItems='center' borderWidth={1} borderColor='#E0DCDC' borderRadius={5} h={40} px={10} gap={8} >
            <CallContactUs/>
            <TextInput
             placeholder='Phone number'
             placeholderTextColor={colors.placeHolderColor}
             style={{flex:1,fontSize:responsiveFontSize(1.5),lineHeight:responsiveHeight(1.8)}}
             value={formik.values.number}
             onChangeText={formik.handleChange('number')}
             onBlur={formik.handleBlur('number')}
             keyboardType='number-pad'
            />

          </Box>
          {(formik.errors.number && formik.touched.number) ? <Text style={{ color: 'red', paddingHorizontal: responsiveWidth(0.7) }}>{formik.errors.number}</Text> : null}

          </Box>
        

          <Box w={'100%'} >
          <Box flexDirection='row' alignItems='center' borderWidth={1} borderColor='#E0DCDC' borderRadius={5} h={40} px={10} gap={8} >
            <MailContactUs/>
            <TextInput
             placeholder='Email'
             placeholderTextColor={colors.placeHolderColor}
             style={{flex:1,fontSize:responsiveFontSize(1.5),lineHeight:responsiveHeight(1.8)}}
             value={formik.values.email}
             onChangeText={formik.handleChange('email')}
             onBlur={formik.handleBlur('email')}
            />

          </Box>
          {(formik.errors.email && formik.touched.email) ? <Text style={{ color: 'red', paddingHorizontal: responsiveWidth(0.7) }}>{formik.errors.email}</Text> : null}

          </Box>
       
          <Dropdown
            style={[localStyles.dropdownHealthConcern,{width:'100%'}]}
            placeholderStyle={localStyles.placeholderStyle}
            selectedTextStyle={localStyles.selectedHealthConcernTextStyle}
            data={healthIssueOptions}
            labelField="label"
            valueField="value"
            placeholder={'Select your Health Concern'}
            value={formik.values.healthconcern}
            onChange={onChangeHealthIssue}
            renderRightIcon={() => <BottomIcon />}
            itemTextStyle={localStyles.selectedTextStyle}
            itemContainerStyle={localStyles.itemContainerStyle}
            renderItem={(item) => { return (<Text fontFamily='$InterMedium' fontSize={12} lineHeight={14} numberOfLines={1}  px={10} py={10} >{item?.label}</Text>) }}
            // activeColor={colors.primary}
          
          />

          <PrimaryButton disabled={useContactUsMutation?.isPending} loading={useContactUsMutation?.isPending} buttonText='Submit' onPress={formik.handleSubmit} />
          
        </Box>}

        <Box mt={30} gap={15} >
          <Text fontFamily='$InterBold' fontSize={14} lineHeight={17} numberOfLines={1} color={colors.black} >Get in touch with us today!</Text>
          <Text fontFamily='$InterRegular' fontSize={12} lineHeight={15} numberOfLines={2} color={colors.black} w={350} >If you have any inquiries get in touch with us. We’ll be happy to help you</Text>
           <Box flexDirection='row' alignItems='center' gap={15} borderWidth={1} borderColor={colors.primary} borderRadius={10} px={10} py={8} >
            <CallBlackIcon/>
            <Text fontFamily='$InterMedium' fontSize={12} lineHeight={15} numberOfLines={1} color={colors.black} >+91 6390905453</Text>
           </Box>
           <Box flexDirection='row' alignItems='center' gap={15} borderWidth={1} borderColor={colors.primary} borderRadius={10} px={10} py={8} >
            <MailBlackIcon/>
            <Text fontFamily='$InterMedium' fontSize={12} lineHeight={15} numberOfLines={1} color={colors.black} >care@sushainclinic.com</Text>
           </Box>
        </Box>

        <Box mt={20} gap={15} >
          <Text fontFamily='$InterBold' fontSize={14} lineHeight={17} numberOfLines={1} color={colors.black} >Social Media</Text>
          <Box flexDirection='row' alignItems='center' gap={10} >
            <FacebookContactUs width={moderateScale(40)} height={moderateScale(40)} />
            <Text fontFamily='$InterRegular' fontSize={12} lineHeight={15} numberOfLines={2} color={colors.black} w={300} >Stay connected with us on Facebook for the latest updates</Text>
          </Box>
          <Box flexDirection='row' alignItems='center' gap={10} >
            <InstaContactUs width={moderateScale(40)} height={moderateScale(40)}/>
            <Text fontFamily='$InterRegular' fontSize={12} lineHeight={15} numberOfLines={2} color={colors.black} w={300} >Join our vibrant community on Instagram and stay inspired</Text>
          </Box>
          <Box flexDirection='row' alignItems='center' gap={10} >
            <YouTubeContactUs width={moderateScale(40)} height={moderateScale(40)}/>
            <Text fontFamily='$InterRegular' fontSize={12} lineHeight={15} numberOfLines={2} color={colors.black} w={300} >Subscribe to our YouTube channel for insightful content and endless inspiration</Text>
          </Box>

        
        </Box>




      </Box>

    </Container>
  )
}

export default ContactUs

const localStyles = StyleSheet.create({
  dropdown: {
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: moderateScale(6),
    height: moderateScale(20),
    ...styles.pv15,
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
    color: colors.primary,
  },
  itemContainerStyle: {
    // ...styles.ph10,
    // backgroundColor: 'red',
  },
  dropdownHealthConcern: {
    borderColor: '#E0DCDC',
    borderWidth: 1,
    borderRadius: moderateScale(6),
    height: moderateScale(20),
    // width:responsiveWidth(90),
    ...styles.pv15,
    ...styles.ph10,
    // ...styles.mt5,
  },
  selectedHealthConcernTextStyle: {
    ...typography.fontSizes.f12,
    ...typography.fontWeights.Medium,
    color: colors.black,
  },
})