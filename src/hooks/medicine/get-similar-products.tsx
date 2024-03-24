import { useQuery } from '@tanstack/react-query';
import medicinesService from '../../services/medicines-service';

 
 function useGetSimilarProductsBySKU(data:any) {
  return useQuery({

    queryKey: [medicinesService.queryKeys.getSimilarProductsBySKU + data ],
    queryFn: () => medicinesService.getSimilarProductsBySKU(data),
  });
}

export default useGetSimilarProductsBySKU;