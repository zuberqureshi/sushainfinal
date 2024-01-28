import { SafeAreaView, StyleSheet, Text, View,TouchableOpacity,ScrollView,Image, TextInput} from 'react-native'
import React,{useState,useEffect} from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { Dropdown } from 'react-native-element-dropdown'
import Icon from 'react-native-vector-icons/Ionicons';

const CSafeAreaView = React.lazy(() => import('../../components/common/CSafeAreaView'))
const CText = React.lazy(() => import('../../components/common/CText'))
const CButton = React.lazy(() => import('../../components/common/CButton'))


// import CSafeAreaView from '../../components/common/CSafeAreaView';
import { colors,styles } from '../../themes';
import { BackArrow, DigitalPrecereption, FilterIcon, FreeFollowUp, SortIcon } from '../../assets/svgs';
import typography from '../../themes/typography';
import images from '../../assets/images';
import {getHeight, moderateScale} from '../../common/constants';
// import CText from '../../components/common/CText';
// import CButton from '../../components/common/CButton';
import strings from '../../i18n/strings';
import { cityData } from '../../api/constant';
import DoctorDetailCard from '../../components/DoctorComponent/DoctorDetailCard';


const DoctorDetailCards = ({navigation}) => {
    console.log({navigation});

    const [selectedCity, setSelectedCity] = useState('')

    const onChangeSelectedCity = (item: any) => setSelectedCity(item.value);

  const  dataCities = [
      'All','Ahmadabad','Alwaye','Amritsar','Ayodhya','Bangalore Urban','Belgaum','Bhilwara'
    ]
    
  return (
    <CSafeAreaView>
       {/* <CHeader title={'Doctors'} />
      <Text onPress={()=>{navigation.openDrawer()}} >DoctorDetailCad</Text> */}
      <View style={localStyles.headerWrapper} >
        <View style={{flexDirection:'row',alignItems:'center'}} >
        <TouchableOpacity style={styles.mr15} onPress={()=>{navigation.goBack()}}>
            <BackArrow height={responsiveHeight(2.2)} width={responsiveWidth(7)} />

          </TouchableOpacity>

          <Text style={localStyles.headerText}>Doctors</Text>


        </View>

        <View style={{flexDirection:'row',alignItems:'center'}} >
        <Icon name="location-sharp" size={responsiveWidth(5)} color={colors.success} />
        <Text style={localStyles.headerSubText}>Pune</Text>
        </View>

     
      </View>

      <ScrollView style={styles.flex} showsVerticalScrollIndicator={false}>

      <TouchableOpacity style={localStyles.bannerContaienr}>
          <Image
            source={images.clinicBanner}
            style={localStyles.bannerImageStyle}
            resizeMode="cover"
          />
        </TouchableOpacity>

        <View style={localStyles.bottomBanerContainer}>
          <FreeFollowUp />
          <CText type="m8" style={styles.pl5}>
            Free follow up
          </CText>
          <CText type="s12" color={colors.dividerColor} style={styles.ph5}>
            {' | '}
          </CText>
          <DigitalPrecereption />
          <CText type="m8" style={styles.pl5}>
            {'Get Digital Prescription'}
          </CText>
          <CText type="s12" color={colors.dividerColor} style={styles.ph5}>
            {' | '}
          </CText>
          <DigitalPrecereption />
          <CText type="m8" numberOfLines={1} style={[styles.pl5, styles.flex]}>
            {'Toxin-Free Natural Medications '}
          </CText>
        </View>


        <View style={localStyles.buttonContinerStyle}>

        <Dropdown
        data={cityData} 
        style={localStyles.dropdown}
        placeholderStyle={localStyles.placeholderStyle}
        selectedTextStyle={localStyles.selectedTextStyle}
    
        labelField="label"
        valueField="value"
        placeholder={strings.selectCity}
        value={selectedCity}
        onChange={onChangeSelectedCity}
        renderLeftIcon={() => <Icon name="location-sharp" size={responsiveWidth(4)} color={colors.success} style={{marginRight:responsiveWidth(1.5)}} /> }
        // itemTextStyle={styles.selectedTextStyle}
        itemContainerStyle={localStyles.itemContainerStyle}
        containerStyle={localStyles.containerStyle}
        itemTextStyle={localStyles.itemTextStyle}
        showsVerticalScrollIndicator={false}
       
        maxHeight={responsiveHeight(40)}
        />

  
       <View style={{flexDirection:'row',alignItems:'center'}} >
       <CButton
            title={strings.sort}
            onPress={() => {}}
            containerStyle={localStyles.btnContainerStyle}
            bgColor={colors.white}
            color={colors.black}
            style={styles.ml5}
            type="r12"
            frontIcon={<SortIcon />}
          />
          <CButton
            title={strings.filter}
            onPress={() => {}}
            containerStyle={localStyles.btnContainerStyle}
            bgColor={colors.white}
            color={colors.black}
            style={styles.ml5}
            type="r12"
            frontIcon={<FilterIcon />}
          />

        
       </View>

         
        </View>


        <View style={localStyles.talkWrapper} >

          <Text style={localStyles.talktoOurExpert} >{strings.talktoOurExpert}</Text>

          <TextInput
             placeholder='Name'
             style={localStyles.talkInput}
             placeholderTextColor={colors.gray6}
          />

         <TextInput
             placeholder='Phone Number'
             style={localStyles.talkInput}
             placeholderTextColor={colors.gray6}
          />

          <TouchableOpacity style={localStyles.talkButtonWrapper} >
            <Text style={localStyles.talkButtonText}  >{'Submit'}</Text>
          </TouchableOpacity>


        </View>



        <DoctorDetailCard title={'diabetes'} />
        

      </ScrollView>

    </CSafeAreaView>
  )
}

