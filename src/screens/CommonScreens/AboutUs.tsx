import { Linking, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Container } from '../../components/Container'
import Body from '../../components/Body/Body'
import { Box, Image } from '@gluestack-ui/themed'
import { Text } from '@gluestack-ui/themed'
import { colors, styles } from '../../themes'
import images from '../../assets/images'
import { FlashList } from '@shopify/flash-list'
import { API_IMAGE_BASE_URL, getHeight, moderateScale } from '../../common/constants'
import useGetHomeBannerData from '../../hooks/home/get-home-banner'
import { responsiveWidth } from 'react-native-responsive-dimensions'
import ManagementTeam from '../../components/AboutUs/ManagementTeam'
import AwardSlider from '../../components/AboutUs/AwardSlider'
import CHeader from '../../components/common/CHeader'

const AboutUs = () => {

    const { data: homeBannerData, isLoading: homeBannerIsLoading } = useGetHomeBannerData()

    const managementTeamData = [
        {
            id: 1,
            name: 'Dr. Rajesh Singh',
            subHead: 'Co-Founder & Medical Director',
            dis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus hendrerit tempus nisl eget egestas. Phasellus ac dictum dolor, id sollicitudin leo. Aliquam accumsan quis nulla id blandit. Duis porttitor posuere elit, at viverra nisl sodales eu. Cras quis quam mi. Quisque ut lacus vel justo malesuada pellentesque.',
            img : require('../../assets/images/drImg.png')      
        },
        {
            id: 2,
            name: 'Vikram Singh Parmar ',
            subHead: 'Founder',
            dis: ` Vikram has over 20 years of experience in nurturing and building businesses across geographies. Vikram is an engineer by training and has a Masters degree from the prestigious BITS Pilani. He began his career with GE's Leadership Program... Vikram quickly rose through the ranks of reputable organisations such as Landmark Group, LAVA International Limited, Idea and Airtel, thanks to his keen sense of business and ownership.
                   He was recognized for his vision and leadership abilities when he cofounded LAVA Technologies in Egypt and expanded operations to more than ten African countries. He went on to work as the Head of Strategy for the prestigious Landmark Group before starting his journey as an Entrepreneur .
                   Vikram is well-known for establishing businesses, developing talent, and developing long-term processes.`,
            img : require('../../assets/images/drImg2.png')       
        },
        {
            id: 3,
            name: 'Alok Gupta',
            subHead: 'Co-Founder & CSO ',
            dis: `Alok is an Engineer by education having significantly rich experience in deploying CRM systems and developing/deploying customer facing processes. He is a Six Sigma champion and has worked for organizations like Modi Xerox, Delta telecom & GTL. `,
            img : require('../../assets/images/drImg3.jpeg')        
        },
        {
            id: 4,
            name: 'Archit Agrawal ',
            subHead: 'Co-Founder & Chief Technology Officer',
            dis: `A Computer Programmer , Co-Founder & CTO For Sushain. IT Engineer and MBA from Narsee Monjee Mumbai.” Carries, 10+ Years of Experience in Product Development, Product Marketing & Customer Acquisition. `,
            img : require('../../assets/images/drImg4.jpeg')        
        },
    ]

    const onPress = (item: any) => {
        Linking.openURL(item);
    };

    const RenderItem = ({ item, index }: any) => {
        return (
            <TouchableOpacity
                onPress={() => onPress(item?.url)}
                style={localStyles.featuredImageContainer}>
                <Image alt='icon'
                    source={{ uri: `${API_IMAGE_BASE_URL}${item?.img}` }}
                    style={localStyles.featuredImageStyle}
                />

            </TouchableOpacity>
        )
    };

    return (
        <Container statusBarStyle='dark-content' >
            <CHeader title='About Us' />
            <Body>
                <Image alt='icon' source={images.aboutFirst} resizeMode='cover' w={'100%'} h={112} />
                <Box gap={10} py={15} alignItems='center' >
                    <Text fontFamily='$InterSemiBold' color={colors.primary} fontSize={18} lineHeight={22} >Our Vision</Text>
                    <Text fontFamily='$InterMedium' color={'#65952F'} fontSize={15} lineHeight={18}  >“ Celebrating Wholeness ”</Text>
                    <Text fontFamily='$InikaRegular' color={colors.black} fontSize={13} lineHeight={16} textAlign='center' w={300} >A world where Ayurveda, Yoga, Homeopathy, and Unani seamlessly integrate into modern lifestyles for holistic well-being</Text>
                </Box>

                <Box gap={25} py={15} alignItems='center' >
                    <Text fontFamily='$InterSemiBold' color={colors.primary} fontSize={18} lineHeight={22} >About Sushain</Text>
                    <Box flexDirection='row' gap={40} alignItems='center' >
                        <Image alt='icon' source={images.about1} w={98} h={77} />
                        <Image alt='icon' source={images.about2} w={98} h={77} />
                    </Box>
                    <Box flexDirection='row' gap={40} alignItems='center' >
                        <Image alt='icon' source={images.about3} w={98} h={77} />
                        <Image alt='icon' source={images.about4} w={98} h={77} />
                    </Box>

                    <Text fontFamily='$InikaRegular' color={colors.black} fontSize={13} lineHeight={16} textAlign='center' w={300} >Committed to serve in the wellness domain to provide a 360 degree wellbeing</Text>
                    <Box flexDirection='row' alignItems='center' gap={25} >
                        <Box alignItems='center' >
                            <Image alt='icon' source={images.about21} w={65} h={65} />
                            <Text fontFamily='$InterRegular' color={colors.black} fontSize={11} lineHeight={13} >Ayurveda</Text>
                        </Box>
                        <Box alignItems='center' >
                            <Image alt='icon' source={images.about22} w={65} h={65} />
                            <Text fontFamily='$InterRegular' color={colors.black} fontSize={11} lineHeight={13} >Homeopathy</Text>
                        </Box>
                        <Box alignItems='center' >
                            <Image alt='icon' source={images.about23} w={65} h={65} />
                            <Text fontFamily='$InterRegular' color={colors.black} fontSize={11} lineHeight={13} >Unani</Text>
                        </Box>
                        <Box alignItems='center' >
                            <Image alt='icon' source={images.about24} w={65} h={65} />
                            <Text fontFamily='$InterRegular' color={colors.black} fontSize={11} lineHeight={13} >Yoga</Text>
                        </Box>


                    </Box>
                </Box>

                <Box gap={10} py={15}>
                    <Text fontFamily='$InterSemiBold' color={colors.primary} fontSize={18} lineHeight={22} alignSelf='center'  >Join Us</Text>
                    <Image alt='icon' source={images.joinus1} w={'100%'} h={90} />
                    <Image alt='icon' source={images.joinus2} w={'100%'} h={90} />


                </Box>


                <Text fontFamily='$InterSemiBold' color={colors.primary} fontSize={18} lineHeight={22} alignSelf='center' pb={15} >Media Coverage</Text>
                {!!homeBannerData?.data?.result[0]?.mediaList?.length && (
                    <View style={localStyles.flatlishContainer}>
                        <FlashList
                            data={homeBannerData?.data?.result[0]?.mediaList}
                            renderItem={RenderItem}
                            keyExtractor={(item, index) => index.toString()}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            estimatedItemSize={10}
                            contentContainerStyle={styles.ph20}
                        />
                    </View>
                )}

                <Text fontFamily='$InterSemiBold' color={colors.primary} fontSize={18} lineHeight={22} alignSelf='center' pb={15} >Sustainability</Text>

                <Box alignSelf='center' w={360} mx={30} py={10} backgroundColor='#FFFEFE' borderRadius={10} style={[styles.shadowStyle,]}  >
                    <Image alt='icon' source={images?.Sustainability} w={'100%'} h={190} resizeMode='contain' mb={10} borderRadius={10} />
                    <Box gap={10} px={15} >
                        <Text fontFamily='$InterMedium' color={colors.black} fontSize={12} lineHeight={15}  >Paperless Documentation:</Text>
                        <Text fontFamily='$InterMedium' color={colors.black} fontSize={10} lineHeight={12}  >Ayurvedic online platforms can embrace digital documentation, reducing the reliance on paper and contributing to a more eco-friendly approach.</Text>
                    </Box>
                    <Box borderBottomWidth={1} mx={15} borderColor='#E2DEDE' py={5} ></Box>
                    <Box gap={10} px={15} mt={5} >
                        <Text fontFamily='$InterMedium' color={colors.black} fontSize={12} lineHeight={15}  >Herbal and Natural Remedies:</Text>
                        <Text fontFamily='$InterMedium' color={colors.black} fontSize={10} lineHeight={12}  >Ayurveda emphasizes the use of natural and herbal remedies, which are often sourced sustainably. This approach contrasts with some conventional treatments that might rely on synthetic and environmentally impactful substances.</Text>
                    </Box>
                    <Box borderBottomWidth={1} mx={15} borderColor='#E2DEDE' py={5} ></Box>
                    <Box gap={10} px={15} mt={5} >
                        <Text fontFamily='$InterMedium' color={colors.black} fontSize={12} lineHeight={15}  >Global Accessibility:</Text>
                        <Text fontFamily='$InterMedium' color={colors.black} fontSize={10} lineHeight={12}  >Online consultations make Ayurvedic expertise accessible globally, reducing the need for individuals to travel long distances for specialized care. This not only enhances healthcare access but also reduces the environmental impact associated with travel.</Text>
                    </Box>
                    <Box borderBottomWidth={1} mx={15} borderColor='#E2DEDE' py={5} ></Box>
                    <Box gap={10} px={15} mt={5} >
                        <Text fontFamily='$InterMedium' color={colors.black} fontSize={12} lineHeight={15}  >Energy Efficiency:</Text>
                        <Text fontFamily='$InterMedium' color={colors.black} fontSize={10} lineHeight={12}  >Online consultations typically require less energy compared to physical clinics. Patients and practitioners can connect from the comfort of their homes, reducing the need for energy-intensive infrastructure.</Text>
                    </Box>
                </Box>

                <Text fontFamily='$InterSemiBold' color={colors.primary} fontSize={18} lineHeight={22} alignSelf='center' py={20} >SUSHAIN R&D - Redefining Health</Text>

                <Image alt='icon' source={images?.RD} w={'100%'} h={135} resizeMode='contain' />

                <Text fontFamily='$InterSemiBold' color={colors.primary} fontSize={18} lineHeight={22} alignSelf='center' py={20} >Management Team</Text>

                <ManagementTeam bannerData={managementTeamData} />

                <Text fontFamily='$InterSemiBold' color={colors.primary} fontSize={18} lineHeight={22} alignSelf='center' py={20} >Awards & Recognition</Text>

                <AwardSlider bannerData={['1', '2', '3']} />







            </Body>
        </Container>
    )
}

export default AboutUs

const localStyles = StyleSheet.create({
    flatlishContainer: {
        ...styles.pv15,
        ...styles.mb20,
        backgroundColor: '#27A3B6',
    },
    featuredImageStyle: {
        width: moderateScale(80),
        height: getHeight(40),
        resizeMode: 'contain',
    },
    featuredImageContainer: {
        width: moderateScale(91),
        height: getHeight(45),
        backgroundColor: colors.white3,
        borderRadius: moderateScale(5),
        ...styles.center,
        ...styles.mr10,
    },
})