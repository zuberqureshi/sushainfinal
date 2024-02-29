import { StyleSheet, TouchableOpacity, View, Text, Modal, FlatList, TextInput, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FlashList } from '@shopify/flash-list';
import { Dropdown } from 'react-native-element-dropdown';
import {
  CFErrorResponse,
  CFPaymentGatewayService,
} from 'react-native-cashfree-pg-sdk';
import {
  CFDropCheckoutPayment,
  CFEnvironment,
  CFPaymentComponentBuilder,
  CFPaymentModes,
  CFSession,
  CFThemeBuilder,
} from 'cashfree-pg-api-contract';
// local imports
import CSafeAreaView from '../../components/common/CSafeAreaView';
import CHeader from '../../components/common/CHeader';
import strings from '../../i18n/strings';
import { BottomIcon, EveningSlotIcon, MorningSlotIcon, BottomIconWhite, CrossIconBlack, CrossBottomTab } from '../../assets/svgs';
import CText from '../../components/common/CText';
import { colors, styles } from '../../themes';
import typography from '../../themes/typography';
import { deviceHeight, deviceWidth, moderateScale } from '../../common/constants';
import { Formik, useFormik } from 'formik'


import { genderData, bookingFor } from '../../api/constant';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackNav } from '../../navigation/NavigationKeys';
import CheckBox from 'react-native-check-box';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import moment from 'moment';
import DatePicker, { getToday, getFormatedDate } from 'react-native-modern-datepicker';
import { Container } from '../../components/Container';
import Body from '../../components/Body/Body';
import useGetDoctorsAllSlots from '../../hooks/doctor/get-doctor-all-slots';
import { patientBookingValidationSchema } from '../../utils/validators';
import { Box, Button, ButtonText, SelectItemText, Toast, ToastDescription, ToastTitle, VStack, useToast } from '@gluestack-ui/themed';
import useCheckCouponCode from '../../hooks/booking/check-coupon-code';
import PrimaryButton from '../../components/common/Button/PrimaryButton';
import { Spinner } from '@gluestack-ui/themed';
import useCreateConsultation from '../../hooks/booking/create-consultation';
import Loader from '../../components/Loader/Loader';
import { getAccessToken } from '../../utils/network';
import useCheckPayment from '../../hooks/booking/verify-payment';


