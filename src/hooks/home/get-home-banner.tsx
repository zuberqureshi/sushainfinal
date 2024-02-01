import { useQuery } from '@tanstack/react-query';
import homeService from '../../services/home-service';
 
 function useGetHomeBannerData() {
  return useQuery({

    queryKey: [homeService.queryKeys.getHomeBannerData],
    queryFn: homeService.getHomeBannerData,
  });
}

export default useGetHomeBannerData;