import {
    StyleSheet,
    
    View,
    SafeAreaView,
    TouchableOpacity,
    Image,
    ScrollView,
    FlatList,
    Pressable
  } from 'react-native';
  import React,{useState} from 'react';
  import {colors, styles} from '../../themes';
  import CHeader from '../../components/common/CHeader';
  import strings from '../../i18n/strings';
  import SearchWithLikeComponent from '../FindADoctor/SearchWithLikeComponent';
  import images from '../../assets/images';
  import typography from '../../themes/typography';
  import {
    responsiveFontSize,
    responsiveHeight,
    responsiveWidth,
  } from 'react-native-responsive-dimensions';
  import StepIndicator from 'react-native-step-indicator';
  import {API_IMAGE_BASE_URL, deviceWidth, moderateScale} from '../../common/constants';
import CSafeAreaView from '../../components/common/CSafeAreaView'
import CText from '../../components/common/CText';
import { CouponPercent, GreenCouponPercent, ReportDeleteIcon, RightArrowBlack, ShippingTrack } from '../../assets/svgs';
import { medicineCartDate, sushainProductData } from '../../api/constant';
import { FlashList } from '@shopify/flash-list';
import KeyBoardAvoidWrapper from '../../components/common/KeyBoardAvoidWrapper';
import SimilarProduct from '../../components/Medicines/SimilarProduct';
import { StackNav } from '../../navigation/NavigationKeys';
import { useDispatch, useSelector } from 'react-redux';
import { addProductsToCart, deleteCartItem, removeCartItem } from '../../redux/cartSlice';
import { decreaseQty, deleteProductItem, increaseQty } from '../../redux/productSlice';
import { Text, Toast, ToastTitle, useToast } from '@gluestack-ui/themed';

const Cart = ({navigation}) => {

  const [stepCurrentPosition,setStepCurrentPosition] = useState(0)

  const [selectedShippingOption, setSelectedShippingOption] = useState(1)

  const cartData = useSelector(state => state.cart);

  const dispatch = useDispatch()
  const toast = useToast()
    const labels = ["Cart","Address","Payment","Summary"];
const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize:25,
  separatorStrokeWidth: 1.5,
  currentStepStrokeWidth: 1.5,
  stepStrokeCurrentColor: colors.primary,
  stepStrokeWidth: 1.5,
  stepStrokeFinishedColor: colors.primary,
  stepStrokeUnFinishedColor: '#D3D5D6',
  separatorFinishedColor: colors.primary,
  separatorUnFinishedColor: '#E7DFDF',
  stepIndicatorFinishedColor: colors.primary,
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 10,
  currentStepIndicatorLabelFontSize: 10,
  stepIndicatorLabelCurrentColor: colors.primary,
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#B9BCBC',
  labelColor: '#9A9999',
  labelSize: 10,
  currentStepLabelColor: colors.black,
  
 
}

const onPageChange =(position) =>{
    setStepCurrentPosition(position);
}

const deleteItemFromCart = (item:any) => {

  dispatch(deleteCartItem(item?.id))
  dispatch(deleteProductItem(item?.id))

  toast.show({
    placement: "bottom",
    render: ({ id }: { id: string }) => {
      const toastId = "toast-" + id
      return (
        <Toast nativeID={toastId} variant="accent" action='success'>
          <ToastTitle>Remove From Cart</ToastTitle>
        </Toast>
      )
    }
  })
}


