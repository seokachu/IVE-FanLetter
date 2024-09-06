"use client";
import { getLetter } from "@/lib/api/letter";
import { useQuery } from "@tanstack/react-query";
import LetterItems from "./LetterItems";
import { Letters } from "@/types";
import { useRouter } from "next/navigation";
import { useLetterActions } from "@/shared/store/letterListStore";

const LetterList = () => {
  const router = useRouter();
  const { setLettersInfo } = useLetterActions();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["letters"],
    queryFn: getLetter,
  });

  console.log(data);
  setLettersInfo(data);

  if (isLoading) {
    <div>로딩 중 입니다</div>;
  }
  if (isError) {
    <div>오류가 발생했습니다.</div>;
  }

  const handleItemClick = (id: string) => {
    router.push(`detail/${id}`);
  };

  return (
    <div>
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
