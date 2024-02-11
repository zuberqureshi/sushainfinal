import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Container } from '../../components/Container'
import strings from '../../i18n/strings'
import CHeader from '../../components/common/CHeader'
import { Cart, LikeIcon, Menu } from '../../assets/svgs'
import { colors, styles } from '../../themes'
import typography from '../../themes/typography'
import { getHeight, moderateScale } from '../../common/constants'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import BannerLifeStyle from '../../components/LifeStyleComponent/BannerLifeStyle'

interface Props {
  route: any;
  navigation: any;
}

const LifeStyle = (props:Props) => {

  const {route,navigation} = props;
  const iconSize = moderateScale(21);

  return (
     <Container statusBarStyle='dark-content' >
            <CHeader title={strings.BeautyPersonalCare} />
            <View style={localStyles.searchContainer}>
          <TouchableOpacity onPress={()=>{navigation.openDrawer()}}>
            <Menu />
          </TouchableOpacity>
         
          <TextInput
           placeholder={'Search entire store here'}
          //  value={searchText}
          //  onChangeText={(t)=>setSearchText(t)}
           style={localStyles.inputContainerStyle}
          />
         <TouchableOpacity
        onPress={()=>{}}
        style={localStyles.cartBtnStyle}>
        <LikeIcon height={iconSize} width={iconSize} />
      </TouchableOpacity>
      <TouchableOpacity style={localStyles.cartBtnStyle}>
        <Cart height={iconSize} width={iconSize} />
      </TouchableOpacity>
          {/* {!!searchData.length && (
            <View style={localStyles.searchSuggestionContainer}>
              <FlatList
                data={searchData}
                renderItem={renderSearchResult}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={() => <RenderSeparator />}
                // estimatedItemSize={100}
              />
            </View>
          )} */}
        </View>
        <BannerLifeStyle bannerData={['16971277717704.png','16971277717704.png','16971277717704.png']} />

      
     </Container>
  )
}

export default LifeStyle

const localStyles = StyleSheet.create({
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
    flex:1,
    marginHorizontal:responsiveWidth(2.5),
    height:responsiveHeight(5),
    borderWidth:1,
    borderRadius:responsiveWidth(1.5),
    borderColor: colors.gray4,
    ...styles.pl10

  },
  dividerStyle: {
    height: getHeight(1),
    backgroundColor: colors.gray6,
  },
})