const renderMedicineCartItem = ({item,index}) => {

    return(
        <View style={{...styles.flexRow,borderWidth:1,borderColor:'#E9E3E3',paddingHorizontal:responsiveWidth(2),paddingVertical:responsiveHeight(1.5),width:deviceWidth*0.92,borderRadius:responsiveWidth(4),marginBottom:responsiveHeight(2),height:responsiveHeight(19)}} >
            <Image source={{uri:`${API_IMAGE_BASE_URL}${item?.images}`}} style={{borderColor:colors.primary,borderRadius:responsiveWidth(4),borderWidth:1,width:responsiveWidth(25),height:responsiveHeight(16),resizeMode:'contain'}} />
            <View style={{width:'70%',paddingLeft:responsiveWidth(2),gap:responsiveHeight(0.8),alignSelf:'center'}} >
                <View style={{...styles.flexRow,justifyContent:'space-between',alignItems:'center'}} >
                    {/* <CText type='s12' >{item.name}</CText> */}
                    <Text fontFamily='$InterSemiBold' color={colors.black} fontSize={12} numberOfLines={1} w={'85%'} lineHeight={13} >{item?.name}</Text>
                    <TouchableOpacity activeOpacity={0.6} onPress={()=>{
                        deleteItemFromCart(item)
                      }} >
                    <ReportDeleteIcon style={{alignSelf:'flex-start'}} width={responsiveWidth(5)} height={responsiveHeight(2.5)} />
                    </TouchableOpacity>

                </View>
               
                <Text fontFamily='$InterRegular' color={colors.black} fontSize={10} numberOfLines={3} w={'85%'} lineHeight={11} >{item?.single_description}</Text>
                
                <View style={{...styles.flexRow,alignItems:'baseline'}} >
                <Text fontFamily='$InterBold' color={colors.black} fontSize={14} lineHeight={16} >{item?.symbol}{item?.final_price} </Text>
                <CText type='m12' color='#454444' style={{textDecorationLine:'line-through'}} >{item.aprice}</CText>
                <CText type='m10' style={{marginTop:responsiveHeight(0.3)}} >  20%off</CText>
                </View>

                <View style={{...styles.flexRow,alignItems:'baseline',justifyContent:'space-between'}} >

             

                <CText  type='s10' >Qty:{item?.qty+1}</CText>
                
                <View style={{backgroundColor:colors.lightSuccess,borderColor:colors.success,borderWidth:responsiveWidth(0.2),borderRadius:responsiveWidth(1.5),}} >
                    <View style={{flexDirection:'row',alignItems:'center'}} >
                        <TouchableOpacity onPress={()=>{
                          if(item.qty > 0){
                            dispatch(removeCartItem(item))
                            dispatch(decreaseQty(item?.id))
                          }else{
                            dispatch(deleteCartItem(item?.id))
                            dispatch(decreaseQty(item?.id))
                          }
                        }} activeOpacity={0.6} >
                        <Text style={{color:colors.success,   ...typography.fontSizes.f20,...typography.fontWeights.Medium,paddingLeft:responsiveWidth(2),lineHeight:responsiveHeight(3)}}  >-</Text>
                        </TouchableOpacity>


                    <Text style={{color:colors.black,   ...typography.fontSizes.f12,...typography.fontWeights.SemiBold,paddingHorizontal:responsiveWidth(3),}}  >{item?.qty+1}</Text>
                       <TouchableOpacity onPress={()=>{
                        dispatch(addProductsToCart(item))
                        dispatch(increaseQty(item?.id))
                        }}  activeOpacity={0.6} >
                        <Text style={{color:colors.success,   ...typography.fontSizes.f20,...typography.fontWeights.Medium,paddingRight:responsiveWidth(2),lineHeight:responsiveHeight(3)}}  >+</Text>
                        </TouchableOpacity>
                    </View>
                   
                </View>

                </View>

            </View>
        </View>
    )
}

  return (
    <CSafeAreaView>
      
      <KeyBoardAvoidWrapper>
        <CHeader title='Cart' />
     
     <View style={{width: deviceWidth + responsiveWidth(15),alignSelf:'center',marginRight:responsiveWidth(2.5),paddingVertical:responsiveHeight(1.5)}} >
     <StepIndicator
         stepCount={4}
         customStyles={customStyles}
         currentPosition={stepCurrentPosition}
         labels={labels}
         
     />
     </View>

     <CText style={{backgroundColor:colors.creem,paddingVertical:responsiveHeight(1.5),paddingHorizontal:responsiveWidth(3)}} type='b12' color='#197A50' >{ !!cartData ? cartData?.length : 0} Items added</CText>
      

     <View style={{flex:1,borderBottomWidth: responsiveWidth(1.5), borderBottomColor: '#F5F1F1',paddingTop:responsiveHeight(1.5),alignItems:'center'}}>


     <FlatList
        style={{flex:1,}}
          data={cartData}
          renderItem={renderMedicineCartItem}
          keyExtractor={(item, index) => index.toString()}
         
          showsVerticalScrollIndicator={false}
          
          // justifyContent="space-between"
     
        /> 
    </View>
  
    <View style={{borderBottomWidth: responsiveWidth(1.5), borderBottomColor: '#F5F1F1',paddingBottom:responsiveHeight(1.5)}} >
    <View style={{...styles.flexRow,...styles.justifyBetween,paddingHorizontal:responsiveWidth(3),marginVertical:responsiveHeight(2)}} >
        <CText type='s14' >Last Minute Buys</CText>
        <CText type='s12' color='#149C5C' >View All</CText>
      </View>

    <SimilarProduct data={sushainProductData }/>  

    
    </View>

    <View style={{paddingHorizontal:responsiveHeight(2),paddingVertical:responsiveHeight(2.5),borderBottomWidth: responsiveWidth(1.5), borderBottomColor: '#F5F1F1'}} >
       
       <CText type='r12' >SAVINGS CORNER</CText>

       <View style={{...styles.flexRow,alignItems:'center',justifyContent:'space-between',paddingTop:responsiveHeight(1.5)}} >
         
         <View  style={{...styles.flexRow,gap:responsiveWidth(1.5)}} > 
         <CouponPercent style={{alignSelf:'center'}} />
         <CText type='s14' >Apply coupon</CText>
         </View>
         
         <RightArrowBlack style={{alignSelf:'center'}}/>
       
       </View>

    </View>


    <View style={{paddingHorizontal:responsiveWidth(3),paddingVertical:responsiveHeight(1.5),borderBottomWidth: responsiveWidth(1.5), borderBottomColor: '#F5F1F1'}} >
      
      <View style={{...styles.flexRow,alignItems:'center',gap:responsiveWidth(2),marginBottom:responsiveHeight(2)}} >
        <ShippingTrack style={{alignSelf:'center'}} />
        <CText style={{alignSelf:'flex-end'}} type='s14' >Shipping</CText>
      </View>

      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginBottom:responsiveHeight(1)}} >
        <View style={{flexDirection:'row',alignItems:'center',gap:responsiveWidth(4)}} >
        <TouchableOpacity onPress={()=>{
            setSelectedShippingOption(1)
          }} style={{borderWidth:1,borderColor:selectedShippingOption === 1 ? colors.primary : colors.primary,paddingHorizontal:responsiveWidth(0.8),paddingVertical:responsiveHeight(0.4),borderRadius:responsiveWidth(4)}} >
            <View style={{backgroundColor:selectedShippingOption === 1 ? colors.primary : '#F7F9F9',paddingHorizontal:responsiveWidth(1.4),paddingVertical:responsiveHeight(0.7),borderRadius:responsiveWidth(2)}} ></View>
          </TouchableOpacity>
          <CText type='m14' >Normal (5 days)</CText>
        </View>
        <CText type='s14' >{'\u20B9'} 55</CText>
      </View>

      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}} >
        <View style={{flexDirection:'row',alignItems:'center',gap:responsiveWidth(4)}} >
        <TouchableOpacity onPress={()=>{
            setSelectedShippingOption(2)
          }} style={{borderWidth:1,borderColor:selectedShippingOption === 2 ? colors.primary : colors.primary,paddingHorizontal:responsiveWidth(0.8),paddingVertical:responsiveHeight(0.4),borderRadius:responsiveWidth(4)}} >
            <View style={{backgroundColor:selectedShippingOption === 2 ? colors.primary : '#F7F9F9',paddingHorizontal:responsiveWidth(1.4),paddingVertical:responsiveHeight(0.7),borderRadius:responsiveWidth(2)}} ></View>
          </TouchableOpacity>
          <CText type='m14' >Express (13 days)</CText>
        </View>
        <CText type='s14' >{'\u20B9'} 85</CText>
      </View>

      <View style={{borderBottomWidth:1,borderBottomColor:'#E9E1E1',marginTop:responsiveHeight(1.5)}} ></View>
      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingVertical:responsiveHeight(1.5)}} >
        <CText type='m14' >Handling charges</CText>
        <CText type='s14' >{'\u20B9'}10</CText>
      </View>

      
    </View>


    <View style={{paddingHorizontal:responsiveWidth(3),paddingVertical:responsiveHeight(1.5),gap:responsiveHeight(0.7)}} >
      
      <CText type='s14' style={{marginBottom:responsiveHeight(2)}} >Price Details (3 Items)</CText>

      <View style={{...styles.flexRow,alignItems:'center',justifyContent:'space-between'}} >
        <CText type='r12' color='#565353' >Total Product Price</CText>
        <CText type='m12' >{'\u20B9'} 2,630</CText>
      </View>

      <View style={{...styles.flexRow,alignItems:'center',justifyContent:'space-between'}} >
        <CText type='r12' color='#565353' >Total Discount</CText>
        <CText type='m12' >-50</CText>
      </View>
      <View style={{...styles.flexRow,alignItems:'center',justifyContent:'space-between'}} >
        <CText type='r12' color='#565353' >Shipping/ Handling Fee</CText>
        <CText type='m12' >{'\u20B9'}65</CText>
      </View>

      <View style={{borderBottomWidth:1,borderBottomColor:'#E9E1E1',marginVertical:responsiveHeight(0.4)}} ></View>
      
      <View style={{...styles.flexRow,alignItems:'center',justifyContent:'space-between'}} >
        <CText type='s14' >Order Total</CText>
        <CText type='b14' >{'\u20B9'}5,280</CText>
      </View>
      
    
    </View>


    <View style={{alignSelf:'center',flexDirection:'row',alignItems:'center',backgroundColor:colors.creem,paddingHorizontal:responsiveWidth(24),paddingVertical:responsiveHeight(1.5),marginVertical:responsiveHeight(6)}} >
      <GreenCouponPercent/>
      <CText type='m10' color={colors.success} >  Yay! Your total discount is </CText>
      <CText  type='b12' color={colors.success} >{'\u20B9'} 50</CText>
    </View>

    <View style={{flexDirection:'row',alignItems:'center',backgroundColor:'#FBEADE',height:responsiveHeight(9),justifyContent:'space-between',paddingHorizontal:responsiveWidth(3.5),borderTopLeftRadius:responsiveWidth(4),borderTopRightRadius:responsiveWidth(4)}}  >

<Text style={{color:colors.black,   ...typography.fontSizes.f16,...typography.fontWeights.Bold,}}>Total Price: {'\u20B9'}526</Text>

<TouchableOpacity  activeOpacity={0.6} onPress={()=>{navigation.navigate(StackNav.OrderSummery)}}  >
  <View style={{backgroundColor:'#FD872E',paddingHorizontal:responsiveWidth(5),paddingVertical:responsiveHeight(1),flexDirection:'row',alignItems:'center',gap:responsiveWidth(1.5),borderRadius:responsiveWidth(3)}} >

    <Text style={{color:colors.white,   ...typography.fontSizes.f12,...typography.fontWeights.Bold,}} >Continue</Text>
  </View>
</TouchableOpacity>

</View>



    
      

    </KeyBoardAvoidWrapper>
    </CSafeAreaView>
  )
}

export default Cart

const localStyles = StyleSheet.create({


})