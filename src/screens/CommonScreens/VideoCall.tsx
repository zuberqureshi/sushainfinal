import React, { useEffect, useState } from 'react'
import { getAccessToken } from '../../utils/network';

import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,

  TextInput,
  View,
  FlatList,
  Modal,
  Image,
  PermissionsAndroid, Alert, BackHandler
} from 'react-native';
import {
  MeetingProvider,
  useMeeting,
  useParticipant,
  MediaStream,
  RTCView,
} from '@videosdk.live/react-native-sdk';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { Box } from '@gluestack-ui/themed';
import { Container } from '../../components/Container';
import { Text } from '@gluestack-ui/themed';
import { colors, styles } from '../../themes';
import { CallEndIcon, MicOnIcon, MuteIcon, MuteRedIcon, NoVideoIcon, NoVideoRedIcon, OppsIcon, VideoOnIcon } from '../../assets/svgs';
import PrimaryButton from '../../components/common/Button/PrimaryButton';
import { useNavigation } from '@react-navigation/native';
import CHeader from '../../components/common/CHeader';
import { androidCameraAudioPermission } from '../../utils/permission';
import { StackNav } from '../../navigation/NavigationKeys';
import { useBackHandler } from '@react-native-community/hooks';
import { moderateScale } from '../../common/constants';
import images from '../../assets/images';
import CText from '../../components/common/CText';



const NotFoundScreen = () => {
  const [meetingVal, setMeetingVal] = useState('');
  const [modalVisible, setModalVisible] = useState(true)

  const navigation = useNavigation()


  return (
    <Container statusBarStyle='dark-content' >
      <CHeader title='Meeting Room' />
      <Box flex={1} justifyContent='center' alignItems='center' >
        <Text fontFamily='$InterSemiBold' color={colors.black} alignSelf='center' fontSize={16} >MeetID Not Found</Text>
      </Box>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      // onRequestClose={() => setModalVisible(false)}
      >
        <Box flex={1} justifyContent='center' alignItems='center' backgroundColor='rgba(0, 0, 0, 0.5)' >
          <Box backgroundColor='#fff' borderRadius={10} alignItems='center' justifyContent='center' elevation={5} w={'80%'} h={'25%'} >
            <Box alignItems='center' gap={5} >
              <OppsIcon />
              <Text fontFamily='$InterSemiBold' color={colors.black} textAlign='center' fontSize={18} mt={3} >Oops!</Text>
              <Text fontFamily='$InterRegular' color={'#767474'} textAlign='center' fontSize={13} >MeetID Not Found</Text>

              <PrimaryButton onPress={() => { navigation.goBack() }} buttonText='Try again' height={35} />
            </Box>

            {/* <Button title="Close" onPress={() => setModalVisible(false)} /> */}
          </Box>
        </Box>
      </Modal>

    </Container>
  );
}


