import {
  StyleSheet,

  View,
  SafeAreaView,
  TouchableOpacity,
  Image,

  FlatList,
  Pressable,
  TextInput
} from 'react-native';
import React, { useContext, useState } from 'react';
import { colors, styles } from '../../themes';
import CHeader from '../../components/common/CHeader';

import typography from '../../themes/typography';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import StepIndicator from 'react-native-step-indicator';
import { API_IMAGE_BASE_URL, deviceWidth, moderateScale } from '../../common/constants';

import CText from '../../components/common/CText';
import { CartPayIcon, CouponPercent, CrossBottomTab, GreenCouponPercent, ReportDeleteIcon, RightArrowBlack, ShippingTrack } from '../../assets/svgs';
import { medicineCartDate, sushainProductData } from '../../api/constant';
import SimilarProduct from '../../components/Medicines/SimilarProduct';
import { StackNav } from '../../navigation/NavigationKeys';
import { useDispatch, useSelector } from 'react-redux';
import { addProductsToCart, deleteCartItem, removeCartItem } from '../../redux/cartSlice';
import { decreaseQty, deleteProductItem, increaseQty } from '../../redux/productSlice';
import { Box, Text, Toast, ToastTitle, VStack, useToast } from '@gluestack-ui/themed';
import PrimaryButton from '../../components/common/Button/PrimaryButton';
import { useFormik } from 'formik';
import useCheckCouponCode from '../../hooks/booking/check-coupon-code';
import Body from '../../components/Body/Body';
import { Container } from '../../components/Container';
import useGetSetting from '../../hooks/home/get-setting';
import Loader from '../../components/Loader/Loader';
import useOrderCreate from '../../hooks/order/order-create';
import { AuthContext } from '../../context/AuthContext'

