import { useQuery } from '@tanstack/react-query';
import medicinesService from '../../services/medicines-service';
 
 function useGetMedicinesCombos() {
  return useQuery({

    queryKey: [medicinesService.queryKeys.getMedicinesCombos],
    queryFn: medicinesService.getMedicinesCombos,
  });
}

export default useGetMedicinesCombos;