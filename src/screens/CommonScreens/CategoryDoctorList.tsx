import { FlatList, Image, ScrollView, StyleSheet, TextInput, TouchableOpacity, View, } from 'react-native';
import React, { useEffect, useState } from 'react';

// local imports
const CSafeAreaView = React.lazy(() => import('../../components/common/CSafeAreaView'))
// const CHeader = React.lazy(() => import('../../components/common/CHeader'))
// const CText = React.lazy(() => import('../../components/common/CText'))
// const CButton = React.lazy(() => import('../../components/common/CButton'))
// const DoctorDetailCard = React.lazy(() => import('./DoctorDetailCard'))


// import CSafeAreaView from '../../components/common/CSafeAreaView';
import CHeader from '../../components/common/CHeader';
import images from '../../assets/images';
import { getHeight, moderateScale } from '../../common/constants';
import { colors, styles } from '../../themes';
import { Cart, DigitalPrecereption, FilterIcon, FreeFollowUp, LikeIcon, Menu, SortIcon, } from '../../assets/svgs';
import CText from '../../components/common/CText';
import CButton from '../../components/common/CButton';
import strings from '../../i18n/strings';
import { Container } from '../../components/Container';
import Body from '../../components/Body/Body';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import DoctorDetailCard from '../../components/DoctorComponent/DoctorDetailCard';
import typography from '../../themes/typography';
import { FlashList } from '@shopify/flash-list';
import useGetSpeclizationlist from '../../hooks/home/get-speclization-list';
import { Box } from '@gluestack-ui/themed';
import { useFocusEffect } from '@react-navigation/native';


interface Props {
  route: any;
  navigation: any;
}

const debounce = (func, delay) => {
  let timeoutId;

  return (...args) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

export default function CategoryDoctorList(props: Props) {
  const { route, navigation } = props;
  const { itm } = route.params;
  const iconSize = moderateScale(21);
  // console.log('itm', itm);

  const { data: speclizationListData, isLoading: speclizationListIsLoading } = useGetSpeclizationlist()

  const [searchResult, setSearchResult] = useState(itm);
  const [searchDataList, setSearchDataList] = useState([])
  const [searchText, setSearchText] = useState('')

  const searchData = speclizationListData?.data?.result[0]?.specList?.filter(item => {
    const searchTerm = searchText.toLocaleLowerCase()
    const fullName = item?.name?.toLocaleLowerCase()

    return searchTerm && fullName.startsWith(searchTerm)
  })
 
  const fetchSearchResults = async (term) => {
    try {
      // Perform an API request based on the search term
      // const response = await fetch(`YOUR_API_ENDPOINT?q=${term}`);
      // const data = await response.json();
      const searchData = speclizationListData?.data?.result[0]?.specList?.filter(item => {
        const searchTerm = term.toLocaleLowerCase()
        const fullName = item?.name?.toLocaleLowerCase()
    
        return searchTerm && fullName.startsWith(searchTerm)
      })
  
     await setSearchDataList(searchData)
      
      // setSearchResults(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle the error, e.g., show an error message to the user
    } finally {
      // setLoading(false);
    }
  };

  const debouncedSearch = debounce(fetchSearchResults, 500);

  const handleSearch = (text) => {
    setSearchText(text);
    // setLoading(true);
    debouncedSearch(text);
  };
  
  useFocusEffect(
    React.useCallback(() => {
      // console.log('fouuuuuu')
      setSearchResult(itm)

      // return () => unsubscribe();
    }, [itm])
  );


  const renderSearchResult = ({ item }: any) => {
    return (
      <TouchableOpacity onPress={() => { setSearchResult(item?.name) }} >
        <CText type="s10" style={styles.p10} color={colors.black}>
          {item?.name}
        </CText>
      </TouchableOpacity>

    );
  };

  const RenderSeparator = () => <View style={localStyles.dividerStyle} />;

  return (
    <Container statusBarStyle='dark-content' >
      <CHeader title={itm + ' Doctors'} />
      <View style={localStyles.searchContainer}>
        <TouchableOpacity onPress={() => { navigation.openDrawer() }}>
          <Menu />
        </TouchableOpacity>

        <TextInput
          placeholder={'Search for doctor by disease'}
          value={searchText}
          onChangeText={handleSearch}
          style={localStyles.inputContainerStyle}
        />
        <Box flexDirection='row' alignItems='center' gap={4} >
          {/* <TouchableOpacity
            onPress={() => { }}
            style={localStyles.cartBtnStyle}>
            <LikeIcon height={iconSize} width={iconSize} />
          </TouchableOpacity> */}
          <TouchableOpacity style={localStyles.cartBtnStyle}>
            <Cart height={iconSize} width={iconSize} />
          </TouchableOpacity>
        </Box>
        {!!searchDataList.length && (
          <View style={localStyles.searchSuggestionContainer}>
            <FlatList
              data={searchDataList}
              renderItem={renderSearchResult}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={() => <RenderSeparator />}
            // estimatedItemSize={100}
            />
          </View>
        )}
      </View>


      <DoctorDetailCard title={searchResult} />


    </Container>
  );
}

const localStyles = StyleSheet.create({
  bannerImageStyle: {
    width: '100%',
    height: moderateScale(140),
    ...styles.mv10,
    borderRadius: moderateScale(10),
  },
  bannerContaienr: {
    ...styles.center,
    ...styles.mh20,
  },
  bottomBanerContainer: {
    ...styles.ph10,
    ...styles.pv10,
    backgroundColor: colors.lightOrange,
    ...styles.flexRow,
    ...styles.itemsCenter,
    // ...styles.flex,
    height: responsiveHeight(5)
  },
  buttonContinerStyle: {
    ...styles.flexRow,
    ...styles.itemsCenter,
    ...styles.justifyEnd,
    ...styles.mh20,
    ...styles.mv10,
  },
  btnContainerStyle: {
    ...styles.ml10,
    ...styles.ph10,
    borderWidth: moderateScale(1),
    borderColor: colors.bColor2,
    height: getHeight(28),
    borderRadius: moderateScale(10),
  },
  searchContainer: {
    ...styles.rowSpaceBetween,
    ...styles.flexRow,
    ...styles.ph20,
    ...styles.itemsCenter,
    position: 'relative',
    zIndex: 100,
    ...styles.mt10
  },
  searchSuggestionContainer: {
    position: 'absolute',
    top: moderateScale(40),
    width: '70%',
    // height: getHeight(150),
    backgroundColor: colors.white,
    ...styles.selfCenter,
    left: '19%',
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(5),
    borderColor: colors.gray6,
    zIndex: 10,
    ...styles.shadowStyle,
  },
  cartBtnStyle: {
    ...styles.pl5,
    ...styles.pv10,
  },
  inputContainerStyle: {
    ...typography.fontSizes.f10,
    ...typography.fontWeights.SemiBold,
    flex: 1,
    marginHorizontal: responsiveWidth(2.5),
    height: responsiveHeight(5),
    borderWidth: 1,
    borderRadius: responsiveWidth(1.5),
    borderColor: colors.gray4,
    ...styles.pl10

  },
  dividerStyle: {
    height: getHeight(1),
    backgroundColor: colors.gray6,
  },
});
