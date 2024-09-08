import { LetterProps } from "@/types";
import S from "@/styles/style.module.scss";
import Image from "next/image";
import DefaultAvatarImage from "@/assets/images/profile-user.webp";

const LetterItems = ({ item }: LetterProps) => {
  const { createdAt, nickname, title, content, avatar } = item;
  const avatarSrc = avatar || DefaultAvatarImage;

  return (
    <div className={S.letterListItem}>
      <div className={S.letterItemUserInfo}>
        <div>
          <Image src={avatarSrc} alt={nickname} width={50} height={50} />
          <h3>{nickname}</h3>
        </div>
        <time>{createdAt}</time>
      </div>
      <div className={S.letterItemContent}>
        <p>{title}</p>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default LetterItems;
