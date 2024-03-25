import { Image, Pressable, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { Container } from '../../components/Container'
import CHeader from '../../components/common/CHeader'
import { BillBigIconGreen, Cart, GreenDot, LikeIcon, Menu } from '../../assets/svgs'
import { Box } from '@gluestack-ui/themed'
import strings from '../../i18n/strings'
import { colors, styles } from '../../themes'
import { StackNav } from '../../navigation/NavigationKeys'
import typography from '../../themes/typography'
import { moderateScale } from '../../common/constants'
import { Text } from '@gluestack-ui/themed'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import CText from '../../components/common/CText'
import { medicineCartDate } from '../../api/constant'
import Body from '../../components/Body/Body'
import useGetMyOrders from '../../hooks/order/get-my-orders'
import { AuthContext } from '../../context/AuthContext'
import Loader from '../../components/Loader/Loader'
import moment from 'moment'

const MyOrders = ({ navigation }) => {

    const iconSize = moderateScale(21);

    const [searchText, setSearchText] = useState('')
    const [selectedOrderType, setSelectedOrderType] = useState('all')
    const authContext: any = useContext(AuthContext);

    const {data:myOrderData , isLoading : myOrderIsLoading} = useGetMyOrders(authContext?.userInfo?.userUniqueId)

    if (myOrderIsLoading) {
        return(
            <Container statusBarStyle='dark-content'>
                <CHeader title='MyOrders' />
                <Loader/>
            </Container>
        )
    }


    return (
        <Container statusBarStyle='dark-content' >
            <CHeader title='MyOrders' />
            <View style={localStyles.searchContainer}>
                <TouchableOpacity onPress={() => { navigation.openDrawer() }}>
                    <Menu />
                </TouchableOpacity>

                <Box flexDirection='row' alignItems='center' h={40} px={10} borderWidth={1} borderColor={colors.gray4} borderRadius={5} flex={0.9} >
                    <TextInput
                        placeholder={strings.searchPlaceHolder}
                        value={searchText}
                        numberOfLines={1}
                        //   onChangeText={handleSearch}
                        style={localStyles.inputContainerStyle}
                    />
                    {/* { !!searchDataList.length && <Pressable onPress={()=>{
          setSearchDataList([])
          setSearchText('')}} >
          <CrossBottomTab/>
        </Pressable> } */}
                </Box>


                <Box gap={5} flexDirection='row' alignItems='center' >
                    {/* <TouchableOpacity

                        style={localStyles.cartBtnStyle}>
                        <LikeIcon height={iconSize} width={iconSize} />
                    </TouchableOpacity> */}
                    <TouchableOpacity
                        onPress={() => { navigation.navigate(StackNav.Cart) }}
                        style={localStyles.cartBtnStyle}>
                        <Cart height={iconSize} width={iconSize} />
                    </TouchableOpacity>
                </Box>

                {/* {!!searchDataList.length && (
          <View style={localStyles.searchSuggestionContainer}>
            <FlatList
              data={searchDataList}
              renderItem={renderSearchResult}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={() => <RenderSeparator />}
            // estimatedItemSize={100}
            />
          </View>
        )} */}
            </View>

            <Box flexDirection='row' justifyContent='space-between' gap={10} paddingHorizontal={25} mt={20} >
                <TouchableOpacity onPress={() => { setSelectedOrderType('all') }} activeOpacity={0.6} style={{ flex: 1, borderWidth: selectedOrderType === 'all' ? 1 : 0, borderColor: colors.primary, borderRadius: responsiveWidth(3), overflow: 'hidden', backgroundColor: selectedOrderType === 'all' ? '#F2FDFF' : '#F4F2F2' }} >
                    <Text fontFamily='$InterMedium' fontSize={12} color={selectedOrderType === 'all' ? colors.primary : '#BFBCBC'} textAlign='center'  >All</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setSelectedOrderType('delivered') }} activeOpacity={0.6} style={{ flex: 1, borderWidth: selectedOrderType === 'delivered' ? 1 : 0, borderColor: colors.primary, borderRadius: responsiveWidth(3), overflow: 'hidden', backgroundColor: selectedOrderType === 'delivered' ? '#F2FDFF' : '#F4F2F2' }} >
                    <Text fontFamily='$InterMedium' fontSize={12} color={selectedOrderType === 'delivered' ? colors.primary : '#BFBCBC'} textAlign='center' >Delivered</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setSelectedOrderType('cancelled') }} activeOpacity={0.6} style={{ flex: 1, borderWidth: selectedOrderType === 'cancelled' ? 1 : 0, borderColor: colors.primary, borderRadius: responsiveWidth(3), overflow: 'hidden', backgroundColor: selectedOrderType === 'cancelled' ? '#F2FDFF' : '#F4F2F2' }} >
                    <Text fontFamily='$InterMedium' fontSize={12} color={selectedOrderType === 'cancelled' ? colors.primary : '#BFBCBC'} textAlign='center' >Cancelled</Text>
                </TouchableOpacity>
            </Box>
            <Box flexDirection='row' justifyContent='space-between' gap={10} paddingHorizontal={25} mt={10} mb={15} >
                <TouchableOpacity onPress={() => { setSelectedOrderType('return') }} activeOpacity={0.6} style={{ flex: 1, borderWidth: selectedOrderType === 'return' ? 1 : 0, borderColor: colors.primary, borderRadius: responsiveWidth(3), overflow: 'hidden', backgroundColor: selectedOrderType === 'return' ? '#F2FDFF' : '#F4F2F2' }} >
                    <Text fontFamily='$InterMedium' fontSize={12} color={selectedOrderType === 'return' ? colors.primary : '#BFBCBC'} textAlign='center'  >Return</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setSelectedOrderType('intransit') }} activeOpacity={0.6} style={{ flex: 1, borderWidth: selectedOrderType === 'intransit' ? 1 : 0, borderColor: colors.primary, borderRadius: responsiveWidth(3), overflow: 'hidden', backgroundColor: selectedOrderType === 'intransit' ? '#F2FDFF' : '#F4F2F2' }} >
                    <Text fontFamily='$InterMedium' fontSize={12} color={selectedOrderType === 'intransit' ? colors.primary : '#BFBCBC'} textAlign='center' >In-transit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setSelectedOrderType('orderpacked') }} activeOpacity={0.6} style={{ flex: 1, borderWidth: selectedOrderType === 'orderpacked' ? 1 : 0, borderColor: colors.primary, borderRadius: responsiveWidth(3), overflow: 'hidden', backgroundColor: selectedOrderType === 'orderpacked' ? '#F2FDFF' : '#F4F2F2' }} >
                    <Text fontFamily='$InterMedium' fontSize={12} color={selectedOrderType === 'orderpacked' ? colors.primary : '#BFBCBC'} textAlign='center' >Order packed</Text>
                </TouchableOpacity>
            </Box>

            <Body>
                
               {
                myOrderData?.data?.result[0]?.orderList?.map((item,index)=>{
                   
                    const cDate = moment(item?.dt_createddate)?.format('DD MMM,YYYY')
                    // console.log({cDate});
                    

                    return(
                        <View key={index?.toString()} style={{ borderWidth: 1, borderColor: '#D1D6D7', borderRadius: responsiveWidth(5), paddingHorizontal: responsiveWidth(5), marginHorizontal: responsiveWidth(3), paddingVertical: responsiveHeight(2), marginBottom:responsiveHeight(1.5) }} >

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
                            <View>
                                <CText type='m12' color='#B3B0B0' >ORDER CREATED</CText>
                                <CText type='m12' >{cDate}</CText>
                            </View>
                            <BillBigIconGreen />
                        </View>
    
                        <View style={{ marginTop: responsiveHeight(1.7) }} >
                            <CText type='m12' color={colors.primary} >Order ID: {item?.order_id}</CText>
                            <CText type='m10' color='#B5B4B4' >3 of 3 item(s)</CText>
                        </View>
                        <View style={{ borderBottomColor: '#E5E4E4', borderBottomWidth: 1, marginVertical: responsiveHeight(1) }} ></View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: responsiveWidth(1) }} >
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: responsiveWidth(1.5) }}>
                                <GreenDot />
                                <CText type='m10' color='#676666' >Delivery by 15 July,2023</CText>
                            </View>
                            <TouchableOpacity onPress={() => { navigation.navigate(StackNav.OrderDetails,{orderId:item?.order_id,userName:item?.username,orderAddress:item?.useraddress,userMob:item?.usermobile}) }} activeOpacity={0.6} style={{ paddingHorizontal: responsiveWidth(5), paddingVertical: responsiveHeight(0.5), borderRadius: responsiveWidth(3), backgroundColor: colors.success }} >
                                <CText type='m12' color={colors.white} >Track Order</CText>
                            </TouchableOpacity>
                        </View>
                    </View>
                    )
                })
               }

                {/* <View style={{ borderWidth: 1, borderColor: '#D1D6D7', borderRadius: responsiveWidth(5), paddingHorizontal: responsiveWidth(5), marginHorizontal: responsiveWidth(3), paddingVertical: responsiveHeight(2), }} >

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
                        <View>
                            <CText type='m12' color='#B3B0B0' >ORDER CREATED</CText>
                            <CText type='m12' >31 July,2023</CText>
                        </View>
                        <BillBigIconGreen />
                    </View>

                    <View style={{ marginTop: responsiveHeight(1.7) }} >
                        <CText type='m12' color={colors.primary} >Order ID: #12345609</CText>
                        <CText type='m10' color='#B5B4B4' >3 of 3 item(s)</CText>
                    </View>
 
                    <View style={{ borderBottomColor: '#E5E4E4', borderBottomWidth: 1, marginVertical: responsiveHeight(1) }} ></View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: responsiveWidth(1) }} >
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: responsiveWidth(1.5) }}>
                            <GreenDot />
                            <CText type='m10' color='#676666' >Delivery by 15 July,2023</CText>
                        </View>
                        <TouchableOpacity onPress={() => { navigation.navigate(StackNav.OrderDetails) }} activeOpacity={0.6} style={{ paddingHorizontal: responsiveWidth(5), paddingVertical: responsiveHeight(0.5), borderRadius: responsiveWidth(3), backgroundColor: colors.success }} >
                            <CText type='m12' color={colors.white} >Track Order</CText>
                        </TouchableOpacity>
                    </View>
                </View> */}



            </Body>



        </Container>
    )
}

export default MyOrders

const localStyles = StyleSheet.create({
    searchContainer: {
        ...styles.rowSpaceBetween,
        ...styles.flexRow,
        ...styles.ph20,
        ...styles.itemsCenter,
        position: 'relative',
        zIndex: 100,
        ...styles.mt10
    },
    inputContainerStyle: {
        ...typography.fontSizes.f10,
        ...typography.fontWeights.SemiBold,
        flex: 1,
        // marginHorizontal: responsiveWidth(2.5),
        // height: responsiveHeight(5),

        // ...styles.pl10

    },
    cartBtnStyle: {
        ...styles.pl5,
        ...styles.pv10,
    },
})