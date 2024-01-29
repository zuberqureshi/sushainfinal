import { Image, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Container } from '../../components/Container'
import Body from '../../components/Body/Body'
import CHeader from '../../components/common/CHeader'
import SearchWithLikeComponent from '../../components/common/CommonComponent/SearchWithLikeComponent'
import { Box, Pressable } from '@gluestack-ui/themed'
import { Text } from '@gluestack-ui/themed'
import { AppointmentBeautyIcon, AppointmentMedicinesIcon, AppointmentOrderIcon, BuyPrescription, CalenderIcon, ClockSmallColorIcon, DiscountGreenIcon, DownloadWhiteIcon, GreaterThanBlack, GreaterThanIcon, ShakeHand, StarFilledPrimaryColor, StarUnFilledPrimaryColor, UploadDocIcon, VideoCallIcon, ViewBlackEyeIcon, WatchIcon } from '../../assets/svgs'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { colors, styles } from '../../themes'
import { getHeight, moderateScale } from '../../common/constants'
import RatingComponent from '../../components/HomeComponent/RatingComponent';
import CText from '../../components/common/CText'
import BannerList from '../../components/HomeComponent/BannerList'
import CustomerSpeak from '../../components/common/CustomerSpeak'
import ScreenBottomAchievement from '../../components/common/ScreenBottomAchievement/ScreenBottomAchievement'

