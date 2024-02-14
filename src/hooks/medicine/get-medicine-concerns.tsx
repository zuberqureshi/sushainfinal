import { useQuery } from '@tanstack/react-query';
import medicinesService from '../../services/medicines-service';

 
 function useGetMedicinesHealthConcerns() {
  return useQuery({

    queryKey: [medicinesService.queryKeys.getMedicinesHealthConcerns],
    queryFn: medicinesService.getMedicinesHealthConcerns,
  });
}

export default useGetMedicinesHealthConcerns;