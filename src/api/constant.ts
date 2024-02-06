import images from '../assets/images';

declare const global: {
  settingData: {
    data: {
      generalSettings: {
        img_path_s3: string;
        img_s3_new_path: string;
      };
    }[];
  };
};

export const BASE_IMAGE_PATH =
  global?.settingData?.data[0]?.generalSettings?.img_path_s3 ?? '';

export const BASE_IMG_NEW_PATH =
  global?.settingData?.data[0]?.generalSettings?.img_s3_new_path ?? '';

export const shopByategoryData = [
  {
    id: 1,
    title: 'Ayurvedic Products',
    image: images.ayurvedicProduct,
  },
  {
    id: 2,
    title: 'Personal Care',
    image: images.personalCare,
  },
  {
    id: 3,
    title: 'Homeopathic Products',
    image: images.homeopathicProducts,
  },
  {
    id: 4,
    title: 'Immunity & Wellness',
    image: images.immunityWellness,
  },
];

export const medicinesCategoryOptions = [
  {
    id: 1,
    title: 'All',
    image: null,
  },
  {
    id: 2,
    title: 'IBS',
    image: images.IBSIcon ,
  },
  {
    id: 3,
    title: 'Colitis',
    image: images.colitisIcon,
  },
  {
    id: 4,
    title: 'Gas & Acidity',
    image: images.gasacidityIcon,
  },
  {
    id: 5,
    title: 'Peptic Ulcers',
    image: images.pepticUlcersIcon,
  },

  // {
  //   id: 6,
  //   title: 'Peptic Ulcers',
  //   image: images.pepticUlcersIcon,
  // },
  // {
  //   id: 7,
  //   title: 'Peptic Ulcers',
  //   image: images.pepticUlcersIcon,
  // },
  // {
  //   id: 8,
  //   title: 'Gas & Acidity',
  //   image: images.gasacidityIcon,
  // },
];

export const medicineBestSellingData = [
  {
    id: 1,
    title: 'Amlant Tablet Maharishi Ayurveda',
    image: images.bestSelling1,
    price:'30'
  },
  {
    id: 2,
    title: 'Trailokya Vijaya Vati By Hempstreet',
    image: images.bestSelling2,
    price:'180'
  },
  {
    id: 3,
    title: 'Trailokya Vijaya Vati By Hempstreet',
    image: images.bestSelling2,
    price:'180'
  },
  // {
  //   id: 3,
  //   title: 'Homeopathic Products',
  //   image: images.homeopathicProducts,
  // },
  // {
  //   id: 4,
  //   title: 'Immunity & Wellness',
  //   image: images.immunityWellness,
  // },
];

export const saveBigData = [
  {
    id: 1,
    title: 'Get The Glow Combo',
    image: images.saveBig1,
    price:'1,197'
  },
  {
    id: 2,
    title: 'Golden Radiance Combo',
    image: images.saveBig2,
    price:'1,098'
  },
  {
    id: 3,
    title: 'Golden Radiance Combo',
    image: images.saveBig2,
    price:'1,098'
  },
  
];

export const sushainProductData = [
  {
    id: 1,
    title: 'Giloy Extract Cap 500 Mg',
    image: images.sushainPr1,
    price:'165'
  },
  {
    id: 2,
    title: 'Triphala Extract Cap 500 Mg',
    image: images.sushainPr2,
    price:'165'
  },
  {
    id: 3,
    title: 'Triphala Extract Cap 500 Mg',
    image: images.sushainPr2,
    price:'165'
  },
  
];

