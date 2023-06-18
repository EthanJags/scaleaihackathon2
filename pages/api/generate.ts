import { ChatGPTMessage, OpenAIStream, OpenAIStreamPayload } from "../../utils/OpenAIStream";

console.log("open ai path:", process.env.PATH);
if (!process.env.OPENAI_API_KEY) {
    console.log("Missing env var from OpenAI");
  throw new Error("Missing env var from OpenAI");
}

export const config = {
  runtime: "edge",
};


const handler = async (req: Request): Promise<Response> => {
  const { messages } = (await req.json()) as {
    messages: ChatGPTMessage[];
  };

  // messages.forEach(message => {
  //   console.log(message.role + ": ")
  //   console.log(message.content);
  // });

  if (messages.length === 0) {
    return new Response("No prompt in the request", { status: 400 });
  }

  const payload: OpenAIStreamPayload = {
    model: "gpt-3.5-turbo",
    messages: messages,
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 200,
    stream: true,
    n: 1,
  };

  const stream = await OpenAIStream(payload);
  // console.log(new Response(stream));
  return new Response(stream);
};

export default handler;
