import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from './globals'
import Ladder from './components/Ladder.jsx'
import TeamDetails from './components/TeamDetails.jsx'


function App() {

  const [ladder, setLadder] = useState([])
  const [selectedTeam, setSelectedTeam] = useState(null)

  useEffect(()=>{
    const getLadder = async () => {
      const resp = await axios.get(`${BASE_URL}/?q=standings;format=json`)
      console.log(resp.data.standings)
      setLadder(resp.data.standings)
    } 
    getLadder()

  }, [])

  const selectTeam = (id) => {
    console.log("Selected " + id)
    setSelectedTeam(id)
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          AFL Footy Results
        </p>
      </header>
      {
        selectedTeam ? 
        (
          <TeamDetails teamId={selectedTeam}></TeamDetails>
        ) : (
          <Ladder ladder={ladder} selectTeam={selectTeam} ></Ladder> 
        )

      }
    </div>
  );
}

export default App;
