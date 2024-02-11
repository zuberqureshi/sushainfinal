import { FlatList, Image, Linking, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { memo, useCallback, useState } from 'react';
import Carousel, { Pagination } from 'react-native-snap-carousel';

// local imports
import { colors, styles } from '../../themes';
import {
    API_IMAGE_BASE_URL,
    deviceWidth,
    getSortedArray,
    moderateScale,
} from '../../common/constants';
import { Banner } from '../../types/Types';
// import {BASE_IMG_NEW_PATH} from '../../api/constant';

import { Box, Text } from '@gluestack-ui/themed';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import RatingComponent from '../HomeComponent/RatingComponent';
import images from '../../assets/images';
import { FlashList } from '@shopify/flash-list';

type Props = {
    item: Banner;
    onPressItem: (item: Banner) => void;
};

const RenderItemStar = ({item, index}: any) => {
    return (
      <Image
        source={item < 4 + 1 ? images.startFilled : images.startUnfilled}
        style={[localStyles.straStyle,]}
      />
    );
  };

const ImageCarousel = ({ item, onPressItem }: any) => {
    
    return (
        <Box  >
            
            <Image source={{uri:`${API_IMAGE_BASE_URL}${item}`}} style={{width:'100%',height:responsiveHeight(21.5),resizeMode:'contain'}} />


        </Box>
    );
};

const BannerLifeStyle = ({ bannerData }: any) => {
    const [index, setIndex] = useState(0);

    const onPressItem = useCallback((item: Banner) => {
        Linking.openURL(item?.link_1);
    }, []);

    const imageCarousel = useCallback(
        ({ item }: { item: Banner }) => {
            return <ImageCarousel item={item} onPressItem={onPressItem} />;
        },
        [onPressItem],
    );

    return (
        <View style={localStyles.root}>
            <Carousel
                data={bannerData}
                renderItem={imageCarousel}
                sliderWidth={deviceWidth}
                itemWidth={deviceWidth}
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
                            backgroundColor: colors.primary3,
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

export default memo(BannerLifeStyle);

const localStyles = StyleSheet.create({
    root: {
        ...styles.mt20,
        ...styles.center,

    //    ...styles.mh20,
    //    paddingVertical:responsiveHeight(3.5),
       overflow:'hidden' 
    },
    imgStyle: {
        width: '100%',
        height: moderateScale(134),
    },
    dotStyle: {
        height: moderateScale(8),
        width: moderateScale(8),
        borderRadius: moderateScale(4),
        // marginTop:responsiveHeight(2.3)
    },
    paginationContainerStyle: {
        ...styles.ph10,
        ...styles.pv10,
        // ...styles.mt10,
    },
    imgContainer: {
        ...styles.center,
        borderRadius: moderateScale(10),
    },
    straStyle: {
        height: moderateScale(12),
        width: moderateScale(12),
        
    },
});
