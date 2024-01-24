import {StyleSheet, TouchableOpacity, View,Text,Modal, FlatList} from 'react-native';
import React, {useState} from 'react';
import typography from '../../themes/typography';
import { colors,styles } from '../../themes';
import strings from '../../i18n/strings';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import CSafeAreaView from '../../components/common/CSafeAreaView';
import CHeader from '../../components/common/CHeader';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CalendarIconSmall, ClockIconSmall } from '../../assets/svgs';
import KeyBoardAvoidWrapper from '../../components/common/KeyBoardAvoidWrapper';




const AppointmentCancellation = () => {

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const [selectedOption, setSelectedOption] = useState()

  var str = "43445561234";
  var replacedStr = str.replace(/.(?=.{4,}$)/g, '*');

  const renderReasonCancelOption = ({item, index}: any) => {

    return(
      <View style={{backgroundColor:'#F7F9F9',paddingVertical:responsiveHeight(1.5),borderRadius:responsiveWidth(1)}} >

<View style={{flexDirection:'row',alignItems:'center',gap:responsiveWidth(2.5),borderBottomColor:'#DAD6D6',borderBottomWidth:(index+1 != 7) ? 1:0,paddingBottom:(index+1 != 7) ? responsiveHeight(1.5):0,paddingHorizontal:responsiveWidth(3),}} >
          <TouchableOpacity onPress={()=>{
            setSelectedOption(index)
          }} style={{borderWidth:1,borderColor:selectedOption === index ? colors.primary : colors.black,paddingHorizontal:responsiveWidth(0.8),paddingVertical:responsiveHeight(0.4),borderRadius:responsiveWidth(4)}} >
            <View style={{backgroundColor: selectedOption === index ? colors.primary : '#F7F9F9',paddingHorizontal:responsiveWidth(1.4),paddingVertical:responsiveHeight(0.7),borderRadius:responsiveWidth(2)}} ></View>
          </TouchableOpacity>

          <Text style={{color:colors.black,   ...typography.fontSizes.f12,...typography.fontWeights.Regular,}} >{item}</Text>
        </View>
      </View>
    )
  }

  return (
   <CSafeAreaView>

    <KeyBoardAvoidWrapper>
      
      <CHeader title={strings.AppointmentCancellation} />

      <View style={localStyles.appointmentDetailsWrapper} >

        <Text style={{color:colors.black,   ...typography.fontSizes.f14,...typography.fontWeights.SemiBold,}} >{strings.appointmentDetails}</Text>

       <View style={{marginTop:responsiveHeight(1.5)}}>
        <Text style={{color:colors.black,   ...typography.fontSizes.f14,...typography.fontWeights.Bold,}} >DR. Preeti Chhabra</Text>
        <Text style={{color:colors.black,   ...typography.fontSizes.f12,...typography.fontWeights.Regular,}} >clinic Name - Sanjeevani Care</Text>
       </View>

       <View style={localStyles.appointmentDateWrapper} >
        <Text style={{color:colors.black,   ...typography.fontSizes.f14,...typography.fontWeights.Medium,}}>{strings.appointmentDateTime}</Text>

        <View style={{flexDirection:'row',alignItems:'center',marginTop:responsiveHeight(1),gap:responsiveWidth(4)}} >
          <View style={{flexDirection:'row',alignItems:'center',gap:responsiveWidth(1)}} >
            <CalendarIconSmall/>
            <Text style={{color:'#444343',   ...typography.fontSizes.f12,...typography.fontWeights.Medium,}} >13 Oct,2023</Text>
          </View>

          <View style={{flexDirection:'row',alignItems:'center',gap:responsiveWidth(1)}}  >
            <ClockIconSmall/>
            <Text  style={{color:'#444343',   ...typography.fontSizes.f12,...typography.fontWeights.Medium,}}>11:35AM</Text>
          </View>

        </View>

       </View>

       <View>
        <Text style={{color:colors.black,   ...typography.fontSizes.f12,...typography.fontWeights.SemiBold,}} >{strings.appointmentID}</Text>
        <Text style={{color:colors.black,   ...typography.fontSizes.f10,...typography.fontWeights.Regular,}} >{replacedStr}</Text>

       </View>


      </View>

      <View style={localStyles.reasonforCancellingWrapper} >

        <Text style={{color:colors.black,   ...typography.fontSizes.f14,...typography.fontWeights.SemiBold,}} >{strings.reasonforCancelling}</Text>
        
 


       <FlatList
         style={{marginTop:responsiveHeight(1.5)}}
        data={['I am Busy','Forgot About The Appoinments','Changed My mind','Visited Another Doctor','Location is Far','Doctor Cancelled','Other']}
        renderItem={renderReasonCancelOption}
        
        keyExtractor={(item, index) => index.toString()}
       />


        



      </View>

      <TouchableOpacity activeOpacity={0.6} onPress={()=>{}} style={{backgroundColor:colors.primary,alignSelf:'center',paddingHorizontal:responsiveWidth(28),paddingVertical:responsiveHeight(1.5),borderRadius:responsiveWidth(2),marginBottom:responsiveHeight(1)}} >
        <Text style={{color:colors.white,   ...typography.fontSizes.f12,...typography.fontWeights.Regular,textAlign:'center',width:responsiveWidth(35)}} >{strings.iWanttoCancel}</Text>
      </TouchableOpacity>



      </KeyBoardAvoidWrapper>
   </CSafeAreaView>
  )
}

export default AppointmentCancellation

const localStyles = StyleSheet.create({
    
  appointmentDetailsWrapper:{
    paddingHorizontal:responsiveWidth(4),
    borderBottomWidth:responsiveWidth(1.5),
    borderBottomColor:colors.lightgray,
    paddingVertical:responsiveHeight(2.5)
  },
  appointmentDateWrapper:{
    // paddingHorizontal:responsiveWidth(4),
    paddingVertical:responsiveHeight(2.5),
    
  },
  reasonforCancellingWrapper:{
    paddingHorizontal:responsiveWidth(4),
    paddingVertical:responsiveHeight(3)
  },
  radioOutter:{
    borderWidth:1,
    borderColor:colors.primary,
    

  },
 
})