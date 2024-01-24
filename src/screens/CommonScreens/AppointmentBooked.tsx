import {
  StyleSheet,
  Text,
  View,
  Image,
  Switch,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState,useRef} from 'react';
import CSafeAreaView from '../../components/common/CSafeAreaView';
import KeyBoardAvoidWrapper from '../../components/common/KeyBoardAvoidWrapper';
import CHeader from '../../components/common/CHeader';
import strings from '../../i18n/strings';
import images from '../../assets/images';
import {getHeight, moderateScale} from '../../common/constants';
import {colors, styles} from '../../themes';
import CText from '../../components/common/CText';
import {BottomIconWhite, PrescriptionDrawerIcon, PrescriptionDrawerIconFilled, ReportDeleteIcon, ReportTick, RightArrow} from '../../assets/svgs';
import DocumentPicker from 'react-native-document-picker';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackNav} from '../../navigation/NavigationKeys';
import BootamModal from '../../components/common/modal/BootamModal';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import {ProgressView} from "@react-native-community/progress-view";
import typography from '../../themes/typography';
import RBSheet from "react-native-raw-bottom-sheet";

const AppointmentBooked = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const refRBSheet = useRef();
  const refRBSheetReschedule = useRef();
  const [switchVal, setSwitchVal] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visibleCancelAppointment, setVisibleCancelAppointment] =
    useState(false);
  const [visibleAppointment, setVisibleAppointment] = useState(false);
  const [selectedValue, setSelectedValue]: any = useState('option1');

  const [reportUploadShow, setReportUploadShow] = useState(false)

  const openModal = () => {
    setVisible(true);
  };
  const closeModal = () => {
    setVisible(false);
  };
  const cancelAppointmentModal = () => {
    setVisibleCancelAppointment(true);
  };
  const closeCancelModal = () => {
    setVisibleCancelAppointment(false);
  };
  const appointmentModal = () => {
    setVisibleAppointment(true);
  };
  const closeAppointmentModal = () => {
    setVisibleAppointment(false);
  };

  const selectDoc = async () => {
    try {
      // const doc = await DocumentPicker.pick({
      //   type: [DocumentPicker.types.pdf],
      //   allowMultiSelection: true
      // });
      // const doc = await DocumentPicker.pickSingle()
      const doc = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
      });
      console.log(doc);
    } catch (err) {
      if (DocumentPicker.isCancel(err))
        console.log('User cancelled the upload', err);
      else console.log(err);
    }
  };
  return (
    <CSafeAreaView>
      <KeyBoardAvoidWrapper>
        <CHeader title={''} />
        <View style={localStyles.headerSection}>
          <Image source={images.booking} style={localStyles.videoIcon} />
          <CText
            type="b12"
            numberOfLines={2}
            color={colors.black}
            align="center"
            style={{width: moderateScale(250), marginVertical: 10}}>
            {strings.YourAppointment}
          </CText>
        </View>
        <View style={localStyles.sec}>
          <View style={localStyles.detailSec}>
            <CText type="b12" numberOfLines={1} color={colors.white}>
              {strings.PreetiChhabra}
            </CText>
            <View style={localStyles.rowStyle}>
              <CText type="b12" numberOfLines={1} color={colors.white}>
                {strings.Specialist} :
              </CText>
              <CText
                type="r10"
                numberOfLines={2}
                color={colors.white}
                style={{width: moderateScale(200)}}>
                {strings.Gynee}
              </CText>
            </View>
          </View>
          <View style={localStyles.bottomSec}>
            <View style={localStyles.secondSec}>
              <CText type="b12" numberOfLines={1} color={colors.black}>
                {strings.Date}
              </CText>
              <CText type="b12" numberOfLines={1} color={colors.black}>
                13 Oct,2023
              </CText>
            </View>
            <View style={localStyles.secondSec}>
              <CText type="b12" numberOfLines={1} color={colors.black}>
                {strings.time}
              </CText>
              <CText type="b12" numberOfLines={1} color={colors.black}>
                {strings.Time}
              </CText>
            </View>
            <View style={localStyles.secondSec}>
              <CText type="r12" numberOfLines={1} color={colors.black}>
                {strings.AddtoCalendar}
              </CText>
              <Switch
                trackColor={{false: colors.gray7, true: colors.orenge}}
                thumbColor={switchVal ? '#fff' : '#f4f3f4'}
                onValueChange={() => setSwitchVal(prevVal => !prevVal)}
                value={switchVal}
              />
            </View>
          </View>
        </View>
        <TouchableOpacity style={localStyles.btn} onPress={()=>{setReportUploadShow(!reportUploadShow)}}>
          <View style={{flexDirection:'row',marginLeft:responsiveWidth(35)}} >
          <CText type="b16" numberOfLines={1} color={colors.white} style={{marginRight:responsiveWidth(25)}} >
            {strings.Reports}
          </CText>

         <BottomIconWhite width={responsiveWidth(10)} height={responsiveWidth(6)}  />

          </View>
         
        </TouchableOpacity>

       { reportUploadShow && <View style={localStyles.uploadReportWrapper}>
            <CText type="b12" numberOfLines={1} color={colors.black}>
              Upload Reports
            </CText>
            <View
              style={{
                borderWidth: 1,
                borderStyle: 'dotted',
            
             
                borderColor: colors.gray7,
                marginVertical: responsiveHeight(1.5),
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical:responsiveHeight(3)
              }}>
              {/* <Ionicons
                  name="add-circle-outline"
                  size={30}
                  color={colors.black}
                /> */}

                <TouchableOpacity activeOpacity={0.6} onPress={selectDoc} style={{borderWidth:1,borderColor:colors.black,paddingHorizontal:responsiveWidth(2.5),borderRadius:responsiveWidth(6),alignItems:'center',justifyContent:'center'}} >
                  <Text style={{color:colors.black,fontSize:responsiveFontSize(3),fontWeight:'400'}} >+</Text>
                </TouchableOpacity>
              <CText
                type="b12"
                numberOfLines={1}
                color={colors.black}
                style={styles.mv10}>
                {strings.Dragyourfileshere}
              </CText>
              <CText type="m12" color={colors.black} align="center">
                <CText
                  suppressHighlighting={true}
                  type="m12"
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
            <View>
              <TouchableOpacity
                style={localStyles.uplodeBtn}
                onPress={()=>{}}>
                <CText type="m12" numberOfLines={1} color={colors.primary}>
                  {strings.submit}
                </CText>
              </TouchableOpacity>
            </View>

            <View style={localStyles.reportWrapper} >
                <PrescriptionDrawerIconFilled/>
                <View style={{marginLeft:responsiveWidth(1)}} >
                  <View style={{flexDirection:'row',alignItems:'center',gap:responsiveWidth(50)}} >
                    <Text style={{color:colors.black,   ...typography.fontSizes.f10,...typography.fontWeights.SemiBold,}} >{strings.liverreports}</Text>
                    <ReportTick/>
                  </View>

                  <View style={{flexDirection:'row',alignItems:'center',}} >
                  <ProgressView
                     progressTintColor={colors.primary}
                  // trackTintColor="blue"
                     progress={1}
                     style={{width:responsiveWidth(65)}}
                        />
                   <Text style={{color:colors.black,   ...typography.fontSizes.f8,...typography.fontWeights.Medium,marginLeft:responsiveWidth(2.5)}} >100%</Text>     
                  </View>
                  <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}} >

                  <View style={{flexDirection:'row',gap:responsiveWidth(3)}} >

