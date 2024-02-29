import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, ScrollView, TextInput, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import CSafeAreaView from '../../components/common/CSafeAreaView'
import CHeader from '../../components/common/CHeader'
import strings from '../../i18n/strings'
import commonStyle from '../../themes/commonStyle'
import CText from '../../components/common/CText'
import { colors } from '../../themes'
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions'
import { Dropdown } from 'react-native-element-dropdown'
import { healthIssuesData, languageData } from '../../api/constant'
import { ArrowDown, BottomIcon, CrossBottomTab, DownArrowWhite, PrescriptionDrawerIcon } from '../../assets/svgs'
import typography from '../../themes/typography'
import flex from '../../themes/flex'
import TopDoctor from '../../components/DoctorComponent/TopDoctor'
import Icon from 'react-native-vector-icons/Ionicons';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckBox from 'react-native-check-box'
import { API_BASE_URL, API_IMAGE_BASE_URL } from '@env'
import Loader from '../../components/Loader/Loader'
import useGetFindADoctor from '../../hooks/doctor/find-a-doctor';
import { Container } from '../../components/Container'
import useGetSpeclizationlist from '../../hooks/home/get-speclization-list'
import useGetInstantspeclizationlist from '../../hooks/instantdoctor/get-instant-speclizationlist'
import useGetInstantDoctorsBySpeclization from '../../hooks/instantdoctor/get-instant -doctorlist'
import { Box, Toast, ToastTitle, VStack, useToast } from '@gluestack-ui/themed'
import SubHeader from '../../components/common/CommonComponent/SubHeader'
import PrimaryButton from '../../components/common/Button/PrimaryButton'
import { useFormik } from 'formik'
import useCheckCouponCode from '../../hooks/booking/check-coupon-code'
import { getAccessToken } from '../../utils/network'

