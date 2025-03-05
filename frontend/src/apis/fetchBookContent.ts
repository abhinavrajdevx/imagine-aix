import axios from "axios";
import { getCookie } from "../utils";

export const fetchBookContent = async (book_id: string) => {
  // axios.defaults.withCredentials = true;

  try {
    const res = await axios.post(`http://142.93.212.130:3004/book/id/${book_id}`, {
      token: getCookie("token"),
    });
    console.log(res.data);
    return res.data;
  } catch (e) {
    return {
      message: "ERROR",
    };
  }
};
