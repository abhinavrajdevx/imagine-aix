import axios from "axios";

export const fetchBooks = async () => {
  console.log("request sent...");
  try {
    const res = await axios.get("http://localhost:3004/id/all", {});
    console.log(res.data);
    return res.data;
  } catch (e) {
    return {
      message: "ERROR",
    };
  }
};
