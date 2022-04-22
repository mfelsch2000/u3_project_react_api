import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL, LOGO_URL } from './globals'
import Ladder from './components/Ladder.jsx'
import TeamDetails from './components/TeamDetails.jsx'


function App() {

  const [ladder, setLadder] = useState([])
  const [teams, setTeams] = useState(null)
  const [selectedTeam, setSelectedTeam] = useState(null)

  let ladderRequest = 0
  let teamsRequest = 0

  useEffect(()=>{

    const getLadder = async () => {
      const resp = await axios.get(`${BASE_URL}/?q=standings;format=json`)
      console.log(resp.data.standings)
      setLadder(resp.data.standings)
    } 

    const getTeams = async () => {
      const resp = await axios.get(`${BASE_URL}/?q=teams;format=json`)
      console.log(resp.data.teams)
      setTeams(resp.data.teams)
    }

    if (ladderRequest === 0) {
      getLadder()
      ladderRequest = 1
    }

    if (teamsRequest === 0) {
      getTeams()
      teamsRequest = 1
    }

  }, [])

  const logoAddress = (teamId) => {
    let logo = LOGO_URL
    if (teams && teams.length >= (teamId - 1) && teamId > 0) {
        logo += teams[teamId - 1].logo
    }
    return logo
  }
  
  const selectTeam = (id) => {
    console.log("Selected " + id)
    setSelectedTeam(id)
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>AFL Footy Results</p>
      </header>
      {
        selectedTeam ? 
        (
          <TeamDetails teamId={selectedTeam}></TeamDetails>
        ) : (
          <Ladder ladder={ladder} teams={teams} logoAddress={logoAddress} selectTeam={selectTeam} ></Ladder> 
        )

      }
    </div>
  );
}

export default App;
