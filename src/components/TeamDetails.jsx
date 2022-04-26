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
            console.log(resp.data.games)
            setGames(resp.data.games)
        }
        
        console.log("TD: " + props.team.id)
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
                        <div className="Team-View-Logo-Name-Container">
                            <h3>{teamDetails.name}</h3>
                            <img className="Logo-large" src={props.getLogoAddress(props.team.id)} alt="logo"></img>
                        </div>
                        <div className="Team-View-Details-Container">
                            <div className="Team-Season-Snapshot">
                                <div className="Team-Stats">
                                    <div className="Team-Stats-Block Team-Stats-1">
                                        <div className="Team-Stats-Row Team-Stats-1 Team-Stats-Headings">
                                            <div className="team_stats_cell">Rank</div>
                                            <div className="team_stats_cell">Played</div>
                                            <div className="team_stats_cell">Points</div>
                                        </div>
                                        <div className="Team-Stats-Row Team-Stats-1 Team-Stats-Values">
                                            <div className="team_stats_cell Rank-Container">
                                                <span className="rank">{props.currentStanding.rank}</span>
                                                <ChangeInRank changeInRank={props.changeInRank}></ChangeInRank>
                                            </div>
                                            <div className="team_stats_cell">{props.currentStanding.played}</div>
                                            <div className="team_stats_cell">{props.currentStanding.pts}</div>
                                        </div>
                                    </div>
                                    <div className="Team-Stats-Block Team-Stats-2">
                                        <div className="Team-Stats-Row Team-Stats-2 Team-Stats-Headings">
                                            <div className="team_stats_cell">Wins</div>
                                            <div className="team_stats_cell">Losses</div>
                                            <div className="team_stats_cell">Drawn</div>
                                        </div>
                                        <div className="Team-Stats-Row Team-Stats-2 Team-Stats-Values">
                                            <div className="team_stats_cell">{props.currentStanding.wins}</div>
                                            <div className="team_stats_cell">{props.currentStanding.losses}</div>
                                            <div className="team_stats_cell">{props.currentStanding.draws}</div>
                                        </div>

                                    </div>
                                    <div className="Team-Stats-Block Team-Stats-3">
                                        <div className="Team-Stats-Row Team-Stats-3 Team-Stats-Headings">
                                            <div className="team_stats_cell">For</div>
                                            <div className="team_stats_cell">Against</div>
                                            <div className="team_stats_cell">%</div>
                                        </div>
                                        <div className="Team-Stats-Row Team-Stats-3 Team-Stats-Values">
                                            <div className="team_stats_cell">{props.currentStanding.for}</div>
                                            <div className="team_stats_cell">{props.currentStanding.against}</div>
                                            <div className="team_stats_cell">{props.currentStanding.percentage.toFixed(1)}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="Team-Games-Summary">
                                    <div>
                                        { games ? 
                                            (<PlayedGames games={playedGames(teamDetails.id)} getLogoAddress={props.getLogoAddress}></PlayedGames>)
                                            : (<div>Results loading ... </div>)
                                        }
                                    </div>
                                    <div>
                                        { games ? 
                                            (<Fixture games={remainingGames(teamDetails.id)} getLogoAddress={props.getLogoAddress}></Fixture>) 
                                            : (<div>Fixtures loading ... </div>)
                                        }
                                    </div>
                                </div>
                            </div>
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

/*
.team_stats_cell {
  border: 0.05em;
  border-style: dotted;
}
*/