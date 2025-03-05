import Groq from "groq-sdk";

export async function generateBookTitleDescription(index: string, groq: Groq) {
  const system_prompt = `
Book index = ${index}

For the given book index contents create a title and description for the book.

OutputJSON format = 
{
    book_title : "",
    book_description : ""
}

`;

  const contents_chat: any = [];

  contents_chat.push({
    role: "user",
    content: system_prompt,
  });

  const llm_res = await groq.chat.completions.create({
    messages: contents_chat,
    // model: "qwen-2.5-32b",
    model: "deepseek-r1-distill-llama-70b",
    max_completion_tokens: 131072,
    temperature: 0,
    stream: false,
    response_format: { type: "json_object" },
    reasoning_format: "parsed",
  });

  const json_res = JSON.parse(llm_res.choices[0].message.content as string);
  return json_res;
}
