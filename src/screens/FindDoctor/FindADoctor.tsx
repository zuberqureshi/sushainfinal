import { ScrollView, StyleSheet, TouchableOpacity, View, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';

// local imports

import ADoctorHealthIssue from '../../components/DoctorComponent/ADoctorHealthIssue';
import { colors, styles } from '../../themes';
import TopDoctor from '../../components/DoctorComponent/TopDoctor';
import DoctorCategoryComponent from '../../components/DoctorComponent/DoctorCategoryComponent';
import strings from '../../i18n/strings';
import CText from '../../components/common/CText';
import { Api_Image_Base_Url, moderateScale } from '../../common/constants';
import { BrandIcon, DoctorIcon, ReviewsIcon, UserIcon } from '../../assets/svgs';
import TopBannerFindDoctor from '../../components/DoctorComponent/TopBannerFindDoctor';
// import {findDoctorHomeAPI} from '../../api/FindDoctor';
import CHeader from '../../components/common/CHeader';
import { Container } from '../../components/Container';
import { API_BASE_URL, API_IMAGE_BASE_URL } from '@env'
import { Box, Spinner, Text } from '@gluestack-ui/themed';
import Loader from '../../components/Loader/Loader';
import SearchWithLikeComponent from '../../components/common/CommonComponent/SearchWithLikeComponent';
import ScreenBottomAchievement from '../../components/common/ScreenBottomAchievement/ScreenBottomAchievement';
import useGetFindADoctor from '../../hooks/doctor/find-a-doctor';

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
console.log(API_BASE_URL);

const FindADoctor = () => {

  const [bannerData, setBannerData] = useState([])
  const [specializationList, setSpecializationList] = useState([])
  const [apiData, setApiData] = useState([])
  const [loader, setLoader] = useState(true)

  //api call
  const {data,isLoading} = useGetFindADoctor()

  if (isLoading) {
    return (
      <Loader />
    )
  }

  const RightText = () => {
    return (
      <TouchableOpacity>
        <CText
          type="m14"
          style={{ textTransform: 'uppercase' }}
          color={colors.black}>
          {strings.help}
        </CText>
      </TouchableOpacity>
    );
  };



  return (
    <Container statusBarStyle='dark-content' >
      <ScrollView style={styles.flexGrow1} showsVerticalScrollIndicator={false}>
        <CHeader
          title={strings.findDoctorVideoConsultation}
          rightIcon={<RightText />}
        />
        <SearchWithLikeComponent />
        {data?.data?.result[0]?.bannerList && <TopBannerFindDoctor data={data?.data?.result[0]?.bannerList} />}
        {data?.data?.result[0]?.specializationList ? <ADoctorHealthIssue data={data?.data?.result[0]?.specializationList} /> :  <Loader />}
        {data?.data?.result[0]?.topDoctorList && <TopDoctor data={data?.data?.result[0]?.topDoctorList} />}

        {data?.data?.result[0]?.listAppGeneralCategory?.map((item: any) => {
          return (
            <Box>
              {item?.app_general_sub_category_doc && <DoctorCategoryComponent title={item?.name} data={item?.app_general_sub_category_doc} />}
            </Box>

          )
        })}
        <ScreenBottomAchievement />
        <View style={{ height: 120 }} />
      </ScrollView>
    </Container>
  );
};

export default FindADoctor;

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
});
