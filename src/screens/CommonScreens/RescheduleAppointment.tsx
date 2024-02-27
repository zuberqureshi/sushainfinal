import { StyleSheet, TouchableOpacity, View, Text, Modal, FlatList } from 'react-native';
import React, { useState } from 'react';
import typography from '../../themes/typography';
import { colors, styles } from '../../themes';
import strings from '../../i18n/strings';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import CSafeAreaView from '../../components/common/CSafeAreaView';
import CHeader from '../../components/common/CHeader';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomIconWhite, CalendarIconSmall, ClockIconSmall, EveningSlotIcon, MorningSlotIcon } from '../../assets/svgs';
import CText from '../../components/common/CText';
import { FlashList } from '@shopify/flash-list';
import { deviceHeight, moderateScale } from '../../common/constants';
import DatePicker, { getToday, getFormatedDate } from 'react-native-modern-datepicker';
import useGetAppointmentDetail from '../../hooks/appointment/get-appointment-detail';
import { Container } from '../../components/Container';
import Loader from '../../components/Loader/Loader';
import moment from 'moment';
import { Formik, useFormik } from 'formik';
import PrimaryButton from '../../components/common/Button/PrimaryButton';
import useGetDoctorsAllSlots from '../../hooks/doctor/get-doctor-all-slots';
import useGetDoctorsProfile from '../../hooks/doctor/get-doctor-profile';
import { Spinner, Toast, ToastTitle, useToast } from '@gluestack-ui/themed';
import Body from '../../components/Body/Body';
import useRescheduleConsultation from '../../hooks/appointment/reschedule-consultation';

