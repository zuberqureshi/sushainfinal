import { FlatList, Image, Linking, Modal, Platform, Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import ImagePicker from 'react-native-image-crop-picker';

// local imports
import CText from '../common/CText';
import { colors } from '../../themes';
import { styles } from '../../themes';
import typography from '../../themes/typography';
import { Api_Image_Base_Url, getHeight, moderateScale } from '../../common/constants';
import images from '../../assets/images';
import RatingComponent from './RatingComponent';
import {
  BuyPrescription,
  CalenderIcon,
  OppsIcon,
  PlusCircleIcon,
  PrescriptionDrawerIconFilled,
  ReportDeleteIcon,
  ReportTick,
  UploadDocIcon,
  VideoCallIcon,
  WatchIcon,
} from '../../assets/svgs';
import CInput from '../common/CInput';

import { Box, CloseIcon, Text, Toast, ToastTitle, useToast } from '@gluestack-ui/themed';
import moment from 'moment';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNav } from '../../navigation/NavigationKeys';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { ProgressView } from '@react-native-community/progress-view';
import strings from '../../i18n/strings';
import useGetReportByAppointmentId from '../../hooks/appointment/get-report-by-appointment';
import { Spinner } from '@gluestack-ui/themed';
import { queryClient } from '../../react-query/client';
import appointmentService from '../../services/appointment-service';
import useDeleteReportById from '../../hooks/appointment/delete-report';
import PrimaryButton from '../common/Button/PrimaryButton';
import { androidCameraAudioPermission, androidCameraPermission } from '../../utils/permission';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const TimeComponent = ({ icon, time, style }: any) => {
  return (
    <View style={[localStyles.dateContainer, style]}>
      {icon}
      <CText type="r12" style={{ ...styles.ml5, textTransform: 'uppercase' }} color={colors.black}>
        {time}
      </CText>
    </View>
  );
};

