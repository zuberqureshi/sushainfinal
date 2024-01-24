import { Button, ButtonText, Spinner } from "@gluestack-ui/themed";
import { ViewStyle } from "react-native";
import React, { forwardRef } from 'react'
import { colors } from "../../../themes";


export type ButtonProps = {
  onPress?: () => void;
  buttonText: string;
  disabled?: boolean;
  loading?: boolean;
} & ViewStyle & { style?: ViewStyle };

const PrimaryButton = forwardRef((props: ButtonProps, ref) => {
  const { onPress, buttonText, disabled = false, loading = false, ...styleProps } = props

  return (
    <Button borderRadius={6} backgroundColor={disabled ? 'gray' : colors.primary} height={44} gap={16} onPress={onPress} style={[styleProps]}>
      <ButtonText fontSize={14} fontFamily='$InterSemiBold'>{buttonText} </ButtonText>
      {loading && <Spinner color="white" size={20} />}
    </Button>
  );
})

export default PrimaryButton;
