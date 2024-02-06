// library imports
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState, useEffect, useMemo} from 'react';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {FlashList} from '@shopify/flash-list';

// local imports
import {colors, styles} from '../../themes';
import typography from '../../themes/typography';
import CSafeAreaView from '../../components/common/CSafeAreaView';
import { ArrowDown, Cart, CloseIcon, CrossIconBlack, Heart, Location, Menu,Mic, Notification,Search, User,} from '../../assets/svgs';
import CText from '../../components/common/CText';

import {getHeight, moderateScale} from '../../common/constants';
import CInput from '../../components/common/CInput';
import BannerList from '../../components/HomeComponent/BannerList';
import CategoryList from '../../components/HomeComponent/CategoryList';
import strings from '../../i18n/strings';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { Container } from '../../components/Container';
import Body from '../../components/Body/Body';
import {getAccessToken} from '../../utils/network'
// import DoctorSpecialities from '../../components/HomeComponent/DoctorSpecialities';
// import ShopCategory from '../../components/HomeComponent/ShopCategory';
// import AyurvedicProducts from '../../components/HomeComponent/AyurvedicProducts';
// import ExclusiveTherapy from '../../components/HomeComponent/ExclusiveTherapy';
// import HonestReviews from '../../components/HomeComponent/HonestReviews';
// import FeaturedIn from '../../components/HomeComponent/FeaturedIn';
// import UpcomingAppointment from '../../components/HomeComponent/UpcomingAppointment';
// import FrequentlyBoughtProducts from '../../components/HomeComponent/FrequentlyBoughtProducts';
import useGetHomeData from '../../hooks/home/get-home-data';

import DoctorSpecialities from '../../components/HomeComponent/DoctorSpecialities';
import ShopCategory from '../../components/HomeComponent/ShopCategory';
import AyurvedicProducts from '../../components/HomeComponent/AyurvedicProducts';
import ExclusiveTherapy from '../../components/HomeComponent/ExclusiveTherapy';
import HonestReviews from '../../components/HomeComponent/HonestReviews';
import FeaturedIn from '../../components/HomeComponent/FeaturedIn';
import UpcomingAppointment from '../../components/HomeComponent/UpcomingAppointment';
import Loader from '../../common/Loader';
import FrequentlyBoughtProducts from '../../components/HomeComponent/FrequentlyBoughtProducts';
import useGetHomeBannerData from '../../hooks/home/get-home-banner';
import { shopByategoryData } from '../../api/constant';
import { getLocation } from '../../utils/service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Box, Pressable,Text } from '@gluestack-ui/themed';
// import {HomePageAPI, SearchAPI} from '../../api/homeApis';
// import CDebounce from '../../components/common/CDebounce';
// import { getLng } from '../../i18n/changeLng';

type Props = {
  icon: React.JSX.Element;
  onPress: () => void;
};

