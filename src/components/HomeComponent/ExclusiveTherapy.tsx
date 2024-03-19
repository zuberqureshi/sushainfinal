import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';

// local imports
import SubHeader from '../common/CommonComponent/SubHeader';
import strings from '../../i18n/strings';
import {colors, styles} from '../../themes';
import images from '../../assets/images';
import {getHeight, moderateScale} from '../../common/constants';
import CText from '../common/CText';
import {RightArrow} from '../../assets/svgs';
import BannerList from './BannerList';
import {BASE_IMG_NEW_PATH} from '../../api/constant';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNav } from '../../navigation/NavigationKeys';
import { Box } from '@gluestack-ui/themed';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';



export default function ExclusiveTherapy({bannerData}: any) {

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  // console.log('bannerData', bannerData, BASE_IMG_NEW_PATH + bannerData);
  const RenderCardComponent = ({style, title, image,onPress}: any) => {
    return (
      <TouchableOpacity onPress={onPress} style={[localStyles.subContainerStyle, style]}>
        <View style={localStyles.titleTextStyle}>
          <Image source={image} style={localStyles.iconImageStyle} />
          <CText
            type="s12"
            style={[styles.mh10, styles.flex]}
            numberOfLines={2}
            color={colors.primary2}>
            {title}
          </CText>
        </View>
        <TouchableOpacity>
          <RightArrow />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };



  return (
    <View>
      <Box ml={8} >
      <SubHeader
        title={strings.ourExclusiveTherapyServices}
        isViewHide={false}
      />
      </Box>
    
      <View style={styles.mh20}>
        <Image
          source={images.exclusiveTherapyImage}
          style={localStyles.exclusiveTherapyImageStyle}
        />
      </View>
      <View style={localStyles.midelContainer}>
        <RenderCardComponent
          title="PanchKarma"
          image={images.panchKarma}
          style={localStyles.width50}
        />
        <RenderCardComponent
          title="Disease Specific Yoga "
          image={images.yogaImage}
          style={localStyles.width50}
        />
      </View>
      <RenderCardComponent
        title="Want to Visit Clinic ?"
        image={images.hospitalImage}
        style={[styles.mh20, styles.mb10]}
        onPress={()=>{navigation.navigate(StackNav.ClinicConsultation)}}
      />
      <BannerList bannerData={bannerData} type={'bottom'} />
    </View>
  );
}

const localStyles = StyleSheet.create({
  exclusiveTherapyImageStyle: {
    width: '100%',
    height: getHeight(150),
    resizeMode: 'contain',
    ...styles.mv5,
  },
  subContainerStyle: {
    ...styles.p10,
    ...styles.rowSpaceBetween,
    backgroundColor: colors.white,
    borderColor: colors.bColor2,
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(10),
    shadowColor: colors.black,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  iconImageStyle: {
    width: moderateScale(50),
    height: getHeight(50),
    resizeMode: 'contain',
  },
  titleTextStyle: {
    ...styles.flexRow,
    ...styles.itemsCenter,
    ...styles.flex,
  },
  midelContainer: {
    ...styles.rowSpaceBetween,
    ...styles.ph20,
    ...styles.mv15,
  },
  width50: {
    width: '48%',
  },
});
