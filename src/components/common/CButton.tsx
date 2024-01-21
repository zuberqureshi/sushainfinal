//Library Imports
import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
  TextStyle,
} from 'react-native';

//Local Imports
import {getHeight, moderateScale} from '../../common/constants';
import {colors, styles} from '../../themes';
import CText from './CText';
import {TextType} from '../../types/TypographyType';

interface CButtonProps extends TouchableOpacityProps {
  title: string;
  type?: TextType;
  color?: string;
  onPress: () => void;
  containerStyle?: ViewStyle | any;
  style?: TextStyle | any;
  icon?: any;
  frontIcon?: any;
  bgColor?: string | boolean;
  children?: React.ReactNode;
}

export default function CButton({
  title,
  type,
  color,
  onPress,
  containerStyle,
  style,
  icon = null,
  frontIcon = null,
  bgColor = false,
  children,
  ...props
}: CButtonProps) {
  return (
    <TouchableOpacity
      style={[
        localStyle.btnContainer,
        styles.rowCenter,
        containerStyle,
        bgColor
          ? {backgroundColor: bgColor}
          : {backgroundColor: colors.primary},
      ]}
      onPress={onPress}
      {...props}>
      {frontIcon}
      <CText type={type} style={style} color={color ? color : colors.white}>
        {title}
      </CText>
      {icon}
      {children}
    </TouchableOpacity>
  );
}

const localStyle = StyleSheet.create({
  btnContainer: {
    height: getHeight(44),
    borderRadius: moderateScale(6),
  },
});