// import RNPgReactNativeSDK from 'react-native-pg-react-native-sdk';
interface Props {
  route: any;
  navigation: any;
}
export default function SelectTimeSlot({ route, }: Props) {

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  //states
  const [applyCoupon, setApplyCoupon] = useState(false);
  const [coloredCheckBoxValue, setColoredCheckBoxValue] = useState(false);
  const [selectedDateOption, setSelectedDateOption] = useState(0)
  const [datePickerModel, setDatePickerModel] = useState(false)
  const [payPrice, setPayPrice] = useState('')
  const [userInfo, setUserInfo] = useState();


  //init
  const { doctorid, doctorslots,instantconsultation , doctorfees } = route.params;
  // console.log({doctorid});
  
  const { data: allSlotsData, isLoading } = useGetDoctorsAllSlots()
  const useCheckCouponCodeMutation = useCheckCouponCode()
  const useCreateConsultationMutation = useCreateConsultation()
  const useCheckPaymentMutation = useCheckPayment()


  const toast = useToast()

  const doctorSlotsArray = doctorslots.split(',').map(Number)
  const today = new Date()
  const startDate = getFormatedDate(today.setDate(today.getDate()), 'YYYY-MM-DD')

  const slotListMorningArray = allSlotsData?.data?.result[0]?.slotListMorning?.filter(item => doctorSlotsArray.includes(item?.id)).map(item => item);
  const slotListEveningArray = allSlotsData?.data?.result[0]?.slotListEvening?.filter(item => doctorSlotsArray.includes(item?.id)).map(item => item);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { bookingfor: "", patientname: "", patientnumber: "", patientage: "", patientweight: "", patientgender: "", slotdateday: startDate, slottimeid: "", couponcode: "" },
    validationSchema: patientBookingValidationSchema,
    onSubmit: values => {
      // updateProfile(values.country,values.address,values.name,values.mobile)
      // console.log('updatePatient', values);
      // action.resetForm()
      // loadUserInfo();
     
      if(coloredCheckBoxValue){
        if (!(!!values.slottimeid) || !(!!values.slotdateday)) {
          toast.show({
            placement: "bottom",
            render: ({ id }) => {
              const toastId = "toast-" + id
              return (
                <Toast nativeID={toastId} action="error" variant="accent">
                  <VStack space="xs">
                    <ToastTitle>Please select slottime and date</ToastTitle>
  
                  </VStack>
                </Toast>
              )
            },
          })
  
        } else {
          const payload = {
            userId: userInfo?.userId,
            doc_id: doctorid,
            slot_id: formik.values.slottimeid,
            booking_date: formik.values.slotdateday,
            voucher: '',
            instant_consultation: instantconsultation,  // YES , NO 
            bookingspecilization: "",
            usercity: "Gwalior",
            country_code: "IN",
            person_name: formik.values.patientname,
            person: formik.values.bookingfor,
            person_age: formik.values.patientage,
            person_mobile: formik.values.patientnumber,
            person_weight: formik.values.patientweight,
            person_gender: formik.values.patientgender,
            followup:"NO"  ,   //YES , NO
            type:"virtual", // virtual , CLINIC
            device_name:"Android honor7x",
            device_type:"NATIVEAPP"
          }
  
          console.log({payload});
          
  
          useCreateConsultationMutation.mutate(payload, {
            onSuccess: (data) => {
              console.log(data?.data,'susuuscc');
  
              if(data?.data?.success){
                // toast.show({
                //   placement: "bottom",
                //   render: ({ id }: { id: string }) => {
                //     const toastId = "toast-" + id
                //     return (
                //       <Toast nativeID={toastId} variant="accent" action="success">
                //         <ToastTitle>Submit Succesfully</ToastTitle>
                //       </Toast>
                //     );
                //   },
                // })
               startCheckout(data?.data?.result[0]?.paymentCreatedData?.payment_session_id,data?.data?.result[0]?.paymentCreatedData?.order_id)
              //  formik.resetForm()
              }else{
                toast.show({
                  placement: "bottom",
                  render: ({ id }: { id: string }) => {
                    const toastId = "toast-" + id
                    return (
                      <Toast nativeID={toastId} variant="accent" action="warning">
                        <ToastTitle>{data?.data?.message}</ToastTitle>
                      </Toast>
                    );
                  },
                })
              }
              // setPayPrice(data?.data?.result[0]?.finalPrice)
              // setApplyCoupon(true)
  
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
      }else{
         
        toast.show({
          placement: "bottom",
          render: ({ id }: { id: string }) => {
            const toastId = "toast-" + id
            return (
              <Toast nativeID={toastId} variant="accent" action="warning" >
                <ToastTitle>Please accept T&C</ToastTitle>
              </Toast>
            );
          },
        })
      }

    
    },

  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Set the callback for CFPaymentGatewayService
        CFPaymentGatewayService.setCallback({
          onVerify(orderID: string): void {
            console.log('success ', orderID);
            //  mstStore.cartStore.emptyCart(mstStore.otpStore.userId);

            useCheckPaymentMutation.mutate(orderID, {
              onSuccess: (data) => {
                console.log(data?.data,'erfyyy');
    
                if(data?.data?.success){
                  toast.show({
                    placement: "bottom",
                    render: ({ id }: { id: string }) => {
                      const toastId = "toast-" + id
                      return (
                        <Toast nativeID={toastId} variant="accent" action="success">
                          <ToastTitle>Appointment booked Succesfully</ToastTitle>
                        </Toast>
                      );
                    },
                  })
                  formik.resetForm()
                  navigation.navigate(StackNav.AppointmentBooked,{appid:data?.data?.result[0]?.detail?.orderId , userinfo : userInfo})
                //  startCheckout(data?.data?.result[0]?.paymentCreatedData?.payment_session_id,data?.data?.result[0]?.paymentCreatedData?.order_id)
                }else{
                  toast.show({
                    placement: "bottom",
                    render: ({ id }: { id: string }) => {
                      const toastId = "toast-" + id
                      return (
                        <Toast nativeID={toastId} variant="accent" action="warning">
                          <ToastTitle>{data?.data?.message}</ToastTitle>
                        </Toast>
                      );
                    },
                  })
                }
                // setPayPrice(data?.data?.result[0]?.finalPrice)
                // setApplyCoupon(true)
    
              },
              onError: (error: any) => {
                console.log(error,'erfyyy ERROR');
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

            // toast.show({
            //   placement: "bottom",
            //   render: ({ id }: { id: string }) => {
            //     const toastId = "toast-" + id
            //     return (
            //       <Toast nativeID={toastId} variant="accent" action="success">
            //         <ToastTitle>Appointment booked Succesfully</ToastTitle>
            //       </Toast>
            //     );
            //   },
            // })

            // navigation.navigate(StackNav.AppointmentBooked,{appid:orderID});

          },
          onError(error: CFErrorResponse, orderID: string): void {
            console.log('failed ', orderID);
            // navigation.navigate(NAVIGATION.PaymentFailed);
          },
        });
  
        // Fetch user info
        const userInfo = await getAccessToken('userInfo');
        setUserInfo(JSON.parse(userInfo));
      } catch (error) {
        console.error('Error in fetching data:', error);
      }
    };
  
    fetchData();
  
    return () => {
      // Remove the callback for CFPaymentGatewayService
      CFPaymentGatewayService?.removeCallback();
    };
  }, []);
  

  

  const startCheckout = (sessionId,orderId) => {
    try {
      const session = new CFSession(
        sessionId,
        orderId,
        CFEnvironment.SANDBOX
      );
      const paymentModes = new CFPaymentComponentBuilder()
        .add(CFPaymentModes.CARD)
        .add(CFPaymentModes.UPI)
        .add(CFPaymentModes.NB)
        .add(CFPaymentModes.WALLET)
        .add(CFPaymentModes.PAY_LATER)
        .build();
      const theme = new CFThemeBuilder()
        .setNavigationBarBackgroundColor('#49b0c5')
        .setNavigationBarTextColor('#FFFFFF')
        .setButtonBackgroundColor('#80b841')
        .setButtonTextColor('#FFFFFF')
        .setPrimaryTextColor('#212121')
        .setSecondaryTextColor('#757575')
        .build();
      const dropPayment = new CFDropCheckoutPayment(
        session,
        paymentModes,
        theme
      );
      CFPaymentGatewayService.doPayment(dropPayment);
    } catch (e: any) {
      console.log('startcheckout eeror ', e.message);
    }
  }



  const onClickCheckCoupon = () => {
 if(formik.values.couponcode.length<=0 || formik.values.couponcode === '' ){
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
 else{
    const payload = {
      coupon_code: formik.values.couponcode,
      type: "APPOINTMENT",
      userid: '',
      displayMode: "NATIVEAPP",
      Totalmrp: doctorfees
    }

    useCheckCouponCodeMutation.mutate(payload, {
      onSuccess: (data) => {
        console.log(data?.data?.result[0]?.finalPrice);

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
        setPayPrice(data?.data?.result[0]?.finalPrice)
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






  // console.log('date see ',selectedDate);

  // Get the current date
  const currentDate = moment();

  // Array to store the next five dates
  const nextFiveDates:any = [];

  // Loop to add the next five dates to the array
  for (let i = 0; i <= 4; i++) {
    const nextDate: any = moment(currentDate).add(i, 'days');
    nextFiveDates.push(nextDate.format('YYYY-MM-DD'));
  }


 

  if(!(!!slotListMorningArray) || !(!!slotListEveningArray)){
    return(
      <Container statusBarStyle='dark-content' >
      <CHeader title={strings.selectTimeSlot}  />
      <Loader/>
    </Container>
    )
  }


  const renderSlotItem = ({ item, index }: any) => {
    const date = new Date(item?.slot_start_time);


    // Specify Indian Standard Time zone offset
    const ISTOffset = 5.5 * 60 * 60 * 1000; // 5.5 hours in milliseconds

    // Adjust the date to IST by subtracting the offset
    date.setTime(date.getTime() - ISTOffset);

    // Format options for time
    const timeOptions: any = { hour: 'numeric', minute: '2-digit', hour12: true };

    // Get formatted time in Indian Standard Time
    const formattedTime = date.toLocaleTimeString(undefined, timeOptions);
    return (
      <>
        {item?.slot === 'MORNING' && <TouchableOpacity onPress={() => { formik.setFieldValue('slottimeid', item?.id) }} style={[localStyles.slotContainer, { backgroundColor: formik.values.slottimeid === item?.id ? colors.primary : colors.white }]}>
          <CText type="m10" color={formik.values.slottimeid === item?.id ? colors.white : colors.black}>{formattedTime}</CText>
        </TouchableOpacity>}
      </>

    );
  };

  const renderEveningSlotItem = ({ item, index }: any) => {
    const date = new Date(item?.slot_start_time);


    // Specify Indian Standard Time zone offset
    const ISTOffset = 5.5 * 60 * 60 * 1000; // 5.5 hours in milliseconds

    // Adjust the date to IST by subtracting the offset
    date.setTime(date.getTime() - ISTOffset);

    // Format options for time
    const timeOptions: any = { hour: 'numeric', minute: '2-digit', hour12: true };

    // Get formatted time in Indian Standard Time
    const formattedTime = date.toLocaleTimeString(undefined, timeOptions);

    return (
      <>
        {item?.slot === 'EVENING' && <TouchableOpacity onPress={() => { formik.setFieldValue('slottimeid', item?.id) }} style={[localStyles.slotContainer, { backgroundColor: formik.values.slottimeid === item?.id ? colors.primary : colors.white }]}>
          <CText type="m10" color={formik.values.slottimeid === item?.id ? colors.white : colors.black} >{formattedTime}</CText>
        </TouchableOpacity>}
      </>

    );
  };

  const renderNoSlotItem = ({ item, index }: any) => {
    return (
      <View>
        <CText type="r14" numberOfLines={1} color={colors.success}>
          No Slots Available
        </CText>
      </View>
    );
  };

  return (
    <Container statusBarStyle='dark-content' >
      <CHeader title={strings.selectTimeSlot} />
      <Body contentContainerStyle={localStyles.mainRoot}>

        <View>



          <CText type="s12" style={localStyles.labelStyle}>
            {'Booking For'}
          </CText>
          <Dropdown
            style={localStyles.dropdown}
            placeholderStyle={localStyles.placeholderStyle}
            selectedTextStyle={localStyles.selectedTextStyle}
            data={bookingFor}
            labelField="label"
            valueField="value"
            placeholder={'Relationship With user'}
            value={formik.values.bookingfor}
            onChange={(item) => { formik.setFieldValue('bookingfor', item?.value) }}
            renderRightIcon={() => <BottomIcon />}
            itemTextStyle={localStyles.selectedTextStyle}
            itemContainerStyle={localStyles.itemContainerStyle}
          />

          <CText type="s12" style={localStyles.labelStyle}>
            {strings.patientName}
          </CText>

          <TextInput
            value={formik.values.patientname}
            style={localStyles.inputTextField}
            onChangeText={formik.handleChange('patientname')}
            onBlur={formik.handleBlur('patientname')}
            placeholderTextColor={colors.placeHolderColor}
            placeholder={strings.enterPatientName}

          />
          {(formik.errors.patientname && formik.touched.patientname) ? <Text style={{ color: 'red', paddingHorizontal: responsiveWidth(0.7) }}>{formik.errors.patientname}</Text> : null}

          <CText type="s12" style={styles.mt5}>
            {strings.patientMobileNo}
          </CText>

          <TextInput
            value={formik.values.patientnumber}
            style={localStyles.inputTextField}
            onChangeText={formik.handleChange('patientnumber')}
            onBlur={formik.handleBlur('patientnumber')}
            placeholderTextColor={colors.placeHolderColor}
            placeholder={strings.enterPatientNumber}
            keyboardType='number-pad'

          />
          {(formik.errors.patientnumber && formik.touched.patientnumber) ? <Text style={{ color: 'red', paddingHorizontal: responsiveWidth(0.7) }}>{formik.errors.patientnumber}</Text> : null}
          <View style={localStyles.ageGenderContainer}>
            <View style={localStyles.widthStyle}>
              <CText type="s12">{strings.patientAge}</CText>
              <TextInput
                value={formik.values.patientage}
                style={localStyles.inputTextField}
                onChangeText={formik.handleChange('patientage')}
                onBlur={formik.handleBlur('patientage')}
                placeholderTextColor={colors.placeHolderColor}
                placeholder={strings.age}
                keyboardType='number-pad'

              />
              {(formik.errors.patientage && formik.touched.patientage) ? <Text style={{ color: 'red', paddingHorizontal: responsiveWidth(0.7) }}>{formik.errors.patientage}</Text> : null}
            </View>
            <View style={localStyles.widthStyle}>
              <CText type="s12">{strings.patientWeight}</CText>
              <TextInput
                value={formik.values.patientweight}
                style={localStyles.inputTextField}
                onChangeText={formik.handleChange('patientweight')}
                onBlur={formik.handleBlur('patientweight')}
                placeholderTextColor={colors.placeHolderColor}
                placeholder={strings.weight}
                keyboardType='number-pad'

              />
              {(formik.errors.patientweight && formik.touched.patientweight) ? <Text style={{ color: 'red', paddingHorizontal: responsiveWidth(0.7) }}>{formik.errors.patientweight}</Text> : null}
            </View>
            <View style={localStyles.widthStyle}>
              <CText type="s12">{strings.PatientGender}</CText>
              <Dropdown
                style={localStyles.dropdown}
                placeholderStyle={localStyles.placeholderStyle}
                selectedTextStyle={localStyles.selectedTextStyle}
                data={genderData}
                labelField="label"
                valueField="value"
                placeholder={strings.gender}
                value={formik.values.patientgender}
                onChange={(item) => { formik.setFieldValue('patientgender', item?.value) }}
                renderRightIcon={() => <BottomIcon />}
                itemTextStyle={localStyles.selectedTextStyle}
                itemContainerStyle={localStyles.itemContainerStyle}
              />
            </View>
          </View>

          <View style={{ marginTop: responsiveHeight(2) }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
              <Text style={{
                color: colors.black, ...typography.fontSizes.f12,
                ...typography.fontWeights.SemiBold,
              }} >{strings.SelectDateDay}</Text>

              <TouchableOpacity activeOpacity={0.6} onPress={() => { setDatePickerModel(!datePickerModel) }} >

                <View style={{ backgroundColor: colors.primary, flexDirection: 'row', paddingHorizontal: responsiveWidth(3.5), paddingVertical: responsiveHeight(0.5), borderRadius: responsiveWidth(2), gap: responsiveWidth(1) }} >
                  <Text style={{
                    color: colors.white, ...typography.fontSizes.f10,
                    ...typography.fontWeights.SemiBold,
                  }} >{moment(currentDate).format('MMM')},{moment(currentDate).format('YYYY')}</Text>
                  <BottomIconWhite />
                </View>

              </TouchableOpacity>

            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: responsiveHeight(2.5) }} >

              {
                nextFiveDates.map((item, index) => {



                  return (
                    <TouchableOpacity key={index.toString()} activeOpacity={0.6} onPress={() => {
                      setSelectedDateOption(index)
                      formik.setFieldValue('slotdateday', item)
                    }} >
                      <View style={{ backgroundColor: formik.values.slotdateday === item ? colors.primary : colors.white, paddingHorizontal: responsiveWidth(3.5), paddingVertical: responsiveHeight(1.5), gap: responsiveHeight(1.5), justifyContent: 'center', alignItems: 'center', borderRadius: responsiveWidth(3) }} >
                        <Text style={{ color: formik.values.slotdateday === item ? colors.white : colors.black, ...typography.fontSizes.f12, ...typography.fontWeights.Medium, }} >{moment(item).format('ddd')}</Text>
                        <Text style={{ color: formik.values.slotdateday === item ? colors.white : colors.black, ...typography.fontSizes.f12, ...typography.fontWeights.Medium, }}>{moment(item).format('D')}</Text>
                      </View>

                    </TouchableOpacity>
                  )
                })
              }

            </View>
          </View>

          <CText type="m14" style={styles.mt10}>
            {strings.timeAvailable}
          </CText>
          <View style={localStyles.rowStyle}>
            <MorningSlotIcon />
            <CText type="r12" style={styles.ph5}>
              {strings.morningSlots}
            </CText>
          </View>
          <View style={{}}>
            {!!slotListMorningArray ? <FlashList
              data={slotListMorningArray}
              renderItem={renderSlotItem}
              keyExtractor={(item, index) => index.toString()}
              numColumns={5}
              ListEmptyComponent={() => {
                return (
                  <CText type="r14" numberOfLines={1} color={colors.success}>
                    No Slots Available
                  </CText>)
              }}
              estimatedItemSize={100}
            // justifyContent="space-between"
            /> : <Spinner size={'small'} color={colors.primary} />}
          </View>

          <View style={localStyles.rowStyle}>
            <EveningSlotIcon />
            <CText type="r12" style={styles.ph5}>
              {strings.eveningsSlots}
            </CText>
          </View>

          <View style={{}} >
            {!!slotListEveningArray ? <FlashList
              data={slotListEveningArray}
              renderItem={renderEveningSlotItem}
              keyExtractor={(item, index) => index.toString()}
              numColumns={5}
              ListEmptyComponent={() => {
                return (
                  <CText type="r14" numberOfLines={1} color={colors.success}>
                    No Slots Available
                  </CText>)
              }}
              estimatedItemSize={100}
            // justifyContent="space-between"
            /> : <Spinner size={'small'} color={colors.primary} />}
          </View>




          <View style={localStyles.couponStyle}>



            {applyCoupon ? <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: responsiveHeight(1), paddingHorizontal: responsiveWidth(2.5), borderWidth: 1, borderStyle: 'dashed', borderColor: colors.primary, borderRadius: responsiveWidth(1.5), flex: 1, justifyContent: 'space-between', marginLeft: responsiveWidth(1.4) }} >
              <CText type='m12' color={colors.primary} >{formik.values.couponcode}</CText>
              <Pressable onPress={() => {
                setApplyCoupon(false)
                setPayPrice('')
                formik.setFieldValue('couponcode', '')
              }} >
                <CrossBottomTab />
              </Pressable>

            </View> :
              <>
                <TextInput
                  style={[localStyles.inputTextField, { marginLeft: responsiveWidth(1.3) }]}
                  value={formik.values.couponcode}
                  onChangeText={formik.handleChange('couponcode')}
                  placeholderTextColor={colors.placeHolderColor}
                  placeholder='Enter Coupon code here'

                />
                <PrimaryButton disabled={useCheckCouponCodeMutation.isPending} onPress={() => { onClickCheckCoupon() }} loading={useCheckCouponCodeMutation.isPending} buttonText='Apply' height={responsiveHeight(5)} />
              </>}





          </View>



          <View style={localStyles.termStyle}>
            <CheckBox
              containerStyle={{}}
              isChecked={coloredCheckBoxValue}
              checkBoxColor={'#D0D0D0'}
              onClick={() => { setColoredCheckBoxValue(!coloredCheckBoxValue) }}
              checkedCheckBoxColor={colors.primary}
            />
            <CText type="r12" color={colors.gray} style={{ width: responsiveWidth(75), marginLeft: responsiveWidth(4) }} >
              {strings.Iagreetothese}
              <CText
                suppressHighlighting={true}
                type="r12"
                style={[
                  localStyles.underLineStyle,
                  {
                    textDecorationColor: colors.primary,
                  },
                ]}
                color={colors.primary}>
                {strings.TermsandConditions}
              </CText>
              {' & '}
              <CText
                suppressHighlighting={true}
                type="r12"
                style={[
                  localStyles.underLineStyle,
                  {
                    textDecorationColor: colors.primary,
                  },
                ]}
                color={colors.primary}>
                {strings.cancelPolicy}
              </CText>
            </CText>
          </View>
          <View style={localStyles.btnSection}>
            <Button borderRadius={6} backgroundColor={colors.lightwhite} height={42} onPress={() => { }} >

              <ButtonText fontSize={14} fontFamily='$InterRegular' color={colors.black} >{strings.cancel} </ButtonText>

            </Button>


            <Button borderRadius={6} disabled={useCreateConsultationMutation.isPending} backgroundColor={useCreateConsultationMutation.isPending ? 'gray' : colors.success} height={42} onPress={formik.handleSubmit} >

              <ButtonText fontSize={14} fontFamily='$InterRegular' color={colors.white} >{strings.pay} </ButtonText>
              <ButtonText fontSize={14} fontFamily='$InterSemiBold' color={colors.white}>{!!payPrice ? `${payPrice} ` : !!doctorfees ? doctorfees : 'N/A' }</ButtonText>
              {!!payPrice && <ButtonText fontSize={12} fontFamily='$InterRegula' textDecorationLine='line-through' color={colors.white} >{'715'}</ButtonText>}
              {useCreateConsultationMutation.isPending && <Spinner color="white" size={20} ml={7} />}
            </Button>
          </View>


          <Modal
            animationType='slide'
            transparent={true}
            visible={datePickerModel}
          >

            <View style={localStyles.modalCenterView} >

              <View style={localStyles.modalView}>


                <DatePicker
                  mode='calendar'
                  selected={formik.values.slotdateday}
                  onDateChange={(propDate) => { formik.setFieldValue('slotdateday', moment(propDate, 'YYYY/MM/DD').format('YYYY-MM-DD')) }}
                  minimumDate={startDate}
                />


                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
                  <TouchableOpacity activeOpacity={0.6} onPress={() => { setDatePickerModel(false) }} >

                    <Text style={{ color: colors.black, ...typography.fontSizes.f12, ...typography.fontWeights.Medium, }} >{strings.cancel}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => { setDatePickerModel(false) }} style={{ backgroundColor: colors.success, paddingHorizontal: responsiveWidth(2.5), paddingVertical: responsiveHeight(0.5), borderRadius: responsiveWidth(2) }} >

                    <Text style={{ color: colors.white, ...typography.fontSizes.f14, ...typography.fontWeights.Bold, }} >Done</Text>
                  </TouchableOpacity>
                </View>


              </View>
            </View>


          </Modal>

        </View>

      </Body>
      <Modal
        animationType="slide"
        transparent={true}
        visible={useCheckPaymentMutation.isPending}
      // onRequestClose={() => setModalVisible(false)}
      >
        <Box flex={1} justifyContent='center' alignItems='center' backgroundColor='rgba(0, 0, 0, 0.5)' >
          <Box backgroundColor='#fff' borderRadius={10} alignItems='center' justifyContent='center' elevation={5} w={'55%'} h={'15%'} gap={10} >
            {/* <Box alignItems='center' gap={5} >
              <OppsIcon />
              <Text style={{ color: colors.white, ...typography.fontSizes.f14, ...typography.fontWeights.Bold, }} >Done</Text>
              <Text fontFamily='$InterSemiBold' color={colors.black} textAlign='center' fontSize={18} mt={3} >Oops!</Text>
              <Text fontFamily='$InterRegular' color={'#767474'} textAlign='center' fontSize={13} >MeetID Not Found</Text>

              <PrimaryButton onPress={() => { navigation.goBack() }} buttonText='Try again' height={35} />
            </Box> */}
            <Text style={{ color: colors.black, ...typography.fontSizes.f14, ...typography.fontWeights.Bold, }} >Please wait</Text>

            {/* <Button title="Close" onPress={() => setModalVisible(false)} /> */}
            <Spinner size={'large'} color={colors.primary} />
          </Box>
        </Box>
      </Modal>
    </Container>
  );
}

const localStyles = StyleSheet.create({
  mainRoot: {
    ...styles.ph20,
  },
  dropdown: {
    borderColor: colors.primary,
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(6),
    height: moderateScale(26),
    ...styles.pv20,
    ...styles.ph10,
    ...styles.mt5,
  },
  labelStyle: {
    ...styles.mt15,
  },
  placeholderStyle: {
    ...typography.fontSizes.f12,
    ...typography.fontWeights.Medium,
    color: colors.placeHolderColor,
  },
  selectedTextStyle: {
    ...typography.fontSizes.f12,
    ...typography.fontWeights.Medium,
    color: colors.black,
  },
  itemContainerStyle: {
    // ...styles.ph10,
    // backgroundColor: 'red',
  },
  patientNameTxt: {
    borderColor: colors.primary,
    height: moderateScale(26),
    ...styles.pv20,
  },
  placeSty: {
    height: moderateScale(40),
    ...typography.fontSizes.f12,
    ...typography.fontWeights.Medium,
  },
  ageGenderContainer: {
    ...styles.flexRow,
    ...styles.justifyBetween,
    ...styles.mt5,
  },
  widthStyle: {
    width: '30%',
  },
  rowStyle: {
    ...styles.flexRow,
    ...styles.itemsCenter,
    ...styles.mt10,
  },
  slotContainer: {
    ...styles.center,
    ...styles.mh5,
    ...styles.mv10,
    height: moderateScale(31),
    width: moderateScale(60),
    borderRadius: moderateScale(4),
    borderWidth: moderateScale(1),
    borderColor: colors.primary,

  },
  btnSection: {
    ...styles.rowSpaceBetween,
    marginLeft: responsiveWidth(1.4),
    // alignItems:'center',
    marginBottom: responsiveHeight(2.5)
  },
  btn: {
    backgroundColor: colors.lightwhite,
    ...styles.ph10,
    ...styles.pv10,
    borderRadius: 10,
    // width: moderateScale(100),
    ...styles.justifyCenter,
    ...styles.center,

  },
  couponStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsiveWidth(3.5),
    marginVertical: responsiveHeight(2.5)
    //  paddingHorizontal:responsiveWidth(1.5)

  },
  termStyle: {
    ...styles.flexRow,
    ...styles.itemsCenter,
    alignItems: 'center',
    marginBottom: responsiveHeight(3),
    marginLeft: responsiveWidth(1.4)
  },
  underLineStyle: {
    textDecorationStyle: 'solid',
    textDecorationColor: colors.success,
  },
  modalCenterView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: deviceHeight * 0.25
  },
  modalView: {
    marginHorizontal: responsiveWidth(5),
    marginVertical: responsiveHeight(2.5),
    backgroundColor: colors.white,
    borderRadius: responsiveWidth(5),
    width: '90%',
    paddingHorizontal: responsiveWidth(8),
    paddingVertical: responsiveHeight(3),
    //  alignItems:'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,

    },
    shadowOpacity: 0.25,
    shadowRadius: responsiveWidth(1.5),
    elevation: 5
  },
  inputTextField: {
    color: colors.black,
    ...typography.fontSizes.f12,
    ...typography.fontWeights.Medium,
    flex: 1,
    borderWidth: 1,
    borderColor: colors.primary,
    ...styles.ph10,
    height: responsiveHeight(5),
    borderRadius: responsiveWidth(1.5)
    , ...styles.mv5
  }

});
function handleResponseChanges(response: string) {
  throw new Error('Function not implemented.');
}
