import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Container } from '../../components/Container'
import { Box, Text } from '@gluestack-ui/themed'
import { colors } from '../../themes'
import CHeader from '../../components/common/CHeader'
import { CancelColorIcon, GreaterThanBlack, PhoneIcon, ReportDeleteIcon, ShareIcon } from '../../assets/svgs'
import { medicineCartDate } from '../../api/constant'
import { API_IMAGE_BASE_URL, moderateScale } from '../../common/constants'
import Body from '../../components/Body/Body'
import useGetOrderDetails from '../../hooks/order/get-order-details'
import Loader from '../../components/Loader/Loader'

const OrderDetails = ({ route }) => {

  const { orderId , orderAddress , userName , userMob} = route.params
  const { data: orderDetailData, isLoading: orderDetailIsLoading } = useGetOrderDetails(orderId)

  if (orderDetailIsLoading) {
    return (
      <Container statusBarStyle='dark-content'>
        <CHeader title='Order Details' />
        <Loader />
      </Container>
    )
  }

  return (
    <Container statusBarStyle='dark-content' >
      <CHeader title='Order Details' />

      <Body>

        <Box py={15} px={20} gap={10} >
          <Box>
            <Text fontFamily='$InterSemiBold' color={colors.black} fontSize={12} lineHeight={15} >Sub Order Id {orderId}</Text>
            {/* <Text fontFamily='$InterMedium' color={colors.black} fontSize={10} lineHeight={12} >Copy</Text> */}
          </Box>

          <Text fontFamily='$InterSemiBold' color={colors.gray4} fontSize={12} lineHeight={15} >Payment Mode : <Text fontFamily='$InterSemiBold' color={'#7F8182'} fontSize={12} lineHeight={15} >Online</Text></Text>
        </Box>

        <Box backgroundColor='#F5F1F1' h={8} ></Box>

        <Box flexDirection='row' alignItems='center' justifyContent='space-between' px={20} py={10} >
          <Box flexDirection='row' alignItems='center' gap={15} >
            <PhoneIcon />
            <Text fontFamily='$InterMedium' color={colors.black} fontSize={13} lineHeight={16} >Help Centre</Text>
          </Box>
          <GreaterThanBlack />

        </Box>
        <Box backgroundColor='#F5F1F1' h={8} ></Box>

        <Box mt={15} >
          <Text px={20} fontFamily='$InterBold' color={colors.black} fontSize={13} lineHeight={16} mb={10} >Product Details</Text>

          {
            orderDetailData?.data?.result[0]?.orderList?.map((item, index) => {
              return (
                <Box key={index?.toString()} flexDirection='row' alignItems='center' justifyContent='space-between' borderBottomWidth={1} borderBottomColor='#F0F0F0' px={20} py={10}  >
                  <Box flexDirection='row' alignItems='center'>
                    <Box w={58} h={64} borderWidth={1} borderRadius={10} borderColor={'#CDC9C9'} alignItems='center' overflow='hidden'  >
                      <Image source={{ uri: `${API_IMAGE_BASE_URL}${item.product_img}` }} style={{ resizeMode: 'cover', height: '100%', width: '90%' }} />
                    </Box>
                    <Box alignSelf='flex-start' gap={10}>
                      <Text px={20} fontFamily='$InterSemiBold' color={colors.black} fontSize={12} lineHeight={15} numberOfLines={1} w={270} >{item?.product_name}</Text>
                      <Box>
                        <Text px={20} fontFamily='$InterMedium' color={'#676666'} fontSize={9} lineHeight={11} >MRP: {item?.final_price}/-</Text>
                        <Text px={20} fontFamily='$InterMedium' color={'#676666'} fontSize={9} lineHeight={11} >Qty:{item?.quantity}</Text>
                      </Box>
                    </Box>
                  </Box>
                  <ReportDeleteIcon width={moderateScale(17)} height={moderateScale(17)} style={{ alignSelf: 'flex-start' }} />
                </Box>
              )
            })
          }

          <Box flexDirection='row' alignItems='center' gap={15} px={20} my={20} >

            <TouchableOpacity style={{ flex: 0.7 }} >
              <Box borderWidth={1} borderColor={colors.primary} borderRadius={10} py={8} >
                <Text px={20} fontFamily='$InterMedium' color={colors.primary} fontSize={12} lineHeight={15} textAlign='center' >Open Tracking Link</Text>
              </Box>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 0.3 }} >
              <Box flexDirection='row' alignItems='center' justifyContent='center' borderWidth={1} borderColor={colors.primary} borderRadius={10} py={8} px={5} >
                <ShareIcon width={moderateScale(15)} height={moderateScale(15)} />
                <Text px={20} fontFamily='$InterMedium' color={colors.primary} fontSize={12} lineHeight={15} >Share</Text>
              </Box>
            </TouchableOpacity>
          </Box>

          <Box backgroundColor='#F5F1F1' h={8} ></Box>
          <Box flexDirection='row' alignItems='center' justifyContent='space-between' px={20} py={10} >
            <Text fontFamily='$InterMedium' color={colors.black} fontSize={13} lineHeight={16} >Download Invoice</Text>
            <GreaterThanBlack />
          </Box>
          <Box backgroundColor='#F5F1F1' h={8} ></Box>

          <Box px={20} py={10} gap={10} >
            <Text fontFamily='$InterSemiBold' color={colors.black} fontSize={13} lineHeight={16} >Order Details</Text>
            <Text fontFamily='$InterMedium' color={colors.gray6} fontSize={12} lineHeight={15} >Price Details ({orderDetailData?.data?.result[0]?.orderList?.length} Item)</Text>
            <Box flexDirection='row' alignItems='center' justifyContent='space-between'>
              <Text fontFamily='$InterMedium' color={colors.gray6} fontSize={12} lineHeight={15} >Total Price</Text>
              <Text fontFamily='$InterRegular' color={colors.black2} fontSize={12} lineHeight={15} >{'\u20B9'} {'599'}</Text>
            </Box>
            <Box borderBottomWidth={1} borderBottomColor='#F0F0F0' ></Box>
            <Box flexDirection='row' alignItems='center' justifyContent='space-between'>
              <Text fontFamily='$InterMedium' color={colors.gray7} fontSize={12} lineHeight={15} >Order Total</Text>
              <Text fontFamily='$InterSemiBold' color={colors.black2} fontSize={12} lineHeight={15} >{'\u20B9'} {'599'}</Text>
            </Box>

          </Box>

          <Box backgroundColor='#F5F1F1' h={8} ></Box>

          <Box px={20} py={10} gap={15} >
            <Text fontFamily='$InterMedium' color={colors.black} fontSize={12} lineHeight={15} >Delivery Address</Text>

            <Box gap={4} >
              <Text fontFamily='$InterMedium' color={colors.gray4} fontSize={10} lineHeight={12} numberOfLines={1} textTransform='capitalize' >{userName}</Text>
              <Text fontFamily='$InterMedium' color={colors.gray4} fontSize={10} lineHeight={12} numberOfLines={2}  >{orderAddress}</Text>
              <Text fontFamily='$InterMedium' color={colors.gray4} fontSize={10} lineHeight={12} numberOfLines={1} >{userMob}</Text>
            </Box>



          </Box>

          <TouchableOpacity activeOpacity={0.6} >
            <Box borderWidth={1} borderColor={colors.primary} borderRadius={10} mx={20} mt={10} mb={20} justifyContent='center' alignItems='center' py={5} >
              <CancelColorIcon />
              <Text fontFamily='$InterMedium' color={colors.primary} fontSize={13} lineHeight={16} >Cancel Order</Text>
            </Box>

          </TouchableOpacity>





        </Box>



      </Body>


    </Container>
  )
}

export default OrderDetails

const styles = StyleSheet.create({})