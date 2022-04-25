import { useState, useEffect } from 'react'

const PlayedGames = (props) => {
 
    const [games, setGames] = useState(null)
    const [shortView, toggleView] = useState(true)
    
    useEffect(()=>{
        setGames(props.games)
    }, props.games)

    const viewList = () => {
        if (shortView) {
            return games.filter((game, index) => {return((games.length - index) <= 5)})
//            return games.filter((game, index) => {index > 3})
        } else {
            return games
        }
    }

    return (
        <div>
            { games ?
            (
                <div>
                { viewList().map((game) => (
                    <div className="played_game" key={game.id} onFocus={()=>{}} onClick={()=>props.selectGame(game.id)}>
                        <div className="game_cell">Game ID: {game.id}</div>
                        <div className="game_cell">Away Team: {game.ateam}</div>
                    </div>
                ))}
                </div>
            ) : (
                <div>Hello, I'm played games</div>
            )
            }
        </div>
    )

}

export default PlayedGames