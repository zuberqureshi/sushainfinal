 
import { fetcher } from '../utils/fetcher';

class MedicinesService {

  queryKeys = {
    getMedicinesHealthConcerns : 'getMedicinesHealthConcerns',
    getMedicinesByCategory : 'getMedicinesByCategory',
  };

  getMedicinesHealthConcerns = async () => {
    return fetcher({
      url: 'order/medicinecategory?master_cat=AYURVEDIC',
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




   

}

export default new MedicinesService();