import { FlatList, Pressable, StyleSheet, TextInput, TouchableOpacity, View, Image } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { Container } from '../../components/Container'
import CHeader from '../../components/common/CHeader'
import { Cart, CartIconWhite, CrossBottomTab, HeartLightBlue, LikeIcon, Menu } from '../../assets/svgs'
import { Box, Spinner, Text } from '@gluestack-ui/themed'
import { StackNav } from '../../navigation/NavigationKeys'
import CText from '../../components/common/CText'
import { colors, styles } from '../../themes'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import strings from '../../i18n/strings'
import { API_IMAGE_BASE_URL, getHeight, moderateScale } from '../../common/constants'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import typography from '../../themes/typography'
import { useDispatch, useSelector } from 'react-redux'
import { addProducts, clearProducts, decreaseQty, increaseQty } from '../../redux/productSlice'
import { addProductsToCart, deleteCartItem, removeCartItem } from '../../redux/cartSlice'
import images from '../../assets/images'
import Loader from '../../components/Loader/Loader'


const ProductsByBrand = ({ route }) => {

    const navigation = useNavigation()
    const iconSize = moderateScale(21);
    const { brandName } = route.params
    const loadMore = true;

    const [searchText, setSearchText] = useState('')
    const [searchDataList, setSearchDataList] = useState([])
    const [showLoad, setShowLoad] = useState(false)
    const [pageNum, setPageNum] = useState(1)

    const dispatch = useDispatch()

    const cartData = useSelector(state => state.cart);
    const products = useSelector(state => state.product);

    const getTotalPriceCart = () => {
        let total = 0;
        cartData.map(item => {
          // console.log('getTOTAL', item?.qty,item.final_price);
    
    
          total = total + (item?.qty + 1) * item.final_price
        })
    
        return total;
      }

    const fecthFirst = async () => {
        await setPageNum(1)
     await   dispatch(clearProducts())
        fetchData()
        console.log('first');
    }

    // useFocusEffect(
    //     useCallback(() => {

     
    //         fecthFirst()

    //     }, [])
    // );

    useEffect(() => {
         
        fecthFirst()


    }, [brandName])
    

    const debounce = (func, delay) => {
        let timeoutId;

        return (...args) => {
            clearTimeout(timeoutId);

            timeoutId = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    };

    const fetchSearchResults = async (term) => {
        // console.log({term});

        try {

            const url = `http://13.232.170.16:3006/api/v1/order/productsearch?name=${term}`
            let result = await fetch(url);
            result = await result.json();
            // console.log(result?.result,'SERCH DATTT');


            // Perform an API request based on the search term
            // const response = await fetch(`YOUR_API_ENDPOINT?q=${term}`);
            // const data = await response.json();

            const searchData = result?.result[0]?.productDetail?.filter(item => {
                const searchTerm = term.toLocaleLowerCase()
                const fullName = item?.name?.toLocaleLowerCase()

                return searchTerm && fullName.startsWith(searchTerm)
            }
            )

            await setSearchDataList(searchData)

            // setSearchResults(data);
        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle the error, e.g., show an error message to the user
        } finally {
            // setLoading(false);
        }
    };


    const debouncedSearch = debounce(fetchSearchResults, 500);

    const handleSearch = (text) => {
        setSearchText(text);
        // setLoading(true);
        debouncedSearch(text);
    };


    const RenderSeparator = () => <View style={localStyles.dividerStyle} />;
    const fetchData = () => {
        console.log(products.length, pageNum, brandName, 'DATA LEE');

        setShowLoad(true)
        fetch(`http://13.232.170.16:3006/api/v1/order/productbybrand?brand=${brandName}&skip=${pageNum}`).then(res => res.json())
            .then(async (res) => {
                // console.log(res?.result[0], pageNum, 'APIII DATAAA')
                // await dispatch(clearProducts())



                //  dataApi =   await [...dataApi,...res?.result[0]?.productList]



                // await setApiData([...apiData,...res?.result[0]?.productList])

                await res?.result[0]?.productDetail?.map(item => {
                    // Assuming each item is an object
                    // return {
                    //   ...item,
                    //   qty: 0, // Add your new value here
                    // };
                    dispatch(addProducts({ ...item, qty: 0 }))
                });
                // console.log(products[0].qty,'productt map ADD QTY');

                //     modifiedData.map(item => {
                //   dispatch(addProducts(item));
                // })
                // setApiData(res?.result[0]?.productList);
                // dispatch(addProducts(res?.result[0]?.productList))
                setShowLoad(false)
                await setPageNum(pageNum + 1)

            }).catch((error => {
                console.log('erooor API PRODCC', error);

            }))

    }

    const renderSearchResult = ({ item }: any) => {
        // console.log(item,'serch ITEm');

        return (
            <TouchableOpacity style={styles.p10} onPress={async () => {
                navigation.navigate(StackNav.ProductDetail, { productDetail: { ...item, qty: 0 } })
            }} >
                <CText type="s10" numberOfLines={1} color={colors.black}>
                    {item?.name}
                </CText>
            </TouchableOpacity>
        );
    };

    const renderCardItem = ({ item, index }: any) => {

        //  console.log('qty',item?.id);
        const bestSeller = true
        return (
            <Pressable onPress={() => { navigation.navigate(StackNav.ProductDetail, { productDetail: item }) }} >
                <View style={[localStyles.cardMainContainer, { marginLeft: index % 2 && responsiveWidth(2.4) }]} >

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: responsiveWidth(1.5), marginTop: responsiveHeight(0), alignSelf: bestSeller ? 'auto' : 'flex-end' }}>
                        {bestSeller && <Text style={localStyles.bestsellerText} >BESTSELLER</Text>}
                        <HeartLightBlue style={{ alignSelf: 'flex-end' }} width={responsiveWidth(6)} height={responsiveHeight(4)} />



                    </View>

                    <Image source={{ uri: `${API_IMAGE_BASE_URL}${item?.images}` }} style={localStyles.itemImg} />

                    <View style={{ paddingLeft: responsiveWidth(1.5), marginTop: responsiveHeight(0.5), gap: moderateScale(2), height: responsiveHeight(4) }} >
                        <Text fontFamily='$InterMedium' color={colors.black} fontSize={10} w='89%' numberOfLines={2} lineHeight={10} >{item?.name}</Text>
                        <Text fontFamily='$InterRegular' color={colors.black} fontSize={8} w='90%' numberOfLines={1} lineHeight={10}  >Use In {item?.category?.split(',')[0]}</Text>
                    </View>

                    <View style={{ paddingHorizontal: responsiveWidth(1.5), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: responsiveHeight(1.3) }}  >

                        <View style={{ gap: moderateScale(2), marginTop: responsiveHeight(1) }} >
                            <Text fontFamily='$InterBold' color={colors.black} fontSize={12} lineHeight={12} >{'\u20B9'} {item?.product_pricing?.length > 0 ? item?.product_pricing[0]?.selling_price : item?.final_price}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: responsiveWidth(0.5) }} >
                                <Image source={images.startFilled} style={{ resizeMode: 'contain', width: responsiveWidth(2.5), height: responsiveHeight(1.25) }} />
                                <Text fontFamily='$InterMedium' color={colors.black} fontSize={10} lineHeight={10} >{!!item?.rating ? item?.rating : 5}|5 reviews</Text>
                            </View>


                        </View>

                        {item?.qty == 0 ? (
                            <TouchableOpacity activeOpacity={0.6} onPress={() => {
                                dispatch(addProductsToCart(item))
                                dispatch(increaseQty(item?.id))

                            }} style={{ backgroundColor: colors.lightSuccess, borderColor: colors.success, borderWidth: responsiveWidth(0.2), borderRadius: responsiveWidth(1.5) }} >
                                <Text fontFamily='$InterMedium' color={colors.success} fontSize={12} px={16} py={1} >ADD</Text>
                            </TouchableOpacity>
                        ) : null}

                        {item?.qty !== 0 &&


                            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: colors.lightSuccess, borderColor: colors.success, borderWidth: responsiveWidth(0.2), borderRadius: responsiveWidth(1.5) }} >

                                {item?.qty !== 0 && <TouchableOpacity onPress={() => {
                                    if (item.qty > 1) {
                                        dispatch(removeCartItem(item))
                                        dispatch(decreaseQty(item?.id))
                                    } else {
                                        dispatch(deleteCartItem(item?.id))
                                        dispatch(decreaseQty(item?.id))
                                    }
                                }}
                                    activeOpacity={0.6}  >
                                    <Text fontFamily='$InterMedium' color={colors.black} fontSize={20} pl={10}  >-</Text>
                                </TouchableOpacity>}


                                {item?.qty !== 0 && <Text fontFamily='$InterSemiBold' color={colors.black} fontSize={14} px={9} py={1}  >{!!item?.qty ? item?.qty : 0}</Text>}

                                {item?.qty !== 0 && <TouchableOpacity onPress={() => {
                                    dispatch(addProductsToCart(item))
                                    dispatch(increaseQty(item?.id))
                                }} activeOpacity={0.6} >
                                    <Text fontFamily='$InterMedium' color={colors.black} fontSize={20} pr={10} >+</Text>
                                </TouchableOpacity>}

                            </View>



                        }
                    </View>



                </View>
            </Pressable>
        )


    }

    const onEndReached = async () => {
        // await  setPageNum(pageNum + 1)
        if (loadMore && pageNum <= 10) {

            // await products?.map(item => {
            //           // Assuming each item is an object
            //           // return {
            //           //   ...item,
            //           //   qty: 0, // Add your new value here
            //           // };
            //           dispatch(addProducts(item))
            //         });

            await fetchData()
        }

    }


    return (
        <Container statusBarStyle='dark-content' >

            <CHeader />
            <View style={localStyles.searchContainer}>
                <TouchableOpacity onPress={() => { navigation.openDrawer() }}>
                    <Menu />
                </TouchableOpacity>

                <Box flexDirection='row' alignItems='center' h={40} px={10} borderWidth={1} borderColor={colors.gray4} borderRadius={5} flex={0.9} >
                    <TextInput
                        placeholder={strings.searchPlaceHolder}
                        value={searchText}
                        numberOfLines={1}
                        onChangeText={handleSearch}
                        style={localStyles.inputContainerStyle}
                    />
                    {!!searchDataList.length && <Pressable onPress={() => {
                        setSearchDataList([])
                        setSearchText('')
                    }} >
                        <CrossBottomTab />
                    </Pressable>}
                </Box>


                <Box gap={5} flexDirection='row' alignItems='center' >
                    <TouchableOpacity

                        style={localStyles.cartBtnStyle}>
                        <LikeIcon height={iconSize} width={iconSize} />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.6} onPress={() => { navigation.navigate(StackNav.Cart) }} >
                        <Box>
                            <Cart height={iconSize} width={iconSize} />
                            {cartData?.length != 0 && <Box position='absolute' h={18} w={18} borderRadius={10} backgroundColor={colors.white} right={0} top={0} mt={-8} mr={-8} shadowColor='#000' shadowOffset={{ width: 0, height: 1 }} shadowOpacity={0.22} shadowRadius={2.22} alignItems='center' justifyContent='center' elevation={3}  >
                                <CText type='m10' align='center' numberOfLines={1} >{cartData?.length}</CText>
                            </Box>}
                        </Box>

                    </TouchableOpacity>


                </Box>

                {!!searchDataList.length && (
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
                )}
            </View>
            <Box flex={1} alignItems='center' justifyContent='center' >


                {<FlatList
                    style={{ flex: 1, alignSelf: 'center', marginTop: responsiveHeight(2) }}
                    data={products}
                    renderItem={renderCardItem}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={2}
                    // justifyContent="space-between"
                    contentContainerStyle={{}}
                    showsVerticalScrollIndicator={false}

                    //  ListEmptyComponent={()=>{
                    //   return(
                    //     <Loader/>
                    //   )
                    //  }}
                    onEndReached={onEndReached}
                    ListFooterComponent={() => {
                        if (showLoad) {
                            return (
                                <Box h={100} pt={20}>
                                    <Spinner color={colors.primary} size={'small'} />
                                </Box>
                            )
                        }
                    }}
                />}
                {/* {showLoad && <Box  >
                    <Loader />
                </Box>} */}
  
            </Box>
            {
        cartData.length > 0 && (
          <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#FBEADE', height: responsiveHeight(9), justifyContent: 'space-between', paddingHorizontal: responsiveWidth(3.5), borderTopLeftRadius: responsiveWidth(4), borderTopRightRadius: responsiveWidth(4) }}  >

            <Text style={{ color: colors.black, ...typography.fontSizes.f14, ...typography.fontWeights.Bold, }}>{cartData?.length} Items | {'\u20B9'} {getTotalPriceCart()}</Text>

            <TouchableOpacity onPress={() => { navigation.navigate(StackNav.Cart) }}  >
              <View style={{ backgroundColor: '#FD872E', paddingHorizontal: responsiveWidth(2.8), paddingVertical: responsiveHeight(1), flexDirection: 'row', alignItems: 'center', gap: responsiveWidth(1.5), borderRadius: responsiveWidth(3) }} >
                <CartIconWhite />
                <Text style={{ color: colors.white, ...typography.fontSizes.f12, ...typography.fontWeights.Bold, }} >Go to Cart</Text>
              </View>
            </TouchableOpacity>

          </View>
        )
      }
        </Container>
    )
}

