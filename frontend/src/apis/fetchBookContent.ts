import axios from "axios";
import { getCookie } from "../utils";

export const fetchBookContent = async (book_id: string) => {
  // axios.defaults.withCredentials = true;

  try {
    const res = await axios.post(`http://localhost:3004/book/id/${book_id}`, {
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
