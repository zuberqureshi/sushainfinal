import { StyleSheet, Text, View,Image,TouchableOpacity,FlatList } from 'react-native'
import React from 'react'
import { colors ,styles} from '../../themes'
import typography from '../../themes/typography'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { HeartLightBlue } from '../../assets/svgs'
import images from '../../assets/images'
import { moderateScale } from '../../common/constants'


const SimilarProduct = ({title,data,bestSeller}: {title: string,data:any,bestSeller:boolean}) => {

    const RenderDSpecialities = ({item}: any) => {
        // console.log({item});
        
      return (
        <View style={localStyles.bestSellingWrapper} >

            <View style={localStyles.imgContainer} >
            
            <View style={{borderBottomWidth:1,borderBottomColor:'#D9D9D9',paddingBottom:responsiveHeight(0.8)}} >
              <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginHorizontal:responsiveWidth(1.5),marginTop:responsiveHeight(1),alignSelf:bestSeller?'none':'flex-end'}} >
              <Image source={item?.image} style={localStyles.itemImg}  />
              <HeartLightBlue style={{alignSelf:'flex-start',marginTop:responsiveHeight(-1)}} width={responsiveWidth(6)} height={responsiveHeight(4)} />


              </View>

               
                

              <View style={{flexDirection:'row',alignItems:'center',marginLeft:responsiveWidth(2.4)}} >
                    <Text style={localStyles.ratingText}  >4.5</Text>
                    <Image source={images.starBlack} style={localStyles.starBlack} />
                    <Text style={localStyles.ratingText}  >/5</Text>
                </View>


                </View>
                <Text style={localStyles.itemTitle}  >{item?.title}</Text>

         

                <Text style={localStyles.priceText}>{'\u20B9'} {item?.price}</Text>

                <TouchableOpacity style={localStyles.addButtomWrapper} >
                    <Text style={localStyles.addButtomText} >ADD</Text>
                </TouchableOpacity>

  
              
            </View>

            

            
        </View>
       
      );
    };


   
        const renderItem = ({item}: any) => {
            // console.log({item});
            
          return <RenderDSpecialities item={item} />;
        };


  return (
    <View>
   
      
      <FlatList
           data={data}
           renderItem={renderItem}
           horizontal
           keyExtractor={(item, index) => index.toString()}
           contentContainerStyle={styles.ph10}
           showsHorizontalScrollIndicator={false}
      />

    </View>
  )
}

export default SimilarProduct

const localStyles = StyleSheet.create({
  
    bestSellingWrapper:{
      width:responsiveWidth(40),
      // height:moderateScale(160)
      marginBottom:responsiveHeight(2)
    },
    itemImg:{
        resizeMode:'contain',
        width:responsiveWidth(22),
        height:responsiveHeight(13),
        alignSelf:'center',
       

      
    },
    imgContainer:{
      borderWidth:1,
      borderColor:'#D9D9D9',
      width:responsiveWidth(35),
      height:moderateScale(208),
      borderRadius:responsiveWidth(3),

    },
    starBlack:{
      resizeMode:'contain',
      width:responsiveWidth(3),
      height:responsiveHeight(1.5),
    },
    ratingText:{
      color:colors.black,
      ...typography.fontWeights.Regular,
      ...typography.fontSizes.f10,
      marginTop:responsiveHeight(0.5)

    },
    itemTitle:{
        color:colors.black,
      ...typography.fontWeights.Medium,
      ...typography.fontSizes.f10,
      paddingHorizontal:responsiveWidth(1.5)
       
    },
    bottomWrapper:{
      
    
      marginTop:responsiveHeight(0.5)
    },
    priceText:{
      color:colors.black,
      ...typography.fontWeights.Bold,
      ...typography.fontSizes.f10,
      paddingHorizontal:responsiveWidth(1.5)
    },
    addButtomWrapper:{

      borderWidth:1,
      borderColor:colors.success,
      width:'40%',
      // height:moderateScale(),
      borderRadius:responsiveWidth(1.8),
      backgroundColor:colors.lightSuccess,
      marginRight:responsiveWidth(4),
    //   paddingHorizontal:responsiveWidth(4),
      paddingVertical:responsiveHeight(0.5),
      marginHorizontal:responsiveWidth(1.5),
      marginTop:responsiveHeight(0.5)

    },
    addButtomText:{
      color:colors.success,
      ...typography.fontWeights.SemiBold,
      ...typography.fontSizes.f8,
      alignSelf:'center'
     

    },
    bestsellerText:{
      color:colors.black,
      ...typography.fontWeights.Regular,
      // ...typography.fontSizes.f12,
      fontSize:responsiveFontSize(1.2)
    }






})