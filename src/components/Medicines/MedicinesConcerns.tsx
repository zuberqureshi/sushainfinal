import {Image, StyleSheet, TouchableOpacity, View,Text,FlatList} from 'react-native';
import React from 'react';
// import {FlashList} from '@shopify/flash-list';

//  local imports
import SubHeader from '../common/CommonComponent/SubHeader';
import {medicinesConcernsData, shopByategoryData} from '../../api/constant';
import {colors, styles} from '../../themes';
import {DoctorSpecialityListData} from '../../types/Types';
import CText from '../common/CText';
import {API_IMAGE_BASE_URL, moderateScale} from '../../common/constants';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import {OptimizedFlatList} from 'react-native-optimized-flatlist'
import { StackNav } from '../../navigation/NavigationKeys';
import useGetMedicinesHealthConcerns from '../../hooks/medicine/get-medicine-concerns';
import Loader from '../Loader/Loader';
import { Avatar, AvatarFallbackText, Spinner } from '@gluestack-ui/themed';
// import { StackNav } from '../../navigation/NavigationKeys';



const MedicinesConcerns = ({title,mediType,personalCare}: {title: string,mediType:string,personalCare:string}) => {
 
  const navigation = useNavigation()
  
  const {data,isLoading} = useGetMedicinesHealthConcerns({masterCat:mediType,personalCareType:personalCare})
  // console.log('medicen    ===',data?.data?.result[0].categroyList);
  if(isLoading){
    return(
      <Spinner size={'small'} color={colors.primary} />
    )
  }

  const RenderDSpecialities = ({item}: {item: DoctorSpecialityListData}) => {
    // console.log({item});

   

    
  return (
    <TouchableOpacity onPress={()=>{navigation.navigate(StackNav.ProductByCategories,{categoryName:item?.name,bannerImg:item?.listing_banner_mbl,personalCareType:personalCare})}}  style={localStyles.rootContaienr}>
      <View style={localStyles.imgOuterContaiener}>
        { !!item?.app_icon ? <Image source={{uri:`${API_IMAGE_BASE_URL}${item?.app_icon}`}} style={localStyles.imgStyle} /> :
          
        <Avatar bgColor={colors.placeHolderColor} size="md" borderRadius="$full" >
        <AvatarFallbackText>{item?.name}</AvatarFallbackText>
      </Avatar>
    
        }
      </View>
      <View style={localStyles.titleContainer}>
        <CText type="m12" align="center" style={styles.ph5} numberOfLines={2}>
          {item?.name}
        </CText>
      </View>
    </TouchableOpacity>
   
  );
};


  const renderItem = ({item}: {item: DoctorSpecialityListData}) => {
    return <RenderDSpecialities item={item} />;
  };


  return (
    <View style={{marginBottom:responsiveHeight(1),alignSelf:'center'}}>
      <SubHeader title={title} isViewHide={false} />
      
      <FlatList
        data={data?.data?.result[0].categroyList}
        renderItem={renderItem}
        // horizontal
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.ph10}
        // showsHorizontalScrollIndicator={false}
        numColumns={4}
      
      />
       
    </View>
  );
}

export default React.memo(MedicinesConcerns)

const localStyles = StyleSheet.create({
  imgStyle: {
    width: moderateScale(50),
    height: moderateScale(50),
    resizeMode: 'contain',
  },
  rootContaienr: {
    width: moderateScale(90),
    ...styles.center,
  },
  imgOuterContaiener: {
    width: moderateScale(71),
    height: moderateScale(72),
    borderRadius: moderateScale(8),
    ...styles.mv10,
    ...styles.center,
    backgroundColor: '#ECF3FE',
  },
  titleContainer: {
    height: moderateScale(34),
  },
});
