import { LetterProps } from "@/types";
import S from "@/styles/style.module.scss";
import Image from "next/image";
import DefaultAvatarImage from "@/assets/images/profile-user.webp";
import { useIsLoginMode } from "@/shared/store/toggleStore";
import { useUserInfo } from "@/shared/store/userStore";

const LetterItems = ({ item }: LetterProps) => {
  const { title, content, nickname, avatar, createdAt } = item;
  const isLoginMode = useIsLoginMode();
  const userInfo = useUserInfo();

  console.log(userInfo);

  // 기본적으로 각 글의 작성자 정보 사용
  let avatarSrc = avatar || DefaultAvatarImage;
  let displayName = nickname;

  // 만약 로그인한 유저가 현재 글을 쓴 작성자라면 최신 정보로 덮어쓰기
  if (userInfo?.nickname === nickname) {
    avatarSrc = userInfo?.avatar || DefaultAvatarImage;
    displayName = userInfo?.nickname;
  }

  return (
    <div className={S.letterListItem}>
      <div className={S.letterItemUserInfo}>
        <div>
          <Image src={avatarSrc} alt={displayName} width={50} height={50} />
          <h3>{displayName}</h3>
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
