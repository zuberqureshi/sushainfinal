import {RouteProp} from '@react-navigation/native';

export type RootStackParamList = {
  Login: undefined;
  VerifyLoginOtp: {mobile: string};
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
  Signup: {
    user: GoogleFacebookUser;
  };
};

export interface GoogleFacebookUser {
  email: string;
  name: string | null;
  lastName: string | null;
  isFromGoogleFacebookLogin: boolean;
}

export interface LoginWithOtpResponse {
  success: boolean;
  code: number;
  message: string;
  data: [
    {
      requestbody: {
        mobile: string;
      };
      otpValue: string;
    },
  ];
}

export interface OtpVerifyResponse {
  success: boolean;
  code: number;
  message: string;
  data: [
    {
      user: User;
      token: string;
      refreshToken: string;
    },
  ];
}

export interface CheckByEmailResponse {
  success: boolean;
  code: number;
  message: string;
  data: [
    {
      userInfo: User;
      token: string;
      refreshToken: string;
    },
  ];
}
export interface User {
  id: number;
  user_unique_id: string;
  referal_doctor_id: string | null;
  fcm_token: string | null;
  web_fcm_token_time_update: string | null;
  app_fcm_token: string | null;
  referal_doctor_name: string | null;
  company_referal_code: string | null;
  country: string | null;
  city: string | null;
  city_id: number | null;
  state: string | null;
  state_id: number | null;
  first_name: string | null;
  last_name: string | null;
  photo: string | null;
  gender: string | null;
  pincode: string | null;
  dob: string | null;
  height: number | null;
  weight: number | null;
  age: number | null;
  critical_aliments: string | null;
  critical_aliments_id: string | null;
  elergy: string | null;
  mobile: string | null;
  country_mobile_code: string | null;
  email: string | null;
  password: string | null;
  password_plain: string | null;
  auth_token: string | null;
  register_type: string | null;
  register_by: string | null;
  otp: string | null;
  otp_verify: string | null;
  profile_verify: string | null;
  time: string | null;
  user_type: string | null;
  login_ip: string | null;
  login_time: string | null;
  active_status: number | null;
  is_test: number | null;
  referal_page_link: string | null;
  referal_page_name: string | null;
  country_code: string | null;
  device_type: string | null;
  device_name: string | null;
  device_data: string | null;
  userCookieId: string | null;
}

export interface Banner {
  id: number;
  order_no: number;
  name: string;
  img: string;
  img_mbl: string;
  link_1: string;
  link_2: string;
}

export interface Category {
  id: number;
  name: string;
  des: string;
  img: string;
  img_mbl: string;
  link_1: string;
  link_2: string;
}

export interface DoctorSpecialityList {
  success: boolean;
  code: number;
  message: string;
  data: [
    {
      specList: [DoctorSpecialityListData];
    },
  ];
}

export interface DoctorSpecialityListData {
  id: number;
  name: string;
  meta_title: string;
  meta_des_clinic: string;
  yoga_des: string;
  meta_title_clinic: string;
  meta_des: string;
  lang: string;
  banner_img: string;
  img: string;
  instant_consultation: string;
  yoga_eligible: string;
  banner_img_mobile: string;
  yoga_img: string;
  description: string;
  recomend_days: 3;
  homepage_order_by: string;
  time: string;
  active: 1;
  meta_title_yoga: string;
  meta_des_yoga: string;
  app_icon: string;
}

export interface DoctorTypeSpectList {
  success: boolean;
  data: Data[];
  message: string;
  code: number;
}

interface Data {
  doctorList: Doctor[];
}

interface Response {
  success: boolean;
  data: Data[];
  message: string;
  code: number;
}

export interface UserSettingData {
  success: boolean;
  code: number;
  message: string;
  data: [
    {
      generalSettings: UserGeneralSettings;
      appHomeSettings: UserAppHomeSettings;
      countrySettings: [UserCountrySettings];
    },
  ];
}

export interface UserGeneralSettings {
  id: number;
  followup_max_days: number;
  virtual_cancel_charges: number;
  opd_cancel_charges: number;
  cancel_per: number;
  cancel_virtual_booking_hours: number;
  cancel_physical_booking_hours: number;
  reschedule_days: number;
  min_free_delivery: number;
  min_free_delivery_ae: number;
  delivery_amount: number;
  delivery_amount_ae: number;
  delivery_amount_usd: number;
  min_free_delivery_usd: number;
  default_delivery_days: number;
  virtual_consultation_charge: number;
  doctor_medicine_commission: number;
  stock_reducing_threshold: number;
  virtual_commission_deduct: number;
  opd_commission_deduct: number;
  delivery_mode: string;
  token: string;
  delivery_url: string;
  payment_mode: string;
  payment_url: string;
  secret_key: string;
  secret_id: string;
  img_path_s3: string;
  img_s3_new_path: string;
  s3_key: string;
  s3_id: string;
  bucket_name: string;
  doctor_selling_dp: number;
  current_video_vendor: string;
  default_video_vendor: string;
  sha_key: string;
  doc_tds_percent: number;
  vc_instant_fees: number;
  shiprocketToken: string;
  shiprocketTokenDate: string;
  shiprocket_url: string;
  shiprocket_pickup_pincode: string;
  shiprocket_pickup_mobile: string;
  shiprocket_pickup_address: string;
  ecom_username: string;
  ecom_password: string;
  ecom_pickup_address: string;
  ecom_pickup_mobile: string;
  ecom_pickup_pincode: string;
  ivr_incoming: string;
  ivr_outgoing: string;
  pay_later: string;
  stage_4_delay: number;
  stage_5_delay: number;
  web_fcm_server_key: string;
  app_fcm_server_key: string;
  infertility_program_fees: number;
  infertility_program_id: number;
  infertility_doc_id: number;
  infertility_program_fees_part: number;
  infertility_program_fees_full: number;
}

export interface UserAppHomeSettings {
  id: number;
  banners_order_no: number;
  banner_show: number;
  services_order_no: number;
  services_show: number;
  doc_spec_order_no: number;
  doc_spec_show: number;
  shop_by_cat_order_no: number;
  shop_by_cat_show: number;
  top_pro_order_no: number;
  top_pro_show: number;
  therapy_order_no: number;
  therapy_show: number;
  lower_section_banner_order_no: number;
  lower_section_banner_order_show: number;
  review_order_no: number;
  review_show: number;
  feature_order_no: number;
  feature_show: number;
  bottom_number_order_no: number;
  bottom_number_show: number;
}

export interface UserCountrySettings {
  id: number;
  country_mobile_limit: number;
  country_name: string;
  country_code: string;
  country_flag: string | null;
  currency_symbol: string;
  timeZone: string;
  pricing_factor: number;
  delivery_charge: number;
  express_delivery_charge: number | null;
  min_delivery_charge: number;
  base_multiplier: number;
  time_zone_offset: string;
  mobile_code: string;
}

export type VerifyLoginOtpProp = RouteProp<
  RootStackParamList,
  'VerifyLoginOtp'
>;
export type SignupProp = RouteProp<RootStackParamList, 'Signup'>;
