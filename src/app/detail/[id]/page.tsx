"use client";
import S from "@/styles/style.module.scss";
import { Letters } from "@/types";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import { notoSansKr } from "@/assets/fonts/font";
import DefaultAvatarImage from "@/assets/images/profile-user.webp";
import useDataQueries from "@/hooks/queries/useQueryData";
import useMutationData from "@/hooks/mutations/useMutationData";

const Detail = () => {
  const { id } = useParams();
  const router = useRouter();
  const { userInfoQuery, lettersQuery } = useDataQueries();
  const { deleteMutate, editMutate } = useMutationData();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");

  const letterItem = lettersQuery?.find((item: Letters) => item.id === id);
  const imageSrc =
    userInfoQuery?.avatar || letterItem?.avatar || DefaultAvatarImage;
  const displayName = userInfoQuery?.nickname || letterItem?.nickname;
  const isAuthor = userInfoQuery?.id === letterItem?.userId;

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
    if (isAuthor) {
      if (confirm("정말로 삭제 하시겠습니까?")) {
        deleteMutate(id as string);
        toast.success("삭제 되었습니다.");
        router.push("/");
      }
    } else {
      toast.error("자신이 쓴 내용만 삭제할 수 있습니다.");
      setIsEditing(false);
    }
  };

  //수정버튼
  const handleEditLetter = () => {
    if (isAuthor) {
      setIsEditing(true);
      setTitle(letterItem?.title || "");
      setContent(letterItem?.content || "");
    } else {
      toast.error("자신이 쓴 내용만 수정 할 수 있습니다.");
      setIsEditing(false);
    }
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
      avatar: userInfoQuery?.avatar,
      nickname: userInfoQuery?.nickname,
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
      <section className={S.modal}>
        {/* <button>&times;</button> */}
        <div className={S.detailWrapper}>
          <div className={S.detailContent}>
            {!isEditing ? (
              <>
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
              </>
            ) : (
              <>
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
              </>
            )}
            <div className={S.detailUserInfo}>
              <p>작성자</p>
              <div>
                <Image
                  src={imageSrc}
                  alt={displayName}
                  width={40}
                  height={40}
                />
                <h3>{displayName}</h3>
              </div>
            </div>
          </div>
        </div>
        {/* <div>
          댓글내용입니다.
        </div> */}
      </section>
    </main>
  );
};

export default Detail;
