// library imports
import { FlatList, Modal, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect, useMemo, useContext } from 'react';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FlashList } from '@shopify/flash-list';
import RNRestart from 'react-native-restart'

// local imports
import { colors, styles } from '../../themes';
import typography from '../../themes/typography';
import CSafeAreaView from '../../components/common/CSafeAreaView';
import { ArrowDown, Cart, CloseIcon, CrossBottomTab, CrossIconBlack, Heart, Location, Menu, Mic, Notification, Search, User, } from '../../assets/svgs';
import CText from '../../components/common/CText';

import { getHeight, moderateScale } from '../../common/constants';
import CInput from '../../components/common/CInput';
import BannerList from '../../components/HomeComponent/BannerList';
import CategoryList from '../../components/HomeComponent/CategoryList';
import strings from '../../i18n/strings';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { Container } from '../../components/Container';
import Body from '../../components/Body/Body';
import { getAccessToken, setAccessToken } from '../../utils/network'
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
import { Avatar, AvatarFallbackText, Box, Pressable, Spinner, Text } from '@gluestack-ui/themed';
// import CDebounce from '../../components/common/CDebounce';
// import { getLng } from '../../i18n/changeLng';
import { AuthContext } from '../../context/AuthContext'
import CheckInternet from '../../components/common/CommonComponent/CheckInternet';
import useGetTodayAppointments from '../../hooks/appointment/get-today-appointment';
import { useNetInfo } from '@react-native-community/netinfo';
import { StackNav } from '../../navigation/NavigationKeys';
import CategoryListNew from '../../components/HomeComponent/CategoryListNew';

type Props = {
  icon: React.JSX.Element;
  onPress: () => void;
};

