import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Container } from '../../components/Container'
import { Box ,Text} from '@gluestack-ui/themed'
import { colors } from '../../themes'
import CHeader from '../../components/common/CHeader'
import { PhoneIcon } from '../../assets/svgs'

const OrderDetails = () => {
  return (
    <Container statusBarStyle='dark-content' >
        <CHeader title='Order Details' />
      
      <Box py={15} px={20} gap={10} >
        <Box>
        <Text fontFamily='$InterMedium' color={colors.black} fontSize={10} lineHeight={12} >Sub Order Id 12345609</Text>
        {/* <Text fontFamily='$InterMedium' color={colors.black} fontSize={10} lineHeight={12} >Copy</Text> */}
        </Box>
      
        <Text fontFamily='$InterMedium' color={colors.gray4} fontSize={10} >Payment Mode : <Text fontFamily='$InterMedium' color={'#7F8182'} fontSize={10} lineHeight={15} >Online</Text></Text>
      </Box>

      <Box backgroundColor='#F5F1F1' h={8} ></Box>

      <Box>
        <PhoneIcon/>
        <Text fontFamily='$InterMedium' color={colors.gray4} fontSize={10} lineHeight={15} >Help Centre</Text>
      </Box>



        

    </Container>
  )
}

export default OrderDetails

const styles = StyleSheet.create({})