// library imports
import {StyleSheet, TouchableOpacity, View,Text} from 'react-native';
import React, {useState, useEffect, useMemo} from 'react';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {FlashList} from '@shopify/flash-list';

// local imports
// const CSafeAreaView = React.lazy(() => import('../../components/common/CSafeAreaView'))
// const CText = React.lazy(() => import('../../components/common/CText'))
// const CInput = React.lazy(() => import('../../components/common/CInput'))
// const BannerList = React.lazy(() => import('../../components/HomeComponent/BannerList'))
// const CategoryList = React.lazy(() => import('../../components/HomeComponent/CategoryList'))
// const KeyBoardAvoidWrapper = React.lazy(() => import('../../components/common/KeyBoardAvoidWrapper'))
// const DoctorSpecialities = React.lazy(() => import('../../components/HomeComponent/DoctorSpecialities'))
// const ShopCategory = React.lazy(() => import('../../components/HomeComponent/ShopCategory'))
// const AyurvedicProducts = React.lazy(() => import('../../components/HomeComponent/AyurvedicProducts'))
// const ExclusiveTherapy = React.lazy(() => import('../../components/HomeComponent/ExclusiveTherapy'))
// const HonestReviews = React.lazy(() => import('../../components/HomeComponent/HonestReviews'))
// const FeaturedIn = React.lazy(() => import('../../components/HomeComponent/FeaturedIn'))
// const UpcomingAppointment = React.lazy(() => import('../../components/HomeComponent/UpcomingAppointment'))
// const FrequentlyBoughtProducts = React.lazy(() => import('../../components/HomeComponent/FrequentlyBoughtProducts'))
// const CDebounce = React.lazy(() => import('../../components/common/CDebounce'))


import {colors, styles} from '../../themes';
import typography from '../../themes/typography';
import CSafeAreaView from '../../components/common/CSafeAreaView';
import {
  ArrowDown,
  Cart,
  CloseIcon,
  Heart,
  Location,
  Menu,
  Mic,
  Notification,
  Search,
  User,
} from '../../assets/svgs';
import CText from '../../components/common/CText';
// import strings from '../../i18n/strings';
import {getHeight, moderateScale} from '../../common/constants';
import CInput from '../../components/common/CInput';
// import BannerList from '../../components/HomeComponent/BannerList';
// import CategoryList from '../../components/HomeComponent/CategoryList';
import KeyBoardAvoidWrapper from '../../components/common/KeyBoardAvoidWrapper';
import strings from '../../i18n/strings';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { DrawerNavigationProp } from '@react-navigation/drawer';

// import DoctorSpecialities from '../../components/HomeComponent/DoctorSpecialities';
// import ShopCategory from '../../components/HomeComponent/ShopCategory';
// import AyurvedicProducts from '../../components/HomeComponent/AyurvedicProducts';
// import ExclusiveTherapy from '../../components/HomeComponent/ExclusiveTherapy';
// import HonestReviews from '../../components/HomeComponent/HonestReviews';
// import FeaturedIn from '../../components/HomeComponent/FeaturedIn';
// import UpcomingAppointment from '../../components/HomeComponent/UpcomingAppointment';
// import FrequentlyBoughtProducts from '../../components/HomeComponent/FrequentlyBoughtProducts';
// import {HomePageAPI, SearchAPI} from '../../api/homeApis';
// import CDebounce from '../../components/common/CDebounce';
// import { getLng } from '../../i18n/changeLng';

type Props = {
  icon: React.JSX.Element;
  onPress: () => void;
};

const HomeMain = () => {
  const navigationDrawer = useNavigation<DrawerNavigationProp<ParamListBase>>();
  const [search, setSearch] = useState('');
  const [resultData, setResultData] = useState<any>({});
  const [searchResult, setSearchResult] = useState([]);
//   const debounceSearch = CDebounce(search, 300);
   
//   const selectedLng = async () => {
//     const lngData = await getLng()
//     if(!!lngData){
//       strings.setLanguage(lngData)
//     }
//     console.log("Drawer LOggggggg",lngData);

//   }

//   useEffect(() => {
//     const fetchData = async () => {
//       const data = await HomePageAPI();
//       console.log('Homedata', data);
    
//         // selectedLng()
        
     
      
//       setResultData(data);
//     };
//     fetchData();
//   }, []);



//   useEffect(() => {
//     searchAPICall();
//   }, [debounceSearch]);

//   const searchAPICall = async () => {
//     if (!!debounceSearch) {
//       const data = await SearchAPI(debounceSearch);
//       console.log('debounceSearch', data);
//       setSearchResult(data?.[0].medicineList);
//     }
//   };

  const onPressLike = () => {};

  const onPressNotification = () => {};

  const onPressUser = () => {};

  const onChangeSearch = (text: string) => {
    setSearch(text);
  };

//   const onPressDrawer = () => navigation.openDrawer();

  const bannerData = useMemo(() => {
    return resultData?.bannerList;
  }, [resultData]);

  const shopCategaryData = useMemo(() => {
    return {
      ayurvedicProduct: resultData?.medicineAyurvedicCategoryList,
      personalCare: resultData?.lifestyleCategoryList,
      homeopathy: resultData?.medicineAyurvedicCategoryList,
      immunityWellness: resultData?.medicineAyurvedicCategoryList,
    };
  }, [resultData]);

  const ayurvedicData = useMemo(() => {
    return resultData?.bestSellingProductList;
  }, [resultData]);

  const reviewData = useMemo(() => {
    return resultData?.customerReviewList;
  }, [resultData]);

  const bottomBannerData = useMemo(() => {
    return resultData?.bottomBannerList;
  }, [resultData]);

  const feturedData = useMemo(() => {
    return resultData?.mediaList;
  }, [resultData]);

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

  return (
    <CSafeAreaView>
      <KeyBoardAvoidWrapper>
        <View style={localStyles.headerStyle}>
          <TouchableOpacity style={localStyles.locationContainer}>
            <Location />
            <View>
              <CText type={'s12'}>
                {strings.hi}
                {/* {global.userDetail?.first_name || strings.firstName} */}
              </CText>
              <View style={localStyles.locationContainer}>
                <CText type={'s10'} color={colors.gray4}>
                  {strings.addLocation}
                </CText>
                <ArrowDown />
              </View>
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
        {/* {!!resultData && (
          <View>
            <BannerList bannerData={bannerData} />
            <UpcomingAppointment isFollowUp={false} />
            <UpcomingAppointment isFollowUp={true} />
            <FrequentlyBoughtProducts />
            <CategoryList />
            <DoctorSpecialities />
            <ShopCategory shopCategaryData={shopCategaryData} />
            <AyurvedicProducts ayurvedicData={ayurvedicData} />
            <ExclusiveTherapy bannerData={bottomBannerData} />
            <HonestReviews reviewData={reviewData} />
            <FeaturedIn data={feturedData} />
            <View style={{height: 120}} />
          </View>
        )} */}

      </KeyBoardAvoidWrapper>
    </CSafeAreaView>
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