<TouchableOpacity style={{borderWidth:1,borderColor:colors.primary,borderRadius:responsiveWidth(1.5),paddingHorizontal:responsiveWidth(1.5)}} >
  <Text  style={{color:colors.primary,   ...typography.fontSizes.f10,...typography.fontWeights.Medium}} >{strings.download}</Text>
</TouchableOpacity>

<TouchableOpacity style={{borderBottomWidth:1,borderBottomColor:'#9DA3A4'}} >
  <Text style={{color:'#9DA3A4',   ...typography.fontSizes.f10,...typography.fontWeights.Medium}} >View</Text>
</TouchableOpacity>

</View>

<ReportDeleteIcon width={responsiveWidth(8)} height={responsiveWidth(5)}/>

                  </View>
                  

                </View>
            </View>

            <View style={localStyles.reportWrapper} >
                <PrescriptionDrawerIconFilled/>
                <View style={{marginLeft:responsiveWidth(1)}} >
                  <View style={{flexDirection:'row',alignItems:'center',gap:responsiveWidth(50)}} >
                    <Text style={{color:colors.black,   ...typography.fontSizes.f10,...typography.fontWeights.SemiBold,}} >{strings.heartreports}</Text>
                    <ReportTick/>
                  </View>

                  <View style={{flexDirection:'row',alignItems:'center',}} >
                  <ProgressView
                     progressTintColor={colors.primary}
                  trackTintColor="#E8EBEC"
                     progress={0.6}
                     style={{width:responsiveWidth(65)}}
                        />
                   <Text style={{color:colors.black,   ...typography.fontSizes.f8,...typography.fontWeights.Medium,marginLeft:responsiveWidth(2.5)}} >60%</Text>     
                  </View>
                  <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}} >

                  <View style={{flexDirection:'row',gap:responsiveWidth(3)}} >

