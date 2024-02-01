import { StyleSheet, Text, View,SafeAreaView,Image,TouchableOpacity,ScrollView } from 'react-native'
import React,{useState,useEffect} from 'react'
import CSafeAreaView from '../../components/common/CSafeAreaView'
import CHeader from '../../components/common/CHeader'
import strings from '../../i18n/strings'
import commonStyle from '../../themes/commonStyle'
import CText from '../../components/common/CText'
import { colors } from '../../themes'
import { responsiveWidth,responsiveHeight,responsiveFontSize } from 'react-native-responsive-dimensions'
import { Dropdown } from 'react-native-element-dropdown'
import { healthIssuesData, languageData } from '../../api/constant'
import { ArrowDown, BottomIcon, DownArrowWhite, PrescriptionDrawerIcon } from '../../assets/svgs'
import typography from '../../themes/typography'
import flex from '../../themes/flex'
import TopDoctor from '../../components/DoctorComponent/TopDoctor'
import Icon from 'react-native-vector-icons/Ionicons';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckBox from 'react-native-check-box'
import { API_BASE_URL, API_IMAGE_BASE_URL } from '@env'
import Loader from '../../components/Loader/Loader'
import useGetFindADoctor from '../../hooks/doctor/find-a-doctor';

const ConsultDoctor = () => {

  const [healthIssue, setHealthIssue] = useState('')
  const [language, setLanguage] = useState('')

  const [isChecked, setIsChecked] = useState(false)

  const onChangeHealthIssue = (item: any) => setHealthIssue(item.value);

  const onChangeLanguage = (item: any) => setLanguage(item.value);

   //api call
   const {data,isLoading} = useGetFindADoctor()
   console.log(data?.data?.result[0],'INSTANAT')
   if (isLoading) {
     return (
       <Loader />
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
   <SafeAreaView style={{flex:1,backgroundColor:'#EEEBEB'}} >
    

     <CHeader
      title={strings.consultDoctor}
      
     />
 
 <ScrollView showsVerticalScrollIndicator={false} >
     <View style={styles.preferredLanguage} >
       <CText
       style={{paddingLeft:responsiveWidth(4)}}
        type={'s14'}
        >
          {strings.chooseyourPreferredLanguage}
        </CText >

        <CText
        style={{paddingLeft:responsiveWidth(4)}}
        type={'m10'}
        >
          {strings.wewilltrytofinddoctorwhocanspeakthelanguage}
        </CText >

        <View style={[flex.flexRow,{gap:responsiveWidth(2),paddingLeft:responsiveWidth(4),marginTop:responsiveHeight(1)}]} >

        <Dropdown
        data={healthIssuesData} 
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
    
        labelField="label"
        valueField="value"
        placeholder={strings.healthIssues}
        value={healthIssue}
        onChange={onChangeHealthIssue}
        renderRightIcon={() => <DownArrowWhite width={responsiveWidth(4)} />}
        // itemTextStyle={styles.selectedTextStyle}
        itemContainerStyle={styles.itemContainerStyle}
        />

<Dropdown
        data={languageData} 
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
    
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
        style={{paddingLeft:responsiveWidth(4),fontFamily:'Inter-SemiBold',fontSize:responsiveFontSize(2),marginTop:responsiveHeight(3),marginBottom:responsiveHeight(1)}}
        
        >
          {strings.weWillAssignYouaTopDoctorFromBelow}
        </CText >
{/* 
        <TopDoctor subHeader='false' /> */}
      {data?.data?.result[0]?.topDoctorList && <TopDoctor data={data?.data?.result[0].topDoctorList} />}
     
  
     </View>


     <View style={styles.onlineConsultationWrapper} >
       <CText
       type={'m14'} 
       style={{marginTop:responsiveHeight(1)}}
       >
         {strings.onlineConsultation}
       </CText>

       <CText
       type={'r12'}
       style={{color:'#237B89',marginTop:responsiveHeight(1)}}
       >
         {strings.keyBenefits}
       </CText>


     

       <View style={{flexDirection:'row',alignItems:'center',gap:responsiveWidth(1),marginTop:responsiveHeight(0.5)}} >
        <Icon name="documents-outline" size={responsiveWidth(4)} color={colors.success} />
        <Text style={{color:colors.black,fontFamily:'Inter-Regular',fontSize:responsiveFontSize(1.7)}} >{strings.freeFollowupafter7Days}</Text>
       </View>

       <View style={{flexDirection:'row',alignItems:'center',gap:responsiveWidth(1)}} >
        <Icon name="document-text-outline" size={responsiveWidth(4)}  color={colors.success}  />
        <Text style={{color:colors.black,fontFamily:'Inter-Regular',fontSize:responsiveFontSize(1.7)}} >{strings.digitalPrescription}</Text>
       </View>

     </View>

     <View style={styles.applyCouponWrapper} >

      <Text style={styles.applyCouponText} >{strings.applyCouponCode}</Text>
      <MIcon name="greater-than" size={responsiveWidth(5)} color={colors.black} />

      
       
     </View>


     <View style={styles.paymentDetailWrapper} >

      <Text style={styles.paymentDetailHeading}  >{strings.paymentDetails}</Text>

        <View style={{marginTop:responsiveHeight(2),flexDirection:'row',justifyContent:'space-between',alignItems:'center', paddingHorizontal:responsiveWidth(4),}} >
          <Text style={styles.cousultationFeeText}>{strings.consultationFee}</Text>
          <Text style={styles.cousultationFeeRateText}>750</Text>
        </View>

        <View style={styles.dividerLine} ></View>

        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center', paddingHorizontal:responsiveWidth(4),}} >
          <Text style={styles.amountPayText} >{strings.amounttoPay}</Text>
          <Text style={styles.amountPayRateText} >{'\u20B9'}750</Text>
        </View>



        <View style={{marginTop:responsiveHeight(4),flexDirection:'row',alignItems:'center', paddingHorizontal:responsiveWidth(4),}} >
        <CheckBox
    style={{}}
    onClick={()=>{
        setIsChecked(!isChecked)
    }}
    
    isChecked={isChecked}
    checkBoxColor={'#D0D0D0'}
    // leftText={"CheckBox"}
    checkedCheckBoxColor={colors.primary}
/>

          <Text style={styles.iagreetotheseText} >{strings.iagreetothese} <Text  style={{color:colors.primary}} >{strings.termsandConditionsCancelPolicy}</Text></Text>
        </View>

        <View style={styles.totalFeesWrapper} >

          <View style={{flexDirection:'row',alignItems:'center',}} >
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
  preferredLanguage:{
    backgroundColor:colors.white,
    paddingTop:responsiveHeight(3),
    gap:responsiveHeight(0.5),
    paddingBottom:responsiveHeight(2),
    
  },
  dropdown:{
   backgroundColor:colors.primary,
   width:responsiveWidth(33),
   paddingHorizontal:responsiveWidth(2),
   borderRadius:responsiveWidth(2),
   paddingLeft:responsiveWidth(3),
   color:'red',
   

  },
  selectedTextStyle:{
    color:colors.white,
    ...typography.fontWeights.SemiBold,
    ...typography.fontSizes.f12,
    textTransform:'capitalize'
  },
  itemContainerStyle:{
   
  },
  placeholderStyle:{
    color:colors.white,
    ...typography.fontWeights.SemiBold,
    ...typography.fontSizes.f12,
    textTransform:'capitalize'
    
  },
  onlineConsultationWrapper:{
    backgroundColor:colors.white,
    marginTop:responsiveHeight(1),
    gap:responsiveHeight(0.5),
    paddingBottom:responsiveHeight(2),
    paddingLeft:responsiveWidth(4)
    
  },
  applyCouponWrapper:{
    backgroundColor:colors.white,
    marginTop:responsiveHeight(1),
    flexDirection:'row',
    paddingVertical:responsiveHeight(2),
    alignItems:'center',
    paddingHorizontal:responsiveWidth(4),
    justifyContent:'space-between',


  },
  applyCouponText:{
    color:colors.black,
    ...typography.fontWeights.Regular,
    fontSize:responsiveFontSize(1.7)
  },
  paymentDetailWrapper:{
    backgroundColor:colors.white,
    marginTop:responsiveHeight(1),
    paddingTop:responsiveHeight(2),
   
  },
  paymentDetailHeading:{
    color:colors.black,
    ...typography.fontWeights.Bold,
    fontSize:responsiveFontSize(1.7),
    paddingHorizontal:responsiveWidth(4),

  },
  dividerLine:{
    borderBottomColor:'#9E9E9E',
    borderBottomWidth:1,
    marginVertical:responsiveHeight(1),
    marginHorizontal:responsiveWidth(4),
    
  },
  cousultationFeeText:{
   color:'#565252',
   ...typography.fontWeights.Regular,
   fontSize:responsiveFontSize(1.6),

  },
  cousultationFeeRateText:{
    color:'#565252',
    ...typography.fontWeights.Medium,
    fontSize:responsiveFontSize(1.5)
  },
  amountPayText:{
    color:colors.black,
    ...typography.fontWeights.SemiBold,
    fontSize:responsiveFontSize(1.6)
  },
  amountPayRateText:{
    color:colors.black,
    ...typography.fontWeights.Bold,
    fontSize:responsiveFontSize(1.6)

  },
  iagreetotheseText:{
    color:colors.black,
    ...typography.fontWeights.Regular,
    fontSize:responsiveFontSize(1.7),
    marginLeft:responsiveWidth(5)
  },
  totalFeesWrapper:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginTop:responsiveHeight(10),
    backgroundColor:'#FBEADE',
    paddingVertical:responsiveHeight(2),
    borderTopLeftRadius:responsiveWidth(4),
    borderTopRightRadius:responsiveWidth(4),
    paddingHorizontal:responsiveWidth(4)
  },
  totalFeesRateText:{

    color:colors.black,
    ...typography.fontWeights.Bold,
    fontSize:responsiveFontSize(1.8)
  },
  totalFeesText:{
    color:colors.black,
    ...typography.fontWeights.Bold,
    fontSize:responsiveFontSize(1.8)
  },
  totalFeesButtonText:{
    color:colors.white,
    ...typography.fontWeights.Bold,
    fontSize:responsiveFontSize(1.8)
  },
  totalFeesButtonWrapper:{
    backgroundColor:'#FD872E',
    paddingHorizontal:responsiveWidth(3),
    paddingVertical:responsiveHeight(1),
    borderRadius:responsiveWidth(3)

  }




})