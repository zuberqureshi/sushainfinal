import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
// import {FlashList} from '@shopify/flash-list';
import {useNavigation} from '@react-navigation/native';
// import Voice from '@react-native-voice/voice';

// local imports
import {Cart, CloseIcon, LikeIcon, Menu, Mic, Search} from '../../assets/svgs';
import CInput from '../../components/common/CInput';
import {colors, styles} from '../../themes';
import CText from '../../components/common/CText';
import {getHeight, moderateScale} from '../../common/constants';
import typography from '../../themes/typography';
import CDebounce from '../../components/common/CDebounce';
import strings from '../../themes/strings';
// import {SearchAPI} from '../../api/homeApis';

export default function SearchWithLikeComponent() {
  const navigation = useNavigation<any>();
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [result, setResult] = useState('');
  const debounceSearch = CDebounce(search, 300);
  const iconSize = moderateScale(21);

//   useEffect(() => {
//     Voice.onSpeechStart = speechStartHandler;
//     Voice.onSpeechEnd = speechEndHandler;
//     Voice.onSpeechResults = speechResultsHandler;
//     return () => {
//       Voice.destroy().then(Voice.removeAllListeners);
//     };
//   }, []);

//   useEffect(() => {
//     searchAPICall();
//   }, [debounceSearch]);

  const searchAPICall = async () => {
    if (!!debounceSearch) {
      const data = await SearchAPI(debounceSearch);
      console.log('debounceSearch', data);
      setSearchResult(data?.[0].medicineList);
    }
  };
  const speechStartHandler = (e: any) => {
    console.log('speechStart successful', e);
  };

  const speechEndHandler = (e: any) => {
    console.log('stop handler', e);
  };

  const speechResultsHandler = (e: any) => {
    const text = e.value[0];
    setResult(text);
    console.log('speechResultsHandler', text, result);
  };

//   const startRecording = async () => {
//     try {
//       await Voice.start('en-US');
//     } catch (error) {
//       console.log('error', error);
//     }
//   };

//   const stopRecording = async () => {
//     try {
//       await Voice.stop();
//     } catch (error) {
//       console.log('error', error);
//     }
//   };

  const clear = () => {
    setResult('');
  };

  const onChangeSearch = (text: string) => {
    setSearch(text);
  };

  const onPressDrawer = () => navigation.openDrawer();

  const onPressRightIcon = () => {
    if (searchResult?.length) {
      setSearch('');
      setSearchResult([]);
    } else {
      setResult('');
      startRecording();
    }
  };

  const searchIcon = () => {
    return <Search />;
  };

  const rightAccessory = () => {
    return (
      <TouchableOpacity onPress={onPressRightIcon}>
        {!!searchResult?.length ? <CloseIcon /> : <Mic />}
      </TouchableOpacity>
    );
  };
  const renderSearchResult = ({item}: any) => {
    return (
      <CText type="s10" style={styles.p10} color={colors.black}>
        {item?.name}
      </CText>
    );
  };

  const RenderSeparator = () => <View style={localStyles.dividerStyle} />;

  return (
    <View style={localStyles.searchContainer}>
      <TouchableOpacity onPress={onPressDrawer}>
        <Menu />
      </TouchableOpacity>
      <CInput
        placeholder={strings.searchPlaceHolder}
        _value={search}
        toGetTextFieldValue={()=>{}}
        placeholderTextColor={colors.gray4}
        inputContainerStyle={localStyles.inputContainerStyle}
        inputBoxStyle={localStyles.inputBoxStyle}
        insideLeftIcon={searchIcon}
        // rightAccessory={rightAccessory}
        inputStyle={localStyles.inputStyle}
      />
      <TouchableOpacity
        onPress={()=>{}}
        style={localStyles.cartBtnStyle}>
        <LikeIcon height={iconSize} width={iconSize} />
      </TouchableOpacity>
      <TouchableOpacity style={localStyles.cartBtnStyle}>
        <Cart height={iconSize} width={iconSize} />
      </TouchableOpacity>
      {!!searchResult?.length && (
        <View style={localStyles.searchSuggestionContainer}>
          {/* <FlashList
            data={searchResult}
            renderItem={renderSearchResult}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={() => <RenderSeparator />}
            scrollEnabled
          /> */}
        </View>
      )}
    </View>
  );
}

const localStyles = StyleSheet.create({
  searchContainer: {
    ...styles.rowSpaceBetween,
    ...styles.flexRow,
    ...styles.ph15,
    ...styles.itemsCenter,
    position: 'relative',
    zIndex: 100,
  },
  searchSuggestionContainer: {
    position: 'absolute',
    top: moderateScale(50),
    width: '65%',
    height: getHeight(350),
    backgroundColor: colors.white,
    ...styles.selfCenter,
    left: '19%',
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(5),
    borderColor: colors.gray6,
    zIndex: 10,
    ...styles.shadowStyle,
  },
  dividerStyle: {
    height: getHeight(1),
    backgroundColor: colors.gray6,
  },
  iconContainer: {
    ...styles.rowCenter,
    gap: moderateScale(10),
  },
  inputStyle: {
    width: '65%',
  },
  inputContainerStyle: {
    height: moderateScale(40),
    width: '100%',
  },
  inputBoxStyle: {
    ...typography.fontSizes.f12,
    ...typography.fontWeights.SemiBold,
  },
  cartBtnStyle: {
    ...styles.pl5,
    ...styles.pv10,
  },
});
