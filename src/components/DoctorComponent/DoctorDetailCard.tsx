import { Image, StyleSheet, TouchableOpacity, View, Text, FlatList } from 'react-native';
import React, { useState } from 'react';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Spinner } from '@gluestack-ui/themed';
import { responsiveHeight, responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';

import { colors, styles } from '../../themes';
import CText from '../../components/common/CText';
import { DigitalPrecereption, FilterIcon, FreeFollowUp, LikeIcon, ShareIcon, SortIcon } from '../../assets/svgs';
import RatingComponent from '../../components/HomeComponent/RatingComponent';
import CButton from '../../components/common/CButton';
import strings from '../../i18n/strings';
import { API_IMAGE_BASE_URL, getHeight, moderateScale } from '../../common/constants';
import { BASE_IMG_NEW_PATH } from '../../api/constant';
import { StackNav } from '../../navigation/NavigationKeys';
import images from '../../assets/images';
import typography from '../../themes/typography';
import Loader from '../../components/Loader/Loader';
import useGetDoctorBySpeclization from '../../hooks/doctor/get-doctors-by-speclization';
import moment from 'moment';

export default function DoctorDetailCard({ title='diabetes' }: any) {

  //init
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  //api call
  const { data: doctorBySpeclizationData, isLoading: doctorBySpeclizationIsLoading, isPending } = useGetDoctorBySpeclization({ specialization: title })
  console.log(isPending, doctorBySpeclizationIsLoading, !!(doctorBySpeclizationData?.data?.result[0]?.doctorList), 'DOCTORCARD');

  //Loader
  if (doctorBySpeclizationIsLoading) {
    return (
      <Loader />
    )
  }


  const onPressDoctorProfile = (id: any) =>
    navigation.navigate(StackNav.DoctorProfile, { id });

  const renderItem = ({ item, index }: any) => {
    // console.log(item?.slots);

    const practicingDate = moment(moment(item?.practicing_since).format('YYYY-MM-DD'));
    const yearsOfEXP = moment().diff(practicingDate, 'years');

    return (
      <View style={localStyles.cardMainContainer}>
        <View style={[styles.flexRow, styles.justifyBetween]}>
          <View style={localStyles.leftContainer}>
            <Image
              source={{
                uri: `${API_IMAGE_BASE_URL}${item?.photo}`,
              }}
              style={localStyles.doctorImgStyle}
            />
            <View style={localStyles.titleContainer}>
              <CText type="s12">{item?.name}</CText>
              <CText
                type="m10"
                style={styles.mv5}
                color={colors.textColor5}
                numberOfLines={2}>
                {!!item?.major_disease ? item?.major_disease : 'N/A' + ' | ' + yearsOfEXP + ' YRS EXP'}
              </CText>
              <CText type="r10" numberOfLines={2} color={colors.textColor2}>
                {item?.services_offered}
              </CText>
            </View>
          </View>
          <View>
            <View style={{alignSelf:'flex-end'}}>
              <TouchableOpacity style={styles.ph5}>
                <ShareIcon />
              </TouchableOpacity>
              {/* <TouchableOpacity style={styles.ph5}>
                <LikeIcon />
              </TouchableOpacity> */}
            </View>
            <View style={localStyles.iconContainer}>
              <CText type="s12" numberOfLines={2} color={colors.black}>
                {'₹ ' + item?.vc_fees}
              </CText>
             { item?.vc_fees !== item?.vc_fees_dummy && <View style={styles.ph5}>
                <CText type="r12" numberOfLines={2} style={{textDecorationLine:'line-through'}} color={colors.black}>
                  {item?.vc_fees_dummy}
                </CText>
                {/* <View style={localStyles.upperLineStyle} /> */}
              </View>}
            </View>
          </View>
        </View>
        <View style={localStyles.bottomContainer}>
          <View style={localStyles.starContainer}>
            <RatingComponent
              star={!!item?.rating ? item?.rating : 5}
              style={localStyles.straStyle}
            />
            <CText
              type="r10"
              color={colors.textColor2}
              style={localStyles.leftTextStyle}>
              {item?.top_doc_review_per + ' reviews'}
            </CText>
          </View>
          <View style={localStyles.bottomBtnContainer}>
            <CButton
              title={strings.viewProfile}
              containerStyle={localStyles.viewProfileBtnStyle}
              onPress={() => onPressDoctorProfile(item?.id)}
              bgColor={colors.white}
              color={colors.primary}
              type="b12"
            />
            <CButton
              title={strings.bookNow}
              containerStyle={localStyles.bookNowBtnStyle}
              onPress={() => {navigation.navigate(StackNav.SelectTimeSlot, { id:item?.id,doctorslots:item?.slots }) }}
              bgColor={colors.success}
              color={colors.white}
              type="b12"
            />
          </View>
        </View>
      </View>
    );
  };


  const EmptyListMessage = () => {

    return (
      <View style={localStyles.notAvailableWrappeer} >
        <Text style={localStyles.bareillSoonText} >{strings.wewillbeinBareillSoon}</Text>

        <Text style={localStyles.globalExpertsOnlineText}  >{strings.connectWithOurGlobalExpertsOnline}</Text>

        <Image source={images.doctorNotAvailable} style={localStyles.notAvailableImg} />

        {/* <TouchableOpacity style={localStyles.forVideoConsultationButtonWrapper}  >
           <Text style={localStyles.forVideoConsultationButtonText}  >{strings.forVideoConsultationClickHere}</Text>{}
         </TouchableOpacity> */}

        <Spinner size='large' />
      </View>

    )
  }

  const ListHeaderComponent = () => {

    return (
      <View>
        <TouchableOpacity style={localStyles.bannerContaienr}>
          <Image
            source={images.exclusiveTherapyImage}
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
          <CButton
            title={strings.sort}
            onPress={() => { }}
            containerStyle={localStyles.btnContainerStyle}
            bgColor={colors.white}
            color={colors.black}
            style={styles.ml5}
            type="r12"
            frontIcon={<SortIcon />}
          />
          <CButton
            title={strings.filter}
            onPress={() => { }}
            containerStyle={localStyles.btnContainerStyle}
            bgColor={colors.white}
            color={colors.black}
            style={styles.ml5}
            type="r12"
            frontIcon={<FilterIcon />}
          />
        </View>
      </View>

    )
  }

  return (
    <>
      {(!!(doctorBySpeclizationData?.data?.result[0]?.doctorList)) ? <FlatList
        data={doctorBySpeclizationData?.data?.result[0]?.doctorList}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        // estimatedItemSize={100}
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={() => { return (<View style={{ height: responsiveHeight(10) }} />) }}
      // ListEmptyComponent={EmptyListMessage}


      /> : <Loader />}
    </>


  );
}

const localStyles = StyleSheet.create({
  cardMainContainer: {
    ...styles.mh20,
    ...styles.mv10,
    ...styles.p10,
    borderRadius: moderateScale(15),
    borderColor: colors.bColor2,
    borderWidth: moderateScale(1),
  },
  doctorImgStyle: {
    height: getHeight(85),
    width: moderateScale(82),
    borderRadius: moderateScale(10),
    resizeMode: 'cover',
    borderWidth: moderateScale(1),
    borderColor: colors.primary,
    ...styles.mb5,
  },
  straStyle: {
    height: moderateScale(10),
    width: moderateScale(10),
  },
  leftContainer: {
    ...styles.flexRow,
    ...styles.justifyBetween,
    ...styles.flex,
  },
  titleContainer: {
    ...styles.ml10,
    ...styles.flex,
  },
  leftTextStyle: {
    ...styles.mt5,
  },
  starContainer: {
    ...styles.center,
    width: moderateScale(82),
  },
  bottomContainer: {
    ...styles.rowSpaceBetween,
    ...styles.mt5,
  },
  iconContainer: {
    ...styles.rowCenter,
    ...styles.mb10,
  },
  upperLineStyle: {
    height: moderateScale(0.5),
    backgroundColor: colors.black,
    bottom: moderateScale(7),
  },
  bottomBtnContainer: {
    ...styles.rowEnd,
  },
  viewProfileBtnStyle: {
    ...styles.mr10,
    ...styles.ph10,
    borderWidth: moderateScale(1),
    borderColor: colors.primary,
    borderRadius: moderateScale(10),
    height: getHeight(36),
  },
  bookNowBtnStyle: {
    ...styles.ph10,
    borderWidth: moderateScale(1),
    borderColor: colors.success,
    borderRadius: moderateScale(10),
    height: getHeight(36),
  },
  notAvailableWrappeer: {
    alignItems: 'center',
    marginTop: responsiveHeight(5),
    marginBottom: responsiveHeight(20)
  },
  bareillSoonText: {
    ...typography.fontWeights.Medium,
    color: '#ACADAA',
    ...typography.fontSizes.f16,
    marginBottom: responsiveHeight(1)
  },
  globalExpertsOnlineText: {
    ...typography.fontWeights.Medium,
    color: colors.black,
    ...typography.fontSizes.f18,
    textAlign: 'center',
    width: responsiveWidth(70)
  },
  notAvailableImg: {
    resizeMode: 'contain',
    width: responsiveWidth(65),
    height: responsiveHeight(25)
  },
  forVideoConsultationButtonWrapper: {
    backgroundColor: colors.success,
    paddingHorizontal: responsiveWidth(10),
    paddingVertical: responsiveHeight(1.5),
    borderRadius: responsiveWidth(3)
  },
  forVideoConsultationButtonText: {
    ...typography.fontWeights.Bold,
    color: colors.white,
    ...typography.fontSizes.f14

  },
  bannerImageStyle: {
    width: '100%',
    height: moderateScale(140),
    ...styles.mv10,
    borderRadius: moderateScale(10),
  },
  bannerContaienr: {
    ...styles.center,
    ...styles.mh20,
  },
  bottomBanerContainer: {
    ...styles.ph10,
    ...styles.pv10,
    backgroundColor: colors.lightOrange,
    ...styles.flexRow,
    ...styles.itemsCenter,
    // ...styles.flex,
    height: responsiveHeight(5)
  },
  buttonContinerStyle: {
    ...styles.flexRow,
    ...styles.itemsCenter,
    ...styles.justifyEnd,
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
});
