import { FlatList, Image, StyleSheet, TouchableOpacity, View, } from 'react-native';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { FlashList } from '@shopify/flash-list';

// local imports
import SubHeader from '../common/CommonComponent/SubHeader';
import strings from '../../i18n/strings';
import { DoctorSpecialityListData } from '../../types/Types';
import CText from '../common/CText';
import { colors, styles } from '../../themes';
import { API_IMAGE_BASE_URL, getHeight, moderateScale } from '../../common/constants';
import { ThumbIcon } from '../../assets/svgs';
import images from '../../assets/images';
import moment from 'moment';
import useGetSpeclizationlist from '../../hooks/home/get-speclization-list';
import { Box, Spinner, Text, } from '@gluestack-ui/themed';
import useGetDoctorBySpeclization from '../../hooks/doctor/get-doctors-by-speclization';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Loader from '../../common/Loader';
import { StackNav, TabNav } from '../../navigation/NavigationKeys';
import { getAccessToken } from '../../utils/network';

const getYear = new Date().getFullYear();

const RenderFooterComponent = memo(({ resultValue, isLoading ,selectedSpecDoctor}: any) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const renderDoctorCard = ({ item }: any) => {

    const practicingDate = moment(moment(item?.practicing_since).format('YYYY-MM-DD'));
    const yearsOfEXP = moment().diff(practicingDate, 'years');

    const handleNaviagte = () => {
      navigation.navigate(StackNav.DoctorProfile, { id: item?.id })
    }
    return (

      <TouchableOpacity onPress={handleNaviagte} style={localStyles.doctorCardStyle}>
        <Image
          source={{
            uri: `${API_IMAGE_BASE_URL}${item.photo}`,
          }}
          style={localStyles.doctorImgStyle}
        />
        <CText
          type="s10"
          style={styles.mv5}
          align="center"
          numberOfLines={1}
          color={colors.textColor1}>
          {item?.name}
        </CText>
        <View style={localStyles.doctorSpeclistTextStyle}>
          <CText
            type="s8"
            align="center"
            numberOfLines={2}
            color={colors.textColor1}>
            {item?.services_offered}

          </CText>
        </View>
        <View style={styles.rowSpaceBetween}>
          <View style={styles.rowCenter}>
            <ThumbIcon />
            <CText type="m8" style={styles.ml5} color={colors.black}>
              {item?.ranking_value}
              {'%'}
            </CText>
          </View>
          <View style={styles.rowCenter}>
            <CText type="s8" style={styles.mr5} color={colors.green1}>
              EXP
            </CText>
            <CText type="m8" color={colors.black}>
              {yearsOfEXP}
            </CText>
          </View>
        </View>
      </TouchableOpacity>
    );
  };


  return (
    <View style={localStyles.doctorListContaienr}>
      <TouchableOpacity onPress={()=>{navigation.navigate(StackNav.CategoryDoctorListDrawer, {itm:selectedSpecDoctor})}} style={localStyles.viewAllContaiener}>
        <CText type="s12" color={colors.success}>
          {strings.viewAll}
        </CText>
      </TouchableOpacity>
      <View style={{ justifyContent: !isLoading ? 'flex-start' : 'center', }}  >

        {(!!resultValue) ? <FlashList
          data={resultValue?.slice(0, 6)}
          renderItem={renderDoctorCard}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          scrollEnabled={false}
          numColumns={3}
          estimatedItemSize={10}
          ListEmptyComponent={()=>{
            return(
              <Text textAlign='center' fontFamily='$InterMedium' fontSize={14} color={colors.black} >Oops! No doctor available</Text>
            )
          }}

          contentContainerStyle={styles.ph10}
        /> : <Box alignSelf='center' >
          <Spinner size={'large'} color={colors.primary} />
        </Box>}
      </View>
    </View>
  );
});

const RenderDSpecialities = memo(
  ({
    item,
    index,
    onPressTab,
    selectedTabValue,
  }: {
    item: DoctorSpecialityListData;
    index: number;
    onPressTab: ({ id, specType }: any) => void;
    selectedTabValue: number;
  }) => {
    // console.log(item?.name);
    
    return (
      <View style={localStyles.mainContaienr}>
        <TouchableOpacity
          onPress={() => onPressTab({ id: item.id, specType: item.name , index })}
          style={localStyles.rootContaienr}>
          <View style={localStyles.imgOuterContainer}>
            <Image
              source={{ uri: `${API_IMAGE_BASE_URL}${item.app_icon}` }}
              style={localStyles.imgStyle}
            />
          </View>
          <CText type="m12" align="center" style={styles.ph5} numberOfLines={1}>
            {item.name}
          </CText>
        </TouchableOpacity>
        {selectedTabValue == index && (
          <Image
            source={images.tabSelectImage}
            style={localStyles.tabSelectImageStyle}
          />
        )}
      </View>
    );
  },
);

