"use client";
import Image from 'next/image'
import styles from './page.module.css'
import SearchBar from './Components/SearchBar'
import React from 'react'
import {useState} from "react"
import { Button } from 'react-bootstrap';
import Requirements from './Components/Requirements'
import generateRequirements from './Components/generateRequirements';
import CustomButton from './Components/CustomButton';
import STLViewer from './Components/STLViewer';

export default function Home() {
  const [query, setQuery] = React.useState("");
  const [requirements, setRequirements] = React.useState("");

  const handleDisabledSubmit = (e) => {
    alert("Please enter a request")
  }
  const handleSubmit = (e) => {
    generateRequirements({query, setRequirements})
  }
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Soft Robotics AI</h1>
      <p className={styles.label}>What do you want to build?</p>
      <SearchBar query={query} setQuery={setQuery} />
      <CustomButton isQueryPresent={!!query} handleDisabledSubmit={handleDisabledSubmit} handleSubmit={handleSubmit} />
      <Requirements requirements={requirements}/>
      <STLViewer url="https://threejs.org/examples/models/stl/ascii/slotted_disk.stl" />
    </main>
  )
}
