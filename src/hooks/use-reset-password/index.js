import { resetPassword } from "@/api/auth";
import { useMutation } from "react-query";


export const useResetPasswordMutation = (token) =>
    useMutation(data => resetPassword(data, token));
;



