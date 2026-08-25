import { useEffect, useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './css/App.css'

const DIGIMON_API = "https://digimon-api.vercel.app/api/digimon/name"

async function getDigimon(name) {
  const reqString = DIGIMON_API+`/${name}`
  try {
    
    const response = await fetch(reqString);
    const digimon = await response.json();
    return digimon[0];
  } catch (error) {
    console.log(error);
  }
}

function App() {
  const cardNum = 20;
  const cards = Array.from({ length: cardNum}, (_, i) => i + 1);
  const currentScore = 0;
  const bestScore = 10;
  useEffect(async () => {
    const digimon = await getDigimon("agumon");
    console.log(digimon);
  }, [])
  // const digimon = await getDigimon("agumon")


  return (
    <main>
      
      <h2>Current Score: {currentScore}</h2>
      <h2>Best Score: {bestScore}</h2>
      {
        cards.map((value) => {
          return <button>{value}</button>
        })
      }
    </main>
  )
}

export default App
