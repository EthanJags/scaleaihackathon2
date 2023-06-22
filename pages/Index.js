"use client";
import React from 'react';
import Image from 'next/image'
import styles from './page.module.css'
import SearchBar from '../app/Components/SearchBar'

export default function Home() {
  const [query, setQuery] = React.useState("");

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Soft Robasotics AI</h1>
      <SearchBar requestBar={query} setRequestBar={setQuery} />
    </main>
  )
}
