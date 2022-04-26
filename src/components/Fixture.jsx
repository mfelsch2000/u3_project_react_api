import { useState, useEffect } from 'react'
import Game from './Game'

const SHORT_LIST_SIZE = 3

const Fixture = (props) => {
 
    const [games, setGames] = useState(null)
    const [shortView, toggleView] = useState(true)
    const [largeList, setLargeListSize] = useState(true)
    
    useEffect(()=>{
        console.log("Fixture size: " + props.games.length)
        setGames(props.games)
        setLargeListSize(props.games.length > SHORT_LIST_SIZE)
    }, props.games)

    const viewList = () => {
        if (shortView) {
            return games.filter((game, index) => {return(index < SHORT_LIST_SIZE)})
        } else {
            return games
        }
    }

    const selectShowButton = () => {
        toggleView(!shortView)
    }

    return (
        <div>
            <h4>Fixtures</h4>
            { games ?
            (
                <div>
                { viewList().map((game) => (
                    <div className="unplayed_game" key={game.id} onFocus={()=>{}} onClick={()=>props.selectGame(game.id)}>
                         <Game key={game.id} game={game}  getLogoAddress={props.getLogoAddress}></Game>
                    </div>
                ))}
                { largeList ?
                    ( shortView ? 
                        (<div onClick={()=>selectShowButton()}>Show more</div>)
                        :
                        (<div onClick={()=>selectShowButton()}>Show less</div>) 
                    ) :
                    (<div></div>)
                }
                </div>
            ) : (
                <div>No Fixture</div>
            )
            }
        </div>
    )

}

export default Fixture