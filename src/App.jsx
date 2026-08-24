import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './css/App.css'

function App() {
  const cardNum = 20;
  const cards = Array.from({ length: cardNum}, (_, i) => i + 1);
  const currentScore = 0;
  const bestScore = 10;

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
