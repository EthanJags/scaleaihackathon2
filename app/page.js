"use client";
import styles from './page.module.css'
import SearchBar from './Components/SearchBar'
import React from 'react'
import {useState} from "react"
import { Button } from 'react-bootstrap';
import Requirements from './Components/Requirements'
import generateRequirements from './Components/generateRequirements';
import CustomButton from './Components/CustomButton';
import STLViewer from './Components/STLViewer';
import generateSTL from './Components/generateSTL'
import Image from "next/image";
import Link from "next/link";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import SquigglyLines from "./Components/SquigglyLines";
import Justification from './Components/Justification';
import generateJustification from "./Components/generateJustification";
import Equations from "./Components/Equations.js"
// import generateRequirements from "./Components/generateRequirements";



export default function Home() {
  const [query, setQuery] = React.useState("");
  const [requirements, setRequirements] = React.useState("");
  const [showSTL, setShowSTL] = React.useState(false);
  const [equations, setEquations] = React.useState("");

  const [justification, setJustification] = React.useState("");
  const [stlGenerator, setSTLGenerator] = React.useState("");
  const [url, setURL] = React.useState("https://raw.githubusercontent.com/EthanJags/STL/a229478dc1ab0db3190518e6f94c060e5c0f49b9/Sphere.stl");
  const [requirementsReady, setRequirementsReady] = React.useState(false);


  const handleDisabledSubmit = (e) => {
    alert("Please enter a request")
  }

  const triggerAction = (e) => {

    generateJustification({query, setJustification, setRequirementsReady, url});
  }

  const handleSubmit = (e) => {
    setRequirements("");
    generateRequirements({query, setRequirements, setRequirementsReady})
  }

  const handleSTL = (e) => {
    console.log("generate STL clicked")
    generateSTL({query, setJustification, setURL, setShowSTL, triggerAction, setEquations})
    // setShowSTL(true);
  }
//   return (
//     <main className={styles.main}>
//       <h1 className={styles.title}>Soft Robotics AI</h1>
//       <p className={styles.label}>What do you want to build?</p>
//       <SearchBar query={query} setQuery={setQuery} />
//       <CustomButton isQueryPresent={!!query} handleDisabledSubmit={handleDisabledSubmit} handleSubmit={handleSubmit} title={"Generate Requirements"} />
//       {requirements && <Requirements requirements={requirements}/>}
//       {requirements && <CustomButton isQueryPresent={!!query} handleDisabledSubmit={handleDisabledSubmit} handleSubmit={handleSTL} title={"Generate STL File"}/>}
      // <STLViewer url="https://threejs.org/examples/models/stl/ascii/slotted_disk.stl" />
//     </main>
//   )
// }



// export default function Home() {
  return (
    <div className="flex mx-auto flex-col items-center justify-center py-2 min-h-full background-gradient">
      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 sm:mt-20 mt-20">
        {/* <a
          href="https://vercel.fyi/roomGPT"
          target="_blank"
          rel="noreferrer"
          className="border border-gray-700 rounded-lg py-2 px-4 text-gray-400 text-sm mb-5 transition duration-300 ease-in-out"
        >
          Clone and deploy your own with{" "}
          <span className="text-blue-600">Vercel</span>
        </a> */}
        <h1 className="mx-auto max-w-4xl font-display text-5xl font-bold tracking-normal text-gray-300 sm:text-7xl">
          Generate Soft Robotic Prosthetics{" "}
          <span className="relative whitespace-nowrap text-blue-600">
            <SquigglyLines />
            <span className="relative">using AI</span>
          </span>{" "}
          for everyone.
        </h1>
        <h2 className="mx-auto mt-12 max-w-xl text-lg sm:text-gray-400  text-gray-500 leading-7">
          Enter what you want to do and tell us about your disability.
        </h2>
        <SearchBar setQuery={setQuery} query={query}/>

        <Button
          className="bg-blue-600 rounded-xl text-white font-medium px-4 py-3 sm:mt-10 mt-8 hover:bg-blue-500 transition"
          onClick={handleSubmit} 
        >
          Generate requirements
        </Button>
        {requirements && <Requirements title={"Requirements"} requirements={requirements}/>}
        {!requirements && <div className="flex justify-between items-center w-full flex-col sm:mt-10 mt-6">
          <div className="flex flex-col space-y-10 mt-4 mb-16">
            <div className="flex sm:space-x-8 sm:flex-row flex-col">
              <div>
                <h3 className="mb-1 font-medium text-lg text-white">3D-printable STL</h3>
                <Image
                  alt="Original photo of a room with roomGPT.io"
                  src="/purestl.png"
                  className="w-full object-cover h-96 rounded-2xl"
                  width={400}
                  height={400}
                />
              </div>
              <div className="sm:mt-0 mt-8">
                <h3 className="mb-1 font-medium text-lg text-white">Soft actuator in action</h3>
                <Image
                  alt="Generated photo of a room with roomGPT.io"
                  width={400}
                  height={400}
                  src="/ballgripper.jpeg"
                  className="w-full object-cover h-96 rounded-2xl sm:mt-0 mt-2"
                  />
              </div>
            </div>
                  </div>
                  </div>}
            {requirementsReady &&
             <Button
          className="bg-blue-600 rounded-xl text-white font-medium px-4 py-3 m-3 mb-7 hover:bg-blue-500 transition"
          onClick={handleSTL} 
          >
          Generate STL
        </Button>
}
        {/* <STLViewer url="https://threejs.org/examples/models/stl/ascii/slotted_disk.stl" /> */}
{equations && <Equations title={"Equation"} requirements={equations}/>}
{showSTL && <STLViewer url={url}/>}

          {justification && <Justification title={"Explanation"} requirements={justification}/>}
      </main>
      <Footer />
    </div>
  );
}