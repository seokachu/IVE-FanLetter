import S from "@/styles/common.module.scss";

const Loading = () => {
  return (
    <div className={S.loading}>
      <h2>데이터를 불러오는 중입니다..!</h2>
      <p>서버가 느려요..잠시만 기다려 주세요🥲</p>
    </div>
  );
};

export default Loading;