export default DoctorDetailCards

const localStyles = StyleSheet.create({
  headerWrapper:{
    ...styles.rowSpaceBetween,
    ...styles.ph20,
    ...styles.pv15,
    // ...styles.center,
    backgroundColor: colors.primary3,
  },
  headerText:{
    ...typography.fontWeights.SemiBold,
    color:colors.black,
    fontSize:responsiveFontSize(2)
  },
  headerSubText:{
    ...typography.fontWeights.SemiBold,
    color:colors.black,
    fontSize:responsiveFontSize(1.7)
  },
  bannerContaienr: {
    ...styles.center,
    ...styles.mh20,
  },
  bannerImageStyle: {
    width: '100%',
    height: moderateScale(140),
    ...styles.mv10,
    borderRadius: moderateScale(10),
  },
  bottomBanerContainer: {
    ...styles.ph10,
    ...styles.pv10,
    backgroundColor: colors.lightOrange,
    ...styles.flexRow,
    ...styles.itemsCenter,
    ...styles.flex,
  },
  buttonContinerStyle: {
    ...styles.flexRow,
    // ...styles.itemsCenter,
    ...styles.justifyBetween,
    ...styles.mh20,
    ...styles.mv10,
  },
  btnContainerStyle: {
    ...styles.ml10,
    ...styles.ph10,
    borderWidth: moderateScale(1),
    borderColor: colors.bColor2,
    height: getHeight(28),
    borderRadius: moderateScale(10),
  },
  dropdown:{
    // backgroundColor:colors.primary,
    width:responsiveWidth(35),
    paddingHorizontal:responsiveWidth(2),
    borderRadius:responsiveWidth(3),
    paddingLeft:responsiveWidth(3),
    color:'red',
    borderColor:'#149C5C',
    borderWidth:1,
    height:responsiveHeight(3.6)


  
    
 
   },
   selectedTextStyle:{
    color:colors.black,
    ...typography.fontWeights.Bold,
    ...typography.fontSizes.f12,
    textTransform:'capitalize'
   },
   itemContainerStyle:{
    borderBottomWidth:1,
    borderBottomColor:'#DBDDDE',
    // backgroundColor:'red',
    

  //  height:40,
  //  padding:0

  //  color:'red'

 

   },
   itemTextStyle:{
    color:colors.black,
    ...typography.fontWeights.SemiBold,
    ...typography.fontSizes.f12,
      //  textAlign:'center',
       
      //  padding:0,
       
       
   },
   placeholderStyle:{
     color:colors.black,
     ...typography.fontWeights.Bold,
     ...typography.fontSizes.f12,
     textTransform:'capitalize'
     
   },
   containerStyle:{
    borderRadius:10,
    width:responsiveWidth(40),
    borderWidth:1,
    borderColor:'#9E9E9E',

   },
   talkWrapper:{
    backgroundColor:colors.primary,
    // ...styles.center,
    ...styles.mh20,
    paddingHorizontal:responsiveWidth(5),
    paddingVertical:responsiveHeight(1.5),
    gap:responsiveHeight(1.5),
    borderRadius:responsiveWidth(5),
    marginTop:responsiveHeight(1)
   },
   talktoOurExpert:{
    color:colors.white,
    ...typography.fontWeights.SemiBold,
    ...typography.fontSizes.f14,
    textTransform:'capitalize'
   },
   talkInput:{
    backgroundColor:colors.white,
    marginBottom:1,
    borderRadius:responsiveWidth(2),
    height:responsiveHeight(4.5),
    paddingLeft:responsiveWidth(2),
    ...typography.fontWeights.SemiBold,
    fontSize:responsiveFontSize(1.5),
   
   },
   talkButtonText:{
     color:'#555555',
     ...typography.fontWeights.Medium,
     ...typography.fontSizes.f12,
   },
   talkButtonWrapper:{
       alignSelf:'center',
       backgroundColor:colors.white,
       borderRadius:responsiveWidth(1.5),
       paddingHorizontal:responsiveWidth(7),
       paddingVertical:responsiveHeight(1)
   }
})