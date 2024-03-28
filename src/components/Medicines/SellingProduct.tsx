import { StyleSheet, View,Image,TouchableOpacity,FlatList, Dimensions, VirtualizedList, Pressable } from 'react-native'
import React, { useState } from 'react'
import SubHeader from '../common/CommonComponent/SubHeader'
import { colors ,styles} from '../../themes'
import typography from '../../themes/typography'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { medicineBestSellingData } from '../../api/constant'
import { HeartLightBlue } from '../../assets/svgs'
import images from '../../assets/images'
import { API_IMAGE_BASE_URL, moderateScale } from '../../common/constants'
import strings from '../../themes/strings'
import { Spinner, Text, Toast, ToastTitle, useToast } from '@gluestack-ui/themed'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { StackNav } from '../../navigation/NavigationKeys'
import { useDispatch, useSelector } from 'react-redux'
import { addProductsToCart } from '../../redux/cartSlice'
import { increaseQty } from '../../redux/productSlice'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'


const SellingProduct = ({title,data}: {title: string,data:any,}) => {

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const toast = useToast()

  const [load, setLoad] = useState(false)

  const dispatch = useDispatch()
  const cartData = useSelector(state => state.cart);


  const onClickAddToCart = (item) => {


    dispatch(addProductsToCart({ id: item?.id, sku: item?.sku, name: item?.name, images: item?.images, image_third_party: item?.image_third_party, other_img: item?.other_img, product_pricing: item?.product_pricing, final_price: item?.final_price,handling_price:item?.handling_price, qty: 0 }))
    // dispatch(increaseQty(item?.id))

    // scale.value = withSpring(1.5)
    // setTimeout(() => {
    //   scale.value = withSpring(1)
    // }, 150);

    toast.show({
      placement: 'bottom',
      render: ({ id }: { id: string }) => {
        const toastId = "toast-" + id
        return (
          <Toast nativeID={toastId} variant='accent' action='success'>
            <ToastTitle>Add To Cart</ToastTitle>
          </Toast>
        )
      }
    })
    
  }

    const RenderDSpecialities = ({item}: any) => {
        // console.log({item});

        const [addedText, setAddedText] = useState('ADD')
        // console.log(item?.qty,'item qty');
    
        function isValuePresent(arrayOfObjects, searchValue) {
          // Iterate through the array of objects
          for (let i = 0; i < arrayOfObjects.length; i++) {
            // Access the current object
            const obj = arrayOfObjects[i];
    
            // Check if the search value exists in the current object
            for (let key in obj) {
              if (obj[key] === searchValue) {
                // If the value is found, return true
                return true;
              }
            }
          }
    
          // If the value is not found in any object, return false
          return false;
        }
    
        // Example usage
        const arrayOfObjects = cartData;
        const searchValue = item?.sku;
        let isPresentItem = isValuePresent(arrayOfObjects, searchValue);
        
      return (
        <View style={localStyles.bestSellingWrapper} >

            <Pressable  onPress={() => { navigation.navigate(StackNav.ProductDetail, { productDetail: {...item,qty:0 } }) }} style={localStyles.imgContainer} >

              <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginHorizontal:responsiveWidth(1.5),marginTop:responsiveHeight(0),alignSelf:'flex-end'}} >
                <Text style={localStyles.bestsellerText} >{item?.type_lifestyle_product}</Text>
              {/* <HeartLightBlue style={{alignSelf:'flex-end'}} width={responsiveWidth(6)} height={responsiveHeight(4)} /> */}


              </View>

               
                <Image source={{uri: item?.image_third_party === 'NO' ? `${API_IMAGE_BASE_URL}${item?.images}` : `${item?.images}`}} style={localStyles.itemImg}  />

             <View style={{flexDirection:'row',alignItems:'center',marginTop:responsiveHeight(2.3),marginLeft:responsiveWidth(2.4)}} >
                    <Text style={localStyles.ratingText}  >{!!item?.rating ? item?.rating : 5}</Text>
                    <Image source={images.starBlack} style={localStyles.starBlack} />
                    <Text style={localStyles.ratingText}  >/5</Text>
                </View>
              
            </Pressable>

            <Text fontFamily='$InterRegular' color={colors.black} numberOfLines={2} h={30} fontSize={12} lineHeight={15} w={'90%'} mt={3} >{item?.name}</Text>

            <View style={localStyles.bottomWrapper} >

                <Text style={localStyles.priceText}>{'\u20B9'} { item?.product_pricing?.length > 0 ? item?.product_pricing[0]?.selling_price : item?.final_price}</Text>

                <TouchableOpacity onPress={()=>{
                  if (!isPresentItem && addedText === 'ADD') {
                    setAddedText('Go to Cart')
                    onClickAddToCart(item)
                  }
                 }} activeOpacity={0.6} style={localStyles.addButtomWrapper} >
                   <Text fontFamily='$InterSemiBold' fontSize={12} color={colors.success} lineHeight={17} >{isPresentItem ? 'Go to Cart' : addedText}</Text>
                </TouchableOpacity>

            </View>

            
        </View>
       
      );
    };


   
        const renderItem = ({item,index}: any) => {
            // console.log({item});
            
          return <RenderDSpecialities key={index} item={item} />;
        };


  return (
    <View style={{ flex:1}} >
      <SubHeader title={title} />
      
      <FlatList
           data={data}
           renderItem={renderItem}
           horizontal
           keyExtractor={(item, index) => index.toString()}
           contentContainerStyle={styles.ph20}
           showsHorizontalScrollIndicator={false}
          //  getItemCount={getItemCount}
          //  getItem={getItem}
     
      />

    </View>
  )
}

