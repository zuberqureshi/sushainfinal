import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';

// local imports
import {colors, styles} from '../../../themes';
import CText from '../CText';
import strings from '../../../themes/strings';


type SubHeaderProps = {
  title: string;
  onPress?: () => void;
  isViewHide?: boolean;
  style?: any;
};

export default function SubHeader(props: SubHeaderProps) {
  const {title, onPress, isViewHide = true, style} = props;
  return (
    <View style={[localStyles.root, style]}>
      <CText type="s14" numberOfLines={1} style={localStyles.titleTextStyle}>
        {title}
      </CText>
      {isViewHide && (
        <TouchableOpacity onPress={onPress}>
          <CText type="s12" color={colors.success}>
            {strings.viewAll}
          </CText>
        </TouchableOpacity>
      )}
    </View>
  );
}

const localStyles = StyleSheet.create({
  root: {
    ...styles.mh10,
    // ...styles.flex,
    ...styles.mv10,
    ...styles.rowSpaceBetween,
  },
  titleTextStyle: {
    ...styles.pr10,
    ...styles.flex,
  },
});
