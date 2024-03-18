import { StyleSheet, TouchableOpacity,  } from 'react-native'
import React from 'react'
import { Box, Image, Text } from '@gluestack-ui/themed'
import images from '../../assets/images'
import { colors } from '../../themes'
import { useNavigation } from '@react-navigation/native'
import { StackNav, TabNav } from '../../navigation/NavigationKeys'

const CategoryListNew = ({mediType}) => {

    const navigation = useNavigation()

  return (
  <Box flexDirection='row' alignItems='center' gap={14}   px={20} mt={10} >
    <TouchableOpacity activeOpacity={0.6} onPress={()=>{ navigation.navigate(TabNav?.FindADoctorHome)}} >
        <Image alt='icon' source={ mediType === 'ayurvedic' ?images.consultationAr : images.consultationHo} resizeMode='contain' h={63} w={70} />
        <Text fontFamily='$InterRegular' color={colors.black} fontSize={10} lineHeight={12} numberOfLines={1} textAlign='center' >Consult Online</Text>
    </TouchableOpacity>
    <TouchableOpacity activeOpacity={0.6} onPress={()=>{ navigation.navigate(TabNav.Medicines,{ screen: StackNav.MedicineHome , params : {personalCareType:'NO'} })}} >
        <Image alt='icon' source={ mediType === 'ayurvedic' ?images.medicineAr : images.medicineHo} resizeMode='contain' h={63} w={70} />
        <Text fontFamily='$InterRegular' color={colors.black} fontSize={10} lineHeight={12} numberOfLines={1} textAlign='center' >Buy Medicines</Text>
    </TouchableOpacity>
    <TouchableOpacity activeOpacity={0.6} onPress={()=>{ navigation.navigate(TabNav.Medicines,{ screen: StackNav.MedicineHome , params : {personalCareType:'YES'} })}} >
        <Image alt='icon' source={images.trustedBrand} resizeMode='contain' h={63} w={70} />
        <Text fontFamily='$InterRegular' color={colors.black} fontSize={10} lineHeight={12} numberOfLines={1} textAlign='center' >Personal Care</Text>
    </TouchableOpacity>
    <TouchableOpacity activeOpacity={0.6} >
        <Image alt='icon' source={images.expertTherapists} resizeMode='contain' h={63} w={70} />
        <Text fontFamily='$InterRegular' color={colors.black} fontSize={10} lineHeight={12} numberOfLines={1} textAlign='center' >Yoga</Text>
    </TouchableOpacity>

  </Box>
  )
}

export default CategoryListNew

const localStyles = StyleSheet.create({})