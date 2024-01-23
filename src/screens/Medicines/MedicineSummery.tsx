import { StyleSheet,  Text,View, SafeAreaView, TouchableOpacity, Image,} from 'react-native';
import React, { useState } from 'react';
import { colors, styles } from '../../themes';
import CHeader from '../../components/common/CHeader';
import { responsiveHeight,responsiveWidth,} from 'react-native-responsive-dimensions';
import StepIndicator from 'react-native-step-indicator';
import { deviceWidth, moderateScale } from '../../common/constants';

import { BillBigIconGreen, BottomIcon, GreenDot, PhoneIcon } from '../../assets/svgs';
import CText from '../../components/common/CText';
import CInput from '../../components/common/CInput';
import { addressData, medicineCartDate, sampleData } from '../../api/constant';
import { Dropdown } from 'react-native-element-dropdown';
import CheckBox from 'react-native-check-box'
import KeyBoardAvoidWrapper from '../../components/common/KeyBoardAvoidWrapper';
import { Container } from '../../components/Container';


const MedicineSummery = () => {

  const [stepCurrentPosition, setStepCurrentPosition] = useState(3)

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

  return (
    <Container>

      <CHeader titel={'Summary'} />
      <View style={{ width: deviceWidth + responsiveWidth(15), alignSelf: 'center', marginRight: responsiveWidth(2.5), paddingVertical: responsiveHeight(1.8) }} >
        <StepIndicator
          stepCount={4}
          customStyles={customStyles}
          currentPosition={stepCurrentPosition}
          labels={labels}
        />
      </View>

      <View style={{ borderBottomWidth: responsiveWidth(1.5), borderBottomColor: '#F5F1F1', borderTopColor: '#F5F1F1', borderTopWidth: responsiveWidth(1.5), paddingVertical: responsiveHeight(2.3), paddingHorizontal: responsiveWidth(4), gap: responsiveWidth(1.2) }} >
        <CText type='r10' >Delivering to:</CText>
        <CText type='s14' >radhika |<CText type='s12' >9876543256</CText></CText>
        <CText type='r12' >prk business park, d-20, sector 63,noida, Uttar Pradesh, 201301</CText>
      </View>

      <View style={{ borderWidth: 1, borderColor: '#D1D6D7', borderRadius: responsiveWidth(5), paddingHorizontal: responsiveWidth(5), marginHorizontal: responsiveWidth(3), paddingVertical: responsiveHeight(1.5), marginVertical: responsiveHeight(3.5) }} >

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
          <View>
            <CText type='m12' color='#B3B0B0' >ORDER CREATED</CText>
            <CText type='m12' >31 July,2023</CText>

          </View>

          <BillBigIconGreen />

        </View>

        <View style={{ marginTop: responsiveHeight(1.7) }} >
          <CText type='m12' color={colors.primary} >Order ID: #12345609</CText>
          <CText type='m10' color='#B5B4B4' >3 of 3 item(s)</CText>
        </View>


        <View>
          {
            medicineCartDate.map((item) => {
              return (
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: responsiveHeight(1.6), gap: responsiveWidth(5) }} >
                  <View style={{ height: responsiveHeight(8), width: responsiveWidth(15), borderRadius: responsiveWidth(3), borderWidth: 1, borderColor: '#CDC9C9' }} >
                    <Image source={item.img} style={{ resizeMode: 'contain', height: '100%', width: '90%' }} />
                  </View>


                  <View style={{ gap: responsiveHeight(0.3) }} >
                    <CText type='s10' >{item.title}</CText>

                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: responsiveWidth(3) }} >
                      <CText type='m10' color='#676666' >Confirmed</CText>

                      <TouchableOpacity activeOpacity={0.6} >
                        <CText type='m10' color={colors.primary} >Cancel</CText>
                      </TouchableOpacity>

                    </View>

                  </View>

                </View>
              )
            })
          }
        </View>

        <CText type='s10' style={{ alignSelf: 'flex-end', marginRight: responsiveWidth(7) }} >Total: 5,280</CText>

        <View style={{ borderBottomColor: '#E5E4E4', borderBottomWidth: 1, marginVertical: responsiveHeight(1) }} ></View>

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: responsiveWidth(1) }} >

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: responsiveWidth(1.5) }}>
            <GreenDot />
            <CText type='m10' color='#676666' >Delivery by 15 July,2023</CText>
          </View>

          <TouchableOpacity activeOpacity={0.6} style={{ paddingHorizontal: responsiveWidth(5), paddingVertical: responsiveHeight(0.5), borderRadius: responsiveWidth(3), backgroundColor: colors.success }} >
            <CText type='m12' color={colors.white} >Track Order</CText>
          </TouchableOpacity>

        </View>

      </View>

      <CText type='r10' color='#888686' style={{ alignSelf: 'center', marginVertical: responsiveHeight(0.4) }} >You can track your order from orders page too</CText>


    </Container>
  )
}

export default MedicineSummery

const localStyles = StyleSheet.create({})