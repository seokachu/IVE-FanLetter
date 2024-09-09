"use client";
import { deleteLetter, getLetter, patchLetter } from "@/lib/api/letter";
import S from "@/styles/style.module.scss";
import { Letters } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";
import DefaultAvatarImage from "@/assets/images/profile-user.webp";
import Image from "next/image";
import { notoSansKr } from "@/assets/fonts/font";

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
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");

  const imageSrc = query?.data?.avatar || DefaultAvatarImage;
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
        createdAt: letter.createdAt,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["letters"] });
    },
  });

  //validation
  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (e.target.value !== "") {
      setTitleError("");
    }
  };

  const handleContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    if (e.target.value !== "") {
      setContentError("");
    }
  };

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
    let hasError = false;

    if (!title?.trim()) {
      setTitleError("제목을 입력해 주세요.");
      hasError = true;
    }

    if (!content?.trim()) {
      setContentError("내용을 입력해 주세요.");
      hasError = true;
    }

    if (hasError) {
      return;
    }

    const isTitleUnChanged = title === letterItem?.title;
    const isContentUnChanged = content === letterItem?.content;

    if (isTitleUnChanged && isContentUnChanged) {
      toast.warning("변경된 사항이 없습니다.");
      return;
    }

    editMutate({
      ...letterItem,
      title,
      content,
      createdAt: letterItem.createdAt,
      avatar: letterItem.avatar,
      nickname: letterItem.nickname,
    });

    toast.success("수정 되었습니다.");
    setIsEditing(false);
    setTitleError("");
    setContentError("");
  };

  //취소버튼
  const handleCancel = () => {
    setIsEditing(false);
    toast.info("취소 되었습니다.");
  };

  return (
    <main className={S.main}>
      <section className={S.popup}>
        {/* <button>&times;</button> */}
        <div className={S.detailWrapper}>
          {!isEditing ? (
            <div className={S.detailContent}>
              <div className={S.DeleteAndEditButton}>
                <button onClick={handleEditLetter}>수정</button>
                <button onClick={handleDeleteLetter}>삭제</button>
              </div>
              <div className={S.letterWriteTo}>
                <h2>To {letterItem?.writeTo}</h2>
                <time>{letterItem?.createdAt}</time>
              </div>
              <div className={S.detailList}>
                <p>{letterItem?.title}</p>
                <p>{letterItem?.content}</p>
              </div>
              <div className={S.detailUserInfo}>
                <p>작성자</p>
                <div>
                  <Image src={imageSrc} alt={letterItem?.nickname} />
                  <h3>{letterItem?.nickname}</h3>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className={S.detailContent}>
                <div className={S.DeleteAndEditButton}>
                  <button onClick={handleEditLetterSubmit}>수정완료</button>
                  <button onClick={handleCancel}>취소</button>
                </div>
                <div className={S.letterWriteTo}>
                  <h2>To {letterItem?.writeTo}</h2>
                  <time>{letterItem?.createdAt}</time>
                </div>
                <div className={S.detailList}>
                  <input
                    type="text"
                    value={title}
                    onChange={handleTitle}
                    className={titleError ? `${S.error}` : ""}
                    autoFocus
                    maxLength={20}
                  />
                  <span>{titleError}</span>
                  <textarea
                    value={content}
                    onChange={handleContent}
                    maxLength={1000}
                    className={`${notoSansKr.className} ${
                      contentError ? S.error : ""
                    }`}
                  />
                  <span>{contentError}</span>
                </div>
                <div className={S.detailUserInfo}>
                  <p>작성자</p>
                  <div>
                    <Image src={imageSrc} alt={letterItem?.nickname} />
                    <h3>{letterItem?.nickname}</h3>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        {/* <div>
          댓글내용입니다.
        </div> */}
      </section>
    </main>
  );
};

export default Detail;
