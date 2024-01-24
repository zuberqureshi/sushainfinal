import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';

// local imports
import CText from '../common/CText';
import {colors} from '../../themes';
import {styles} from '../../themes';
import typography from '../../themes/typography';
import {getHeight, moderateScale} from '../../common/constants';
import images from '../../assets/images';
import RatingComponent from './RatingComponent';
import {
  BuyPrescription,
  CalenderIcon,
  UploadDocIcon,
  VideoCallIcon,
  WatchIcon,
} from '../../assets/svgs';
import CInput from '../common/CInput';

const TimeComponent = ({icon, time, style}: any) => {
  return (
    <View style={[localStyles.dateContainer, style]}>
      {icon}
      <CText type="r12" style={styles.ml5} color={colors.black}>
        {time}
      </CText>
    </View>
  );
};

export default function UpcomingAppointment({
  isFollowUp,
}: {
  isFollowUp: boolean;
}) {
  const [review, setReview] = useState('');

  const onChnageReview = (text: string) => setReview(text);
  const iconStyle = moderateScale(13);
  return (
    <View style={styles.mh20}>
      <View style={localStyles.root}>
        <CText type="s14" numberOfLines={1} style={localStyles.titleTextStyle}>
          {isFollowUp
            ? 'Don’t forget to book a follow up call'
            : 'Upcoming Appointment'}
        </CText>
        {!isFollowUp && (
          <TouchableOpacity>
            <CText type="r8" color={colors.textColor1}>
              {'Appointment Id: 627782991946531'}
            </CText>
          </TouchableOpacity>
        )}
      </View>
      <View style={localStyles.cardMainContainer}>
        <View>
          <Image
            source={images.ayurvedicImage}
            style={localStyles.doctorImgStyle}
          />
          {isFollowUp && (
            <View style={styles.center}>
              <RatingComponent star={4} style={localStyles.straStyle} />
            </View>
          )}
        </View>
        <View style={localStyles.rightContainer}>
          <CText type="m12" color={colors.black}>
            {'Dr. Rajesh Singh'}
          </CText>
          <CText type="r10" style={styles.mt2} color={colors.textColor2}>
            {'Diabetes, General Medicine & Others'}
          </CText>
          <View style={localStyles.timeContianer}>
            <TimeComponent
              icon={<WatchIcon width={iconStyle} height={iconStyle} />}
              time={'10:00 AM'}
            />
            <TimeComponent
              icon={<CalenderIcon width={iconStyle} height={iconStyle} />}
              time={'16 Dec'}
              style={styles.ml10}
            />
          </View>
          <View style={localStyles.btnContainer}>
            <TouchableOpacity style={localStyles.videoCallBtn}>
              {isFollowUp ? (
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
                type="r10"
                color={colors.white}
                style={localStyles.leftTextStyle}>
                {isFollowUp ? 'Buy Prescription' : 'Join Video call'}
              </CText>
            </TouchableOpacity>
            <TouchableOpacity style={localStyles.resheduleBtn}>
              <CText type="r10" color={colors.primary2}>
                {isFollowUp ? 'Book Follow Up' : 'Reschedule'}
              </CText>
            </TouchableOpacity>
          </View>
          <View style={localStyles.btnContainer}>
            <TouchableOpacity style={localStyles.uploadBtnStyle}>
              <UploadDocIcon />
              <CText type="m10" style={styles.ml5} color={colors.textColor3}>
                {isFollowUp ? 'Buy Prescription' : 'Upload Reports'}
              </CText>
            </TouchableOpacity>
            <TouchableOpacity style={localStyles.docViewStyle}>
              <CText type="m10" color={colors.textColor4}>
                {'View'}
              </CText>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {isFollowUp && (
        <View style={localStyles.bottomCardContainer}>
          <CText type="r12" color={colors.black}>
            {
              'Please review your experience with the last doctor : Dr. Pallvi Rathee'
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
});
