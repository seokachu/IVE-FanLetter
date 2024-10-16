"use client";
import { membersData } from "@/data/members";
import MembersAvatar from "./MembersAvatar";
import { ChangeEvent, useId, useState } from "react";
import {
  useSelectedActions,
  useSelectedMember,
} from "@/shared/store/MemberCheck";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Letters } from "@/types";
import { createLetter } from "@/lib/api/letter";
import { getFormattedDate } from "@/utils/date";
import { toast } from "react-toastify";
import S from "@/styles/style.module.scss";
import { hiMelody, notoSansKr } from "@/assets/fonts/font";
import useDataQueries from "@/hooks/queries/useQueryData";

const LetterForm = () => {
  const id = useId();
  const queryClient = useQueryClient();
  const selectedMember = useSelectedMember();
  const { setSelectedMember } = useSelectedActions();
  const { userInfoQuery } = useDataQueries();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");

  //등록하기 query
  const createMembersLetter = useMutation({
    mutationFn: (user: Letters) => createLetter(user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["letters"] });
    },
  });

  //멤버 선택 이벤트 함수
  const handleMemberSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedMember(e.target.value);
  };

  //폼 검사 반영 value
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

  //등록하기 함수
  const handleLetterSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const date = getFormattedDate(new Date());

    if (!userInfoQuery) {
      toast.error("로그인 후 입력해 주세요.");
      return;
    }

    if (!title?.trim()) {
      setTitleError("제목을 입력해 주세요.");
    }

    if (!content?.trim()) {
      setContentError("내용을 입력해 주세요.");
    }

    if (title && content) {
      const newLetter = {
        id: crypto.randomUUID(),
        title,
        nickname: userInfoQuery?.nickname,
        content,
        avatar: userInfoQuery?.avatar,
        writeTo: selectedMember,
        createdAt: date,
        userId: userInfoQuery?.id,
      };
      createMembersLetter.mutate(newLetter);
      toast.success("내용이 등록 되었습니다.");
      setTitle("");
      setContent("");
      setTitleError("");
      setContentError("");
    }
  };

  return (
    <section className={S.LetterFormWrapper}>
      <h2 className={hiMelody.className}>
        IVE에게 응원의 메시지를 남겨주세요!
      </h2>
      <MembersAvatar />
      <form onSubmit={handleLetterSubmit}>
        <div className={S.selectedArtist}>
          <select onChange={handleMemberSelect} value={selectedMember}>
            {membersData.map((item) => (
              <option value={item.name} key={item.index}>
                {item.name}
              </option>
            ))}
          </select>
          <p>에게 한마디!</p>
        </div>
        <div className={S.formTitle}>
          <div>
            <label htmlFor={`${id}-title`}>제목</label>
            <input
              type="text"
              id={`${id}-title`}
              placeholder="최대 20글자까지 작성할 수 있습니다."
              maxLength={20}
              autoFocus
              value={title}
              onChange={handleTitle}
              className={titleError ? `${S.error}` : ""}
            />
          </div>
          <span>{titleError}</span>
        </div>
        <div className={S.formContent}>
          <div>
            <label htmlFor={`${id}-content`}>내용</label>
            <textarea
              className={`${notoSansKr.className} ${
                contentError ? S.error : ""
              }`}
              placeholder="최대 1000글자까지 작성할 수 있습니다."
              maxLength={1000}
              value={content}
              onChange={handleContent}
            />
          </div>
          <span>{contentError}</span>
        </div>
        <button type="submit">등록하기</button>
      </form>
    </section>
  );
};

export default LetterForm;