function ControlsContainer({ join, leave, toggleWebcam, toggleMic, end ,localMic , localWebcam }) {
  const navigation = useNavigation()
  return (
    <View
      style={{
        paddingHorizontal: responsiveWidth(5),
        paddingVertical: responsiveHeight(2.5),
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>


      <TouchableOpacity onPress={() => { toggleWebcam() }} activeOpacity={0.6} >
        <Box backgroundColor={colors.primary} px={30} py={8} borderRadius={8} >
         {localWebcam ? <VideoOnIcon width={24} height={24} /> : <NoVideoIcon width={24} height={24} />}
        </Box>

      </TouchableOpacity>


      <TouchableOpacity onPress={() => { toggleMic() }} activeOpacity={0.6} >
        <Box backgroundColor={colors.primary} px={30} py={8} borderRadius={8} >
        { localMic ? <MicOnIcon color='red' width={24} height={24} />  :  <MuteIcon width={24} height={24} />}
        </Box>

      </TouchableOpacity>


      <TouchableOpacity onPress={async () => {

        await end()
        navigation.navigate(StackNav.VideoCompleted)
      }} activeOpacity={0.6} >
        <Box backgroundColor='#FF0000' px={20} py={8} borderRadius={8} >
          <CallEndIcon width={24} height={24} />
        </Box>

      </TouchableOpacity>

    </View>
  );
}
function ParticipantView({ participantId }) {
  
  const { webcamStream, webcamOn , enableWebcam ,micOn  } = useParticipant(participantId);
  // console.log('participantId', participantId,webcamOn)

  // console.log(enableWebcam(),'Enable wencam');
  

  return webcamOn && webcamStream ? (

    <Box h={250} w={'95%'} alignSelf='center' my={8} borderRadius={10} overflow='hidden' >
      <RTCView
        streamURL={new MediaStream([webcamStream.track]).toURL()}
        objectFit={'cover'}
        style={{
          height: '100%',
          width: '100%',
          // marginVertical: 8,
          // marginHorizontal: 8,

        }}
      />
      <Box position='absolute' ml={8} mt={5} alignItems='center' flexDirection='row'  >
       { !micOn && <MuteRedIcon width={20} height={20}  />}
       { !webcamOn && <NoVideoRedIcon width={20} height={20}/>}
      </Box>

    </Box>




  ) : (

    <Box h={250} w={'95%'} alignSelf='center' my={8} borderRadius={10} overflow='hidden' backgroundColor='grey' justifyContent='center' alignItems='center' >
       <Box position='absolute' alignSelf='flex-start' ml={8} mt={5} top={0} >
       { !webcamOn && <NoVideoRedIcon width={20} height={20}/>}    
       </Box>
     
      <Text fontFamily='$InterSemiBold' color={colors.black} fontSize={16} >NO MEDIA</Text>
    </Box>


  );
}

function ParticipantList({ participants }) {
 const navigation = useNavigation()

//  useEffect(()=>{
//   const unsubscribe = navigation.addListener('beforeRemove' , e => {
//     // e.preventDefault();
//     // Alert.alert('Back Alert')
//     // backAction()
//     return true
//   });

//   return unsubscribe

// },[navigation])

  return participants.length > 0 ? (
    <Box flex={1} >
     <FlatList
      data={participants}
      renderItem={({ item }) => {
        return <ParticipantView participantId={item} />;
      }}
    />
    {participants.length === 1 && <Text fontFamily='$InterSemiBold' fontSize={16} color={colors.black} alignSelf='center' mb={100} >Please wait another participant </Text>}
    </Box>
  ) : (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View style={localStyles.headerSection}>
          <Image source={images.booking} style={localStyles.videoIcon} />
          <CText
            type="b14"
            numberOfLines={2}
            color={colors.black}
            align="center"
            style={{ marginVertical: 10 }}>
           All participant leave
          </CText>
        </View>

        <PrimaryButton onPress={()=>{navigation.navigate(StackNav.DrawerNavigation)}} buttonText='Done' marginHorizontal={responsiveWidth(2.5)} marginTop={responsiveHeight(2.5)} width={responsiveWidth(50)} />
    </View>
  );
}

function MeetingView() {
  // Get `participants` from useMeeting Hook
  const navigation = useNavigation()
  const { join, leave, toggleWebcam, toggleMic, participants, meetingId, end , localMicOn,localWebcamOn } = useMeeting({});
  const participantsArrId = [...participants.keys()];

  const backAction = () => {
    // console.log('ddddddddddddddddddd');

    Alert.alert('Hold on!', 'Are you sure you want to exit', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {
        text: 'YES', onPress: async () => {
          // await end()
          navigation.navigate(StackNav.VideoCompleted)

        }
      },
    ]);
    return true;
  };

  // useEffect(() => {
  //   BackHandler.addEventListener("hardwareBackPress", backAction);

  //   return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
  // }, [backAction]);
    

  // useBackHandler(backAction)
  // console.log('Check MIn ON',localMicOn,'CAMR',localWebcamOn);
  

  useEffect(() => {
    
      join()

    }, [])

  return (
    <Box flex={1} backgroundColor={colors.white} >
      {meetingId ? (
        <Box flexDirection='row' alignItems='center' ml={10} gap={5}>
          <Image source={require('../../assets/images/sushainLogo.png')} style={{ width: responsiveWidth(15), height: responsiveHeight(8), resizeMode: 'contain' }} />

          <Text fontFamily='$InterSemiBold' color={colors.black} fontSize={14}  >Meeting Id :{meetingId}</Text>
        </Box>

      ) : null}
      <ParticipantList participants={participantsArrId} />
  { participantsArrId.length > 0 && <ControlsContainer
        join={join}
        leave={leave}
        end={end}
        toggleWebcam={toggleWebcam}
        toggleMic={toggleMic}
        localMic={localMicOn}
        localWebcam={localWebcamOn}
      />}
    </Box>
  );
}


const VideoCall = ({ navigation }) => {

  const [meetingId, setMeetingId] = useState('gotq-lk7v-736w');
 

  // const { enableWebcam } = useMeeting({});

  async function load() {
    // setUserInfo(JSON.parse(await getAccessToken('userInfo')));
    //  await enableWebcam()
    // // try {
    //   const permissionStatus = await androidCameraAudioPermission()
    // //   setPermissionGet(permissionStatus)
    // //   console.log(permissionStatus, 'tryy videocall');

    // // } catch (err) {
    // //   console.log(err);

    // // }

  }


  // const backAction = () => {
  //   // console.log('ddddddddddddddddddd');

  //   Alert.alert('Hold on!', 'Are you sure you want to exit', [
  //     {
  //       text: 'Cancel',
  //       onPress: () => null,
  //       style: 'cancel',
  //     },
  //     {
  //       text: 'YES', onPress: async () => {
  //         // await end()
  //         navigation.navigate(StackNav.VideoCompleted)

  //       }
  //     },
  //   ]);
  //   return true;
  // };

  // useBackHandler(backAction)


  // useEffect(() => {
  //   load();

  // }, []);
  // console.log('TEST....', userInfo);



  return meetingId ? (
    <Container statusBarStyle='dark-content' >
      <CHeader title='Meeting Room' />
      <MeetingProvider
        config={{
          meetingId,
          micEnabled: true,
          webcamEnabled: true,
          name: 'Zuber User',
          notification: {
            title: "Appointment Joined",
            message: "Meeting is running.",
          },
        }}
        token={`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiIyYzgyMGVkZi1jOTg3LTQ2MDItYjJhNy01Y2VhZDI4ZTQ0YjciLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcwODM0NTgzOCwiZXhwIjoxODY2MTMzODM4fQ.0PJziz8wk472-GHp-ZCrjoxAHxWH-jw2V6nP39m1rFo`}>
        <MeetingView />
      </MeetingProvider>
    </Container>
  ) : (
    <NotFoundScreen />
  );


}

export default VideoCall

const localStyles = StyleSheet.create({
  videoIcon: {
    width: moderateScale(300),
    height: responsiveHeight(28),
    ...styles.mv10,
    // marginTop: responsiveHeight(5)
  },
  headerSection: {
    ...styles.justifyCenter,
    ...styles.itemsCenter,
    ...styles.center
  },
})