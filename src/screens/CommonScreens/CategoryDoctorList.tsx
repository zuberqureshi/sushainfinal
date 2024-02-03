import {Image,ScrollView, StyleSheet,TouchableOpacity,View,} from 'react-native';
import React from 'react';

// local imports
const CSafeAreaView = React.lazy(() => import('../../components/common/CSafeAreaView'))
// const CHeader = React.lazy(() => import('../../components/common/CHeader'))
// const CText = React.lazy(() => import('../../components/common/CText'))
// const CButton = React.lazy(() => import('../../components/common/CButton'))
// const DoctorDetailCard = React.lazy(() => import('./DoctorDetailCard'))


// import CSafeAreaView from '../../components/common/CSafeAreaView';
import CHeader from '../../components/common/CHeader';
import images from '../../assets/images';
import {getHeight, moderateScale} from '../../common/constants';
import {colors, styles} from '../../themes';
import {DigitalPrecereption,FilterIcon,FreeFollowUp,SortIcon,} from '../../assets/svgs';
import CText from '../../components/common/CText';
import CButton from '../../components/common/CButton';
import strings from '../../i18n/strings';
import { Container } from '../../components/Container';
import Body from '../../components/Body/Body';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import DoctorDetailCard from '../../components/DoctorComponent/DoctorDetailCard';


interface Props {
  route: any;
  navigation: any;
}

export default function CategoryDoctorList(props: Props) {
  const {route} = props;
  const {itm} = route.params;
  // console.log('itm', itm);

  return (
    <Container statusBarStyle='dark-content' >
      <CHeader title={itm + ' Doctors'} />
      
      
        <DoctorDetailCard title={itm} />
       
    
    </Container>
  );
}

const localStyles = StyleSheet.create({
  bannerImageStyle: {
    width: '100%',
    height: moderateScale(140),
    ...styles.mv10,
    borderRadius: moderateScale(10),
  },
  bannerContaienr: {
    ...styles.center,
    ...styles.mh20,
  },
  bottomBanerContainer: {
    ...styles.ph10,
    ...styles.pv10,
    backgroundColor: colors.lightOrange,
    ...styles.flexRow,
    ...styles.itemsCenter,
    // ...styles.flex,
    height:responsiveHeight(5)
  },
  buttonContinerStyle: {
    ...styles.flexRow,
    ...styles.itemsCenter,
    ...styles.justifyEnd,
    ...styles.mh20,
    ...styles.mv10,
  },
  btnContainerStyle: {
    ...styles.ml10,
    ...styles.ph10,
    borderWidth: moderateScale(1),
    borderColor: colors.bColor2,
    height: getHeight(28),
    borderRadius: moderateScale(10),
  },
});
