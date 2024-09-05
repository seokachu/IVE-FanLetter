"use client";
import React, { useId, useState } from "react";
import S from "@/styles/style.module.scss";
import { login, register } from "@/lib/api/auth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Register = () => {
  const id = useId();
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [isLoginMode, setIsLoginMode] = useState(true);

  //회원가입
  const onClickSignUp = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const response = await register({ id: userId, password, nickname });

    console.log(response);
    toast.success("회원가입 완료!");
    router.push("/");
  };

  //로그인
  const onClickSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const response = await login({ id: userId, password });
    console.log(response);
    toast.success("로그인 완료!");
    router.push("/");
  };

  return (
    <main className={S.main}>
      <h2>
        {isLoginMode ? "회원가입 페이지 입니다." : "로그인 페이지 입니다."}
      </h2>
      <form>
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
        {isLoginMode ? (
          <>
            <div>
              <label htmlFor={`${id}-nickname`}>닉네임</label>
              <input
                type="text"
                placeholder="닉네임을 입력해 주세요."
                id={`${id}-nickname`}
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
              <p>닉네임을 입력해주세요.</p>
            </div>
            <button onClick={onClickSignUp}>회원가입</button>
          </>
        ) : (
          <button onClick={onClickSignIn}>로그인</button>
        )}
      </form>
      <button onClick={() => setIsLoginMode(!isLoginMode)}>
        {isLoginMode ? "로그인하기" : "회원가입하기"}
      </button>
    </main>
  );
};

export default Register;
