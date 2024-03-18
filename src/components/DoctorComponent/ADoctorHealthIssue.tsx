import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import React, {memo, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

// local imports
import SubHeader from '../common/CommonComponent/SubHeader';
import strings from '../../i18n/strings';
import {DoctorSpecialityListData} from '../../types/Types';
import CText from '../common/CText';
import {colors, styles} from '../../themes';
import {BASE_IMG_NEW_PATH} from '../../api/constant';
import {API_IMAGE_BASE_URL, getHeight, moderateScale} from '../../common/constants';
import images from '../../assets/images';
import CButton from '../common/CButton';
import {StackNav} from '../../navigation/NavigationKeys';
// import {DoctorSpecListAPI} from '../../api/homeApis';
import { Spinner } from '@gluestack-ui/themed';

const RenderDSpecialities = memo(({item, onPressDoctorSpeciality}: any) => {
  
  return (
    <View style={localStyles.mainContaienr}>
      <TouchableOpacity
        onPress={() => onPressDoctorSpeciality(item?.name)}
        style={localStyles.rootContaienr}>
        <View style={localStyles.imgOuterContainer}>
          <Image
            source={{ uri: `${API_IMAGE_BASE_URL}${item?.app_icon}` }}
            style={localStyles.imgStyle}
          />
        </View>
        <View style={localStyles.titleContainer}>
          <CText type="m12" align="center" style={styles.ph5} numberOfLines={2}>
            {item?.name}
          </CText>
        </View>
      </TouchableOpacity>
    </View>
  );
});

export default function ADoctorHealthIssue({data}:any) {
  const navigation = useNavigation();
  const [resultData, setResultData] = useState<[DoctorSpecialityListData]>();
// console.log(data[0]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = (await DoctorSpecListAPI()) as [DoctorSpecialityListData];
  //     setResultData(data);
  //   };
  //   fetchData();
  // }, []);
  const renderItem = ({item}: {item: DoctorSpecialityListData}) => {
    return (
      <RenderDSpecialities
        item={item}
        onPressDoctorSpeciality={onPressDoctorSpeciality}
      />
    );
  };

  const onPressDoctorSpeciality = (itm: any) => {
    navigation.navigate(StackNav.CategoryDoctorListDrawer, {itm});
  };

  return (
    <View style={styles.flex}>
      <SubHeader
        title={strings.ayurvedicDoctorsHealthIssues}
        isViewHide={false}
      />
    { data?.length >=1 ?  <FlatList
        data={data?.slice(0, 16)}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.ph20}
        numColumns={4}
        scrollEnabled={false}
      /> : <Spinner size={'small'} color={colors.primary} />}
      <CButton
        title={strings.viewAllSymptoms}
        onPress={() => {}}
        containerStyle={localStyles.viewAllBtnStyle}
        bgColor={colors.white}
        color={colors.black}
      />
      <TouchableOpacity style={localStyles.bannerContaienr}>
        <Image
          source={images.exclusiveTherapyImage}
          style={localStyles.bannerImageStyle}
          resizeMode="cover"
        />
      </TouchableOpacity>
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
  titleContainer: {
    height: moderateScale(34),
  },
  viewAllBtnStyle: {
    ...styles.mv10,
    ...styles.mh20,
    borderWidth: moderateScale(1),
    borderColor: colors.black2,
    borderRadius: moderateScale(5),
  },
  bannerImageStyle: {
    width: '100%',
    height: moderateScale(140),
    ...styles.mv10,
    borderRadius: moderateScale(10),
  },
  bannerContaienr: {
    ...styles.center,
    ...styles.mh20,
  },
});
