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

const RescheduleAppointment = () => {

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();


  const [datePickerModel, setDatePickerModel] = useState(false)
  const [selectedDateOption, setSelectedDateOption] = useState(0)



  const today = new Date()
  const startDate = getFormatedDate(today.setDate(today.getDate()), 'YYYY/MM/DD')
  const [selectedDate, setSelectedDate] = useState(startDate);


  const renderSlotItem = ({ item, index }: any) => {
    return (
      <TouchableOpacity style={localStyles.slotContainer}>
        <CText type="m10">{'9:30AM'}</CText>
      </TouchableOpacity>
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


  return (
    <CSafeAreaView>

      <CHeader title={strings.RescheduleAppointment} />

      <View style={localStyles.existingDateWrapper} >
        <Text style={{ color: colors.black, ...typography.fontSizes.f14, ...typography.fontWeights.Medium, }}>{strings.existingDateTime}</Text>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: responsiveHeight(1), gap: responsiveWidth(4) }} >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: responsiveWidth(1) }} >
            <CalendarIconSmall />
            <Text style={{ color: '#444343', ...typography.fontSizes.f12, ...typography.fontWeights.Medium, }} >13 Oct,2023</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: responsiveWidth(1) }}  >
            <ClockIconSmall />
            <Text style={{ color: '#444343', ...typography.fontSizes.f12, ...typography.fontWeights.Medium, }}>11:35AM</Text>
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
              }} >Aug,2023</Text>
              <BottomIconWhite />
            </View>

          </TouchableOpacity>

        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: responsiveHeight(2.5) }} >

          <TouchableOpacity activeOpacity={0.6} onPress={() => { setSelectedDateOption(0) }} >
            <View style={{ backgroundColor: selectedDateOption === 0 ? colors.primary : colors.white, paddingHorizontal: responsiveWidth(4), paddingVertical: responsiveHeight(1.5), gap: responsiveHeight(1.5), justifyContent: 'center', alignItems: 'center', borderRadius: responsiveWidth(3) }} >
              <Text style={{ color: selectedDateOption === 0 ? colors.white : colors.black, ...typography.fontSizes.f12, ...typography.fontWeights.Medium, }} >Sat</Text>
              <Text style={{ color: selectedDateOption === 0 ? colors.white : colors.black, ...typography.fontSizes.f12, ...typography.fontWeights.Medium, }}>13</Text>
            </View>

          </TouchableOpacity>


          <TouchableOpacity activeOpacity={0.6} onPress={() => { setSelectedDateOption(1) }}>
            <View style={{ backgroundColor: selectedDateOption === 1 ? colors.primary : colors.white, paddingHorizontal: responsiveWidth(4), paddingVertical: responsiveHeight(1.5), gap: responsiveHeight(1.5), justifyContent: 'center', alignItems: 'center', borderRadius: responsiveWidth(3) }} >
              <Text style={{ color: selectedDateOption === 1 ? colors.white : colors.black, ...typography.fontSizes.f12, ...typography.fontWeights.Medium, }} >Mon</Text>
              <Text style={{ color: selectedDateOption === 1 ? colors.white : colors.black, ...typography.fontSizes.f12, ...typography.fontWeights.Medium, }}>15</Text>
            </View>

          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.6} onPress={() => { setSelectedDateOption(2) }}>
            <View style={{ backgroundColor: selectedDateOption === 2 ? colors.primary : colors.white, paddingHorizontal: responsiveWidth(4), paddingVertical: responsiveHeight(1.5), gap: responsiveHeight(1.5), justifyContent: 'center', alignItems: 'center', borderRadius: responsiveWidth(3) }} >
              <Text style={{ color: selectedDateOption === 2 ? colors.white : colors.black, ...typography.fontSizes.f12, ...typography.fontWeights.Medium, }} >Tue</Text>
              <Text style={{ color: selectedDateOption === 2 ? colors.white : colors.black, ...typography.fontSizes.f12, ...typography.fontWeights.Medium, }}>16</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.6} onPress={() => { setSelectedDateOption(3) }}>
            <View style={{ backgroundColor: selectedDateOption === 3 ? colors.primary : colors.white, paddingHorizontal: responsiveWidth(4), paddingVertical: responsiveHeight(1.5), gap: responsiveHeight(1.5), justifyContent: 'center', alignItems: 'center', borderRadius: responsiveWidth(3) }} >
              <Text style={{ color: selectedDateOption === 3 ? colors.white : colors.black, ...typography.fontSizes.f12, ...typography.fontWeights.Medium, }} >Wed</Text>
              <Text style={{ color: selectedDateOption === 3 ? colors.white : colors.black, ...typography.fontSizes.f12, ...typography.fontWeights.Medium, }}>17</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.6} onPress={() => { setSelectedDateOption(4) }}>
            <View style={{ backgroundColor: selectedDateOption === 4 ? colors.primary : colors.white, paddingHorizontal: responsiveWidth(4), paddingVertical: responsiveHeight(1.5), gap: responsiveHeight(1.5), justifyContent: 'center', alignItems: 'center', borderRadius: responsiveWidth(3) }} >
              <Text style={{ color: selectedDateOption === 4 ? colors.white : colors.black, ...typography.fontSizes.f12, ...typography.fontWeights.Medium, }} >Thu</Text>
              <Text style={{ color: selectedDateOption === 4 ? colors.white : colors.black, ...typography.fontSizes.f12, ...typography.fontWeights.Medium, }}>18</Text>
            </View>
          </TouchableOpacity>












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
      <View style={{ height: responsiveHeight(15) }}>
        <FlashList
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          renderItem={renderSlotItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={5}
          estimatedItemSize={100}
        // justifyContent="space-between"
        />
      </View>
      <View style={localStyles.rowStyle}>
        <EveningSlotIcon />
        <CText type="r12" style={styles.ph5}>
          {strings.eveningsSlots}
        </CText>
      </View>
      <View style={{ height: responsiveHeight(15) }}>
        <FlashList

          data={[1]}
          renderItem={renderNoSlotItem}
          keyExtractor={(item, index) => index.toString()}
          estimatedItemSize={100}
        // justifyContent="space-between"
        />
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
              selected={selectedDate}
              onDateChange={(propDate) => { setSelectedDate(propDate) }}
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



    </CSafeAreaView>
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