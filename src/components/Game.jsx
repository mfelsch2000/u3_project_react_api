import { useState, useEffect } from 'react'
const dateOptions = { weekday: 'long', month: 'long', day: 'numeric' };


const Game = (props) => {

    const [game, setGame] = useState(null)
    const [hasResult, setHasResult] = useState(false)
    const [isHHovered, setIsHHovered] = useState(false)
    const [isAHovered, setIsAHovered] = useState(false)

    
    useEffect(()=>{
        setGame(props.game)
        if (props.game) {
            setHasResult(props.game.complete > 0)
        }
    }, [props.game])

    const getHClass = ()  => {
        return isHHovered ? "game-team-name-container home-team selectable" : "game-team-name-container home-team"
    }

    const getAClass = ()  => {
        return isAHovered ? "game-team-name-container away-team selectable" : "game-team-name-container away-team "
    }


    const teamName = (team) => {
        let teamName
        if (team === "home") {
            teamName = game.hteam ? game.hteam : '---'
        } else {
            teamName = game.ateam ? game.ateam : '---'
        }
        if (teamName === "Greater Western Sydney") {
            teamName = "Giants"
        }
        return teamName
    }

    const teamClass = (team) => {
        let teamClass = "teamName"

        if (team === "home") {
            teamClass += " homeTeam"
        } else {
            teamClass += " awayTeam"
        }

        if (parseInt(game.complete) > 0 ) {
            if (team === "home" && game.hteam === game.winner) {
                teamClass += " winner"
            }
            else if (team === "away" && game.ateam === game.winner) {
                teamClass += " winner"
            } 
            else {
                teamClass += " draw"
            }
        }
        return teamClass

    }


    const gameDate = () => {
        if (!hasResult) {
            const rawGameDate = Date.parse(game.date.slice(0, 10))
            const formattedDate = new Intl.DateTimeFormat('en-US', dateOptions).format(rawGameDate);
            return formattedDate
        } 
        else {
            return ""
        }
    }

    return (
        game ?
            (      
                 <div className="game-container">
                    <div className="round-game-date-container">
                        <div className="round-name">{game.roundname}</div>
                        <div className="game-date">{gameDate()}</div>
                    </div>
                    <div className="game-teams-results-container">
                        <div className={getHClass()}  
                            onClick={()=>props.selectTeam(game.hteamid)}
                            onMouseOver={()=>{setIsHHovered(true)}}
                            onMouseOut={()=>{setIsHHovered(false)}}>
                            <div className="game-logo-container">
                                <img className="mediumLogo" src={`${props.getLogoAddress(game.hteamid)}`} alt="logo" ></img>
                            </div>
                            <div className={teamClass("home")}>{teamName("home")}</div>
                        </div>
                        {hasResult ? 
                            (
                                <div className="match-result-container">
                                    <div className="team-score-container">
                                        <div className="score">{game.hscore}</div>
                                        <div className="goals">{game.hgoals}.{game.hbehinds}</div>
                                    </div>
                                    <div className="divider">v</div>
                                    <div className="team-score-container">
                                        <div className="score">{game.ascore}</div>
                                        <div className="goals">{game.agoals}.{game.abehinds}</div>
                                    </div>
                                </div>
                            )
                            :
                            (
                                <span>
                                    <span className="score"></span>
                                    <span className="divider">v</span>
                                    <span className="score"></span>
                                </span>
                            )
                        }   
                        <div className={getAClass()} 
                             onClick={()=>props.selectTeam(game.ateamid)}
                             onMouseOver={()=>{setIsAHovered(true)}}
                             onMouseOut={()=>{setIsAHovered(false)}} >
                            <div className="game-logo-container">
                                <img className="mediumLogo" src={`${props.getLogoAddress(game.ateamid)}`} alt="logo" ></img>
                            </div>
                            <div className={teamClass("away")}>{teamName("away")}</div>
                        </div>
                    </div>
                </div>
            )
            :
            (
                <div>Games loading...</div>
            )
    )
}

export default Game