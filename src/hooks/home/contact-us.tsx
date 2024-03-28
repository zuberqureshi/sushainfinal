
import { useMutation } from "@tanstack/react-query";
import homeService from "../../services/home-service";


function useContactUs() {
    return useMutation({
        mutationFn: homeService.contactUs
      });
}

export default useContactUs;