"use client";
import { getLetter } from "@/lib/api/letter";
import { useQuery } from "@tanstack/react-query";
import LetterItems from "./LetterItems";
import { Letters } from "@/types";
import { useRouter } from "next/navigation";
import Loading from "../common/Loading";
import NotFoundPage from "@/app/not-found";
import S from "@/styles/style.module.scss";
import { useSelectedMember } from "@/shared/store/MemberCheck";

const LetterList = () => {
  const router = useRouter();
  const selectedMember = useSelectedMember();
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

  console.log(data);

  const handleItemClick = (id: string) => {
    router.push(`detail/${id}`);
  };

  const filteredLetters = selectedMember
    ? data?.filter((item: Letters) => item.writeTo === selectedMember)
    : [];

  return (
    <div className={S.letterListInner}>
      <ul>
        {filteredLetters?.length > 0 ? (
          filteredLetters.map((item: Letters) => (
            <li key={item.id} onClick={() => handleItemClick(item.id)}>
              <LetterItems item={item} />
            </li>
          ))
        ) : (
          <p>내용이 없습니다. {selectedMember}에게 메시지를 보내주세요!</p>
        )}
      </ul>
    </div>
  );
};

export default LetterList;
