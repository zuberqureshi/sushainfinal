import { Image, ScrollView, StyleSheet, TouchableOpacity, View, } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FlashList } from '@shopify/flash-list';

// local imports
// const CHeader = React.lazy(() => import('../../components/common/CHeader'))
// const CText = React.lazy(() => import('../../components/common/CText'))
// const RatingComponent = React.lazy(() => import('../../components/HomeComponent/RatingComponent'))
// const CButton = React.lazy(() => import('../../components/common/CButton'))
// const SubHeader = React.lazy(() => import('../../components/common/CommonComponent/SubHeader'))


import CHeader from '../../components/common/CHeader';
import strings from '../../i18n/strings';
// import CSafeAreaView from '../../components/common/CSafeAreaView';
import { BlackShareIcon, BottomIcon, ChatIcon, LikeIcon, MedicineBottleLineGreen, PlanNotebookIcon, RegistrationIcon, ServiceOfferdIcon, UterusIcon, VideoCallDrawerIcon, } from '../../assets/svgs';
import { colors, styles } from '../../themes';
import CText from '../../components/common/CText';
import RatingComponent from '../../components/HomeComponent/RatingComponent';
import { API_IMAGE_BASE_URL, TIME_FORMATE, TIME_YMD, deviceWidth, getHeight, moderateScale, } from '../../common/constants';
import CButton from '../../components/common/CButton';
import SubHeader from '../../components/common/CommonComponent/SubHeader';
import { DoctorSpecialityListData } from '../../types/Types';
import { shopByategoryData } from '../../api/constant';
// import {DoctorDetailListAPI} from '../../api/FindDoctor';
import moment from 'moment';
import { StackNav } from '../../navigation/NavigationKeys';
import { Container } from '../../components/Container';


import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import images from '../../assets/images';
import { Box, Spinner, Text } from '@gluestack-ui/themed';
import Loader from '../../components/Loader/Loader';
import { dataTagSymbol } from '@tanstack/react-query';
import useGetDoctorsProfile from '../../hooks/doctor/get-doctor-profile';

const RenderDSpecialities = ({ item,index }: { item: any , index:number}) => {

  return (
    <TouchableOpacity style={localStyles.rootContaienr}>
      <View style={localStyles.imgOuterContaiener}>
        {/* <Image source={images.ayurvedicProduct} style={localStyles.imgStyle} /> */}
        {index === 0 ? <MedicineBottleLineGreen /> : index ===1 ? <UterusIcon  /> : <PlanNotebookIcon /> }
      </View>
      <View style={localStyles.titleContainer}>
        <CText type="s8" align="center" style={{...styles.ph5,height:responsiveWidth(8)}} numberOfLines={2}>
          {item}
        </CText>
      </View>
    </TouchableOpacity>
  );
};

const RenderReviewItem = ({ item, }: any) => {
  const formattedDate = moment(item?.time, TIME_FORMATE).format(TIME_YMD);
  
  
  return (
    <View style={localStyles.reviewContainerStyle}>
      <View style={styles.rowSpaceBetween}>
        <View style={styles.rowCenter}>
          <View style={localStyles.reviewImgContainer}>
            <CText type="b14" numberOfLines={1} color={colors.white}>
              {item?.cust_name?.[0]?.toUpperCase()}
            </CText>
          </View>
          <View>
            <CText type="s12" numberOfLines={1}>
              {item?.cust_name}
            </CText>
            <CText type="r10" numberOfLines={1} style={styles.mt5}>
              {moment(formattedDate, TIME_YMD).fromNow()}
            </CText>
          </View>
        </View>
        <View style={styles.selfStart}>
          <RatingComponent
            star={!!item?.rating ? item?.rating :5}
            style={[localStyles.straStyle, styles.mt5]}
          />
        </View>
      </View>
      <CText type="s12" numberOfLines={1} style={styles.mt15}>
        {item?.heading}
      </CText>
      <CText type="r10" numberOfLines={3}  style={styles.mt5}>
        {item?.des}
      </CText>
      <ReviewDivider />
    </View>
  );
};

// const RenderFaqItem = ({ item,doctorInfo,index,showFAQ,setShowFAQ,showFAQ1,setShowFAQ1 }: any) => {
//   const [showFAQ1, setShowFAQ1] = useState(false)
//   const [showFAQ2, setShowFAQ2] = useState(false)

