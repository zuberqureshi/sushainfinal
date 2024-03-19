import { useQuery } from '@tanstack/react-query';
import homeService from '../../services/home-service';
 
 function useGetSetting() {
  return useQuery({

    queryKey: [homeService.queryKeys.getSetting],
    queryFn: homeService.getSetting,
  });
}

export default useGetSetting;