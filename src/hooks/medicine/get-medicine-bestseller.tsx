import { useQuery } from '@tanstack/react-query';
import medicinesService from '../../services/medicines-service';

 
 function useGetMedicinesBestSeller(data:{masterCat:string,personalCareType:string}) {
  return useQuery({

    queryKey: [medicinesService.queryKeys.getMedicinesBestSeller + data.masterCat + data.personalCareType ],
    queryFn: () => medicinesService.getMedicinesBestSeller(data),
  });
}

export default useGetMedicinesBestSeller;