import Groq from "groq-sdk";

export async function generateIndex(user_prompt: string, groq: Groq) {
  const system_prompt = `
  user promtp = ${user_prompt}

  User wants to create a book, analyze the user prompt and generate chapters with title and description.
  The description when given to a LLm should be able to generate the actual chapter, so include all the minute details in 'description'field'

Output JSON format :

{
    chapters : [
        {
            title : "",
            description : ""
        }
    ]
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
    temperature: 1,
    stream: false,
    response_format: { type: "json_object" },
    reasoning_format: "parsed",
  });

  const json_res = JSON.parse(llm_res.choices[0].message.content as string);
  return json_res;
}
