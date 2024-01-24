import { ScrollView, StyleSheet, TouchableOpacity, View,FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';

// local imports

// const ADoctorHealthIssue = React.lazy(() => import('../../components/DoctorComponent/ADoctorHealthIssue'))
// const TopDoctor = React.lazy(() => import('../../components/DoctorComponent/TopDoctor'))
// const DoctorCategoryComponent = React.lazy(() => import('../../components/DoctorComponent/DoctorCategoryComponent'))
const CText = React.lazy(() => import('../../components/common/CText'))
// const TopBannerFindDoctor = React.lazy(() => import('../../components/DoctorComponent/TopBannerFindDoctor'))
// const CHeader = React.lazy(() => import('../../components/common/CHeader'))
const SearchWithLikeComponent = React.lazy(() => import('./SearchWithLikeComponent'))


// import CSafeAreaView from '../../components/common/CSafeAreaView';
import ADoctorHealthIssue from '../../components/DoctorComponent/ADoctorHealthIssue';
import { colors, styles } from '../../themes';
import TopDoctor from '../../components/DoctorComponent/TopDoctor';
import DoctorCategoryComponent from '../../components/DoctorComponent/DoctorCategoryComponent';
import strings from '../../i18n/strings';
// import CText from '../../components/common/CText';
import { moderateScale } from '../../common/constants';
import { BrandIcon, DoctorIcon, ReviewsIcon, UserIcon } from '../../assets/svgs';
import TopBannerFindDoctor from '../../components/DoctorComponent/TopBannerFindDoctor';
// import {findDoctorHomeAPI} from '../../api/FindDoctor';
import CHeader from '../../components/common/CHeader';
// import SearchWithLikeComponent from './SearchWithLikeComponent';
import { Container } from '../../components/Container';
import { API_BASE_URL, API_IMAGE_BASE_URL } from '@env'
import { Box, Spinner, Text } from '@gluestack-ui/themed';
import Loader from '../../components/Loader/Loader';

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

  useEffect(() => {
    const fetchData = async () => {
      // const data = await findDoctorHomeAPI();
      // console.log('FindADoctor', data);
      const apiUrl = `${API_BASE_URL}/booking/videomainpage`; // Replace with your API endpoint

      // Make a GET request using the fetch method
      fetch(apiUrl, {
        method: 'GET',
        headers: {
          // Add any headers if required (e.g., Authorization, Content-Type, etc.)
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json(); // Assuming the response is in JSON format
        })
        .then(data => {
          // Handle the data from the successful API response
          console.log('API response:', data?.data[0]?.bannerList);
          setBannerData(data?.data[0]?.bannerList)
          setSpecializationList(data?.data[0]?.specializationList)
          setApiData(data?.data[0])
          setLoader(false)
        })
        .catch(error => {
          // Handle errors
          console.error('API error:', error);
        });
    };
    fetchData();
  }, []);

  // console.log(apiData?.topDoctorList,'ffff');
  
  if (loader) {
    return(
     <Loader/>
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
        {bannerData && <TopBannerFindDoctor data={bannerData} />}
     { specializationList ? <ADoctorHealthIssue data={specializationList} /> :  <Spinner size='large' />}
     {  apiData?.topDoctorList && <TopDoctor data={apiData?.topDoctorList} />}
 
        {apiData?.listAppGeneralCategory?.map((item:any)=>{
          return(
            <Box>
{ item?.app_general_sub_category_doc && <DoctorCategoryComponent title={item?.name} data={item?.app_general_sub_category_doc} />}
            </Box>
            
          ) 
        })}

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