export default React.memo(SellingProduct)

const localStyles = StyleSheet.create({
  
    bestSellingWrapper:{
      width:responsiveWidth(47),
      // height:moderateScale(160)
      marginBottom:responsiveHeight(2)
    },
    itemImg:{
        resizeMode:'contain',
        width:responsiveWidth(35),
        height:responsiveHeight(14),
        alignSelf:'center',
        marginTop:responsiveHeight(2)

      
    },
    imgContainer:{
      borderWidth:1,
      borderColor:'#D9D9D9',
      width:responsiveWidth(43),
      height:moderateScale(180),
      borderRadius:responsiveWidth(3),

    },
    starBlack:{
      resizeMode:'contain',
      width:responsiveWidth(3),
      height:responsiveHeight(1.5),
    },
    ratingText:{
      color:colors.black,
      ...typography.fontWeights.Regular,
      ...typography.fontSizes.f10,
     

    },
    itemTitle:{
        color:colors.black,
      ...typography.fontWeights.Regular,
      fontSize:responsiveFontSize(1.65),
      width:'90%'
    },
    bottomWrapper:{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      marginTop:responsiveHeight(0.5)
    },
    priceText:{
      color:colors.black,
      ...typography.fontWeights.Bold,
      ...typography.fontSizes.f14,
    },
    addButtomWrapper:{

      borderWidth:1,
      borderColor:colors.success,
      // width:responsiveWidth(43),
      // height:moderateScale(),
      borderRadius:responsiveWidth(1),
      backgroundColor:colors.lightSuccess,
      marginRight:responsiveWidth(4),
      paddingHorizontal:responsiveWidth(3),
      paddingVertical:responsiveHeight(0.3)

    },
    addButtomText:{
      color:colors.success,
      ...typography.fontWeights.SemiBold,
      // ...typography.fontSizes.f12,
      fontSize:responsiveFontSize(1.6)

    },
    bestsellerText:{
      color:colors.black,
      ...typography.fontWeights.Regular,
      // ...typography.fontSizes.f12,
      fontSize:responsiveFontSize(1.2)
    }






})