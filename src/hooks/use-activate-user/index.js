import { activateUser } from "@/api/auth";
import { useMutation } from "react-query";


export const useActivateUserMutation = () =>
    useMutation(data => activateUser(data));
;