const Cart = ({ navigation }) => {

  const dispatch = useDispatch()
  const toast = useToast()
  const authContext: any = useContext(AuthContext);

  const [stepCurrentPosition, setStepCurrentPosition] = useState(0)

  const [selectedShippingOption, setSelectedShippingOption] = useState(55)
  const [COD, setCOD] = useState(0)
  const [applyCoupon, setApplyCoupon] = useState(false)
  const [payPrice, setPayPrice] = useState('')
  const [disCount, setDisCount] = useState(0)

  //api call
  const useCheckCouponCodeMutation = useCheckCouponCode()
  const useOrderCreateMutation = useOrderCreate()
  const { data: settingData, isLoading: settingIsLoading } = useGetSetting()
  // console.log(settingData?.data?.result[0]?.generalSettings?.cod_charges);


  const cartData = useSelector(state => state.cart);


  const labels = ["Cart", "Address", "Payment", "Summary"];
  const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 25,
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

  const onPageChange = (position) => {
    setStepCurrentPosition(position);
  }

  const getTotalPriceCart = () => {
    let total = 0;
    cartData.map(item => {
      // console.log('getTOTAL', item?.qty,item.final_price);
      total = total + (item?.qty + 1) * item.final_price
    })

    return total;
  }

  const getTotalPriceHandlingCharge = () => {
    let total = 0;
    cartData.map(item => {
      // console.log('getTOTAL', item?.qty,item.final_price);

      total = total + item?.handling_price
    })

    return total;
  }

  const getTotalPriceFinal = (shpiChr) => {
    let total = 0
    if (COD) {
      let Cod = (settingData?.data?.result[0]?.generalSettings?.cod_min_amount < getTotalPriceCart() && settingData?.data?.result[0]?.generalSettings?.cod_max_amount > getTotalPriceCart()) ? COD : 0
      total = total + getTotalPriceCart() + shpiChr + getTotalPriceHandlingCharge() + Cod - disCount
    } else {
      total = total + getTotalPriceCart() + shpiChr + getTotalPriceHandlingCharge() - disCount
    }


    return total;
  }

  // if(settingIsLoading){
  //   return(
  //     <Container statusBarStyle='dark-content' >
  //        <CHeader title='Cart' />
  //       <Loader/>
  //     </Container>
  //   )
  // }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { couponcode: "" },
    // validationSchema: patientBookingValidationSchema,
    onSubmit: values => {
      // updateProfile(values.country,values.address,values.name,values.mobile)
      console.log('update', values);
      // action.resetForm()
      // loadUserInfo();



      let fees = !!payPrice ? payPrice : 715
      // navigation.navigate(StackNav.SelectTimeSlot, { doctorid: '', doctorslots: '', instantconsultation: 'YES', doctorfees: fees });


    }
  },

  );


  const createOrder = () => {

    let shippingCharge = getTotalPriceHandlingCharge() + selectedShippingOption



    const payload = {
      user_id: authContext?.userInfo?.userId,
      products: cartData,
      couon_code: formik?.values.couponcode,
      cod_charges: (settingData?.data?.result[0]?.generalSettings?.cod_min_amount < getTotalPriceCart() && settingData?.data?.result[0]?.generalSettings?.cod_max_amount > getTotalPriceCart()) ? COD : 0,
      shippingcharges: shippingCharge,
      shippingmode: selectedShippingOption === 55 ? 'NORMAL' : 'EXPRESS'
    }
    // console.log({ payload });
    // navigation.navigate(StackNav.Address)

    // useOrderCreateMutation.mutate(payload, {
    //   onSuccess: (data) => {

    //     // console.log('SUGNUPP DATA',data?.data);

    //     toast.show({
    //       placement: "bottom",
    //       render: ({ id }: { id: string }) => {
    //         const toastId = "toast-" + id
    //         return (
    //           <Toast nativeID={toastId} variant="accent" action="success">
    //             <ToastTitle>order create successfully</ToastTitle>
    //           </Toast>
    //         );
    //       },
    //     })




    //   },
    //   onError: (error) => {
    //     // console.log(error);

    //     toast.show({
    //       placement: "bottom",
    //       render: ({ id }: { id: string }) => {
    //         const toastId = "toast-" + id
    //         return (
    //           <Toast nativeID={toastId} variant="accent" action="error">
    //             <ToastTitle>Something went wrong, please try again later</ToastTitle>
    //           </Toast>
    //         )
    //       }
    //     })
    //   }
    // })
  }

  const onClickCheckCoupon = () => {
    if (formik.values.couponcode.length <= 0 || formik.values.couponcode === '') {
      toast.show({
        placement: "bottom",
        render: ({ id }: { id: string }) => {
          const toastId = "toast-" + id
          return (
            <Toast nativeID={toastId} variant="accent" action="error">
              <ToastTitle>Please enter a coupon code</ToastTitle>
            </Toast>
          );
        },
      })
    }
    else {
      let mrp = getTotalPriceFinal(selectedShippingOption)
      const payload = {
        coupon_code: formik.values.couponcode,
        type: "APPOINTMENT",
        userid: authContext?.userInfo?.userId,
        displayMode: "NATIVEAPP",
        Totalmrp: mrp
      }




      useCheckCouponCodeMutation.mutate(payload, {
        onSuccess: (data) => {
          // console.log(data?.data,'Copn');

          toast.show({
            placement: "bottom",
            render: ({ id }: { id: string }) => {
              const toastId = "toast-" + id
              return (
                <Toast nativeID={toastId} variant="accent" action="success">
                  <ToastTitle>Coupon Applied</ToastTitle>
                </Toast>
              );
            },
          })
          setDisCount(data?.data?.result[0]?.discount)

          setApplyCoupon(true)

        },
        onError: (error: any) => {

          toast.show({
            placement: "bottom",
            render: ({ id }: { id: string }) => {
              const toastId = "toast-" + id
              return (
                <Toast nativeID={toastId} variant="accent" action="error">
                  <ToastTitle>Something went wrong, please try again later</ToastTitle>
                </Toast>
              );
            },
          })
        }
      })

    }
  }

  const deleteItemFromCart = (item: any) => {

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


  return (
    <Container statusBarStyle='dark-content' >


      <CHeader title='Cart' />
      <Body>
        <View style={{ width: deviceWidth + responsiveWidth(15), alignSelf: 'center', marginRight: responsiveWidth(2.5), paddingVertical: responsiveHeight(1.5) }} >
          <StepIndicator
            stepCount={4}
            customStyles={customStyles}
            currentPosition={stepCurrentPosition}
            labels={labels}

          />
        </View>


        <CText style={{ backgroundColor: colors.creem, paddingVertical: responsiveHeight(1.5), paddingHorizontal: responsiveWidth(3) }} type='b12' color='#197A50' >{!!cartData ? cartData?.length : 0} Items added</CText>


        <View style={{ flex: 1, borderBottomWidth: responsiveWidth(1.5), borderBottomColor: '#F5F1F1', paddingTop: responsiveHeight(1.5), alignItems: 'center' }}>


          {
            cartData?.map((item, index) => {
              let offPer = ((item?.product_pricing[0]?.selling_price / item?.product_pricing[0]?.buying_price) * 100).toFixed(1)
              return (
                <View key={index?.toString()} style={{ ...styles.flexRow, borderWidth: 1, borderColor: '#E9E3E3', paddingHorizontal: responsiveWidth(2), paddingVertical: responsiveHeight(1.5), width: deviceWidth * 0.92, borderRadius: responsiveWidth(4), marginBottom: responsiveHeight(2), height: responsiveHeight(13), gap: responsiveWidth(1) }} >
                  <Image source={{ uri: `${API_IMAGE_BASE_URL}${item?.images}` }} style={{ borderColor: colors.primary, borderRadius: responsiveWidth(4), borderWidth: 1, width: responsiveWidth(20), height: responsiveHeight(10), resizeMode: 'contain' }} />
                  <View style={{ width: '76%', paddingLeft: responsiveWidth(2), gap: responsiveHeight(0.8), alignSelf: 'center' }} >
                    <View style={{ ...styles.flexRow, justifyContent: 'space-between', alignItems: 'center' }} >
                      {/* <CText type='s12' >{item.name}</CText> */}
                      <Text fontFamily='$InterSemiBold' color={colors.black} fontSize={12} numberOfLines={1} w={'85%'} lineHeight={13} >{item?.name}</Text>
                      <TouchableOpacity activeOpacity={0.6} onPress={() => {
                        deleteItemFromCart(item)
                      }} >
                        <ReportDeleteIcon style={{ alignSelf: 'flex-start', }} width={responsiveWidth(5)} height={responsiveHeight(2.5)} />
                      </TouchableOpacity>

                    </View>

                    {/* <Text fontFamily='$InterRegular' color={colors.black} fontSize={10} numberOfLines={3} w={'85%'} lineHeight={11} >{item?.single_description}</Text> */}

                    <View style={{ ...styles.flexRow, alignItems: 'baseline' }} >
                      <Text fontFamily='$InterBold' color={colors.black} fontSize={14} lineHeight={16} >{item?.symbol}{item?.product_pricing?.length > 0 ? item?.product_pricing[0]?.selling_price : item?.final_price}</Text>
                      <CText type='m12' color='#454444' style={{ textDecorationLine: 'line-through' }} >{item?.product_pricing?.length > 0 && item?.product_pricing[0]?.buying_price}</CText>
                      {item?.product_pricing?.length > 0 && <CText type='m10' style={{ marginTop: responsiveHeight(0.3) }} >  {offPer}%off</CText>}
                    </View>

                    <View style={{ ...styles.flexRow, alignItems: 'baseline', justifyContent: 'space-between' }} >



                      <CText type='s10' >Qty:{item?.qty + 1}</CText>

                      <View style={{ backgroundColor: colors.lightSuccess, borderColor: colors.success, borderWidth: responsiveWidth(0.2), borderRadius: responsiveWidth(1.5), }} >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                          <TouchableOpacity onPress={() => {
                            if (item.qty > 0) {
                              dispatch(removeCartItem(item))
                              dispatch(decreaseQty(item?.id))
                            } else {
                              dispatch(deleteCartItem(item?.id))
                              dispatch(decreaseQty(item?.id))
                            }
                          }} activeOpacity={0.6} >
                            <Text style={{ color: colors.success, ...typography.fontSizes.f20, ...typography.fontWeights.Medium, paddingLeft: responsiveWidth(2), lineHeight: responsiveHeight(3) }}  >-</Text>
                          </TouchableOpacity>


                          <Text style={{ color: colors.black, ...typography.fontSizes.f12, ...typography.fontWeights.SemiBold, paddingHorizontal: responsiveWidth(3), }}  >{item?.qty + 1}</Text>
                          <TouchableOpacity onPress={() => {
                            dispatch(addProductsToCart(item))
                            dispatch(increaseQty(item?.id))
                          }} activeOpacity={0.6} >
                            <Text style={{ color: colors.success, ...typography.fontSizes.f20, ...typography.fontWeights.Medium, paddingRight: responsiveWidth(2), lineHeight: responsiveHeight(3) }}  >+</Text>
                          </TouchableOpacity>
                        </View>

                      </View>

                    </View>

                  </View>
                </View>
              )
            })
          }
        </View>

        <View style={{ borderBottomWidth: responsiveWidth(1.5), borderBottomColor: '#F5F1F1', paddingBottom: responsiveHeight(1.5) }} >
          <View style={{ ...styles.flexRow, ...styles.justifyBetween, paddingHorizontal: responsiveWidth(3), marginVertical: responsiveHeight(2) }} >
            <CText type='s14' >Last Minute Buys</CText>
            <CText type='s12' color='#149C5C' >View All</CText>
          </View>

          {/* <SimilarProduct data={sushainProductData} /> */}


        </View>

        <View style={{ paddingHorizontal: responsiveHeight(2), paddingVertical: responsiveHeight(2.5), borderBottomWidth: responsiveWidth(1.5), borderBottomColor: '#F5F1F1' }} >

          <CText type='r12' >SAVINGS CORNER</CText>

          <View style={localStyles.applyCouponWrapper} >


            {applyCoupon ? <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: responsiveHeight(1), paddingHorizontal: responsiveWidth(2.5), borderWidth: 1, borderStyle: 'dashed', borderColor: colors.primary, borderRadius: responsiveWidth(1.5), flex: 1, justifyContent: 'space-between' }} >
              <CText type='m12' color={colors.primary} >{formik?.values?.couponcode}</CText>
              <Pressable onPress={() => {
                setApplyCoupon(false)
                setDisCount(0)
                formik.setFieldValue('couponcode', '')
              }} >
                <CrossBottomTab />
              </Pressable>

            </View> :
              <>
                <TextInput
                  style={[localStyles.inputTextField,]}
                  value={formik.values.couponcode}
                  onChangeText={formik.handleChange('couponcode')}
                  placeholderTextColor={colors.placeHolderColor}
                  placeholder='Enter Coupon code here'

                />
                <PrimaryButton disabled={useCheckCouponCodeMutation.isPending} loading={useCheckCouponCodeMutation.isPending} onPress={() => { onClickCheckCoupon() }} buttonText='Apply' height={responsiveHeight(5)} />
              </>}


          </View>

        </View>
        <Box backgroundColor='#F5F1F1' h={8} ></Box>
        <Box px={20} py={10} >
          <Text fontFamily='$InterMedium' color={colors.black} fontSize={12} lineHeight={15} >Best Offers For You</Text>

          <Box borderWidth={1} borderColor='#E9E3E3' borderRadius={10} gap={10} overflow='hidden' mt={10} >

            <Text fontFamily='$InterSemiBold' color={colors.black} fontSize={14} lineHeight={17} px={10} pt={10}  >FLAT 5% OFF</Text>
            <Text fontFamily='$InterMedium' color={colors.gray4} fontSize={11} lineHeight={14} px={10} >Use Paytm UPI</Text>

            <Box flexDirection='row' alignItems='center' justifyContent='space-between' px={10} >
              <Box borderWidth={1} borderColor='#E6E1E1' borderRadius={10} px={10} py={5} >
                <Text fontFamily='$InterMedium' color={colors.black} fontSize={12} lineHeight={15} >MED5D</Text>
              </Box>
              <Text fontFamily='$InterSemiBold' color={colors.gray6} fontSize={12} lineHeight={15} >Hide Details</Text>
            </Box>

            <Box borderBottomWidth={1} borderColor='#CBCACA' mx={10} ></Box>

            <Box px={10} gap={5} >
              <Text fontFamily='$InterMedium' color={colors.gray3} fontSize={11} lineHeight={14} >● Valid on total value of items worth 200 or more</Text>
              <Text fontFamily='$InterMedium' color={colors.gray3} fontSize={11} lineHeight={14} >● Maximum discount: 2000</Text>
              <Text fontFamily='$InterMedium' color={colors.gray3} fontSize={11} lineHeight={14} >● Offer valid once per user during offer period</Text>
            </Box>

            <TouchableOpacity onPress={() => { formik.setFieldValue('couponcode', 'RL50') }} activeOpacity={0.6} >
              <Box backgroundColor='#FFEDED' py={15} alignItems='center' >
                <Text fontFamily='$InterMedium' color={'#F64444'} fontSize={14} lineHeight={17} >TAP TO APPLY</Text>
              </Box>

            </TouchableOpacity>


          </Box>
        </Box>
        <Box backgroundColor='#F5F1F1' h={8} ></Box>

        <View style={{ paddingHorizontal: responsiveWidth(3), paddingVertical: responsiveHeight(1.5), borderBottomWidth: responsiveWidth(1.5), borderBottomColor: '#F5F1F1' }} >

          <View style={{ ...styles.flexRow, alignItems: 'center', gap: responsiveWidth(2), marginBottom: responsiveHeight(2) }} >
            <ShippingTrack style={{ alignSelf: 'center' }} />
            <CText style={{ alignSelf: 'flex-end' }} type='s14' >Shipping</CText>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: responsiveHeight(1) }} >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: responsiveWidth(4) }} >
              <TouchableOpacity onPress={() => {
                setSelectedShippingOption(55)
              }} style={{ borderWidth: 1, borderColor: selectedShippingOption === 55 ? colors.primary : colors.primary, paddingHorizontal: responsiveWidth(0.8), paddingVertical: responsiveHeight(0.4), borderRadius: responsiveWidth(4) }} >
                <View style={{ backgroundColor: selectedShippingOption === 55 ? colors.primary : '#F7F9F9', paddingHorizontal: responsiveWidth(1.4), paddingVertical: responsiveHeight(0.7), borderRadius: responsiveWidth(2) }} ></View>
              </TouchableOpacity>
              <CText type='m14' >Normal (5 days)</CText>
            </View>
            <CText type='s14' >{'\u20B9'} 55</CText>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: responsiveWidth(4) }} >
              <TouchableOpacity onPress={() => {
                setSelectedShippingOption(85)
              }} style={{ borderWidth: 1, borderColor: selectedShippingOption === 85 ? colors.primary : colors.primary, paddingHorizontal: responsiveWidth(0.8), paddingVertical: responsiveHeight(0.4), borderRadius: responsiveWidth(4) }} >
                <View style={{ backgroundColor: selectedShippingOption === 85 ? colors.primary : '#F7F9F9', paddingHorizontal: responsiveWidth(1.4), paddingVertical: responsiveHeight(0.7), borderRadius: responsiveWidth(2) }} ></View>
              </TouchableOpacity>
              <CText type='m14' >Express (13 days)</CText>
            </View>
            <CText type='s14' >{'\u20B9'} 85</CText>
          </View>

          <View style={{ borderBottomWidth: 1, borderBottomColor: '#E9E1E1', marginTop: responsiveHeight(1.5) }} ></View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: responsiveHeight(1.5) }} >
            <CText type='m14' >Handling charges</CText>
            <CText type='s14' >{'\u20B9'}{getTotalPriceHandlingCharge()}</CText>
          </View>


        </View>

        <View style={{ paddingHorizontal: responsiveWidth(3), paddingVertical: responsiveHeight(1.5), borderBottomWidth: responsiveWidth(1.5), borderBottomColor: '#F5F1F1' }} >

          <View style={{ ...styles.flexRow, alignItems: 'center', gap: responsiveWidth(2), marginBottom: responsiveHeight(2) }} >
            <CartPayIcon style={{ alignSelf: 'center' }} />
            <CText style={{ alignSelf: 'flex-end' }} type='s14' >Payment Mode</CText>
          </View>

          <View style={{ marginBottom: responsiveHeight(1) }} >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: responsiveWidth(4) }} >
              <TouchableOpacity onPress={() => {
                setCOD(0)
              }} style={{ borderWidth: 1, borderColor: !(!!COD) ? colors.primary : colors.primary, paddingHorizontal: responsiveWidth(0.8), paddingVertical: responsiveHeight(0.4), borderRadius: responsiveWidth(4) }} >
                <View style={{ backgroundColor: !(!!COD) ? colors.primary : '#F7F9F9', paddingHorizontal: responsiveWidth(1.4), paddingVertical: responsiveHeight(0.7), borderRadius: responsiveWidth(2) }} ></View>
              </TouchableOpacity>
              <CText type='m14' >Pre-Paid</CText>
            </View>

          </View>

          {(settingData?.data?.result[0]?.generalSettings?.cod_min_amount < getTotalPriceCart() && settingData?.data?.result[0]?.generalSettings?.cod_max_amount > getTotalPriceCart()) && <View style={{}} >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: responsiveWidth(4) }} >
              <TouchableOpacity onPress={() => {
                setCOD(settingData?.data?.result[0]?.generalSettings?.cod_charges)
              }} style={{ borderWidth: 1, borderColor: !!COD ? colors.primary : colors.primary, paddingHorizontal: responsiveWidth(0.8), paddingVertical: responsiveHeight(0.4), borderRadius: responsiveWidth(4) }} >
                <View style={{ backgroundColor: !!COD ? colors.primary : '#F7F9F9', paddingHorizontal: responsiveWidth(1.4), paddingVertical: responsiveHeight(0.7), borderRadius: responsiveWidth(2) }} ></View>
              </TouchableOpacity>
              <CText type='m14' >Cash On Delivery</CText>
            </View>

          </View>}

          {(settingData?.data?.result[0]?.generalSettings?.cod_min_amount < getTotalPriceCart() && settingData?.data?.result[0]?.generalSettings?.cod_max_amount > getTotalPriceCart() && !!COD) && <View style={{ borderBottomWidth: 1, borderBottomColor: '#E9E1E1', marginTop: responsiveHeight(1.5) }} ></View>}

          {(settingData?.data?.result[0]?.generalSettings?.cod_min_amount < getTotalPriceCart() && settingData?.data?.result[0]?.generalSettings?.cod_max_amount > getTotalPriceCart() && !!COD) && <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: responsiveHeight(1.5) }} >
            <CText type='m14' >COD charges</CText>
            <CText type='s14' >{'\u20B9'}{settingData?.data?.result[0]?.generalSettings?.cod_charges}</CText>
          </View>}


        </View>


        <View style={{ paddingHorizontal: responsiveWidth(3), paddingVertical: responsiveHeight(1.5), gap: responsiveHeight(0.7) }} >

          <CText type='s14' style={{ marginBottom: responsiveHeight(2) }} >Price Details ({!!cartData ? cartData?.length : 0} Items)</CText>

          <View style={{ ...styles.flexRow, alignItems: 'center', justifyContent: 'space-between' }} >
            <CText type='r12' color='#565353' >Total Product Price</CText>
            <CText type='m12' >{'\u20B9'} {getTotalPriceCart()}</CText>
          </View>

          {!!disCount && <View style={{ ...styles.flexRow, alignItems: 'center', justifyContent: 'space-between' }} >
            <CText type='r12' color='#565353' >Total Discount</CText>
            <CText type='m12' >-{disCount}</CText>
          </View>}
          <View style={{ ...styles.flexRow, alignItems: 'center', justifyContent: 'space-between' }} >
            <CText type='r12' color='#565353' >Shipping/ Handling Fee</CText>
            <CText type='m12' >{'\u20B9'}{selectedShippingOption + getTotalPriceHandlingCharge()}</CText>
          </View>
          {(!!COD && (settingData?.data?.result[0]?.generalSettings?.cod_min_amount < getTotalPriceCart() && settingData?.data?.result[0]?.generalSettings?.cod_max_amount > getTotalPriceCart())) && <View style={{ ...styles.flexRow, alignItems: 'center', justifyContent: 'space-between' }} >
            <CText type='r12' color='#565353' >COD Charges</CText>
            <CText type='m12' >{'\u20B9'}{55}</CText>
          </View>}

          <View style={{ borderBottomWidth: 1, borderBottomColor: '#E9E1E1', marginVertical: responsiveHeight(0.4) }} ></View>

          <View style={{ ...styles.flexRow, alignItems: 'center', justifyContent: 'space-between' }} >
            <CText type='s14' >Order Total</CText>
            <CText type='b14' >{'\u20B9'}{getTotalPriceFinal(selectedShippingOption)}</CText>
          </View>


        </View>


        <View style={{ alignSelf: 'center', flexDirection: 'row', alignItems: 'center', backgroundColor: colors.creem, paddingHorizontal: responsiveWidth(24), paddingVertical: responsiveHeight(1.5), marginVertical: responsiveHeight(6) }} >
          <GreenCouponPercent />
          <CText type='m10' color={colors.success} >  Yay! Your total discount is </CText>
          <CText type='b12' color={colors.success} >{'\u20B9'} 50</CText>
        </View>

      </Body>
      <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#FBEADE', height: responsiveHeight(9), justifyContent: 'space-between', paddingHorizontal: responsiveWidth(3.5), borderTopLeftRadius: responsiveWidth(4), borderTopRightRadius: responsiveWidth(4) }}  >

        <Text style={{ color: colors.black, ...typography.fontSizes.f16, ...typography.fontWeights.Bold, }}>Total Price: {'\u20B9'}{getTotalPriceFinal(selectedShippingOption)}</Text>

        <TouchableOpacity activeOpacity={0.6} onPress={() => { createOrder() }}  >
          <View style={{ backgroundColor: '#FD872E', paddingHorizontal: responsiveWidth(5), paddingVertical: responsiveHeight(1), flexDirection: 'row', alignItems: 'center', gap: responsiveWidth(1.5), borderRadius: responsiveWidth(3) }} >

            <Text style={{ color: colors.white, ...typography.fontSizes.f12, ...typography.fontWeights.Bold, }} >Continue</Text>
          </View>
        </TouchableOpacity>

      </View>
    </Container>
  )
}

export default Cart

const localStyles = StyleSheet.create({

  applyCouponWrapper: {
    backgroundColor: colors.white,
    // marginTop: responsiveHeight(1),
    flexDirection: 'row',
    paddingVertical: responsiveHeight(1.5),
    alignItems: 'center',
    // paddingHorizontal: responsiveWidth(4),
    justifyContent: 'space-between',


  },
  applyCouponText: {
    color: colors.black,
    ...typography.fontWeights.Regular,
    fontSize: responsiveFontSize(1.7)
  },
  inputTextField: {
    color: colors.black,
    ...typography.fontSizes.f12,
    ...typography.fontWeights.Medium,
    flex: 1,
    borderWidth: 1,
    borderColor: colors.primary,
    // ...styles.ph10,
    paddingHorizontal: responsiveWidth(2.4),
    height: responsiveHeight(5),
    borderRadius: responsiveWidth(1.5),
    // , ...styles.mv5
    // marginVertical:responsiveHeight(1.4),
    marginRight: responsiveWidth(3)
  }
})