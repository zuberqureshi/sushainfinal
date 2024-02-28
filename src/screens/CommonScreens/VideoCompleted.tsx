import { Alert, BackHandler, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Container } from '../../components/Container'
import CHeader from '../../components/common/CHeader'
import { StackNav } from '../../navigation/NavigationKeys'
import images from '../../assets/images'
import CText from '../../components/common/CText'
import { moderateScale } from '../../common/constants'
import { colors, styles } from '../../themes'
import strings from '../../i18n/strings'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import PrimaryButton from '../../components/common/Button/PrimaryButton'
import { useBackHandler } from '@react-native-community/hooks'

const VideoCompleted = ({navigation}) => {

    const backHandle = () => {
        // Alert.alert('Hold on!', 'Are you sure you want to go back?', [
        //   {
        //     text: 'Cancel',
        //     onPress: () => null,
        //     style: 'cancel',
        //   },
        //   {text: 'YES', onPress: () => BackHandler.exitApp()},
        // ]);
        // console.log('backHANDDD');
        
        navigation.navigate(StackNav.DrawerNavigation)
        return true;
      };

      useBackHandler(backHandle)
      
  return (
     <Container statusBarStyle='dark-content' >
        <CHeader title='' onPressBack={()=>{navigation.navigate(StackNav.DrawerNavigation)}} />
        <View style={localStyles.headerSection}>
          <Image source={images.booking} style={localStyles.videoIcon} />
          <CText
            type="b12"
            numberOfLines={2}
            color={colors.black}
            align="center"
            style={{ marginVertical: 10 }}>
            Your appointment has been completed successfully
          </CText>
        </View>

        <PrimaryButton onPress={()=>{navigation.navigate(StackNav.DrawerNavigation)}} buttonText='Done' marginHorizontal={responsiveWidth(2.5)} marginTop={responsiveHeight(2.5)} />
     </Container>
  )
}

export default VideoCompleted

const localStyles = StyleSheet.create({
    videoIcon: {
        width: moderateScale(264),
        height: responsiveHeight(20),
        ...styles.mv10,
        marginTop: responsiveHeight(5)
      },
      headerSection: {
        ...styles.justifyCenter,
        ...styles.itemsCenter,
        ...styles.center
      },
})