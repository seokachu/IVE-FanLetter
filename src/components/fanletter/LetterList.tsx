"use client";

import LetterItems from "./LetterItems";
import { Letters } from "@/types";
import { useRouter } from "next/navigation";
import Loading from "../common/Loading";
import S from "@/styles/style.module.scss";
import { useSelectedMember } from "@/shared/store/MemberCheck";
import useDataQueries from "@/hooks/queries/useQueryData";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchLetter } from "@/lib/api/letter";

const LetterList = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const selectedMember = useSelectedMember();
  const { userInfoQuery, lettersQuery, lettersIsLoading } = useDataQueries();
  const [updateLetters, setUpdateLetters] = useState(null);

  const { mutate: editMutate } = useMutation({
    mutationFn: async (letter: Letters) =>
      await patchLetter(letter.id, {
        id: letter.id,
        title: letter.title,
        content: letter.content,
        writeTo: letter.writeTo,
        nickname: letter.nickname,
        avatar: letter.avatar,
        userId: letter.userId,
        createdAt: letter.createdAt,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["letters"] });
    },
  });

  useEffect(() => {
    if (userInfoQuery && lettersQuery) {
      const userId = userInfoQuery?.id;

      const updated = lettersQuery.map((letter: Letters) => {
        if (letter.userId === userId)
          editMutate({
            ...letter,
            nickname: userInfoQuery.nickname,
            avatar: userInfoQuery.avatar,
          });
        return letter;
      });
      setUpdateLetters(updated);
    }
  }, [userInfoQuery, lettersQuery, editMutate]);

  if (lettersIsLoading) {
    return <Loading />;
  }

  const handleItemClick = (id: string) => {
    router.push(`detail/${id}`);
  };

  const displayData = updateLetters || lettersQuery;
  const filteredLetters = selectedMember
    ? displayData?.filter((item: Letters) => item.writeTo === selectedMember)
    : [];

  return (
    <section className={S.letterListInner}>
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
    </section>
  );
};

export default LetterList;
