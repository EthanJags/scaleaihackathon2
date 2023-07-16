import React, { useState } from "react";

const generateRequirements = async ({query, setRequirements, setRequirementsReady}) => {

  let requirementsPrompt = [
    {
      "role" : "assistant", 
      "content" : "The most appropriate actuator for holding a bottle is number 1. It has 4 fingers and an optimal PSI range of 5-15, which provides a good grip for holding objects. The potential use cases include making a bed, grabbing a ball, holding a spoon, and grabbing a bat, which are similar to holding a bottle. The TPU material and 40-degree bend range make it suitable for variable grip usage, allowing the user to hold onto things for extended periods and also release them."
    },
    {
      "role": "system", 
      "content": "Please provide a justification for a prosthetic based on the action a user wants to perform. This should be done by converting the user's natural language action into a bulleted list of requirements for the prosthetic. Requirements should be specific, concrete and actionable for the prosthetic to be designed and programmed effectively.\n\nFor instance, a user input 'I want to be able to play piano again' could translate into requirements like:\n- Prosthetic must be able to mimic the range of motion required for playing piano.\n- Prosthetic must be sensitive enough to differentiate between soft and loud key presses.\n- Prosthetic must have a comfortable fit that allows for prolonged use."
    },
    {"role": "user", "content": `${query}`},
  ];
  // console.log("requirements prompt", requirementsPrompt);
  // setLoading(true);
  const response = await fetch("/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages: requirementsPrompt,
    }),
  });

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
    const chunkValue = decoder.decode(value);
    setRequirements((prev) => prev + chunkValue);
    console.log("chunk from req:", chunkValue)
  }
  console.log("Output from requirements GPT: ", )
  setRequirementsReady(true);
    
};

export default generateRequirements;