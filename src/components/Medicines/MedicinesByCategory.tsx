import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList, Text
} from 'react-native';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';


// local imports

import { DoctorSpecialityListData } from '../../types/Types';
import CText from '../common/CText';
import { colors, styles } from '../../themes';
import { BASE_IMG_NEW_PATH, medicinesCategoryOptions, shopByategoryData } from '../../api/constant';
import { API_IMAGE_BASE_URL, getHeight, moderateScale } from '../../common/constants';
import images from '../../assets/images';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import typography from '../../themes/typography'
import { Box, Spinner } from '@gluestack-ui/themed';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';






export default function MedicinesByCategory({ data, loading, selectedProductSubCategory, setSelectedProductSubCtegory }: any) {



  const RenderDSpecialities = memo(
    ({
      item,


    }: {
      item: any;

    }) => {
      return (
        <View style={localStyles.mainContaienr}>
          <TouchableOpacity
            onPress={() => { setSelectedProductSubCtegory(item?.name) }}
            style={localStyles.rootContaienr}>
            <View style={[localStyles.imgOuterContaiener, { backgroundColor: item?.id === 1 ? colors.lightBlue : '#D9D9D94D', }]}>
              {item?.img ? <Image source={{ uri: `${API_IMAGE_BASE_URL}${item?.img}` }} style={localStyles.imgStyle} /> : <Text style={{ color: colors.primary, ...typography.fontSizes.f18, ...typography.fontWeights.SemiBold, }}>All</Text>}
            </View>
            <View style={localStyles.titleContainer}>
              {item?.img && <CText
                type="m12"
                align="center"

                style={{ ...styles.ph5, width: responsiveWidth(15) }}
                numberOfLines={1}>
                {item?.name}
              </CText>}
            </View>
          </TouchableOpacity>

        </View>
      );
    },
  );


  const renderItem = ({ item }: { item: DoctorSpecialityListData }) => {
    return (
      <RenderDSpecialities
        item={item}


      />
    );
  };


  return (
    <View style={{ marginVertical: responsiveHeight(0.5) }}>

      {data?.length > 0 ? <FlatList
        data={data}
        renderItem={renderItem}
        horizontal

        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ ...styles.ph1, }}
       
        // scrollEnabled={false}
        style={{ alignSelf: 'flex-start' }}

      /> : <FlatList
        data={['1', '2', '3','4','5','6']}
        renderItem={({ item, index }) => {
          return (
            <SkeletonPlaceholder speed={1200} >
              <View style={{alignItems:'center'}}>
                <View style={localStyles.imgOuterContaiener}>

                </View>
                <View style={{ width: responsiveWidth(12), height: responsiveHeight(1.5) }} ></View>
              </View>


            </SkeletonPlaceholder>

          )
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ ...styles.ph1, gap:responsiveWidth(1.5)}}
        // scrollEnabled={false}
        style={{ alignSelf: 'flex-start',paddingHorizontal:responsiveWidth(3.5) }}

      />}

    </View>
  );
}

const localStyles = StyleSheet.create({
  imgStyle: {
    width: moderateScale(40),
    height: moderateScale(40),
    resizeMode: 'contain',
  },
  rootContaienr: {
    width: moderateScale(70),
    ...styles.center,

  },
  imgOuterContaiener: {
    width: moderateScale(55),
    height: moderateScale(55),
    borderRadius: moderateScale(27),
    ...styles.mv10,
    ...styles.center,

  },
  mainContaienr: {
    ...styles.itemsCenter,

  },





});
