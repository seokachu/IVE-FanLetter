import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareGithub, faBlogger } from "@fortawesome/free-brands-svg-icons";
import S from "@/styles/common.module.scss";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className={S.footer}>
      <address>
        <p>2024&copy;seokachu</p>
        <div>
          <Link
            href="https://github.com/seokachu/IVE-FanLetter"
            target="_blank"
          >
            <FontAwesomeIcon icon={faSquareGithub} />
          </Link>
          <Link href="https://seokachu.tistory.com/" target="_blank">
            <FontAwesomeIcon icon={faBlogger} />
          </Link>
        </div>
      </address>
    </footer>
  );
};

export default Footer;
