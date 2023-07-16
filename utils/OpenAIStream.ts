import {
    createParser,
    ParsedEvent,
    ReconnectInterval,
  } from "eventsource-parser";
  
  export type ChatGPTAgent = "user" | "system" | "assistant";
  
  export interface ChatGPTMessage {
    role: ChatGPTAgent;
    content: string;
  }
  
  export interface OpenAIStreamPayload {
    model: string;
    messages: ChatGPTMessage[];
    temperature: number;
    top_p: number;
    frequency_penalty: number;
    presence_penalty: number;
    max_tokens: number;
    stream: boolean;
    n: number;
    functions?: any;
    function_call?: any;
  }
  
  export async function OpenAIStream(payload: OpenAIStreamPayload, whichLine: boolean) {
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    // console.log("openaistreampayload: ", payload);
    let counter = 0;
  
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}`,
      },
      method: "POST",
      body: JSON.stringify(payload),
    });

    // console.log("start");
    // // console.log("res: ", res);
    // const data = await res.text();
    // console.log("finish", data);

    const stream = new ReadableStream({
      async start(controller) {
        // callback
        function onParse(event: ParsedEvent | ReconnectInterval) {
          if (event.type === "event") {

            const data = event.data;
            // https://beta.openai.com/docs/api-reference/completions/create#completions/create-stream
            if (data === "[DONE]") {
              controller.close();
              return;
            }
            try {
              const json = JSON.parse(data);
              let text;
              if (whichLine) {
                text = json.choices[0].delta?.content || "";
              } else {
                text = json.choices[0].delta?.function_call?.arguments || "";
              }
              if (counter < 2 && (text.match(/\n/) || []).length) {
                // this is a prefix character (i.e., "\n\n"), do nothing
                return;
              }
              const queue = encoder.encode(text);
              controller.enqueue(queue);
              counter++;
            } catch (e) {
              // maybe parse error
              controller.error(e);
            }
          }
        }
  
        // stream response (SSE) from OpenAI may be fragmented into multiple chunks
        // this ensures we properly read chunks and invoke an event for each SSE event stream
        const parser = createParser(onParse);
        // https://web.dev/streams/#asynchronous-iteration
        for await (const chunk of res.body as any) {
          parser.feed(decoder.decode(chunk));
        }
      },
    });

    return stream;
  }
  