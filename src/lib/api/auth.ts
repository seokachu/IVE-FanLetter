import { UserInfo } from "@/types";
import axiosInstance from "./authJWT";
import axios from "axios";

//회원가입
export const register = async ({ id, password, nickname }: UserInfo) => {
  try {
    const response = await axiosInstance.post("/register", {
      id,
      password,
      nickname,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.log(error?.response.data.message);
    }
  }
};

//로그인
export const login = async ({ id, password }: UserInfo) => {
  try {
    const response = await axiosInstance.post("/login?expiresIn=10m", {
      id,
      password,
    });
    localStorage.setItem("accessToken", response.data.accessToken);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.log(error?.response.data.message);
    }
  }
};

//유저정보 확인 (마이페이지)
export const getUserInfo = async () => {
  try {
    const response = await axiosInstance.get("/user", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.log(error?.response.data.message);
    }
  }
};

//마이페이지 프로필 수정
export const updateProfile = async ({ imgFile, nickname }: UserInfo) => {
  try {
    const formData = new FormData();
    if (imgFile) formData.append("avatar", imgFile);
    if (nickname) formData.append("nickname", nickname);

    const response = await axiosInstance.patch("/profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.log(error?.response.data.message);
    }
  }
};
