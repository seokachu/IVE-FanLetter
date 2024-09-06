"use client";
import { useLetterInfo } from "@/shared/store/letterListStore";
import S from "@/styles/common.module.scss";
import { Letters } from "@/types";
import { useParams } from "next/navigation";

const Detail = () => {
  const { id } = useParams();
  const letterInfo = useLetterInfo();

  console.log(letterInfo);
  const letterItem = letterInfo?.find((item: Letters) => item.id === id);

  console.log(letterItem);

  return (
    <main className={S.main}>
      <section>
        <div>
          <h2>To {letterItem?.writeTo}</h2>
          <div>
            <p>{letterItem?.avatar}</p>
            <h3>{letterItem?.nickname}</h3>
          </div>
          <div>
            <time>{letterItem?.createAt}</time>
          </div>
        </div>
        <div>
          <p>{letterItem?.title}</p>
          <p>{letterItem?.content}</p>
        </div>
      </section>
    </main>
  );
};

export default Detail;
