import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthCotext } from "../Context/Authentication/AuthCotext";
import { AxiosHook } from "./AxiosHook";

const useUserRole = () => {
  const { user, loading: authLoading } = useContext(AuthCotext);
  const axios = AxiosHook();

  const email = user?.email;

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["userRole", email],
    queryFn: async () => {
      const res = await axios.get(`/users/role?email=${email}`);
      return res.data;
    },
    enabled: !!email && !authLoading, // only run when email exists
  });

  return {
    role: data?.role || "user",
    isRoleLoading: isLoading || authLoading,
    isError,
    error,
    refetch,
  };
};

export default useUserRole;