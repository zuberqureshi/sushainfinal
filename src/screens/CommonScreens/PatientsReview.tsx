import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {FlashList} from '@shopify/flash-list';

// local imports
import CSafeAreaView from '../../components/common/CSafeAreaView';
import CHeader from '../../components/common/CHeader';
import strings from '../../i18n/strings';
import moment from 'moment';
import {colors, styles} from '../../themes';
import CText from '../../components/common/CText';
import RatingComponent from '../../components/HomeComponent/RatingComponent';
import {TIME_FORMATE, TIME_YMD, moderateScale} from '../../common/constants';
import SubHeader from '../../components/common/CommonComponent/SubHeader';
import {BASE_IMG_NEW_PATH} from '../../api/constant';

interface Props {
  route: any;
  navigation: any;
}

const RenderReviewItem = ({item}: any) => {
  const formattedDate = moment(item?.time, TIME_FORMATE).format(TIME_YMD);
  return (
    <View style={localStyles.reviewContainerStyle}>
      <View style={styles.rowSpaceBetween}>
        <View style={styles.rowCenter}>
          <View style={localStyles.reviewImgContainer}>
            <CText type="b14" numberOfLines={1} color={colors.white}>
              {item?.cust_name?.[0].toUpperCase()}
            </CText>
          </View>
          <View style={styles.flex}>
            <View style={styles.rowSpaceBetween}>
              <CText type="s12" numberOfLines={1} style={styles.flex}>
                {item?.cust_name}
              </CText>
              <CText type="r10" style={styles.pl10} numberOfLines={1}>
                {moment(formattedDate, TIME_YMD).fromNow()}
              </CText>
            </View>
            <RatingComponent
              star={item?.rating}
              style={localStyles.straStyle}
            />
            <CText type="r10" numberOfLines={1} style={styles.flex}>
              {item?.heading}
            </CText>
          </View>
        </View>
      </View>
      <CText type="r10" numberOfLines={4} style={styles.mt15}>
        {item?.des}
      </CText>
    </View>
  );
};

const RenderHeaderComponent = ({data}: any) => {
  return (
    <View>
      <View style={localStyles.rootContainer}>
        <View style={styles.center}>
          <Image
            source={{uri: BASE_IMG_NEW_PATH + data?.doctorImage}}
            style={localStyles.doctorImgStyle}
          />
          <CText type="s10" style={styles.mt5} numberOfLines={1}>
            {data?.doctorName}
          </CText>
        </View>
        <View style={styles.center}>
          <CText type="r12" numberOfLines={1}>
            {strings.overallRating}
          </CText>
          <CText type="b30" numberOfLines={1} style={styles.mt5}>
            {data?.doctorRating}
          </CText>
          <RatingComponent
            star={data?.doctorRating}
            style={localStyles.straStyle}
          />
          <CText type="s12" numberOfLines={1}>
            {data?.doctorReview}
          </CText>
        </View>
      </View>
      <SubHeader title={strings.patientsReview} isViewHide={false} />
    </View>
  );
};

export default function PatientsReview({route, navigation}: Props) {
  const data = route?.params?.data;
  return (
    <CSafeAreaView>
      <CHeader title={strings.patientsReviews} />
      <FlashList
        data={data?.reviewData}
        renderItem={RenderReviewItem}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        estimatedItemSize={20}
        ListHeaderComponent={<RenderHeaderComponent data={data} />}
      />
    </CSafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  rootContainer: {
    backgroundColor: colors.lightYellow,
    ...styles.p10,
    ...styles.mh20,
    ...styles.mv15,
    borderRadius: moderateScale(10),
    ...styles.shadowStyle,
    ...styles.rowSpaceAround,
  },
  doctorImgStyle: {
    height: moderateScale(80),
    width: moderateScale(120),
    resizeMode: 'cover',
    borderRadius: moderateScale(10),
    borderWidth: moderateScale(1),
    borderColor: colors.primary,
  },
  reviewContainerStyle: {
    ...styles.mh20,
    ...styles.p10,
    ...styles.mv10,
    ...styles.flex,
    borderWidth: moderateScale(1),
    borderColor: colors.bColor2,
    borderRadius: moderateScale(5),
  },
  reviewImgContainer: {
    height: moderateScale(40),
    width: moderateScale(40),
    borderRadius: moderateScale(20),
    backgroundColor: colors.primary,
    ...styles.center,
    ...styles.mr10,
  },
  reviewDividerStyle: {
    height: moderateScale(1),
    backgroundColor: colors.bColor2,
    ...styles.mv10,
  },
  straStyle: {
    height: moderateScale(10),
    width: moderateScale(10),
    marginHorizontal: moderateScale(1),
    ...styles.mv5,
  },
});
