"use client";
import Link from "next/link";
import Nav from "../layout/Nav";
import Image from "next/image";
import MainLogoImage from "@/assets/images/logo.svg";
import SubLogoImage from "@/assets/images/logo_black.svg";
import S from "@/styles/common.module.scss";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Header = () => {
  const pathname = usePathname();
  const isMainPage = pathname === "/";
  console.log("🚀 ~ Header ~ isMainPage:", isMainPage);
  const headerStyle = !isMainPage ? S.active : "";
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const secondSection = document.getElementById("second-section");
      if (secondSection) {
        const sectionTop = secondSection.getBoundingClientRect().top;
        if (sectionTop <= 30) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // isScrolled 상태가 변경될 때마다 로그 출력
  useEffect(() => {
    console.log("isScrolled:", isScrolled);
  }, [isScrolled]);

  const logoSrc = isMainPage
    ? isScrolled
      ? SubLogoImage
      : MainLogoImage
    : SubLogoImage;

  return (
    <div className={`${S.headerWrapper} ${headerStyle}`}>
      <header className={S.header}>
        <h1>
          <Link href="/">
            <Image src={logoSrc} alt="logo" priority />
          </Link>
        </h1>
        <Nav />
      </header>
    </div>
  );
};

export default Header;
