import { useQuery } from '@tanstack/react-query';
import medicinesService from '../../services/medicines-service';

 
 function useGetProductDetailsBySKU(data:any) {
  return useQuery({

    queryKey: [medicinesService.queryKeys.getProductDetailsBySKU + data ],
    queryFn: () => medicinesService.getProductDetailsBySKU(data),
  });
}

export default useGetProductDetailsBySKU;