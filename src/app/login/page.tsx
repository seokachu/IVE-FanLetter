"use client";

import { login } from "@/lib/api/auth";
import S from "@/styles/common.module.scss";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useId, useState } from "react";
import { toast } from "react-toastify";
import { useIsLoginActions } from "@/shared/store/toggle-store";

const Login = () => {
  const id = useId();
  const router = useRouter();
  const { setIsLoginMode } = useIsLoginActions();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  //로그인
  const onClickSignIn = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await login({ id: userId, password });
    console.log(response);
    setIsLoginMode(true);
    toast.success("로그인 완료!");
    router.push("/");
  };

  return (
    <main className={S.main}>
      <h2>로그인 페이지 입니다.</h2>
      <form onSubmit={onClickSignIn}>
        <div>
          <label htmlFor={`${id}-userId`}>아이디</label>
          <input
            type="text"
            placeholder="example"
            id={`${id}-userId`}
            autoFocus
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <p>아이디를 4글자 이상으로 입력해 주세요.</p>
        </div>
        <div>
          <label htmlFor={`${id}-password`}>비밀번호</label>
          <input
            type="password"
            placeholder="******"
            id={`${id}-password`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p>비밀번호를 입력해주세요.</p>
        </div>
        <button type="submit">로그인</button>
      </form>
      <Link href="/register">회원가입하기</Link>
    </main>
  );
};

export default Login;
