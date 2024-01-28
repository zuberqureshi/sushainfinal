import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CText from '../CText';
import { BrandIcon, DoctorIcon, ReviewsIcon, UserIcon } from '../../../assets/svgs';
import { colors, styles } from '../../../themes';
import { moderateScale } from '../../../common/constants';


const BottomContainer = ({ icon, title }: any) => {
    return (
      <View style={localStyles.bottomComponentStyle}>
        {icon}
        <CText
          type="s12"
          numberOfLines={1}
          align="center"
          style={localStyles.textTileStyle}
          color={colors.black}>
          {title}
        </CText>
      </View>
    );
  };
const ScreenBottomAchievement = () => {
  return (
    <View style={localStyles.bottomContainer}>
    <View style={localStyles.rowStyle}>
      <BottomContainer title="7000+ users" icon={<UserIcon />} />
      <BottomContainer
        title="1000+ Ayurvedic Doctors"
        icon={<DoctorIcon />}
      />
    </View>
    <View style={localStyles.rowStyle}>
      <BottomContainer title="100+ Product Brands" icon={<BrandIcon />} />
      <BottomContainer
        title="3000+ Patient reviews"
        icon={<ReviewsIcon />}
      />
    </View>
  </View>
  )
}

export default ScreenBottomAchievement

const localStyles = StyleSheet.create({
    bottomContainer: {
        backgroundColor: colors.lightBlue3,
        ...styles.pv20,
        ...styles.mh15,
        ...styles.mt50,
        borderRadius: moderateScale(23),
        gap: moderateScale(15),
      },
      textTileStyle: {
        ...styles.ph10,
        ...styles.mt10,
      },
      rowStyle: {
        ...styles.flexRow,
        ...styles.justifyEvenly,
      },
      bottomComponentStyle: {
        ...styles.center,
        ...styles.ph10,
        width: '50%',
      },
})