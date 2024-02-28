import { FlatList, Image, Linking, Modal, Platform, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import ImagePicker from 'react-native-image-crop-picker';

import { Container } from '../../components/Container'
import Body from '../../components/Body/Body'
import CHeader from '../../components/common/CHeader'
import SearchWithLikeComponent from '../../components/common/CommonComponent/SearchWithLikeComponent'
import { Box, Pressable, Spinner, Toast, ToastTitle, useToast } from '@gluestack-ui/themed'
import { Text } from '@gluestack-ui/themed'
import { AppointmentBeautyIcon, AppointmentMedicinesIcon, AppointmentOrderIcon, BuyPrescription, CalenderIcon, ClockSmallColorIcon, CloseIcon, DiscountGreenIcon, DownloadWhiteIcon, GreaterThanBlack, GreaterThanIcon, PrescriptionDrawerIconFilled, ReportDeleteIcon, ReportTick, ShakeHand, StarFilledPrimaryColor, StarUnFilledPrimaryColor, UploadDocIcon, VideoCallIcon, ViewBlackEyeIcon, WatchIcon } from '../../assets/svgs'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { colors, styles } from '../../themes'
import { Api_Image_Base_Url, getHeight, moderateScale } from '../../common/constants'
import RatingComponent from '../../components/HomeComponent/RatingComponent';
import CText from '../../components/common/CText'
import BannerList from '../../components/HomeComponent/BannerList'
import CustomerSpeak from '../../components/common/CustomerSpeak'
import ScreenBottomAchievement from '../../components/common/ScreenBottomAchievement/ScreenBottomAchievement'
import useGetUpcomingAppointments from '../../hooks/appointment/get-upcoming-appointments'
import moment from 'moment'
import useGetCompletedAppointments from '../../hooks/appointment/get-completed-appointments'
import Loader from '../../components/Loader/Loader'
import { StackNav } from '../../navigation/NavigationKeys'
import { getAccessToken } from '../../utils/network'
import useGetTodayAppointments from '../../hooks/appointment/get-today-appointment'
import { AuthContext } from '../../context/AuthContext'
import PrimaryButton from '../../components/common/Button/PrimaryButton'
import strings from '../../i18n/strings'
import { androidCameraPermission } from '../../utils/permission';
import { queryClient } from '../../react-query/client';
import appointmentService from '../../services/appointment-service';
import useGetReportByAppointmentId from '../../hooks/appointment/get-report-by-appointment';
import { ProgressView } from '@react-native-community/progress-view';
import typography from '../../themes/typography';
import useDeleteReportById from '../../hooks/appointment/delete-report';

const Appointments = ({ navigation }) => {

  //init
  const toast = useToast()

  const [status, setStatus] = useState(false)
  const [selectedAppointmentView, setselectedAppointmentView] = useState('upcoming')
  const [selectedReviewStar, setSelectedReviewStar] = useState<number>(0)
  const [modalReportUploadVisible, setModalReportUploadVisible] = useState(false)
  const [reportUploadIsLoading, setReportUploadIsLoading] = useState(false)
  const [modalReportViewVisible, setModalReportViewVisible] = useState(false)
  const [slectedFileData, setSlectedFileData] = useState({ uri: '', type: '' })
  const [selectedAppId, setSelectedAppId] = useState()
  const authContext: any = useContext(AuthContext);

  //api call
  const { data: upcomingAppointmentData, isLoading: isLoadingUpcomingAppointment } = useGetUpcomingAppointments({ userid: authContext?.userInfo?.userId })
  const { data: completedAppointmentData, isLoading: isLoadingCompletedAppointment } = useGetCompletedAppointments({ userid: authContext?.userInfo?.userId })
  const { data: todayAppointmentsData, isLoading: isLoadingTodayAppointments } = useGetTodayAppointments({ userid: authContext?.userInfo?.userId })
  const { data: reportByAppointmentIdData, isLoading: isLoadingReportByAppointmentId } = useGetReportByAppointmentId(selectedAppId)
  const useDeleteReportMutation = useDeleteReportById()

  console.log('TODAY', reportByAppointmentIdData?.data?.result[0]?.reportView?.length);

  const parseUri = (uri: any) => {
    // Extract the file name from the URI
    const fileName = uri.split('/').pop();

    // Extract the file extension from the file name
    const fileExtension = fileName.split('.').pop();

    // Determine the type based on the file extension
    let fileType;
    switch (fileExtension.toLowerCase()) {
      case 'jpg':
        fileType = 'image/jpg'
      case 'jpeg':
        fileType = 'image/jpeg'
      case 'png':
        fileType = 'image/png'
      case 'gif':
        fileType = 'image/gif'
      case 'bmp':
        fileType = 'image/bmp'
      case 'tiff ':
        fileType = 'image/tiff'
      case 'tif':
        fileType = 'image/tif'
      case 'webp':
        fileType = 'image/webp'
      case 'svg':
        fileType = 'image/svg'
      // case 'pdf':
      //   fileType = 'application/pdf'
      //   break;
      // Add more cases for other file types as needed
      default:
        fileType = 'Unknown';
    }

    // Return an object with the type and name
    return {
      type: fileType,
      name: fileName
    };
  }

  const selectDoc = async () => {

    try {
      // const doc = await DocumentPicker.pick({
      //   type: [DocumentPicker.types.pdf],
      //   allowMultiSelection: true
      // });
      // const doc = await DocumentPicker.pickSingle()
      // const doc = await DocumentPicker.pickSingle({
      //   type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
      // });
      // console.log('Selected DOc', doc);
      // setSlectedFileData({
      //   uri: doc?.uri,
      //   type: doc.type as string
      // })
      const permissionStatus = await androidCameraPermission()

      if (permissionStatus || Platform.OS == 'ios') {

        ImagePicker.openPicker({
          width: 300,
          height: 400,
          cropping: true
        }).then(image => {
          console.log('Selected DOc', image);
          setSlectedFileData({
            uri: image?.path,
            type: image?.mime as string
          })
        });
      }

    } catch (err) {
      // if (DocumentPicker.isCancel(err))

      //   console.log('User cancelled the upload', err);
      // else console.log(err);
      console.log(err);
    }
  };

  const onSubmitReport = async () => {
    console.log({ selectedAppId });

    setReportUploadIsLoading(true)
    const formData = new FormData()


    formData.append('app_id', selectedAppId)
    if (slectedFileData?.uri !== '') {
      formData.append('images', {
        uri: slectedFileData.uri as string,
        type: slectedFileData.type,
        name: parseUri(slectedFileData.uri).name,
      });
    }
    formData.append('report_name', authContext?.userInfo?.userName)
    formData.append('tab', 'virtual')

    const obj = Object.fromEntries(formData?._parts);

    console.log('Submit File', obj);

    const updateReportPayload: any = {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        // Authorization: token ? `Bearer ${token}` : undefined,
      },
    }

    try {
      const response = await fetch('http://13.232.170.16:3006/api/v1/video/reportupload', updateReportPayload);
      const responseJson = await response.json()
      console.log('uplao', responseJson);

      queryClient.invalidateQueries({
        queryKey: [appointmentService.queryKeys.getReportByAppointmentId + selectedAppId]
      })


      // queryClient.invalidateQueries({
      //   queryKey: [ProfileService.queryKeys.completeProfile]
      // })

      // queryClient.invalidateQueries({
      //   queryKey: [ProfileService.queryKeys.retrieveRoleProfile]
      // })

      if (responseJson?.success) {
        setModalReportUploadVisible(false)
        toast.show({
          placement: "bottom",
          render: ({ id }) => {
            const toastId = "toast-" + id
            return (
              <Toast nativeID={toastId} variant="accent" action="success">
                <ToastTitle>Report uploaded successfully.</ToastTitle>
              </Toast>
            );
          },
        })

        setSlectedFileData({ uri: '', type: '' })

      }


      setReportUploadIsLoading(false)
    } catch (error) {
      console.log('err', error);
      setModalReportUploadVisible(false)
      setReportUploadIsLoading(false)
      toast.show({
        placement: "bottom",
        render: ({ id }) => {
          const toastId = "toast-" + id
          return (
            <Toast nativeID={toastId} variant="accent" action="error">
              <ToastTitle>Something went wrong please try again later.</ToastTitle>
            </Toast>
          );
        },
      })
    }

  }

  const openPdfInBrowser = async (url) => {
    try {
      const supported = await Linking.canOpenURL(`${Api_Image_Base_Url}${url}`);
      if (supported) {
        await Linking.openURL(`${Api_Image_Base_Url}${url}`);
      } else {
        console.error("Don't know how to open URI: " + url);
      }
    } catch (error) {
      console.error('Error opening PDF:', error);
    }
  };

  const deleteReport= (id) => {



    useDeleteReportMutation.mutate(id, {
      onSuccess: (data) => {



        toast.show({
          placement: "bottom",
          render: ({ id }: { id: string }) => {
            const toastId = "toast-" + id
            return (
              <Toast nativeID={toastId} variant="accent" action="success">
                <ToastTitle>Deleted Successfully</ToastTitle>
              </Toast>
            );
          },
        })

        queryClient.invalidateQueries({
          queryKey: [appointmentService.queryKeys.getReportByAppointmentId + selectedAppId ]
        })

     
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





  // load();
  // useEffect(() => {
  //   // load();
  // }, []);

  const getTodayAppointmentTime = () => {

    const date = new Date(todayAppointmentsData?.data?.result[0]?.consultationDetail?.start_time);


    // Specify Indian Standard Time zone offset
    const ISTOffset = 5.5 * 60 * 60 * 1000; // 5.5 hours in milliseconds

    // Adjust the date to IST by subtracting the offset
    date.setTime(date.getTime() - ISTOffset);

    // Format options for time
    const timeOptions: any = { hour: 'numeric', minute: '2-digit', hour12: true };

    // Get formatted time in Indian Standard Time
    const formattedTime = date.toLocaleTimeString(undefined, timeOptions);

    return formattedTime;
  }

  if (isLoadingCompletedAppointment || isLoadingUpcomingAppointment || isLoadingTodayAppointments) {
    return (
      <Container statusBarStyle='dark-content' >
        <CHeader title='Appointments' />
        <Loader />
      </Container>

    )
  }

  return (
    <Container statusBarStyle='dark-content' >
      <CHeader title='Appointments' />
      {/* <SearchWithLikeComponent /> */}
      <Body style={{ paddingBottom: responsiveHeight(3) }} >
        <Box flexDirection='row' alignItems='center' gap={4} my={8} style={{ marginHorizontal: responsiveWidth(3), marginTop: responsiveHeight(1.5) }} >
          <Text fontFamily='$InterRegular' fontSize={20} color='#8D9192' textTransform='capitalize' >Hello, {authContext?.userInfo?.userName}</Text>
          <ShakeHand />
        </Box>

        {!!(todayAppointmentsData?.data?.result[0]?.consultationDetail) && <Box backgroundColor={colors.white4} py={10} px={15} borderRadius={10} mt={10} style={{ marginHorizontal: responsiveWidth(3), ...styles.shadowStyle }} >
          <Text fontFamily='$InikaBold' fontSize={16} color={colors.success}>Today <Text fontFamily='$InikaBold' fontSize={16} color={colors.primary}>Appointment</Text></Text>
          <Text fontFamily='$InterRegular' fontSize={8} color={colors.black}>Appointment Id: {todayAppointmentsData?.data?.result[0]?.consultationDetail?.orderId}</Text>

          <Box flexDirection='row' alignItems='center' gap={14} mt={6} >
            <Image source={require('../../assets/images/constantImg4.png')} style={{ resizeMode: 'cover', width: responsiveWidth(13), height: responsiveHeight(6.5), borderRadius: responsiveWidth(15), alignSelf: 'flex-start' }} />
            <Box flexDirection='column' pt={5} >
              <Text fontFamily='$InikaBold' fontSize={15} color={colors.primary}>{todayAppointmentsData?.data?.result[0]?.consultationDetail?.doc_name}</Text>
              <Text fontFamily='$InterRegular' lineHeight={13} fontSize={9} color={colors.black} w={228} >Gynae and Fertility, Garbhsanskar, PCOD and UT Fibroid, Pre Conception Care</Text>
              <RatingComponent
                star={5}
                style={localStyles.straStyle}
              />
              <Box flexDirection='row' alignItems='center' gap={27}>
                <Box flexDirection='row' alignItems='center' gap={2}>
                  <WatchIcon />
                  <Text fontFamily='$InterSemiBold' fontSize={12} color={'#5B5D5E'} textTransform='uppercase' >{getTodayAppointmentTime()}</Text>
                </Box>
                <Box flexDirection='row' alignItems='center' gap={4}>
                  <CalenderIcon />
                  <Text fontFamily='$InterSemiBold' fontSize={12} color={'#5B5D5E'}>{moment(todayAppointmentsData?.data?.result[0]?.consultationDetail?.date).format('DD')} {moment(todayAppointmentsData?.data?.result[0]?.consultationDetail?.date).format('MMM')}</Text>
                </Box>
              </Box>

              <View style={localStyles.btnContainer}>
                <TouchableOpacity style={localStyles.videoCallBtn}>
                  {status ? (
                    <BuyPrescription
                      width={moderateScale(14)}
                      height={moderateScale(14)}
                    />
                  ) : (
                    <VideoCallIcon
                      width={moderateScale(12)}
                      height={moderateScale(12)}
                    />
                  )}
                  <CText
                    type="r12"
                    color={colors.white}
                    style={localStyles.leftTextStyle}>
                    {status ? 'Buy Prescription' : 'Join Video call'}
                  </CText>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.navigate(StackNav.RescheduleAppointment, { type: 'virtual', appid: '86391634831916' }) }} style={localStyles.resheduleBtn}>
                  <CText type="r12" color={colors.primary2}>
                    {status ? 'Book Follow Up' : 'Reschedule'}
                  </CText>
                </TouchableOpacity>
              </View>

              <View style={[localStyles.btnContainer, { marginVertical: responsiveHeight(1.5) }]}>
                <TouchableOpacity style={localStyles.uploadBtnStyle}>
                  <UploadDocIcon />
                  <CText type="m10" style={styles.ml5} color={colors.textColor3}>
                    {status ? 'Buy Prescription' : 'Upload Reports'}
                  </CText>
                </TouchableOpacity>
                <TouchableOpacity style={localStyles.docViewStyle}>
                  <CText type="m10" color={colors.textColor4}>
                    {'View'}
                  </CText>
                </TouchableOpacity>
              </View>


            </Box>

          </Box>

        </Box>}

        <Box backgroundColor='#EFF2F2' mt={25} h={24} flexDirection='row' borderRadius={5} mb={10} overflow='hidden' style={{ marginHorizontal: responsiveWidth(3) }} >
          <Pressable onPress={() => setselectedAppointmentView('upcoming')} flex={1}>
            <Box backgroundColor={selectedAppointmentView === 'upcoming' ? colors.primary : '#EFF2F2'} flex={1} borderRadius={5} >
              <Text fontFamily='$InterRegular' fontSize={12} color={selectedAppointmentView === 'upcoming' ? '$light100' : colors.black} textAlign='center'  >Upcoming</Text>
            </Box>
          </Pressable>

          <Pressable onPress={() => setselectedAppointmentView('completed')} flex={1}   >
            <Box backgroundColor={selectedAppointmentView === 'completed' ? colors.primary : '#EFF2F2'} borderRadius={5} >
              <Text fontFamily='$InterRegular' fontSize={12} color={selectedAppointmentView === 'completed' ? '$light100' : colors.black} textAlign='center'  >Completed</Text>
            </Box>
          </Pressable>
        </Box>

        {
          selectedAppointmentView === 'upcoming' ? (
            <Box backgroundColor='#ffffff' mb={10} >

              <Box px={16} >
                {upcomingAppointmentData?.data?.result[0]?.upcomingAppointmentList?.map((item, index) => {

                  const date = new Date(item?.start_time);


                  // Specify Indian Standard Time zone offset
                  const ISTOffset = 5.5 * 60 * 60 * 1000; // 5.5 hours in milliseconds

                  // Adjust the date to IST by subtracting the offset
                  date.setTime(date.getTime() - ISTOffset);

                  // Format options for time
                  const timeOptions: any = { hour: 'numeric', minute: '2-digit', hour12: true };

                  // Get formatted time in Indian Standard Time
                  const formattedTime = date.toLocaleTimeString(undefined, timeOptions);

                  return (
                    <Box key={index} flexDirection='row' backgroundColor='#FCFFFF' alignItems='center' gap={14} mt={20} borderRadius={10} overflow='hidden' pl={10} justifyContent='space-between' style={{ ...styles.shadowStyle }} >
                      <Box flexDirection='row' alignItems='center' gap={14} py={10}>
                        <Image source={require('../../assets/images/constantImg4.png')} style={{ resizeMode: 'cover', width: responsiveWidth(13), height: responsiveHeight(6.5), borderRadius: responsiveWidth(15), alignSelf: 'flex-start', }} />
                        <Box flexDirection='column' gap={9} >
                          <Box flexDirection='row' alignItems='center' gap={5} >
                            <Box gap={3} >
                              <Text fontFamily='$InikaBold' fontSize={14} color={colors.primary}>{item?.doc_name}</Text>
                              <Text fontFamily='$InterRegular' lineHeight={13} fontSize={10} color={colors.black} >Appointment Id: {item?.orderId}</Text>
                            </Box>
                            <Box flexDirection='row' alignItems='center' alignSelf='flex-start' gap={2} >
                              <ClockSmallColorIcon />
                              <Text fontFamily='$InterBold' fontSize={11} color={colors.primary}  >{formattedTime}</Text>
                            </Box>

                          </Box>

                          <TouchableOpacity>
                            <Box backgroundColor={colors.success} w={175} borderRadius={5} flexDirection='row' alignItems='center' justifyContent='center' gap={5} py={3} >
                              <VideoCallIcon
                                width={moderateScale(15)}
                                height={moderateScale(15)}
                              />
                              <Text fontFamily='$InterMedium' fontSize={12} color={colors.white}>Join video call</Text>
                            </Box>
                          </TouchableOpacity>


                          <View style={localStyles.btnContainer}>
                            <TouchableOpacity onPress={() => { navigation.navigate(StackNav.AppointmentCancellation, { type: item?.type, appid: item?.orderId }) }} style={localStyles.resheduleBtn}>
                              <Text fontFamily='$InikaRegular' lineHeight={13} fontSize={11} color={colors.primary} textAlign='center' px={15} >Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { navigation.navigate(StackNav.RescheduleAppointment, { type: item?.type, appid: item?.orderId }) }} style={localStyles.resheduleBtn}>
                              <Text fontFamily='$InikaRegular' lineHeight={13} fontSize={11} color={colors.primary} textAlign='center' px={4}>Reschedule</Text>
                            </TouchableOpacity>
                          </View>


                          <View style={[localStyles.btnContainer, { marginVertical: responsiveHeight(1.5) }]}>
                            <TouchableOpacity onPress={async () => {
                              setModalReportUploadVisible(true)
                              await setSelectedAppId(item?.orderId)
                            }} style={localStyles.uploadBtnStyle}>
                              <UploadDocIcon />
                              <CText type="m10" style={styles.ml5} color={colors.textColor3}>
                                {status ? 'Buy Prescription' : 'Upload Reports'}
                              </CText>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={async () => {
                              setModalReportViewVisible(true)
                              await setSelectedAppId(item?.orderId)
                            }}
                              style={localStyles.docViewStyle}>
                              <CText type="m10" color={colors.textColor4}>
                                {'View'}
                              </CText>
                            </TouchableOpacity>
                          </View>


                        </Box>
                      </Box>
                      <Box w={36} h={'100%'} backgroundColor='#EAE5E566' pt={40} gap={4} >
                        <Text fontFamily='$InikaRegular' lineHeight={13} fontSize={12} color={colors.black} textAlign='center' alignSelf='center' mt={32} >{moment(item?.date).format('DD')}</Text>
                        <Text fontFamily='$InikaRegular' lineHeight={13} fontSize={12} numberOfLines={1} color={colors.black} textAlign='center' alignSelf='center' >{moment(item?.date).format('MMM')}</Text>
                      </Box>

                    </Box>
                  )
                })}
              </Box>

              {/* <TouchableOpacity activeOpacity={0.6} >
                <Box backgroundColor={colors.primary} alignSelf='center' h={24} w={109} borderRadius={10} alignItems='center' my={30} >
                  <Text fontFamily='$InterMedium' fontSize={13} color={colors.white}>Show more</Text>
                </Box>
              </TouchableOpacity> */}


              <Box backgroundColor='#D9D9D933' py={30} px={16} >

                <Box flexDirection='row' alignItems='center' justifyContent='space-between' backgroundColor={colors.white} px={10} h={53} borderRadius={10} style={{ ...styles.shadowStyle }} >
                  <Box flexDirection='row' alignItems='center' gap={5}>
                    <AppointmentMedicinesIcon />
                    <Text fontFamily='$InterMedium' fontSize={13} color={'#5E5F5C'}>Buy Medicines</Text>
                  </Box>
                  <GreaterThanBlack />
                </Box>

                <Box flexDirection='row' mt={18} alignItems='center' justifyContent='space-between' backgroundColor={colors.white} px={10} h={53} borderRadius={10} style={{ ...styles.shadowStyle }} >
                  <Box flexDirection='row' alignItems='center' gap={5}>
                    <AppointmentBeautyIcon />
                    <Text fontFamily='$InterMedium' fontSize={13} color={'#5E5F5C'}>Buy Beauty & personal care products</Text>
                  </Box>
                  <GreaterThanBlack />
                </Box>

                <Box flexDirection='row' mt={18} alignItems='center' justifyContent='space-between' backgroundColor={colors.white} px={10} h={53} borderRadius={10} style={{ ...styles.shadowStyle }} >
                  <Box flexDirection='row' alignItems='center' gap={5}>
                    <AppointmentOrderIcon />
                    <Text fontFamily='$InterMedium' fontSize={13} color={'#5E5F5C'}>My Orders</Text>
                  </Box>
                  <GreaterThanBlack />
                </Box>



              </Box>



            </Box>
          ) : (
            <Box backgroundColor='#F7F7F7' pb={25} mb={10} mt={10} >
              <Text fontFamily='$InikaRegular' fontSize={13} color={'#696767'} my={8} mx={16} >Don’t forget to take Follow up</Text>

              {completedAppointmentData?.data?.result[0]?.completedAppointmentList?.slice(0, 2)?.map((item, index) => {


                return (
                  <Box key={index.toString()} >
                    <Box backgroundColor='#FCFFFF' mx={16} gap={18} mt={20} borderRadius={10} overflow='hidden' px={10} style={{ ...styles.shadowStyle }} >
                      <Box flexDirection='row' alignItems='center' gap={18} py={10}>
                        <Image source={require('../../assets/images/constantImg4.png')} style={{ resizeMode: 'cover', width: responsiveWidth(13), height: responsiveHeight(6.5), borderRadius: responsiveWidth(15), alignSelf: 'flex-start', }} />
                        <Box flexDirection='column' gap={9} >
                          <Box flexDirection='row' alignItems='center' >
                            <Box gap={3} >
                              <Text fontFamily='$InikaBold' fontSize={14} color={colors.primary}>{item?.doc_name}</Text>
                              <Text fontFamily='$InterRegular' w={254} lineHeight={13} fontSize={10} numberOfLines={3} color={colors.black} >Gynae and Fertility, Neuro, Hormonal Imbalances, PCOD and UT Fibroid, Pre Conception Care, Pre and Post Natal Care, Hypertension</Text>
                            </Box>


                          </Box>




                          <View style={localStyles.btnContainer}>
                            <TouchableOpacity activeOpacity={0.6} >
                              <Box backgroundColor={colors.success} flex={1} borderRadius={5} flexDirection='row' alignItems='center' justifyContent='center' gap={5} py={3} px={10} >
                                <Text fontFamily='$InterMedium' fontSize={10} color={colors.white}>Book Followup</Text>
                              </Box>
                            </TouchableOpacity>

                            <TouchableOpacity>
                              <Box backgroundColor={colors.success} flex={1} borderRadius={5} flexDirection='row' alignItems='center' justifyContent='center' gap={5} py={3} px={10} >
                                <DownloadWhiteIcon />
                                <Text fontFamily='$InterMedium' fontSize={10} color={colors.white}>Download Prescription</Text>
                              </Box>
                            </TouchableOpacity>
                          </View>


                          <View style={[localStyles.btnContainer, { marginVertical: responsiveHeight(1.5) }]}>
                            <TouchableOpacity style={localStyles.uploadBtnStyle}>
                              <ViewBlackEyeIcon
                                width={moderateScale(16)}
                                height={moderateScale(16)}
                              />
                              <CText type="m10" style={styles.ml5} color={'#777474'}>
                                View Report
                              </CText>
                            </TouchableOpacity>

                          </View>


                        </Box>
                      </Box>


                    </Box>

                    {!!item?.rating && <Box backgroundColor='#FCFFFF' mx={16} gap={18} mt={20} borderRadius={10} overflow='hidden' px={12} py={16} style={{ ...styles.shadowStyle }} >
                      <Text fontFamily='$InterRegular' fontSize={11} lineHeight={13} color={colors.black} >Please review your experience with the last doctor : Dr. Anshu Sharma</Text>

                      <Box flexDirection='row' gap={5} >

                        {['1', '2', '3', '4', '5'].map((item, index): any => {
                          return (
                            <TouchableOpacity key={index.toString()} onPress={() => { setSelectedReviewStar(index + 1) }} activeOpacity={0.6} >
                              {item < (selectedReviewStar + 1) ? <StarFilledPrimaryColor /> : <StarUnFilledPrimaryColor />}
                            </TouchableOpacity>

                          )
                        })}
                      </Box>

                      <Box flexDirection='row' alignItems='center' borderWidth={1} borderRadius={10} borderColor='#C7C2C2' overflow='hidden' px={8} >
                        <TextInput
                          placeholder='Type here........'
                          placeholderTextColor={colors.black}
                          multiline={true}
                          numberOfLines={10}
                          style={{ height: responsiveHeight(16), width: '87%', textAlignVertical: 'top', }}
                        />
                        <TouchableOpacity activeOpacity={0.6} style={{ alignSelf: 'flex-start' }} >
                          <Text fontFamily='$InterMedium' fontSize={11} lineHeight={13} color={'#858181'} mt={8} >Submit</Text>
                        </TouchableOpacity>

                      </Box>


                    </Box>}


                  </Box>
                )
              })}





              {/* <TouchableOpacity activeOpacity={0.6} >
                <Box backgroundColor={colors.primary} alignSelf='center' h={24} w={109} borderRadius={10} alignItems='center' my={30} >
                  <Text fontFamily='$InterMedium' fontSize={13} color={colors.white}>Show more</Text>
                </Box>
              </TouchableOpacity> */}



              <Box pb={30} pt={8} px={16} >

                <Box flexDirection='row' alignItems='center' gap={5} mb={15}>
                  <DiscountGreenIcon style={{ alignSelf: 'flex-start', marginTop: responsiveHeight(0.9) }} />
                  <Text fontFamily='$InterMedium' fontSize={10} color={'#696767'} numberOfLines={2} >Your medicines are added to cart. Get 20%off on medicine orders. Apply Coupon PURE20 at checkout  </Text>
                </Box>

                <Box flexDirection='row' alignItems='center' justifyContent='space-between' backgroundColor={colors.white} px={10} h={53} borderRadius={10} style={{
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.22,
                  shadowRadius: 2.22,
                  elevation: 3,
                }} >
                  <Box flexDirection='row' alignItems='center' gap={5}>
                    <AppointmentMedicinesIcon />
                    <Text fontFamily='$InterMedium' fontSize={13} color={'#5E5F5C'}>Buy Prescription</Text>
                  </Box>
                  <GreaterThanBlack />
                </Box>

                <Box flexDirection='row' mt={18} alignItems='center' justifyContent='space-between' backgroundColor={colors.white} px={10} h={53} borderRadius={10} style={{
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.22,
                  shadowRadius: 2.22,
                  elevation: 3,
                }} >
                  <Box flexDirection='row' alignItems='center' gap={5}>
                    <AppointmentBeautyIcon />
                    <Text fontFamily='$InterMedium' fontSize={13} color={'#5E5F5C'}>Buy Beauty & personal care products</Text>
                  </Box>
                  <GreaterThanBlack />
                </Box>

                <Box flexDirection='row' mt={18} alignItems='center' justifyContent='space-between' backgroundColor={colors.white} px={10} h={53} borderRadius={10} style={{
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.22,
                  shadowRadius: 2.22,
                  elevation: 3,
                }} >
                  <Box flexDirection='row' alignItems='center' gap={5}>
                    <AppointmentOrderIcon />
                    <Text fontFamily='$InterMedium' fontSize={13} color={'#5E5F5C'}>My Orders</Text>
                  </Box>
                  <GreaterThanBlack />
                </Box>



              </Box>



            </Box>

          )
        }

        {/* <BannerList bannerData={['16971297716815.png', '16971297716815.png', '16971297716815.png']} /> */}


        {selectedAppointmentView === 'upcoming' && <Box>


          <Text fontFamily='$InterBold' fontSize={14} color={colors.success} textAlign='center' my={8} >CUSTOMER SPEAK</Text>

          <CustomerSpeak bannerData={['Yeti Singh', 'Yeti Singh', 'Yeti Singh']} />
        </Box>
        }


        <ScreenBottomAchievement />


      </Body>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalReportUploadVisible}
        onRequestClose={() => setModalReportUploadVisible(false)}
      >
        <Box flex={1} justifyContent='center' alignItems='center' backgroundColor='rgba(0, 0, 0, 0.5)' >
          <Box backgroundColor='#fff' borderRadius={10} alignItems='center' elevation={5} w={'80%'} h={'27%'} >
            <Pressable onPress={() => setModalReportUploadVisible(false)} style={{ alignSelf: 'flex-end', marginRight: responsiveWidth(2), marginTop: responsiveHeight(1) }} >
              <CloseIcon />
            </Pressable>
            {/* <Box alignItems='center' gap={5} >
              
              <Text fontFamily='$InterSemiBold' color={colors.black} textAlign='center' fontSize={18} mt={3} >Oops!</Text>
              <Text fontFamily='$InterRegular' color={'#767474'} textAlign='center' fontSize={13} >MeetID Not Found</Text>

              <PrimaryButton onPress={() => {}} buttonText='Try again' height={35} />
            </Box> */}
            <View
              style={{
                borderWidth: 1,
                borderStyle: 'dotted',


                borderColor: colors.gray7,
                marginVertical: responsiveHeight(1.5),
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: responsiveHeight(3),
                borderRadius: responsiveWidth(1),
                paddingHorizontal: responsiveWidth(1)
              }}>
              {/* <Ionicons
                  name="add-circle-outline"
                  size={30}
                  color={colors.black}
                /> */}

              {slectedFileData?.uri === '' && <TouchableOpacity activeOpacity={0.6} onPress={selectDoc} style={{ borderWidth: 1, borderColor: colors.black, borderRadius: responsiveWidth(6), alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: colors.black, fontSize: responsiveFontSize(2.3), fontWeight: '400', marginHorizontal: responsiveWidth(1.5), alignSelf: 'center' }} >+</Text>
              </TouchableOpacity>}
              {slectedFileData?.uri === '' ? <CText
                type="b12"
                numberOfLines={1}
                color={colors.black}
                style={styles.mv10}>
                {strings.Dragyourfileshere}
              </CText> : <CText
                type="b12"
                numberOfLines={1}
                color={colors.green1}
                style={styles.mv10}>
                {'Image added successfully'}
              </CText>}
              <CText type="m12" color={colors.black} align="center">
                <CText
                  suppressHighlighting={true}
                  type="m10"
                  style={[
                    localStyles.underLineStyle,
                    {
                      textDecorationColor: colors.primary,
                    },
                  ]}
                  color={colors.primary}>
                  {strings.Upload}
                </CText>

                {strings.fromyourdevice}
              </CText>
            </View>

            <PrimaryButton onPress={() => { onSubmitReport() }} loading={reportUploadIsLoading} disabled={reportUploadIsLoading} buttonText='submit' height={responsiveHeight(4)} />
          </Box>
        </Box>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalReportViewVisible}
        onRequestClose={() => setModalReportViewVisible(false)}
      >
        <Box flex={1} justifyContent='center' alignItems='center' backgroundColor='rgba(0, 0, 0, 0.5)' >
          <Box backgroundColor='#fff' borderRadius={10} alignItems='center' elevation={5} w={'85%'} h={'40%'} >
            <Pressable onPress={() => setModalReportViewVisible(false)} style={{ alignSelf: 'flex-end', marginRight: responsiveWidth(2), marginTop: responsiveHeight(1) }} >
              <CloseIcon />
            </Pressable>

            <FlatList
      data={ reportByAppointmentIdData?.data?.result[0]?.reportView}
      showsVerticalScrollIndicator={false}
      renderItem={({item,index})=>{
        return(
         
              <View key={index.toString()} style={localStyles.reportWrapper} >
                <PrescriptionDrawerIconFilled />
                <View style={{ marginLeft: responsiveWidth(1) }} >
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:'space-between'}} >
                    <Text style={{ color: colors.black, ...typography.fontSizes.f10, ...typography.fontWeights.SemiBold, }} >{item?.report_name}</Text>
                    <ReportTick />
                  </View>

                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:'space-between'}} >
                    <ProgressView
                      progressTintColor={colors.primary}
                      // trackTintColor="blue"
                      progress={1}
                      style={{ width: responsiveWidth(60) }}
                    />
                    <Text style={{ color: colors.black, ...typography.fontSizes.f8, ...typography.fontWeights.Medium, marginLeft: responsiveWidth(2.5) }} >100%</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >

                    <View style={{ flexDirection: 'row', gap: responsiveWidth(3) }} >

                      <TouchableOpacity onPress={()=>{openPdfInBrowser(item?.report)}} style={{ borderWidth: 1, borderColor: colors.primary, borderRadius: responsiveWidth(1.5), paddingHorizontal: responsiveWidth(1.5) }} >
                        <Text style={{ color: colors.primary, ...typography.fontSizes.f10, ...typography.fontWeights.Medium }} >{strings.download}</Text>
                      </TouchableOpacity>

                      {/* <TouchableOpacity onPress={()=>{openPdfInBrowser(item?.report)}} style={{ borderBottomWidth: 1, borderBottomColor: '#9DA3A4' }} >
        <Text style={{ color: '#9DA3A4', ...typography.fontSizes.f10, ...typography.fontWeights.Medium }} >View</Text>
      </TouchableOpacity> */}

                    </View>

                    <TouchableOpacity onPress={()=>{deleteReport(item?.id)}} activeOpacity={0.6} >
                      <ReportDeleteIcon width={responsiveWidth(8)} height={responsiveWidth(5)} />
                    </TouchableOpacity>


                  </View>


                </View>
              </View>
          
        )
      }}
      keyExtractor={({item,index}) => item?.id?.toString()}
    />

            {
              reportByAppointmentIdData?.data?.result[0]?.reportView?.length == 0 && <Box flex={1} justifyContent='center' >
                <CText type='m12' >No Found Data</CText>
                <Spinner alignSelf='center' size={'small'} color={colors.primary} />
              </Box>
            }



          </Box>
        </Box>
      </Modal>

    </Container>
  )
}