<TouchableOpacity style={{borderWidth:1,borderColor:colors.primary,borderRadius:responsiveWidth(1.5),paddingHorizontal:responsiveWidth(1.5)}} >
  <Text  style={{color:colors.primary,   ...typography.fontSizes.f10,...typography.fontWeights.Medium}} >{strings.download}</Text>
</TouchableOpacity>

<TouchableOpacity style={{borderBottomWidth:1,borderBottomColor:'#9DA3A4'}} >
  <Text style={{color:'#9DA3A4',   ...typography.fontSizes.f10,...typography.fontWeights.Medium}} >View</Text>
</TouchableOpacity>

</View>

<ReportDeleteIcon width={responsiveWidth(8)} height={responsiveWidth(5)}/>

                  </View>
                  

                </View>
            </View>
          
          </View>}

        <BootamModal
          onBackButtonPress={closeModal}
          isVisible={visible}
          onSwipeDown={() => setVisible(false)}>
          <View style={{padding: 10}}>
            <CText type="b14" numberOfLines={1} color={colors.black}>
              Upload Reports
            </CText>
            <View
              style={{
                borderWidth: 1,
                borderStyle: 'dotted',
                borderRadius: 5, // You can adjust the border radius as needed
                padding: 10, // Adjust padding as needed
                borderColor: colors.gray7,
                marginVertical: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {/* <Ionicons
                  name="add-circle-outline"
                  size={30}
                  color={colors.black}
                /> */}
              <CText
                type="b12"
                numberOfLines={1}
                color={colors.black}
                style={styles.mv10}>
                {strings.Dragyourfileshere}
              </CText>
              <CText type="r12" color={colors.gray} align="center">
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
                  {strings.Upload}
                </CText>

                {strings.fromyourdevice}
              </CText>
            </View>
            <View>
              <TouchableOpacity
                style={localStyles.uplodeBtn}
                onPress={selectDoc}>
                <CText type="m12" numberOfLines={1} color={colors.primary}>
                  {strings.submit}
                </CText>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => setVisible(false)}
                style={[
                  localStyles.btn,
                  {backgroundColor: '#E8EBEC', marginTop: 20},
                ]}>
                <CText type="m16" numberOfLines={1} color={colors.gray7}>
                  {strings.close}
                </CText>
              </TouchableOpacity>
            </View>
          </View>
        </BootamModal>

        <View>
          <TouchableOpacity
          onPress={()=>{setReportUploadShow(false)}}
            style={[
              localStyles.btn,
              {backgroundColor: '#E8EBEC', marginBottom: responsiveHeight(2)},
            ]}>
            <CText type="m16" numberOfLines={1} color={colors.gray7}>
              {strings.close}
            </CText>
          </TouchableOpacity>
        </View>
        <View style={localStyles.hrLine}></View>
        <View>
          <TouchableOpacity
           activeOpacity={0.6}
            style={localStyles.eescheduleBtn}
            onPress={() => refRBSheetReschedule.current.open()}>
            <CText type="m14" numberOfLines={1} color={colors.black}>
              {strings.rescheduleAppointment}
            </CText>
            <RightArrow />
          </TouchableOpacity>
          <BootamModal
            onBackButtonPress={closeAppointmentModal}
            isVisible={visibleAppointment}
            onSwipeDown={() => setVisibleAppointment(false)}>
           
          </BootamModal>
          <RBSheet
        ref={refRBSheetReschedule}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent"
          },
          draggableIcon: {
            backgroundColor: "#000"
          }
        }}
      >
         <View style={{paddingHorizontal:responsiveWidth(3)}}>
              
              <View>
                <View style={{marginBottom:responsiveHeight(1.5)}}>
                <TouchableOpacity
                 activeOpacity={0.6}
                style={localStyles.closeButton}
                onPress={() => refRBSheetReschedule.current.close()}>
                <Image
                  source={images.close}
                  style={localStyles.closeIcon}
                />
              </TouchableOpacity>
                  <CText type="m14" numberOfLines={1} color={colors.black}>
                    {strings.RescheduleAppointment}
                  </CText>
                </View>

                <View>
                  <View style={localStyles.item}>
                    <CText
                      type="r12"
                      numberOfLines={2}
                      color={colors.black}
                      style={{marginRight:responsiveWidth(1)}}>
                      1.
                    </CText>
                    <CText
                      type="r12"
                      numberOfLines={2}
                      color={colors.black}
                      style={{}}>
                      User can reschedule appointment 30 Minutes prior to the appointment.
                    </CText>
                  </View>
                  <View style={localStyles.item}>
                    <CText
                      type="r12"
                      numberOfLines={2}
                      color={colors.black}
                      style={{marginRight:responsiveWidth(1)}}>
                      2.
                    </CText>
                    <CText
                      type="r12"
                      numberOfLines={2}
                      color={colors.black}
                      style={{}}>
                      In case doctor want to reschedule the appointment consent would be taken from patient for the new timings.
                    </CText>
                  </View>
                </View>
              </View>
              <View style={localStyles.bottomModal}>
                <CText
                  type="b12"
                  numberOfLines={1}
                  align="center"
                  color={colors.white}
                  style={styles.mv10}>
                  Would you like to Reschedule Appointment ?
                </CText>
                <View style={styles.rowSpaceBetween}>
                  <TouchableOpacity
                    style={localStyles.bottamBtm}
                    //   onPress={() => {
                    //     navigation.navigate(StackNav.RescheduleAppointment);
                    //     setVisibleAppointment(false);
                    //   }}
                    activeOpacity={0.6}
                    onPress={()=>{navigation.navigate(StackNav.RescheduleAppointment)}}
                  >
                    <CText
                      type="m14"
                      numberOfLines={2}
                      align="center"
                      color={colors.black}
                      style={{}}>
                      Yes
                    </CText>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={localStyles.bottamBtm}
                    activeOpacity={0.6}
                    onPress={closeAppointmentModal}>
                    <CText
                      type="m14"
                      numberOfLines={2}
                      align="center"
                      color={colors.black}
                      style={{}}>
                      No
                    </CText>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
      </RBSheet>
        </View>
        <View style={localStyles.hrLine}></View>
        <View>
          <TouchableOpacity
            style={localStyles.eescheduleBtn}
            onPress={()=>{refRBSheet.current.open()}}>

            <CText type="m14" numberOfLines={1} color={colors.black}>
              {strings.cancelAppointment}
            </CText>
            <RightArrow />
          </TouchableOpacity>
          <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent"
          },
          draggableIcon: {
            backgroundColor: "#000"
          }
        }}
      >
         <View style={{paddingHorizontal:responsiveWidth(3)}}>
             
             <View>
               <View style={{marginBottom:responsiveHeight(3)}}>
               <TouchableOpacity
               style={localStyles.closeButton}
               onPress={()=>{refRBSheet.current.close()}}>
               <Image source={images.close} style={localStyles.closeIcon} />
             </TouchableOpacity>
                 <CText type="m14" numberOfLines={1} color={colors.black}>
                   {strings.AppointmentCancellation}
                 </CText>

                 
               </View>
               <View>
                 <View style={localStyles.item}>
                   <CText
                     type="r12"
                     numberOfLines={2}
                     color={colors.black}
                     style={{ marginRight:responsiveWidth(0.5)}}>
                     1.
                   </CText>
                   <CText
                     type="r12"
                     numberOfLines={2}
                     color={colors.black}
                     style={{}}>
                     Appointment can be cancelled 3 hours prior to the
                     scheduled time.
                   </CText>
                 </View>
                 <View style={localStyles.item}>
                   <CText
                     type="r12"
                     numberOfLines={2}
                     color={colors.black}
                     style={{ marginRight:responsiveWidth(0.5)}}>
                     2.
                   </CText>
                   <CText
                     type="r12"
                     numberOfLines={2}
                     color={colors.black}
                     style={{}}>
                     A standard deduction to the tune 10% against banking and
                     processing charges would be charged.
                   </CText>
                 </View>
                 <View style={localStyles.item}>
                   <CText
                     type="r12"
                     numberOfLines={2}
                     color={colors.black}
                     style={{ marginRight:responsiveWidth(0.5)}}>
                     3.
                   </CText>
                   <CText
                     type="r12"
                     numberOfLines={2}
                     color={colors.black}
                     style={{}}>
                     Refund amount will be returned in the source account
                     within 15 working days.
                   </CText>
                 </View>
               </View>
             </View>
             <TouchableOpacity
             onPress={()=>{navigation.navigate(StackNav.AppointmentCancellation)}}
               style={[localStyles.btn]}
               //   onPress={() => {
               //     navigation.navigate(StackNav.AppointmentCancellation);
               //     setVisibleCancelAppointment(false);
               //   }}
             >
               <CText type="m16" numberOfLines={1} color={colors.white}>
                 {strings.Continue}
               </CText>
             </TouchableOpacity>
           </View>
      </RBSheet>
        
        </View>
        <TouchableOpacity style={localStyles.consultationBtn}>
          <CText type="m14" numberOfLines={1} color={colors.gray7}>
            Consultation fees you have paid ₹ 150
          </CText>
        </TouchableOpacity>
      
    
   
      </KeyBoardAvoidWrapper>
    </CSafeAreaView>
  );
};

