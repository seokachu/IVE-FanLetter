import S from "@/styles/style.module.scss";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MypageSkeleton = () => {
  return (
    <main className={S.main}>
      <div className={S.myPageWrapper}>
        <Skeleton width={300} height={40} />
        <form>
          <div className={S.mypageImage}>
            <Skeleton
              width={100}
              height={100}
              style={{ borderRadius: "50%" }}
            />
          </div>
          <div className={S.mypageInfo}>
            <Skeleton width={200} height={40} />
            <Skeleton width={50} height={40} />
          </div>
        </form>
      </div>
    </main>
  );
};

export default MypageSkeleton;
