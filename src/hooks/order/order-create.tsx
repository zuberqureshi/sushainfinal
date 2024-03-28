
import { useMutation } from "@tanstack/react-query";
import orderService from "../../services/order-service";
orderService


function useOrderCreate() {
    return useMutation({
        mutationFn: orderService.orderCreate
      });
}

export default useOrderCreate;