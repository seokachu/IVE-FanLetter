"use client";
import { ChangeEvent, useId, useState } from "react";
import S from "@/styles/style.module.scss";
import { register } from "@/lib/api/auth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { hiMelody } from "@/assets/fonts/font";

const Register = () => {
  const id = useId();
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const [userIdError, setUserIdError] = useState(
    "아이디를 4글자 이상 입력해 주세요."
  );
  const [nicknameError, setNicknameError] = useState(
    "닉네임을 1글자 이상 입력해 주세요."
  );
  const [passwordError, setPasswordError] = useState(
    "비밀번호를 4글자 이상 입력해 주세요."
  );
  const [passwordCheckError, setPasswordCheckError] = useState(
    "비밀번호를 4글자 이상 입력해 주세요."
  );

  const isFormValid =
    userId.trim().length >= 4 &&
    password.trim().length >= 4 &&
    nickname.trim().length >= 1 &&
    passwordCheck === password;

  //validation
  const handleUserId = (e: ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);

    if (e.target.value.length >= 4) {
      setUserIdError("");
    } else {
      setUserIdError("아이디를 4글자 이상 입력해 주세요.");
    }
  };

  const handleNickname = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);

    if (e.target.value.length >= 1) {
      setNicknameError("");
    } else {
      setNicknameError("닉네임을 1글자 이상 입력해 주세요.");
    }
  };

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);

    if (e.target.value.length >= 4) {
      setPasswordError("");
    } else {
      setPasswordError("비밀번호를 4글자 이상 입력해 주세요.");
    }
  };

  const handlePasswordCheck = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordCheck(e.target.value);

    if (e.target.value.length < 4) {
      setPasswordCheckError("비밀번호를 4글자 이상 입력해 주세요.");
      return;
    }

    //비밀번호 일치 여부 체크
    if (e.target.value !== password) {
      setPasswordCheckError("비밀번호가 일치하지 않습니다.");
    } else {
      setPasswordCheckError("");
    }
  };

  //회원가입 form
  const onClickSignUp = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isFormValid) {
      await register({ id: userId, password, nickname });
      toast.success("회원가입 완료!");
      setUserId("");
      setPassword("");
      setNickname("");
      setPasswordCheck("");
      setUserIdError("");
      setNicknameError("");
      setPasswordError("");
      setPasswordCheckError("");
      router.push("/login");
    }
  };

  return (
    <main className={S.main}>
      <section className={`${S.registerWrapper} ${S.loginWrapper}`}>
        <h2 className={hiMelody.className}>회원가입 페이지 입니다.</h2>
        <form onSubmit={onClickSignUp}>
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
                maxLength={10}
                className={userIdError ? S.error : S.success}
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
                maxLength={10}
                className={passwordError ? S.error : S.success}
              />
              <p>{passwordError}</p>
            </div>
            <div>
              <label htmlFor={`${id}-password`}>비밀번호확인</label>
              <input
                type="password"
                placeholder="&lowast;&lowast;&lowast;&lowast;&lowast;&lowast;"
                id={`${id}-password`}
                value={passwordCheck}
                onChange={handlePasswordCheck}
                maxLength={10}
                className={passwordCheckError ? S.error : S.success}
              />
              <p>{passwordCheckError}</p>
            </div>
            <div>
              <label htmlFor={`${id}-nickname`}>닉네임</label>
              <input
                type="text"
                placeholder="닉네임을 입력해 주세요."
                id={`${id}-nickname`}
                value={nickname}
                onChange={handleNickname}
                maxLength={10}
                className={nicknameError ? S.error : S.success}
              />
              <p>{nicknameError}</p>
            </div>
          </div>
          <button type="submit" className={isFormValid ? S.active : ""}>
            회원가입
          </button>
        </form>
        <Link href="/login">로그인하기</Link>
      </section>
    </main>
  );
};

export default Register;