const HomeMain = () => {
  const navigationDrawer = useNavigation<DrawerNavigationProp<ParamListBase>>();
  const netInfo = useNetInfo()
  const [search, setSearch] = useState<string>('');
  const [userInfo, setUserInfo] = useState();

  const [resultData, setResultData] = useState<any>({});
  const [searchResult, setSearchResult] = useState([]);
  const [loadingModel, setLoadingModel] = useState(false)
  const authContext: any = useContext(AuthContext);
  const [searchText, setSearchText] = useState('')
  const [searchDataList, setSearchDataList] = useState([])

  // console.log( 'authContext', authContext.userInfo )

  const [userLocation, setUserLocation] = useState('')
  // const [homeBannerData, setResultData] = useState<any>([]);

  const [slectedTypeNeed, setSlectedTypeNeed] = useState<string>('ayurvedic')

  //api call
  const { data, isLoading } = useGetHomeData()
  const { data: homeBannerData, isLoading: homeBannerIsLoading } = useGetHomeBannerData()

  const { data: todayAppointmentsData, isLoading: isLoadingTodayAppointments } = useGetTodayAppointments({ userid: authContext?.userInfo?.userId })

  // console.log(homeBannerData?.data?.result,'HOMEEE');

  //   const debounceSearch = CDebounce(search, 300);

  //   const selectedLng = async () => {
  //     const lngData = await getLng()
  //     if(!!lngData){
  //       strings.setLanguage(lngData)
  //     }
  //     console.log("Drawer LOggggggg",lngData);

  //   }

  async function load() {
    await setSlectedTypeNeed(await getAccessToken('medType'));
    // setUserInfo(JSON.parse( await getAccessToken('userInfo') ) ) ;

    // console.log( 'slectedTypeNeed', slectedTypeNeed)
  }

  useEffect(() => {
    load();

  }, []);


  const locationSet = async () => {
    const location = await AsyncStorage.getItem('getUserCity')
    setUserLocation(location as string)
  }

  useEffect(() => {

    locationSet()

    if (data?.data) {
      setResultData(data?.data?.result[0])

    }


  }, [isLoading]);

  const onPressLike = () => { };

  const onPressNotification = () => { };

  const onPressUser = () => { };

  const onChangeSearch = (text: string) => {
    setSearch(text);
  };

  //   const onPressDrawer = () => navigation.openDrawer();
  const debounce = (func, delay) => {
    let timeoutId;
  
    return (...args) => {
      clearTimeout(timeoutId);
  
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  const fetchSearchResults = async (term) => {
    // console.log({term});
    
    try {

      const url = `http://13.232.170.16:3006/api/v1/order/productsearch?name=${term}`
      let result = await fetch(url);
      result = await result.json();
      // console.log(result?.result,'SERCH DATTT');
      
       
      // Perform an API request based on the search term
      // const response = await fetch(`YOUR_API_ENDPOINT?q=${term}`);
      // const data = await response.json();

      const searchData = result?.result[0]?.productDetail?.filter(item => {
        const searchTerm = term.toLocaleLowerCase()
        const fullName = item?.name?.toLocaleLowerCase()

        return searchTerm && fullName.startsWith(searchTerm)
      }
      )

      await setSearchDataList(searchData)

      // setSearchResults(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle the error, e.g., show an error message to the user
    } finally {
      // setLoading(false);
    }
  };


  const debouncedSearch = debounce(fetchSearchResults, 500);

  const handleSearch = (text) => {
    setSearchText(text);
    // setLoading(true);
    debouncedSearch(text);
  };
  const onPressRightIcon = () => {
    if (searchResult?.length) {
      setSearch('');
      setSearchResult([]);
    }
  };


  const rightAccessory = () => {
    return (
      <TouchableOpacity onPress={onPressRightIcon}>
        {!!searchResult?.length ? <CloseIcon /> : <Mic />}
      </TouchableOpacity>
    );
  };

  const Icon = ({ icon, onPress }: Props) => {
    return <TouchableOpacity onPress={onPress}>{icon}</TouchableOpacity>;
  };

  const renderSearchResult = ({ item }: any) => {
    // console.log(item,'serch ITEm');
    
    return (
      <TouchableOpacity style={styles.p10} onPress={async() => { 
      navigationDrawer.navigate(StackNav.ProductDetail, { productDetail: {...item,qty:0 }})
      }} >
        <CText type="s10" numberOfLines={1}  color={colors.black}>
          {item?.name}
        </CText>
      </TouchableOpacity>

    );
  };

  const RenderSeparator = () => <View style={localStyles.dividerStyle} />;

  if (isLoading || homeBannerIsLoading) {
    <Loader />
  }

  return (
    <Container statusBarStyle='dark-content' >
      <Body>
        <View style={localStyles.headerStyle}>
          <TouchableOpacity style={localStyles.locationContainer}>
            <Location />
            <View>
              <CText type={'s12'} style={{ textTransform: 'capitalize' }} >
                {strings.hi} {authContext?.userInfo?.userName}
                {/* {global.userDetail?.first_name || strings.firstName} */}
              </CText>
              <Pressable onPress={() => { getLocation() }} style={localStyles.locationContainer}>
                <CText type={'s10'} color={colors.gray4}>
                  {!!userLocation ? userLocation : 'User Location'}
                </CText>
                <ArrowDown />
              </Pressable>
            </View>
          </TouchableOpacity>
          <View style={localStyles.iconContainer}>
            <Icon icon={<Heart />} onPress={onPressLike} />
            <Icon icon={<Notification />} onPress={onPressNotification} />
           { !!authContext?.userInfo?.userName ?    <Avatar bgColor='$amber600' size='xs' borderRadius="$full" >
          <AvatarFallbackText>{  authContext?.userInfo?.userName}</AvatarFallbackText>
        </Avatar> :<Icon icon={<User />} onPress={onPressUser} />}
          </View>
        </View>
        <View style={localStyles.searchContainer}>
          <TouchableOpacity onPress={() => { navigationDrawer.openDrawer() }}>
            <Menu />
          </TouchableOpacity>
          {/* <CInput
            placeholder={strings.searchPlaceHolder}
            _value={search}
            toGetTextFieldValue={onChangeSearch}
            placeholderTextColor={colors.gray4}
            inputContainerStyle={localStyles.inputContainerStyle}
            inputBoxStyle={localStyles.inputBoxStyle}
            insideLeftIcon={searchIcon}
            // rightAccessory={rightAccessory}
            inputStyle={localStyles.inputStyle}
          /> */}
            <Box flexDirection='row' alignItems='center' h={40} px={10} borderWidth={1} borderColor={colors.gray4} borderRadius={5} flex={0.9} >
          <Search/>
        <TextInput
          placeholder={strings.searchPlaceHolder}
          value={searchText}
          numberOfLines={1}
          onChangeText={handleSearch}
          style={localStyles.inputContainerStyle}
        />
        { !!searchDataList.length && <TouchableOpacity activeOpacity={0.7} onPress={()=>{
          setSearchDataList([])
          setSearchText('')}} >
          <CrossBottomTab/>
        </TouchableOpacity> }
        </Box>
          <TouchableOpacity onPress={() => { navigationDrawer.navigate(StackNav.Cart) }} activeOpacity={0.6} style={localStyles.cartBtnStyle}>
            <Cart height={moderateScale(21)} width={moderateScale(21)} />
          </TouchableOpacity>
           {!!searchDataList.length && (
          <View style={localStyles.searchSuggestionContainer}>
            <FlatList
              data={searchDataList}
              renderItem={renderSearchResult}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={() => <RenderSeparator />}
            // estimatedItemSize={100}
            />
          </View>
        )}
        </View>
        <Box alignSelf='flex-end' flexDirection='row' gap={10} mr={20} mt={5} >
          <Pressable onPress={async () => {
            await setAccessToken('medType', 'ayurvedic');
            setSlectedTypeNeed('ayurvedic')
            RNRestart.Restart()
          }} >
            <Box backgroundColor={slectedTypeNeed === 'ayurvedic' ? colors.lightSuccess : colors.white} borderWidth={1} borderColor={slectedTypeNeed === 'ayurvedic' ? '#149C5C' : '#E5DFDF'} pl={slectedTypeNeed === 'ayurvedic' && 5} px={slectedTypeNeed === 'ayurvedic' ? 0 : 5} h={26} borderRadius={5} flexDirection='row' alignItems='center'  >
              <Text fontFamily='$InterMedium' fontSize={10} color={colors.black2} >Ayurvedic</Text>
              {slectedTypeNeed === 'ayurvedic' && <CrossIconBlack />}
            </Box>
          </Pressable>

          <Pressable onPress={async () => {
            await setAccessToken('medType', 'homeopathy');
            setSlectedTypeNeed('homeopathy')
            RNRestart.Restart()
          }} >
            <Box backgroundColor={slectedTypeNeed === 'homeopathy' ? colors.lightSuccess : colors.white} borderWidth={1} borderColor={slectedTypeNeed === 'homeopathy' ? '#149C5C' : '#E5DFDF'} pl={slectedTypeNeed === 'homeopathy' && 5} px={slectedTypeNeed === 'homeopathy' ? 0 : 5} h={26} borderRadius={5} flexDirection='row' alignItems='center' justifyContent='center' >
              <Text fontFamily='$InterMedium' fontSize={10} color={colors.black2} textAlign='center' >Homeopathy</Text>
              {slectedTypeNeed === 'homeopathy' && <CrossIconBlack />}
            </Box>
          </Pressable>


        </Box>
        {!!resultData && (
          <View>
            {!!(todayAppointmentsData?.data?.result[0]?.consultationDetail) ? <UpcomingAppointment isFollowUp={true} data={todayAppointmentsData?.data?.result[0]?.consultationDetail} /> :
              <Box alignSelf='center' >
                <CategoryListNew mediType={slectedTypeNeed} />
              </Box>
            }

            <BannerList bannerData={homeBannerData?.data?.result[0]?.Bannerlist} />
            {/* <UpcomingAppointment isFollowUp={false} /> */}

            {/* <CategoryList /> */}
            {/* <FrequentlyBoughtProducts /> */}
            {/* <CategoryList /> */}

            <DoctorSpecialities />
            <ShopCategory shopCategaryData={shopByategoryData} />
            <AyurvedicProducts ayurvedicData={resultData?.bestSellingProductList} />
            <ExclusiveTherapy bannerData={homeBannerData?.data?.result[0]?.bottomBannerList} />
            <HonestReviews data={resultData?.customerReviewList} />
            <FeaturedIn data={homeBannerData?.data?.result[0]?.mediaList} />
            <View style={{ height: 120 }} />
          </View>
        )}

      </Body>
      {netInfo?.isConnected !== null && <CheckInternet netStatus={netInfo?.isConnected} />}
      <Modal
        animationType="slide"
        transparent={true}
        visible={loadingModel}
      // onRequestClose={() => setModalVisible(false)}
      >
        <Box flex={1} justifyContent='center' alignItems='center' backgroundColor='rgba(0, 0, 0, 0.5)' >
          <Box backgroundColor='#fff' borderRadius={10} alignItems='center' justifyContent='center' elevation={5} w={'55%'} h={'15%'} gap={10} >
            {/* <Box alignItems='center' gap={5} >
              <OppsIcon />
              <Text style={{ color: colors.white, ...typography.fontSizes.f14, ...typography.fontWeights.Bold, }} >Done</Text>
              <Text fontFamily='$InterSemiBold' color={colors.black} textAlign='center' fontSize={18} mt={3} >Oops!</Text>
              <Text fontFamily='$InterRegular' color={'#767474'} textAlign='center' fontSize={13} >MeetID Not Found</Text>

              <PrimaryButton onPress={() => { navigation.goBack() }} buttonText='Try again' height={35} />
            </Box> */}
            <Text style={{ color: colors.black, ...typography.fontSizes.f14, ...typography.fontWeights.Bold, }} >Please wait</Text>

            {/* <Button title="Close" onPress={() => setModalVisible(false)} /> */}
            <Spinner size={'large'} color={colors.primary} />
          </Box>
        </Box>
      </Modal>
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
    ...typography.fontSizes.f10,
    ...typography.fontWeights.SemiBold,
    flex: 1,
    paddingRight:responsiveWidth(0.3),
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
    top: moderateScale(40),
    width: '70%',
    // height: getHeight(150),
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
