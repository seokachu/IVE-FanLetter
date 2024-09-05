import S from "@/styles/common.module.scss";
import Link from "next/link";
import DefaultAvatarImage from "@/assets/images/profile-user.webp";
import Image from "next/image";

const Nav = () => {
  return (
    <nav className={S.gnb}>
      <ul>
        <li>
          <Link href="/login">로그인</Link>
        </li>
        <li>
          <Link href="/">회원가입</Link>
        </li>
        <li>
          <Link href="/mypage">
            <Image src={DefaultAvatarImage} alt="avatar" />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
