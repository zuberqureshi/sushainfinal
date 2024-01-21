// Library Imports
import React from 'react';
import {
  KeyboardAvoidingView,

  KeyboardAvoidingViewProps,
  ViewStyle,
} from 'react-native';

// Local Imports
import { isIOS, moderateScale } from '../../common/constants';
import { styles } from '../../themes';
import { ScrollView } from 'react-native-virtualized-view';
interface KeyBoardAvoidWrapperProps extends KeyboardAvoidingViewProps {
  containerStyle?: ViewStyle;
  contentContainerStyle?: ViewStyle;
}

// KeyboardAvoidWrapper Component
const KeyBoardAvoidWrapper = ({
  children,
  containerStyle,
  contentContainerStyle,
}: KeyBoardAvoidWrapperProps) => {
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={isIOS ? moderateScale(50) : 0}
      style={[styles.flex, containerStyle]}
      behavior={isIOS ? 'padding' : undefined}>
      <ScrollView
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={contentContainerStyle}
        bounces={false}>
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default KeyBoardAvoidWrapper;
