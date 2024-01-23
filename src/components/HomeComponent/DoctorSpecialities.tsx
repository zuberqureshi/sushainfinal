import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {memo, useCallback, useEffect, useMemo, useState} from 'react';
import {FlashList} from '@shopify/flash-list';

// local imports
import SubHeader from '../common/CommonComponent/SubHeader';
import strings from '../../i18n/strings';
import {DoctorListAPI, DoctorSpecListAPI} from '../../api/homeApis';
import {DoctorSpecialityListData} from '../../types/Types';
import CText from '../common/CText';
import {colors, styles} from '../../themes';
import {BASE_IMG_NEW_PATH} from '../../api/constant';
import {getHeight, moderateScale} from '../../common/constants';
import {ThumbIcon} from '../../assets/svgs';
import images from '../../assets/images';
import moment from 'moment';

const getYear = new Date().getFullYear();

const RenderDoctorCard = ({item}: any) => {
  return (
    <TouchableOpacity style={localStyles.doctorCardStyle}>
      <Image
        source={{
          uri: BASE_IMG_NEW_PATH + item?.photo,
        }}
        style={localStyles.doctorImgStyle}
      />
      <CText
        type="s10"
        style={styles.mv5}
        align="center"
        numberOfLines={1}
        color={colors.textColor1}>
        {item?.name}
      </CText>
      <View style={localStyles.doctorSpeclistTextStyle}>
        <CText
          type="s8"
          align="center"
          numberOfLines={2}
          color={colors.textColor1}>
          {item?.services_offered}
        </CText>
      </View>
      <View style={styles.rowSpaceBetween}>
        <View style={styles.rowCenter}>
          <ThumbIcon />
          <CText type="m8" style={styles.ml5} color={colors.black}>
            {item?.ranking_value}
            {'%'}
          </CText>
        </View>
        <View style={styles.rowCenter}>
          <CText type="s8" style={styles.mr5} color={colors.green1}>
            EXP
          </CText>
          <CText type="m8" color={colors.black}>
            {getYear - parseInt(moment(item?.experience).format('YYYY'))}
          </CText>
        </View>
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
        data={resultValue?.slice(0, 6)}
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
    index,
    onPressTab,
    selectedTabValue,
  }: {
    item: DoctorSpecialityListData;
    index: number;
    onPressTab: ({id, specType}: any) => void;
    selectedTabValue: number;
  }) => {
    return (
      <View style={localStyles.mainContaienr}>
        <TouchableOpacity
          onPress={() => onPressTab({id: item.id, specType: item.name})}
          style={localStyles.rootContaienr}>
          <View style={localStyles.imgOuterContainer}>
            <Image
              source={{uri: BASE_IMG_NEW_PATH + item.app_icon}}
              style={localStyles.imgStyle}
            />
          </View>
          <CText type="m12" align="center" style={styles.ph5} numberOfLines={1}>
            {item.name}
          </CText>
        </TouchableOpacity>
        {selectedTabValue == index && (
          <Image
            source={images.tabSelectImage}
            style={localStyles.tabSelectImageStyle}
          />
        )}
      </View>
    );
  },
);

export default function DoctorSpecialities() {
  const [resultData, setResultData] = useState<[DoctorSpecialityListData]>();
  const [selectedTab, setSelectedTab] = useState<any>(0);
  const [extraData, setExtraData] = useState<boolean>(false);
  const [specDoctorList, setSpecDoctorList] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      const data = (await DoctorSpecListAPI()) as [DoctorSpecialityListData];
      setResultData(data);
      const doctorList = (await DoctorListAPI(data?.[0].name)) as any;
      setSpecDoctorList(doctorList?.data[0].doctorList);
    };
    fetchData();
  }, []);

  useEffect(() => {
    setExtraData(!extraData);
  }, [selectedTab]);

  const onPressTab = useCallback(
    async ({id, specType}: any) => {
      const index = resultData?.findIndex(item => item.id == id);
      setSelectedTab(index);
      const doctorList = (await DoctorListAPI(specType)) as any;
      setSpecDoctorList(doctorList?.data[0].doctorList);
    },
    [selectedTab, specDoctorList],
  );

  const selectedTabValue = useMemo(() => {
    return selectedTab;
  }, [selectedTab]);

  const renderItem = ({item, index}: any) => {
    return (
      <RenderDSpecialities
        item={item}
        index={index}
        onPressTab={onPressTab}
        selectedTabValue={selectedTabValue}
      />
    );
  };

  const resultValue = useMemo(() => {
    return specDoctorList;
  }, [specDoctorList]);

  return (
    <View style={styles.flex}>
      <SubHeader title={strings.findAyurvedicDoctorSpecialities} />
      <FlatList
        data={resultData}
        renderItem={renderItem}
        horizontal
        extraData={selectedTab}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.ph20}
      />
      <RenderFooterComponent resultValue={resultValue} />
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
  imgOuterContainer: {
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
    backgroundColor: colors.lightPink,
    top: getHeight(-5),
  },
  doctorImgStyle: {
    height: moderateScale(42),
    width: moderateScale(42),
    borderRadius: moderateScale(21),
    borderColor: colors.primary,
    borderWidth: moderateScale(2),
    ...styles.selfCenter,
  },
  doctorSpeclistTextStyle: {
    height: getHeight(32),
  },
  doctorCardStyle: {
    backgroundColor: colors.white1,
    ...styles.p10,
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
  tabSelectImageStyle: {
    height: moderateScale(18),
    width: moderateScale(18),
    resizeMode: 'contain',
    tintColor: colors.lightPink,
  },
});
