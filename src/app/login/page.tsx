"use client";

import { login } from "@/lib/api/auth";
import S from "@/styles/style.module.scss";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useId, useState } from "react";
import { toast } from "react-toastify";
import { useIsLoginActions } from "@/shared/store/toggleStore";
import { useUserActions } from "@/shared/store/userStore";
import { hiMelody } from "@/assets/fonts/font";

const Login = () => {
  const id = useId();
  const router = useRouter();
  const { setIsLoginMode } = useIsLoginActions();
  const { setUserInfo } = useUserActions();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [avatar, setAvatar] = useState("");
  const [userIdError, setUserIdError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const isFormValid = userId.trim().length >= 4 && password.trim().length >= 4;

  //validation
  const handleUserId = (e: ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
    if (e.target.value !== "") {
      setUserIdError("");
    }
  };

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (e.target.value !== "") {
      setPasswordError("");
    }
  };

  //로그인 제출 form
  const onClickSignIn = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userId.trim()) {
      setUserIdError("아이디를 입력해 주세요.");
    } else if (userId.length < 4) {
      setUserIdError("아이디를 4글자 이상 입력해 주세요.");
    }

    if (!password.trim()) {
      setPasswordError("비밀번호를 입력해 주세요.");
    } else if (password.length < 4) {
      setPasswordError("비밀번호를 4글자 이상 입력해 주세요.");
    }

    if (isFormValid) {
      try {
        const response = await login({
          id: userId,
          password,
          nickname,
          avatar,
        });
        setIsLoginMode(true);
        setUserInfo(response);
        setUserIdError("");
        setPasswordError("");
        toast.success("로그인 완료!");
        router.push("/");
        console.log(response);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("알 수 없는 오류가 발생했습니다.");
        }
      }
    }
  };

  return (
    <main className={S.main}>
      <section className={S.loginWrapper}>
        <h2 className={hiMelody.className}>로그인 페이지 입니다.</h2>
        <form onSubmit={onClickSignIn}>
          <div>
            <div>
              <label htmlFor={`${id}-userId`}>아이디</label>
              <input
                type="text"
                placeholder="example"
                id={`${id}-userId`}
                autoFocus
                value={userId}
                onChange={handleUserId}
                className={userIdError ? S.error : ""}
                maxLength={10}
              />
              <p>{userIdError}</p>
            </div>
            <div>
              <label htmlFor={`${id}-password`}>비밀번호</label>
              <input
                type="password"
                placeholder="&lowast;&lowast;&lowast;&lowast;&lowast;&lowast;"
                id={`${id}-password`}
                value={password}
                onChange={handlePassword}
                className={passwordError ? S.error : ""}
                maxLength={15}
              />
              <p>{passwordError}</p>
            </div>
          </div>
          <button type="submit" className={isFormValid ? S.active : ""}>
            로그인
          </button>
        </form>
        <Link href="/register">회원가입하기</Link>
      </section>
    </main>
  );
};

export default Login;
