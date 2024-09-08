"use client";
import { membersData } from "@/data/members";
import MembersAvatar from "./MembersAvatar";
import { ChangeEvent, useId } from "react";
import {
  useSelectedActions,
  useSelectedMember,
} from "@/shared/store/MemberCheck";

const LetterForm = () => {
  const id = useId();
  const selectedMember = useSelectedMember();
  const { setSelectedMember } = useSelectedActions();

  const handleMemberSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedMember(e.target.value);
  };

  const handleLetterSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
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
          />
        </div>
        <div>
          <label htmlFor={`${id}-content`}>내용</label>
          <textarea
            placeholder="최대 100자까지 작성할 수 있습니다."
            maxLength={100}
          />
        </div>
        <button type="submit">등록하기</button>
      </form>
    </div>
  );
};

export default LetterForm;
