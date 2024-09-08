import { Letters } from "@/types";
import axios from "axios";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_DEV_URL;

const letterClient = axios.create({
  baseURL: SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

//리스트 가져오기
export const getLetter = async () => {
  try {
    const { data } = await letterClient.get("/fanletter");
    return data;
  } catch (error) {
    console.log(error);
  }
};

//데이터 추가하기
export const createLetter = async (user: Letters) => {
  try {
    const { data } = await letterClient.post("/fanletter", user);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

//데이터 삭제하기
export const deleteLetter = async (id: string) => {
  try {
    await letterClient.delete(`/fanletter/${id}`);
    return id;
  } catch (error) {
    console.log(error);
  }
};

//데이터 수정하기
export const patchLetter = async (id: string, user: Letters) => {
  try {
    await letterClient.put(`/fanletter/${id}`, user);
    return id;
  } catch (error) {
    console.log(error);
  }
};
