import axios from "axios";

export const generate = async (user_prompt: string) => {
  console.log("request sent...");
  try {
    const res = await axios.post("http://localhost:3004/generate", {
      user_prompt,
    });
    console.log(res.data);
    return res.data;
  } catch (e) {
    return {
      message: "ERROR",
    };
  }
};
