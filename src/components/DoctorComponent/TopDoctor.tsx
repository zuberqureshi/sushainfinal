import {FlatList, Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {FlashList} from '@shopify/flash-list';

// local imports
import CText from '../common/CText';
import {colors} from '../../themes';
import {styles} from '../../themes';
import {Api_Image_Base_Url, getHeight, moderateScale} from '../../common/constants';
import images from '../../assets/images';
import RatingComponent from '../HomeComponent/RatingComponent';
import SubHeader from '../common/CommonComponent/SubHeader';
import strings from '../../i18n/strings';
import { Text } from '@gluestack-ui/themed';
import Loader from '../../common/Loader';

interface Top_Rate_Doctor_Data {
  name: string;
  photo: string;
  fees: number;
  vc_fees: number;
  practicing_since: string;
  specialization: string;
  rating: number;
  rating_vc: number;
}



export default function TopDoctor({data}:any) {

   const RenderItem = ({item,index}:{item:Top_Rate_Doctor_Data,index:number}) => {
    // console.log(item?.name,index,'lllkkk');
    return (
      <View key={item?.photo?.toString()} style={localStyles.cardMainContainer}>
        <View style={styles.flexRow}>
          <Image
            source={{uri:`${Api_Image_Base_Url}${item?.photo}`}}
            style={localStyles.doctorImgStyle}
          />
          <View style={localStyles.rightContainer}>
            <CText type="s12">{item?.name}</CText>
            <CText type="r10" numberOfLines={4} style={styles.mt5}>
              {item?.specialization}
            </CText>
          </View>
        </View>
        <View style={styles.rowStart}>
          <View style={localStyles.starContainer}>
            <RatingComponent star={item?.rating} style={localStyles.straStyle} />
          </View>
          <CText type="r10" color={colors.textColor2}>
            {item?.rating_vc} Views
          </CText>
        </View>
      </View>
    );
  };

  
   
  return (
    <View>
   <SubHeader title={strings.topRatedDoctors} isViewHide={false}  />

   <FlashList
        data={data}
        renderItem={({item,index}:any) => <RenderItem item={item} index={index} />}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.ph20}
        horizontal
        showsHorizontalScrollIndicator={false}
        estimatedItemSize={200}
      /> 
      
    </View>
  );
}

const localStyles = StyleSheet.create({
  cardMainContainer: {
    ...styles.mr20,
    ...styles.mv10,
    ...styles.p10,
    backgroundColor: colors.white4,
    borderRadius: moderateScale(10),
    ...styles.shadowStyle,
  },
  doctorImgStyle: {
    height: getHeight(80),
    width: moderateScale(70),
    borderRadius: moderateScale(10),
    resizeMode: 'contain',
    borderWidth: moderateScale(1),
    borderColor: colors.primary,
    ...styles.mb5,
  },
  straStyle: {
    height: moderateScale(10),
    width: moderateScale(10),
    marginHorizontal: moderateScale(1),
  },
  rightContainer: {
    ...styles.ml10,
    ...styles.itemsStart,
    width: moderateScale(110),
  },
  starContainer: {
    ...styles.center,
    ...styles.mr10,
    width: moderateScale(70),
  },
});
