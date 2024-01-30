import { useQuery } from '@tanstack/react-query';
import homeService from '../../services/home-service';
 
 function useGetSpeclizationlist() {
  return useQuery({

    queryKey: [homeService.queryKeys.getSpeclizationlist],
    queryFn: homeService.getSpeclizationlist,
  });
}

export default useGetSpeclizationlist;