"use client";
import S from "@/styles/common.module.scss";
import Link from "next/link";
import DefaultAvatarImage from "@/assets/images/profile-user.webp";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "@/lib/api/auth";
import { toast } from "react-toastify";
import { useIsLoginActions, useIsLoginMode } from "@/shared/store/toggle-store";

const Nav = () => {
  const isLoginMode = useIsLoginMode();
  const { setIsLoginMode } = useIsLoginActions();

  const { data } = useQuery({
    queryKey: ["userInfo"],
    queryFn: getUserInfo,
  });

  console.log(data);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    toast.success("로그아웃 되었습니다.");
    setIsLoginMode(false);
  };

  return (
    <nav className={S.gnb}>
      <ul>
        {isLoginMode ? (
          <>
            <li>
              <button onClick={handleLogout}>로그아웃</button>
            </li>
            <li>
              <Link href="/mypage" passHref>
                <Image
                  src={DefaultAvatarImage}
                  alt="avatar"
                  width={35}
                  height={35}
                />
              </Link>
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