const Appointments = () => {

  const [status, setStatus] = useState(false)
  const [selectedAppointmentView, setselectedAppointmentView] = useState('upcoming')
  const [selectedReviewStar, setSelectedReviewStar] = useState<number>(0)

  return (
    <Container statusBarStyle='dark-content' >
      <CHeader title='Appointments' />
      <SearchWithLikeComponent />
      <Body style={{ paddingBottom: responsiveHeight(3) }} >
        <Box flexDirection='row' alignItems='center' gap={4} my={8} style={{ marginHorizontal: responsiveWidth(3) }} >
          <Text fontFamily='$InterRegular' fontSize={20} color='#8D9192' >Hello, Jeffrey!</Text>
          <ShakeHand />
        </Box>

        <Box backgroundColor='#EAE5E566' py={10} px={15} borderRadius={10} mt={10} style={{ marginHorizontal: responsiveWidth(3) }} >
          <Text fontFamily='$InikaBold' fontSize={16} color={colors.success}>Today <Text fontFamily='$InikaBold' fontSize={16} color={colors.primary}>Appointment</Text></Text>
          <Text fontFamily='$InterRegular' fontSize={8} color={colors.black}>Appointment Id: 345567872782889</Text>

          <Box flexDirection='row' alignItems='center' gap={14} mt={6} >
            <Image source={require('../../assets/images/constantImg4.png')} style={{ resizeMode: 'cover', width: responsiveWidth(13), height: responsiveHeight(6.5), borderRadius: responsiveWidth(15), alignSelf: 'flex-start' }} />
            <Box flexDirection='column' pt={5} >
              <Text fontFamily='$InikaBold' fontSize={15} color={colors.primary}>Dr. Pallvi Rathee</Text>
              <Text fontFamily='$InterRegular' lineHeight={13} fontSize={9} color={colors.black} w={228} >Gynae and Fertility, Garbhsanskar, PCOD and UT Fibroid, Pre Conception Care</Text>
              <RatingComponent
                star={5}
                style={localStyles.straStyle}
              />
              <Box flexDirection='row' alignItems='center' gap={27}>
                <Box flexDirection='row' alignItems='center' gap={2}>
                  <WatchIcon />
                  <Text fontFamily='$InterSemiBold' fontSize={12} color={'#5B5D5E'}>1:30PM</Text>
                </Box>
                <Box flexDirection='row' alignItems='center' gap={4}>
                  <CalenderIcon />
                  <Text fontFamily='$InterSemiBold' fontSize={12} color={'#5B5D5E'}>10 Aug</Text>
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
                <TouchableOpacity style={localStyles.resheduleBtn}>
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

        </Box>

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
                {['Dr. Preeti Chhabra', 'Dr. Anshu Sharma'].map((item, index) => {

                  return (
                    <Box key={index} flexDirection='row' backgroundColor='#FCFFFF' alignItems='center' gap={14} mt={20} borderRadius={10} overflow='hidden' pl={10} justifyContent='space-between' style={{
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 1,
                      },
                      shadowOpacity: 0.22,
                      shadowRadius: 2.22,
                      elevation: 3,
                    }} >
                      <Box flexDirection='row' alignItems='center' gap={14} py={10}>
                        <Image source={require('../../assets/images/constantImg4.png')} style={{ resizeMode: 'cover', width: responsiveWidth(13), height: responsiveHeight(6.5), borderRadius: responsiveWidth(15), alignSelf: 'flex-start', }} />
                        <Box flexDirection='column' gap={9} >
                          <Box flexDirection='row' alignItems='center' >
                            <Box gap={3} >
                              <Text fontFamily='$InikaBold' fontSize={14} color={colors.primary}>Dr. Preeti Chhabra</Text>
                              <Text fontFamily='$InterRegular' lineHeight={13} fontSize={10} color={colors.black} >Appointment Id: 465316277829919</Text>
                            </Box>
                            <Box flexDirection='row' alignItems='center' alignSelf='flex-start' gap={2} >
                              <ClockSmallColorIcon />
                              <Text fontFamily='$InterBold' fontSize={11} color={colors.primary}  >1:30PM</Text>
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
                            <TouchableOpacity style={localStyles.resheduleBtn}>
                              <Text fontFamily='$InikaRegular' lineHeight={13} fontSize={11} color={colors.primary} textAlign='center' px={15} >Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={localStyles.resheduleBtn}>
                              <Text fontFamily='$InikaRegular' lineHeight={13} fontSize={11} color={colors.primary} textAlign='center' px={4}>Reschedule</Text>
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
                      <Box w={36} h={'100%'} backgroundColor='#EAE5E566' pt={40} >
                        <Text fontFamily='$InikaRegular' w={23} lineHeight={13} fontSize={12} color={colors.black} textAlign='center' alignSelf='center' mt={32} >15 Aug</Text>
                      </Box>

                    </Box>
                  )
                })}

              </Box>
               
              <TouchableOpacity activeOpacity={0.6} >
              <Box backgroundColor={colors.primary} alignSelf='center' h={24} w={109} borderRadius={10} alignItems='center' my={30} >
                <Text fontFamily='$InterMedium' fontSize={13} color={colors.white}>Show more</Text>
              </Box>
              </TouchableOpacity> 
             

              <Box backgroundColor='#D9D9D933' py={30} px={16} >

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
                    <Text fontFamily='$InterMedium' fontSize={13} color={'#5E5F5C'}>Show more</Text>
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
          ) : (
            <Box backgroundColor='#F7F7F7' pb={25} mb={10} mt={10} >
              <Text fontFamily='$InikaRegular' fontSize={13} color={'#696767'} my={8} mx={16} >Don’t forget to take Follow up</Text>

              <Box backgroundColor='#FCFFFF' shadowOffset={{width:0,height:1}} shadowColor='#000' shadowOpacity={0.22} shadowRadius={2.22} elevation={3} mx={16} gap={18} mt={20} borderRadius={10} overflow='hidden' px={10} style={{
                shadowColor: "#000",
                shadowOffset: {
                  width: 1,
                  height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,
                elevation: 3,
              }} >
                <Box flexDirection='row' alignItems='center' gap={18} py={10}>
                  <Image source={require('../../assets/images/constantImg4.png')} style={{ resizeMode: 'cover', width: responsiveWidth(13), height: responsiveHeight(6.5), borderRadius: responsiveWidth(15), alignSelf: 'flex-start', }} />
                  <Box flexDirection='column' gap={9} >
                    <Box flexDirection='row' alignItems='center' >
                      <Box gap={3} >
                        <Text fontFamily='$InikaBold' fontSize={14} color={colors.primary}>Dr. Preeti Chhabra</Text>
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

              <Box backgroundColor='#FCFFFF' mx={16} gap={18} mt={20} borderRadius={10} overflow='hidden' px={12} py={16} style={{
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,
                elevation: 3,
              }} >
                <Text fontFamily='$InterRegular' fontSize={11} lineHeight={13} color={colors.black} >Please review your experience with the last doctor : Dr. Anshu Sharma</Text>

                <Box flexDirection='row' gap={5} >

                  {['1', '2', '3', '4', '5'].map((item, index):any => {
                    return (
                      <TouchableOpacity key={index.toString()}  onPress={()=>{setSelectedReviewStar(index+1)}} activeOpacity={0.6} >
                           {item < (selectedReviewStar + 1 )? <StarFilledPrimaryColor/> : <StarUnFilledPrimaryColor/>}
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


              </Box>

              <TouchableOpacity activeOpacity={0.6} >
              <Box backgroundColor={colors.primary} alignSelf='center' h={24} w={109} borderRadius={10} alignItems='center' my={30} >
                <Text fontFamily='$InterMedium' fontSize={13} color={colors.white}>Show more</Text>
              </Box>
              </TouchableOpacity> 
             
        

              <Box pb={30} pt={8} px={16} >

              <Box flexDirection='row' alignItems='center' gap={5} mb={15}>
                  <DiscountGreenIcon style={{alignSelf:'flex-start',marginTop:responsiveHeight(0.9)}} />
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
                    <Text fontFamily='$InterMedium' fontSize={13} color={'#5E5F5C'}>Show more</Text>
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

        <BannerList bannerData={['16971297716815.png', '16971297716815.png', '16971297716815.png']} />


        {selectedAppointmentView === 'upcoming' && <Box>


          <Text fontFamily='$InterBold' fontSize={14} color={colors.success} textAlign='center' my={8} >CUSTOMER SPEAK</Text>

          <CustomerSpeak bannerData={['Yeti Singh', 'Yeti Singh', 'Yeti Singh']} />
        </Box>
        }


        <ScreenBottomAchievement />


      </Body>

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
})