export default function DoctorSpecialities() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const [resultData, setResultData] = useState<[DoctorSpecialityListData]>();
  const [selectedTab, setSelectedTab] = useState<any>(0);
  const [extraData, setExtraData] = useState<boolean>(false);
  const [selectedSpecDoctor, setSelectedSpecDoctor] = useState<string>('Kidney related diseases');
  const [mediType, setMediType] = useState<string>('')




  const fetchType = async () => {
    let medType = await getAccessToken('medType')
    // console.log({ medType });
    setMediType(medType)
    return medType;

  }

  // useEffect(() => {

  // }, [])

  const { data: speclizationListData, isLoading: speclizationListIsLoading } = useGetSpeclizationlist()
  const { data: doctorBySpeclizationData, isLoading: doctorBySpeclizationIsLoading, } = useGetDoctorBySpeclization({ specialization: selectedSpecDoctor , type: mediType  })
  // console.log(speclizationListData?.data?.result[0],'specilzation HOME');


  // useEffect(() => {
  //   setExtraData(!extraData);
  // }, [selectedTab]);

  const onPressTab = useCallback(
    async ({ id, specType ,index}: any) => {
     

      // const indexx = await speclizationListData?.data?.result[0]?.specList?.findIndex((item: any) => item.id == id);
      setSelectedTab(index);
      setSelectedSpecDoctor(specType)
      // console.log(specType,index);

    }, [selectedTab],);

  useEffect(() => {
    fetchType()

    setSelectedTab(0)
  }, []);

  // const selectedTabValue = useMemo(() => {
  //   return selectedTab;
  // }, [selectedTab]);

  const renderItem = ({ item, index }: any) => {
    return (
      <RenderDSpecialities
        item={item}
        index={index}
        onPressTab={onPressTab}
        selectedTabValue={selectedTab}
      />
    );
  };


  return (
    <View style={styles.flex}>
      <SubHeader title={strings.findAyurvedicDoctorSpecialities} onPress={()=>{navigation.navigate(TabNav.FindADoctorHome)}} />
      {!speclizationListIsLoading ?
        <FlatList
          data={speclizationListData?.data?.result[0]?.specList}
          renderItem={renderItem}
          horizontal
          extraData={selectedTab}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.ph20}
        /> : <Box alignSelf='center' py={10}>
          <Spinner size={'small'} color={colors.primary} />
        </Box>}
      <RenderFooterComponent resultValue={doctorBySpeclizationData?.data?.result[0]?.doctorList} isLoading={doctorBySpeclizationIsLoading} selectedSpecDoctor={selectedSpecDoctor} />
    </View>
  );
}

const localStyles = StyleSheet.create({
  imgStyle: {
    width: moderateScale(50),
    height: moderateScale(50),
    resizeMode: 'contain',
  },
  rootContaienr: {
    width: moderateScale(84),
    ...styles.center,
  },
  imgOuterContainer: {
    width: moderateScale(62),
    height: moderateScale(62),
    borderRadius: moderateScale(31),
    ...styles.mv10,
    ...styles.center,
    backgroundColor: colors.lightBlue,
  },
  mainContaienr: {
    ...styles.itemsCenter,
  },
  viewAllContaiener: {
    ...styles.justifyEnd,
    ...styles.itemsEnd,
    ...styles.mv5,
    ...styles.mh20,
  },
  doctorListContaienr: {
    width: '98%',
    ...styles.pv20,
    ...styles.pb15,
    backgroundColor: colors.lightPink,
    top: getHeight(-5),
    borderRadius: responsiveWidth(5),
    alignSelf: 'center',
    // height: responsiveHeight(45)
  },
  doctorImgStyle: {
    height: moderateScale(42),
    width: moderateScale(42),
    borderRadius: moderateScale(21),
    borderColor: colors.primary,
    borderWidth: moderateScale(2),
    ...styles.selfCenter,
  },
  doctorSpeclistTextStyle: {
    height: getHeight(32),
  },
  doctorCardStyle: {
    backgroundColor: colors.white1,
    ...styles.p10,
    margin: '5%',
    ...styles.justifyCenter,
    ...styles.selfStart,
    ...styles.selfCenter,
    borderRadius: moderateScale(15),
    width: '90%',
    shadowColor: colors.black,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  tabSelectImageStyle: {
    height: moderateScale(18),
    width: moderateScale(18),
    resizeMode: 'contain',
    tintColor: colors.lightPink,
  },
});
