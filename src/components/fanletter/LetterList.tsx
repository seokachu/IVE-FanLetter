"use client";
import { getLetter } from "@/lib/api/letter";
import { useQuery } from "@tanstack/react-query";
import LetterItems from "./LetterItems";
import { Letters } from "@/types";
import { useRouter } from "next/navigation";
import Loading from "../common/Loading";
import NotFoundPage from "@/app/not-found";
import S from "@/styles/style.module.scss";

const LetterList = () => {
  const router = useRouter();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["letters"],
    queryFn: getLetter,
  });

  if (isLoading) {
    <Loading />;
  }
  if (isError) {
    <NotFoundPage />;
  }

  const handleItemClick = (id: string) => {
    router.push(`detail/${id}`);
  };

  return (
    <div className={S.letterListInner}>
      <ul>
        {data?.map((item: Letters) => (
          <li key={item.id} onClick={() => handleItemClick(item.id)}>
            <LetterItems item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LetterList;
