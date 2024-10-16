"use client";
import { updateProfile } from "@/lib/api/auth";
import S from "@/styles/style.module.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { ChangeEvent, useId, useRef, useState } from "react";
import { toast } from "react-toastify";
import DefaultAvatarImage from "@/assets/images/profile-user.webp";
import MypageSkeleton from "@/components/skeleton/MypageSkeleton";
import { useUserActions } from "@/shared/store/userStore";
import useDataQueries from "@/hooks/queries/useQueryData";

const Mypage = () => {
  const id = useId();
  const queryClient = useQueryClient();
  const { setUserInfo } = useUserActions();
  const { userInfoQuery, userInfoLoading } = useDataQueries();

  const [nickname, setNickname] = useState(userInfoQuery?.nickname);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const [nicknameError, setNicknameError] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  //사용자 업데이트 query
  const updateUser = useMutation({
    mutationFn: ({
      imgFile,
      nickname,
    }: {
      imgFile: File | null;
      nickname: string;
    }) => updateProfile({ imgFile, nickname }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userInfo"] });
    },
    onError: () => {
      toast.error("업데이트 실패. 다시 시도해 주세요.");
    },
  });

  //이미지 클릭 버튼 핸들러
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  //파일 수정 버튼 - 클릭시 바로 적용할 수 있도록 랜더링
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      // 파일이 선택되면 서버에 업데이트 요청
      updateUser.mutate({ imgFile: file, nickname });
      setUserInfo({ imgFile: file, nickname });
      toast.success("이미지 변경 완료!");
    }
  };

  //닉네임 수정 버튼
  const onClickUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setNickname(userInfoQuery?.nickname);
    setIsUpdate(true);
  };

  //닉네임 수정 validation
  const handleEdit = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    if (e.target.value !== "") {
      setNicknameError("");
    }
  };

  //닉네임 수정완료 버튼
  const handleUpdateProfile = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    if (!nickname.trim()) {
      setNicknameError("닉네임을 입력해 주세요.");
      return;
    }

    try {
      if (confirm("정말로 수정하시겠습니까?")) {
        if (nickname === userInfoQuery?.nickname) {
          toast.warning("수정된 내용이 없습니다.");
          setIsUpdate(false);
        } else {
          updateUser.mutate({ imgFile: userInfoQuery?.avatar, nickname });
          toast.success("닉네임이 수정 되었습니다.");
          setNicknameError("");
          setUserInfo({ imgFile: userInfoQuery?.avatar, nickname });
          setIsUpdate(false);
        }
      }
    } catch (error) {
      toast.error("닉네임 업데이트 실패. 다시 시도해주세요.");
    }
  };

  if (userInfoLoading) {
    return <MypageSkeleton />;
  }

  return (
    <main className={S.main}>
      <div className={S.myPageWrapper}>
        <h2>{userInfoQuery?.nickname}님의 프로필</h2>
        <form>
          <div className={S.mypageImage}>
            <Image
              src={preview || userInfoQuery?.avatar || DefaultAvatarImage}
              alt="avatar"
              width={100}
              height={100}
              onClick={handleImageClick}
              unoptimized
            />
            <input
              ref={fileInputRef}
              type="file"
              onChange={(e) => handleFileChange(e)}
              accept="image/*"
            />
          </div>
          {!isUpdate ? (
            <div className={S.mypageInfo}>
              <p id={`${id}-nickname`}>{userInfoQuery?.nickname}</p>
              <button onClick={onClickUpdate}>수정</button>
            </div>
          ) : (
            <div className={`${S.mypageInfo} ${S.active}`}>
              <div>
                <div>
                  <input
                    type="text"
                    value={nickname}
                    onChange={handleEdit}
                    autoFocus
                    maxLength={10}
                  />
                  <p>{nicknameError}</p>
                </div>
              </div>
              <button onClick={handleUpdateProfile}>수정완료</button>
            </div>
          )}
        </form>
      </div>
    </main>
  );
};

export default Mypage;
