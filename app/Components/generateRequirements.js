import {useState} from "react";

const generateRequirements = async ({query, setRequirements}) => {
    const formattedQuery = {role: "system", content: {query}};
    
    let requirementsPrompt = [
        {role: "assistant", content: "blah"},
        {role: "assistant", content: "blah"},
        {role: "system", content: "blah"}];
  
      requirementsPrompt = [...requirementsPrompt, formattedQuery];
  
    //   setLoading(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: requirementsPrompt,
        }),
      });
      console.log("response", response);
    } catch (error) {
      console.error("Error during fetch: ", error);
    }
    

  
      if (!response.ok) {
        throw new Error(response.statusText);
      }
  
      // This data is a ReadableStream
      const data = response.body;
      if (!data) {
        return;
      }
  
      const reader = data.getReader();
      const decoder = new TextDecoder();
      let done = false;
  
  
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        // console.log("value: " + value + " doneReading: " + doneReading);
        const chunkValue = decoder.decode(value);
        setRequirements((prev) => prev + chunkValue);
        // latestFeedback = latestFeedback + chunkValue;
      
      }
      // scrollToBios();
    //   setLoading(false);
    //   setShowFeedback(true);
      console.log("it got to the end of generateRequirements");
      
}

export default generateRequirements;