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
    const response = await axiosInstance.post("/login?expiresIn=30m", {
      id,
      password,
    });
    localStorage.setItem("accessToken", response.data.accessToken);
    return response.data;
  } catch (error) {
    console.log(error);
    alert("토큰 만료! 다시 로그인 해 주세요.");
  }
};

//유저정보 확인 (마이페이지, 프로필 수정할때)
export const getUserInfo = async () => {
  try {
    const response = await axiosInstance.get("/user", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
