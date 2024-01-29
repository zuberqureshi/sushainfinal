 import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import { StyleSheet } from 'react-native';
 import Spinner from 'react-native-loading-spinner-overlay';

export default function Loader() {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();
  if (!isFetching && !isMutating) return null;

  return (
    <>
    
      <Spinner
          visible={true}
          textContent={'Loading Please Wait ...'}
          textStyle={styles.spinnerTextStyle}
        />

       {/* { !net.isConnected?(<CheckInternet/>):  ()} */}
    </>
        
  );
}




const styles = StyleSheet.create({
    spinnerTextStyle: {
      color: '#FFF'
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF'
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5
    }
  });