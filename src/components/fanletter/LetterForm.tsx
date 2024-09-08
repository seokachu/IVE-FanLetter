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

const LetterForm = () => {
  const id = useId();
  const queryClient = useQueryClient();
  const selectedMember = useSelectedMember();
  const { setSelectedMember } = useSelectedActions();
  const [title, setTitle] = useState("");
  const [nickname, setNickname] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [content, setContent] = useState("");

  //등록하기 query
  const createMembersLetter = useMutation({
    mutationFn: (user: Letters) => createLetter(user),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["letters"] });
      console.log(data);
    },
  });

  //멤버 선택 이벤트 함수
  const handleMemberSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedMember(e.target.value);
  };

  //등록하기 함수
  const handleLetterSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const date = getFormattedDate(new Date());

    if (!title?.trim()) {
      toast.error("제목을 입력해 주세요");
    }

    if (!content?.trim()) {
      toast.error("내용을 입력해 주세요.");
    }

    if (title && content) {
      const newLetter = {
        id: crypto.randomUUID(),
        title,
        nickname,
        content,
        avatar,
        writeTo: selectedMember,
        createdAt: date,
      };
      createMembersLetter.mutate(newLetter);
      toast.success("내용이 등록 되었습니다.");
    }
  };

  return (
    <div>
      <h2>IVE에게 응원의 메시지를 남겨주세요</h2>
      <MembersAvatar />
      <form onSubmit={handleLetterSubmit}>
        <select onChange={handleMemberSelect} value={selectedMember}>
          {membersData.map((item) => (
            <option value={item.name} key={item.index}>
              {item.name}
            </option>
          ))}
        </select>
        <div>
          <label htmlFor={`${id}-title`}>제목</label>
          <input
            type="text"
            id={`${id}-title`}
            placeholder="최대 20글자까지 작성할 수 있습니다."
            maxLength={20}
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor={`${id}-content`}>내용</label>
          <textarea
            placeholder="최대 100자까지 작성할 수 있습니다."
            maxLength={100}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button type="submit">등록하기</button>
      </form>
    </div>
  );
};

export default LetterForm;
