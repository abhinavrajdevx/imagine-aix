import axios from "axios";

export const fetchBookContent = async (book_id: string) => {
  console.log("request sent...");
  try {
    const res = await axios.get(`http://localhost:3004/book/${book_id}`, {});
    console.log(res.data);
    return res.data;
  } catch (e) {
    return {
      message: "ERROR",
    };
  }
};
