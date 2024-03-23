// tab Routes
// import Home from '../containers/Home/Home';

import Medicines from "../screens/Medicines/Medicines";
import FindADoctor from "../screens/FindDoctor/FindADoctor";
import ContactUs from "../screens/ContactUs/ContactUs";
import AskVirtualVaidya from "../screens/AskVirtualVaidya";


// screen routes
import Splash from "../screens/Splash/Splash";

import TabBarNavigation from "./Type/TabBarNaviagtion";
import LoginScreen from "../screens/auth/LoginScreen";
import AuthStack from "./Type/AuthStack";
// import Signup from '../containers/auth/Signup';
import VerifyLoginOtp from "../screens/auth/VerifyLoginOtp";
// import VerifyRegisterOtp from '../containers/auth/VerifyRegisterOtp';
 
// import TabBarNew from './Type/TabBar';
// import TermsOfService from '../containers/auth/TermsOfService';
// import PrivacyPolicy from '../containers/auth/PrivacyPolicy';
import DrawerNavigation from "./Type/DrawerNavigation";







// import PatientsReview from '../containers/FindADoctor/PatientsReview';
// import PaymentScreen from '../containers/FindADoctor/PaymentScreen';
// import SelectTimeSlot from '../containers/FindADoctor/SelectTimeSlot';



import ProductByCategories from "../screens/Medicines/ProductByCategories";
import ProductDetail from "../screens/Medicines/ProductDetail";
import ProductsReview from "../screens/Medicines/ProductsReview";


import OrderSummery from "../screens/OrderSummery/OrderSummery";
import AppointmentBooked from "../screens/CommonScreens/AppointmentBooked";
import AppointmentCancellation from "../screens/CommonScreens/AppointmentCancellation";
import RescheduleAppointment from "../screens/CommonScreens/RescheduleAppointment";
import SelectTimeSlot from "../screens/CommonScreens/SelectTimeSlot";
import CategoryDoctorList from "../screens/CommonScreens/CategoryDoctorList";
import DoctorProfile from "../screens/CommonScreens/DortorProfile";
import InstantConsultation from "../screens/InstantConsultation/ConsultDoctor";
import ClinicConsultation from "../screens/ClinicConsultation/ClinicConsultation";
import Appointments from "../screens/Appointments/Appointments";
import PatientsReview from "../screens/CommonScreens/PatientsReview";
import LifeStyle from "../screens/LifeStyle/LifeStyle";
import Signup from "../screens/auth/Signup";
import Cart from "../screens/CommonScreens/Cart";
import Address from "../screens/CommonScreens/Address";
import VideoCall from "../screens/CommonScreens/VideoCall";
import VideoCompleted from "../screens/CommonScreens/VideoCompleted";
import MyOrders from "../screens/OrderSummery/MyOrders";
import OrderDetails from "../screens/OrderSummery/OrderDetails";
import ProductsByBrand from "../screens/Medicines/ProductsByBrand";
import AboutUs from "../screens/CommonScreens/AboutUs";
import Profile from "../screens/CommonScreens/Profile";


export const TabRoute = {
  // Home,
  FindADoctor,
  Medicines,
  ContactUs,
  AskVirtualVaidya,
};

export const StackRoute = {
  Splash,
  AuthStack,
  LoginScreen,
  VerifyLoginOtp,
  Signup,
  // VerifyRegisterOtp,
  TabBarNavigation,
  // TabBarNew,
  // TermsOfService,
  // PrivacyPolicy,
  DrawerNavigation,
  CategoryDoctorList,
  DoctorProfile,
  PatientsReview,
  // PaymentScreen,
  SelectTimeSlot,
  InstantConsultation,
  ClinicConsultation,
  ProductByCategories,
  AppointmentBooked,
  RescheduleAppointment,
  AppointmentCancellation,
  ProductDetail,
  ProductsReview,
  Cart,
  Address,
  OrderSummery,
  Appointments,
  LifeStyle,
  VideoCall,
  VideoCompleted,
  MyOrders,
  OrderDetails,
  ProductsByBrand,
  AboutUs,
  Profile,


};
