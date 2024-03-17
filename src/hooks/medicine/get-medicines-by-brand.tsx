import { useQuery } from '@tanstack/react-query';
import medicinesService from '../../services/medicines-service';

 
 function useGetMedicinesByBrand(data:{brand:string}) {
  return useQuery({

    queryKey: [medicinesService.queryKeys.getMedicinesByBrand + data?.brand ],
    queryFn: () => medicinesService.getMedicinesByBrand(data),
  });
}

export default useGetMedicinesByBrand;