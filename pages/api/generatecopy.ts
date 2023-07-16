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

  const functions = [
    {
      "name": "output_format",
      "parameters": {
        "type": "object",
        "properties": {
          "row": {
            "type": "integer",
            "description": "integer that staisfies prompt"
          },
          "justification": {
            "type": "string",
            "description": "reason why row was chosen"
          },
        },
        "required": ["row", "justification"]
      },
    },
  ];

  const payload: OpenAIStreamPayload = {
    model: "gpt-3.5-turbo-0613",
    messages: messages,
    temperature: 1,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 1000,
    stream: true,
    n: 1,
    functions: functions,
    function_call: { "name": "output_format" }
  };

  // console.log("payload: ", payload);

  const stream = await OpenAIStream(payload, false);
  // console.log(new Response(stream));
  return new Response(stream);
};

export default handler;
