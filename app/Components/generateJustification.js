import React, { useState } from "react";

const generateJustification = async ({query, setJustification, setRequirementsReady, url}) => {

  let finalPrompt = `im going to give you a bunch of information describing stl files for soft robotics actuators that would go on to be used in prosthetics. these individually represent each row in the table containing 10 different actuators. I will also give you a url and a use case, I want you to justify why the stl that is associated with that url is the most appropriate to the specified use case.  the goal is for a user to query a use case, like "play a guitar" or "hold a bottle" and gpt can justify why that stl was generated for that use case   Sound good? Here is the use case:

  use case: %s

  url: %t

ONLY output the justification, NEVER refernce the URL itself
Here are the descriptions out of which you need to justify the decision to pick the above url:

Number of Fingers    Optimal PSI Range    Minimum PSI Required    Print Time    Potential Use Cases    Optimal Use Case Scenario    Material    Objective    Utilization Case    Bend Range    Performance    Intended Use    Location    MATH
4    5-15    5    4 hours    Making a bed, grabbing a ball, holding a spoon, grabbing a bat    Low Motor Control, Difficulty with Grip    TPU    Contract    Grip, Grab, Hold, Pull, Squeeze, Carry    40 degrees    Non-Precise Motor Control    For variable grip usage. Can hold on to things for extended periods and also release them.    https://raw.githubusercontent.com/EthanJags/STL/5c21811929ccf66d40e1527d5b895e108df538e3/1.stl    $(r\\sin(4\\theta+4)^4) + (r\\sin(\\theta)^4) + \\tan^{-1}(\\sin(\\tan^{-1}(\\sin(40)))) + r\\sin(\\tan^{-1}(\\sin(40))) = \\psi $
2    5-20    5    3 hours    Picking up and moving things short distances,holding a can, holding a bottle plugging in cables, rapid finger articulation    Low Motor Control, Difficulty with Precision, Difficulty with Grip    TPU    Contract    Grip, Grab, Hold, Pull, Squeeze, Carry    30 degrees    Precise Motor Control    For precise grip usage. Can pick up and release things quickly.    https://raw.githubusercontent.com/EthanJags/STL/5c21811929ccf66d40e1527d5b895e108df538e3/2.stl    $(r\\sin(z\\theta+z)^4) + (r\\sin(z)^4) + \\tan^{-1}(\\sin(\\tan^{-1}(\\sin(z)))) + r\\sin(\\tan^{-1}(\\sin(z)))) = \\psi $'
3    10-20    10    8 hours    Holding a paintbrush, holding a plate    Low Motor Control, Difficulty with Grip, Use case with extended, tight grip requirements    TPU    Contract    Grip, Grab, Hold, Pull, Squeeze, Carry    15 degrees    Fixed Control    For fixed grip usage, like for holding certain items.     https://raw.githubusercontent.com/EthanJags/STL/5c21811929ccf66d40e1527d5b895e108df538e3/3.stl    $(r\\sin(3\\theta)-\\frac{1}{2})^4 + 2(r\\sin(\\theta+\\frac{\\Pi}{2}))^4+\\tan^{-1}(\\sin(\\tan(20\\sin(\\theta-\\frac{1}{2})^{-1}+1))(\\sin(\\tan(20\\sin(15)^{-1}+1)) = \\psi $
3    5-20    5    7 hours    Sports, dribbling ball, quickly holding and releasing items    Increased Manueverability for Athletics    TPU    Expand and Contract    Grip, Carry, Bounce    40 degrees    Moderately Precise Motor Control    For sports usage, like in basketball or football.    https://raw.githubusercontent.com/EthanJags/STL/39e2dfb8e6f1fe0442a890fc5df2eb29730d97a2/4.stl    $(r\\sin(3\\theta+3)^4) + (r\\sin(\\theta)^4) + \\tan^{-1}(\\sin(\\tan^{-1}(\\sin(40)))) + r\\sin(\\tan^{-1}(\\sin(40))) = \\psi $
4    10-20    10    6 hours    Making a bed, cleaning a surface    Shaky Hand Control, Inability to maintain Hand form for long periods of time    TPU    Expand    Sandwich, Push, Slide    15 degrees    Non-Precise Motor Control    For implementations requiring a spread hand.    https://raw.githubusercontent.com/EthanJags/STL/c6f6483802aa7b263ce1335ab480a38e6bd8da78/5.stl    $(r\\sin(4\\theta)-\\frac{1}{2})^4 + 2(r\\sin(\\theta+\\frac{\\Pi}{2}))^4+\\tan^{-1}(\\sin(\\tan(20\\sin(\\theta-\\frac{1}{2})^{-1}+1))(\\sin(\\tan(20\\sin(15)^{-1}+1)) = \\psi $
1    5-15    5    11 hours    Playing a video game with a joystick, Using an xbox controller, manipulating an item with large buttons, rolling a ball, cleaning, pushing light items    Limited Finger Manueverability    TPU    Spherical Actuation    Push, Move, Slide    10 degrees    Fixed Control    For fixed usage of a ball-shaped end.    https://raw.githubusercontent.com/EthanJags/STL/5c21811929ccf66d40e1527d5b895e108df538e3/Sphere.stl    $(r\\sin(\\theta)-\\frac{1}{2})^4 + 2(r\\sin(\\theta+\\frac{\\Pi}{2}))^4+(\\sin(\\tan(20\\sin(\\theta-\\frac{1}{2})^{-1}+1))(\\sin(\\tan(20\\sin(10)^{-1}+1)) = \\psi $
1    5-20    5    5 hours    Press Small Buttons, Using a Mouse, Using a Keyboard, Using a Microwave    Limited Finger Manueverability    TPU    Linear Actuation    Push, Move, Slide    30 degrees    Fixed Control    For fixed usage of a linear, pointed end.    https://raw.githubusercontent.com/EthanJags/STL/5c21811929ccf66d40e1527d5b895e108df538e3/7.stl    r'$(r\\sin(\\theta) - \\frac{1}{2})^4 + 2(r\\sin(\\theta+\\frac{\\Pi}{2}))^4+(\\sin(\\tan(20\\sin(\\theta-\\frac{1}{2})^{-1}+1))(\\sin(\\tan(20\\sin(z)^{-1}+1)) = \\psi $
2    5-15    5    11 hours    Hold a guitar pick,    Low Motor Control, Difficulty with Grip    TPU    Contract    Grip, Grab, Hold, Pull, Squeeze, Carry    40 degrees    Precise Motor Control    For finer implementations.    https://raw.githubusercontent.com/EthanJags/STL/b8ae6accd3aa81b293e5e9608250d632c16eee3b/8.stl    $(r\\sin(3\\theta+3)^4) + (r\\sin(\\theta)^4) + \\tan^{-1}(\\sin(\\tan^{-1}(\\sin(40)))) + r\\sin(\\tan^{-1}(\\sin(40))) = \\psi 

$`;

// const msg = "Your use case here";
finalPrompt.replace("%s", query);
finalPrompt.replace("%t", url);

finalPrompt= [{"role": "user", "content": finalPrompt}]
console.log("final prompt,", finalPrompt);
console.log("url", url);
  // let requirementsPrompt = [
  //   // {
  //   //   "role" : "assistant", 
  //   //   "content" : "- Prosthetic must be able to mimic the range of motion required for playing piano.\n- Prosthetic must be sensitive enough to differentiate between soft and loud key presses.\n- Prosthetic must have a comfortable fit that allows for prolonged use."
  //   // },
  //   // {
  //   //   "role": "user",
  //   //   "content": "- Prosthetic should be able to hold and manipulate a knife safely.\n- Prosthetic should have a mechanism to adjust grip strength to avoid crushing or dropping objects.\n- Prosthetic should be resistant to heat and easy to clean."
  //   // },
  //   // // {
  //   // //   "role": "system", 
  //   // //   "content": "Please provide requirements for a prosthetic based on the action a user wants to perform. This should be done by converting the user's natural language action into a bulleted list of requirements for the prosthetic. Requirements should be specific, concrete and actionable for the prosthetic to be designed and programmed effectively.\n\nFor instance, a user input 'I want to be able to play piano again' could translate into requirements like:\n- Prosthetic must be able to mimic the range of motion required for playing piano.\n- Prosthetic must be sensitive enough to differentiate between soft and loud key presses.\n- Prosthetic must have a comfortable fit that allows for prolonged use."
  //   // // },

  // ];
  // console.log("requirements prompt", requirementsPrompt);
  // setLoading(true);


  const response = await fetch("/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages: finalPrompt,
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
    setJustification((prev) => prev + chunkValue);
  }
  console.log("Output from justifications GPT: ", )
  // setRequirementsReady(true);
    
};

export default generateJustification;