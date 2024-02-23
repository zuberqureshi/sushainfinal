import { useMutation } from "@tanstack/react-query";
import addressService from "../../services/address-service";

export default function UpdateUserAddress() {
  // const toast = useToast()

  return useMutation({
    mutationFn: addressService.updateUserAddress
  });

}