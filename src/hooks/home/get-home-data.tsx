import { useQuery } from '@tanstack/react-query';
import homeService from '../../services/home-service';
 
 function useGetHomeData() {
  return useQuery({

    queryKey: [homeService.queryKeys.getHomeData],
    queryFn: homeService.getHomeData,
  });
}

export default useGetHomeData;