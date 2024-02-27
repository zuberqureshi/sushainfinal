import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { FlashList } from '@shopify/flash-list';

// local imports
import SubHeader from '../common/CommonComponent/SubHeader';
import strings from '../../i18n/strings';
import { DoctorSpecialityListData } from '../../types/Types';
import CText from '../common/CText';
import { colors, styles } from '../../themes';
import { Api_Image_Base_Url, getHeight, moderateScale } from '../../common/constants';
import images from '../../assets/images';
import useGetHomeData from '../../hooks/home/get-home-data';
import { Box, Spinner } from '@gluestack-ui/themed';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const RenderDoctorCard = ({ item }: any) => {
  return (
    <TouchableOpacity style={localStyles.illnessTypeStyle}>
      <Image
        source={{ uri: `${Api_Image_Base_Url}${item.app_icon}` }}
        style={localStyles.doctorImgStyle}
      />
      <View style={localStyles.illnessTextStyle}>
        <CText type="m10" numberOfLines={1} color={colors.white}>
          {item?.name}
        </CText>
      </View>
    </TouchableOpacity>
  );
};

const RenderFooterComponent = ({ resultValue, isLoading }: any) => {

  return (
    <View style={localStyles.doctorListContaienr}>
      <TouchableOpacity style={localStyles.viewAllContaiener}>
        <CText type="s12" color={colors.success}>
          {strings.viewAll}
        </CText>
      </TouchableOpacity>
      <View style={{ height: '90%', justifyContent:'center', }}  >
        { resultValue?.length >=1 ? <FlashList
          data={resultValue?.slice(0, 6)}
          renderItem={RenderDoctorCard}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          scrollEnabled={false}
          numColumns={3}
          estimatedItemSize={10}
          contentContainerStyle={styles.ph10}
        /> :
          <Box alignSelf='center' >
            <Spinner size={'large'} color={colors.primary} />
          </Box>}
      </View>
    </View>
  );
}

const RenderDSpecialities = ({
  item,
  onPressTab,
  selectedTabValue,
}: {
  item:any;
  onPressTab: (id: number) => void;
  selectedTabValue: number;
}) => {
  return (
    <View style={localStyles.mainContaienr}>
      <TouchableOpacity
        onPress={() => onPressTab(item?.id)}
        style={localStyles.rootContaienr}>
        <View style={localStyles.imgOuterContaiener}>
          <Image source={item?.image} style={localStyles.imgStyle} />
        </View>
        <View style={localStyles.titleContainer}>
          <CText
            type="m12"
            align="center"
            style={styles.ph5}
            numberOfLines={2}>
            {item?.title}
          </CText>
        </View>
      </TouchableOpacity>
      {selectedTabValue === item?.id && (
        <Image
          source={images.tabSelectImage}
          style={localStyles.tabSelectImageStyle}
        />
      )}
    </View>
  );
}


export default function ShopCategory({ shopCategaryData, }: any) {
 

  

  const [resultData, setResultData] = useState<any>([]);
  const [selectedTab, setSelectedTab] = useState<any>(1);
  const [extraData, setExtraData] = useState<any>([]);
  const [homeopathyData, setHomeopathyDataData] = useState<any>([]);

  const { data: categaryData, isLoading: homePageCategoryLoading } = useGetHomeData()
  

  useEffect(() => {
    if (categaryData?.data && (homePageCategoryLoading == false)) {
      setResultData(categaryData?.data?.result[0]?.medicineAyurvedicCategoryList)
    }

  }, [homePageCategoryLoading]);


  const onPressTab = async (id: number) => {

    await setSelectedTab(id);
    switch (id) {
      case 1:
        setResultData(categaryData?.data?.result[0]?.medicineAyurvedicCategoryList);
        break;
      case 2:
        setResultData(categaryData?.data?.result[0]?.lifestyleCategoryList);
        break;
      case 3:
        setResultData(categaryData?.data?.result[0]?.medicineHomeopathyCategoryList);
        break;
      case 4:
        setResultData(categaryData?.data?.result[0]?.medicineAyurvedicCategoryList);
        break;
      default:
        setResultData(categaryData?.data?.result[0]?.lifestyleCategoryList);
        break;
    }
  }


  const renderItem = ({ item }: { item: DoctorSpecialityListData }) => {
    return (
      <RenderDSpecialities
        item={item}
        onPressTab={onPressTab}
        selectedTabValue={selectedTab}
      />
    );
  };

  const resultValue = useMemo(() => {
    return resultData;
  }, [selectedTab, resultData]);

  return (
    <View style={styles.flex}>
      <SubHeader title={strings.shopByCategory} />
      <FlatList
        data={shopCategaryData}
        renderItem={renderItem}
        horizontal
        // extraData={extraData}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.ph20}
        scrollEnabled={false}
      />
      <RenderFooterComponent resultValue={resultData} isLoading={homePageCategoryLoading} />

    </View>
  );
}

const localStyles = StyleSheet.create({
  imgStyle: {
    width: moderateScale(50),
    height: moderateScale(50),
    resizeMode: 'contain',
  },
  rootContaienr: {
    width: moderateScale(84),
    ...styles.center,
  },
  imgOuterContaiener: {
    width: moderateScale(62),
    height: moderateScale(62),
    borderRadius: moderateScale(31),
    ...styles.mv10,
    ...styles.center,
    backgroundColor: colors.lightBlue,
  },
  mainContaienr: {
    ...styles.itemsCenter,
  },
  viewAllContaiener: {
    ...styles.justifyEnd,
    ...styles.itemsEnd,
    ...styles.mv10,
    ...styles.mh20,
  },
  doctorListContaienr: {
    width: '97%',
    ...styles.pv5,
    ...styles.pb15,
    backgroundColor: colors.lightBlue2,
    top: getHeight(-5),
    height: responsiveHeight(40),
    alignSelf: 'center',
    borderRadius: responsiveWidth(3)
  },
  doctorImgStyle: {
    height: getHeight(93),
    width: moderateScale(95),
    ...styles.selfCenter,
    resizeMode: 'contain',
  },
  illnessTypeStyle: {
    backgroundColor: colors.white1,
    margin: '5%',
    ...styles.justifyCenter,
    ...styles.selfStart,
    ...styles.selfCenter,
    borderRadius: moderateScale(15),
    width: '90%',
    shadowColor: colors.black,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    overflow: 'hidden'
  },
  illnessTextStyle: {
    backgroundColor: colors.primary,
    width: '100%',
    ...styles.center,
    ...styles.p5,
    borderBottomLeftRadius: moderateScale(15),
    borderBottomRightRadius: moderateScale(15),
  },
  tabSelectImageStyle: {
    height: moderateScale(18),
    width: moderateScale(18),
    resizeMode: 'contain',
  },
  titleContainer: {
    height: moderateScale(32),
  },
});
