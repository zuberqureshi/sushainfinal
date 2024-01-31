import {Image, Linking, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {FlashList} from '@shopify/flash-list';

// local imports
import {colors, styles} from '../../themes';
import {getHeight, moderateScale} from '../../common/constants';
import CText from '../common/CText';
import SubHeader from '../common/CommonComponent/SubHeader';
import {BrandIcon, DoctorIcon, ReviewsIcon, UserIcon} from '../../assets/svgs';
import { API_BASE_URL, API_IMAGE_BASE_URL } from '@env'

const BottomContainer = ({icon, title}: any) => {
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

const RenderFeturedComponent = ({item, onPress}:any) => {
  
  return (
    <TouchableOpacity
      onPress={() => onPress(item?.url)}
      style={localStyles.featuredImageContainer}>
      <Image
        source={{uri:`${API_IMAGE_BASE_URL}${item?.img}`}}
        style={localStyles.featuredImageStyle}
      />

    </TouchableOpacity>
  );
};
export default function FeaturedIn({data}: any) {
  
  const onPress = (item: any) => {
    // return Linking.openURL(item);
  };

  const RenderItem = ({item, index}: any) => {
    return <RenderFeturedComponent item={item} onPress={onPress} />;
  };

  return (
    <View>
      <View style={localStyles.root}>
        <SubHeader title="Featured In" isViewHide={false} style={styles.mv15} />
        {!!data?.length && (
          <View style={localStyles.flatlishContainer}>
            <FlashList
              data={data}
              renderItem={RenderItem}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              estimatedItemSize={10}
              contentContainerStyle={styles.ph20}
            />
          </View>
        )}
      </View>
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
    </View>
  );
}

const localStyles = StyleSheet.create({
  root: {
    borderTopWidth: moderateScale(1),
    borderColor: colors.bColor2,
    borderBottomWidth: moderateScale(1),
    borderBottomColor: colors.bColor2,
    ...styles.mv20,
  },
  flatlishContainer: {
    ...styles.pv15,
    ...styles.mb20,
    backgroundColor: colors.green2,
  },
  featuredImageStyle: {
    width: moderateScale(80),
    height: getHeight(40),
    resizeMode: 'contain',
  },
  featuredImageContainer: {
    width: moderateScale(91),
    height: getHeight(45),
    backgroundColor: colors.white3,
    borderRadius: moderateScale(5),
    ...styles.center,
    ...styles.mr10,
  },
  bottomContainer: {
    backgroundColor: colors.lightBlue3,
    ...styles.pv20,
    ...styles.mh15,
    borderRadius: moderateScale(23),
    gap: moderateScale(15),
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
