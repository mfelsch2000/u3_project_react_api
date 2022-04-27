import { useState, useEffect } from 'react'
import Game from './Game.jsx'

const SHORT_LIST_SIZE = 5


const PlayedGames = (props) => {
 
    const [games, setGames] = useState(null)
    const [shortView, toggleView] = useState(true)
    const [largeList, setLargeListSize] = useState(true)
    
    useEffect(()=>{
        setGames(props.games)
        setLargeListSize(props.games.length > SHORT_LIST_SIZE)
    }, props.games.reverse())

    const viewList = () => {
        if (shortView) {
            return games.filter((game, index) => {return((index < SHORT_LIST_SIZE))})
//            return games.filter((game, index) => {index > 3})
        } else {
            return games
        }
    }

    const selectShowButton = () => {
        toggleView(!shortView)
    }


    
    return (
        <div>
            <h4>Recent games</h4>
            { games ?
            (
                <div>
                { viewList().map((game) => (
                    <div className="played_game" key={game.id} onFocus={()=>{}} onClick={()=>props.selectGame(game.id)}>
                        <Game key={game.id} game={game} getLogoAddress={props.getLogoAddress}></Game>
                    </div>
                ))}
                { largeList ?
                    ( shortView ? 
                        (<div className="Show-More-Less-Btn" onClick={()=>selectShowButton()}>Show all</div>)
                        :
                        (<div className="Show-More-Less-Btn" onClick={()=>selectShowButton()}>Show less</div>) 
                    ) :
                    (<div></div>)
                }
                </div>
            ) : (
                <div>No played games</div>
            )
            }
        </div>
    )

}

export default PlayedGames
