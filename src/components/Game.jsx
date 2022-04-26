import { useState, useEffect } from 'react'

const Game = (props) => {

    const [game, setGame] = useState(null)
    const [hasResult, setHasResult] = useState(false)
    
    useEffect(()=>{
        setGame(props.game)
        if (props.game) {
            setHasResult(props.game.complete > 0)
        }
    }, [props.game])


    const teamName = (team) => {
        let teamName
        if (team === "home") {
            teamName = game.hteam ? game.hteam : '---'
        } else {
            teamName = game.ateam ? game.ateam : '---'
        }
        return teamName
    }

    const teamClass = (team) => {
        let teamClass = "team"

        if (team === "home") {
            teamClass += " homeTeam"
        } else {
            teamClass += " awayTeam"
        }

        if (parseInt(game.complete) > 0 ) {
            if (team === "home" && game.hteam === game.winner) {
                teamClass += " winner"
            }
            else if (team === "away" && game.ateam == game.winner) {
                teamClass += " winner"
            } 
            else {
                teamClass += " draw"
            }
        }

    }

    return (
        game ?
            (      
                 <div>
                    <span className={teamClass("home")}>{teamName("home")}</span>
                    {hasResult ? 
                        (
                            <span>
                                <span className="goals">{game.hgoals}.{game.hbehinds}.</span>
                                <span className="score">{game.hscore}</span>
                                <span className="divider">v</span>
                                <span className="goals">{game.agoals}.{game.abehinds}.</span>
                                <span className="score">{game.ascore}</span>
                            </span>
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
                    <span className={teamClass("away")}>{teamName("away")}</span>
                </div>
            )
            :
            (
                <div>Games loading...</div>
            )
    )
}

export default Game