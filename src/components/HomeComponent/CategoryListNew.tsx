import { FlatList, StyleSheet, TouchableOpacity, } from 'react-native'
import React from 'react'
import { Box, Image, Text, Toast, ToastTitle, VStack, useToast } from '@gluestack-ui/themed'
import images from '../../assets/images'
import { colors } from '../../themes'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { StackNav, TabNav } from '../../navigation/NavigationKeys'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { responsiveWidth } from 'react-native-responsive-dimensions'

const CategoryListNew = ({ mediType }) => {

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
     const toast = useToast()
    const CatData = [
        {
            id: 1,
            name: 'Consult Online',
            imgAr: images.consultationAr,
            imgHo: images.consultationHo,
        },
        {
            id: 2,
            name: 'Buy Medicines',
            imgAr: images.medicineAr,
            imgHo: images.medicineHo,
        },
        {
            id: 3,
            name: 'Personal Care',
            imgAr: images.trustedBrand,
            imgHo: images.trustedBrand,
        },
        {
            id: 4,
            name: 'Intant Consultation',
            imgAr: images.expertTherapists,
            imgHo: images.expertTherapists,
        },
        {
            id: 5,
            name: 'Yoga',
            imgAr: images.yoga,
            imgHo: images.yoga,
        },
        {
            id: 6,
            name: 'Panchakarma',
            imgAr: images.expertTherapists,
            imgHo: images.expertTherapists,
        },
    ]

    const onClick = (index) => {
        if (index === 0) {
         navigation.navigate(TabNav?.FindADoctorHome)
        } else if (index === 1) {
            navigation.navigate(TabNav.Medicines,{ screen: StackNav.MedicineHome , params : {personalCareType:'NO'} })
        } else if (index === 2) {
            navigation.navigate(TabNav.Medicines,{ screen: StackNav.MedicineHome , params : {personalCareType:'YES'} })
        }  else if (index === 3) {
            navigation.navigate(StackNav.InstantConsultation)
        }else{
            toast.show({
                placement: "bottom",
                render: ({ id }) => {
                  const toastId = "toast-" + id
                  return (
                    <Toast nativeID={toastId} action='attention' variant='accent'>
                      <VStack space="xs">
                        <ToastTitle>Coming Soon</ToastTitle>
                   
                      </VStack>
                    </Toast>
                  )
                }
            }
            )
        }  
         
        
     }

    return (
        <Box h={80} px={20} mt={10} >

            <FlatList
                data={CatData}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity key={item.id.toString()} style={{ justifyContent: 'center', alignItems: 'center' }} activeOpacity={0.6} onPress={()=>{onClick(index)}} >
                            <Image alt='icon' source={mediType === 'ayurvedic' ? item?.imgAr : item?.imgHo} resizeMode='contain' h={63} w={70} />
                            <Text fontFamily='$InterRegular' color={colors.black} fontSize={10} lineHeight={12} numberOfLines={1} textAlign='center' w={75} >{item?.name}</Text>
                        </TouchableOpacity>
                    )
                }}
                keyExtractor={item => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: responsiveWidth(2), }}
            />
  
  

        </Box>
    )
}

export default CategoryListNew

const localStyles = StyleSheet.create({})