import { StyleSheet, TouchableOpacity, View, Text, Modal, FlatList } from 'react-native';
import React, { useContext, useState } from 'react';
import typography from '../../themes/typography';
import { colors, styles } from '../../themes';
import strings from '../../i18n/strings';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import CSafeAreaView from '../../components/common/CSafeAreaView';
import CHeader from '../../components/common/CHeader';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CalendarIconSmall, ClockIconSmall } from '../../assets/svgs';
import KeyBoardAvoidWrapper from '../../components/common/KeyBoardAvoidWrapper';
import useGetAppointmentDetail from '../../hooks/appointment/get-appointment-detail';
import { Container } from '../../components/Container';
import Loader from '../../components/Loader/Loader';
import moment from 'moment';
import { useFormik } from 'formik';
import PrimaryButton from '../../components/common/Button/PrimaryButton';
import useCancelAppointment from '../../hooks/appointment/cancel-appointment';
import { Toast, ToastTitle, useToast } from '@gluestack-ui/themed';
import { queryClient } from '../../react-query/client';
import appointmentService from '../../services/appointment-service';
import { AuthContext } from '../../context/AuthContext'
import { StackNav } from '../../navigation/NavigationKeys';



const AppointmentCancellation = ({ route }) => {

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { type, appid } = route.params;


  const toast = useToast()


  const [selectedOption, setSelectedOption] = useState('')
  const authContext: any = useContext(AuthContext);
  console.log('PARAMSSS', type, appid, authContext?.userInfo?.userId);
  //Api call
  const { data: appointmentDetailData, isLoading: appointmentDetailIsLoading } = useGetAppointmentDetail({ type: type, appId: appid })
  const useCancelAppointmentMutation = useCancelAppointment()



  const onPressCancel = () => {

    const payload = {
      appId: appid,
      cancel_reason: selectedOption,
      cancel_by: "User", //user, admin
      type: type // virtual , appoitment
    }

    useCancelAppointmentMutation.mutate(payload, {
      onSuccess: (data) => {

        // console.log('SUGNUPP DATA',data?.data);
        console.log('CAnel DATA', data?.data);

        if (data?.data?.success) {
          toast.show({
            placement: "bottom",
            render: ({ id }: { id: string }) => {
              const toastId = "toast-" + id
              return (
                <Toast nativeID={toastId} variant="accent" action="success">
                  <ToastTitle>Appointment canceled Successfully</ToastTitle>
                </Toast>
              );
            },
          })

          queryClient.invalidateQueries({
            queryKey: [appointmentService.queryKeys.getUpcomingAppointments + authContext?.userInfo?.userId]
          })

          // navigation.navigate(StackNav.VerifyLoginOtp,{mobile:values.number,screenType:'signup'})
          navigation.navigate(StackNav.Appointments)
        } else {
          toast.show({
            placement: "bottom",
            render: ({ id }: { id: string }) => {
              const toastId = "toast-" + id
              return (
                <Toast nativeID={toastId} variant="accent" action='warning'>
                  <ToastTitle>{data?.data?.message}</ToastTitle>
                </Toast>
              );
            },
          })
        }
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

  var str = "43445561234";
  var replacedStr = appointmentDetailData?.data?.result[0]?.orderDetail?.orderId.replace(/.(?=.{4,}$)/g, '*');

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

  if (appointmentDetailIsLoading) {
    return (
      <Container statusBarStyle='dark-content' >
        <CHeader title={strings.RescheduleAppointment} />
        <Loader />
      </Container>
    )
  }

  const renderReasonCancelOption = ({ item, index }: any) => {

    return (
      <View style={{ backgroundColor: '#F7F9F9', paddingVertical: responsiveHeight(1.5), borderRadius: responsiveWidth(1) }} >

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: responsiveWidth(2.5), borderBottomColor: '#DAD6D6', borderBottomWidth: (index + 1 != 7) ? 1 : 0, paddingBottom: (index + 1 != 7) ? responsiveHeight(1.5) : 0, paddingHorizontal: responsiveWidth(3), }} >
          <TouchableOpacity onPress={() => {
            setSelectedOption(item)
          }} style={{ borderWidth: 1, borderColor: selectedOption === item ? colors.primary : colors.black, paddingHorizontal: responsiveWidth(0.8), paddingVertical: responsiveHeight(0.4), borderRadius: responsiveWidth(4) }} >
            <View style={{ backgroundColor: selectedOption === item ? colors.primary : '#F7F9F9', paddingHorizontal: responsiveWidth(1.4), paddingVertical: responsiveHeight(0.7), borderRadius: responsiveWidth(2) }} ></View>
          </TouchableOpacity>

          <Text style={{ color: colors.black, ...typography.fontSizes.f12, ...typography.fontWeights.Regular, }} >{item}</Text>
        </View>
      </View>
    )
  }



  return (
    <Container statusBarStyle='dark-content' >

      <KeyBoardAvoidWrapper>

        <CHeader title={strings.AppointmentCancellation} />

        <View style={localStyles.appointmentDetailsWrapper} >

          <Text style={{ color: colors.black, ...typography.fontSizes.f14, ...typography.fontWeights.SemiBold, }} >{strings.appointmentDetails}</Text>

          <View style={{ marginTop: responsiveHeight(1.5) }}>
            <Text style={{ color: colors.black, ...typography.fontSizes.f14, ...typography.fontWeights.Bold, textTransform: 'capitalize' }} >{appointmentDetailData?.data?.result[0]?.orderDetail?.doc_name}</Text>
            {/* <Text style={{ color: colors.black, ...typography.fontSizes.f12, ...typography.fontWeights.Regular, }} >clinic Name - Sanjeevani Care</Text> */}
          </View>

          <View style={localStyles.appointmentDateWrapper} >
            <Text style={{ color: colors.black, ...typography.fontSizes.f14, ...typography.fontWeights.Medium, }}>{strings.appointmentDateTime}</Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: responsiveHeight(1), gap: responsiveWidth(4) }} >
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: responsiveWidth(1) }} >
                <CalendarIconSmall />
                <Text style={{ color: '#444343', ...typography.fontSizes.f12, ...typography.fontWeights.Medium, }} >{moment(appointmentDetailData?.data?.result[0]?.orderDetail?.date).format('DD')} {moment(appointmentDetailData?.data?.result[0]?.orderDetail?.date).format('MMM')},{moment(appointmentDetailData?.data?.result[0]?.orderDetail?.date).format('YYYY')}</Text>
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center', gap: responsiveWidth(1) }}  >
                <ClockIconSmall />
                <Text style={{ color: '#444343', ...typography.fontSizes.f12, ...typography.fontWeights.Medium, textTransform: 'uppercase' }}>{getAppointmentTime()}</Text>
              </View>

            </View>

          </View>

          <View>
            <Text style={{ color: colors.black, ...typography.fontSizes.f12, ...typography.fontWeights.SemiBold, }} >{strings.appointmentID}</Text>
            <Text style={{ color: colors.black, ...typography.fontSizes.f10, ...typography.fontWeights.Regular, }} >{appointmentDetailData?.data?.result[0]?.orderDetail?.orderId.replace(/.(?=.{4,}$)/g, '*')}</Text>

          </View>


        </View>

        <View style={localStyles.reasonforCancellingWrapper} >

          <Text style={{ color: colors.black, ...typography.fontSizes.f14, ...typography.fontWeights.SemiBold, }} >{strings.reasonforCancelling}</Text>




          <FlatList
            style={{ marginTop: responsiveHeight(1.5) }}
            data={['I am Busy', 'Forgot About The Appoinments', 'Changed My mind', 'Visited Another Doctor', 'Location is Far', 'Doctor Cancelled', 'Other']}
            renderItem={renderReasonCancelOption}

            keyExtractor={(item, index) => index.toString()}
          />






        </View>

        {/* <TouchableOpacity activeOpacity={0.6} onPress={()=>{console.log({selectedOption});
      }} style={{backgroundColor:colors.primary,alignSelf:'center',paddingHorizontal:responsiveWidth(28),paddingVertical:responsiveHeight(1.5),borderRadius:responsiveWidth(2),marginBottom:responsiveHeight(1)}} >
        <Text style={{color:colors.white,   ...typography.fontSizes.f12,...typography.fontWeights.Regular,textAlign:'center',width:responsiveWidth(35)}} >{strings.iWanttoCancel}</Text>
      </TouchableOpacity> */}

        <PrimaryButton buttonText={strings.iWanttoCancel} loading={useCancelAppointmentMutation.isPending} disabled={useCancelAppointmentMutation.isPending} onPress={() => { onPressCancel() }} marginHorizontal={responsiveWidth(3)} />



      </KeyBoardAvoidWrapper>
    </Container>
  )
}

export default AppointmentCancellation

const localStyles = StyleSheet.create({

  appointmentDetailsWrapper: {
    paddingHorizontal: responsiveWidth(4),
    borderBottomWidth: responsiveWidth(1.5),
    borderBottomColor: colors.lightgray,
    paddingVertical: responsiveHeight(2.5)
  },
  appointmentDateWrapper: {
    // paddingHorizontal:responsiveWidth(4),
    paddingVertical: responsiveHeight(2.5),

  },
  reasonforCancellingWrapper: {
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(3)
  },
  radioOutter: {
    borderWidth: 1,
    borderColor: colors.primary,


  },

})