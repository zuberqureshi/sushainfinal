import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {FlashList} from '@shopify/flash-list';

// local imports
import SubHeader from '../common/CommonComponent/SubHeader';
import strings from '../../i18n/strings';
import {colors, styles} from '../../themes';
import {getHeight, moderateScale} from '../../common/constants';
import CText from '../common/CText';
import RatingComponent from './RatingComponent';

const RenderItem = ({item, index}: any) => {
  return (
    <TouchableOpacity style={localStyles.rootContainer}>
      <CText type="r12" style={styles.mb5} color={colors.black}>
        {item?.user_name}
      </CText>
      <RatingComponent star={item?.rating} />
      <View style={localStyles.decStyle}>
        <CText type="r8" align="center" numberOfLines={5} color={colors.black}>
          {item?.des}
        </CText>
      </View>
    </TouchableOpacity>
  );
};

export default function HonestReviews({reviewData}: any) {
  return (
    <View>
      <SubHeader title={strings.honestReviews} isViewHide={false} />
      {!!reviewData && (
        <FlashList
          data={reviewData}
          renderItem={RenderItem}
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
    ...styles.p15,
    ...styles.mr10,
    ...styles.justifyEvenly,
    ...styles.itemsCenter,
    borderWidth: moderateScale(1),
    borderColor: colors.bColor2,
    width: moderateScale(176),
    borderRadius: moderateScale(10),
  },
  decStyle: {
    height: getHeight(80),
    ...styles.pt10,
  },
});
