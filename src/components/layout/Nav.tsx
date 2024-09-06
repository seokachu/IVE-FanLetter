"use client";
import S from "@/styles/common.module.scss";
import Link from "next/link";
import DefaultAvatarImage from "@/assets/images/profile-user.webp";
import Image from "next/image";
import NotFoundPage from "@/app/not-found";
import Loading from "../common/Loading";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "@/lib/api/auth";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Nav = () => {
  const [isLoginMode, setIsLoginMode] = useState(false);
  const router = useRouter();
  const { data } = useQuery({
    queryKey: ["userInfo"],
    queryFn: getUserInfo,
  });

  console.log(data);

  if (data) {
  }

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
