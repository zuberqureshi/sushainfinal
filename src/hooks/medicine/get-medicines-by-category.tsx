import { useInfiniteQuery } from '@tanstack/react-query';
import medicinesService from '../../services/medicines-service';


function useGetMedicinesByCategory(data: any) {
// console.log(data,'INFFTY');

  return useInfiniteQuery({
    queryKey: [medicinesService.queryKeys.getMedicinesByCategory + data.name],
    queryFn: ({ pageParam = 1 }: any) => medicinesService.getMedicinesByCategory({
      pageParam: pageParam ?? 1,
      ...data,
    }),
    getNextPageParam: (lastPage: any) => {
      if (lastPage.data.nextPage - 1 < lastPage.data.totalPages) {
        return lastPage.data.nextPage;
      }
    },
    initialPageParam: 1,
    // enabled: !!data.id,
  })

}

export default useGetMedicinesByCategory;
