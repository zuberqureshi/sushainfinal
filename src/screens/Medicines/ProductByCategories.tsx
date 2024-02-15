import { StyleSheet, View,TouchableOpacity,Image, TextInput, Pressable,FlatList } from 'react-native'
import React,{useState,useRef, useEffect, useCallback} from 'react'
import { colors,styles } from '../../themes'
import typography from '../../themes/typography'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import CText from '../../components/common/CText'
import { BackArrow, Cart, CartIconWhite, ColitisIcon, CrossBottomTab, DownArrowBlack, DropdownFilledIcon, FilterIcon, GascidityIcon, HeartLightBlue, IBSIcon, LikeIcon, Menu, PepticUlcersIcon, ReloadBottomTab, SortIcon, TickFilterSelected, TickFilterUnselected } from '../../assets/svgs'
import { API_IMAGE_BASE_URL, deviceHeight, getHeight, moderateScale } from '../../common/constants'

import CHeader from '../../components/common/CHeader'
import CButton from '../../components/common/CButton'
import strings from '../../i18n/strings'


import images from '../../assets/images'
import ProductItemsByCategory from '../../components/Medicines/ProductItemsByCategory'
import { productAvailabilityData, productItemCategoryData } from '../../api/constant'
import KeyBoardAvoidWrapper from '../../components/common/KeyBoardAvoidWrapper'
import RBSheet from "react-native-raw-bottom-sheet";
import { StackNav } from '../../navigation/NavigationKeys'
import SearchWithLikeComponent from '../../components/common/CommonComponent/SearchWithLikeComponent'
import MedicinesByCategory from '../../components/Medicines/MedicinesByCategory'
import { Container } from '../../components/Container'

import { useDispatch, useSelector } from 'react-redux'
import { addProducts, clearProducts, decreaseQty, increaseQty } from '../../redux/productSlice'
import { Box, Text } from '@gluestack-ui/themed'
import Loader from '../../components/Loader/Loader'
import { addProductsToCart, deleteCartItem, removeCartItem } from '../../redux/cartSlice'
import { FlashList } from 'react-native-actions-sheet'
import { Dropdown } from 'react-native-element-dropdown'
import useGetMedicinesHealthConcerns from '../../hooks/medicine/get-medicine-concerns'

