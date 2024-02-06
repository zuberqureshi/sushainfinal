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
import { Box } from '@gluestack-ui/themed'
import SubHeader from '../../components/common/CommonComponent/SubHeader'
import PrimaryButton from '../../components/common/Button/PrimaryButton'

const ConsultDoctor = () => {

  const [healthIssue, setHealthIssue] = useState('')
  const [language, setLanguage] = useState('')
  const [healthIssueOptions, setHealthIssueOptions] = useState()
  const [applyCoupon, setApplyCoupon] = useState(false)

  const [isChecked, setIsChecked] = useState(false)

  const onChangeHealthIssue = (item: any) => setHealthIssue(item.value);

  const onChangeLanguage = (item: any) => setLanguage(item.value);

  //api call
  const { data, isLoading } = useGetFindADoctor()
  const { data: speclizationlistData, isLoading: isLoadingSpeclizationlist } = useGetInstantspeclizationlist()
  const { data: doctorBySpeclizationData, isLoading: doctorBySpeclizationIsLoading, isPending } = useGetInstantDoctorsBySpeclization({ specialization: !!healthIssue ? healthIssue : 'Diabetes' })
  //  console.log(doctorBySpeclizationData?.data?.result[0].instantdocList[0],'INSTANAT')

  useEffect(() => {
    if (speclizationlistData?.data && !isLoadingSpeclizationlist) {
      const updatedData = speclizationlistData?.data?.result[0]?.specList?.map((item: any) => {

        return { id: item?.id, label: item?.name, value: item?.name }
      })

      setHealthIssueOptions(updatedData)
    }

  }, [speclizationlistData?.data, isLoadingSpeclizationlist,])




  if (isLoading) {
    return (
      <Container statusBarStyle='dark-content' >
        <CHeader title={strings.consultDoctor} />
        <Loader />
      </Container>
    )
  }

  // useEffect(() => {
  //   // const fetchData = async () => {
  //   //   // const data = await findDoctorHomeAPI();
  //   //   // console.log('FindADoctor', data);
  //   //   const apiUrl = `${API_BASE_URL}booking/videomainpage`; // Replace with your API endpoint

  //   //   // Make a GET request using the fetch method
  //   //   fetch(apiUrl, {
  //   //     method: 'GET',
  //   //     headers: {
  //   //       // Add any headers if required (e.g., Authorization, Content-Type, etc.)
  //   //       'Content-Type': 'application/json',
  //   //     },
  //   //   })
  //   //     .then(response => {
  //   //       if (!response.ok) {
  //   //         throw new Error(`HTTP error! Status: ${response.status}`);
  //   //       }
  //   //       return response.json(); // Assuming the response is in JSON format
  //   //     })
  //   //     .then(data => {
  //   //       // Handle the data from the successful API response
  //   //       console.log('API response:', data?.data[0]?.bannerList);
  //   //       // setBannerData(data?.data[0]?.bannerList)
  //   //       // setSpecializationList(data?.data[0]?.specializationList)
  //   //       setApiData(data?.data[0])
  //   //       setLoader(false)
  //   //     })
  //   //     .catch(error => {
  //   //       // Handle errors
  //   //       console.error('API error:', error);
  //   //     });
  //   // };
  //   // fetchData();
  // }, []);



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
              value={healthIssue}
              onChange={onChangeHealthIssue}
              renderRightIcon={() => <DownArrowWhite width={responsiveWidth(4)} />}
              // itemTextStyle={styles.selectedTextStyle}
              itemContainerStyle={styles.itemContainerStyle}
              renderSelectedItem={(item, unSelect) => (
                      <CText>jklkjl</CText>
              )}
              
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
              value={language}
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
                // setPayPrice('')
                // formik.setFieldValue('couponcode', '')
              }} >
                <CrossBottomTab />
              </Pressable>

            </View> :
              <>
                <TextInput
                  style={[styles.inputTextField, { marginLeft: responsiveWidth(1.3) }]}
                  // value={formik.values.couponcode}
                  // onChangeText={formik.handleChange('couponcode')}
                  placeholderTextColor={colors.placeHolderColor}
                  placeholder='Enter Coupon code here'

                />
                <PrimaryButton  onPress={() => { setApplyCoupon(true) }}  buttonText='Apply' height={responsiveHeight(5)} />
              </>}


        </View>


        <View style={styles.paymentDetailWrapper} >

          <Text style={styles.paymentDetailHeading}  >{strings.paymentDetails}</Text>

          <View style={{ marginTop: responsiveHeight(2), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: responsiveWidth(4), }} >
            <Text style={styles.cousultationFeeText}>{strings.consultationFee}</Text>
            <Text style={styles.cousultationFeeRateText}>750</Text>
          </View>

          <View style={styles.dividerLine} ></View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: responsiveWidth(4), }} >
            <Text style={styles.amountPayText} >{strings.amounttoPay}</Text>
            <Text style={styles.amountPayRateText} >{'\u20B9'}750</Text>
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

            <TouchableOpacity style={styles.totalFeesButtonWrapper} >

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