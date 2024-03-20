import { useQuery } from '@tanstack/react-query';
import medicinesService from '../../services/medicines-service';

 
 function useGetMedicinesSubCategory(data:{masterCat:string,personalCareType:string,category:string}) {
  return useQuery({

    queryKey: [medicinesService.queryKeys.getMedicinesSubCategory + data.masterCat + data.personalCareType + data.category ],
    queryFn: () => medicinesService.getMedicinesSubCategory(data),
  });
}

export default useGetMedicinesSubCategory;