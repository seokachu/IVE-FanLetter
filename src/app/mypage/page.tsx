"use client";
import { updateProfile } from "@/lib/api/auth";
import { useUserActions, useUserInfo } from "@/shared/store/userStore";
import S from "@/styles/common.module.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { ChangeEvent, useId, useState } from "react";
import { toast } from "react-toastify";
import DefaultAvatarImage from "@/assets/images/profile-user.webp";

const Mypage = () => {
  const id = useId();
  const queryClient = useQueryClient();
  const userInfo = useUserInfo();
  const { setUserInfo } = useUserActions();
  const [nickname, setNickname] = useState(userInfo?.nickname || "");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUpdate, setIsUpdate] = useState(false);

  //사용자 업데이트 query
  const updateUser = useMutation({
    mutationFn: ({
      imgFile,
      nickname,
    }: {
      imgFile: File | null;
      nickname: string;
    }) => updateProfile({ imgFile, nickname }),
    onSuccess: (updateUserInfo) => {
      queryClient.invalidateQueries({ queryKey: ["userInfo"] });
      setUserInfo(updateUserInfo);
    },
    onError: () => {
      toast.error("업데이트 실패. 다시 시도해 주세요.");
    },
  });

  //파일 수정 버튼 - 클릭시 바로 적용할 수 있도록 랜더링
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      // 파일이 선택되면 서버에 업데이트 요청
      updateUser.mutate({ imgFile: file, nickname });
      toast.success("이미지 변경 완료!");
    }
  };

  //닉네임 수정 버튼
  const onClickUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setNickname(userInfo?.nickname || "");
    setIsUpdate(true);
  };

  //닉네임 수정완료 버튼
  const handleUpdateProfile = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    try {
      if (confirm("정말로 수정하시겠습니까?")) {
        if (nickname === userInfo?.nickname) {
          toast.warning("수정된 내용이 없습니다.");
          setIsUpdate(false);
        } else {
          updateUser.mutate({ imgFile: avatar, nickname });
          toast.success("닉네임이 수정 되었습니다.");
          setIsUpdate(false);
        }
      }
    } catch (error) {
      toast.error("닉네임 업데이트 실패. 다시 시도해주세요.");
    }
  };

  //FIXME - 로딩 스켈레톤 추가 예정

  return (
    <main className={S.main}>
      <h2>{userInfo?.nickname}님의 프로필</h2>
      <form>
        <div>
          <Image
            src={preview || userInfo?.avatar || DefaultAvatarImage}
            alt="avatar"
            width={35}
            height={35}
          />
          <input
            type="file"
            onChange={(e) => handleFileChange(e)}
            accept="image/*"
          />
        </div>
        {!isUpdate ? (
          <>
            <div>
              <label htmlFor={`${id}-nickname`}>닉네임</label>
              <p id={`${id}-nickname`}>{userInfo?.nickname}</p>
            </div>
            <button onClick={onClickUpdate}>닉네임 수정</button>
          </>
        ) : (
          <>
            <div>
              <label htmlFor={`${id}-nickname`}>닉네임</label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </div>
            <button onClick={handleUpdateProfile}>수정완료</button>
          </>
        )}
      </form>
    </main>
  );
};

export default Mypage;
