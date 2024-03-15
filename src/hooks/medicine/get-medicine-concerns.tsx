import { useQuery } from '@tanstack/react-query';
import medicinesService from '../../services/medicines-service';

 
 function useGetMedicinesHealthConcerns(data:{masterCat:string,personalCareType:string}) {
  return useQuery({

    queryKey: [medicinesService.queryKeys.getMedicinesHealthConcerns + data.masterCat + data.personalCareType ],
    queryFn: () => medicinesService.getMedicinesHealthConcerns(data),
  });
}

export default useGetMedicinesHealthConcerns;