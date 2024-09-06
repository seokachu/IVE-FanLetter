"use client";
import S from "@/styles/common.module.scss";
import Link from "next/link";
import DefaultAvatarImage from "@/assets/images/profile-user.webp";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "@/lib/api/auth";
import { toast } from "react-toastify";
import { useIsLoginActions, useIsLoginMode } from "@/shared/store/toggleStore";
import { useUserActions, useUserInfo } from "@/shared/store/userStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Nav = () => {
  const router = useRouter();
  const isLoginMode = useIsLoginMode();
  const userInfo = useUserInfo();
  const { setIsLoginMode } = useIsLoginActions();
  const { setUserInfo } = useUserActions();

  const [avatar, setAvatar] = useState(null);

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["userInfo"],
    queryFn: getUserInfo,
  });

  console.log(data?.avatar);

  //FIXME - 두번 랜더링 어떻게 해야할지 생각해보자
  useEffect(() => {
    if (isSuccess && data) {
      setUserInfo(data);
      setIsLoginMode(true);
    } else if (data === null) {
      localStorage.removeItem("accessToken");
      toast.warning("토큰이 만료되었습니다. 다시 로그인 해주세요!");
      router.push("/");
    }
  }, [data]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    toast.success("로그아웃 되었습니다.");
    setIsLoginMode(false);
    router.push("/");
  };

  if (isLoading) {
    return <div>로딩중 </div>;
  }
  const avatarSrc = data?.avatar ?? DefaultAvatarImage;

  return (
    <nav className={S.gnb}>
      <ul>
        {isLoginMode && userInfo ? (
          <>
            <li>{data?.nickname}</li>
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
