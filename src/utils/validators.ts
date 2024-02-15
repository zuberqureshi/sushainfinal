import strings from '../i18n/strings';
import * as yup from 'yup';

var phoneValidation= /^([\s\(\)\-]*\d[\s\(\)\-]*){8}$/
var emailValidation= /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/


export const loginSchema = yup.object().shape({
    
    userid: yup.string()
    .required("Email/Phone Number is required")
    .test('test-name', 'Enter Valid Phone/Email', 
      function(value) {
        const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        const phoneRegex = /^(\+91-|\+91|0)?\d{10}$/; // Change this regex based on requirement
        let isValidEmail = emailRegex.test(value);
        let isValidPhone = phoneRegex.test(value);
        // console.log('check number',value,isValidEmail,isValidPhone);
        
        if (!isValidEmail && !isValidPhone ){
          return false;
        }
          return true;

      }),
    // mobile:yup.string().required("Number is must").min(10,"Min digits 10").max(10,"Max digits 10"),
    // country:yup.string().required('Country is must'),
    //  email:yup.string().email('Invalid Email').required('Email is must'),


    // address:yup.number().typeError('A number is required').required('Address is must'),

    // lastname:yup.string().min(3,'To Short').max(20,'To Long').required('Fisrt name is must'),
    // email: yup.string().email('Invalid Email').required('Email is must'),
    // age:yup.number().min(10).max(50).required('Age is must'),

    // password:yup.string()
    // .required('password is must')
    // .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,'Enter Strong Password'),

    // cpass:yup.string().required('Confirm Password is must')
    // .oneOf([yup.ref('password'),null],'Both password must match'),
    
})

export const patientBookingValidationSchema = yup.object().shape({
    
  // bookingfor:yup.string(),
  patientname:yup.string().typeError('Input must be a string').required("Patient name is required"),
  patientnumber:yup.string().required("Patient number is required").matches(/^(\+91-|\+91|0)?\d{10}$/,'Enter 10 digit number'),
  patientage:yup.string().required("is required"),
  patientweight:yup.string().required("is required"),
  // patientgender:yup.string(),
  // slotdateday:yup.string(),
  // slottimeid:yup.string(),
     

})

export const signUpSchema = yup.object().shape({
  firstname:yup.string().required("First name is required").typeError('Input must be a string'),
  lastname:yup.string().required("Last name is required").typeError('Input must be a string'),
  number:yup.string().required("Patient number is required").matches(/^(\+91-|\+91|0)?\d{10}$/,'Enter 10 digit number'),
  password:yup.string()
    .required('password is must')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,'Enter Strong Password'),
    cpassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),   
})

export const signUpWithEmailSchema = yup.object().shape({
  firstname:yup.string().required("First name is required").typeError('Input must be a string'),
  lastname:yup.string().required("Last name is required").typeError('Input must be a string'),
  number:yup.string().required("Patient number is required").matches(/^(\+91-|\+91|0)?\d{10}$/,'Enter 10 digit number'),
  email:yup.string().email('Invalid email').required('Email is required'),
  password:yup.string()
    .required('password is must')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,'Enter Strong Password'),
    cpassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),   
})

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const passwordRegex = /^(?=.*\d)(?=.*\W)(?=.*[a-z])(?=.*[A-Z]).{1,}$/;

const mobileRegex = /^[0-9]{10}$/;

const nameRegex = /^([\w]{1,})+([\w\s]{0,})+$/i;

// Name validation
const validateName = (name: string) => {
  if (!name) {
    return {
      status: false,
      msg: strings.thisFieldIsMandatory,
    };
  } else {
    return nameRegex.test(name)
      ? {status: true, msg: ''}
      : {
          status: false,
          msg: strings.validName,
        };
  }
};

const validateMobile = (mobile: string) => {
  if (!mobile) {
    return {
      status: false,
      msg: strings.thisFieldIsMandatory,
    };
  } else {
    return mobileRegex.test(mobile)
      ? {status: true, msg: ''}
      : {
          status: false,
          msg: strings.validMobile,
        };
  }
};

//Email validation
const validateEmail = (email: string) => {
  if (!email) {
    return {
      status: false,
      msg: strings.thisFieldIsMandatory,
    };
  } else {
    return emailRegex.test(email)
      ? {status: true, msg: ''}
      : {
          status: false,
          msg: strings.validEmail,
        };
  }
};

//Password validation
const validatePassword = (
  pass: string,
  isConfrimPass?: string | undefined,
  password?: string | undefined,
) => {
  if (!pass) {
    return {
      status: false,
      msg: strings.plsEnterPassword,
    };
  } else if (pass.length < 8) {
    return {
      status: false,
      msg: strings.validatePassword,
    };
  } else {
    if (passwordRegex.test(pass)) {
      if (isConfrimPass && password !== pass) {
        return {
          status: false,
          msg: strings.confirmPassValidString,
        };
      }
      return {status: true, msg: ''};
    } else {
      return {
        status: false,
        msg: strings.validatePassword,
      };
    }
  }
};

// confirm password validation
const validateConfirmPassword = (pass: string, password: any) => {
  if (!pass) {
    return {
      status: false,
      msg: strings.plsEnterPassword,
    };
  } else if (pass.length < 8) {
    return {
      status: false,
      msg: strings.validatePassword,
    };
  } else {
    if (passwordRegex.test(pass)) {
      if (password !== pass) {
        return {
          status: false,
          msg: strings.confirmPassValidString,
        };
      }
      return {status: true, msg: ''};
    } else {
      return {
        status: false,
        msg: strings.validatePassword,
      };
    }
  }
};

export {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateName,
  validateMobile,
};
