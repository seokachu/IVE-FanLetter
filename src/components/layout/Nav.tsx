import S from "@/styles/common.module.scss";
import Link from "next/link";
import DefaultAvatarImage from "@/assets/images/profile-user.webp";
import Image from "next/image";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserInfo } from "@/lib/api/auth";
import { toast } from "react-toastify";
import { useIsLoginActions, useIsLoginMode } from "@/shared/store/toggleStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Nav = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const isLoginMode = useIsLoginMode();
  const { setIsLoginMode } = useIsLoginActions();
  const [fetchUserInfo, setFetchUserInfo] = useState(false);

  const { data, isSuccess } = useQuery({
    queryKey: ["userInfo"],
    queryFn: getUserInfo,
    enabled: fetchUserInfo,
  });

  console.log(data);

  //데이터가 성공적으로 받아왔을때 로직
  useEffect(() => {
    if (isSuccess && data) {
      setIsLoginMode(true);
      return;
    }

    if (data === null) {
      toast.warning("토큰이 만료되었습니다. 다시 로그인 해주세요!");
      router.push("/");
    }
  }, [data, isSuccess]);

  //로그아웃 핸들러
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    toast.success("로그아웃 되었습니다.");
    setIsLoginMode(false);
    queryClient.removeQueries({ queryKey: ["userInfo"] });
    router.push("/");
  };

  // 로그인 상태 확인 및 초기 데이터 패칭 설정
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setFetchUserInfo(true);
    } else {
      setIsLoginMode(false);
    }
  }, [isLoginMode]);

  const avatarSrc = data?.avatar ?? DefaultAvatarImage;

  return (
    <nav className={S.gnb}>
      <ul>
        {isLoginMode ? (
          <>
            <li className={S.nickname}>{data?.nickname}</li>
            <li>
              <Link href="/mypage" passHref>
                <Image src={avatarSrc} alt="avatar" width={35} height={35} />
              </Link>
            </li>
            <li>
              <button onClick={handleLogout}>로그아웃</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/login">로그인</Link>
            </li>
            <li>
              <Link href="/register">회원가입</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
