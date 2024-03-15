 
import { fetcher } from '../utils/fetcher';

class MedicinesService {

  queryKeys = {
    getMedicinesHealthConcerns : 'getMedicinesHealthConcerns',
    getMedicinesByCategory : 'getMedicinesByCategory',
    getMedicinesBestSeller : 'getMedicinesBestSeller',
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

  getMedicinesBestSeller = async (data:any) => {
    const {masterCat , personalCareType} = data
    return fetcher({
      url: `order/bestseller?master_cat=${masterCat}&skip=1&personal_care=${personalCareType}`,
      method: 'GET',
    });
  }




   

}

export default new MedicinesService();