const ProductByCategories = ({ route, navigation }:any) => {

  //  console.log(route.params);
   const {categoryName,bannerImg} = route.params
  
   const refRBSheet = useRef();
   
   const iconSize = moderateScale(21);
  
   const limit = 10 ;
   const loadMore = true ;
   const [apiData, setApiData] = useState<any[]>([])
   const [multipleAddButton, setMultipleAddButton] = useState(false)
   const [filterBy, setFilterBy] = useState('brand')
   const [showLoad, setShowLoad] = useState(false)
   const [productCategory, setProductCategory] = useState([])
   const [selectedProductCategory, setSelectedProductCtegory] = useState(categoryName)
 
  const [pageNum, setPageNum] = useState(1)
  const [filterData1, setFilterData1] = useState([{title:'By Rating',isSelected:false},{title:'Price - Low High',isSelected:false},{title:'Price - High To Low',isSelected:false}])
  const [filterData2, setFilterData2] = useState([{title:'Dabur',isSelected:false},{title:'Sushain',isSelected:false},{title:'Boheco',isSelected:false},{title:'Nagarjuna',isSelected:false},{title:'Himalaya',isSelected:false},{title:'Boheco',isSelected:false},{title:'Nagarjuna',isSelected:false},{title:'Himalaya',isSelected:false}])
  
  const dispatch = useDispatch()

  const cartData = useSelector(state => state.cart);

  const {data:medicinesHealthConcernsData,isLoading:medicinesHealthConcernsIsLoading} = useGetMedicinesHealthConcerns()

 const onProductCategoryChange = (item: any) => {
    setPageNum(1)
    setSelectedProductCtegory(item.value)
  }

  const getTotalPriceCart = () => {
    let total = 0 ;
    cartData.map(item => {
      console.log('getTOTAL',item?.qty);
      
     
      total = total+(item?.qty + 1)*item.final_price
    })

    return total ;
  }

  // const addInRedux = async() => {
  //   await dispatch(clearProducts())
  //   productItemCategoryData.map(item => {
  //     dispatch(addProducts(item));
  //   })
  // }
  // useEffect(() => {
  //   addInRedux()
  // }, [])
  const products = useSelector(state => state.product);
  // console.log(products,products.length,'PREDUXBBB');

  const fetchData = () => {
    console.log(products.length,pageNum,'DATA LEE');
    
   setShowLoad(true)
    fetch(`http://3.110.107.128:3006/api/v1/order/medicinebycategory?master_cat=AYURVEDIC&cat_name=${selectedProductCategory}&pageNumber=${pageNum}&pageSize=10`).then(res => res.json())
    .then(async(res) =>{ 
      console.log(res?.result[0]?.productList?.length,pageNum,'APIII DATAAA')
      // await dispatch(clearProducts())
     
    
    
  //  dataApi =   await [...dataApi,...res?.result[0]?.productList]
  
     
   
    // await setApiData([...apiData,...res?.result[0]?.productList])

     await  res?.result[0]?.productList?.map(item => {
        // Assuming each item is an object
        // return {
        //   ...item,
        //   qty: 0, // Add your new value here
        // };
        dispatch(addProducts({ ...item, qty: 0}))
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
      console.log('erooor API PRODCC',error);
      
     }))
    
  }


  useEffect(() => {
   dispatch(clearProducts())
   fetchData()

  }, [selectedProductCategory])

  useEffect(() => {
    if (medicinesHealthConcernsData?.data && !medicinesHealthConcernsIsLoading) {
      const updatedData = medicinesHealthConcernsData?.data?.result[0].categroyList?.map((item: any) => {
        return {label: item?.name, value: item?.name }
      })

      setProductCategory(updatedData)
    }
  }, [medicinesHealthConcernsIsLoading])
  
  // console.log('prodect LIST',productCategory);
  
  
  const renderCardItem = useCallback( ({item, index}: any) => {

      //  console.log('qty',item?.id);
       const bestSeller = true
    return(
      <Pressable onPress={()=>{navigation.navigate(StackNav.ProductDetail,{productDetail:item})}} >
        <View style={[localStyles.cardMainContainer,{marginLeft:index % 2 && responsiveWidth(2.4) }]} >
           
           <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginHorizontal:responsiveWidth(1.5),marginTop:responsiveHeight(0),alignSelf:bestSeller?'auto':'flex-end'}}>
            {bestSeller && <Text style={localStyles.bestsellerText} >BESTSELLER</Text>}
          <HeartLightBlue style={{alignSelf:'flex-end'}} width={responsiveWidth(6)} height={responsiveHeight(4)} />
  
          
  
          </View>
  
          <Image source={{uri:`${API_IMAGE_BASE_URL}${item?.images}`}} style={localStyles.itemImg}  />
  
          <View style={{paddingLeft:responsiveWidth(1.5),marginTop:responsiveHeight(0.5),gap:moderateScale(2),height:responsiveHeight(4)}} >
            <Text fontFamily='$InterMedium' color={colors.black} fontSize={10} w='89%' numberOfLines={2} lineHeight={10} >{item?.name}</Text>
            <Text fontFamily='$InterRegular' color={colors.black} fontSize={8} w='90%' numberOfLines={1} lineHeight={10}  >Use In {item?.category?.split(',')[0]}</Text>
          </View>
  
          <View style={{paddingHorizontal:responsiveWidth(1.5),flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:responsiveHeight(1.3)}}  >
  
            <View style={{gap:moderateScale(2),marginTop:responsiveHeight(1)}} >
                <Text fontFamily='$InterBold' color={colors.black} fontSize={12} lineHeight={12} >{'\u20B9'} {!!item?.final_price ? item?.final_price : 'N/A'}</Text>
                <View style={{flexDirection:'row',alignItems:'center',gap:responsiveWidth(0.5)}} >
                    <Image source={images.startFilled} style={{resizeMode:'contain',width:responsiveWidth(2.5),height:responsiveHeight(1.25)}} />
                    <Text fontFamily='$InterMedium' color={colors.black} fontSize={10} lineHeight={10} >{!!item?.rating ? item?.rating : 5}|5 reviews</Text>
                </View>
  
  
            </View>
  
        {   item?.qty == 0 ? (
              <TouchableOpacity activeOpacity={0.6} onPress={()=>{
                dispatch(addProductsToCart(item))
                dispatch(increaseQty(item?.id))
  
                }} style={{backgroundColor:colors.lightSuccess,borderColor:colors.success,borderWidth:responsiveWidth(0.2),borderRadius:responsiveWidth(1.5)}} >
              <Text fontFamily='$InterMedium' color={colors.success} fontSize={12} px={16} py={1} >ADD</Text>
          </TouchableOpacity>
        ) : null }
  
        { item?.qty !==0 &&
          
         
              <View style={{flexDirection:'row',alignItems:'center',backgroundColor:colors.lightSuccess,borderColor:colors.success,borderWidth:responsiveWidth(0.2),borderRadius:responsiveWidth(1.5)}} >
                
               { item?.qty !==0 &&   <TouchableOpacity  onPress={()=>{
                      if(item.qty > 1){
                        dispatch(removeCartItem(item))
                        dispatch(decreaseQty(item?.id))
                      }else{
                        dispatch(deleteCartItem(item?.id))
                        dispatch(decreaseQty(item?.id))
                      }
                    }}
                activeOpacity={0.6}  >
                  <Text fontFamily='$InterMedium' color={colors.black} fontSize={20} pl={10}  >-</Text>
                  </TouchableOpacity>}
  
  
            { item?.qty !==0 &&   <Text  fontFamily='$InterSemiBold' color={colors.black} fontSize={14} px={9} py={1}  >{!!item?.qty ? item?.qty  : 0}</Text>}
                
                { item?.qty !==0 &&  <TouchableOpacity onPress={()=>{
                    dispatch(addProductsToCart(item))
                    dispatch(increaseQty(item?.id))
                }} activeOpacity={0.6} >
                  <Text  fontFamily='$InterMedium' color={colors.black} fontSize={20} pr={10} >+</Text>
                  </TouchableOpacity>}
             
              </View>
             
        
         
        }
          </View>
  
  
      
        </View>
        </Pressable>
    )
  
   
    },[products])
  
    const onEndReached = async() => {
    // await  setPageNum(pageNum + 1)
      if(loadMore && pageNum <=10 ){
    
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

  //  const filterData = [{title:'By Rating',isSelected:false},{title:'Price - Low High',isSelected:false},{title:'Price - High To Low',isSelected:false}];


   const renderFliterOption = ({item,index}:any) => {

    return(
      <View style={{borderBottomWidth:responsiveWidth(0.3),borderBottomColor:'#F0F2F4',marginHorizontal:responsiveWidth(5),paddingVertical:responsiveHeight(1)}} >

      
         <TouchableOpacity activeOpacity={0.6}  onPress={()=>{filterBy === 'sortby' ? onSelectRate(index) : onSelectBrand(index)}}  >
          <View style={{...styles.flexRow,...styles.justifyBetween,paddingHorizontal:responsiveWidth(5),}} >
            <CText 
            type={item?.isSelected ? 's14':'r14'}
            color={item?.isSelected ? colors.black:'#7A7878'}
            >{item?.title}</CText>
           { item?.isSelected ? <TickFilterSelected/> : <TickFilterUnselected/>}

            
          </View>
         </TouchableOpacity>
         </View>
    )
   }

   const onSelectRate = (ind:Number) =>{
    const tempData = []
    filterData1.map((item,index)=>{
      if(index===ind){

      tempData.push({title:item.title,isSelected:true})
      }else{
        tempData.push({title:item.title,isSelected:false})
      }
 
    })
    setFilterData1(tempData)
   }

      const onSelectBrand = (ind:Number) =>{
    const tempData = []
    filterData2.map((item,index)=>{
      if(index===ind){
           
        if(item.isSelected === true){
          tempData.push({title:item.title,isSelected:false})
        }else{
           tempData.push({title:item.title,isSelected:true})
        }
      
      }else{
         if(item.isSelected === true){
          tempData.push({title:item.title,isSelected:true})
        }else{
           tempData.push({title:item.title,isSelected:false})
        }
      }
 
    })
    setFilterData2(tempData)
   }
    
  return (
   <Container statusBarStyle='dark-content' >
    

  <View style={[localStyles.headerWrapper,]}>
      <View style={[styles.rowStart, styles.flex]}>
       
          <TouchableOpacity style={styles.mr15} onPress={()=>{navigation.goBack()}}>
            <BackArrow height={moderateScale(20)} width={moderateScale(20)} />
          </TouchableOpacity>
{/*       
        <CText
          numberOfLines={1}
          style={localStyles.headerText}
          type={'s16'}>
          {categoryName}
          
        </CText> */}

      { !!productCategory && <Dropdown
            data={productCategory}
            style={localStyles.dropdown}
            placeholderStyle={localStyles.placeholderStyle}
            selectedTextStyle={localStyles.selectedTextStyle}
            renderItem={(item)=>{return(<Text fontFamily='$InterSemiBold' fontSize={14} lineHeight={16} numberOfLines={1}  style={{paddingHorizontal:responsiveWidth(2.5),paddingVertical:responsiveHeight(1)}} >{item?.label}</Text>)}}
            labelField="label"
            valueField="value"
            placeholder={`${selectedProductCategory}`}
            value={selectedProductCategory}
            onChange={onProductCategoryChange}
            renderRightIcon={() => <DropdownFilledIcon />}
            // itemTextStyle={styles.selectedTextStyle}
            itemContainerStyle={localStyles.itemContainerStyle}
            selectedTextProps={{ numberOfLines: 1 }}
          />}

      </View>
      
    </View>

    <View style={localStyles.searchContainer}>
          <TouchableOpacity onPress={()=>{navigation.openDrawer()}}>
            <Menu />
          </TouchableOpacity>
         
          <TextInput
           placeholder={strings.searchPlaceHolder}
           
           style={localStyles.inputContainerStyle}
          />
      <Box gap={5} flexDirection='row' alignItems='center' >
      <TouchableOpacity
        
        style={localStyles.cartBtnStyle}>
        <LikeIcon height={iconSize} width={iconSize} />
      </TouchableOpacity>
      <TouchableOpacity 
      onPress={()=>{navigation.navigate(StackNav.Cart)}} 
      style={localStyles.cartBtnStyle}>
        <Cart height={iconSize} width={iconSize} />
      </TouchableOpacity>
      </Box>    
       
          {/* {!!searchData.length && (
            <View style={localStyles.searchSuggestionContainer}>
              <FlatList
                data={searchData}
                renderItem={renderSearchResult}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={() => <RenderSeparator />}
                // estimatedItemSize={100}
              />
            </View>
          )} */}
        </View>

      <KeyBoardAvoidWrapper>

      <View style={{flexDirection:'row',alignItems:'center',alignSelf:'flex-end',paddingRight:responsiveWidth(4),marginTop:responsiveHeight(1),}} >
       <CButton
            title={strings.sort}
            onPress={() => {StackNav.ProductDetail}}
            containerStyle={localStyles.btnContainerStyle}
            bgColor={colors.white}
            color={colors.black}
            style={styles.ml5}
            type="r12"
            frontIcon={<SortIcon />}
          />
          <CButton
            title={strings.filter}
            onPress={() => {refRBSheet.current.open()}}
            containerStyle={localStyles.btnContainerStyle}
            bgColor={colors.white}
            color={colors.black}
            style={styles.ml5}
            type="r12"
            frontIcon={<FilterIcon />}
          />

        
      </View>

      <MedicinesByCategory/>

      <TouchableOpacity activeOpacity={0.6} style={localStyles.bannerContaienr}>
          <Image
            source={{uri:`${API_IMAGE_BASE_URL}${bannerImg}`}}
            style={localStyles.bannerImageStyle}
            resizeMode="cover"
          />
      </TouchableOpacity>



    <FlatList
        style={{flex:1,alignSelf:'center'}}
          data={products}
          renderItem={renderCardItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          // justifyContent="space-between"
         contentContainerStyle={{}}
        
        //  ListEmptyComponent={()=>{
        //   return(
        //     <Loader/>
        //   )
        //  }}
         onEndReached={onEndReached}
        //  ListFooterComponent={() => {
        //    if (useGetMedicinesByCategoryQuery?.isFetching) {
        //      return (
        //        <Box h={100} pt={20}>
        //          <Spinner color={colors.primary} size={'small'} />
        //        </Box>
        //      )
        //    }
        //  }}
        />

         {showLoad && <Box mt={!!products ? 20 : 50} mb={20}>
          <Loader/>
         </Box> }
  
      </KeyBoardAvoidWrapper>



  {
    cartData.length >0 && (
      <View style={{flexDirection:'row',alignItems:'center',backgroundColor:'#FBEADE',height:responsiveHeight(9),justifyContent:'space-between',paddingHorizontal:responsiveWidth(3.5),borderTopLeftRadius:responsiveWidth(4),borderTopRightRadius:responsiveWidth(4)}}  >

      <Text style={{color:colors.black,   ...typography.fontSizes.f14,...typography.fontWeights.Bold,}}>{cartData?.length} Items | {'\u20B9'} {getTotalPriceCart()}</Text>
    
      <TouchableOpacity onPress={()=>{navigation.navigate(StackNav.Cart)}}  >
        <View style={{backgroundColor:'#FD872E',paddingHorizontal:responsiveWidth(2.8),paddingVertical:responsiveHeight(1),flexDirection:'row',alignItems:'center',gap:responsiveWidth(1.5),borderRadius:responsiveWidth(3)}} >
          <CartIconWhite/>
          <Text style={{color:colors.white,   ...typography.fontSizes.f12,...typography.fontWeights.Bold,}} >Go to Cart</Text>
        </View>
      </TouchableOpacity>
      
     </View>
    )
  }


 <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        height={deviceHeight*0.5}
        customStyles={{
          wrapper: {
            backgroundColor:'transparent'
          },
          draggableIcon: {
            backgroundColor: "#9E9E9E"
          },
          container: {
             backgroundColor:'#F8F6F6',
             borderTopLeftRadius:responsiveWidth(5),
             borderTopRightRadius:responsiveWidth(5),
            }
        }}
      >

        <View style={{paddingHorizontal:responsiveWidth(4),borderBottomWidth:1,borderBottomColor:colors.black,paddingBottom:responsiveHeight(2)}} >
          <TouchableOpacity  activeOpacity={0.6} onPress={()=>{refRBSheet.current.close()}} style={{alignSelf:'flex-end',marginBottom:responsiveHeight(2)}} >
            <CrossBottomTab/>
          </TouchableOpacity>

          <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}} >
          <CText
               type={'s12'}
              >
               Fliters
              </CText>
            
            <TouchableOpacity activeOpacity={0.6} >
            <View style={{flexDirection:'row',alignItems:'center',gap:responsiveWidth(1.5)}} >
              <ReloadBottomTab/>
              <CText
               type={'s12'}
              >
               Reset
              </CText>
            </View>
            </TouchableOpacity>
          </View>
        

        </View>

        <View style={{flexDirection:'row',alignItems:'center',marginBottom:responsiveHeight(2)}} >
          <View style={{width:'25%',alignSelf:'flex-start'}} >
            <TouchableOpacity onPress={()=>{setFilterBy('sortby')}}  activeOpacity={0.6} style={{backgroundColor: filterBy === 'sortby' ? colors.white:'#ECEDEE',paddingVertical:responsiveHeight(2.5),borderBottomWidth:responsiveWidth(0.2),borderBottomColor:'#E6E3E3'}} >
              <CText
              type={filterBy === 'sortby' ?'s12':'r12'}
              color={ filterBy === 'sortby' ? colors.primary : colors.black}
              align='center'
              >
                Sort BY
              </CText>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{setFilterBy('brandby')}} activeOpacity={0.6} style={{backgroundColor:filterBy === 'brandby' ? colors.white:'#ECEDEE',paddingVertical:responsiveHeight(2.5),borderBottomWidth:responsiveWidth(0.2),borderBottomColor:'#E6E3E3'}}>
              <CText
              type={filterBy === 'brandby' ?'s12':'r12'}
              color={filterBy === 'brandby' ? colors.primary : colors.black}
              align='center'
              >
                Brand
              </CText>
            </TouchableOpacity>
          
          </View>

          <View style={{backgroundColor:colors.white,width:'75%',height:responsiveHeight(30),paddingTop:responsiveHeight(1.5)}}>

      
            
            <FlatList
              style={{flex:1}}
              data={filterBy === 'sortby' ? filterData1 : filterData2 }
              renderItem={renderFliterOption}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
            />


          </View>
        </View>


        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingHorizontal:responsiveWidth(10)}} >

          <TouchableOpacity activeOpacity={0.6} style={{backgroundColor:colors.primary,paddingHorizontal:responsiveWidth(8),paddingVertical:responsiveHeight(1),borderRadius:responsiveWidth(3)}} >

            <CText
            type='s12'
            color={colors.white}
            >
              Reset All
            </CText>
             
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.6} style={{backgroundColor:colors.primary,paddingHorizontal:responsiveWidth(10),paddingVertical:responsiveHeight(1),borderRadius:responsiveWidth(3)}} >

            <CText
            type='s12'
            color={colors.white}
            >
              Apply
            </CText>
             
          </TouchableOpacity>
        </View>


 </RBSheet>



  
   </Container>
  )
}

