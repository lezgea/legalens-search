import { getLoginUser, getRegisterUser } from "@/api/auth";
import { useMutation, useQuery } from "react-query";


export const useLoginUserMutation = () =>
    useMutation(data => getLoginUser(data));
;