//   return (
//     <Box>
//     <TouchableOpacity onPress={()=>{setShowFAQ(!showFAQ)}}  style={localStyles.faqContainer}>
//       <CText type="m12" color='#3D3D3D' numberOfLines={2} style={{width:responsiveWidth(80)}} >
//         {item}{doctorInfo?.name} ?
//       </CText>
//       <BottomIcon />
//     </TouchableOpacity>

//     <Box px={20} display={showFAQ?'flex':'none'} >
//       <Text fontFamily='$InterMedium' fontSize={10} color={colors.black2} >{doctorInfo?.max_qualification}| 25 YRS. EXP.</Text>
//     </Box>


//     </Box>
//   );
// };

const ReviewDivider = () => {
  return <View style={localStyles.reviewDividerStyle} />;
};

interface Props {
  route: any;
  navigation: any;
}

export default function DoctorProfile({ route, navigation }: Props) {

  //init
  const { id } = route.params;
  console.log(id, 'PROFILE');

  const [doctorDetail, setDoctorDetail] = useState<any>();
  const [showFAQ1, setShowFAQ1] = useState(false)
  const [showFAQ2, setShowFAQ2] = useState(false)

  //APi call
  const { data, isLoading } = useGetDoctorsProfile(id)
  
  const practicingDate = moment(moment(data?.data?.result[0]?.doctorProfileDetail?.practicing_since).format('YYYY-MM-DD'));
  const yearsOfEXP = moment().diff(practicingDate, 'years');


  useEffect(() => {
    if (data?.data) {
      setDoctorDetail(data?.data?.result[0]?.doctorProfileDetail)
    }

  }, [isLoading]);

  const RightIcon = () => {
    return (
      <View style={styles.rowCenter}>
        {/* <TouchableOpacity style={styles.ph5}>
          <LikeIcon />
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.pl5}>
          <BlackShareIcon />
        </TouchableOpacity>
      </View>
    );
  };

  if (isLoading) {
    return (
      <Container>
        <CHeader title={strings.doctorsProfile} rightIcon={<RightIcon />} />
        <Loader/>
      </Container>
    )
  }

  const onPressAllReview = () => {
    navigation.navigate(StackNav.PatientsReview, {
      data: {
        doctorId: id,
        doctorName: doctorDetail?.name,
        doctorImage: doctorDetail?.photo,
        doctorRating: doctorDetail?.rating,
        doctorReview: doctorDetail?.top_doc_review_per + ' reviews',
        reviewData: doctorDetail?.doctor_customer_review,
      },
    }
    );
  }

  const onPressBookAppointment = () => {
    navigation.navigate(StackNav.SelectTimeSlot, { doctorid:id,doctorslots:doctorDetail?.slots,instantconsultation:'NO',doctorfees:doctorDetail?.vc_fees });
  }

  const renderItem = ({ item ,index}: { item: any}) => {
    return <RenderDSpecialities item={item} index={index} />;
  };

 

  const Divider = () => {
    return <View style={localStyles.dividerStyle} />;
  };

  return (
    <Container statusBarStyle='dark-content'>
      <CHeader title={strings.doctorsProfile} rightIcon={<RightIcon />} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={localStyles.cardMainContainer}>
          <View style={localStyles.rowContainer}>
            <View style={styles.center}>
              <Image
                source={{ uri: `${API_IMAGE_BASE_URL}${doctorDetail?.photo}` }}
                style={localStyles.doctorImgStyle}
              />
              <View style={styles.rowStart}>
                <RatingComponent
                  star={doctorDetail?.rating}
                  style={localStyles.straStyle}
                />
                <CText
                  type="r10"
                  color={colors.textColor2}
                  style={localStyles.leftTextStyle}>
                  {doctorDetail?.top_doc_review_per + ' reviews'}
                </CText>
              </View>
            </View>
            <View style={localStyles.rightContainer}>
              <View style={localStyles.rightInnerContainer}>
                <CText type="s12">{doctorDetail?.name}</CText>
                <CText type="r10" numberOfLines={2}>
                  {doctorDetail?.specialization}
                </CText>
                <CText type="r10" numberOfLines={1} color={colors.textColor7}>
                  {doctorDetail?.max_qualification}
                </CText>
                <CText type="r10" numberOfLines={1}>
                  {yearsOfEXP + ' YRS. EXP.'}
                </CText>
                <View style={styles.rowStart}>
                  <ChatIcon />
                  <CText type="r10" numberOfLines={4} style={styles.ph5}>
                    {doctorDetail?.known_languages}
                  </CText>
                </View>
                <CButton
                  title={strings.bookNow}
                  onPress={onPressBookAppointment}
                  type="b12"
                  containerStyle={localStyles.btnStyle}
                />
              </View>
            </View>
          </View>
        </View>
        <SubHeader title={strings.aboutDoctor} isViewHide={false} />
        <CText type="r10" numberOfLines={4} style={{ ...styles.ph20, textAlign: 'center' }}>
          {doctorDetail?.short_intro}
        </CText>
        <CButton
          title={strings.readMore}
          onPress={() => { }}
          type="m10"
          containerStyle={localStyles.readMoreBtnStyle}
          bgColor={colors.white}
          color={colors.success}
        />
        <View style={localStyles.videoContianer}>
          <View style={localStyles.headerStyle}>
            <View style={styles.rowCenter}>
              <VideoCallDrawerIcon />
              <CText type="m12" style={styles.ml5} color={colors.black}>
                {strings.videoConsultation}
              </CText>
            </View>
            <CText type="b14" color={colors.black}>
              {'₹ ' + doctorDetail?.vc_fees + '/-'}
            </CText>
          </View>
          <CButton
            title={strings.VIEWALLSLOTS}
            onPress={() => { onPressBookAppointment() }}
            type="m10"
            containerStyle={localStyles.viewAllSlotBtnStyle}
            bgColor={colors.white}
            color={colors.primary}
          />
        </View>
        <View style={localStyles.subHeaderStyle}>
          <RegistrationIcon />
          <CText type="s14" style={styles.ml5} numberOfLines={1}>
            {strings.registrationNumber}
          </CText>
        </View>
        <CText
          type="r12"
          style={localStyles.registrationTextStyle}
          numberOfLines={1}>
          {doctorDetail?.bams_registration_id}
        </CText>
        <View style={localStyles.subHeaderStyle}>
          <ServiceOfferdIcon />
          <CText type="s14" style={styles.ml5} numberOfLines={1}>
            {strings.servicesOffered}
          </CText>
        </View>
        <View style={{height:responsiveHeight(10)}} >
          <FlashList
            data={['General Medicines & Consulting','Infertility','Special Diets']}
            renderItem={renderItem}
            horizontal
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.ph20}
            showsHorizontalScrollIndicator={false}
            estimatedItemSize={100}
          />
        </View>
        <Divider />

        <SubHeader title={strings.patientsReview} isViewHide={false} />
     { !!doctorDetail?.doctor_customer_review ?  <View style={{  overflow: 'hidden' }} >

          {doctorDetail?.doctor_customer_review?.slice(0, 2)?.map((item: any, index: number) => {

            return (<RenderReviewItem key={index} item={item}/>)
          })}
        </View> : <Spinner size={'small'} color={colors.primary} /> }
        <CButton
          title={strings.viewAllReviews}
          onPress={onPressAllReview}
          type="m10"
          containerStyle={localStyles.viewAllReviewsStyle}
          bgColor={colors.white}
          color={colors.success}
        />
        <Divider />
        <SubHeader title={strings.faqs} isViewHide={false} />



        <Box>
          <TouchableOpacity onPress={() => { setShowFAQ1(!showFAQ1) }} style={localStyles.faqContainer}>
            <CText type={showFAQ1 ? "b12" : "m12"} color='#3D3D3D' numberOfLines={2} style={{ width: responsiveWidth(80) }} >
              What is the educational qualification and years of experience of {doctorDetail?.name} ?
            </CText>
            <BottomIcon />
          </TouchableOpacity>

          <Box px={20} display={showFAQ1 ? 'flex' : 'none'} >
            <Text fontFamily='$InterMedium' numberOfLines={1} fontSize={10} color={colors.black2} >{doctorDetail?.max_qualification} | 25 YRS. EXP.</Text>
          </Box>

          <TouchableOpacity onPress={() => { setShowFAQ2(!showFAQ2) }} style={localStyles.faqContainer}>
            <CText type={showFAQ1 ? "b12" : "m12"} color='#3D3D3D' numberOfLines={2} style={{ width: responsiveWidth(80) }} >
              What are some of the most difficult cases handled by {doctorDetail?.name} ?
            </CText>
            <BottomIcon />
          </TouchableOpacity>

          <Box px={20} display={showFAQ2 ? 'flex' : 'none'} >
            <Text fontFamily='$InterMedium' fontSize={10} numberOfLines={3} color={colors.black2} >{doctorDetail?.name} has successfully treated many complicated cases of {doctorDetail?.critical_diseases} .</Text>
          </Box>


        </Box>


        {/* <CButton
          title={strings.readMore}
          onPress={() => { }}
          type="m10"
          containerStyle={localStyles.readMoreWithBgBtnStyle}
          bgColor={colors.success}
          color={colors.white}
        /> */}
        <CButton
          title={strings.bookAppointment}
          onPress={onPressBookAppointment}
          type="b14"
          containerStyle={styles.m20}
          bgColor={colors.primary}
          color={colors.white}
        />
      </ScrollView>
    </Container>
  );
}

const localStyles = StyleSheet.create({
  cardMainContainer: {
    ...styles.p20,
    ...styles.mb15,
    borderBottomWidth: moderateScale(1),
    borderBottomColor: colors.bColor2,
  },
  doctorImgStyle: {
    height: getHeight(110),
    width: moderateScale(110),
    borderRadius: moderateScale(10),
    resizeMode: 'contain',
    borderWidth: moderateScale(1),
    borderColor: colors.primary,
    ...styles.mb10,
  },
  rowContainer: {
    ...styles.flexRow,
    ...styles.itemsStart,
  },
  straStyle: {
    height: moderateScale(10),
    width: moderateScale(10),
    marginHorizontal: moderateScale(1),
  },
  rightContainer: {
    ...styles.ml10,
    width: deviceWidth - moderateScale(170),
  },
  leftTextStyle: {
    ...styles.ml5,
  },
  rightInnerContainer: {
    gap: moderateScale(5),
  },
  btnStyle: {
    ...styles.ph15,
    ...styles.mt5,
    height: getHeight(30),
    backgroundColor: colors.primary,
    borderRadius: moderateScale(10),
    ...styles.selfEnd,
  },
  readMoreBtnStyle: {
    ...styles.ph10,
    ...styles.mt5,
    ...styles.mr20,
    height: getHeight(20),
    ...styles.selfEnd,
  },
  videoContianer: {
    ...styles.mh20,
    ...styles.mt20,
    ...styles.mb10,
    ...styles.shadowStyle,
    padding: moderateScale(5),
    borderRadius: moderateScale(10),
    backgroundColor: colors.white,
  },
  headerStyle: {
    ...styles.rowSpaceBetween,
    ...styles.p10,
    ...styles.mb20,
    backgroundColor: colors.gray5,
    borderTopLeftRadius: moderateScale(7),
    borderTopRightRadius: moderateScale(7),
  },
  viewAllSlotBtnStyle: {
    ...styles.ph10,
    height: getHeight(20),
    ...styles.selfCenter,
  },
  subHeaderStyle: {
    ...styles.flexRow,
    ...styles.itemsCenter,
    ...styles.ph20,
    ...styles.mv10,
  },
  registrationTextStyle: {
    ...styles.ph20,
    ...styles.mb10,
  },
  imgStyle: {
    width: moderateScale(50),
    height: moderateScale(50),
    resizeMode: 'contain',
  },
  rootContaienr: {
    width: moderateScale(85),
    ...styles.center,
  },
  imgOuterContaiener: {
    width: moderateScale(35),
    height: moderateScale(35),
    borderRadius: moderateScale(35),
    ...styles.mv10,
    ...styles.center,
    // backgroundColor: colors.lightBlue,
    borderWidth:1,
    borderColor:colors.success
  },
  titleContainer: {
    height: moderateScale(34),
    // width:responsiveWidth(45)
  },
  dividerStyle: {
    height: getHeight(4),
    backgroundColor: colors.bColor2,
    ...styles.mv15,
  },
  reviewContainerStyle: {
    ...styles.mh20,
    ...styles.pv10,
  },
  reviewImgContainer: {
    height: moderateScale(40),
    width: moderateScale(40),
    borderRadius: moderateScale(20),
    backgroundColor: colors.primary,
    ...styles.center,
    ...styles.mr10,
  },
  reviewDividerStyle: {
    height: moderateScale(1),
    backgroundColor: colors.bColor2,
    ...styles.mv10,
  },
  viewAllReviewsStyle: {
    ...styles.mh20,
    // ...styles.m10,
    height: getHeight(14),
    ...styles.selfStart,

  },
  faqContainer: {
    ...styles.pv10,
    ...styles.flexRow,
    ...styles.justifyBetween,
    ...styles.itemsStart,
    ...styles.ph20
  },
  readMoreWithBgBtnStyle: {
    ...styles.ph10,
    height: getHeight(28),
    ...styles.selfCenter,
    borderRadius: moderateScale(10),
  },
});
