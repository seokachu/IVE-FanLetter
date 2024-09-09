"use client";
import Link from "next/link";
import Nav from "../layout/Nav";
import Image from "next/image";
import MainLogoImage from "@/assets/images/logo.svg";
import SubLogoImage from "@/assets/images/logo_black.svg";
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
            <Image
              src={!headerStyle ? MainLogoImage : SubLogoImage}
              alt="logo"
              priority
            />
          </Link>
        </h1>
        <Nav />
      </header>
    </div>
  );
};

export default Header;
