export interface UserInfo {
  id: string;
  password: string;
  nickname?: string;
  avatar?: string;
}

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
