import { useInfiniteQuery } from '@tanstack/react-query';
import doctorService from '../../services/doctor-service';


function useGetDoctorsListBySpeclization(data: {specialization:string,type:string}) {
    const PAGE_LIMIT = 20; // Initialize page number using useRef

  return useInfiniteQuery({
    queryKey: [doctorService.queryKeys.getDoctorsListBySpeclization + data?.specialization + data?.type],
    queryFn: ({ pageParam = 1 }: any) => doctorService.getDoctorsListBySpeclization({
      pageParam: pageParam ?? 1,
      ...data,
    }),
    getNextPageParam: (lastPage: any,pages) => {
        
        // console.log(lastPage?.hasMore,'nextPAge',pages?.length);
        
             if (pages?.length < PAGE_LIMIT) {
              
                return pages?.length + 1;
            }
            return null;
          
    },
    initialPageParam: 1,
    enabled: !!data.specialization,
  })

}

export default useGetDoctorsListBySpeclization;