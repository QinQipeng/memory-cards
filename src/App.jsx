import { useEffect, useState } from 'react'

const LEVEL = "rookie"
const DIGIMON_API = `https://digimon-api.vercel.app/api/digimon/level/${LEVEL}`
const CARD_NUM = 12;

function getRandomNum(range, length=CARD_NUM) {
  const numbers = Array.from({ length: range }, (_, i) => i);

  for (let i = range - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], [numbers[i]]];
  }

  return numbers.slice(0, length);
}

function App() {  
  const [digimonInfo, setDigimonInfo] = useState([])
  const [scores, setScores] = useState({"currentScore": 0, "bestScore": 0});
  const [visitedMon, setVisited] = useState([])

  useEffect(() => {
    async function getDigimon() {
      const promise = await fetch(DIGIMON_API);
      const data = await promise.json()
      const pickedDigimons = getRandomNum(data.length).map(idx => data[idx]);
      setDigimonInfo(pickedDigimons);
    }

    getDigimon();
  }, [scores.currentScore])
  // const digimon = await getDigimon("agumon")

  const handleClick = (event) => {
    event.preventDefault();
    const name = event.currentTarget.getAttribute("id");
    if (visitedMon.includes(name)){
      setScores({ "currentScore": 0, "bestScore": scores.currentScore });
      setVisited([]);
    } else {
      setScores({...scores, "currentScore": scores.currentScore + 1});
      setVisited(visitedMon.concat(name));
    }
  }

  return (
    <main>
      <h2>Current Score: {scores.currentScore}</h2>
      <h2>Best Score: {scores.bestScore}</h2>
      <div>
        {
          digimonInfo.map((digimon) => {
            return <button key={digimon.name} id={digimon.name} onClick={handleClick}>
              <img src={digimon.img} alt="" loading="lazy" />
              <p>{digimon.name}</p>
            </button>
          })
        }
      </div>
    </main>
  )
}

export default App
