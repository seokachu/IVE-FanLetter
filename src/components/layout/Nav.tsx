import S from "@/styles/common.module.scss";
import Link from "next/link";
import DefaultAvatarImage from "@/assets/images/profile-user.webp";
import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useIsLoginActions, useIsLoginMode } from "@/shared/store/toggleStore";
import { useRouter } from "next/navigation";
import NavSkeleton from "../skeleton/NavSkeleton";
import useDataQueries from "@/hooks/queries/useQueryData";

const Nav = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const isLoginMode = useIsLoginMode();
  const { setIsLoginMode } = useIsLoginActions();
  const { userInfoQuery, userInfoLoading } = useDataQueries();

  console.log(userInfoQuery);
  console.log(isLoginMode);

  //로그아웃 핸들러
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    toast.success("로그아웃 되었습니다.");
    setIsLoginMode(false);
    queryClient.removeQueries({ queryKey: ["userInfo"] });
    router.push("/");
  };

  if (userInfoLoading) {
    return <NavSkeleton />;
  }

  const avatarSrc = userInfoQuery?.avatar ?? DefaultAvatarImage;

  return (
    <nav className={S.gnb}>
      <ul>
        {isLoginMode ? (
          <>
            <li className={S.nickname}>{userInfoQuery?.nickname}</li>
            <li>
              <Link href="/mypage" passHref>
                <Image
                  src={avatarSrc}
                  alt="avatar"
                  width={35}
                  height={35}
                  unoptimized
                />
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