export const productItemCategoryData = [
  {
    id: 1,
    title: 'Ulsiowin Tablets By Skm',
    decp:'1 Pack of 100 Tablet in Bottle',
    price:'132',
    image: images.productByCategory1,
  },
  {
    id: 2,
    title: 'Pilex Tablet By Himalaya',
    decp:'1 Pack of 60 Tablet in Bottle',
    price:'165',
    image: images.productByCategory2,
  },
  {
    id: 3,
    title: 'Krimi Kuthar Ras Baidhyanath',
    decp:'1 Pack of 80 Tablet in Bottle',
    price:'194',
    image: images.productByCategory3,
  },
  {
    id: 4,
    title: 'Gastrina 60tab By Dabur',
    decp:'1 Pack of 100 Tablet in Bottle',
    price:'75',
    image: images.productByCategory4,
  },
  {
    id: 5,
    title: 'Pittashekhar Rasa By Dhootapapeshwar',
    decp:'1 Pack of 100 Tablet in Bottle',
    price:'740',
    image: images.productByCategory5,
  },
  {
    id: 6,
    title: 'Digoewin Tablets By Skm',
    decp:'1 Pack of 100 Tablet in Bottle',
    price:'171',
    image: images.productByCategory6,
  },
]
export const medicinesConcernsData = [
  {
    id: 1,
    title: 'Digestive',
    image: images.ayurvedicProduct,
  },
  {
    id: 2,
    title: 'Gynaecology & Fertility',
    image: images.personalCare,
  },
  {
    id: 3,
    title: 'Diabetes',
    image: images.homeopathicProducts,
  },
  {
    id: 4,
    title: 'Eyes',
    image: images.immunityWellness,
  },
  {
    id: 5,
    title: 'Reproductive',
    image: images.homeopathicProducts,
  },
  {
    id: 6,
    title: 'Piles',
    image: images.immunityWellness,
  },
  {
    id: 7,
    title: 'Neuro',
    image: images.homeopathicProducts,
  },
  {
    id: 8,
    title: 'Ear, Nose & Throat',
    image: images.immunityWellness,
  },
  {
    id: 9,
    title: 'Liver & Kidney',
    image: images.homeopathicProducts,
  },
  {
    id: 10,
    title: 'Bones & Joints',
    image: images.immunityWellness,
  },
  {
    id: 11,
    title: 'Skin Care',
    image: images.homeopathicProducts,
  },
  {
    id: 12,
    title: 'Heart & Lungs',
    image: images.immunityWellness,
  },

];

export const genderData = [
  {label: 'Male', value: 'Male'},
  {label: 'Female', value: 'Female'},
  {label: 'Other', value: 'Other'},
];

export const productAvailabilityData = [
  {label: 'Face Wash', value: '1'},
  {label: 'Item 2', value: '2'},
  {label: 'Item 3', value: '3'},
  {label: 'Item 4', value: '4'},
  {label: 'Item 5', value: '5'},
]

export const healthIssuesData = [
  {label: 'Item 1', value: '1'},
  {label: 'Item 2', value: '2'},
  {label: 'Item 3', value: '3'},
  {label: 'Item 4', value: '4'},
  {label: 'Item 5', value: '5'},
]

export const languageData = [
  {label: 'Hindi', value: 'hindi'},
  {label: 'English', value: 'english'},
 
]

export const sampleData = [
  {label: 'Item 1', value: '1'},
  {label: 'Item 2', value: '2'},
  {label: 'Item 3', value: '3'},
  {label: 'Item 4', value: '4'},
  {label: 'Item 5', value: '5'},
  {label: 'Item 6', value: '6'},
  {label: 'Item 7', value: '7'},
  {label: 'Item 8', value: '8'},
];


export const cityData = [
  {label: 'Item 1', value: '1'},
  {label: 'Item 2', value: '2'},
  {label: 'Item 3', value: '3'},
  {label: 'Item 4', value: '4'},
  {label: 'Item 5', value: '5'},
  {label: 'Item 6', value: '6'},
  {label: 'Item 7', value: '7'},
  {label: 'Item 8', value: '8'},
];