const ConsultDoctor = () => {

  const [healthIssue, setHealthIssue] = useState('')
  // const [language, setLanguage] = useState('')
  const [healthIssueOptions, setHealthIssueOptions] = useState()
  const [applyCoupon, setApplyCoupon] = useState(false)
  const [payPrice, setPayPrice] = useState('')
  const [isChecked, setIsChecked] = useState(false)
  const [mediType, setMediType] = useState<string>('')
 
   const toast = useToast()
   
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { healthissue: "", language: "", couponcode: ""},
    // validationSchema: patientBookingValidationSchema,
    onSubmit: values => {
      // updateProfile(values.country,values.address,values.name,values.mobile)
      // console.log('updatePatient', values);
      // action.resetForm()
      // loadUserInfo();
      if(isChecked){
      if (!(!!values.healthissue) || !(!!values.language)) {
        toast.show({
          placement: "bottom",
          render: ({ id }) => {
            const toastId = "toast-" + id
            return (
              <Toast nativeID={toastId} action='warning' variant="accent">
                <VStack space="xs">
                  <ToastTitle>Please select HealthIssue & Language</ToastTitle>

                </VStack>
              </Toast>
            )
          },
        })

      } else {
        console.log(values,'sbmit jjj');
      }
     }else{
      toast.show({
        placement: "bottom",
        render: ({ id }) => {
          const toastId = "toast-" + id
          return (
            <Toast nativeID={toastId} action="warning" variant="accent">
              <VStack space="xs">
                <ToastTitle>Please accept T&C</ToastTitle>

              </VStack>
            </Toast>
          )
        },
      })
     }
    },

  });

  const fetchType = async () => {
    let medType = await getAccessToken('medType')
    console.log({ medType });
    setMediType(medType)
    return medType;

  }
  
  useEffect(() => {
    fetchType();
  }, []);

  //api call
  const { data: speclizationlistData, isLoading: isLoadingSpeclizationlist } = useGetInstantspeclizationlist()
  const { data: doctorBySpeclizationData, isLoading: doctorBySpeclizationIsLoading, isPending } = useGetInstantDoctorsBySpeclization({ specialization: !!formik.values.healthissue ? formik.values.healthissue : 'Diabetes' , type : mediType})
  const useCheckCouponCodeMutation = useCheckCouponCode()
  //  console.log(doctorBySpeclizationData?.data?.result[0].instantdocList[0],'INSTANAT')

  useEffect(() => {
    if (speclizationlistData?.data && !isLoadingSpeclizationlist) {
      const updatedData = speclizationlistData?.data?.result[0]?.specList?.map((item: any) => {

        return { id: item?.id, label: item?.name, value: item?.name }
      })

      setHealthIssueOptions(updatedData)
    }

  }, [speclizationlistData?.data, isLoadingSpeclizationlist,])


  const onChangeHealthIssue = (item: any) => formik.setFieldValue('healthissue',item.value);

  const onChangeLanguage = (item: any) => formik.setFieldValue('language',item.value);

  const onClickCheckCoupon = () => {
    if(formik.values.couponcode.length<=0 || formik.values.couponcode === '' ){
     toast.show({
       placement: "bottom",
       render: ({ id }: { id: string }) => {
         const toastId = "toast-" + id
         return (
           <Toast nativeID={toastId} variant="accent" action="error">
             <ToastTitle>Please enter a coupon code</ToastTitle>
           </Toast>
         );
       },
     })
    }
    else{
       const payload = {
         coupon_code: formik.values.couponcode,
         type: "APPOINTMENT",
         userid: '',
         displayMode: "NATIVEAPP",
         Totalmrp: '715'
       }
   
       useCheckCouponCodeMutation.mutate(payload, {
         onSuccess: (data) => {
           console.log(data?.data?.result[0]?.finalPrice);
   
           toast.show({
             placement: "bottom",
             render: ({ id }: { id: string }) => {
               const toastId = "toast-" + id
               return (
                 <Toast nativeID={toastId} variant="accent" action="success">
                   <ToastTitle>Coupon Applied</ToastTitle>
                 </Toast>
               );
             },
           })
           setPayPrice(data?.data?.result[0]?.finalPrice)
           setApplyCoupon(true)
   
         },
         onError: (error: any) => {
   
           toast.show({
             placement: "bottom",
             render: ({ id }: { id: string }) => {
               const toastId = "toast-" + id
               return (
                 <Toast nativeID={toastId} variant="accent" action="error">
                   <ToastTitle>Something went wrong, please try again later</ToastTitle>
                 </Toast>
               );
             },
           })
         }
       })
   
       }
     }

  if (isLoadingSpeclizationlist) {
    return (
      <Container statusBarStyle='dark-content' >
        <CHeader title={strings.consultDoctor} />
        <Loader />
      </Container>
    )
  }





  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#EEEBEB' }} >


      <CHeader
        title={strings.consultDoctor}

      />

      <ScrollView showsVerticalScrollIndicator={false} >
        <View style={styles.preferredLanguage} >
          <CText
            style={{ paddingLeft: responsiveWidth(4) }}
            type={'s14'}
          >
            {strings.chooseyourPreferredLanguage}
          </CText >

          <CText
            style={{ paddingLeft: responsiveWidth(4) }}
            type={'m10'}
          >
            {strings.wewilltrytofinddoctorwhocanspeakthelanguage}
          </CText >

          <View style={[flex.flexRow, { gap: responsiveWidth(2), paddingLeft: responsiveWidth(4), marginTop: responsiveHeight(1) }]} >

            <Dropdown
              data={healthIssueOptions}
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              showsVerticalScrollIndicator={false}
              renderItem={(item)=>{return(<CText type='m12' numberOfLines={1} style={{paddingHorizontal:responsiveWidth(2.5),paddingVertical:responsiveHeight(1)}} >{item?.label}</CText>)}}
              labelField="label"
              valueField="value"
              placeholder={strings.healthIssues}
              value={formik.values.healthissue}
              onChange={onChangeHealthIssue}
              renderRightIcon={() => <DownArrowWhite width={responsiveWidth(4)} />}
              // itemTextStyle={styles.selectedTextStyle}
              itemContainerStyle={styles.itemContainerStyle}
              selectedTextProps={{ numberOfLines: 1 }}
              
            />

            <Dropdown
              data={languageData}
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              renderItem={(item)=>{return(<CText type='m12' numberOfLines={1} style={{paddingHorizontal:responsiveWidth(2.5),paddingVertical:responsiveHeight(1)}} >{item?.label}</CText>)}}
              labelField="label"
              valueField="value"
              placeholder={strings.language}
              value={formik.values.language}
              onChange={onChangeLanguage}
              renderRightIcon={() => <DownArrowWhite width={responsiveWidth(4)} />}
              // itemTextStyle={styles.selectedTextStyle}
              itemContainerStyle={styles.itemContainerStyle}
            />

          </View>


          <CText
            style={{ paddingLeft: responsiveWidth(4), fontFamily: 'Inter-SemiBold', fontSize: responsiveFontSize(2), marginTop: responsiveHeight(3), marginBottom: responsiveHeight(1) }}

          >
            {strings.weWillAssignYouaTopDoctorFromBelow}
          </CText >
          {/* 
        <TopDoctor subHeader='false' /> */}
          {!!doctorBySpeclizationData?.data?.result[0]?.instantdocList ? <TopDoctor data={doctorBySpeclizationData?.data?.result[0].instantdocList} /> : 
           <Box>
            <SubHeader title={strings.topRatedDoctors} />
            <Loader/>
           </Box>
          }


        </View>


        <View style={styles.onlineConsultationWrapper} >
          <CText
            type={'m14'}
            style={{ marginTop: responsiveHeight(1) }}
          >
            {strings.onlineConsultation}
          </CText>

          <CText
            type={'r12'}
            style={{ color: '#237B89', marginTop: responsiveHeight(1) }}
          >
            {strings.keyBenefits}
          </CText>




          <View style={{ flexDirection: 'row', alignItems: 'center', gap: responsiveWidth(1), marginTop: responsiveHeight(0.5) }} >
            <Icon name="documents-outline" size={responsiveWidth(4)} color={colors.success} />
            <Text style={{ color: colors.black, fontFamily: 'Inter-Regular', fontSize: responsiveFontSize(1.7) }} >{strings.freeFollowupafter7Days}</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: responsiveWidth(1) }} >
            <Icon name="document-text-outline" size={responsiveWidth(4)} color={colors.success} />
            <Text style={{ color: colors.black, fontFamily: 'Inter-Regular', fontSize: responsiveFontSize(1.7) }} >{strings.digitalPrescription}</Text>
          </View>

        </View>

        <View style={styles.applyCouponWrapper} >

          {/* <Text style={styles.applyCouponText} >{strings.applyCouponCode}</Text>
          <MIcon name="greater-than" size={responsiveWidth(5)} color={colors.black} />
 */}     
              {applyCoupon ? <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: responsiveHeight(1), paddingHorizontal: responsiveWidth(2.5), borderWidth: 1, borderStyle: 'dashed', borderColor: colors.primary, borderRadius: responsiveWidth(1.5), flex: 1, justifyContent: 'space-between', marginLeft: responsiveWidth(1.4) }} >
              <CText type='m12' color={colors.primary} >{'RL50'}</CText>
              <Pressable onPress={() => {
                setApplyCoupon(false)
                setPayPrice('')
                formik.setFieldValue('couponcode', '')
              }} >
                <CrossBottomTab />
              </Pressable>

            </View> :
              <>
                <TextInput
                  style={[styles.inputTextField, { marginLeft: responsiveWidth(1.3) }]}
                  value={formik.values.couponcode}
                  onChangeText={formik.handleChange('couponcode')}
                  placeholderTextColor={colors.placeHolderColor}
                  placeholder='Enter Coupon code here'

                />
                <PrimaryButton disabled={useCheckCouponCodeMutation.isPending} loading={useCheckCouponCodeMutation.isPending}   onPress={() => { onClickCheckCoupon() }}  buttonText='Apply' height={responsiveHeight(5)} />
              </>}


        </View>


        <View style={styles.paymentDetailWrapper} >

          <Text style={styles.paymentDetailHeading}  >{strings.paymentDetails}</Text>

          <View style={{ marginTop: responsiveHeight(2), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: responsiveWidth(4), }} >
            <Text style={styles.cousultationFeeText}>{strings.consultationFee}</Text>
            <Text style={styles.cousultationFeeRateText}>715</Text>
          </View>

          <View style={styles.dividerLine} ></View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: responsiveWidth(4), }} >
            <Text style={styles.amountPayText} >{strings.amounttoPay}</Text>

            <View style={{flexDirection:'row',alignItems:'center'}} >
            <Text style={styles.amountPayRateText} >{'\u20B9'}{!!payPrice ? `${payPrice} ` : '715'}</Text>
            { !!payPrice && <Text style={{color: colors.black,...typography.fontWeights.Regular,fontSize: responsiveFontSize(1.6),textDecorationLine:'line-through'}} >{ '715'}</Text>}
            </View>
          
          </View>



          <View style={{ marginTop: responsiveHeight(4), flexDirection: 'row', alignItems: 'center', paddingHorizontal: responsiveWidth(4), }} >
            <CheckBox
              style={{}}
              onClick={() => {
                setIsChecked(!isChecked)
              }}

              isChecked={isChecked}
              checkBoxColor={'#D0D0D0'}
              // leftText={"CheckBox"}
              checkedCheckBoxColor={colors.primary}
            />

            <Text style={styles.iagreetotheseText} >{strings.iagreetothese} <Text style={{ color: colors.primary }} >{strings.termsandConditionsCancelPolicy}</Text></Text>
          </View>

          <View style={styles.totalFeesWrapper} >

            <View style={{ flexDirection: 'row', alignItems: 'center', }} >
              <Text style={styles.totalFeesText} >{strings.totalFees}</Text>
              <Text style={styles.totalFeesRateText} > {'\u20B9'}750</Text>

            </View>

            <TouchableOpacity onPress={formik.handleSubmit} style={styles.totalFeesButtonWrapper} >

              <Text style={styles.totalFeesButtonText} >{strings.payConsult}</Text>


            </TouchableOpacity>




          </View>



        </View>



      </ScrollView>
    </SafeAreaView>
  )
}

