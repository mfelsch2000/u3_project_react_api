import { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL, LOGO_URL } from '../globals'
import ChangeInRank from './ChangeInRank'
import PlayedGames from './PlayedGames'
import Fixture from './Fixture'

const TeamDetails = (props) => {

    const [teamDetails, setTeamDetails] = useState(null)
    const [games, setGames] = useState(null)
    let gamesRequest = 0

    useEffect(()=>{
                 
        const getGames = async () => {
            const resp = await axios.get(`${BASE_URL}/?q=games;year=2022;format=json`)
            //console.log(resp.data.games)
            setGames(resp.data.games)
        }
         
        setTeamDetails(props.team)

        if (gamesRequest === 0) {
            getGames()
            gamesRequest = 1
          }

      }, [props.team])

    const teamGames = (teamId) => {
        const teamGames = games.filter((game) => { return (game.hteamid === teamId) || (game.ateamid === teamId )})
        //console.log("Team games: "  + teamId + " Games: " + teamGames.length)
        //console.log("Team games: " + teamGames)
        return teamGames
    }

    const playedGames = (teamId) => {
        const season = teamGames(teamId)
        const playedGames = season.filter((game) => {return (game.complete === 100)})
        //console.log("Played games. Team: " + teamId + " Played: " + playedGames.length)
        return playedGames
    }

    const remainingGames = (teamId) => {
        const season = teamGames(teamId)
        const remainingGames = season.filter((game) => {return (game.complete < 100)})
        //console.log("Remaining games. Team: " + teamId + " Remaining: " + remainingGames.length)
        return remainingGames
    }

    return (
        <div>
            { teamDetails ? 
                (
                    <div className="Team-View">
                        <div className="Team-View-Logo-Container">
                            <img src={`${LOGO_URL}${teamDetails.logo}`} alt="logo"></img>
                        </div>
                        <p>{teamDetails.name}</p>
                        <div>
                            <p>Rank: {props.currentStanding.rank}</p>
                            <ChangeInRank changeInRank={props.changeInRank}></ChangeInRank>
                            <div className="team_details">Played: {props.currentStanding.played}</div>
                            <div className="team_details">Wins: {props.currentStanding.wins}</div>
                            <div className="team_details">Losses: {props.currentStanding.losses}</div>
                            <div className="team_details">Draws: {props.currentStanding.draws}</div>
                            <div className="team_details">Points: {props.currentStanding.pts}</div>
                            <div className="team_details">For: {props.currentStanding.for}</div>
                            <div className="team_details">Against: {props.currentStanding.against}</div>
                            <div className="team_details ladder_percentage">Percentage: {props.currentStanding.percentage.toFixed(1)}</div>
                        </div>
                        <div>
                            { games ? 
                                (
                                    <PlayedGames games={playedGames(teamDetails.id)}></PlayedGames>
                                ) : (
                                    <div>Games loading ... </div>
                                )
                            }
                        </div>
                        <div>
                            { games ? 
                                (
                                    <Fixture games={remainingGames(teamDetails.id)}></Fixture>
                                ) : (
                                    <div>Games loading ... </div>
                                )
                            }
                        </div>
                    </div>
                ):( 
                    <p>Team details loadings ...</p>
                )
            }
        </div>
    )
}

export default TeamDetails