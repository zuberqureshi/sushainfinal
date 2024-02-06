import { StyleSheet, Text, View,TouchableOpacity,Image } from 'react-native'
import React,{useState,useRef} from 'react'
import { colors,styles } from '../../themes'
import typography from '../../themes/typography'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import CText from '../../components/common/CText'
import { BackArrow, Cart, CartIconWhite, ColitisIcon, CrossBottomTab, FilterIcon, GascidityIcon, IBSIcon, PepticUlcersIcon, ReloadBottomTab, SortIcon, TickFilterSelected, TickFilterUnselected } from '../../assets/svgs'
import { deviceHeight, getHeight, moderateScale } from '../../common/constants'

import CHeader from '../../components/common/CHeader'
import CButton from '../../components/common/CButton'
import strings from '../../i18n/strings'


import images from '../../assets/images'
import ProductItemsByCategory from '../../components/Medicines/ProductItemsByCategory'
import { productItemCategoryData } from '../../api/constant'
import KeyBoardAvoidWrapper from '../../components/common/KeyBoardAvoidWrapper'
import RBSheet from "react-native-raw-bottom-sheet";
import { StackNav } from '../../navigation/NavigationKeys'
import SearchWithLikeComponent from '../../components/common/CommonComponent/SearchWithLikeComponent'
import MedicinesByCategory from '../../components/Medicines/MedicinesByCategory'
import { Container } from '../../components/Container'
import { FlatList } from 'react-native-gesture-handler'



const ProductByCategories = ({ route, navigation }:any) => {

  //  console.log(route.params);
   const {categoryName} = route.params

   const refRBSheet = useRef();
   
   const [multipleAddButton, setMultipleAddButton] = useState(false)
   const [filterBy, setFilterBy] = useState('brand')

  const [filterData1, setFilterData1] = useState([{title:'By Rating',isSelected:false},{title:'Price - Low High',isSelected:false},{title:'Price - High To Low',isSelected:false}])
  const [filterData2, setFilterData2] = useState([{title:'Dabur',isSelected:false},{title:'Sushain',isSelected:false},{title:'Boheco',isSelected:false},{title:'Nagarjuna',isSelected:false},{title:'Himalaya',isSelected:false},{title:'Boheco',isSelected:false},{title:'Nagarjuna',isSelected:false},{title:'Himalaya',isSelected:false}])

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
      
        <CText
          numberOfLines={1}
          style={localStyles.headerText}
          type={'s16'}>
          {categoryName}
          
        </CText>
      </View>
      
    </View>

      <SearchWithLikeComponent/>

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
            source={images.productByCategoryBanner}
            style={localStyles.bannerImageStyle}
            resizeMode="cover"
          />
      </TouchableOpacity>



  



    

      <ProductItemsByCategory multipleAddButton={multipleAddButton} setMultipleAddButton={setMultipleAddButton} data={productItemCategoryData} bestSeller={true} />

  
      </KeyBoardAvoidWrapper>



 <View style={{flexDirection:'row',alignItems:'center',backgroundColor:'#FBEADE',height:responsiveHeight(9),justifyContent:'space-between',paddingHorizontal:responsiveWidth(3.5),borderTopLeftRadius:responsiveWidth(4),borderTopRightRadius:responsiveWidth(4)}}  >

  <Text style={{color:colors.black,   ...typography.fontSizes.f14,...typography.fontWeights.Bold,}}>3 Items | {'\u20B9'}526</Text>

  <TouchableOpacity onPress={()=>{navigation.navigate(StackNav.MedicineAddress)}}  >
    <View style={{backgroundColor:'#FD872E',paddingHorizontal:responsiveWidth(2.8),paddingVertical:responsiveHeight(1),flexDirection:'row',alignItems:'center',gap:responsiveWidth(1.5),borderRadius:responsiveWidth(3)}} >
      <CartIconWhite/>
      <Text style={{color:colors.white,   ...typography.fontSizes.f12,...typography.fontWeights.Bold,}} >Go to Cart</Text>
    </View>
  </TouchableOpacity>
  



 </View>


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

})