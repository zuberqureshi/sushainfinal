import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
import React from 'react';
import { colors, styles } from '../../themes';
import CHeader from '../../components/common/CHeader';

import images from '../../assets/images';
import typography from '../../themes/typography';
import { responsiveFontSize, responsiveHeight, responsiveWidth, } from 'react-native-responsive-dimensions';
import { moderateScale } from '../../common/constants';
import { DigitalPrecereption, FreeFollowUp, MedicineBottle, CovidVirusResearch, UserIcon, DoctorIcon, BrandIcon, ReviewsIcon, GreaterThanIcon, } from '../../assets/svgs';
import CText from '../../components/common/CText';
//   import DoctorCategoryComponent from '../../components/DoctorComponent/DoctorCategoryComponent';
import MedicinesConcerns from '../../components/Medicines/MedicinesConcerns';
import SellingProduct from '../../components/Medicines/SellingProduct';
import SubHeader from '../../components/common/CommonComponent/SubHeader';
// import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { medicineBestSellingData, saveBigData, sushainProductData } from '../../api/constant';
import strings from '../../i18n/strings';
import SimilarProduct from '../../components/Medicines/SimilarProduct';
import SearchWithLikeComponent from '../FindDoctor/SearchWithLikeComponent';



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

const Medicines = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <CHeader
        title={strings.medicines}
      //   rightIcon={<RightText />}
      />

      <ScrollView
        style={{ marginBottom: responsiveHeight(10) }}
        showsVerticalScrollIndicator={false}>

        <SearchWithLikeComponent />

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

        <MedicinesConcerns title={strings.medicinesbyHealthConcerns} />

        <SellingProduct title={strings.bestSelling} data={medicineBestSellingData} bestSeller={false} />

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

        <View style={{ alignSelf: 'center', marginBottom: responsiveHeight(3) }} >
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', ...styles.center, ...styles.mh20, gap: responsiveWidth(6), marginTop: responsiveHeight(2) }} >
            <Image
              source={images.shopBrand1}
              style={localStyles.shopBrand}
              resizeMode="contain"
            />

            <Image
              source={images.shopBrand2}
              style={localStyles.shopBrand}
              resizeMode="contain"
            />

            <Image
              source={images.shopBrand3}
              style={localStyles.shopBrand}
              resizeMode="contain"
            />

            <Image
              source={images.shopBrand4}
              style={localStyles.shopBrand}
              resizeMode="contain"
            />

            <Image
              source={images.shopBrand5}
              style={localStyles.shopBrand}
              resizeMode="contain"
            />

            <Image
              source={images.shopBrand6}
              style={localStyles.shopBrand}
              resizeMode="contain"
            />


          </View>

          <TouchableOpacity style={localStyles.viewButtonWrapper} >
            <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', gap: responsiveWidth(2) }} >
              <Text style={localStyles.viewButtonText} >View All</Text>
              <GreaterThanIcon />
            </View>
          </TouchableOpacity>
        </View>

        <SubHeader title={'Save Big With Combos'} isViewHide={true} style={{marginTop:responsiveHeight(4)}} />


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
    </SafeAreaView>
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
});