const HomeMain = () => {
  const navigationDrawer = useNavigation<DrawerNavigationProp<ParamListBase>>();
  const [search, setSearch] = useState<string>('');
  const [userInfo, setUserInfo] = useState();

  const [resultData, setResultData] = useState<any>({});
  const [searchResult, setSearchResult] = useState([]);


  async function load(){
      setUserInfo(JSON.parse( await getAccessToken('userInfo') ) ) ;
   }
  
  useEffect(() => {
    load();
  }, []);


  const [userLocation, setUserLocation] = useState('')
   // const [homeBannerData, setResultData] = useState<any>([]);
  
  const [slectedTypeNeed, setSlectedTypeNeed] = useState<string>('ayurvedic')
 
  const {data,isLoading} = useGetHomeData()
  const {data:homeBannerData,isLoading:homeBannerIsLoading} = useGetHomeBannerData()

  // console.log(homeBannerData?.data?.result,'HOMEEE');
   
//   const debounceSearch = CDebounce(search, 300);
   
//   const selectedLng = async () => {
//     const lngData = await getLng()
//     if(!!lngData){
//       strings.setLanguage(lngData)
//     }
//     console.log("Drawer LOggggggg",lngData);

//   }
const locationSet = async() => {
  const  location = await AsyncStorage.getItem('getUserCity')
  setUserLocation(location as string)
}

  useEffect(() => {
     
    locationSet()

    if (data?.data) {
      setResultData(data?.data?.result[0])
      
     }
    
   
  }, [isLoading]);

  const onPressLike = () => {};

  const onPressNotification = () => {};

  const onPressUser = () => {};

  const onChangeSearch = (text: string) => {
    setSearch(text);
  };

//   const onPressDrawer = () => navigation.openDrawer();

  const onPressRightIcon = () => {
    if (searchResult?.length) {
      setSearch('');
      setSearchResult([]);
    }
  };

  const searchIcon = () => {
    return <Search />;
  };

  const rightAccessory = () => {
    return (
      <TouchableOpacity onPress={onPressRightIcon}>
        {!!searchResult?.length ? <CloseIcon /> : <Mic />}
      </TouchableOpacity>
    );
  };

  const Icon = ({icon, onPress}: Props) => {
    return <TouchableOpacity onPress={onPress}>{icon}</TouchableOpacity>;
  };

  const renderSearchResult = ({item}: any) => {
    return (
      <CText type="s10" style={styles.p10} color={colors.black}>
        {item?.name}
      </CText>
    );
  };

  const RenderSeparator = () => <View style={localStyles.dividerStyle} />;

  if (isLoading || homeBannerIsLoading) {
    <Loader/>
  }
 
  return (
    <Container statusBarStyle='dark-content' >
      <Body>
        <View style={localStyles.headerStyle}>
          <TouchableOpacity style={localStyles.locationContainer}>
            <Location />
            <View>
              <CText type={'s12'}>
                {strings.hi}  { userInfo?.userName }
                {/* {global.userDetail?.first_name || strings.firstName} */}
              </CText>
              <Pressable onPress={()=>{getLocation()}} style={localStyles.locationContainer}>
                <CText type={'s10'} color={colors.gray4}>
                  {userLocation}
                </CText>
                <ArrowDown />
              </Pressable>
            </View>
          </TouchableOpacity>
          <View style={localStyles.iconContainer}>
            <Icon icon={<Heart />} onPress={onPressLike} />
            <Icon icon={<Notification />} onPress={onPressNotification} />
            <Icon icon={<User />} onPress={onPressUser} />
          </View>
        </View>
        <View style={localStyles.searchContainer}>
          <TouchableOpacity onPress={()=>{navigationDrawer.openDrawer()}}>
            <Menu />
          </TouchableOpacity>
          <CInput
            placeholder={strings.searchPlaceHolder}
            _value={search}
            toGetTextFieldValue={onChangeSearch}
            placeholderTextColor={colors.gray4}
            inputContainerStyle={localStyles.inputContainerStyle}
            inputBoxStyle={localStyles.inputBoxStyle}
            insideLeftIcon={searchIcon}
            rightAccessory={rightAccessory}
            inputStyle={localStyles.inputStyle}
          />
          <TouchableOpacity style={localStyles.cartBtnStyle}>
            <Cart height={moderateScale(21)} width={moderateScale(21)} />
          </TouchableOpacity>
          {!!searchResult?.length && (
            <View style={localStyles.searchSuggestionContainer}>
              {/* <FlashList
                data={searchResult}
                renderItem={renderSearchResult}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={() => <RenderSeparator />}
                scrollEnabled
              /> */}
            </View>
          )}
        </View>
        <Box alignSelf='flex-end' flexDirection='row' gap={10} mr={20} >
            <Pressable onPress={()=>{setSlectedTypeNeed('ayurvedic')}} >
            <Box backgroundColor={slectedTypeNeed === 'ayurvedic' ? colors.lightSuccess : colors.white} borderWidth={1} borderColor={slectedTypeNeed === 'ayurvedic' ? '#149C5C' :'#E5DFDF'} pl={slectedTypeNeed === 'ayurvedic' && 5} px={slectedTypeNeed === 'ayurvedic' ? 0 : 5}  h={26} borderRadius={5} flexDirection='row' alignItems='center'  >
            <Text fontFamily='$InterMedium' fontSize={10} color={colors.black2} >Ayurvedic</Text>
            { slectedTypeNeed === 'ayurvedic' && <CrossIconBlack />}
            </Box>   
            </Pressable>

            <Pressable onPress={()=>{setSlectedTypeNeed('homeopathy')}} >
            <Box backgroundColor={slectedTypeNeed === 'homeopathy' ? colors.lightSuccess : colors.white} borderWidth={1} borderColor={slectedTypeNeed === 'homeopathy' ? '#149C5C' :'#E5DFDF'} pl={slectedTypeNeed === 'homeopathy' && 5 } px={slectedTypeNeed === 'homeopathy' ? 0 : 5}     h={26} borderRadius={5} flexDirection='row' alignItems='center' justifyContent='center' >
            <Text fontFamily='$InterMedium' fontSize={10} color={colors.black2} textAlign='center' >Homeopathy</Text>
            { slectedTypeNeed === 'homeopathy' && <CrossIconBlack />}
            </Box>   
            </Pressable>
            
    
        </Box>
        {!!resultData && (
          <View>
            <BannerList bannerData={homeBannerData?.data?.result[0]?.Bannerlist}  />
            {/* <UpcomingAppointment isFollowUp={false} />
            <UpcomingAppointment isFollowUp={true} /> */}
            {/* <FrequentlyBoughtProducts /> */}
            <CategoryList />
            <DoctorSpecialities />
            <ShopCategory shopCategaryData={shopByategoryData}/>
            <AyurvedicProducts ayurvedicData={resultData?.bestSellingProductList} />
            <ExclusiveTherapy bannerData={homeBannerData?.data?.result[0]?.bottomBannerList} />
            <HonestReviews data={resultData?.customerReviewList} />
            <FeaturedIn data={homeBannerData?.data?.result[0]?.mediaList} />
            <View style={{height: 120}} />
          </View>
        )}

      </Body>
    </Container>
  );
};