export default ConsultDoctor;

const styles = StyleSheet.create({
  preferredLanguage: {
    backgroundColor: colors.white,
    paddingTop: responsiveHeight(3),
    gap: responsiveHeight(0.5),
    paddingBottom: responsiveHeight(2),

  },
  dropdown: {
    backgroundColor: colors.primary,
    width: responsiveWidth(33),
    paddingHorizontal: responsiveWidth(2),
    borderRadius: responsiveWidth(2),
    paddingLeft: responsiveWidth(3),
    color: 'red',


  },
  selectedTextStyle: {
    color: colors.white,
    ...typography.fontWeights.SemiBold,
    ...typography.fontSizes.f12,
    textTransform: 'capitalize',
   
    
  },
  itemContainerStyle: {

  },
  placeholderStyle: {
    color: colors.white,
    ...typography.fontWeights.SemiBold,
    ...typography.fontSizes.f12,
    textTransform: 'capitalize'

  },
  onlineConsultationWrapper: {
    backgroundColor: colors.white,
    marginTop: responsiveHeight(1),
    gap: responsiveHeight(0.5),
    paddingBottom: responsiveHeight(2),
    paddingLeft: responsiveWidth(4)

  },
  applyCouponWrapper: {
    backgroundColor: colors.white,
    marginTop: responsiveHeight(1),
    flexDirection: 'row',
    paddingVertical: responsiveHeight(2),
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(4),
    justifyContent: 'space-between',


  },
  applyCouponText: {
    color: colors.black,
    ...typography.fontWeights.Regular,
    fontSize: responsiveFontSize(1.7)
  },
  paymentDetailWrapper: {
    backgroundColor: colors.white,
    marginTop: responsiveHeight(1),
    paddingTop: responsiveHeight(2),

  },
  paymentDetailHeading: {
    color: colors.black,
    ...typography.fontWeights.Bold,
    fontSize: responsiveFontSize(1.7),
    paddingHorizontal: responsiveWidth(4),

  },
  dividerLine: {
    borderBottomColor: '#9E9E9E',
    borderBottomWidth: 1,
    marginVertical: responsiveHeight(1),
    marginHorizontal: responsiveWidth(4),

  },
  cousultationFeeText: {
    color: '#565252',
    ...typography.fontWeights.Regular,
    fontSize: responsiveFontSize(1.6),

  },
  cousultationFeeRateText: {
    color: '#565252',
    ...typography.fontWeights.Medium,
    fontSize: responsiveFontSize(1.5)
  },
  amountPayText: {
    color: colors.black,
    ...typography.fontWeights.SemiBold,
    fontSize: responsiveFontSize(1.6)
  },
  amountPayRateText: {
    color: colors.black,
    ...typography.fontWeights.Bold,
    fontSize: responsiveFontSize(1.6)

  },
  iagreetotheseText: {
    color: colors.black,
    ...typography.fontWeights.Regular,
    fontSize: responsiveFontSize(1.7),
    marginLeft: responsiveWidth(5)
  },
  totalFeesWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: responsiveHeight(10),
    backgroundColor: '#FBEADE',
    paddingVertical: responsiveHeight(2),
    borderTopLeftRadius: responsiveWidth(4),
    borderTopRightRadius: responsiveWidth(4),
    paddingHorizontal: responsiveWidth(4)
  },
  totalFeesRateText: {

    color: colors.black,
    ...typography.fontWeights.Bold,
    fontSize: responsiveFontSize(1.8)
  },
  totalFeesText: {
    color: colors.black,
    ...typography.fontWeights.Bold,
    fontSize: responsiveFontSize(1.8)
  },
  totalFeesButtonText: {
    color: colors.white,
    ...typography.fontWeights.Bold,
    fontSize: responsiveFontSize(1.8)
  },
  totalFeesButtonWrapper: {
    backgroundColor: '#FD872E',
    paddingHorizontal: responsiveWidth(3),
    paddingVertical: responsiveHeight(1),
    borderRadius: responsiveWidth(3)

  },
  couponStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsiveWidth(3.5),
    marginVertical: responsiveHeight(2.5)
    //  paddingHorizontal:responsiveWidth(1.5)

  },
  inputTextField: {
    color: colors.black,
    ...typography.fontSizes.f12,
    ...typography.fontWeights.Medium,
    flex: 1,
    borderWidth: 1,
    borderColor: colors.primary,
    // ...styles.ph10,
    paddingHorizontal:responsiveWidth(2.4),
    height: responsiveHeight(5),
    borderRadius: responsiveWidth(1.5),
    // , ...styles.mv5
    // marginVertical:responsiveHeight(1.4),
    marginRight:responsiveWidth(3)
  }




})