const RescheduleAppointment = ({route}) => {

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { type, appid } = route.params;
  const toast = useToast()
  // Get the current date
  const currentDate = moment();


  const [datePickerModel, setDatePickerModel] = useState(false)
  const [selectedDateOption, setSelectedDateOption] = useState(0)

  //api call
  const { data : doctorsProfileData, isLoading : doctorsProfileIsLoading } = useGetDoctorsProfile(181) //doctorId
  const { data: allSlotsData, isLoading : allSlotsIsLoading } = useGetDoctorsAllSlots()
  const {data:appointmentDetailData , isLoading:appointmentDetailIsLoading} = useGetAppointmentDetail({type:type,appId:appid})
  const useRescheduleConsultationMutation = useRescheduleConsultation()
  // console.log('appointmentDetailData',appointmentDetailData?.data?.result[0]?.orderDetail);
  
  const today = new Date(appointmentDetailData?.data?.result[0]?.orderDetail?.date)
  const startDate = getFormatedDate(today.setDate(today.getDate()), 'YYYY-MM-DD')
  const [selectedDate, setSelectedDate] = useState(startDate);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { appid: appointmentDetailData?.data?.result[0]?.orderDetail?.orderId,  slotdateday: startDate, slottimeid: appointmentDetailData?.data?.result[0]?.orderDetail?.slot , type:appointmentDetailData?.data?.result[0]?.orderDetail?.type},
    // validationSchema: patientBookingValidationSchema,
    onSubmit: values => {
      // updateProfile(values.country,values.address,values.name,values.mobile)
      console.log('update', values);
      // action.resetForm()
      // loadUserInfo();

      const payload ={
         type: formik.values.type,
         appId : formik.values.appid,
         slot_it : formik.values.slottimeid,
         date : formik.values.slotdateday,
      }

      

      useRescheduleConsultationMutation.mutate(payload, {
      onSuccess: (data) => {

        // console.log('SUGNUPP DATA',data?.data);

        toast.show({
          placement: "bottom",
          render: ({ id }: { id: string }) => {
            const toastId = "toast-" + id
            return (
              <Toast nativeID={toastId} variant="accent" action="success">
                <ToastTitle>Appointment rescheduled</ToastTitle>
              </Toast>
            );
          },
        })



        // queryClient.invalidateQueries({
        //   queryKey: [addressService.queryKeys.getUserAddresses + userInfo?.userUniqueId]
        // })

        // navigation.navigate(StackNav.VerifyLoginOtp,{mobile:values.number,screenType:'signup'})
        // formik.resetForm()
        // setAddNewAddress(true)
      },
      onError: (error) => {
        console.log(error);

        toast.show({
          placement: "bottom",
          render: ({ id }: { id: string }) => {
            const toastId = "toast-" + id
            return (
              <Toast nativeID={toastId} variant="accent" action="error">
                <ToastTitle>Something went wrong, please try again later</ToastTitle>
              </Toast>
            )
          }
        })
      }
    })
    }

  })

  const doctorSlotsArray = doctorsProfileData?.data?.result[0]?.doctorProfileDetail?.slots.split(',').map(Number)
  const slotListMorningArray = allSlotsData?.data?.result[0]?.slotListMorning?.filter(item => doctorSlotsArray.includes(item?.id)).map(item => item);
  const slotListEveningArray = allSlotsData?.data?.result[0]?.slotListEvening?.filter(item => doctorSlotsArray.includes(item?.id)).map(item => item);

  // console.log('Slotss',slotListMorningArray,'SLOT MM',slotListEveningArray);
  


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
      <View style={{ paddingHorizontal: responsiveWidth(5) }} >
        <CText type="r14" numberOfLines={1} color={colors.success}>
          No Slots Available
        </CText>
      </View>
    );
  };

  if(appointmentDetailIsLoading || doctorsProfileIsLoading || allSlotsIsLoading ){
    return(
      <Container statusBarStyle='dark-content' >
        <CHeader title={strings.RescheduleAppointment} />
        <Loader/>
      </Container>
    )
  }

  const getAppointmentTime = () => {
    const date = new Date(appointmentDetailData?.data?.result[0]?.orderDetail?.start_time);


    // Specify Indian Standard Time zone offset
    const ISTOffset = 5.5 * 60 * 60 * 1000; // 5.5 hours in milliseconds

    // Adjust the date to IST by subtracting the offset
    date.setTime(date.getTime() - ISTOffset);

    // Format options for time
    const timeOptions: any = { hour: 'numeric', minute: '2-digit', hour12: true };

    // Get formatted time in Indian Standard Time
    const formattedTime = date.toLocaleTimeString(undefined, timeOptions);
    return formattedTime
  }

  
  // Array to store the next five dates
  const nextFiveDates:any = [];

  // Loop to add the next five dates to the array
  for (let i = 0; i <= 4; i++) {
    const nextDate: any = moment(currentDate).add(i, 'days');
    nextFiveDates.push(nextDate.format('YYYY-MM-DD'));
  }


  return (
    <Container statusBarStyle='dark-content'>

      <CHeader title={strings.RescheduleAppointment} />
      <Body>

      <View style={localStyles.existingDateWrapper} >
        <Text style={{ color: colors.black, ...typography.fontSizes.f14, ...typography.fontWeights.Medium, }}>{strings.existingDateTime}</Text>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: responsiveHeight(1), gap: responsiveWidth(4) }} >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: responsiveWidth(1) }} >
            <CalendarIconSmall />
            <Text style={{ color: '#444343', ...typography.fontSizes.f12, ...typography.fontWeights.Medium, }} >{moment(appointmentDetailData?.data?.result[0]?.orderDetail?.date).format('DD')} {moment(appointmentDetailData?.data?.result[0]?.orderDetail?.date).format('MMM')},{moment(appointmentDetailData?.data?.result[0]?.orderDetail?.date).format('YYYY')}</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: responsiveWidth(1) }}  >
            <ClockIconSmall />
            <Text style={{ color: '#444343', ...typography.fontSizes.f12, ...typography.fontWeights.Medium,textTransform:'uppercase' }}>{getAppointmentTime()} </Text>
          </View>

        </View>

      </View>

      <View style={{ marginTop: responsiveHeight(2), paddingHorizontal: responsiveWidth(5) }}>
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

      <CText type="m14" style={{ marginTop: responsiveHeight(3), paddingHorizontal: responsiveWidth(5) }}>
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

      <PrimaryButton loading={useRescheduleConsultationMutation.isPending} disabled={useRescheduleConsultationMutation.isPending} buttonText='Submit' onPress={formik.handleSubmit} marginHorizontal={responsiveWidth(4)} marginTop={responsiveHeight(1.5)} />





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


             
      </Body>

    </Container>
  )
}

export default RescheduleAppointment

const localStyles = StyleSheet.create({

  existingDateWrapper: {
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(2.5),
    borderBottomWidth: responsiveWidth(1.5),
    borderBottomColor: colors.lightgray,
  },
  rowStyle: {
    ...styles.flexRow,
    ...styles.itemsCenter,
    ...styles.mt10,
    paddingHorizontal: responsiveWidth(5),
    marginBottom: responsiveHeight(1)
  },
  slotContainer: {
    ...styles.center,
    ...styles.mh15,
    ...styles.mv10,
    height: moderateScale(31),
    width: moderateScale(51),
    borderRadius: moderateScale(4),
    borderWidth: moderateScale(1),
    borderColor: colors.primary,
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
  }
})