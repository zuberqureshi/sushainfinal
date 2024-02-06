import {
    Image,
    StyleSheet,
    TouchableOpacity,
    View,
    FlatList,Text
  } from 'react-native';
  import React, {memo, useCallback, useEffect, useMemo, useState} from 'react';

  
  // local imports

  import {DoctorSpecialityListData} from '../../types/Types';
  import CText from '../common/CText';
  import {colors, styles} from '../../themes';
  import {BASE_IMG_NEW_PATH, medicinesCategoryOptions, shopByategoryData} from '../../api/constant';
  import {getHeight, moderateScale} from '../../common/constants';
  import images from '../../assets/images';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import typography from '../../themes/typography'
  

 
  
  const RenderDSpecialities = memo(
    ({
      item,
      
   
    }: {
      item: any;
      
    }) => {
      return (
        <View style={localStyles.mainContaienr}>
          <TouchableOpacity
            onPress={() => {}}
            style={localStyles.rootContaienr}>
            <View style={[localStyles.imgOuterContaiener,{backgroundColor: item?.id === 1 ? colors.lightBlue:'#D9D9D94D',}]}>
              { item?.image ?  <Image source={item?.image} style={localStyles.imgStyle} />:<Text style={{color:colors.primary,   ...typography.fontSizes.f18,...typography.fontWeights.SemiBold,}}>All</Text>}
            </View>
            <View style={localStyles.titleContainer}>
           { item?.image &&   <CText
                type="m12"
                align="center"
                
                style={{...styles.ph5,width:responsiveWidth(13)}}
                numberOfLines={2}>
                {item?.title}
              </CText>}
            </View>
          </TouchableOpacity>
         
        </View>
      );
    },
  );
  
  export default function MedicinesByCategory({shopCategaryData}: any) {

  
 
  

  
    const renderItem = ({item}: {item: DoctorSpecialityListData}) => {
      return (
        <RenderDSpecialities
          item={item}
   
        
        />
      );
    };
  

    return (
      <View style={{}}>
   
        <FlatList
          data={medicinesCategoryOptions}
          renderItem={renderItem}
          horizontal
       
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{...styles.ph1,}}
          // scrollEnabled={false}
          style={{alignSelf:'center'}}
       
        />
        
      </View>
    );
  }
  
  const localStyles = StyleSheet.create({
    imgStyle: {
      width: moderateScale(40),
      height: moderateScale(40),
      resizeMode: 'contain',
    },
    rootContaienr: {
      width: moderateScale(70),
      ...styles.center,

    },
    imgOuterContaiener: {
      width: moderateScale(55),
      height: moderateScale(55),
      borderRadius: moderateScale(27),
      ...styles.mv10,
      ...styles.center,
      
    },
    mainContaienr: {
      ...styles.itemsCenter,

    },
  
   
   
 
  
  });
  