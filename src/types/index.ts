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
    setUserInfo: (userInfo: UserInfo) => void;
  };
}

export interface Letters {
  avatar: string;
  content: string;
  id: string;
  nickname: string;
  title: string;
  writeTo: string;
  createdAt: string; //수정
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
