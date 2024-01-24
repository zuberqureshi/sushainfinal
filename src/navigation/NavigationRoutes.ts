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





import CategoryDoctorList from "../screens/FindDoctor/CategoryDoctorList";

import DoctorProfile from "../screens/FindDoctor/DortorProfile";
// import PatientsReview from '../containers/FindADoctor/PatientsReview';
// import PaymentScreen from '../containers/FindADoctor/PaymentScreen';
// import SelectTimeSlot from '../containers/FindADoctor/SelectTimeSlot';
// import ConsultDoctor from '../containers/InstantConsultation/ConsultDoctor'
// import ClinicDoctorDetailCard from '../containers/clinicConsultation/DoctorDetailCard'
import ProductByCategories from "../screens/Medicines/ProductByCategories";
import ProductDetail from "../screens/Medicines/ProductDetail";
import ProductsReview from "../screens/Medicines/ProductsReview";
import MedicineCart from "../screens/Medicines/MedicineCart";
import MedicineAddress from "../screens/Medicines/MedicineAddress";
import OrderSummery from "../screens/OrderSummery/OrderSummery";
import SelectTimeSlot from "../screens/FindDoctor/SelectTimeSlot";
import AppointmentBooked from "../screens/CommonScreens/AppointmentBooked";
import AppointmentCancellation from "../screens/CommonScreens/AppointmentCancellation";
import RescheduleAppointment from "../screens/CommonScreens/RescheduleAppointment";













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
  // Signup,
  // VerifyRegisterOtp,
  TabBarNavigation,
  // TabBarNew,
  // TermsOfService,
  // PrivacyPolicy,
  DrawerNavigation,
  CategoryDoctorList,
  DoctorProfile,
  // PatientsReview,
  // PaymentScreen,
  SelectTimeSlot,
  // ConsultDoctor,
  // ClinicDoctorDetailCard,
  ProductByCategories,
  AppointmentBooked,
  RescheduleAppointment,
  AppointmentCancellation,
  ProductDetail,
  ProductsReview,
  MedicineCart,
  MedicineAddress,
  OrderSummery,


};
