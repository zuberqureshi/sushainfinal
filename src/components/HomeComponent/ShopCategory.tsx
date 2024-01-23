import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import React, {memo, useCallback, useEffect, useMemo, useState} from 'react';
import {FlashList} from '@shopify/flash-list';

// local imports
import SubHeader from '../common/CommonComponent/SubHeader';
import strings from '../../i18n/strings';
import {DoctorSpecialityListData} from '../../types/Types';
import CText from '../common/CText';
import {colors, styles} from '../../themes';
import {BASE_IMG_NEW_PATH, shopByategoryData} from '../../api/constant';
import {getHeight, moderateScale} from '../../common/constants';
import images from '../../assets/images';

const RenderDoctorCard = ({item}: any) => {
  return (
    <TouchableOpacity style={localStyles.illnessTypeStyle}>
      <Image
        source={{uri: BASE_IMG_NEW_PATH + item?.image}}
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

const RenderFooterComponent = memo(({resultValue}: any) => {
  return (
    <View style={localStyles.doctorListContaienr}>
      <TouchableOpacity style={localStyles.viewAllContaiener}>
        <CText type="s12" color={colors.success}>
          {strings.viewAll}
        </CText>
      </TouchableOpacity>
      <FlashList
        data={resultValue?.splice(0, 6)}
        renderItem={RenderDoctorCard}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        scrollEnabled={false}
        numColumns={3}
        estimatedItemSize={6}
        contentContainerStyle={styles.ph10}
      />
    </View>
  );
});

const RenderDSpecialities = memo(
  ({
    item,
    onPressTab,
    selectedTabValue,
  }: {
    item: DoctorSpecialityListData;
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
  },
);

export default function ShopCategory({shopCategaryData}: any) {
  const [resultData, setResultData] = useState<any>([]);
  const [selectedTab, setSelectedTab] = useState<any>(1);
  const [extraData, setExtraData] = useState<boolean>(false);

  useEffect(() => {
    !!shopCategaryData?.ayurvedicProduct &&
      setResultData([...shopCategaryData?.ayurvedicProduct]);
  }, [shopCategaryData]);

  useEffect(() => {
    setExtraData(!extraData);
  }, [selectedTab]);

  const onPressTab = useCallback(
    (id: number) => {
      setSelectedTab(id);
      switch (id) {
        case 1:
          setResultData([...shopCategaryData?.ayurvedicProduct]);
          break;
        case 2:
          setResultData([...shopCategaryData?.personalCare]);
          break;
        case 3:
          setResultData([...shopCategaryData?.homeopathy]);
          break;
        case 4:
          setResultData([...shopCategaryData?.immunityWellness]);
          break;
        default:
          setResultData([...shopCategaryData?.ayurvedicProduct]);
          break;
      }
    },
    [selectedTab, resultData],
  );

  const selectedTabValue = useMemo(() => {
    return selectedTab;
  }, [selectedTab]);

  const renderItem = ({item}: {item: DoctorSpecialityListData}) => {
    return (
      <RenderDSpecialities
        item={item}
        onPressTab={onPressTab}
        selectedTabValue={selectedTabValue}
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
        data={shopByategoryData}
        renderItem={renderItem}
        horizontal
        extraData={extraData}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.ph20}
        scrollEnabled={false}
      />
      {shopCategaryData && <RenderFooterComponent resultValue={resultValue} />}
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
    width: '100%',
    ...styles.pv10,
    ...styles.pb15,
    backgroundColor: colors.lightBlue2,
    top: getHeight(-5),
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
