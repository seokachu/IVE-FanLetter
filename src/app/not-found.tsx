import S from "@/styles/common.module.scss";
import Image from "next/image";
import Link from "next/link";
import NotFoundPageImage from "@/assets/images/sorry_image.avif";

const NotFoundPage = () => {
  return (
    <div className={S.notFound}>
      <Image src={NotFoundPageImage} alt="잘못된 경로입니다." />
      <h1>죄송합니다. 이 페이지는 없거나 삭제되었습니다.</h1>
      <p>메인페이지로 이동해 주세요.</p>
      <Link href="/">메인페이지로 이동하기</Link>
    </div>
  );
};

export default NotFoundPage;
