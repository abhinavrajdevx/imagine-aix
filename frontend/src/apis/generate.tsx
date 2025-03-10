import axios from "axios";
import { getCookie } from "../utils";

export const generate = async (user_prompt: string) => {
  // axios.defaults.withCredentials = true;

  try {
    const res = await axios.post("http://https://server.abhinavraj.tech/book/generate", {
      user_prompt,
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
