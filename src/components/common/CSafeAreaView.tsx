import {SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import {colors, styles} from '../../themes';

export default function CSafeAreaView({children, ...props}) {
  return (
    <SafeAreaView {...props} style={[localStyles.root, props.style]}>
      {children}
    </SafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  root: {
    ...styles.flex,
    backgroundColor: colors.white,
  },
});
