"use client";
import { deleteLetter, getLetter, patchLetter } from "@/lib/api/letter";
import S from "@/styles/common.module.scss";
import { Letters } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const Detail = () => {
  const { id } = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  //데이터 불러오기
  const query = useQuery({
    queryKey: ["letters"],
    queryFn: getLetter,
  });

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  console.log(query);
  const letterItem = query?.data?.find((item: Letters) => item.id === id);

  //삭제 query
  const { mutate: deleteMutate } = useMutation({
    mutationFn: (id: string) => deleteLetter(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["letters"] });
    },
  });

  //수정 query
  const { mutate: editMutate } = useMutation({
    mutationFn: async (letter: Letters) =>
      await patchLetter(letter.id, {
        id: letter.id,
        title: letter.title,
        content: letter.content,
        writeTo: letter.writeTo,
        nickname: letter.nickname,
        avatar: letter.avatar,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["letters"] });
    },
  });

  //삭제버튼
  const handleDeleteLetter = () => {
    if (confirm("정말로 삭제 하시겠습니까?")) {
      deleteMutate(id as string);
      toast.success("삭제 되었습니다.");
      router.push("/");
    }
  };

  //수정버튼
  const handleEditLetter = () => {
    setIsEditing(true);
    setTitle(letterItem?.title || "");
    setContent(letterItem?.content || "");
  };

  //수정완료 버튼
  const handleEditLetterSubmit = () => {
    if (letterItem) {
      editMutate({
        ...letterItem,
        title,
        content,
        nickname: query?.data?.nickname,
        avatar: query?.data?.avatar,
      });
      toast.success("수정 되었습니다.");
    }
    setIsEditing(false);
  };

  //취소버튼
  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <main className={S.main}>
      <section>
        {!isEditing ? (
          <>
            <div>
              <h2>To {letterItem?.writeTo}</h2>
              <div>
                <p>{letterItem?.avatar}</p>
                <h3>{letterItem?.nickname}</h3>
              </div>
              <div>
                <time>{letterItem?.createdAt}</time>
              </div>
            </div>
            <div>
              <p>{letterItem?.title}</p>
              <p>{letterItem?.content}</p>
            </div>
            <button onClick={handleEditLetter}>수정</button>
            <button onClick={handleDeleteLetter}>삭제</button>
          </>
        ) : (
          <>
            <div>
              <h2>To {letterItem?.writeTo}</h2>
              <div>
                <p>{letterItem?.avatar}</p>
                <h3>{letterItem?.nickname}</h3>
              </div>
              <div>
                <time>{letterItem?.createdAt}</time>
              </div>
            </div>
            <div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <button onClick={handleEditLetterSubmit}>수정완료</button>
            <button onClick={handleCancel}>취소</button>
          </>
        )}
      </section>
    </main>
  );
};

export default Detail;
