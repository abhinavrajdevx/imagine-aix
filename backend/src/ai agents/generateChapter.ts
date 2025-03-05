import Groq from "groq-sdk";

export async function generateChapter(
  user_prompt: string,
  title: string,
  description: string,
  book_index: string,
  groq: Groq
) {
  const system_prompt = `
  user promtp = ${user_prompt}
  title = ${title}
  description = ${description}
  The index of the book = ${book_index}

  You are a book writer, analyze the user prompt, title of the chapter, and description of the chapter to write the contents of chapters.
  You are also given with the Index of the book, which contains overview of what the book contains.
  
  Write the contents of the chapter with title and description given and output in 'chapter_contents' field in the JSON.

  Output everything in JSON format as below :

  {
    chapter_contents : ""
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
