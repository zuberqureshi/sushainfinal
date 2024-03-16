import { useQuery } from '@tanstack/react-query';
import medicinesService from '../../services/medicines-service';

 
 function useGetMedicinesBrandList(data:{masterCat:string,personalCareType:string}) {
  return useQuery({

    queryKey: [medicinesService.queryKeys.getMedicinesBrandList + data.masterCat + data.personalCareType ],
    queryFn: () => medicinesService.getMedicinesBrandList(data),
  });
}

export default useGetMedicinesBrandList;