export default HomeMain;

const localStyles = StyleSheet.create({
  root: {
    ...styles.ph20,
  },
  headerStyle: {
    ...styles.rowSpaceBetween,
    ...styles.ph20,
    ...styles.mv10,
  },
  locationContainer: {
    ...styles.rowCenter,
    gap: moderateScale(10),
  },
  iconContainer: {
    ...styles.rowCenter,
    gap: moderateScale(10),
  },
  inputStyle: {
    width: '70%',
  },
  inputContainerStyle: {
    height: moderateScale(40),
    width: '100%',
  },
  inputBoxStyle: {
    ...typography.fontSizes.f12,
    ...typography.fontWeights.SemiBold,
  },
  cartBtnStyle: {
    borderWidth: moderateScale(1),
    ...styles.ph10,
    ...styles.center,
    height: moderateScale(40),
    borderRadius: moderateScale(6),
    borderColor: colors.gray4,
  },
  searchContainer: {
    ...styles.rowSpaceBetween,
    ...styles.flexRow,
    ...styles.ph20,
    ...styles.itemsCenter,
    position: 'relative',
    zIndex: 100,
  },
  searchSuggestionContainer: {
    position: 'absolute',
    top: moderateScale(50),
    width: '70%',
    height: getHeight(350),
    backgroundColor: colors.white,
    ...styles.selfCenter,
    left: '19%',
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(5),
    borderColor: colors.gray6,
    zIndex: 10,
    ...styles.shadowStyle,
  },
  dividerStyle: {
    height: getHeight(1),
    backgroundColor: colors.gray6,
  },
});
