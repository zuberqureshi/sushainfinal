import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    Image,
    ScrollView,
    FlatList,
    Pressable
  } from 'react-native';
  import React,{useState} from 'react';
  import {colors, styles} from '../../themes';
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
  import {deviceWidth, moderateScale} from '../../common/constants';
import { BottomIcon, PhoneIcon } from '../../assets/svgs';
import CText from '../../components/common/CText';
import CInput from '../../components/common/CInput';
import { addressData, sampleData } from '../../api/constant';
import { Dropdown } from 'react-native-element-dropdown';
import CheckBox from 'react-native-check-box'

import { Container } from '../../components/Container';
import Body from '../../components/Body/Body';

const MedicineAddress = () => {

    const [stepCurrentPosition,setStepCurrentPosition] = useState(1)
    const [userName, setUserName] = useState('');
    const [userNumber, setUserNumber] = useState('');
    const [userAlternateNumber, setUserAlternateNumber] = useState('');
    const [userAlternateNoShow, setUserAlternateNoShow] = useState(false);
    const [userPinCode, setUserPinCode] = useState('');
    const [userAddress, setUserAddress] = useState('');
    const [userLocation, setUserLocation] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [saveAddressType, setSaveAddressType] = useState('home');
    const [addressCheckBox, setAddressCheckBox] = useState(false)
    const [selectedAddress, setSelectedAddress] = useState(0)
    const [addNewAddress, setAddNewAddress] = useState(true)

    const onChangeUserName = (item: any) => setUserName(item);
    const onChangeUserNumber = (item: any) => setUserNumber(item);
    const onChangeUserAlternateNumber = (item: any) => setUserAlternateNumber(item);
    const onChangeUserPinCode = (item: any) => setUserPinCode(item);
    const onChangeUserAddress = (item: any) => setUserAddress(item);
    const onChangeUserLocation = (item: any) => setUserLocation(item);
    const onChangeCity = (item: any) => setCity(item.value);
    const onChangeState = (item: any) => setState(item.value);


    const labels = ["Cart","Address","Payment","Summary"];
  const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize:25,
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
  
  const onPageChange =(position) =>{
      setStepCurrentPosition(position);
  }
  return (
   <Container>
          <CHeader title='Add Address' />

     <Body>   
     
     <View style={{width: deviceWidth + responsiveWidth(15),alignSelf:'center',marginRight:responsiveWidth(2.5),paddingVertical:responsiveHeight(1.8)}} >
     <StepIndicator
         stepCount={4}
         customStyles={customStyles}
         currentPosition={stepCurrentPosition}
         labels={labels}
     />
     </View>
     
    { !addNewAddress && <View>

     
     <View style={{flexDirection:'row',alignItems:'center',paddingHorizontal:responsiveWidth(3),gap:responsiveWidth(3)}}  >
        <PhoneIcon/>
        <CText type='b14' >
        Contact Details
        </CText>

     </View>

     <View style={{paddingHorizontal:responsiveWidth(3),marginTop:responsiveHeight(1)}} >
     <CInput
          toGetTextFieldValue={onChangeUserName}
          _value={userName}
          inputBoxStyle={localStyles.placeSty}
          inputContainerStyle={localStyles.patientNameTxt}
          placeholder={'Name*'}
          inputStyle={styles.mt5}
        />
    <CInput
          toGetTextFieldValue={onChangeUserNumber}
          _value={userNumber}
          inputBoxStyle={localStyles.placeSty}
          inputContainerStyle={localStyles.patientNameTxt}
          placeholder={'Mobile No*'}
          inputStyle={styles.mt5}
          keyBoardType={'number-pad'}
        />
  { userAlternateNoShow &&  <CInput
          toGetTextFieldValue={onChangeUserAlternateNumber}
          _value={userAlternateNumber}
          inputBoxStyle={localStyles.placeSty}
          inputContainerStyle={localStyles.patientNameTxt}
          placeholder={'Alternate Mobile No*'}
          inputStyle={styles.mt5}
          keyBoardType={'number-pad'}
        />   } 

        <Pressable onPress={()=>{setUserAlternateNoShow(!userAlternateNoShow)}} >
            <CText type='m10' color={colors.primary} >+Add Alternate Phone Number</CText>
        </Pressable>  
     </View>

     <CText type='b14' style={{paddingHorizontal:responsiveWidth(3),marginVertical:responsiveHeight(1)}} >Address</CText>

     <View style={{paddingHorizontal:responsiveWidth(3),marginTop:responsiveHeight(1)}} >
     <CInput
          toGetTextFieldValue={onChangeUserPinCode}
          _value={userPinCode}
          inputBoxStyle={localStyles.placeSty}
          inputContainerStyle={localStyles.patientNameTxt}
          placeholder={'Pin Code*'}
          inputStyle={styles.mt5}
          keyBoardType={'number-pad'}
        />
    <CInput
          toGetTextFieldValue={onChangeUserAddress}
          _value={userAddress}
          inputBoxStyle={localStyles.placeSty}
          inputContainerStyle={localStyles.patientNameTxt}
          placeholder={'Address ( House NO. Building, Street, Area )*'}
          inputStyle={styles.mt5}
        />
    <CInput
          toGetTextFieldValue={onChangeUserLocation}
          _value={userLocation}
          inputBoxStyle={localStyles.placeSty}
          inputContainerStyle={localStyles.patientNameTxt}
          placeholder={'Locality / Town*'}
          inputStyle={styles.mt5}
        />
    
    <View style={{flexDirection:'row',alignItems:'center', gap:responsiveWidth(2) }} >
    <Dropdown
          style={localStyles.dropdown}
          placeholderStyle={localStyles.placeholderStyle}
          selectedTextStyle={localStyles.selectedTextStyle}
          data={sampleData}
          labelField="label"
          valueField="value"
          placeholder={'City / District*'}
          value={city}
          onChange={onChangeCity}
          renderRightIcon={() => <BottomIcon />}
          itemTextStyle={localStyles.selectedTextStyle}
          itemContainerStyle={localStyles.itemContainerStyle}
        />
    <Dropdown
          style={localStyles.dropdown}
          placeholderStyle={localStyles.placeholderStyle}
          selectedTextStyle={localStyles.selectedTextStyle}
          data={sampleData}
          labelField="label"
          valueField="value"
          placeholder={'State*'}
          value={state}
          onChange={onChangeState}
          renderRightIcon={() => <BottomIcon />}
          itemTextStyle={localStyles.selectedTextStyle}
          itemContainerStyle={localStyles.itemContainerStyle}
        />


    </View>

    <CText type='s14' style={{marginVertical:responsiveHeight(1.5)}} >Save Address</CText>  
    
    <View style={{flexDirection:'row',alignItems:'center',gap:responsiveWidth(4)}} >

    <Pressable onPress={()=>{setSaveAddressType('home')}}  style={{backgroundColor:saveAddressType === 'home' ? colors.primary:colors.white,borderRadius:responsiveWidth(3),paddingHorizontal:responsiveWidth(3),paddingVertical:saveAddressType === 'home' ?responsiveHeight(0.5):responsiveHeight(0.4),borderWidth:saveAddressType === 'home' ?0:1,borderColor:colors.primary}} >
        <CText type='b12' color={  saveAddressType === 'home' ? colors.white : colors.black} >Home</CText>
    </Pressable>

    <Pressable onPress={()=>{setSaveAddressType('work')}} style={{backgroundColor:saveAddressType === 'work' ? colors.primary:colors.white,borderRadius:responsiveWidth(3),paddingHorizontal:responsiveWidth(3.5),paddingVertical:saveAddressType === 'work' ?responsiveHeight(0.5):responsiveHeight(0.4),borderWidth:saveAddressType === 'work' ?0:1,borderColor:colors.primary}} >
        <CText type='b12' color={ saveAddressType === 'work' ? colors.white:colors.black} >Work</CText>
    </Pressable>     

    </View>

     </View>

     <View style={{flexDirection:'row',alignItems:'center',gap:responsiveWidth(2),paddingHorizontal:responsiveWidth(3),marginTop:responsiveHeight(3.5)}} >

     <CheckBox
    style={{}}
    onClick={()=>{
      setAddressCheckBox(!addressCheckBox)
    }}
    isChecked={addressCheckBox}
    checkedCheckBoxColor={colors.primary}
    uncheckedCheckBoxColor={colors.primary}
     />

     <CText type='s12' >Make this my default address</CText>
        
     </View>

     <TouchableOpacity style={{backgroundColor:colors.primary,paddingVertical:responsiveHeight(1.5),marginVertical:responsiveHeight(5),marginHorizontal:responsiveWidth(3),borderRadius:responsiveWidth(2),marginBottom:responsiveHeight(7)}} >
      <CText type='s16' color={colors.white} style={{alignSelf:'center'}} >Add Address</CText>
   
    </TouchableOpacity>

    </View>}

 {  addNewAddress &&  <View style={{borderTopWidth:1,borderTopColor:'#DAD9D9'}} >

       <TouchableOpacity style={{backgroundColor:'#F9F4F4',paddingVertical:responsiveHeight(1.3),marginHorizontal:responsiveWidth(5),marginVertical:responsiveHeight(1.5),borderRadius:responsiveWidth(3),borderWidth:1,borderColor:colors.primary,overflow:'hidden'}} >
         <View style={{backgroundColor:colors.primary,width:'11%',height:responsiveHeight(5.2),position:'absolute',borderTopRightRadius:responsiveWidth(2),borderBottomRightRadius:responsiveWidth(2)}} ></View>
         <CText type='m12' style={{alignSelf:'center'}} >Address Saved</CText>
       </TouchableOpacity>

       
       <TouchableOpacity activeOpacity={0.6} onPress={()=>{setAddNewAddress(!addNewAddress)}} >
       <CText type='m14' color={colors.primary} style={{paddingHorizontal:responsiveWidth(4),paddingVertical:responsiveHeight(1.5)}} >
        + ADD NEW ADDRESS
       </CText>
       </TouchableOpacity>
     
       
 
       {
        addressData.map((item,index)=>{
          return(
            <View key={index} style={{paddingHorizontal:responsiveWidth(4),paddingVertical:responsiveHeight(2.4),backgroundColor: selectedAddress ===index ? '#FCE3D6':colors.white,gap:responsiveHeight(1.5),borderBottomWidth:responsiveWidth(0.5),borderBottomColor:'#DAD9D9'}} >
          
            <View  style={{...styles.flexRow,alignItems:'center',justifyContent:'space-between'}} >
              <View style={{...styles.flexRow,alignItems:'center',gap:responsiveWidth(2)}}  >
                <CText type='s14' >{item?.name}</CText>
             { item?.type &&  <CText type='m10' style={{backgroundColor:'#F8F5F3',paddingHorizontal:responsiveWidth(2.5)}} >{item?.type}</CText>}
              </View>
              <TouchableOpacity onPress={()=>{setSelectedAddress(index)}} style={{borderWidth:1,borderColor:colors.primary,paddingHorizontal:responsiveWidth(0.8),paddingVertical:responsiveHeight(0.4),borderRadius:responsiveWidth(4)}} >
              <View style={{backgroundColor:selectedAddress ===index ?colors.primary:colors.white ,paddingHorizontal:responsiveWidth(1.4),paddingVertical:responsiveHeight(0.7),borderRadius:responsiveWidth(2)}} ></View>
            </TouchableOpacity>
            </View>
  
            <CText type='m12' >
             {item?.address}
            </CText>
            <CText type='m12' >+91 {item?.num}</CText>
  
            <View style={{...styles.flexRow,alignItems:'center',gap:responsiveWidth(5)}} >
  
              <Pressable>
              <CText type='s12' color='#F27636' >EDIT</CText>
              </Pressable>
              <Pressable>
              <CText type='s12' color='#F27636' >REMOVE</CText>
              </Pressable>
              <Pressable>
              <CText type='s12' color='#F27636' >SET AS DEFAULT</CText>
              </Pressable>
              
            </View>
  
           { selectedAddress ===index && <TouchableOpacity activeOpacity={0.6} style={{backgroundColor:'#FF9B66',paddingVertical:responsiveHeight(1.8),borderRadius:responsiveWidth(3),marginHorizontal:responsiveWidth(1.5)}} >
               <CText type='s12' color={colors.white} style={{alignSelf:'center'}} >Deliver to this Address</CText>
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

export default MedicineAddress

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
        ...styles.mt5,
        flex:1,
        
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
})