// library imports
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {memo} from 'react';
import {useNavigation} from '@react-navigation/native';

// local Imports
import {styles, colors} from '../../themes';
import CText from './CText';
import {BackArrow} from '../../assets/svgs';
import {moderateScale} from '../../common/constants';

type Props = {
  title: string;
  onPressBack?: () => void;
  rightIcon?: React.JSX.Element;
  isHideBack?: boolean;
  isLeftIcon?: React.JSX.Element;
};

const CHeader = (props: Props) => {
  const {title, onPressBack, rightIcon, isHideBack, isLeftIcon} = props;
  const navigation = useNavigation();

  const goBack = () => navigation.goBack();
  return (
    <View style={[localStyles.container, !!isHideBack && styles.pr10]}>
      <View style={[styles.rowStart, styles.flex]}>
        {!isHideBack && (
          <TouchableOpacity style={styles.mr15} onPress={onPressBack || goBack}>
            <BackArrow height={moderateScale(20)} width={moderateScale(20)} />
          </TouchableOpacity>
        )}
        {!!isLeftIcon && isLeftIcon}

        <CText
          numberOfLines={1}
          style={localStyles.titleTextStyle}
          type={'s16'}>
          {title}
        </CText>
      </View>
      {!!rightIcon && rightIcon}
    </View>
  );
};

export default memo(CHeader);

const localStyles = StyleSheet.create({
  container: {
    ...styles.rowSpaceBetween,
    ...styles.ph20,
    ...styles.pv15,
    ...styles.center,
    backgroundColor: colors.primary3,
  },
  titleTextStyle: {
    ...styles.pr10,
    ...styles.mr10,
    ...styles.flex,
    textTransform:'capitalize',
  },
});
