import {StyleSheet, Image, View, FlatList,TouchableOpacity,Pressable} from 'react-native';
import React from 'react';

// local imports
import {colors, styles} from '../../themes';
import CText from '../common/CText';
import {moderateScale} from '../../common/constants';
import {Category} from '../../types/Types';
import images from '../../assets/images';
import { useNavigation } from '@react-navigation/native';
import { StackNav } from '../../navigation/NavigationKeys';



const data = [
  {
    id: 48,
    name: 'Book Appointment',
    des: 'With Top Ayurvedic Doctors',
    img_mbl: images.constantImg1,
    link_1:
      'https://sushainclinic.com/order/index/allmedicines/all-type/all-category',
    link_2:
      'https://sushainclinic.com/order/index/allmedicines/all-type/all-category',
  },
  {
    id: 45,
    name: 'Instant Video Consultation',
    des: 'Connects within 60 seconds',
    img_mbl: images.constantImg2,
    link_1: 'https://sushainclinic.com/virtual',
    link_2: 'https://sushainclinic.com/virtual',
  },
  {
    id: 46,
    name: 'Buy Medicines',
    des: 'Top Ayurvedic Products',
    img_mbl: images.constantImg3,
    link_1: 'https://sushainclinic.com/virtual',
    link_2: 'https://sushainclinic.com/virtual',
  },
  {
    id: 53,
    name: 'Beauty Products',
    des: 'Exclusive lifestyle Products',
    img_mbl: images.constantImg4,
    link_1: 'https://sushainclinic.com/virtual/instantconsultation',
    link_2: 'https://sushainclinic.com/virtual/instantconsultation',
  },
];

type props = {
  item: Category;
  index: number;
};

const CategoryList = () => {

  const navigation = useNavigation()
  const renderItem = ({item, index}: props) => {
    return (
      <Pressable onPress={()=>{navigation.navigate(StackNav.ConsultDoctor)}} >
        <View style={localStyles.itemStyle}>

        
        <Image source={item.img_mbl} style={localStyles.imgStyle} />
        <CText type="s12" style={styles.mv5} numberOfLines={2} align="center">
          {item.name}
        </CText>
        <CText
          type="m10"
          numberOfLines={2}
          color={colors.textColor8}
          align="center">
          {item.des}
        </CText>
        </View>
      </Pressable>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      numColumns={2}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={localStyles.flatListStyle}
      scrollEnabled={false}
    />
  );
};

export default CategoryList;

const localStyles = StyleSheet.create({
  itemStyle: {
    ...styles.mh25,
    ...styles.mv10,
    ...styles.itemsCenter,
    ...styles.p5,
    width: moderateScale(115),
    borderRadius: moderateScale(10),
    backgroundColor: colors.white,
    ...styles.shadowStyle,
  },
  imgStyle: {
    height: moderateScale(65),
    width: moderateScale(105),
    resizeMode: 'cover',
  },
  flatListStyle: {
    ...styles.ph20,
    ...styles.mt10,
    ...styles.selfCenter,
  },
});
