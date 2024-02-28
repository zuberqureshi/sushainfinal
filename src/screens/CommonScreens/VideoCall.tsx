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
  PermissionsAndroid,BackHandler, Alert
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
import { colors } from '../../themes';
import { CallEndIcon, MuteIcon, NoVideoIcon, OppsIcon } from '../../assets/svgs';
import PrimaryButton from '../../components/common/Button/PrimaryButton';
import { useNavigation } from '@react-navigation/native';
import CHeader from '../../components/common/CHeader';
import { androidCameraAudioPermission } from '../../utils/permission';
import { StackNav } from '../../navigation/NavigationKeys';
import { useBackHandler } from '@react-native-community/hooks';


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


function ControlsContainer({ join, leave, toggleWebcam, toggleMic,end }) {
  const navigation = useNavigation()
  return (
    <View
      style={{
        paddingHorizontal: responsiveWidth(5),
        paddingVertical:responsiveHeight(2.5),
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
    
      
      <TouchableOpacity onPress={()=>{ toggleWebcam()}}  activeOpacity={0.6} >
      <Box backgroundColor={colors.primary} px={30} py={8} borderRadius={8} >
        <NoVideoIcon width={24} height={24} />
      </Box>

      </TouchableOpacity>

        
      <TouchableOpacity onPress={()=>{ toggleMic()}}  activeOpacity={0.6} >
      <Box backgroundColor={colors.primary} px={30} py={8} borderRadius={8} >
        <MuteIcon width={24} height={24} />
      </Box>

      </TouchableOpacity>

        
      <TouchableOpacity onPress={async()=>{
        
        await end()
        navigation.navigate(StackNav.VideoCompleted)
        }}  activeOpacity={0.6} >
      <Box backgroundColor='#FF0000' px={20} py={8} borderRadius={8} >
        <CallEndIcon width={24} height={24} />
      </Box>

      </TouchableOpacity>
  
    </View>
  );
}
function ParticipantView({ participantId }) {
  console.log('participantId', participantId)
  const { webcamStream, webcamOn } = useParticipant(participantId);
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
    </Box>
 



  ) : (
 
      <Box h={250} w={'95%'} alignSelf='center' my={8} borderRadius={10} overflow='hidden' backgroundColor='grey' justifyContent='center' alignItems='center' >
      
      <Text fontFamily='$InterSemiBold' color={colors.black} fontSize={16} >NO MEDIA</Text>
      </Box>

    
  );
}

function ParticipantList({ participants }) {



  return participants.length > 0 ? (
    <FlatList
      data={participants}
      renderItem={({ item }) => {
        return <ParticipantView participantId={item} />;
      }}
    />
  ) : (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{ fontSize: 20 }}>Press Join button to enter meeting.</Text>
    </View>
  );
}

function MeetingView() {
  // Get `participants` from useMeeting Hook
  const navigation = useNavigation()
  const { join, leave, toggleWebcam, toggleMic, participants, meetingId,end } = useMeeting({});
  const participantsArrId = [...participants.keys()];

  const backAction = () => {

    
    Alert.alert('Hold on!', 'Are you sure you want to end a call', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {text: 'YES', onPress: async() => {
            await end()
            navigation.navigate(StackNav.VideoCompleted)

          }},
        ]);
    return true;
  };

  useBackHandler(backAction)

  useEffect(

    () => {

      join()

    }, []

  )
  return (
    <Box flex={1} backgroundColor={colors.white}  >
      {meetingId ? (
        <Box flexDirection='row' alignItems='center' ml={10} gap={5}>
           <Image source={require('../../assets/images/sushainLogo.png')} style={{width:responsiveWidth(15),height:responsiveHeight(8),resizeMode:'contain' }} />
           
           <Text  fontFamily='$InterSemiBold' color={colors.black} fontSize={14}  >Meeting Id :{meetingId}</Text>
        </Box>
        
      ) : null}
      <ParticipantList participants={participantsArrId} />
      <ControlsContainer
        join={join}
        leave={leave}
        end={end}
        toggleWebcam={toggleWebcam}
        toggleMic={toggleMic}
      />
    </Box>
  );
}


const VideoCall = ({navigation}) => {
  const [userInfo, setUserInfo] = useState();
  const [meetingId, setMeetingId] = useState('gotq-lk7v-736w');

  // const { end } = useMeeting({});

  async function load() {
    setUserInfo(JSON.parse(await getAccessToken('userInfo')));
    await androidCameraAudioPermission()
  }

  const backAction = () => {
    console.log('ddddddddddddddddddd');
    
    Alert.alert('Hold on!', 'Are you sure you want to exit', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {text: 'YES', onPress: async() => {
            // await end()
            navigation.navigate(StackNav.VideoCompleted)

          }},
        ]);
    return true;
  };

  // useBackHandler(backAction)


  useEffect(() => {
    load();
 
  }, []);
  console.log('TEST....', userInfo);

  return meetingId ? (
    <Container statusBarStyle='dark-content' >
      <CHeader title='Meeting Room' />
      <MeetingProvider
        config={{
          meetingId,
          micEnabled: true,
          webcamEnabled: true,
          name: 'Zuber User',
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

const styles = StyleSheet.create({})