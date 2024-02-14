import {StyleSheet, TouchableOpacity, View,Modal, FlatList,Image} from 'react-native';
import React, {memo, useEffect, useState} from 'react';
import typography from '../../themes/typography';
import { colors,styles } from '../../themes';
import strings from '../../i18n/strings';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FlashList } from '@shopify/flash-list';
import CSafeAreaView from '../common/CSafeAreaView';
import { HeartLightBlue } from '../../assets/svgs';
import { API_IMAGE_BASE_URL, deviceHeight, moderateScale } from '../../common/constants';
import images from '../../assets/images';
import { color } from 'react-native-reanimated';
import { Pressable } from 'react-native';
import { StackNav } from '../../navigation/NavigationKeys';
import { useDispatch, useSelector } from 'react-redux';
import { addProductsToCart, deleteCartItem, removeCartItem } from '../../redux/cartSlice';
import { addProducts, clearProducts, decreaseQty, increaseQty } from '../../redux/productSlice';
import useGetMedicinesByCategory from '../../hooks/medicine/get-medicines-by-category';
import { Box ,Text } from '@gluestack-ui/themed';
import { Spinner } from '@gluestack-ui/themed';
import Loader from '../Loader/Loader';


const ProductItemsByCategory = ({title,data,bestSeller,multipleAddButton,setMultipleAddButton,categoryName,}: any) => {

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  // api calls
  // const useGetMedicinesByCategoryQuery = useGetMedicinesByCategory({ name: categoryName })
  // console.log(useGetMedicinesByCategoryQuery?.data?.pages,'APIII PRODUCCC component');
  
    const dispatch = useDispatch()
    const products = useSelector(state => state.product);
    const cart = useSelector(state => state.cart);
   
    const [apiData, setApiData] = useState([])
   

    const renderCardItem = ({item, index}: any) => {
          //  console.log('qty',item?.qty,item?.id);
           
        return(
          <Pressable onPress={()=>{navigation.navigate(StackNav.ProductDetail)}} >
            <View style={[localStyles.cardMainContainer,]} >
               
               <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginHorizontal:responsiveWidth(1.5),marginTop:responsiveHeight(0),alignSelf:bestSeller?'none':'flex-end'}}>
                {bestSeller && <Text style={localStyles.bestsellerText} >BESTSELLER</Text>}
              <HeartLightBlue style={{alignSelf:'flex-end'}} width={responsiveWidth(6)} height={responsiveHeight(4)} />

              

              </View>

              <Image source={{uri:`${API_IMAGE_BASE_URL}${item?.images}`}} style={localStyles.itemImg}  />

              <View style={{paddingLeft:responsiveWidth(1.5),marginTop:responsiveHeight(0.5),gap:moderateScale(2),height:responsiveHeight(4)}} >
                <Text fontFamily='$InterMedium' color={colors.black} fontSize={10} w='89%' numberOfLines={2} lineHeight={10} >{item?.name}</Text>
                <Text fontFamily='$InterRegular' color={colors.black} fontSize={8} w='90%' numberOfLines={1} lineHeight={10}  >Use In {item?.category?.split(',')[0]}</Text>
              </View>

              <View style={{paddingHorizontal:responsiveWidth(1.5),flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:responsiveHeight(1.3)}}  >

                <View style={{gap:moderateScale(2),marginTop:responsiveHeight(1)}} >
                    <Text fontFamily='$InterBold' color={colors.black} fontSize={12} lineHeight={12} >{'\u20B9'} {!!item?.final_price ? item?.final_price : 'N/A'}</Text>
                    <View style={{flexDirection:'row',alignItems:'center',gap:responsiveWidth(0.5)}} >
                        <Image source={images.startFilled} style={{resizeMode:'contain',width:responsiveWidth(2.5),height:responsiveHeight(1.25)}} />
                        <Text fontFamily='$InterMedium' color={colors.black} fontSize={10} lineHeight={10} >{!!item?.rating ? item?.rating : 5}|5 reviews</Text>
                    </View>


                </View>

            {   item?.qty == 0 ? (
                  <TouchableOpacity activeOpacity={0.6} onPress={()=>{
                    dispatch(addProductsToCart(item))
                    dispatch(increaseQty(item?.id))

                    }} style={{backgroundColor:colors.lightSuccess,borderColor:colors.success,borderWidth:responsiveWidth(0.2),borderRadius:responsiveWidth(1.5)}} >
                  <Text fontFamily='$InterMedium' color={colors.success} fontSize={12} px={16} py={1} >ADD</Text>
              </TouchableOpacity>
            ) : null }

            { item?.qty !==0 &&
              
             
                  <View style={{flexDirection:'row',alignItems:'center',backgroundColor:colors.lightSuccess,borderColor:colors.success,borderWidth:responsiveWidth(0.2),borderRadius:responsiveWidth(1.5)}} >
                    
                   { item?.qty !==0 &&   <TouchableOpacity  onPress={()=>{
                          if(item.qty > 1){
                            dispatch(removeCartItem(item))
                            dispatch(decreaseQty(item?.id))
                          }else{
                            dispatch(deleteCartItem(item?.id))
                            dispatch(decreaseQty(item?.id))
                          }
                        }}
                    activeOpacity={0.6}  >
                      <Text fontFamily='$InterMedium' color={colors.black} fontSize={20} pl={10}  >-</Text>
                      </TouchableOpacity>}


                { item?.qty !==0 &&   <Text  fontFamily='$InterSemiBold' color={colors.black} fontSize={14} px={9} py={1}  >{!!item?.qty ? item?.qty  : 0}</Text>}
                    
                    { item?.qty !==0 &&  <TouchableOpacity onPress={()=>{
                        dispatch(addProductsToCart(item))
                        dispatch(increaseQty(item?.id))
                    }} activeOpacity={0.6} >
                      <Text  fontFamily='$InterMedium' color={colors.black} fontSize={20} pr={10} >+</Text>
                      </TouchableOpacity>}
                 
                  </View>
                 
            
             
            }
              </View>


          
            </View>
            </Pressable>
        )
    }

  return (
 
      <View style={{flex:1,paddingHorizontal:responsiveWidth(3),marginLeft:responsiveWidth(1),}} >

   { !!products ? <FlashList
        // style={{flex:1,}}
          data={products}
          renderItem={renderCardItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          // justifyContent="space-between"
         contentContainerStyle={{}}
         estimatedItemSize={200}
         ListEmptyComponent={()=>{
          return(
            <Loader/>
          )
         }}
        //  onEndReached={setPageNum(pageNum+1)}
        //  ListFooterComponent={() => {
        //    if (useGetMedicinesByCategoryQuery?.isFetching) {
        //      return (
        //        <Box h={100} pt={20}>
        //          <Spinner color={colors.primary} size={'small'} />
        //        </Box>
        //      )
        //    }
        //  }}
        /> : <Loader/> }

      </View>

    


  )
}

export default memo(ProductItemsByCategory)

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