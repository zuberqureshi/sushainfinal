import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, TextInput, FlatList, Pressable, } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
import React, { useContext, useEffect, useState } from 'react';
import { colors, styles } from '../../themes';
import CHeader from '../../components/common/CHeader';

import images from '../../assets/images';
import typography from '../../themes/typography';
import { responsiveFontSize, responsiveHeight, responsiveWidth, } from 'react-native-responsive-dimensions';
import { API_IMAGE_BASE_URL, getHeight, moderateScale } from '../../common/constants';
import { DigitalPrecereption, FreeFollowUp, MedicineBottle, CovidVirusResearch, UserIcon, DoctorIcon, BrandIcon, ReviewsIcon, GreaterThanIcon, Menu, LikeIcon, Cart, CrossBottomTab, Search, } from '../../assets/svgs';
import CText from '../../components/common/CText';
//   import DoctorCategoryComponent from '../../components/DoctorComponent/DoctorCategoryComponent';
import MedicinesConcerns from '../../components/Medicines/MedicinesConcerns';
import SellingProduct from '../../components/Medicines/SellingProduct';
import SubHeader from '../../components/common/CommonComponent/SubHeader';
// import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { medicineBestSellingData, saveBigData, sushainProductData } from '../../api/constant';
import strings from '../../i18n/strings';
import SimilarProduct from '../../components/Medicines/SimilarProduct';
import SearchWithLikeComponent from '../../components/common/CommonComponent/SearchWithLikeComponent';
import { Container } from '../../components/Container';
import { Avatar, AvatarFallbackText, Box } from '@gluestack-ui/themed';
import { StackNav } from '../../navigation/NavigationKeys';
import { getAccessToken } from '../../utils/network';
import { useDispatch, useSelector } from 'react-redux';
import useGetMedicinesBestSeller from '../../hooks/medicine/get-medicine-bestseller';
import Loader from '../../components/Loader/Loader';
import useGetMedicinesBrandList from '../../hooks/medicine/get-medicines-brand-list';
import { Spinner } from '@gluestack-ui/themed';
import useGetMedicinesCombos from '../../hooks/medicine/get-medicine-combos';
import useGetMedicinesRecommended from '../../hooks/medicine/get-medicine-recommended';
import { AuthContext } from '../../context/AuthContext'
import useGetMedicinesByBrand from '../../hooks/medicine/get-medicines-by-brand';
import { clearProducts } from '../../redux/productSlice';



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



