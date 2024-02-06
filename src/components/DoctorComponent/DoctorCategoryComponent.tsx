import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {FlashList} from '@shopify/flash-list';

//  local imports
import SubHeader from '../common/CommonComponent/SubHeader';
import {shopByategoryData} from '../../api/constant';
import {colors, styles} from '../../themes';
import {DoctorSpecialityListData} from '../../types/Types';
import CText from '../common/CText';
import {moderateScale} from '../../common/constants';
import {API_BASE_URL,API_IMAGE_BASE_URL} from '@env'
import { useNavigation } from '@react-navigation/native';
import { StackNav } from '../../navigation/NavigationKeys';

interface general_sub_category {
  id: number;
  name: string;
  specilization_id: number;
  specilization_name: string;
  app_general_cat_id: number;
  app_general_cat_name: string;
  img: string;
  time: string;
}

const RenderDSpecialities = ({item}: {item: general_sub_category}) => {
  const navigation = useNavigation();
  
  return (
    <TouchableOpacity onPress={()=>{ navigation.navigate(StackNav.CategoryDoctorList, {itm:item?.specilization_name });}}  style={localStyles.rootContaienr}>
      <View style={localStyles.imgOuterContaiener}>
        <Image source={{uri : `${API_IMAGE_BASE_URL}${item?.img}`}} style={localStyles.imgStyle} />
      </View>
      <View style={localStyles.titleContainer}>
        <CText type="m12" align="center" style={styles.ph5} numberOfLines={2}>
          {item?.name}
        </CText>
      </View>
    </TouchableOpacity>
  );
};

export default function DoctorCategoryComponent({title,data}: {title: string,data:any}) {
  const renderItem = ({item}: {item: general_sub_category}) => {
    return <RenderDSpecialities item={item} />;
  };

  return (
    <View>
      <SubHeader title={title} isViewHide={false} />
      <FlashList
        data={data}
        renderItem={renderItem}
        horizontal
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.ph20}
        showsHorizontalScrollIndicator={false}
        // justifyContent="space-between"
        estimatedItemSize={200}
      />
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
  titleContainer: {
    height: moderateScale(34),
  },
});
