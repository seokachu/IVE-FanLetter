import { getUserInfo } from "@/lib/api/auth";
import { getLetter } from "@/lib/api/letter";
import { useIsLoginActions, useIsLoginMode } from "@/shared/store/toggleStore";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const useDataQueries = () => {
  const isLoginMode = useIsLoginMode();
  const queryClient = useQueryClient();
  const { setIsLoginMode } = useIsLoginActions();
  const router = useRouter();

  //유저정보 data query
  const {
    data: userInfoQuery,
    isLoading: userInfoLoading,
    error,
  } = useQuery({
    queryKey: ["userInfo"],
    queryFn: getUserInfo,
    enabled: isLoginMode && !!localStorage.getItem("accessToken"),
    retry: false,
  });

  //letter data query
  const { data: lettersQuery, isLoading: lettersIsLoading } = useQuery({
    queryKey: ["letters", isLoginMode],
    queryFn: getLetter,
    retry: false,
  });

  //토큰 만료 설정
  useEffect(() => {
    if (error instanceof Error) {
      toast.error(error.message);
      queryClient.removeQueries({ queryKey: ["userInfo"] });
      setIsLoginMode(false);
      router.push("/");
    }
  }, [error, setIsLoginMode, router, queryClient]);

  // 로그인 상태 확인 및 초기 데이터 패칭 설정
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoginMode(!!token);
  }, [setIsLoginMode]);

  return {
    userInfoQuery,
    lettersQuery,
    lettersIsLoading,
    userInfoLoading,
  };
};

export default useDataQueries;