const Medicines = ({ route, navigation }: any) => {

  const iconSize = moderateScale(21);
  const { personalCareType } = route.params
  // console.log(route.params, 'routeee medcicness');

  const cartData = useSelector(state => state.cart);
  const dispatch = useDispatch()

  const authContext: any = useContext(AuthContext);

  const [mediType, setMediType] = useState<string>('')
  const [searchText, setSearchText] = useState('')
  const [searchDataList, setSearchDataList] = useState([])
  const [searchBrandDataList, setSearchBrandDataList] = useState([])
  const [searchBrandText, setSearchBrandText] = useState('')

  const { data: bestSellerData, isLoading: bestSellerIsLoading } = useGetMedicinesBestSeller({ masterCat: mediType, personalCareType: personalCareType })
  const { data: brandListData, isLoading: brandListIsLoading } = useGetMedicinesBrandList({ masterCat: mediType, personalCareType: personalCareType })
  const { data: combosData, isLoading: combosDataIsLoading } = useGetMedicinesCombos()
  const { data: recommendedData, isLoading: recommendedIsLoading } = useGetMedicinesRecommended({ userId: authContext?.userInfo?.userId })
  const { data: brandData, isLoading: brandDataIsLoading } = useGetMedicinesByBrand({ brand: 'sushain' })
  // console.log(recommendedData?.data, 'branddata');



  const fetchType = async () => {
    let medType = await getAccessToken('medType')
    console.log({ medType });
    setMediType(medType)
    return medType;

  }

  useEffect(() => {
    fetchType()
  }, [])

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

  const fetchSearchBrandResults = async (term) => {
    
    try {

      const searchData = brandListData?.data?.result[0]?.brandList?.filter(item => {
        const searchTerm = term.toLocaleLowerCase()
        const fullName = item?.name?.toLocaleLowerCase()
    
        return searchTerm && fullName.startsWith(searchTerm)
      })

      // console.log({searchData});
      
  
     await setSearchBrandDataList(searchData)
      
      // setSearchResults(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle the error, e.g., show an error message to the user
    } finally {
      // setLoading(false);
    }
  };

  const debouncedBrandSearch = debounce(fetchSearchBrandResults, 500);

  const handleBrandSearch = (text) => {
    setSearchBrandText(text);
    // setLoading(true);
    debouncedBrandSearch(text);
  };



  if (bestSellerIsLoading || brandListIsLoading || combosDataIsLoading || recommendedIsLoading || brandDataIsLoading) {
    return (
      <Container statusBarStyle='dark-content' >
        <CHeader
          title={strings.medicines}
        />
        <Loader />
      </Container>
    )
  }

  const renderSearchResult = ({ item }: any) => {
    // console.log(item,'serch ITEm');

    return (
      <TouchableOpacity style={styles.p10} onPress={async () => {
        navigation.navigate(StackNav.ProductDetail, { productDetail: { ...item, qty: 0 } })
      }} >
        <CText type="s10" numberOfLines={1} color={colors.black}>
          {item?.name}
        </CText>
      </TouchableOpacity>

    );
  };

  const RenderSeparator = () => <View style={localStyles.dividerStyle} />;


  return (
    <Container statusBarStyle='dark-content' >
      <CHeader title={strings.medicines} />
      <View style={localStyles.searchContainer}>
        <TouchableOpacity onPress={() => { navigation.openDrawer() }}>
          <Menu />
        </TouchableOpacity>

        <Box flexDirection='row' alignItems='center' h={40} px={10} borderWidth={1} borderColor={colors.gray4} borderRadius={5} flex={0.9} >
          <Search />
          <TextInput
            placeholder={strings.searchPlaceHolder}
            value={searchText}
            numberOfLines={1}
            onChangeText={handleSearch}
            style={localStyles.inputContainerStyle}
          />
          {!!searchDataList.length && <TouchableOpacity activeOpacity={0.7} onPress={() => {
            setSearchDataList([])
            setSearchText('')
          }} >
            <CrossBottomTab />
          </TouchableOpacity>}
        </Box>


        <Box gap={5} flexDirection='row' alignItems='center' >
          {/* <TouchableOpacity

            style={localStyles.cartBtnStyle}>
            <LikeIcon height={iconSize} width={iconSize} />
          </TouchableOpacity> */}
          <TouchableOpacity activeOpacity={0.6} onPress={() => { navigation.navigate(StackNav.Cart) }} >
            <Box>
              <Cart height={iconSize} width={iconSize} />
              {cartData?.length != 0 && <Box position='absolute' h={18} w={18} borderRadius={10} backgroundColor={colors.white} right={0} top={0} mt={-8} mr={-8} shadowColor='#000' shadowOffset={{ width: 0, height: 1 }} shadowOpacity={0.22} shadowRadius={2.22} alignItems='center' justifyContent='center' elevation={3}  >
                <CText type='m10' align='center' numberOfLines={1} >{cartData?.length}</CText>
              </Box>}
            </Box>

          </TouchableOpacity>


        </Box>

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

      <ScrollView
        style={{ marginBottom: responsiveHeight(10) }}
        showsVerticalScrollIndicator={false}>


        <TouchableOpacity style={localStyles.bannerContaienr}>
          <Image
            source={images.medicinesBanner1}
            style={localStyles.bannerImageStyle}
            resizeMode="cover"
          />
        </TouchableOpacity>

        <View style={localStyles.bottomBanerContainer}>
          <MedicineBottle />
          <CText type="m8" style={styles.pl5}>
            100% Genuine Products
          </CText>
          <CText type="s12" color={colors.dividerColor} style={styles.ph5}>
            {' | '}
          </CText>
          <CovidVirusResearch />
          <CText type="m8" style={styles.pl5}>
            {'Toxin-Free Natural Medications '}
          </CText>
          {/* <CText type="s12" color={colors.dividerColor} style={styles.ph5}>
              {' | '}
            </CText> */}
          {/* <DigitalPrecereption />
            <CText type="m8" numberOfLines={1} style={[styles.pl5, styles.flex]}>
              {'Toxin-Free Natural Medications '}
            </CText> */}
        </View>

        <MedicinesConcerns title={strings.medicinesbyHealthConcerns} mediType={mediType} personalCare={personalCareType} />

        <SellingProduct title={strings.bestSelling} data={bestSellerData?.data?.result[0]?.productDetail}  />

        <TouchableOpacity style={localStyles.bannerContaienr}>
          <Image
            source={images.medicinesBanner2}
            style={localStyles.bannerImageStyle}
            resizeMode="cover"
          />
        </TouchableOpacity>

        <Box flexDirection='row' alignItems='center' justifyContent='space-between' px={10} >
          <CText type='s14' >Shop by Brand</CText>
          <Box flexDirection='row' alignItems='center' borderWidth={1} borderColor={colors.green1} borderRadius={5} w={100} h={38} pl={3} overflow='hidden' >
            <Search />
            <TextInput
              placeholder='Search any brand'
              placeholderTextColor={colors.placeHolderColor}
              onChangeText={handleBrandSearch}
              value={searchBrandText}
              numberOfLines={1}
              style={{ ...typography.fontWeights.Regular, ...typography.fontSizes.f10, flex: 1, lineHeight: 12 ,}}
            />
          </Box>
          {!!searchBrandDataList?.length && (
          <View style={localStyles.searchBrandSuggestionContainer}>
            <FlatList
              data={searchBrandDataList}
              renderItem={({item}:any)=>{
                return(
                      <TouchableOpacity style={styles.p10} onPress={async () => {
                        navigation.navigate(StackNav.ProductsByBrand, { brandName: item?.name , masterCat: mediType , personalCareType : personalCareType })
                      }} >
                        <CText type="s10" numberOfLines={1} color={colors.black}>
                          {item?.name}
                        </CText>
                      </TouchableOpacity>
                )
              }}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={() => <RenderSeparator />}
            // estimatedItemSize={100}
            />
          </View>
        )}

        </Box>

        <Text
          style={{
            color: '#28A2B6',
            ...typography.fontWeights.SemiBold,
            fontSize: responsiveFontSize(1.6),
            textAlign: 'center',
            marginTop: responsiveHeight(1),
          }}>
          {strings.findProductsFromAyurvedaBrands}
        </Text>

        <View style={{ alignSelf: 'center', marginTop: responsiveHeight(2) }} >


          <FlatList
            style={{ alignSelf: 'center', gap: responsiveHeight(1.5) }}
            columnWrapperStyle={{ gap: responsiveWidth(6) }}
            data={brandListData?.data?.result[0]?.brandList?.slice(0, 6)}
            renderItem={({ item, index }) => {
              return (
                <>
                  {!!item?.img ?
                    <TouchableOpacity activeOpacity={0.6} onPress={() => {
                      navigation.navigate(StackNav.ProductsByBrand, { brandName: item?.name , masterCat: mediType , personalCareType : personalCareType })
                    }} >
                      <Image
                        source={{ uri: `${API_IMAGE_BASE_URL}${item?.img}` }}
                        style={[localStyles.shopBrand,]}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                    :
                    <Box w={95} h={95} borderRadius={47} alignItems='center' justifyContent='center' borderColor={'#399fb5'} borderWidth={3} >
                      <Avatar bgColor='$amber600' size="lg" borderRadius="$full" >
                        <AvatarFallbackText>{item?.name}</AvatarFallbackText>
                      </Avatar>
                    </Box>
                  }
                </>

              )
            }}
            keyExtractor={(item, index) => index?.toString()}
            numColumns={3}

          />

        </View>
        <TouchableOpacity style={localStyles.viewButtonWrapper} >
          <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', gap: responsiveWidth(2) }} >
            <Text style={localStyles.viewButtonText} >View All</Text>
            <GreaterThanIcon />
          </View>
        </TouchableOpacity>

        <SellingProduct title={'Save Big With Combos'} data={combosData?.data?.result[0]?.productDetail} />

        {/* <SubHeader title={'Value Deals Under'} isViewHide={false} /> */}

        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: responsiveWidth(8), marginVertical: responsiveHeight(2) }} >

          <View style={{ backgroundColor: '#F1FFE1', width: responsiveWidth(22), height: responsiveHeight(11), borderRadius: responsiveWidth(11) }} >
            <View style={{ backgroundColor: '#DBFAFF', width: responsiveWidth(22), height: responsiveHeight(11), borderRadius: responsiveWidth(11), marginLeft: responsiveWidth(2.5), justifyContent: 'center' }} >

              <Text style={localStyles.underText} >Under</Text>

              <Text style={localStyles.underPrice}>{'\u20B9'} 299</Text>

            </View>
          </View>


          <View style={{ backgroundColor: '#F1FFE1', width: responsiveWidth(22), height: responsiveHeight(11), borderRadius: responsiveWidth(11) }} >
            <View style={{ backgroundColor: '#DBFAFF', width: responsiveWidth(22), height: responsiveHeight(11), borderRadius: responsiveWidth(11), marginLeft: responsiveWidth(2.5), justifyContent: 'center' }} >
              <Text style={localStyles.underText} >Under</Text>

              <Text style={localStyles.underPrice}>{'\u20B9'} 699</Text>

            </View>
          </View>


          <View style={{ backgroundColor: '#F1FFE1', width: responsiveWidth(22), height: responsiveHeight(11), borderRadius: responsiveWidth(11) }} >
            <View style={{ backgroundColor: '#DBFAFF', width: responsiveWidth(22), height: responsiveHeight(11), borderRadius: responsiveWidth(11), marginLeft: responsiveWidth(2.5), justifyContent: 'center' }} >
              <Text style={localStyles.underText} >Under</Text>

              <Text style={localStyles.underPrice}>{'\u20B9'} 999</Text>

            </View>
          </View>



        </View> */}


        <SellingProduct title={'Recommended For You'} data={recommendedData?.data?.result[0]?.productDetail}  />

        <TouchableOpacity style={[localStyles.bannerContaienr, { marginVertical: responsiveHeight(1) }]}>
          <Image
            source={images.exclusiveTherapyImage}
            style={localStyles.bannerImageStyle}
            resizeMode="cover"
          />
        </TouchableOpacity>

        {/* <SellingProduct title={'Top Ayurveda Product'} data={saveBigData} bestSeller={true} /> */}

        <SellingProduct title={'Sushain Products '} data={brandData?.data?.result[0]?.productDetail}  />

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





      </ScrollView>
    </Container>
  );
};

