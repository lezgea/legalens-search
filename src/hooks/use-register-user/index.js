import { getRegisterUser } from "@/api/auth";
import { useMutation, useQuery } from "react-query";


export const useRegisterUserMutation = () =>
    useMutation(data => getRegisterUser(data));
;