export default function UpcomingAppointment({ isFollowUp, data }: { isFollowUp: boolean, data: any }) {

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const toast = useToast()

  const [review, setReview] = useState('');
  const [modalReportViewVisible, setModalReportViewVisible] = useState(false)
  const [modalReportUploadVisible, setModalReportUploadVisible] = useState(false)
  const [reportUploadIsLoading, setReportUploadIsLoading] = useState(false)
  const [slectedFileData, setSlectedFileData] = useState({ uri: '', type: '' })

  //api call
  const { data: reportByAppointmentIdData, isLoading: isLoadingReportByAppointmentId } = useGetReportByAppointmentId(data?.orderId)
  const useDeleteReportMutation = useDeleteReportById()

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

  const onChnageReview = (text: string) => setReview(text);
  const iconStyle = moderateScale(13);

  const getTodayAppointmentTime = () => {

    const date = new Date(data?.start_time);


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

  const deleteReport = (id) => {

    setModalReportViewVisible(false)



    useDeleteReportMutation.mutate(id, {
      onSuccess: (dataa) => {



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
          queryKey: [appointmentService.queryKeys.getReportByAppointmentId + data?.orderId]
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
    // console.log({ selectedAppId });

    setReportUploadIsLoading(true)
    const formData = new FormData()


    formData.append('app_id', data?.orderId)
    if (slectedFileData?.uri !== '') {
      formData.append('images', {
        uri: slectedFileData.uri as string,
        type: slectedFileData.type,
        name: parseUri(slectedFileData.uri).name,
      });
    }
    formData.append('report_name', `${parseUri(slectedFileData.uri).name.substring(0, parseUri(slectedFileData.uri).name.lastIndexOf('.'))}`)
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
        queryKey: [appointmentService.queryKeys.getReportByAppointmentId + data?.orderId]
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

  const onPressJoinVC = async() => {

    try { 
      const permissionStatus = await androidCameraAudioPermission()
      // setPermissionGet(permissionStatus)
      if(permissionStatus || Platform.OS === 'ios' ){
        // console.log('in PERMISSIONSTATUS');
        
        setTimeout(() => {
          navigation.navigate(StackNav.VideoCall)

        }, 500);
      }else{
        console.log(permissionStatus, 'Not GRANTED videocall');
      }
      // console.log(permissionStatus, 'tryy videocall');

    } catch (err) {

      console.log(err);

    }
  }


  return (
    <View style={styles.mh15}>
      <View style={localStyles.root}>
        <CText type="s14" numberOfLines={1} style={localStyles.titleTextStyle}>
          {data?.visited === 2
            ? 'Don’t forget to book a follow up call'
            : 'Upcoming Appointment'}
        </CText>
        {/* {data?.visited === 1 && (
          <TouchableOpacity>
            <CText type="r8" color={colors.textColor1}>
              {'Appointment Id: 627782991946531'}
            </CText>
          </TouchableOpacity>
        )} */}
      </View>
      <View style={localStyles.cardMainContainer}>
        <View>
          <Image
            source={images.ayurvedicImage}
            style={localStyles.doctorImgStyle}
          />
          {data?.rating != null && (
            <View style={styles.center}>
              <RatingComponent star={data?.rating} style={localStyles.straStyle} />
            </View>
          )}
        </View>
        <View style={localStyles.rightContainer}>
          <CText type="m12" color={colors.black}>
            {data?.doc_name}
          </CText>
          {/* <CText type="r10" style={styles.mt2} color={colors.textColor2}>
            {'Diabetes, General Medicine & Others'}
          </CText> */}
          <Text fontFamily='$InterRegular' fontSize={10} color={colors.textColor2}>Appointment Id: {data?.orderId}</Text>
          <View style={localStyles.timeContianer}>
            <TimeComponent
              icon={<WatchIcon width={iconStyle} height={iconStyle} />}
              time={getTodayAppointmentTime()}
            />
            <TimeComponent
              icon={<CalenderIcon width={iconStyle} height={iconStyle} />}
              time={`${moment(data?.date).format('DD')} ${moment(data?.date).format('MMM')}`}
              style={styles.ml10}
            />
          </View>
          <View style={localStyles.btnContainer}>
            {data?.visited === 1 ? <TouchableOpacity onPress={()=>{onPressJoinVC()}} style={localStyles.videoCallBtn}>

              <VideoCallIcon
                width={moderateScale(12)}
                height={moderateScale(12)}
              />

              <CText
                type="r10"
                color={colors.white}
                style={localStyles.leftTextStyle}>
                {'Join Video call'}
              </CText>
            </TouchableOpacity> :
              <TouchableOpacity style={localStyles.videoCallBtn}>

                <BuyPrescription
                  width={moderateScale(14)}
                  height={moderateScale(14)}
                />

                <CText
                  type="r10"
                  color={colors.white}
                  style={localStyles.leftTextStyle}>
                  {'Buy Prescription'}
                </CText>
              </TouchableOpacity>
            }

            {data?.visited === 1 ? <TouchableOpacity onPress={() => { navigation.navigate(StackNav.RescheduleAppointment, { type: data?.type, appid: data?.orderId }) }} style={localStyles.resheduleBtn}>
              <CText type="r10" color={colors.primary2}>
                {'Reschedule'}
              </CText>
            </TouchableOpacity> :
              <TouchableOpacity style={localStyles.resheduleBtn}>
                <CText type="r10" color={colors.primary2}>
                  {'Book Follow Up'}
                </CText>
              </TouchableOpacity>
            }


          </View>
          <View style={localStyles.btnContainer}>

            {data?.visited === 1 ? <TouchableOpacity onPress={async () => {
                  setModalReportUploadVisible(true)
                  // await setSelectedAppId(todayAppointmentsData?.data?.result[0]?.consultationDetail?.orderId)
                }}  style={localStyles.uploadBtnStyle}>
              <UploadDocIcon />
              <CText type="m10" style={styles.ml5} color={colors.textColor3}>
                {'Upload Reports'}
              </CText>
            </TouchableOpacity> :
              <TouchableOpacity style={localStyles.uploadBtnStyle}>
                <UploadDocIcon />
                <CText type="m10" style={styles.ml5} color={colors.textColor3}>
                  {'Buy Prescription'}
                </CText>
              </TouchableOpacity>
            }

            {data?.visited === 1 && <TouchableOpacity onPress={()=>{
              setModalReportViewVisible(true)
            }} style={localStyles.docViewStyle}>
              <CText type="m10" color={colors.textColor4}>
                {'View'}
              </CText>
            </TouchableOpacity>}

          </View>
        </View>
      </View>

      {data?.visited === 2 && (



        <View style={localStyles.bottomCardContainer}>
          <CText type="r12" color={colors.black}>
            {
              `Please review your experience with the last doctor : ${data?.doc_name}`
            }
          </CText>
          <RatingComponent star={4} style={localStyles.reviewStarStyle} />
          <CInput
            placeholder={'Type here........'}
            inputContainerStyle={styles.mt5}
            inputBoxStyle={localStyles.textInputStyle}
            multiline
            numberOfLines={5}
            _value={review}
            toGetTextFieldValue={onChnageReview}
          />
          <View style={localStyles.reviewBtnStyle}>
            <TouchableOpacity style={localStyles.submitBtnStyle}>
              <CText type="r12" color={colors.white}>
                {'Submit'}
              </CText>
            </TouchableOpacity>
            <TouchableOpacity style={localStyles.remideBtnStyle}>
              <CText type="r12" color={colors.textColor4}>
                {'Remind me later'}
              </CText>
            </TouchableOpacity>
          </View>
        </View>
      )}

<Modal
        animationType="slide"
        transparent={true}
        visible={modalReportUploadVisible}
        onRequestClose={() => setModalReportUploadVisible(false)}
      >
        <Box flex={1} justifyContent='center' alignItems='center' backgroundColor='rgba(0, 0, 0, 0.5)' >
          <Box backgroundColor='#fff' borderRadius={10} alignItems='center' elevation={5}  p={5} >
            <TouchableOpacity activeOpacity={0.6} onPress={() => setModalReportUploadVisible(false)} style={{ alignSelf: 'flex-end', marginTop: responsiveHeight(1) }} >
              <CloseIcon />
            </TouchableOpacity>

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
                paddingHorizontal: responsiveWidth(1),
                width: responsiveWidth(70),
                height: responsiveHeight(17),
                marginHorizontal:responsiveWidth(1.5)
              }}>

              {slectedFileData?.uri === '' && <TouchableOpacity style={{ alignSelf: 'center' }} activeOpacity={0.6} onPress={selectDoc} >
                <PlusCircleIcon width={responsiveWidth(12)} height={responsiveHeight(6)} /></TouchableOpacity>}

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
                  numberOfLines={1}
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
            <TouchableOpacity activeOpacity={0.6} onPress={() => setModalReportViewVisible(false)} style={{ alignSelf: 'flex-end', marginRight: responsiveWidth(2), marginTop: responsiveHeight(1) }} >
              <CloseIcon />
            </TouchableOpacity>

            {
              reportByAppointmentIdData?.data?.result[0]?.reportView?.length !== 0 ? <FlatList
                data={reportByAppointmentIdData?.data?.result[0]?.reportView}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => {
                  return (

                    <View key={index.toString()} style={localStyles.reportWrapper} >
                      <PrescriptionDrawerIconFilled />
                      <View style={{ marginLeft: responsiveWidth(1) }} >
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
                          <Text style={{ color: colors.black, ...typography.fontSizes.f10, ...typography.fontWeights.SemiBold, }} w={150} numberOfLines={1} >{item?.report_name}</Text>
                          <ReportTick />
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
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

                            <TouchableOpacity onPress={() => { openPdfInBrowser(data?.report) }} style={{ borderWidth: 1, borderColor: colors.primary, borderRadius: responsiveWidth(1.5), paddingHorizontal: responsiveWidth(1.5) }} >
                              <Text style={{ color: colors.primary, ...typography.fontSizes.f10, ...typography.fontWeights.Medium }} >{strings.download}</Text>
                            </TouchableOpacity>

                          </View>

                          <TouchableOpacity onPress={() => { deleteReport(item?.id) }} activeOpacity={0.6} >
                            <ReportDeleteIcon width={responsiveWidth(8)} height={responsiveWidth(5)} />
                          </TouchableOpacity>


                        </View>


                      </View>
                    </View>

                  )
                }}
                keyExtractor={({ item, index }) => (item?.id || index)?.toString()}
              /> :

                <Box flex={1} justifyContent='center' alignItems='center' >
                  <OppsIcon/>
                  <CText type='m14' >No Found Data</CText>
                  {/* <Spinner alignSelf='center' size={'small'} color={colors.primary} /> */}
                </Box>
            }

            {isLoadingReportByAppointmentId && <Box flex={1} justifyContent='center' alignItems='center' >
              <Spinner size={'small'} color={colors.primary} />
            </Box>}



          </Box>
        </Box>
      </Modal>
    </View>
  );
}

const localStyles = StyleSheet.create({
  root: {
    ...styles.flex,
    ...styles.mv10,
    ...styles.rowSpaceBetween,
  },
  titleTextStyle: {
    ...styles.pr10,
    ...styles.flex,
  },
  cardMainContainer: {
    ...styles.mv10,
    ...styles.p10,
    ...styles.flexRow,
    ...styles.itemsStart,
    backgroundColor: colors.white4,
    borderRadius: moderateScale(10),
    ...styles.shadowStyle,
    ...styles.mh5
  },
  doctorImgStyle: {
    height: getHeight(85),
    width: moderateScale(82),
    borderRadius: moderateScale(10),
    resizeMode: 'contain',
    borderWidth: moderateScale(1),
    borderColor: colors.primary,
    ...styles.mb5,
  },
  straStyle: {
    height: moderateScale(10),
    width: moderateScale(10),
    marginRight: moderateScale(2),
    ...styles.selfCenter,
  },
  rightContainer: {
    ...styles.ml10,
  },
  timeContianer: {
    ...styles.flexRow,
    ...styles.itemsCenter,
    ...styles.mv5,
  },
  dateContainer: {
    ...styles.flexRow,
    ...styles.itemsCenter,
  },
  btnContainer: {
    ...styles.flexRow,
    ...styles.itemsCenter,
  },
  videoCallBtn: {
    ...styles.rowCenter,
    ...styles.ph5,
    borderRadius: moderateScale(5),
    backgroundColor: colors.success,
    borderWidth: moderateScale(1),
    borderColor: colors.success,
    height: getHeight(28),
  },
  resheduleBtn: {
    ...styles.ml8,
    height: getHeight(28),
    ...styles.rowCenter,
    ...styles.ph5,
    borderRadius: moderateScale(5),
    borderWidth: moderateScale(1),
    borderColor: colors.primary,
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
  bottomCardContainer: {
    ...styles.mv10,
    ...styles.p10,
    ...styles.ph15,
    backgroundColor: colors.white,
    borderRadius: moderateScale(10),
    ...styles.shadowStyle,
    ...styles.mh5
  },
  reviewStarStyle: {
    height: moderateScale(14),
    width: moderateScale(14),
    marginRight: moderateScale(2),
    ...styles.selfCenter,
    ...styles.mt10,
    tintColor: colors.primary,
  },
  textInputStyle: {
    ...typography.fontSizes.f12,
    ...typography.fontWeights.Regular,
    ...styles.p10,
  },
  reviewBtnStyle: {
    ...styles.rowCenter,
    ...styles.mt5,
  },
  submitBtnStyle: {
    ...styles.rowCenter,
    ...styles.ph10,
    ...styles.pv5,
    marginRight: moderateScale(3),
    borderRadius: moderateScale(5),
    backgroundColor: colors.primary,
  },
  remideBtnStyle: {
    ...styles.rowCenter,
    ...styles.ph10,
    ...styles.pv5,
    marginLeft: moderateScale(3),
  },
  reportWrapper: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: responsiveWidth(2),

    marginVertical: responsiveHeight(1.5),
    borderColor: '#DBD7D7',
    paddingHorizontal: responsiveWidth(2),
    paddingVertical: responsiveHeight(1.5),

  },
  underLineStyle: {
    textDecorationStyle: 'solid',
    textDecorationColor: colors.success,
  },
});
