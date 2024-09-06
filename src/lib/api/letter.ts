import { Letters } from "@/types";
import axios from "axios";

const letterClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  headers: {
    "Content-Type": "application-json",
  },
});

//리스트 가져오기
export const getLetter = async () => {
  const { data } = await letterClient.get("/fanletter");
  return data;
};

//데이터 추가하기
export const createLetter = async (user: Letters) => {
  const response = await letterClient.post("/fanletter", user);
  return response;
};

//데이터 삭제하기
export const deleteLetter = async (id: string) => {
  await letterClient.delete(`/fanletter/${id}`);
  return id;
};

//데이터 수정하기
export const patchLetter = async (id: string, user: Letters) => {
  await letterClient.put(`/fanletter/${id}`, user);
  return id;
};
