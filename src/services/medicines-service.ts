 
import { fetcher } from '../utils/fetcher';

class MedicinesService {

  queryKeys = {
    getMedicinesHealthConcerns : 'getMedicinesHealthConcerns',
    getMedicinesByCategory : 'getMedicinesByCategory',
    getMedicinesBestSeller : 'getMedicinesBestSeller',
    getMedicinesBrandList : 'getMedicinesBrandList',
    getMedicinesCombos :'getMedicinesCombos',
    getMedicinesRecommended : 'getMedicinesRecommended',
    getMedicinesByBrand : 'getMedicinesByBrand',
    getMedicinesSubCategory : 'getMedicinesSubCategory',
    getSimilarProductsBySKU : 'getSimilarProductsBySKU',
  };

  getMedicinesHealthConcerns = async (data:any) => {
    const {masterCat , personalCareType} = data
    return fetcher({
      url: `order/medicinecategory?master_cat=${masterCat}&personal_care=${personalCareType}`,
      method: 'GET',
    });
  }

  getMedicinesByCategory = async (data: any) => {
    const { name, pageParam } = data
    console.log(name,pageParam,'APPP CAAALING');
    

    return fetcher({
      url: `order/medicinebycategory?master_cat=AYURVEDIC&cat_name=${name}&pageNumber=${pageParam}&pageSize=10`,
      method: 'GET',
    });
  }

  getMedicinesSubCategory = async (data:any) => {
    const {masterCat , personalCareType , category} = data
    return fetcher({
      url: `order/medicinesubcategory?master_cat=${masterCat}&personal_care=${personalCareType}&category_name=${category}`,
      method: 'GET',
    });
  }

  getMedicinesBestSeller = async (data:any) => {
    const {masterCat , personalCareType} = data
    return fetcher({
      url: `order/bestseller?master_cat=${masterCat}&skip=1&personal_care=${personalCareType}`,
      method: 'GET',
    });
  }

  
  getMedicinesBrandList = async (data:any) => {
    const {masterCat , personalCareType} = data
    return fetcher({
      url: `order/brandlist?master_cat=${masterCat}&personal_care=${personalCareType}`,
      method: 'GET',
    });
  }
 
  getMedicinesCombos = async (data:any) => {
    // const {masterCat , personalCareType} = data
    return fetcher({
      url: `order/comboproducts?skip=1`,
      method: 'GET',
    });
   }

   getMedicinesRecommended = async (data:any) => {
    const {userId } = data
    // console.log(userId,'Recommmm');
    
    return fetcher({
      url: `order/recommendedproduct?user_id=${userId}&skip=1`,
      method: 'GET',
    });
   }

   getMedicinesByBrand = async (data:any) => {
    const {brand } = data
    // console.log(userId,'Recommmm');
    
    return fetcher({
      url: `order/productbybrand?brand=${brand}&skip=1`,
      method: 'GET',
    });
   }

   getSimilarProductsBySKU = async (data:any) => {
   
    // console.log(userId,'Recommmm');
    
    return fetcher({
      url: `order/similarproduct?skuId=${data}&skip=2`,
      method: 'GET',
    });
   }



   

}

export default new MedicinesService();