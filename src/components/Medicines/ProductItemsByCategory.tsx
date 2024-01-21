import {StyleSheet, TouchableOpacity, View,Text,Modal, FlatList,Image} from 'react-native';
import React, {useState} from 'react';
import typography from '../../themes/typography';
import { colors,styles } from '../../themes';
import strings from '../../i18n/strings';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FlashList } from '@shopify/flash-list';
import CSafeAreaView from '../common/CSafeAreaView';
import { HeartLightBlue } from '../../assets/svgs';
import { moderateScale } from '../../common/constants';
import images from '../../assets/images';
import { color } from 'react-native-reanimated';
import { Pressable } from 'react-native';
import { StackNav } from '../../navigation/NavigationKeys';


const ProductItemsByCategory = ({title,data,bestSeller,multipleAddButton,setMultipleAddButton}: {title: string,data:any,bestSeller:boolean}) => {

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();


   

    const renderCardItem = ({item, index}: any) => {
           console.log(item);
           
        return(
          <Pressable onPress={()=>{navigation.navigate(StackNav.ProductDetail)}} >
            <View style={[localStyles.cardMainContainer,]} >
               
               <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginHorizontal:responsiveWidth(1.5),marginTop:responsiveHeight(0),alignSelf:bestSeller?'none':'flex-end'}}>
                {bestSeller && <Text style={localStyles.bestsellerText} >BESTSELLER</Text>}
              <HeartLightBlue style={{alignSelf:'flex-end'}} width={responsiveWidth(6)} height={responsiveHeight(4)} />

              

              </View>

              <Image source={item?.image} style={localStyles.itemImg}  />

              <View style={{paddingLeft:responsiveWidth(1.5),marginTop:responsiveHeight(0.5),gap:moderateScale(2),height:responsiveHeight(4)}} >
                <Text style={{color:colors.black,   ...typography.fontSizes.f10,...typography.fontWeights.Medium,width:'90%'}} >{item?.title}</Text>
                <Text style={{color:colors.black,  fontSize:responsiveFontSize(1),...typography.fontWeights.Regular,}} >{item?.decp}</Text>
              </View>

              <View style={{paddingHorizontal:responsiveWidth(1.5),flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:responsiveHeight(1.3)}}  >

                <View style={{gap:moderateScale(2)}} >
                    <Text style={{color:colors.black,   ...typography.fontSizes.f12,...typography.fontWeights.Bold,}}  >{'\u20B9'}{item?.price}</Text>
                    <View style={{flexDirection:'row',alignItems:'center',gap:responsiveWidth(0.5)}} >
                        <Image source={images.startFilled} style={{resizeMode:'contain',width:responsiveWidth(2.5),height:responsiveHeight(1.25)}} />
                        <Text style={{color:colors.black,   ...typography.fontSizes.f10,...typography.fontWeights.Medium,}}  >4.0 |4 reviews</Text>
                    </View>


                </View>

            {    !multipleAddButton ?
            <TouchableOpacity activeOpacity={0.6} onPress={()=>{setMultipleAddButton(true)}} style={{backgroundColor:colors.lightSuccess,borderColor:colors.success,borderWidth:responsiveWidth(0.2),borderRadius:responsiveWidth(1.5)}} >
                    <Text style={{color:colors.success,   ...typography.fontSizes.f12,...typography.fontWeights.Medium,paddingHorizontal:responsiveWidth(4),paddingVertical:responsiveHeight(0.4)}}  >ADD</Text>
                </TouchableOpacity>
:
                <View style={{backgroundColor:colors.lightSuccess,borderColor:colors.success,borderWidth:responsiveWidth(0.2),borderRadius:responsiveWidth(1.5)}} >
                    <View style={{flexDirection:'row',alignItems:'center'}} >
                        <TouchableOpacity activeOpacity={0.6} onPress={()=>{setMultipleAddButton(false)}} >
                        <Text style={{color:colors.success,   ...typography.fontSizes.f20,...typography.fontWeights.Medium,paddingLeft:responsiveWidth(2),}}  >-</Text>
                        </TouchableOpacity>


                    <Text style={{color:colors.black,   ...typography.fontSizes.f12,...typography.fontWeights.SemiBold,paddingHorizontal:responsiveWidth(3),paddingVertical:responsiveHeight(0.4)}}  >1</Text>
                       <TouchableOpacity activeOpacity={0.6} >
                        <Text style={{color:colors.success,   ...typography.fontSizes.f20,...typography.fontWeights.Medium,paddingRight:responsiveWidth(2),}}  >+</Text>
                        </TouchableOpacity>
                    </View>
                   
                </View>
               }
              </View>


          
            </View>
            </Pressable>
        )
    }

  return (
 
      <View style={{flex:1,paddingHorizontal:responsiveWidth(3),marginBottom:responsiveHeight(0),marginLeft:responsiveWidth(1)}} >

<FlashList
        style={{flex:1,}}
          data={data}
          renderItem={renderCardItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          // justifyContent="space-between"
         contentContainerStyle={{}}
        />

      </View>

    


  )
}

export default ProductItemsByCategory

const localStyles = StyleSheet.create({
    cardMainContainer:{
     borderWidth:1,
     borderColor:'#D9D9D9',
     width:responsiveWidth(45),
     height:moderateScale(220),
     borderRadius:responsiveWidth(3),
     marginBottom:responsiveHeight(2),
    },
    bestsellerText:{
        color:colors.primary,
        ...typography.fontWeights.Medium,
        ...typography.fontSizes.f10,
     
      },
      itemImg:{
        resizeMode:'contain',
        width:responsiveWidth(35),
        height:responsiveHeight(14),
        alignSelf:'center',
        // marginTop:responsiveHeight(0)

      
    },  
})