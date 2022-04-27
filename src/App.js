import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL, LOGO_URL } from './globals'
import TitlePage from './components/TitlePage';
import Ladder from './components/Ladder.jsx'
import TeamDetails from './components/TeamDetails.jsx'
// box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;


function App() {

  const [viewTitle, setViewTitle] = useState(true)
  const [ladder, setLadder] = useState([])
  const [previousLadder, setPreviousLadder] = useState([])
  
  const [teams, setTeams] = useState(null)
  const [selectedTeam, setSelectedTeam] = useState(null)

  let ladderRequest = 0
  let previousLadderRequest = 0
  let teamsRequest = 0

  useEffect(()=>{

    const getLadder = async () => {
      const resp = await axios.get(`${BASE_URL}/?q=standings;format=json`)
      console.log(resp.data.standings)
      setLadder(resp.data.standings)
    } 

    const getPreviousLadder = async () => {
      const resp = await axios.get(`${BASE_URL}/?q=standings;round=5;format=json`)
      console.log(resp.data.standings)
      setPreviousLadder(resp.data.standings)
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

    if (previousLadderRequest === 0) {
      getPreviousLadder()
      previousLadderRequest = 1
    }

    if (teamsRequest === 0) {
      getTeams()
      teamsRequest = 1
    }

  }, [])

  const getLogoAddress = (teamId) => {
    let logo = LOGO_URL
    if (teams && teams.length >= (teamId - 1) && teamId > 0) {
        logo += teams[teamId - 1].logo
    }
    return logo
  }
  
  const selectTeam = (id) => {
    //console.log("Selected " + id)
    const team = teams[id-1]
    setSelectedTeam(team)
  }

  const getCurrentStanding = (id) => {
    const standings = ladder.filter((standing) => { return standing.id === id })
    if (standings.length > 0) {
      return standings[0]
    }
  }

  const clearTitlePage = () => {
    setViewTitle(false)
  }

  const getPreviousStanding = (id) => {
    const   standings = previousLadder.filter((standing) => { return standing.id === id })
    if (standings.length > 0) {
      return standings[0]
    }
  }

  const changeInRank = (id) => {
    
    const currentStanding = getCurrentStanding(id)
    if (currentStanding) {
     // console.log("Current standing: " + currentStanding.rank)
    } else {
      console.log("No current standings")
    }
    
    const previousStanding = getPreviousStanding(id)
    if (previousStanding) {
      //console.log("Previous standing: " + previousStanding.rank)
    } else {
      console.log("No previous standings")
    }

    let change = "None"
    if (currentStanding && previousStanding) {
      if (currentStanding.rank < previousStanding.rank) {
        change = "Up"
      } else if (currentStanding.rank > previousStanding.rank) {
        change = "Down"
      }
    }
    return change
  }

  return (
    <div className="App">
      { viewTitle ?
        ( <TitlePage clickTitle={clearTitlePage}></TitlePage> ) 
        : 
        ( <div className="Ladder-View">
            <div>
              <Ladder 
                  ladder={ladder} 
                  teams={teams} 
                  getLogoAddress={getLogoAddress} 
                  changeInRank={changeInRank} 
                  selectTeam={selectTeam}>
              </Ladder> 
            </div>
            { selectedTeam ? 
              ( <TeamDetails 
                    team={selectedTeam} 
                    currentStanding={getCurrentStanding(selectedTeam.id)} 
                    changeInRank={changeInRank(selectedTeam.id)}
                    getLogoAddress={getLogoAddress}>
                </TeamDetails> ) 
              : 
              (<div></div>)
            }
          </div> )
    }
    </div>
  );
}

export default App;
