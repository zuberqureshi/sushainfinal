import {Image, StyleSheet, TouchableOpacity, View,Text,FlatList} from 'react-native';
import React from 'react';
// import {FlashList} from '@shopify/flash-list';

//  local imports
import SubHeader from '../common/CommonComponent/SubHeader';
import {medicinesConcernsData, shopByategoryData} from '../../api/constant';
import {colors, styles} from '../../themes';
import {DoctorSpecialityListData} from '../../types/Types';
import CText from '../common/CText';
import {moderateScale} from '../../common/constants';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import {OptimizedFlatList} from 'react-native-optimized-flatlist'
import { StackNav } from '../../navigation/NavigationKeys';
// import { StackNav } from '../../navigation/NavigationKeys';



const MedicinesConcerns = ({title}: {title: string}) => {

  const navigation = useNavigation()

  const RenderDSpecialities = ({item}: {item: DoctorSpecialityListData}) => {
    // console.log({item});

    
  return (
    <TouchableOpacity onPress={()=>{navigation.navigate(StackNav.ProductByCategories,{categoryName:item?.title})}}  style={localStyles.rootContaienr}>
      <View style={localStyles.imgOuterContaiener}>
        <Image source={item?.image} style={localStyles.imgStyle} />
      </View>
      <View style={localStyles.titleContainer}>
        <CText type="m12" align="center" style={styles.ph5} numberOfLines={2}>
          {item?.title}
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
        data={medicinesConcernsData}
        renderItem={renderItem}
        // horizontal
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.ph10}
        // showsHorizontalScrollIndicator={false}
        numColumns={4}
        estimatedItemSize={200}
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
