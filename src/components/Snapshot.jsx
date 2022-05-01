import { useState, useEffect, useRef } from 'react'
import ChangeInRank from './ChangeInRank'
import PlayedGames from './PlayedGames'
import Fixture from './Fixture'
import axios from 'axios'
import { BASE_URL, LOGO_URL } from '../globals'

const Snapshot = (props) => {

    const [team, setTeam] = useState(null)
    const [games, setGames] = useState(null)
    const [gamesRequested, setGamesRequested] = useState(false)

    const topRef = useRef(null);

    useEffect(()=>{
        
        const scrollToRef = () => {
            console.log(topRef)
            if (topRef && topRef.current) {
                topRef.current.scrollTo({ 
                 top: topRef.current.scrollIntoView() , 
                    behavior: "smooth" 
                })
            }
          }

        const getGames = async () => {
            const resp = await axios.get(`${BASE_URL}/?q=games;year=2022;format=json`)
            console.log(resp.data.games)
            setGames(resp.data.games)
        }
        
       // console.log("TD: " + props.team.id)
        setTeam(props.team)
        scrollToRef()

        if (!gamesRequested) {
            setGamesRequested(true)
            getGames()
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
        const playedGames = season.filter((game) => {return (game.complete === 100)}).reverse()
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
        <div ref={topRef} className="Team-Season-Snapshot">
            <h4 className="At-A-Glance">At a glance</h4>
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
                        (<PlayedGames 
                            games={playedGames(team.id)} 
                            getLogoAddress={props.getLogoAddress}
                            selectTeam={props.selectTeam} >
                         </PlayedGames>)
                        : (<div>Results loading ... </div>)
                    }
                </div>
                <div>
                    { games ? 
                        (<Fixture 
                            games={remainingGames(team.id)} 
                            getLogoAddress={props.getLogoAddress}
                            selectTeam={props.selectTeam} >  
                        </Fixture>) 
                        : (<div>Fixtures loading ... </div>)
                    }
                </div>
            </div>
        </div>
    )
}

export default Snapshot