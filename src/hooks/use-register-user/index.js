import { getRegisterUser } from "@/api/auth";
import { backClient } from "@/api/client";
import { getSearchHistory } from "@/api/history";
import { useMutation, useQuery } from "react-query";


export const useRegisterUserMutation = () => {
    return useMutation(data => getRegisterUser(data));
};