export default ProductByCategories

const localStyles = StyleSheet.create({

    headerWrapper: {
        ...styles.rowSpaceBetween,
        ...styles.ph20,
        ...styles.pv15,
        ...styles.center,
        backgroundColor: colors.primary3,
      },
      headerText: {
        ...styles.pr10,
        ...styles.mr10,
        ...styles.flex,
      },
      btnContainerStyle: {
        ...styles.ml10,
        ...styles.ph10,
        borderWidth: moderateScale(1),
        borderColor: colors.bColor2,
        height: getHeight(28),
        borderRadius: moderateScale(10),
      },
      bannerContaienr: {
        ...styles.center,
        ...styles.mh15,
      },
      bannerImageStyle: {
        width: '100%',
        height: moderateScale(140),
        ...styles.mv10,
        borderRadius: moderateScale(10),
      },
      searchContainer: {
        ...styles.rowSpaceBetween,
        ...styles.flexRow,
        ...styles.ph20,
        ...styles.itemsCenter,
        position: 'relative',
        zIndex: 100,
        ...styles.mt10
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
      cartBtnStyle: {
        ...styles.pl5,
        ...styles.pv10,
      },
      inputContainerStyle: {
        ...typography.fontSizes.f10,
        ...typography.fontWeights.SemiBold,
        flex:1,
        marginHorizontal:responsiveWidth(2.5),
        height:responsiveHeight(5),
        borderWidth:1,
        borderRadius:responsiveWidth(1.5),
        borderColor: colors.gray4,
        ...styles.pl10
    
      },
      dividerStyle: {
        height: getHeight(1),
        backgroundColor: colors.gray6,
      },
      cardMainContainer:{
        borderWidth:1,
        borderColor:'#D9D9D9',
        width:responsiveWidth(45),
        height:responsiveHeight(29),
        borderRadius:responsiveWidth(3),
        marginBottom:responsiveHeight(1),
        
       },
       bestsellerText:{
           color:colors.primary,
           ...typography.fontWeights.Medium,
           ...typography.fontSizes.f10,
        
         },
         itemImg:{
           resizeMode:'contain',
           width:responsiveWidth(35),
           height:responsiveHeight(14),
           alignSelf:'center',
           // marginTop:responsiveHeight(0)
   
         
       },
       dropdown: {
        backgroundColor: colors.primary3,
        width: responsiveWidth(30),
        paddingHorizontal: responsiveWidth(2),
        
        // paddingLeft: responsiveWidth(3),
        // color: 'red',
        height: responsiveHeight(3),
        
    
    
      },
      selectedTextStyle: {
        color: colors.black,
        ...typography.fontWeights.SemiBold,
        ...typography.fontSizes.f14,
        
        
      },
      itemContainerStyle: {
    
      },
      placeholderStyle: {
        color: colors.black,
        ...typography.fontWeights.SemiBold,
        ...typography.fontSizes.f14,
    
    
      },

})