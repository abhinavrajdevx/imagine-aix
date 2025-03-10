import axios from "axios";
import { getCookie } from "../utils";

export const fetchBooks = async () => {
  // axios.defaults.withCredentials = true;

  try {
    const res = await axios.post("http://https://server.abhinavraj.tech/book/all", {
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
