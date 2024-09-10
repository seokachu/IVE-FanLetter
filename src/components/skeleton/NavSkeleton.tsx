import S from "@/styles/common.module.scss";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const NavSkeleton = () => {
  return (
    <nav className={`${S.gnb} ${S.gnbSkeleton}`}>
      <ul>
        <li className={S.nickname}>
          <Skeleton width={90} height={30} />
        </li>
        <li>
          <Skeleton width={30} height={30} style={{ borderRadius: "50%" }} />
        </li>
        <li>
          <Skeleton width={70} height={30} />
        </li>
      </ul>
    </nav>
  );
};

export default NavSkeleton;
