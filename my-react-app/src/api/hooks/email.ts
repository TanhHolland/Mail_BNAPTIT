import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { IEmailData } from "../apiEmail";
import { sendEmail } from "../apiEmail";
export const useQueryEmail = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: IEmailData) => sendEmail(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["email"] });
    },
  });
};
