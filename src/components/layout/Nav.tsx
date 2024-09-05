import React from "react";
import S from "@/styles/common.module.scss";

const Nav = () => {
  return (
    <nav className={S.gnb}>
      <ul>
        <li>로그인</li>
        <li>회원가입</li>
        <li>마이페이지</li>
      </ul>
    </nav>
  );
};

export default Nav;
