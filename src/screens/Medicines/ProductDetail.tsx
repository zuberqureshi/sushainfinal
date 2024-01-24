import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, ScrollView, Pressable } from 'react-native'
import React, { useState, useRef } from 'react'
import { colors, styles } from '../../themes'
import typography from '../../themes/typography'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import CText from '../../components/common/CText'
import { ArrowDown, BackArrow, BagBlue, Cart, CartBlack, CartIconWhite, CashIcon, ColitisIcon, CrossBottomTab, DownArrowBlack, DownArrowWhite, FilterIcon, GascidityIcon, Genuine, GreenSmaalTick, GreenTruck, IBSIcon, LikeIcon, Location, PepticUlcersIcon, RecurringPayment, ReloadBottomTab, ShareIcon, ShareIconBlack, SortIcon, StarFilled, StarUnFilled, TickFilterSelected, TickFilterUnselected, TruckIcon, WorkspaceTrusted } from '../../assets/svgs'
import { deviceHeight, deviceWidth, getHeight, moderateScale } from '../../common/constants'
import CSafeAreaView from '../../components/common/CSafeAreaView'
import CHeader from '../../components/common/CHeader'
import CButton from '../../components/common/CButton'
import strings from '../../i18n/strings'
import images from '../../assets/images'
import { medicineBestSellingData, productAvailabilityData, productItemCategoryData } from '../../api/constant'
import KeyBoardAvoidWrapper from '../../components/common/KeyBoardAvoidWrapper'
import { FlashList } from '@shopify/flash-list'
import { Dropdown } from 'react-native-element-dropdown'
import SimilarProduct from '../../components/Medicines/SimilarProduct'
import { StackNav } from '../../navigation/NavigationKeys'
import { Container } from '../../components/Container'
import Body from '../../components/Body/Body'
// import { ScrollView } from 'react-native-virtualized-view'

