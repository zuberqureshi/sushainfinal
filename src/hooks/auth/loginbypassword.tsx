import { useMutation, useQuery } from '@tanstack/react-query';

import authService from '../../services/Auth/auth-service';
import { Toast, ToastTitle, useToast } from "@gluestack-ui/themed";

import React,{useState,useEffect, useContext} from 'react'
 
 

export default function useLoginByPassword() {
  const toast = useToast()

  return useMutation({
    mutationFn: authService.loginByPassword,
    onError: (error: any) => {
        toast.show({
        placement: "bottom",
        render: ({ id }) => {
          const toastId = "toast-" + id

          return (
            <Toast nativeID={toastId} variant="accent" action="success">
              <ToastTitle>Something went wrong while Login {error.message}  </ToastTitle>
            </Toast>
          );
        },
      })

    },
  });

}