import {Image, StyleSheet, TouchableOpacity, View,Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FlashList} from '@shopify/flash-list';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

// local imports
// const CText = React.lazy(() => import('../../components/common/CText'))
// const RatingComponent = React.lazy(() => import('../../components/HomeComponent/RatingComponent'))
// const CButton = React.lazy(() => import('../../components/common/CButton'))

import {colors, styles} from '../../themes';
import CText from '../../components/common/CText';
import {LikeIcon, ShareIcon} from '../../assets/svgs';
import RatingComponent from '../../components/HomeComponent/RatingComponent';
import CButton from '../../components/common/CButton';
import strings from '../../i18n/strings';
// import {DoctorListAPI} from '../../api/homeApis';
import {getHeight, moderateScale} from '../../common/constants';
import {BASE_IMG_NEW_PATH} from '../../api/constant';
import {StackNav} from '../../navigation/NavigationKeys';
import images from '../../assets/images';
import { responsiveHeight,responsiveFontSize,responsiveWidth } from 'react-native-responsive-dimensions';
import typography from '../../themes/typography';
import { API_BASE_URL, API_IMAGE_BASE_URL } from '@env'
import { Box, Spinner } from '@gluestack-ui/themed';
import { Container } from '../../components/Container';
import Loader from '../../components/Loader/Loader';
import useGetDoctorBySpeclization from '../../hooks/doctor/get-doctors-by-speclization';

export default function DoctorDetailCard({title}: any) {
  const [specDoctorList, setSpecDoctorList] = useState([]);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [loader, setLoader] = useState(true)
  const [selectedSpecDoctor, setSelectedSpecDoctor] = useState<string>('diabetes');


  const {data:doctorBySpeclizationData,isLoading:doctorBySpeclizationIsLoading,isPending} = useGetDoctorBySpeclization({specialization:title})
   console.log(isPending,doctorBySpeclizationIsLoading,'DOCTORCARD');
   

  if (doctorBySpeclizationIsLoading) {
    return(
      <Loader/>
    )
  }

  const onPressDoctorProfile = (id: any) =>
    navigation.navigate(StackNav.DoctorProfile, {id});

  const renderItem = ({item, index}: any) => {
    // console.log(item);
    
    return (
      <View style={localStyles.cardMainContainer}>
        <View style={[styles.flexRow, styles.justifyBetween]}>
          <View style={localStyles.leftContainer}>
            <Image
              source={{
                uri:`${API_IMAGE_BASE_URL}${item?.photo}`,
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
                {item?.major_disease + ' | ' + item?.experience + ' YRS EXP'}
              </CText>
              <CText type="r10" numberOfLines={2} color={colors.textColor2}>
                {item?.services_offered}
              </CText>
            </View>
          </View>
          <View>
            <View style={localStyles.iconContainer}>
              <TouchableOpacity style={styles.ph5}>
                <ShareIcon />
              </TouchableOpacity>
              <TouchableOpacity style={styles.ph5}>
                <LikeIcon />
              </TouchableOpacity>
            </View>
            <View style={localStyles.iconContainer}>
              <CText type="s12" numberOfLines={2} color={colors.black}>
                {'₹ ' + item?.vc_fees}
              </CText>
              <View style={styles.ph5}>
                <CText type="r12" numberOfLines={2} color={colors.black}>
                  {item?.vc_fees_dummy}
                </CText>
                <View style={localStyles.upperLineStyle} />
              </View>
            </View>
          </View>
        </View>
        <View style={localStyles.bottomContainer}>
          <View style={localStyles.starContainer}>
            <RatingComponent
              star={item?.rating}
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
              onPress={() => {}}
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

    return(
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

  return (
    <>
    { doctorBySpeclizationData?.data?.result[0]?.doctorList ?  <FlashList
      data={doctorBySpeclizationData?.data?.result[0]?.doctorList}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      showsVerticalScrollIndicator={false}
      estimatedItemSize={200}
      ListEmptyComponent={EmptyListMessage}
      
    /> : <Loader/>}
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
  notAvailableWrappeer:{
    alignItems:'center',
    marginTop:responsiveHeight(5),
    marginBottom:responsiveHeight(20)
  },
  bareillSoonText:{
    ...typography.fontWeights.Medium,
    color:'#ACADAA',
    ...typography.fontSizes.f16,
    marginBottom:responsiveHeight(1)
  },
  globalExpertsOnlineText:{
    ...typography.fontWeights.Medium,
    color:colors.black,
    ...typography.fontSizes.f18,
    textAlign:'center',
    width:responsiveWidth(70)
  },
  notAvailableImg:{
    resizeMode:'contain',
    width:responsiveWidth(65),
    height:responsiveHeight(25)
  },
 forVideoConsultationButtonWrapper:{
    backgroundColor:colors.success,
    paddingHorizontal:responsiveWidth(10),
    paddingVertical:responsiveHeight(1.5),
    borderRadius:responsiveWidth(3)
  },
  forVideoConsultationButtonText:{
    ...typography.fontWeights.Bold,
    color:colors.white,
    ...typography.fontSizes.f14
   
  }
});
