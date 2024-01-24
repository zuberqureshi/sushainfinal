import React, { useMemo } from "react";
import { StyleSheet } from "react-native";
import {
  KeyboardAwareScrollView,
  KeyboardAwareScrollViewProps,
} from "react-native-keyboard-aware-scroll-view";

interface BodyProps extends KeyboardAwareScrollViewProps {
  backgroundColor?: string;
  children?: any;
  style?:any;
}

function Body(props: BodyProps) {
  const { style, backgroundColor } = props;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        containerStyle: {
          flexGrow: 1,
          backgroundColor: backgroundColor ?? "transparent",
        },
      }),
    [backgroundColor]
  );

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={[styles.containerStyle, style]}
      keyboardShouldPersistTaps={"handled"}
      enableOnAndroid={false}
      showsVerticalScrollIndicator={false}
      {...props}
    />
  );
}

export default Body;
