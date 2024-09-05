import Link from "next/link";
import Nav from "../layout/Nav";
import Image from "next/image";
import Logo from "@/assets/images/logo.svg";
import S from "@/styles/common.module.scss";

const Header = () => {
  return (
    <div className={S.headerWrapper}>
      <header className={S.header}>
        <h1>
          <Link href="/">
            <Image src={Logo} alt="IVE logo" priority />
          </Link>
        </h1>
        <Nav />
      </header>
    </div>
  );
};

export default Header;
