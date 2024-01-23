import {Image, Linking, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {memo, useCallback, useState} from 'react';
import Carousel, {Pagination} from 'react-native-snap-carousel';

// local imports
import {colors, styles} from '../../themes';
import {
  deviceWidth,
  getSortedArray,
  moderateScale,
} from '../../common/constants';
import {Banner} from '../../types/Types';
import {BASE_IMG_NEW_PATH} from '../../api/constant';

type Props = {
  item: Banner;
  onPressItem: (item: Banner) => void;
};

const ImageCarousel = ({item, onPressItem}: Props) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onPressItem(item);
      }}
      style={localStyles.imgContainer}>
      <Image
        source={{uri: BASE_IMG_NEW_PATH + item.img}}
        resizeMode="contain"
        style={localStyles.imgStyle}
      />
    </TouchableOpacity>
  );
};

const BannerList = ({bannerData}: any) => {
  const [index, setIndex] = useState(0);

  const onPressItem = useCallback((item: Banner) => {
    Linking.openURL(item?.link_1);
  }, []);

  const imageCarousel = useCallback(
    ({item}: {item: Banner}) => {
      return <ImageCarousel item={item} onPressItem={onPressItem} />;
    },
    [onPressItem],
  );

  return (
    <View style={localStyles.root}>
      <Carousel
        data={getSortedArray(bannerData, 'order_no')}
        renderItem={imageCarousel}
        sliderWidth={deviceWidth - 30}
        itemWidth={deviceWidth - 30}
        onSnapToItem={index => setIndex(index)}
        contentContainerStyle={styles.center}
        autoplay={true}
        loop={true}
      />
      <View style={[styles.justifyCenter]}>
        <Pagination
          dotsLength={bannerData?.length}
          activeDotIndex={index}
          dotStyle={[
            localStyles.dotStyle,
            {
              backgroundColor: colors.primary,
            },
          ]}
          inactiveDotStyle={[
            localStyles.dotStyle,
            {
              backgroundColor: colors.dotColor,
            },
          ]}
          inactiveDotOpacity={1}
          inactiveDotScale={1}
          dotContainerStyle={styles.mh5}
          containerStyle={localStyles.paginationContainerStyle}
        />
      </View>
    </View>
  );
};

export default memo(BannerList);

const localStyles = StyleSheet.create({
  root: {
    ...styles.mt10,
    ...styles.center,
  },
  imgStyle: {
    width: '100%',
    height: moderateScale(134),
  },
  dotStyle: {
    height: moderateScale(8),
    width: moderateScale(8),
    borderRadius: moderateScale(4),
  },
  paginationContainerStyle: {
    ...styles.ph10,
    ...styles.pv10,
    ...styles.mt10,
  },
  imgContainer: {
    ...styles.center,
    borderRadius: moderateScale(10),
  },
});
