import { StaticImageData } from "next/image";

export interface UserInfo {
  id?: string;
  password?: string;
  nickname?: string;
  avatar?: string | null;
  imgFile?: File | null;
}

//임시(삭제예정)
export interface AuthState {
  userId: string;
  nickname: string;
  avatar: string;
  actions: {
    setUserId: (userId: string) => void;
    setNickname: (nickname: string) => void;
    setAvatar: (avatar: string) => void;
  };
}

export interface IsLoginMode {
  isLoginMode: boolean;
  actions: {
    setIsLoginMode: (state: boolean) => void;
  };
}

export interface UserState {
  userInfo: UserInfo | null;
  actions: {
    setUserInfo: (userInfo: UserInfo | null) => void;
  };
}

export interface Letters {
  id: string;
  title: string;
  content: string;
  nickname: string;
  avatar: string | null;
  writeTo: string;
  createdAt?: string;
  userId: string;
}

export interface LetterProps {
  item: Letters;
}

export interface LettersState {
  lettersInfo: Letters[];
  actions: {
    setLettersInfo: (letters: Letters[]) => void;
  };
}

export interface MembersState {
  selectedMember: string;
  actions: {
    setSelectedMember: (state: string) => void;
  };
}

//삭제예정
export interface Members {
  index: number;
  name: string;
  image: StaticImageData;
}
