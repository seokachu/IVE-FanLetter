export interface UserInfo {
  id: string;
  password: string;
  nickname?: string;
  avatar?: string;
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
