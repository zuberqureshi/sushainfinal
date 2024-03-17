import { useQuery } from '@tanstack/react-query';
import medicinesService from '../../services/medicines-service';

 
 function useGetMedicinesRecommended(data:{userId:number}) {
  return useQuery({

    queryKey: [medicinesService.queryKeys.getMedicinesRecommended + data?.userId ],
    queryFn: () => medicinesService.getMedicinesRecommended(data),
  });
}

export default useGetMedicinesRecommended;