export default Appointments

const localStyles = StyleSheet.create({
  straStyle: {
    height: moderateScale(7),
    width: moderateScale(7),
    marginVertical: responsiveHeight(0.7)
  },
  btnContainer: {
    ...styles.flexRow,
    ...styles.itemsCenter,
    marginTop: responsiveHeight(0.5),
    gap: moderateScale(15)
  },
  videoCallBtn: {
    ...styles.rowCenter,
    ...styles.ph10,
    borderRadius: moderateScale(5),
    backgroundColor: colors.success,
    borderWidth: moderateScale(1),
    borderColor: colors.success,
    height: getHeight(28),
  },
  resheduleBtn: {
    // ...styles.ml8,

    height: getHeight(28),
    ...styles.rowCenter,
    borderRadius: moderateScale(5),
    borderWidth: moderateScale(1),
    borderColor: colors.primary,
    paddingHorizontal: responsiveWidth(1.5)
  },
  leftTextStyle: {
    marginLeft: moderateScale(3),
  },
  uploadBtnStyle: {
    ...styles.rowCenter,
    ...styles.mt5,
  },
  docViewStyle: {
    ...styles.rowCenter,
    ...styles.mt5,
    ...styles.ml8,
    borderBottomWidth: moderateScale(1),
    borderBottomColor: colors.textColor4,
  },
  underLineStyle: {
    textDecorationStyle: 'solid',
    textDecorationColor: colors.success,
  },
  reportWrapper: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: responsiveWidth(2),

    marginVertical: responsiveHeight(1.5),
    borderColor: '#DBD7D7',
    paddingHorizontal: responsiveWidth(2),
    paddingVertical: responsiveHeight(1.5),

  }
})