export default ProductsByBrand

const localStyles = StyleSheet.create({

    searchContainer: {
        ...styles.rowSpaceBetween,
        ...styles.flexRow,
        ...styles.ph20,
        ...styles.itemsCenter,
        position: 'relative',
        zIndex: 100,
        ...styles.mt10,
    },
    searchSuggestionContainer: {
        position: 'absolute',
        top: moderateScale(40),
        width: '70%',
        // height: getHeight(150),
        backgroundColor: colors.white,
        ...styles.selfCenter,
        left: '19%',
        borderWidth: moderateScale(1),
        borderRadius: moderateScale(5),
        borderColor: colors.gray6,
        zIndex: 10,
        ...styles.shadowStyle,
    },
    dividerStyle: {
        height: getHeight(1),
        backgroundColor: colors.gray6,
    },
    inputContainerStyle: {
        ...typography.fontSizes.f10,
        ...typography.fontWeights.SemiBold,
        flex: 1,
        paddingRight: responsiveWidth(0.3),
    },
    cartBtnStyle: {
        ...styles.pl5,
        ...styles.pv10,
    },
    cardMainContainer: {
        borderWidth: 1,
        borderColor: '#D9D9D9',
        width: responsiveWidth(45),
        height: responsiveHeight(29),
        borderRadius: responsiveWidth(3),
        marginBottom: responsiveHeight(1),

    },
    bestsellerText: {
        color: colors.primary,
        ...typography.fontWeights.Medium,
        ...typography.fontSizes.f10,

    },
    itemImg: {
        resizeMode: 'contain',
        width: responsiveWidth(35),
        height: responsiveHeight(14),
        alignSelf: 'center',
        // marginTop:responsiveHeight(0)


    },
})