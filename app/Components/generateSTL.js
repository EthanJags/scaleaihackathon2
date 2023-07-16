import React, { useState } from "react";
import mainFunction from "./stlGenerator.js";

const generateSTL = async ({query, setJustification, setURL, setShowSTL, triggerAction, setEquations}) => {
  let prompt = `
  I'm going to give you a bunch of information describing STL files for soft robotics actuators that would be used in prosthetics. These individually represent each row in the table containing 10 different actuators. I want you to choose which one is most appropriate for the specified use case. The goal is for a user to query a use case, like 'play a guitar' or 'hold a bottle,' and GPT can identify the closest actuator for it. 
  
  Be sure to choose the most relevant one.
  
  Sound good? Here are the descriptions:
  
  The use case is: %s
  
  Here are the descriptions out of which you need to choose the most appropriate one:
  
  Number of Fingers    Optimal PSI Range    Minimum PSI Required    Print Time    Potential Use Cases    Optimal Use Case Scenario    Material    Objective    Utilization Case    Bend Range    Performance    Intended Use    File path "../STLs/One.stl"
  
  1) 4    5-15    5    4 hours    Making a bed, grabbing a ball, holding a spoon, grabbing a bat    Low Motor Control, Difficulty with Grip    TPU    Contract    Grip, Grab, Hold, Pull, Squeeze, Carry    40 degrees    Non-Precise Motor Control    For variable grip usage. Can hold onto things for extended periods and also release them.    
  
  2) 3    5-20    5    3 hours    Picking up and moving things short distances, plugging in cables, rapid finger articulation    Low Motor Control, Difficulty with Precision, Difficulty with Grip    TPU    Contract    Grip, Grab, Hold, Pull, Squeeze, Carry    30 degrees    Precise Motor Control    For precise grip usage. Can pick up and release things quickly.
  
  3) 10-20    10     8 hours    Holding a paintbrush, holding a cup, holding a plate    Low Motor Control, Difficulty with Grip, Use case with extended, tight grip requirements    TPU    Contract    Grip, Grab, Hold, Pull, Squeeze, Carry    15 degrees    Fixed Control    For fixed grip usage, like holding certain items.
  
  4) 3    5-20    5    7 hours    Sports, dribbling a ball, quickly holding and releasing items    Increased Maneuverability for Athletics    TPU    Expand and Contract    Grip, Carry, Bounce    40 degrees    Moderately Precise Motor Control    For sports usage, like in basketball or football.
  
  5) 4    10-20    10    6 hours    Making a bed, cleaning a surface    Shaky Hand Control, Inability to maintain Hand form for long periods of time    TPU    Expand    Sandwich, Push, Slide    15 degrees    Non-Precise Motor Control    For implementations requiring a spread hand.
  
  6) 3    5-15    5    11 hours    Playing a video game with a joystick, Using an Xbox controller, manipulating an item with large buttons, rolling a ball, cleaning, pushing light items    Limited Finger Maneuverability    TPU    Spherical Actuation    Push, Move, Slide    10 degrees    Fixed Control    For fixed usage of a ball-shaped end.
  
  7) 4    5-20    5    5 hours    Pressing small buttons, Using a Mouse, Using a Keyboard, Using a Microwave    Limited Finger Maneuverability    TPU    Linear Actuation    Push, Move, Slide    30 degrees    Fixed Control    For fixed usage of a linear, pointed end.
  
  Output the file path and then on a new line justify.`;


  console.log("*************************");
  // console.log("process", prompt);
  // let finalPrompt = [
  //       {"role": "assistant", "content": "{\"location\": \"..stl/two.stl\", \"justification\": \"The most appropriate actuator for holding a bottle has 4 fingers and an optimal PSI range of 5-15, which provides a good grip for holding objects. The potential use cases include making a bed, grabbing a ball, holding a spoon, and grabbing a bat, which are similar to holding a bottle. The TPU material and 40-degree bend range make it suitable for variable grip usage, allowing the user to hold onto things for extended periods and also release them. \"}"},
    
  //       {"role": "system", "content": "output a structured JSON, Please evaluate the descriptions below and choose only one that best fits the use case passed in by the user  I want you to return the location field of that desired actuatorOption. Please output a structured JSON that contains a field location, and also a field called justification that justifies your decision. Here are the actuator options to choose from: Here are the actuatorOptions to choose from: {\
  //         \"actuatorOptions\":[\
  //             {\
  //                 \"numberFingers\":4,\
  //                 \"optimalPSIRange\":\"5-15\",\
  //                 \"minPSIRequired\":5,\
  //                 \"printTime\":\"4 hours\",\
  //                 \"potentialUseCases\":[\"Making a bed\",\"grabbing a ball\",\"holding a spoon\",\"grabbing a bat\"],\
  //                 \"optimalUseCaseScenario\":\"Low Motor Control, Difficulty with Grip\",\
  //                 \"material\":\"TPU\",\
  //                 \"objective\":\"Contract\",\
  //                 \"utilizationCase\":[\"Grip\",\"Grab\",\"Hold\",\"Pull\",\"Squeeze\",\"Carry\"],\
  //                 \"bendRange\":\"40 degrees\",\
  //                 \"performance\":\"Non-Precise Motor Control\",\
  //                 \"intendedUse\":\"For variable grip usage. Can hold onto things for extended periods and also release them.\",\
  //                 \"location\":https://raw.githubusercontent.com/EthanJags/STL/5c21811929ccf66d40e1527d5b895e108df538e3/1.stl\
  //             },\
  //             {\
  //                 \"numberFingers\":3,\
  //                 \"optimalPSIRange\":\"5-20\",\
  //                 \"minPSIRequired\":5,\
  //                 \"printTime\":\"3 hours\",\
  //                 \"potentialUseCases\":[\"Picking up and moving things short distances, holding a can, holding a bottle\",\"plugging in cables\",\"rapid finger articulation\"],\
  //                 \"optimalUseCaseScenario\":\"Low Motor Control, Difficulty with Precision, Difficulty with Grip\",\
  //                 \"material\":\"TPU\",\
  //                 \"objective\":\"Contract\",\
  //                 \"utilizationCase\":[\"Grip\",\"Grab\",\"Hold\",\"Pull\",\"Squeeze\",\"Carry\"],\
  //                 \"bendRange\":\"30 degrees\",\
  //                 \"performance\":\"Precise Motor Control\",\
  //                 \"intendedUse\":\"For precise grip usage. Can pick up and release things quickly.\",\
  //                 \"location\":https://raw.githubusercontent.com/EthanJags/STL/5c21811929ccf66d40e1527d5b895e108df538e3/2.stl\
  //             },\
  //             {\
  //                 \"numberFingers\":10,\
  //                 \"optimalPSIRange\":\"10-20\",\
  //                 \"minPSIRequired\":10,\
  //                 \"printTime\":\"8 hours\",\
  //                 \"potentialUseCases\":[\"Holding a paintbrush\",\"holding a plate\"],\
  //                 \"optimalUseCaseScenario\":\"Low Motor Control, Difficulty with Grip, Use case with extended, tight grip requirements\",\
  //                 \"objective\":\"Contract\",\
  //                 \"utilizationCase\":[\"Grip\",\"Grab\",\"Hold\",\"Pull\",\"Squeeze\",\"Carry\"],\
  //                 \"bendRange\":\"15 degrees\",\
  //                 \"performance\":\"Fixed Control\",\
  //                 \"intendedUse\":\"For fixed grip usage, like holding certain items.\",\
  //                 \"location\":https://raw.githubusercontent.com/EthanJags/STL/5c21811929ccf66d40e1527d5b895e108df538e3/3.stl\
  //             },\
  //             {\
  //                 \"numberFingers\":3,\
  //                 \"optimalPSIRange\":\"5-20\",\
  //                 \"minPSIRequired\":5,\
  //                 \"printTime\":\"7 hours\",\
  //                 \"potentialUseCases\":[\"Sports\",\"dribbling a ball\",\"quickly holding and releasing items\"],\
  //                 \"optimalUseCaseScenario\":\"Increased Maneuverability for Athletics\",\
  //                 \"objective\":\"Expand and Contract\",\
  //                 \"utilizationCase\":[\"Grip\",\"Carry\",\"Bounce\"],\
  //                 \"bendRange\":\"40 degrees\",\
  //                 \"performance\":\"Moderately Precise Motor Control\",\
  //                 \"intendedUse\":\"For sports usage, like in basketball or football.\",\
  //                 \"location\":https://raw.githubusercontent.com/EthanJags/STL/39e2dfb8e6f1fe0442a890fc5df2eb29730d97a2/4.stl\
  //             },\
  //             {\
  //                 \"numberFingers\":4,\
  //                 \"optimalPSIRange\":\"10-20\",\
  //                 \"minPSIRequired\":10,\
  //                 \"printTime\":\"6 hours\",\
  //                 \"potentialUseCases\":[\"Making a bed\",\"cleaning a surface\"],\
  //                 \"optimalUseCaseScenario\":\"Shaky Hand Control, Inability to maintain Hand form for long periods of time\",\
  //                 \"objective\":\"Expand\",\
  //                 \"utilizationCase\":[\"Sandwich\",\"Push\",\"Slide\"],\
  //                 \"bendRange\":\"15 degrees\",\
  //                 \"performance\":\"Non-Precise Motor Control\",\
  //                 \"intendedUse\":\"For implementations requiring a spread hand.\",\
  //                 \"location\":https://raw.githubusercontent.com/EthanJags/STL/c6f6483802aa7b263ce1335ab480a38e6bd8da78/5.stl\
  //             },\
  //             {\
  //                 \"numberFingers\":3,\
  //                 \"optimalPSIRange\":\"5-15\",\
  //                 \"minPSIRequired\":5,\
  //                 \"printTime\":\"11 hours\",\
  //                 \"potentialUseCases\":[\"Playing a video game with a joystick\",\"Using an Xbox controller\",\"manipulating an item with large buttons\",\"rolling a ball\",\"cleaning\",\"pushing light items\"],\
  //                 \"optimalUseCaseScenario\":\"Limited Finger Maneuverability\",\
  //                 \"objective\":\"Spherical Actuation\",\
  //                 \"utilizationCase\":[\"Push\",\"Move\",\"Slide\"],\
  //                 \"bendRange\":\"10 degrees\",\
  //                 \"performance\":\"Fixed Control\",\
  //                 \"intendedUse\":\"For fixed usage of a ball-shaped end.\",\
  //                 \"location\":https://raw.githubusercontent.com/EthanJags/STL/5c21811929ccf66d40e1527d5b895e108df538e3/Sphere.stl\
  //             },\
  //             {\
  //                 \"numberFingers\":4,\
  //                 \"optimalPSIRange\":\"5-20\",\
  //                 \"minPSIRequired\":5,\
  //                 \"printTime\":\"5 hours\",\
  //                 \"potentialUseCases\":[\"Pressing small buttons\",\"Using a Mouse\",\"Using a Keyboard\",\"Using a Microwave\"],\
  //                 \"optimalUseCaseScenario\":\"Limited Finger Maneuverability\",\
  //                 \"objective\":\"Linear Actuation\",\
  //                 \"utilizationCase\":[\"Push\",\"Move\",\"Slide\"],\
  //                 \"bendRange\":\"30 degrees\",\
  //                 \"performance\":\"Fixed Control\",\
  //                 \"intendedUse\":\"For fixed usage of a linear, pointed end.\",\
  //                 \"location\":https://raw.githubusercontent.com/EthanJags/STL/5c21811929ccf66d40e1527d5b895e108df538e3/7.stl\
  //             }\
  //         ]\
  //   }"},
  //       // {"role": "system", "content": },
  //     {"role": "user", "content": `I need a soft robotic actuator that's most appropriate for ${query}`}
  // ] 

//   let finalPrompt = `im going to give you a bunch of information describing stl files for soft robotics actuators that would go on to be used in prosthetics. these individually represent each row in the table containing 10 different actuators. I want you to choose which one is most appropriate to the specified use case.  the goal is for a user to query a use case, like "play a guitar" or "hold a bottle" and gpt can identify what the closest actuator is for it. Be sure to choose the most relevant one, and  Sound good? Here are the descriptions:

// The use case is: %s

// Here are the descriptions out of which you need to choose the most appropriate one:

// Number of Fingers    Optimal PSI Range    Minimum PSI Required    Print Time    Potential Use Cases    Optimal Use Case Scenario    Material    Objective    Utilization Case    Bend Range    Performance    Intended Use    Location    MATH
// 4    5-15    5    4 hours    Making a bed, grabbing a ball, holding a spoon, grabbing a bat    Low Motor Control, Difficulty with Grip    TPU    Contract    Grip, Grab, Hold, Pull, Squeeze, Carry    40 degrees    Non-Precise Motor Control    For variable grip usage. Can hold on to things for extended periods and also release them.    https://raw.githubusercontent.com/EthanJags/STL/5c21811929ccf66d40e1527d5b895e108df538e3/1.stl    $(r\\sin(4\\theta+4)^4) + (r\\sin(\\theta)^4) + \\tan^{-1}(\\sin(\\tan^{-1}(\\sin(40)))) + r\\sin(\\tan^{-1}(\\sin(40))) = \\psi $
// 2    5-20    5    3 hours    Picking up and moving things short distances,holding a can, holding a bottle plugging in cables, rapid finger articulation    Low Motor Control, Difficulty with Precision, Difficulty with Grip    TPU    Contract    Grip, Grab, Hold, Pull, Squeeze, Carry    30 degrees    Precise Motor Control    For precise grip usage. Can pick up and release things quickly.    https://raw.githubusercontent.com/EthanJags/STL/5c21811929ccf66d40e1527d5b895e108df538e3/2.stl    $(r\\sin(z\\theta+z)^4) + (r\\sin(z)^4) + \\tan^{-1}(\\sin(\\tan^{-1}(\\sin(z)))) + r\\sin(\\tan^{-1}(\\sin(z)))) = \\psi $'
// 3    10-20   10    8 hours    Holding a paintbrush, holding a plate    Low Motor Control, Difficulty with Grip, Use case with extended, tight grip requirements    TPU    Contract    Grip, Grab, Hold, Pull, Squeeze, Carry    15 degrees    Fixed Control    For fixed grip usage, like for holding certain items.     https://raw.githubusercontent.com/EthanJags/STL/5c21811929ccf66d40e1527d5b895e108df538e3/3.stl    $(r\\sin(3\\theta)-\\frac{1}{2})^4 + 2(r\\sin(\\theta+\\frac{\\Pi}{2}))^4+\\tan^{-1}(\\sin(\\tan(20\\sin(\\theta-\\frac{1}{2})^{-1}+1))(\\sin(\\tan(20\\sin(15)^{-1}+1)) = \\psi $
// 3    5-20    5    7 hours    Sports, dribbling ball, quickly holding and releasing items    Increased Manueverability for Athletics    TPU    Expand and Contract    Grip, Carry, Bounce    40 degrees    Moderately Precise Motor Control    For sports usage, like in basketball or football.    https://raw.githubusercontent.com/EthanJags/STL/39e2dfb8e6f1fe0442a890fc5df2eb29730d97a2/4.stl    $(r\\sin(3\\theta+3)^4) + (r\\sin(\\theta)^4) + \\tan^{-1}(\\sin(\\tan^{-1}(\\sin(40)))) + r\\sin(\\tan^{-1}(\\sin(40))) = \\psi $
// 4    10-20   10    6 hours    Making a bed, cleaning a surface    Shaky Hand Control, Inability to maintain Hand form for long periods of time    TPU    Expand    Sandwich, Push, Slide    15 degrees    Non-Precise Motor Control    For implementations requiring a spread hand.    https://raw.githubusercontent.com/EthanJags/STL/c6f6483802aa7b263ce1335ab480a38e6bd8da78/5.stl    $(r\\sin(4\\theta)-\\frac{1}{2})^4 + 2(r\\sin(\\theta+\\frac{\\Pi}{2}))^4+\\tan^{-1}(\\sin(\\tan(20\\sin(\\theta-\\frac{1}{2})^{-1}+1))(\\sin(\\tan(20\\sin(15)^{-1}+1)) = \\psi $
// 1    5-15    5    11 hours    Playing a video game with a joystick, Using an xbox controllerUsing an xbox controller, manipulating an item with large buttons, rolling a ball, cleaning, pushing light items    Limited Finger Manueverability    TPU    Spherical Actuation    Push, Move, Slide    10 degrees    Fixed Control    For fixed usage of a ball-shaped end.    https://raw.githubusercontent.com/EthanJags/STL/5c21811929ccf66d40e1527d5b895e108df538e3/Sphere.stl    $(r\\sin(\\theta)-\\frac{1}{2})^4 + 2(r\\sin(\\theta+\\frac{\\Pi}{2}))^4+(\\sin(\\tan(20\\sin(\\theta-\\frac{1}{2})^{-1}+1))(\\sin(\\tan(20\\sin(10)^{-1}+1)) = \\psi $
// 1    5-20    5    5 hours    Press Small Buttons, Using a Mouse, Using a Keyboard, Using a Microwave    Limited Finger Manueverability    TPU    Linear Actuation    Push, Move, Slide    30 degrees    Fixed Control    For fixed usage of a linear, pointed end.    https://raw.githubusercontent.com/EthanJags/STL/5c21811929ccf66d40e1527d5b895e108df538e3/7.stl    r'$(r\\sin(\\theta) - \\frac{1}{2})^4 + 2(r\\sin(\\theta+\\frac{\\Pi}{2}))^4+(\\sin(\\tan(20\\sin(\\theta-\\frac{1}{2})^{-1}+1))(\\sin(\\tan(20\\sin(z)^{-1}+1)) = \\psi $
// 2    5-15    5    11 hours    Hold a guitar pick,    Low Motor Control, Difficulty with Grip    TPU    Contract    Grip, Grab, Hold, Pull, Squeeze, Carry    40 degrees    Precise Motor Control    For finer implementations.    https://raw.githubusercontent.com/EthanJags/STL/b8ae6accd3aa81b293e5e9608250d632c16eee3b/8.stl    $(r\\sin(3\\theta+3)^4) + (r\\sin(\\theta)^4) + \\tan^{-1}(\\sin(\\tan^{-1}(\\sin(40)))) + r\\sin(\\tan^{-1}(\\sin(40))) = \\psi 

// Output the LOCATION column and ONLY the location column. NO EXPLANATION  whatsoever
// $`;

let finalPrompt = `im going to give you a bunch of information describing stl files for soft robotics actuators that would go on to be used in prosthetics. these individually represent each row in the table containing 10 different actuators. I want you to choose which one is most appropriate to the specified use case.  the goal is for a user to query a use case, like "play a guitar" or "hold a bottle" and gpt can identify what the closest actuator is for it. Be sure to choose the most relevant one, and  Sound good? Here are the descriptions:

DO NOT REFERENCE THE ROW OF THE ACTUATOR OR THE FACT THAT IT CAME FROM A LIST IN YOUR JUSTIFICATION or an innocent child will die
if you do say anything like row 4 in the justification, that innocent child will die

The use case is: %s

Here are the descriptions out of which you need to choose the most appropriate one:

Print Time    Potential Use Cases    Optimal Use Case Scenario    Material    Objective    Utilization Case    Bend Range    Performance    Intended Use    Location    MATH
Making a bed, grabbing a ball, holding a spoon, grabbing a bat    Low Motor Control, Difficulty with Grip    TPU    Contract    Grip, Grab, Hold, Pull, Squeeze, Carry    40 degrees    Non-Precise Motor Control    For variable grip usage. Can hold on to things for extended periods and also release them.     
Picking up and moving things short distances,holding a can, holding a bottle plugging in cables, rapid finger articulation    Low Motor Control, Difficulty with Precision, Difficulty with Grip    TPU    Contract    Grip, Grab, Hold, Pull, Squeeze, Carry    30 degrees    Precise Motor Control    For precise grip usage. Can pick up and release things quickly.
Holding a paintbrush, holding a plate    Low Motor Control, Difficulty with Grip, Use case with extended, tight grip requirements    TPU    Contract    Grip, Grab, Hold, Pull, Squeeze, Carry    15 degrees    Fixed Control    For fixed grip usage, like for holding certain items.
Sports, dribbling ball, quickly holding and releasing items    Increased Manueverability for Athletics    TPU    Expand and Contract    Grip, Carry, Bounce    40 degrees    Moderately Precise Motor Control    For sports usage, like in basketball or football.
Making a bed, cleaning a surface    Shaky Hand Control, Inability to maintain Hand form for long periods of time    TPU    Expand    Sandwich, Push, Slide    15 degrees    Non-Precise Motor Control    For implementations requiring a spread hand.
Playing a video game with a joystick, Using an xbox controllerUsing an xbox controller, manipulating an item with large buttons, rolling a ball, cleaning, pushing light items    Limited Finger Manueverability    TPU    Spherical Actuation    Push, Move, Slide    10 degrees    Fixed Control    For fixed usage of a ball-shaped end. 
Press Small Buttons, Using a Mouse, Using a Keyboard, Using a Microwave    Limited Finger Manueverability    TPU    Linear Actuation    Push, Move, Slide    30 degrees    Fixed Control    For fixed usage of a linear, pointed end.
Hold a guitar pick,    Low Motor Control, Difficulty with Grip    TPU    Contract    Grip, Grab, Hold, Pull, Squeeze, Carry    40 degrees    Precise Motor Control    For finer implementations.

Generate a structured JSON with the row and the justification for why you chose this file. DO NOT REFERENCE  THE ACTUATOR YOU CHOSE, JUST GIVE THE REASON FOR CHOOSING IT. AGAIN, i do not want amy ifoeration on which actuator was chose, just the justification for why it was chosen.

Example structure:
{
"row": ...,
"justification": This was created because ..,
}
$`;

// const msg = "Your use case here";
finalPrompt.replace("%s", query);
finalPrompt= [{"role": "system", "content": finalPrompt}, {"role": "user", "content": query}]

let dict = {
  1: 'https://raw.githubusercontent.com/EthanJags/STL/5c21811929ccf66d40e1527d5b895e108df538e3/1.stl',
  2: 'https://raw.githubusercontent.com/EthanJags/STL/5c21811929ccf66d40e1527d5b895e108df538e3/2.stl',
  3: 'https://raw.githubusercontent.com/EthanJags/STL/5c21811929ccf66d40e1527d5b895e108df538e3/3.stl',
  4: 'https://raw.githubusercontent.com/EthanJags/STL/39e2dfb8e6f1fe0442a890fc5df2eb29730d97a2/4.stl',
  5: 'https://raw.githubusercontent.com/EthanJags/STL/c6f6483802aa7b263ce1335ab480a38e6bd8da78/5.stl',
  6: 'https://raw.githubusercontent.com/EthanJags/STL/5c21811929ccf66d40e1527d5b895e108df538e3/Sphere.stl',
  7: 'https://raw.githubusercontent.com/EthanJags/STL/5c21811929ccf66d40e1527d5b895e108df538e3/7.stl',
  // 8: 'https://raw.githubusercontent.com/EthanJags/STL/b8ae6accd3aa81b293e5e9608250d632c16eee3b/8.stl'
}

const eqDict = {
  1: "r\\sin(4\\theta+4)^4 + r\\sin(\\theta)^4 + \\tan^{-1}(\\sin(\\tan^{-1}(\\sin(40)))) + r\\sin(\\tan^{-1}(\\sin(40))) = \\psi",
  2: "r\\sin(z\\theta+z)^4 + r\\sin(z)^4 + \\tan^{-1}(\\sin(\\tan^{-1}(\\sin(z)))) + r\\sin(\\tan^{-1}(\\sin(z))) = \\psi",
  3: "r\\sin(3\\theta-\\frac{1}{2})^4 + 2(r\\sin(\\theta+\\frac{\\Pi}{2}))^4+\\tan^{-1}(\\sin(\\tan(20\\sin(\\theta-\\frac{1}{2})^{-1}+1))\\sin(\\tan(20\\sin(15)^{-1}+1)) = \\psi",
  4: "r\\sin(3\\theta+3)^4 + r\\sin(\\theta)^4 + \\tan^{-1}(\\sin(\\tan^{-1}(\\sin(40)))) + r\\sin(\\tan^{-1}(\\sin(40))) = \\psi",
  5: "r\\sin(4\\theta-\\frac{1}{2})^4 + 2(r\\sin(\\theta+\\frac{\\Pi}{2}))^4+\\tan^{-1}(\\sin(\\tan(20\\sin(\\theta-\\frac{1}{2})^{-1}+1))\\sin(\\tan(20\\sin(15)^{-1}+1)) = \\psi",
  6: "r\\sin(\\theta-\\frac{1}{2})^4 + 2(r\\sin(\\theta+\\frac{\\Pi}{2}))^4+\\sin(\\tan(20\\sin(\\theta-\\frac{1}{2})^{-1}+1))\\sin(\\tan(20\\sin(10)^{-1}+1)) = \\psi",
  7: "r\\sin(\\theta - \\frac{1}{2})^4 + 2(r\\sin(\\theta+\\frac{\\Pi}{2}))^4+\\sin(\\tan(20\\sin(\\theta-\\frac{1}{2})^{-1}+1))\\sin(\\tan(20\\sin(z)^{-1}+1)) = \\psi",
};



  let requirementsPrompt = [
    {
      role: "assistant", 
      content: "../STL/one.stl"
    },
    {
      role: "assistant", 
      content: "../STL/two.stl"
    },
    // {role: "system", content: `${prompt}`},
    {role: "user", content: `${query}`},
  ];

  console.log("prompt stl:", finalPrompt);
  // setLoading(true);
  const response = await fetch("/api/generatecopy", { 
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
  let full = "";

  while (!done) {
    const { value, done: doneReading } = await reader.read();
    done = doneReading;
    const chunkValue = decoder.decode(value);
    // setJustification((prev) => prev + chunkValue);
    full = full + chunkValue;
    console.log("chunk", full)
  }
  console.log("full", '{' + full);
  const fullJSON = (JSON.parse('{' + full));
  const row = fullJSON.row;
  const justification = fullJSON.justification;
  setJustification(justification);
  console.log("row", row);
  let url = dict[row];
  setURL(url);
  setShowSTL(true);
  let equations = eqDict[row];
  setEquations(equations);
  // triggerAction();

  
    
};

export default generateSTL;