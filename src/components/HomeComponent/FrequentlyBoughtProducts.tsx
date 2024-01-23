import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {FlashList} from '@shopify/flash-list';

// local imports
import strings from '../../i18n/strings';
import SubHeader from '../common/CommonComponent/SubHeader';
import {getHeight, moderateScale} from '../../common/constants';
import {colors, styles} from '../../themes';
import images from '../../assets/images';
import CText from '../common/CText';

export default function FrequentlyBoughtProducts() {
  const renderItem = ({item, index}: any) => {
    return (
      <TouchableOpacity style={localStyles.rootContainer}>
        <Image
          source={images.ayurvedicImage}
          style={localStyles.productImageStyle}
        />
        <View style={localStyles.bottomContaienr}>
          <CText
            type="r10"
            style={localStyles.productTextStyle}
            numberOfLines={2}
            color={colors.black}>
            Sensational Skin Care Belly Button Oil
          </CText>
          <View style={localStyles.priceContaienr}>
            <CText type="s10" numberOfLines={2} color={colors.black}>
              ₹ 879
            </CText>
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
      <SubHeader title={strings.frequentlyBoughtProducts} />
      <FlashList
        data={[1, 2, 3, 4, 5, 6]}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        estimatedItemSize={10}
        contentContainerStyle={styles.ph20}
      />
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
    width: '100%',
    resizeMode: 'contain',
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
  upperLineStyle: {
    height: moderateScale(0.5),
    backgroundColor: colors.black,
    bottom: moderateScale(5),
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
});
