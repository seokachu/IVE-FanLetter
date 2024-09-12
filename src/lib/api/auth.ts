import { UserInfo } from "@/types";
import axiosInstance from "./authJWT";
import axios from "axios";

//회원가입
export const register = async ({ id, password, nickname }: UserInfo) => {
  try {
    const { data } = await axiosInstance.post("/register", {
      id,
      password,
      nickname,
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error?.response.data.message);
    } else {
      throw new Error("회원가입 중 알 수 없는 오류가 발생했습니다.");
    }
  }
};

//로그인
export const login = async ({ id, password }: UserInfo) => {
  try {
    const { data } = await axiosInstance.post("/login?expiresIn=5s", {
      id,
      password,
    });
    localStorage.setItem("accessToken", data.accessToken);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error?.response.data.message);
    } else {
      throw new Error("로그인 중 알 수 없는 오류가 발생했습니다.");
    }
  }
};

//유저정보 확인
export const getUserInfo = async () => {
  try {
    const { data } = await axiosInstance.get("/user", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error?.response.data.message);
    } else {
      throw new Error("알 수 없는 오류가 발생했습니다.");
    }
  }
};

//마이페이지 프로필 수정
export const updateProfile = async ({ imgFile, nickname }: UserInfo) => {
  try {
    const formData = new FormData();
    if (imgFile) formData.append("avatar", imgFile);
    if (nickname) formData.append("nickname", nickname);

    const { data } = await axiosInstance.patch("/profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error?.response.data.message);
    } else {
      throw new Error("알 수 없는 오류가 발생했습니다.");
    }
  }
};
