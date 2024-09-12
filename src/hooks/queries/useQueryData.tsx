import { getUserInfo } from "@/lib/api/auth";
import { getLetter } from "@/lib/api/letter";
import { useIsLoginMode } from "@/shared/store/toggleStore";
import { useQuery } from "@tanstack/react-query";

const useDataQueries = () => {
  const isLoginMode = useIsLoginMode();

  //유저정보 data query
  const {
    data: userInfoQuery,
    isLoading: userInfoLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["userInfo"],
    queryFn: getUserInfo,
    enabled: isLoginMode,
  });

  //letter data query
  const { data: lettersQuery, isLoading: lettersIsLoading } = useQuery({
    queryKey: ["letters"],
    queryFn: getLetter,
  });

  return {
    userInfoQuery,
    lettersQuery,
    lettersIsLoading,
    userInfoLoading,
    isError,
    isSuccess,
  };
};

export default useDataQueries;
