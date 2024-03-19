import {Platform, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Carousel, {Pagination, ParallaxImage} from 'react-native-snap-carousel';

// local imports
import {colors, styles} from '../../themes';
import {API_IMAGE_BASE_URL, deviceWidth, getHeight, moderateScale} from '../../common/constants';


interface BannerData {
  id:number;
  img:string;
  link:string;
  name:string;
  type:string;

}[]

const ImageCarousel = ({data}:any) => {

  const [entries, setEntries] = useState([]);
  const [index, setIndex] = useState(0);

  // useEffect(() => {
  //   setEntries(ENTRIES1);
  // }, []);

//  console.log('ImageCarousel',API_IMAGE_BASE_URL+data[0].img);
  

  const renderItem = ({item, index}: any, parallaxProps: any) => {
    return (
      <View  style={localStyles.item}>
        <ParallaxImage
          source={{uri:`${API_IMAGE_BASE_URL}${item.img}`}}
          containerStyle={localStyles.imageContainer}
          style={localStyles.image}
          parallaxFactor={0.4}
          {...parallaxProps}
        />
      </View>
    );
  };

  return (
    <View style={localStyles.container}>
      <Carousel
        sliderWidth={deviceWidth}
        sliderHeight={deviceWidth}
        itemWidth={deviceWidth - moderateScale(60)}
        data={data}
        renderItem={renderItem}
        onSnapToItem={index => setIndex(index)}
        hasParallaxImages={true}
        autoplay={true}
      />
      <View style={localStyles.paginationStyle}>
        <Pagination
          dotsLength={data?.length}
          activeDotIndex={index}
          dotStyle={[localStyles.dotStyle, {backgroundColor: colors.primary}]}
          inactiveDotStyle={[
            localStyles.dotStyle,
            {backgroundColor: colors.dotColor},
          ]}
          inactiveDotOpacity={1}
          inactiveDotScale={1}
          dotContainerStyle={localStyles.dotContainerStyle}
          containerStyle={localStyles.paginationContainerStyle}
        />
      </View>
    </View>
  );
};

export default ImageCarousel;

const localStyles = StyleSheet.create({
  container: {
    ...styles.flex,
    ...styles.mt5,
  },
  item: {
    width: deviceWidth - moderateScale(60),
    height: getHeight(150),
  },
  imageContainer: {
    ...styles.flex,
    marginBottom: Platform.select({ios: 0, android: 1}),
    borderRadius: moderateScale(10),
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode:'contain',
  },
  dotStyle: {
    height: moderateScale(8),
    width: moderateScale(8),
    borderRadius: moderateScale(4),
  },
  paginationContainerStyle: {
    ...styles.ph15,
    ...styles.pv5,
    ...styles.mt10,
  },
  paginationStyle: {
    ...styles.itemsStart,
  },
  dotContainerStyle: {
    ...styles.mh5,
  },
});