export default Medicines;

const localStyles = StyleSheet.create({
  bannerContaienr: {
    ...styles.center,
    ...styles.mh20,
  },
  bannerImageStyle: {
    width: '100%',
    height: moderateScale(140),
    ...styles.mv10,
    borderRadius: moderateScale(10),
  },
  bottomBanerContainer: {
    ...styles.ph10,
    ...styles.pv10,
    backgroundColor: colors.lightOrange,
    ...styles.flexRow,
    ...styles.itemsCenter,
    justifyContent: 'center',
    // ...styles.flex,
    // ...styles.flexCenter
  },
  shopBrand: {
    width: responsiveWidth(25),
    height: responsiveHeight(12.5),

    marginBottom: responsiveHeight(0.5)

  },
  viewButtonWrapper: {
    backgroundColor: '#34AEC3',
    ...styles.mh20,
    paddingVertical: responsiveHeight(1),
    borderRadius: responsiveWidth(2),
    marginVertical: responsiveHeight(1.5),


  },
  viewButtonText: {
    alignSelf: 'center',
    ...typography.fontWeights.Medium,
    ...typography.fontSizes.f12,
    color: colors.white,
  },
  underText: {
    alignSelf: 'center',
    ...typography.fontWeights.Regular,
    ...typography.fontSizes.f10,
    color: colors.black,
  },
  underPrice: {
    alignSelf: 'center',
    ...typography.fontWeights.Medium,
    ...typography.fontSizes.f20,
    color: colors.black,
  },
  bottomContainer: {
    backgroundColor: colors.lightBlue3,
    ...styles.pv20,
    ...styles.mh15,
    ...styles.mt25,
    borderRadius: moderateScale(23),
    gap: moderateScale(15),
    marginBottom: responsiveHeight(5)
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
  searchContainer: {
    ...styles.rowSpaceBetween,
    ...styles.flexRow,
    ...styles.ph20,
    ...styles.itemsCenter,
    position: 'relative',
    zIndex: 100,
    ...styles.mt10,
    ...styles.pb5
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
  searchBrandSuggestionContainer: {
    position: 'absolute',
    top: moderateScale(40),
    width: '30%',
    // height: getHeight(150),
    backgroundColor: colors.white,
    ...styles.selfCenter,
    right: '2%',
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(5),
    borderColor: colors.gray6,
    zIndex: 10,
    ...styles.shadowStyle,
  },
  cartBtnStyle: {
    ...styles.pl5,
    ...styles.pv10,
  },
  inputContainerStyle: {
    ...typography.fontSizes.f10,
    ...typography.fontWeights.SemiBold,
    flex: 1,
    paddingRight: responsiveWidth(0.3),
    // marginHorizontal: responsiveWidth(2.5),
    // height: responsiveHeight(5),
    // borderWidth: 1,
    // borderRadius: responsiveWidth(1.5),
    // borderColor: colors.gray4,
    // ...styles.pl10

  },
  dividerStyle: {
    height: getHeight(1),
    backgroundColor: colors.gray6,
  },
});