const wWidht = Dimensions.get('screen').width;
const wHeight = Dimensions.get('screen').height;
const ProductDetail = ({ route, navigation }) => {

  const [sliderImgActive, setSliderImgActive] = useState(0)
  const [productTypeActive, setProductTypeActive] = useState(0)

  const [productAvailability, setProductAvailability] = useState('')
  const onProductAvailability = (item: any) => setProductAvailability(item.value)

  const onChangeSliderImg = (nativeEvent) => {

    if (nativeEvent) {
      const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width)
      if (slide != sliderImgActive) {
        setSliderImgActive(slide)
      }
    }
  }

  const HeaderRightIcon = () => {

    return (
      <View style={{ ...styles.flexRow, ...styles.itemsCenter, gap: responsiveWidth(2.5) }} >
        <ShareIconBlack />
        <LikeIcon />

        <CartBlack />
        <CText type='b8' style={{ backgroundColor: colors.white, position: 'absolute', right: 0, paddingHorizontal: responsiveWidth(1.5), paddingVertical: responsiveHeight(0.2), borderRadius: responsiveWidth(2), top: responsiveHeight(-0.5), }} >1</CText>


      </View>
    )
  }

  const imgData = [
    {
      image: images.productSlider,

    },
    {
      image: images.productSlider,
    },
    {
      image: images.productSlider,
    }
  ]

  const renderType = ({ item, index }) => {

    return (
      <Pressable onPress={() => { setProductTypeActive(index) }} >
        <View style={{ borderWidth: 1, borderColor: productTypeActive === index ? '#149C5C' : '#BEC1BF', marginRight: responsiveWidth(1.5), borderRadius: responsiveWidth(1) }} >
          <CText type='m8' color={productTypeActive === index ? '#149C5C' : '#BEC1BF'} style={{ paddingHorizontal: responsiveWidth(1), }} >{item}</CText>
        </View>

      </Pressable>

    )
  }

  return (
    <Container>

 


      <CHeader rightIcon={<HeaderRightIcon />} />
      <Body>
      <View style={{ ...styles.flexRow, ...styles.itemsCenter, ...styles.justifyBetween, marginHorizontal: responsiveWidth(4), marginTop: responsiveHeight(1.5), overflow: 'hidden' }} >
        <View style={{ ...styles.flexRow, ...styles.itemsCenter, gap: responsiveWidth(1.5) }} >
          <Location />
          <CText type='m14' style={{ alignSelf: 'flex-end' }}  > Deliver to- Pune</CText>
        </View>

        <CText type='m12' style={{ borderBottomWidth: 1, borderBottomColor: colors.black }} >Change</CText>

      </View>


      <View style={{ width: wWidht * 0.9, height: wHeight * 0.22, alignSelf: 'center', borderWidth: 1, marginHorizontal: responsiveWidth(5), borderColor: '#E3DBDB', borderRadius: responsiveWidth(5), paddingTop: responsiveHeight(1.8), marginTop: responsiveHeight(2) }} >
        <ScrollView
          onScroll={({ nativeEvent }) => onChangeSliderImg(nativeEvent)}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          horizontal
          style={{ width: wWidht * 0.9, height: wHeight * 0.22 }}
        >

          {
            imgData.map((e, index) =>
              <Image key={index} source={e.image} style={{ width: wWidht * 0.9, height: wHeight * 0.20 }} resizeMode='contain' />
            )
          }

        </ScrollView>
      </View>

      <View style={localStyles.wrapDot} >
        {
          imgData.map((e, index) =>
            <Text
              key={index}
              style={sliderImgActive === index ? localStyles.dotActive : localStyles.dot}
            >
              ●
            </Text>
          )
        }
      </View>

      <View style={{ paddingHorizontal: responsiveWidth(3), paddingBottom: responsiveHeight(2), borderBottomWidth: responsiveWidth(1.5), borderBottomColor: '#F5F1F1' }} >
        <CText type='s16' >Aloe Cucumber Face Wash</CText>
        <CText type='r8' >BY PURE BY PRIYANKA</CText>

        <View style={{ marginVertical: responsiveHeight(0.5) }} >
          <FlashList
            // style={{ flex: 1, }}
            data={['100 ML', '200 ML', '300 ML']}
            renderItem={renderType}
            keyExtractor={(item, index) => index.toString()}

            horizontal
            // justifyContent="space-between"
           
            estimatedItemSize={200}
          />

        </View>

        <CText type='r12' >1 Pack of 100 ML in Bottle</CText>

        <View style={{ flexDirection: 'row', alignItems: 'center' }} >
          <FlashList
            // style={{ flex: 1, }}
            data={[1, 2, 3, 4, 5]}
            renderItem={({ item, index }) => (item != 5 ? <StarFilled /> : <StarUnFilled />)}
            keyExtractor={(item, index) => index.toString()}

            horizontal
            // justifyContent="space-between"
            // contentContainerStyle={{}}
            estimatedItemSize={200}
          />
            
          <Pressable onPress={()=>{navigation.navigate(StackNav.ProductsReview)}} >
          <CText type='m10' color='#93989A' >4 Reviews</CText>
          </Pressable>  
          
        </View>

        <View style={{ ...styles.flexRow, marginTop: responsiveHeight(0.5) }} >
          <BagBlue />
          <CText type='r10' color='#30B0C5' >110 people bought this</CText>
        </View>

      </View>

      <View style={{  paddingBottom: responsiveHeight(1.5), borderBottomWidth: responsiveWidth(1.5), borderBottomColor: '#F5F1F1'}} >

        <View style={{ ...styles.flexRow, marginTop: responsiveHeight(1.5), gap: responsiveWidth(3),paddingHorizontal: responsiveWidth(3)  }} >
          <CText type='s12' >Availability In</CText>
          <Dropdown
            data={productAvailabilityData}
            style={localStyles.dropdown}
            placeholderStyle={localStyles.placeholderStyle}
            selectedTextStyle={localStyles.selectedTextStyle}

            labelField="label"
            valueField="value"
            placeholder={'Select Type'}
            value={productAvailability}
            onChange={onProductAvailability}
            renderRightIcon={() => <DownArrowBlack />}
            // itemTextStyle={styles.selectedTextStyle}
            itemContainerStyle={localStyles.itemContainerStyle}
          />
        </View>


        <CText style={{ marginTop: responsiveHeight(1),paddingHorizontal: responsiveWidth(3)  }} type='r12'  >MRP  <CText type='s16' >{'\u20B9'} 690</CText></CText>

        <View style={{ ...styles.flexRow, marginTop: responsiveHeight(2), gap: responsiveWidth(3),paddingHorizontal: responsiveWidth(3)  }}  >
          <TouchableOpacity activeOpacity={0.6} style={{ borderColor: colors.primary, paddingHorizontal: responsiveWidth(6), paddingVertical: responsiveHeight(0.4), borderRadius: responsiveWidth(3),borderWidth:1 }} >

            <CText
              type='m14'
              color={colors.primary}
            >
              Add to Cart
            </CText>

          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.6} style={{ backgroundColor: colors.primary, paddingHorizontal: responsiveWidth(6), paddingVertical: responsiveHeight(0.4), borderRadius: responsiveWidth(3)}} >

            <CText
              type='m14'
              color={colors.white}
            >
              Buy Now
            </CText>

          </TouchableOpacity>
        </View>
        
        <View style={{backgroundColor:'#FEE7E7',paddingHorizontal: responsiveWidth(3),paddingVertical:responsiveHeight(2),marginTop:responsiveHeight(2) }} >

          <View style={{...styles.flexRow, }} >
          <CText type='s10' style={{alignSelf:'flex-end'}} >MRP <CText type='r10' style={{textDecorationLine:'line-through',}} >{'\u20B9'} 690</CText></CText>

          <View style={{...styles.flexRow, }} >
            <CText type='s16'>  {'\u20B9'} 138 * </CText>
            <CText type='s12' color='#F40909' >(20% OFF)</CText>
          </View>
          </View>

          <View style={{...styles.flexRow,gap:responsiveWidth(2),marginTop:responsiveHeight(0.7) }} >
            <CText type='s10' >Sale ends in</CText>

            <View style={{backgroundColor:'#F6FFFB',borderRadius:responsiveWidth(2),paddingHorizontal:responsiveWidth(1.5),paddingVertical:responsiveHeight(0.1)}} >
              <CText type='m10' >01h:05m23s</CText>
            </View>
          </View>
        </View>

      </View>
     

      <View style={{paddingHorizontal:responsiveWidth(3),paddingVertical:responsiveHeight(2), borderBottomWidth: responsiveWidth(1.5), borderBottomColor: '#F5F1F1'}} >
        
        <View style={{gap:responsiveHeight(1.2)}} >
        <CText type='s14' >Product details</CText>

        <View>
        <CText type='s12' color='#5E5B58' >Description:</CText>

        <CText type='m10' color='#525454' style={{width:responsiveWidth(89),marginTop:responsiveHeight(0.3)}} >
        This enriched formula with Aloe Vera Leaf Extract, Basil Extract, Neem Extract, Tea Tree Oil, White Tea and Cucumber Extract known for their natural healing properties which helps in deeply cleanses and decongests the pores of your skin.
        </CText>
        </View>

        <View>
        <CText type='s12' color='#5E5B58' >Highlights:</CText>

        <CText type='m10' color='#525454' style={{width:responsiveWidth(89),marginTop:responsiveHeight(0.3)}} >• It helps in fading any marks or blemishes left by acne or pimples.</CText>
        <CText type='m10' color='#525454' style={{width:responsiveWidth(89),}} >• Contains Salicylic Acid that helps treat acne prevent acne.</CText>
        <CText type='m10' color='#525454' style={{width:responsiveWidth(89),}} >• Unclogs pores and allows the skin to breathe and shine.</CText>
        </View>

        <View>
        <CText type='s12' color='#5E5B58' >Direction Of Use:</CText>

        <CText type='m10' color='#525454' style={{width:responsiveWidth(89),marginTop:responsiveHeight(0.3)}} >As directed by your Healthcare Professional.</CText>
        </View>
    
        </View>
       
        <Dropdown
            data={productAvailabilityData}
            style={localStyles.dropdownDetail}
            placeholderStyle={localStyles.placeholderStyleDetail}
            selectedTextStyle={localStyles.selectedTextStyleDetail}

            labelField="label"
            valueField="value"
            placeholder={'Composition'}
            value={productAvailability}
            onChange={onProductAvailability}
            renderRightIcon={() => <DownArrowBlack/>}
            // itemTextStyle={styles.selectedTextStyle}
            itemContainerStyle={localStyles.itemContainerStyleDetail}
          />

        <Dropdown
            data={productAvailabilityData}
            style={localStyles.dropdownDetail}
            placeholderStyle={localStyles.placeholderStyleDetail}
            selectedTextStyle={localStyles.selectedTextStyleDetail}

            labelField="label"
            valueField="value"
            placeholder={'Doctor’s Review'}
            value={productAvailability}
            onChange={onProductAvailability}
            renderRightIcon={() => <DownArrowBlack/>}
            // itemTextStyle={styles.selectedTextStyle}
            itemContainerStyle={localStyles.itemContainerStyleDetail}
          />


       
      </View>
     

     <View style={{paddingHorizontal:responsiveWidth(3),paddingVertical:responsiveHeight(2.5),borderBottomWidth: responsiveWidth(1.5), borderBottomColor: '#F5F1F1'}} >
        
        <CText type='s14' >Delivery & Services</CText>

        <View style={{...styles.flexRow,gap:responsiveWidth(4),marginTop:responsiveHeight(2)}} >
          <View style={{...styles.flexRow}} >
            <TruckIcon/>
            <View style={{alignSelf:'flex-end',borderWidth:1,borderColor:'#80B644',borderRadius:responsiveWidth(1.8),position:'absolute',marginLeft:responsiveWidth(3.5),bottom:-1,}} >
              <GreenSmaalTick/>
            </View>

          </View>
          <CText type='m12' >Get it by Mon, 9 Oct</CText>
        </View>

        <View style={{...styles.flexRow,gap:responsiveWidth(4),marginTop:responsiveHeight(1)}} >
          <View style={{...styles.flexRow}} >
            <CashIcon/>
            <View style={{alignSelf:'flex-end',borderWidth:1,borderColor:'#80B644',borderRadius:responsiveWidth(1.8),position:'absolute',marginLeft:responsiveWidth(3.5),bottom:-1,}} >
              <GreenSmaalTick/>
            </View>

          </View>
          <CText type='m12' >Cash on Delivery is available</CText>
        </View>
     </View>


     <View style={{paddingHorizontal:responsiveWidth(3),paddingVertical:responsiveHeight(2.5),borderBottomWidth: responsiveWidth(1.5), borderBottomColor: '#F5F1F1'}} >        
        <CText type='s14' >Return Policy</CText>
        <CText type='m12' style={{marginTop:responsiveHeight(0.5)}} >This Product is not Refundable</CText>
     </View>


     <View style={{paddingHorizontal:responsiveWidth(3),paddingVertical:responsiveHeight(2.5), borderBottomWidth: responsiveWidth(1.5), borderBottomColor: '#F5F1F1',...styles.flexRow,...styles.justifyBetween,}} >
        
      <View  >
         <View style={{alignItems:'center',borderWidth:1,borderColor:'#80B644',alignSelf:'center',paddingHorizontal:responsiveWidth(3),paddingVertical:responsiveHeight(1.25),borderRadius:responsiveWidth(6),marginBottom:responsiveHeight(0.5)}}  >
          <Genuine/>
         
         </View>
         <CText type='s8' align='center' style={{width:responsiveWidth(15)}} >100% Genuine products</CText>
      </View>

      <View  >
      <View style={{alignItems:'center',borderWidth:1,borderColor:'#80B644',alignSelf:'center',paddingHorizontal:responsiveWidth(2.2),paddingVertical:responsiveHeight(1),borderRadius:responsiveWidth(6),marginBottom:responsiveHeight(0.5)}}  >
          <RecurringPayment/>
         
         </View>
         <CText type='s8' align='center' style={{width:responsiveWidth(15)}} >Safe & Secure Payment</CText>
      </View>

      <View  >
      <View style={{alignItems:'center',borderWidth:1,borderColor:'#80B644',alignSelf:'center',paddingHorizontal:responsiveWidth(2.5),paddingVertical:responsiveHeight(1.2),borderRadius:responsiveWidth(6),marginBottom:responsiveHeight(0.5)}}  >
          <GreenTruck/>
         
         </View>
         <CText type='s8' align='center' style={{width:responsiveWidth(15)}} >Contactless Delivery</CText>
      </View>

      <View  ><View style={{alignItems:'center',borderWidth:1,borderColor:'#80B644',alignSelf:'center',paddingHorizontal:responsiveWidth(3),paddingVertical:responsiveHeight(1.5),borderRadius:responsiveWidth(6),marginBottom:responsiveHeight(0.5)}}  >
          <WorkspaceTrusted/>
         
         </View>
         <CText type='s8' align='center' style={{width:responsiveWidth(15)}} >Trusted by Professionals</CText>
      </View>


     </View>


     <View style={{paddingTop:responsiveHeight(2),marginBottom:responsiveHeight(8)}} >

     <View style={{...styles.flexRow,...styles.justifyBetween,paddingHorizontal:responsiveWidth(3),marginBottom:responsiveHeight(1.5)}} >
        <CText type='s14' >Similar Products</CText>
        <CText type='s12' color='#149C5C' >View All</CText>
      </View>

      <SimilarProduct title={'Similar Products'} data={medicineBestSellingData} bestSeller={false} />
      

      <TouchableOpacity activeOpacity={0.6} style={{backgroundColor:colors.success,alignSelf:'center',paddingVertical:responsiveHeight(2),paddingHorizontal:responsiveWidth(8),borderRadius:responsiveWidth(5),marginTop:responsiveHeight(3.5)}} >
        <CText type='m12' color={colors.white} >Ask your question to our experts</CText>
      </TouchableOpacity>


     </View>

    
     <View style={{flexDirection:'row',alignItems:'center',backgroundColor:'#FBEADE',marginBottom:responsiveHeight(9),height:responsiveHeight(9),justifyContent:'space-between',paddingHorizontal:responsiveWidth(3.5),borderTopLeftRadius:responsiveWidth(4),borderTopRightRadius:responsiveWidth(4)}}  >

  <Text style={{color:colors.black,   ...typography.fontSizes.f16,...typography.fontWeights.Bold,}}>Total Price: {'\u20B9'}526</Text>

  <TouchableOpacity activeOpacity={0.6} onPress={()=>{navigation.navigate(StackNav.MedicineCart)}}  >
    <View style={{backgroundColor:'#FD872E',paddingHorizontal:responsiveWidth(2.8),paddingVertical:responsiveHeight(1),flexDirection:'row',alignItems:'center',gap:responsiveWidth(1.5),borderRadius:responsiveWidth(3)}} >
      <CartIconWhite/>
      <Text style={{color:colors.white,   ...typography.fontSizes.f12,...typography.fontWeights.Bold,}} >Go to Cart</Text>
    </View>
  </TouchableOpacity>
  



 </View>





    
      </Body>

    </Container>
  )
}