export const productReview =[
  {
    id:'01',
    cust_name:'Pari',
    rating:'3',
    heading:'Amazing Platform and Empathetic and Supportive Doctor',
    des:'Sushain is very useful platform for ayurvedic needs. Easy booking and calling process. Call went smooth and on time. Back end time coordinated everything so well. both joined on time and Doctor was so patient listener . Gave me ample time to explain my problem and also explained the course of action in detail. ...read more'
  },
  {
    id:'02',
    cust_name:'Deeksha',
    rating:'4',
    heading:'Excellent results',
    des:'Dr. Preeti Chaabra is a very seasoned Ayurvedic Practitioner. I got benefited with her experience and got a great treatment got satisfactory results for PCOD. Thanks team sushain and Dr. Preeti Chhabra'
  },
  {
    id:'03',
    cust_name:'Sasi kala',
    rating:'5',
    heading:'Excellent Consultation',
    des:'docror preeti is an excellent listener and very good in explaining things. Sushain platform is really excellent to make top Ayurveda doctors available across the country'
  },
  {
    id:'04',
    cust_name:'Harika',
    rating:'1',
    heading:'Great Relief',
    des:'Sushain is very useful platform for ayurvedic needs. Easy booking and calling process. Call went smooth and on time. Back end time coordinated everything so well. both joined on time and Doctor was so patient listener . Gave me ample time to explain my problem and also explained the course of action in detail. ...read more'
  },
  {
    id:'05',
    cust_name:'Ritu Ritu',
    rating:'5',
    heading:'Good Consultation',
    des:'Sushain is very useful platform for ayurvedic needs. Easy booking and calling process. Call went smooth and on time. Back end time coordinated everything so well. both joined on time and Doctor was so patient listener . Gave me ample time to explain my problem and also explained the course of action in detail. ...read more'
  },
  {
    id:'06',
    cust_name:'Harika',
    rating:'1',
    heading:'Great Relief',
    des:'Sushain is very useful platform for ayurvedic needs. Easy booking and calling process. Call went smooth and on time. Back end time coordinated everything so well. both joined on time and Doctor was so patient listener . Gave me ample time to explain my problem and also explained the course of action in detail. ...read more'
  },
  {
    id:'07',
    cust_name:'Ritu Ritu',
    rating:'5',
    heading:'Good Consultation',
    des:'Sushain is very useful platform for ayurvedic needs. Easy booking and calling process. Call went smooth and on time. Back end time coordinated everything so well. both joined on time and Doctor was so patient listener . Gave me ample time to explain my problem and also explained the course of action in detail. ...read more'
  },
  
]

export const medicineCartDate = [

  {
    id:'01',
    title:'Aloe Cucumber Face Wash',
    des:'This enriched formula with Aloe Vera Leaf Extract, Basil Extract, Neem Extract, Tea Tree Oil, White Tea and Cucumber.',
    aprice:'690',
    Price:'138',
    img:images.medicineCart1,
    
  },
  {
    id:'02',
    title:'Timeless Rejuvenating Serum',
    des:'A water based efficacious amalgamation of alpha arbutin, kojic Dipalmitate 1%, sodium gluconate..........',
    aprice:'250',
    Price:'250',
    img:images.medicineCart2,
    
  },
  {
    id:'03',
    title:'Honey Lemon Face Wash',
    des:'Enriched with deeply hydrating ingredients, this mild cleanser lifts off all dirt and impurities from the skin ...........',
    aprice:'690',
    Price:'138',
    img:images.medicineCart3,
    
  },
  // {
  //   id:'04',
  //   title:'Honey Lemon Face Wash',
  //   des:'Enriched with deeply hydrating ingredients, this mild cleanser lifts off all dirt and impurities from the skin ...........',
  //   aprice:'690',
  //   Price:'138',
  //   img:images.medicineCart3,
    
  // },
]


export const addressData = [

  {
    id:'01',
    name:'radhika',
    type:'work',
    address:'prk business park, d-20, sector 63,noida, Uttar Pradesh, 201301',
    num:'9876543256'
  },
  {
    id:'02',
    name:'Radhika',
    type:null,
    address:'19k Sher singh civil lines near pari chowk , greater noida, near Amprapali Valley, Uttar Pradesh, 201301',
    num:'9765432198'
  },
 
]

export const bookingFor = [
  {label: 'Self', value: 'self'},
  {label: 'Spouse', value: 'spouse'},
  {label: 'Husband', value: 'husband'},
  {label: 'Kid', value: 'kid'},
  {label: 'Father', value: 'father'},
  {label: 'Mother', value: 'mother'},
  {label: 'Other', value: 'other'},

]