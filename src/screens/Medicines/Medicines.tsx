import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, TextInput, FlatList, } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
import React, { useEffect, useState } from 'react';
import { colors, styles } from '../../themes';
import CHeader from '../../components/common/CHeader';

import images from '../../assets/images';
import typography from '../../themes/typography';
import { responsiveFontSize, responsiveHeight, responsiveWidth, } from 'react-native-responsive-dimensions';
import { moderateScale } from '../../common/constants';
import { DigitalPrecereption, FreeFollowUp, MedicineBottle, CovidVirusResearch, UserIcon, DoctorIcon, BrandIcon, ReviewsIcon, GreaterThanIcon, Menu, LikeIcon, Cart, } from '../../assets/svgs';
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
import { Box } from '@gluestack-ui/themed';
import { StackNav } from '../../navigation/NavigationKeys';
import { getAccessToken } from '../../utils/network';
import { useSelector } from 'react-redux';
import useGetMedicinesBestSeller from '../../hooks/medicine/get-medicine-bestseller';
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



const Medicines = ({route,navigation}:any) => {

  const iconSize = moderateScale(21);
  const {personalCareType} = route.params
  console.log(route.params,'routeee medcicness');

  const cartData = useSelector(state => state.cart);

  const [mediType, setMediType] = useState<string>('')

  const {data : bestSellerData , isLoading : bestSellerIsLoading } = useGetMedicinesBestSeller({masterCat:mediType,personalCareType:personalCareType})

  const fetchType = async () => {
    let medType = await getAccessToken('medType')
    console.log({ medType });
    setMediType(medType)
    return medType;

  }

  useEffect(() => {
    fetchType()
  }, [])

  if(bestSellerIsLoading){
    return(
      <Container>
              <CHeader
        title={strings.medicines}
      //   rightIcon={<RightText />}
      />
      <Loader/>
      </Container>
    )
  }
  

  return (
    <Container  statusBarStyle='dark-content' >
      <CHeader
        title={strings.medicines}
      //   rightIcon={<RightText />}
      />

      <ScrollView
        style={{ marginBottom: responsiveHeight(10) }}
        showsVerticalScrollIndicator={false}>

      <View style={localStyles.searchContainer}>
          <TouchableOpacity onPress={()=>{navigation.openDrawer()}}>
            <Menu />
          </TouchableOpacity>
         
          <TextInput
           placeholder={strings.searchPlaceHolder}
          //  value={searchText}
          //  onChangeText={(t)=>setSearchText(t)}
           style={localStyles.inputContainerStyle}
          />
      <Box flexDirection='row' alignItems='center' gap={5} >
      <TouchableOpacity
        onPress={()=>{}}
        style={localStyles.cartBtnStyle}>
        <LikeIcon height={iconSize} width={iconSize} />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.6} onPress={()=>{navigation.navigate(StackNav.Cart)}} >
        <Box>
        <Cart height={iconSize} width={iconSize} />
     { cartData?.length !=0 &&  <Box position='absolute' h={18} w={18} borderRadius={10} backgroundColor={colors.white} right={0} top={0} mt={-8} mr={-8} shadowColor='#000' shadowOffset={{width:0,height:1}} shadowOpacity={0.22} shadowRadius={2.22} alignItems='center' justifyContent='center' elevation={3}  >
          <CText type='m10' align='center' numberOfLines={1} >{cartData?.length}</CText>
        </Box>}
        </Box>
       
      </TouchableOpacity>
      </Box>    
      
          {/* {!!searchData.length && (
            <View style={localStyles.searchSuggestionContainer}>
              <FlatList
                data={searchData}
                renderItem={renderSearchResult}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={() => <RenderSeparator />}
                // estimatedItemSize={100}
              />
            </View>
          )} */}
        </View>

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

        <SellingProduct title={strings.bestSelling} data={bestSellerData?.data?.result[0]?.productDetail} bestSeller={false} />

        <TouchableOpacity style={localStyles.bannerContaienr}>
          <Image
            source={images.medicinesBanner2}
            style={localStyles.bannerImageStyle}
            resizeMode="cover"
          />
        </TouchableOpacity>

        <SubHeader title={'Shop by Brand'} isViewHide={false} />

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

        <View style={{ alignSelf: 'center', marginBottom: responsiveHeight(3) ,marginTop:responsiveHeight(1.5) }} >
 

          <FlatList
          style={{alignSelf:'center',gap:responsiveHeight(1.5)}}
          columnWrapperStyle={{gap:responsiveWidth(5)}}
          data={[images.shopBrand1,images.shopBrand2,images.shopBrand3,images.shopBrand4,images.shopBrand5,images.shopBrand6]}
          renderItem={({item,index}) => {

            return(
              <Image
              source={item}
              style={[localStyles.shopBrand,]}
              resizeMode="contain"
            />
            )
          }}
          keyExtractor={(item, index) => index?.toString()}
          numColumns={3}
          
           />

          <TouchableOpacity style={localStyles.viewButtonWrapper} >
            <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', gap: responsiveWidth(2) }} >
              <Text style={localStyles.viewButtonText} >View All</Text>
              <GreaterThanIcon />
            </View>
          </TouchableOpacity>
        </View>

        {/* <SubHeader title={'Save Big With Combos'} isViewHide={true} style={{marginTop:responsiveHeight(4)}} /> */}


        <SellingProduct title={'Save Big With Combos'} data={saveBigData} bestSeller={true} />


        <SubHeader title={'Value Deals Under'} isViewHide={false} />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: responsiveWidth(8), marginVertical: responsiveHeight(2) }} >

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



        </View>


        <SellingProduct title={'Recommended For You'} data={saveBigData} bestSeller={true} />

        <TouchableOpacity style={[localStyles.bannerContaienr, { marginVertical: responsiveHeight(1) }]}>
          <Image
            source={images.exclusiveTherapyImage}
            style={localStyles.bannerImageStyle}
            resizeMode="cover"
          />
        </TouchableOpacity>
        
          <SellingProduct title={'Top Ayurveda Product'} data={saveBigData} bestSeller={true} />
  
          <SellingProduct title={'Sushain Products '} data={sushainProductData} bestSeller={false}  />

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
    marginTop: responsiveHeight(3),


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
    marginBottom: responsiveHeight(8)
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
    ...styles.mt10
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
  cartBtnStyle: {
    ...styles.pl5,
    ...styles.pv10,
  },
  inputContainerStyle: {
    ...typography.fontSizes.f10,
    ...typography.fontWeights.SemiBold,
    flex:1,
    marginHorizontal:responsiveWidth(2.5),
    height:responsiveHeight(5),
    borderWidth:1,
    borderRadius:responsiveWidth(1.5),
    borderColor: colors.gray4,
    ...styles.pl10

  },
});
