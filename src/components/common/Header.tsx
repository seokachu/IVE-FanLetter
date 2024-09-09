"use client";
import Link from "next/link";
import Nav from "../layout/Nav";
import Image from "next/image";
import Logo from "@/assets/images/logo.svg";
import S from "@/styles/common.module.scss";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  const isMainPage = pathname === "/";
  const headerStyle = !isMainPage ? S.active : "";

  return (
    <div className={`${S.headerWrapper} ${headerStyle}`}>
      <header className={S.header}>
        <h1>
          <Link href="/">
            {/* <Image src={Logo} alt="IVE logo" priority /> */}
            <Logo color={"red"} width={100} height={30} />
          </Link>
        </h1>
        <Nav />
      </header>
    </div>
  );
};

export default Header;