export default ProductDetail

const localStyles = StyleSheet.create({
  wrapDot: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: responsiveHeight(1.3)

  },
  dotActive: {
    margin: responsiveWidth(0.5),
    color: '#9E9E9E',
    fontSize: responsiveFontSize(2.5)

  },
  dot: {
    margin: responsiveWidth(0.5),
    color: '#ECE9E9',
    fontSize: responsiveFontSize(2.5)

  },
  dropdown: {
    backgroundColor: '#EBFBD9',
    width: responsiveWidth(25),
    paddingHorizontal: responsiveWidth(2),
    borderRadius: responsiveWidth(2.5),
    paddingLeft: responsiveWidth(3),
    color: 'red',
    height: responsiveHeight(3)


  },
  selectedTextStyle: {
    color: colors.black,
    ...typography.fontWeights.Medium,
    ...typography.fontSizes.f10,

  },
  itemContainerStyle: {

  },
  placeholderStyle: {
    color: colors.black,
    ...typography.fontWeights.Medium,
    ...typography.fontSizes.f10,


  },
  dropdownDetail: {
    backgroundColor: '#FFF1F1',
   
    paddingHorizontal: responsiveWidth(2.5),
    borderRadius: responsiveWidth(2),
    paddingLeft: responsiveWidth(3),
    height: responsiveHeight(6),
    marginTop:responsiveHeight(2)


  },
  selectedTextStyleDetail: {
    color: colors.black,
    ...typography.fontWeights.Medium,
    ...typography.fontSizes.f14,

  },
  itemContainerStyleDetail: {

  },
  placeholderStyleDetail: {
    color: colors.black,
    ...typography.fontWeights.Medium,
    ...typography.fontSizes.f14,


  },

})