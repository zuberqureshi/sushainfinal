import { Pressable, StyleProp, StyleSheet, TextInput, TouchableOpacity, View, ViewStyle, } from 'react-native';
import React, { useState } from 'react';
import ActionSheet from 'react-native-actions-sheet';

import { useNavigation } from '@react-navigation/native';

// local imports
import { colors, styles } from '../../../themes';
import { getHeight, moderateScale } from '../../../common/constants';
import strings from '../../../i18n/strings';
import typography from '../../../themes/typography';
import { CrossIconBlack, Eye, EyeDashed } from '../../../assets/svgs';
import { Box, Text } from '@gluestack-ui/themed';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import PrimaryButton from '../Button/PrimaryButton';







export default function SignInModal(props: any) {
    const { SheetRef } = props;
    const navigation = useNavigation();

    const onPressCloseSheet = () => SheetRef.current?.setModalVisible(false)
    const onActionSheetClose = () => {

    };

    return (
        <ActionSheet
            ref={SheetRef}
            onClose={onActionSheetClose}
            keyboardShouldPersistTaps={'handled'}

            containerStyle={localStyles.rootContainer}>
            <Box mx={5} >

                <Box flexDirection='row' alignItems='center' justifyContent='space-between' >
                    <Text fontFamily='$InterMedium' fontSize={14} color={colors.black} >Sign in to Continue</Text>
                    <Pressable onPress={onPressCloseSheet} >
                    <CrossIconBlack />
                    </Pressable>
                   
                </Box>


                <Box borderWidth={1} borderColor={colors.borderColor} borderRadius={4} height={37} alignItems='center' flexDirection='row' overflow='hidden' mt={20} px={8} >
                    <Text fontFamily='$InterMedium' fontSize={12} color={'#656363'}>
                        +91
                    </Text>
                    <TextInput
                        // onChangeText={formik.handleChange('userid')}
                        // onBlur={formik.handleBlur('userid')}
                        // value={formik.values.userid}
                        placeholder={'Enter 10 digit mobile number'}
                        placeholderTextColor={colors.placeHolderColor}
                        keyboardType='number-pad'
                        autoCorrect={false}
                        style={[
                            localStyles.inputContainerStyle

                        ]}

                    />
                </Box>

                <PrimaryButton buttonText={'Get Verification Code'} height={34} marginTop={responsiveHeight(2.5)} />

                <Box alignSelf='center' w={'80%'} mt={15} >
                    <Text fontFamily='$InterMedium' fontSize={10} color={'#565353'} textAlign='center' >By Proceeding you agree with our <Text fontFamily='$InterMedium' fontSize={10} color={'#198192'} textDecorationLine='underline' >
                     Terms of services</Text>
                    <Text fontFamily='$InterMedium' fontSize={10} color={'#565353'} > & </Text>
                    <Text fontFamily='$InterMedium' fontSize={10} color={'#198192'} textDecorationLine='underline' >
                    Privacy Policy</Text> .
                    </Text>

                </Box>


            </Box>


        </ActionSheet>
    );
}

const localStyles = StyleSheet.create({
    rootContainer: {
        ...styles.p20,
        borderTopLeftRadius: moderateScale(20),
        borderTopRightRadius: moderateScale(20),
    },
    otpInputContainerStyle: {
        height: moderateScale(36),
    },
    inputBoxStyle: {
        ...styles.pl20,
        ...typography.fontSizes.f14,
        ...typography.fontWeights.Regular,
    },
    dividerContainer: {
        ...styles.rowSpaceBetween,
        gap: moderateScale(20),
    },
    dividerStyle: {
        ...styles.flex,
        height: moderateScale(1),
        backgroundColor: colors.gray3,
    },
    iconContainer: {
        ...styles.rowSpaceAround,
        ...styles.mt15,
        ...styles.mb10,
        ...styles.ph30,
    },
    iconStyle: {
        ...styles.p10,
        borderWidth: moderateScale(1),
        borderColor: colors.primary,
        borderRadius: moderateScale(30),
    },
    underLineStyle: {
        textDecorationLine: 'underline',
        textDecorationStyle: 'solid',
        textDecorationColor: colors.success,
    },
    digitStyle: {
        fontSize: moderateScale(12),
        ...typography.fontWeights.Medium,
        color: colors.textColor,
    },
    digiContainerStyle: {
        backgroundColor: colors.white,
        height: getHeight(22),
        width: moderateScale(22),
        ...styles.center,
    },
    timerContainer: {
        ...styles.alignStart,
        ...styles.mb20,
    },
    saveBtnStyle: {
        width: '40%',
        ...styles.selfCenter,
        ...styles.mv20,
        borderRadius: moderateScale(10),
    },
    inputContainerStyle: {
        marginLeft: responsiveWidth(1.5),
        ...typography.fontSizes.f12,
        ...typography.fontWeights.Medium,
        marginBottom: responsiveHeight(-0.2),
        flex: 1,



    },
});
