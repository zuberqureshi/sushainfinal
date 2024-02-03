import { FlatList, Image, Linking, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { memo, useCallback, useState } from 'react';
import Carousel, { Pagination } from 'react-native-snap-carousel';

// local imports
import { colors, styles } from '../../themes';
import {
    deviceWidth,
    getSortedArray,
    moderateScale,
} from '../../common/constants';
import { Banner } from '../../types/Types';
// import {BASE_IMG_NEW_PATH} from '../../api/constant';
import { API_BASE_URL, API_IMAGE_BASE_URL } from '@env'
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
        <Box alignItems='center' gap={17} >
            <Text fontFamily='$InterSemiBold' fontSize={14} color={colors.black}>{item}</Text>
      
           <Box flexDirection='row' gap={5} >

           {['1','2','3','4','5'].map((item,index)=>{
            return(
               <RenderItemStar key={index.toString()} item={item} />
            )
           })}
           </Box>
  
            <Text fontFamily='$InterRegular' fontSize={13} color={colors.black} textAlign='center' w={224} lineHeight={16} mt={28}  >
                I got relief.
                I consulted many doctors for my PCOD problem before reaching Dr Pallvi, She is an excellent listener and she explains very well. After 2 months of her treatment, i am observing a never before improvement.
            </Text>


        </Box>
    );
};

const CustomerSpeak = ({ bannerData }: any) => {
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

export default memo(CustomerSpeak);

const localStyles = StyleSheet.create({
    root: {
        ...styles.mt10,
        ...styles.center,
       borderWidth:1,
       borderColor:'#DAD8D8',
       borderRadius:responsiveWidth(2.5),
       ...styles.mh20,
       paddingVertical:responsiveHeight(3.5),
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
        marginTop:responsiveHeight(2.3)
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
    straStyle: {
        height: moderateScale(12),
        width: moderateScale(12),
        
    },
});