export default AppointmentBooked;

const localStyles = StyleSheet.create({
  videoIcon: {
    width: moderateScale(264),
    height: responsiveHeight(20),
    ...styles.mv10,
    marginTop:responsiveHeight(5)
  },
  headerSection: {
    ...styles.justifyCenter,
    ...styles.itemsCenter,
  },
  detailSec: {
    backgroundColor: colors.orenge,
    ...styles.p10,
    ...styles.mh15,
    borderTopStartRadius: responsiveWidth(2.5),
    borderTopEndRadius: responsiveWidth(2.5),
  },
  rowStyle: {
    ...styles.flexRow,
  
  },
  sec: {
    ...styles.mv10,
 
  },
  secondSec: {
    // backgroundColor: colors.green4,
    ...styles.p5,
    ...styles.mh10,
    ...styles.rowSpaceBetween,
  },
  bottomSec: {
    backgroundColor:'#FCE3D6',
    borderBottomRightRadius:responsiveWidth(2.5),
    borderBottomStartRadius: responsiveWidth(2.5),
    ...styles.mh15,
  },
  pickerStyle: {
    ...styles.mh10,
    height: getHeight(50),
    ...styles.justifyCenter,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  btn: {
    backgroundColor: colors.primary,
    ...styles.p10,
    ...styles.justifyCenter,
    ...styles.itemsCenter,
    ...styles.mh15,
    marginTop:responsiveHeight(2),

    borderRadius: responsiveWidth(2.5),
  },
  eescheduleBtn: {
    backgroundColor: colors.white,
    ...styles.rowSpaceBetween,
    ...styles.p10,
    marginHorizontal:responsiveWidth(2.5)
  },
  hrLine: {
    ...styles.horizontalLine,
    backgroundColor: colors.lightgray,
  },
  consultationBtn: {
    backgroundColor: colors.creem,
    ...styles.p10,
    ...styles.justifyCenter,
    ...styles.itemsCenter,
    ...styles.mh15,
    ...styles.mt15,
    marginBottom:responsiveHeight(5)
  },
  uplodeBtn: {
    borderWidth: 1,
    ...styles.p5,
    borderRadius: 10,
    borderColor: colors.primary,
    ...styles.itemsCenter,
    width: moderateScale(100),
    ...styles.selfCenter,
  },
  underLineStyle: {
    textDecorationStyle: 'solid',
    textDecorationColor: colors.success,
  },
  modalContent: {
    backgroundColor: 'white',
    width: '100%',
  },
  closeButton: {
    alignSelf: 'flex-end',
    paddingRight:responsiveWidth(1),
  },
  closeIcon: {
    width: responsiveWidth(5),
    height: responsiveHeight(2.5),
  },
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
   
  },
  bottomModal: {
    backgroundColor: colors.primary,
    ...styles.p10,
    borderRadius: responsiveWidth(2.5),
    ...styles.mh20,
    marginTop:responsiveHeight(2)
  },
  bottamBtm: {
    backgroundColor: colors.white,
    width: moderateScale(100),
    ...styles.p5,
    borderRadius: 10,
    ...styles.mt10,
    ...styles.mh10,
  },
  uploadReportWrapper:{
    borderWidth:1,
    borderRadius:responsiveWidth(3),
    marginHorizontal:responsiveWidth(4),
    marginVertical:responsiveHeight(1.5),
    borderColor:'#DBD7D7',
    paddingHorizontal:responsiveWidth(4),
    paddingVertical:responsiveHeight(1.5),
    
  },
  reportWrapper:{
    flexDirection:'row',
    borderWidth:1,
    borderRadius:responsiveWidth(2),
   
    marginVertical:responsiveHeight(1.5),
    borderColor:'#DBD7D7',
    paddingHorizontal:responsiveWidth(2),
    paddingVertical:responsiveHeight(1.5),

  }
});
