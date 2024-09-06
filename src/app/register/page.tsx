"use client";
import { ChangeEvent, useId, useState } from "react";
import S from "@/styles/style.module.scss";
import { register } from "@/lib/api/auth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Register = () => {
  const id = useId();
  const router = useRouter();

  const [userId, setUserId] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");

  //회원가입
  const onClickSignUp = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await register({ id: userId, password, nickname });

    console.log(response);
    toast.success("회원가입 완료!");
    router.push("/login");
  };

  return (
    <main className={S.main}>
      <h2>회원가입 페이지 입니다.</h2>
      <form onSubmit={onClickSignUp}>
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
        <button type="submit">회원가입</button>
      </form>
      <Link href="/login">로그인하기</Link>
    </main>
  );
};

export default Register;
