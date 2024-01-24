import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {FlashList} from '@shopify/flash-list';

// local imports
import strings from '../../i18n/strings';
import SubHeader from '../common/CommonComponent/SubHeader';
import {getHeight, moderateScale} from '../../common/constants';
import {colors, styles} from '../../themes';
import images from '../../assets/images';
import CText from '../common/CText';
import {BASE_IMG_NEW_PATH} from '../../api/constant';

export default function AyurvedicProducts({ayurvedicData}: any) {
  console.log('ayurvedicData', ayurvedicData);
  const renderItem = ({item, index}: any) => {
    return (
      <TouchableOpacity style={localStyles.rootContainer}>
        <View>
          <Image
            source={{uri: BASE_IMG_NEW_PATH + item?.images}}
            style={localStyles.productImageStyle}
          />
          <ImageBackground
            source={images.bookmarkImage}
            style={localStyles.bookmarkImageStyle}>
            <CText type="m10" style={styles.mt5} color={colors.white}>
              10%
            </CText>
          </ImageBackground>
        </View>
        <View style={localStyles.bottomContaienr}>
          <CText
            type="r10"
            style={localStyles.productTextStyle}
            numberOfLines={2}
            color={colors.black}>
            {item?.seo_meta_title}
          </CText>
          <View style={localStyles.priceContaienr}>
            <CText type="s10" numberOfLines={2} color={colors.black}>
              {item?.final_price}
            </CText>
            <View>
              <CText
                type="r8"
                numberOfLines={2}
                style={localStyles.dummyPriceContainer}
                color={colors.black}>
                {item?.retailer_price}
              </CText>
            </View>
          </View>
          <TouchableOpacity style={localStyles.addBtnContaiener}>
            <CText type="m10" color={colors.success}>
              ADD
            </CText>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <SubHeader title={strings.topAyurvedicProducts} />
      {!!ayurvedicData && (
        <FlashList
          data={ayurvedicData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          estimatedItemSize={10}
          contentContainerStyle={styles.ph20}
        />
      )}
    </View>
  );
}

const localStyles = StyleSheet.create({
  rootContainer: {
    borderWidth: moderateScale(1),
    borderColor: colors.bColor2,
    borderRadius: moderateScale(10),
    width: moderateScale(120),
    ...styles.mt10,
    ...styles.mb5,
    ...styles.mr10,
  },
  productImageStyle: {
    height: getHeight(75),
    width: '70%',
    resizeMode: 'contain',
    marginLeft: moderateScale(3),
    ...styles.mt5,
  },
  bookmarkImageStyle: {
    height: getHeight(38),
    width: moderateScale(28),
    position: 'absolute',
    resizeMode: 'contain',
    right: moderateScale(5),
    ...styles.itemsCenter,
  },
  bottomContaienr: {
    borderTopWidth: moderateScale(1),
    borderTopColor: colors.bColor2,
    ...styles.p5,
  },
  productTextStyle: {
    height: getHeight(32),
  },
  priceContaienr: {
    ...styles.flexRow,
    ...styles.itemsCenter,
  },
  addBtnContaiener: {
    height: getHeight(24),
    width: moderateScale(55),
    ...styles.center,
    ...styles.mt2,
    borderWidth: moderateScale(1),
    borderColor: colors.success,
    backgroundColor: colors.lightSuccess,
    borderRadius: moderateScale(6),
  },
  dummyPriceContainer: {
    textDecorationLine: 'line-through',
    ...styles.mh5,
  },
});
